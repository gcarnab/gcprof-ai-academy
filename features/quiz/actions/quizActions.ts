"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { parseQuizMarkdown } from "../markdown/parser/quizParser";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";

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
    revalidatePath("/admin/quiz");
    revalidatePath("/admin/dashboard");

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

    revalidatePath("/admin/quiz");
    revalidatePath("/admin/dashboard");
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

    revalidatePath(`/admin/quiz`);
    revalidatePath("/admin/dashboard");
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

        if (isCorrect) {
          // Risposta corretta
          scoreForQuestion = Number(q.points);

          correctClosedAnswers++;
        } else {
          // Risposta errata
          wrongClosedAnswers++;

          if (quiz.penaltyEnabled) {
            scoreForQuestion = -Math.abs(Number(quiz.negativeMark));
          } else {
            scoreForQuestion = 0.0;
          }
        }

        calculatedAutoScore += scoreForQuestion;

        finalAnswersPayload.push({
          questionId: q.id,
          selectedOptionId: studentAns?.selectedOptionId,
          isCorrect,
          score: scoreForQuestion,
        });
      } else {
        // Domanda aperta:
        // memorizza il testo, il punteggio iniziale è 0.00
        // in attesa della correzione del docente

        finalAnswersPayload.push({
          questionId: q.id,
          openAnswerText: studentAns?.openAnswerText || "",
          isCorrect: null,
          score: 0.0,
        });
      }
    }

    // Il punteggio automatico riguarda solo le domande chiuse.
    // Non può mai essere negativo.
    calculatedAutoScore = Math.max(0, calculatedAutoScore);

    // Inizializza il record e salva i dettagli delle risposte
    // in transazione logica

    const attempt = await quizRepository.createAttempt(
      quizId,
      studentSession.id,
    );

    await quizRepository.saveAttemptSubmission(
      attempt.id,
      finalAnswersPayload,
      calculatedAutoScore,
    );

    revalidatePath("/dashboard/courses");

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
// TEACHER ACTIONS (CORREZIONE MANUALE)
// ======================================================

/**
 * Consente al docente di validare la domanda aperta assegnando un voto da 0 a 6
 */
export async function gradeOpenAnswerAction(payload: {
  attemptId: string;
  questionId: string;
  score: number; // Validato da 0 a 6
  comment?: string;
}) {
  try {
    const adminSession = await getAuthenticatedSession("admin");

    if (payload.score < 0 || payload.score > 6) {
      throw new Error(
        "Il punteggio della domanda aperta deve essere compreso tra 0 e 6.",
      );
    }

    const attempt = await quizRepository.findAttemptById(payload.attemptId);
    if (!attempt) throw new Error("Tentativo dello studente non trovato.");
    if (attempt.status === "graded")
      throw new Error("Questo tentativo è già stato corretto.");

    // Calcolo matematico del voto finale finale (AutoScore chiuse + Score manuale aperta)
    const finalScore = Number(attempt.autoScore) + Number(payload.score);

    await quizRepository.submitReviewAndGrade(
      {
        attemptId: payload.attemptId,
        teacherId: adminSession.id,
        questionId: payload.questionId,
        score: payload.score,
        comment: payload.comment,
      },
      finalScore,
    );

    revalidatePath("/admin/quiz");
    revalidatePath("/admin/dashboard");
    return { success: true, finalScore };
  } catch (error: any) {
    return { success: false, error: error.message };
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
