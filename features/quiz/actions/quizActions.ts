"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { parseQuizMarkdown } from "../markdown/parser/quizParser";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { sendQuizSubmittedMail } from "./quizMailActions";
import { getSupabaseAdmin } from "@/lib/supabase";

const quizRepository = new SupabaseQuizRepository();
const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

interface UserSession {
  id: string;
  email: string;
  role: "admin" | "student";
}

/**
 * Helper interno per convalidare la sessione e i ruoli dell'utente lato server
 */
async function getAuthenticatedSession(
  requiredRole?: "admin" | "student",
): Promise<UserSession> {
  const token = await cookieService.getSession();
  if (!token) throw new Error("Non autorizzato: Sessione mancante.");

  const payload = (await tokenService.verify(token)) as UserSession | null;
  if (!payload) throw new Error("Non autorizzato: Token non valido.");

  if (
    requiredRole &&
    payload.role !== requiredRole &&
    payload.role !== "admin"
  ) {
    throw new Error(`Accesso negato: Richiesto ruolo ${requiredRole}.`);
  }

  return payload;
}

// ======================================================
// ADMIN ACTIONS
// ======================================================

/**
 * Riceve il testo Markdown del quiz, lo analizza, lo valida ed inserisce la struttura nel database.
 */
export async function importQuizFromMarkdownAction(rawMarkdown: string) {
  try {
    const adminSession = await getAuthenticatedSession("admin");

    // Parsing e validazione sintattico-biologica (Zod) del Markdown
    const parsedQuiz = await parseQuizMarkdown(rawMarkdown);

    // Salvataggio sul database
    const newQuiz = await quizRepository.createFromParsed(
      parsedQuiz,
      adminSession.id,
    );

    // Invalida la cache sia della route statica che della dashboard amministrativa attiva
    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return { success: true, quizId: newQuiz.id };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Errore sconosciuto durante l'importazione.",
    };
  }
}

/**
 * Cambia lo stato di un quiz (es. da 'draft' ad 'active')
 */
export async function updateQuizStatusAction(
  quizId: string,
  status: "draft" | "active",
) {
  try {
    await getAuthenticatedSession("admin");
    await quizRepository.updateStatus(quizId, status);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Associa un quiz esistente a un determinato corso
 */
export async function assignQuizToCourseAction(
  quizId: string,
  courseId: string,
) {
  try {
    await getAuthenticatedSession("admin");
    await quizRepository.assignToCourse(quizId, courseId);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ======================================================
// STUDENT ACTIONS
// ======================================================

interface StudentAnswerInput {
  questionId: string;
  selectedOptionId?: string; // Compilato se multipla
  openAnswerText?: string; // Compilato se aperta
}

/**
 * Sottomette il quiz dello studente ed elabora istantaneamente il calcolo algoritmico del punteggio delle chiuse.
 */
export async function submitStudentAttemptAction(
  quizId: string,
  userAnswers: StudentAnswerInput[],
) {
  try {
    const studentSession = await getAuthenticatedSession("student");

    // Impedisci sottomissioni multiple se ha già risposto
    const alreadyAttempted = await quizRepository.hasStudentAttempted(
      quizId,
      studentSession.id,
    );

    if (alreadyAttempted) {
      throw new Error("Hai già sottomesso un tentativo per questo quiz.");
    }

    // Recupera la struttura del quiz dal database per verificare le risposte corrette
    const { quiz, questions } =
      await quizRepository.findFullQuizStructure(quizId);

    let calculatedAutoScore = 0.0;
    let correctClosedAnswers = 0;
    let wrongClosedAnswers = 0;

    const finalAnswersPayload: any[] = [];

    // Elaborazione e calcolo del punteggio domanda per domanda
    for (const q of questions) {
      const studentAns = userAnswers.find((ua) => ua.questionId === q.id);

      if (q.type === "multiple_choice") {
        const correctOption = q.options?.find((o) => o.isCorrect);
        const isCorrect = correctOption?.id === studentAns?.selectedOptionId;

        let scoreForQuestion = 0.0;

        /********* CALCOLO PUNTEGGIO QUIZ ************/
        if (isCorrect) {
          correctClosedAnswers++;
        } else {
          wrongClosedAnswers++;
        }

        scoreForQuestion = isCorrect ? Number(q.points) : 0;
        calculatedAutoScore += scoreForQuestion;
        /**********************************************/

        finalAnswersPayload.push({
          questionId: q.id,
          selectedOptionId: studentAns?.selectedOptionId,
          isCorrect,
          score: scoreForQuestion,
        });
      } else {
        // Domanda aperta: memorizza il testo, il punteggio iniziale è 0.00
        finalAnswersPayload.push({
          questionId: q.id,
          openAnswerText: studentAns?.openAnswerText || "",
          isCorrect: null,
          score: 0.0,
        });
      }
    }

    // Somma massima disponibile delle domande chiuse
    const maxClosedScore = questions
      .filter((q) => q.type === "multiple_choice")
      .reduce((sum, q) => sum + Number(q.points), 0);

    // Applica la penalità sugli errori
    if (quiz.penaltyEnabled) {
      calculatedAutoScore =
        maxClosedScore -
        wrongClosedAnswers * Math.abs(Number(quiz.negativeMark));
    } else {
      calculatedAutoScore =
        maxClosedScore - (maxClosedScore - calculatedAutoScore);
    }

    // Evita punteggi negativi
    calculatedAutoScore = Math.max(0, calculatedAutoScore);

    const attempt = await quizRepository.createAttempt(
      quizId,
      studentSession.id,
    );

    await quizRepository.saveAttemptSubmission(
      attempt.id,
      finalAnswersPayload,
      calculatedAutoScore,
    );

    // RECUPERO DATI ANAGRAFICI STUDENTE PER EMAIL
    const { data: studentProfile } = await getSupabaseAdmin()
      .from("profiles")
      .select("first_name,last_name,display_name")
      .eq("id", studentSession.id)
      .single();

    console.log("STUDENT PROFILE EMAIL VARIABLES", {
      first_name: studentProfile?.first_name,
      last_name: studentProfile?.last_name,
      display_name: studentProfile?.display_name,
    });

    // INVIO EMAIL CONFERMA CONSEGNA QUIZ
    await sendQuizSubmittedMail(studentSession.email, {
      first_name: studentProfile?.first_name ?? "",
      last_name: studentProfile?.last_name ?? "",
      display_name: studentProfile?.display_name ?? "",

      quiz_title: quiz.title,
      auto_score: calculatedAutoScore.toFixed(2),
      quiz_status: "In attesa della correzione della domanda aperta",
    });

    revalidatePath("/dashboard/courses", "layout");

    return {
      success: true,
      attemptId: attempt.id,
      autoScore: calculatedAutoScore,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Errore durante il salvataggio delle risposte.",
    };
  }
}

// ======================================================
// TEACHER ACTIONS
// ======================================================

/**
 * Consente al docente di validare la domanda aperta assegnando un voto da 0 a 6.
 * Utilizza una logica a interi per garantire la precisione dei decimali nel calcolo del voto finale.
 */
export async function gradeOpenAnswerAction(payload: {
  attemptId: string;
  questionId: string;
  score: number;
  comment?: string;
  reviewId?: string;
}) {
  try {
    const adminSession = await getAuthenticatedSession("admin");

    if (payload.score < 0 || payload.score > 6) {
      throw new Error(
        "Il punteggio della domanda aperta deve essere compreso tra 0 e 6.",
      );
    }

    const attempt = await quizRepository.findAttemptById(payload.attemptId);
    if (!attempt) {
      throw new Error("Tentativo dello studente non trovato.");
    }

    // Recupero tentativo corrente
    const currentAttempt = await quizRepository.findAttemptById(
      payload.attemptId,
    );

    if (!currentAttempt) {
      throw new Error("Tentativo non trovato.");
    }

    // Il punteggio finale è:
    // punti automatici + punti docente
    const finalScore = Number(currentAttempt.autoScore) + Number(payload.score);


    // 3. Verifica esistenza revisione
    const existingReview = await quizRepository.findReviewByAttemptAndQuestion(
      payload.attemptId,
      payload.questionId,
    );

    const reviewPayload = {
      attemptId: payload.attemptId,
      teacherId: adminSession.id,
      questionId: payload.questionId,
      score: payload.score, // Salviamo il punteggio originale (es. 2.5)
      comment: payload.comment,
    };

    // 4. Operazione su DB
    if (existingReview) {
      await quizRepository.updateReviewAndGrade(
        existingReview.id,
        reviewPayload,
        finalScore, // Salviamo il totale ricalcolato preciso
      );
    } else {
      await quizRepository.submitReviewAndGrade(reviewPayload, finalScore);
    }

    // 5. Invalida la cache per forzare il refresh della UI
    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    revalidatePath(`/admin/quiz/${payload.attemptId}`, "layout");

    return {
      success: true,
      finalScore,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAttemptOpenAnswerAction(
  attemptId: string,
  questionId: string,
) {
  try {
    await getAuthenticatedSession("admin");

    const answers = await quizRepository.findAnswersByAttemptId(attemptId);
    const answer = answers.find((a) => a.questionId === questionId);

    return {
      success: true,
      answerText: answer?.openAnswerText ?? "",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
