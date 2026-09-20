"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { parseQuizMarkdown } from "../markdown/parser/quizParser";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { sendQuizSubmittedMail } from "./quizMailActions";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

// Gamification, Badge e Certificati
import { onQuizCompletedAction } from "@/features/gamification/actions/awardXpAction";
import { unlockQuizBadge } from "@/features/gamification/actions/badgeActions";
import { CertificateAutoIssueService } from "@/features/certificates/services/CertificateAutoIssueService";

const quizRepository = new SupabaseQuizRepository();
const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();
const autoIssueService = new CertificateAutoIssueService();

interface UserSession {
  id: string;
  email: string;
  role: "admin" | "student";
}

async function getAuthenticatedSession(
  requiredRole?: "admin" | "student",
): Promise<UserSession> {
  const token = await cookieService.getSession();

  if (!token) {
    throw new Error("Non autorizzato: Sessione mancante.");
  }

  const payload = (await tokenService.verify(token)) as UserSession | null;

  if (!payload) {
    throw new Error("Non autorizzato: Token non valido.");
  }

  if (
    requiredRole &&
    payload.role !== requiredRole &&
    payload.role !== "admin"
  ) {
    throw new Error(`Accesso negato: Richiesto ruolo ${requiredRole}.`);
  }

  return payload;
}

/**
 * Verifica server-side l'accesso di uno studente ad un quiz
 * basandosi sulla tripletta completa: class_id + school_track + school_section.
 *
 * Regole:
 * - Se nessun vincolo è presente sul quiz -> accesso libero agli utenti autenticati;
 * - Se vincolato -> consentito esclusivamente a SCHOOL_STUDENT con la tripletta corrispondente;
 * - Nessun dato proveniente dal client viene considerato attendibile.
 */
async function assertStudentCanAccessQuiz(
  quiz: any,
  studentId: string,
): Promise<void> {
  const classId = quiz?.classId ?? quiz?.class_id ?? null;
  const schoolTrack = quiz?.schoolTrack ?? quiz?.school_track ?? null;
  const schoolSection = quiz?.schoolSection ?? quiz?.school_section ?? null;

  // 1. Se il quiz non ha alcun vincolo, l'accesso è consentito
  if (!classId && !schoolTrack && !schoolSection) {
    return;
  }

  const supabase = getSupabaseAdmin();

  // 2. Recupera il profilo dello studente comprensivo della tripletta
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("user_type, class_id, school_track, school_section")
    .eq("id", studentId)
    .maybeSingle();

  if (profileError) {
    logger.error(
      `Errore verifica profilo per lo studente ${studentId}`,
      profileError,
    );

    throw new Error("Impossibile verificare il profilo dello studente.");
  }

  if (!profile || profile.user_type !== "SCHOOL_STUDENT") {
    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti scolastici.",
    );
  }

  // 3. Controllo: class_id (se specificato nel quiz)
  if (classId) {
    const matchesDirectClass = profile.class_id === classId;

    let matchesClassMembership = false;
    if (!matchesDirectClass) {
      const { data: membership } = await supabase
        .from("profile_classes")
        .select("profile_id")
        .eq("profile_id", studentId)
        .eq("class_id", classId)
        .maybeSingle();

      matchesClassMembership = !!membership;
    }

    if (!matchesDirectClass && !matchesClassMembership) {
      throw new Error(
        "Accesso negato: questo quiz è riservato ad un'altra classe.",
      );
    }
  }

  // 4. Controllo: school_track (se specificato nel quiz)
  if (schoolTrack && profile.school_track !== schoolTrack) {
    throw new Error(
      "Accesso negato: questo quiz è riservato ad un altro indirizzo scolastico.",
    );
  }

  // 5. Controllo: school_section (se specificato nel quiz)
  if (schoolSection && profile.school_section !== schoolSection) {
    throw new Error(
      "Accesso negato: questo quiz è riservato ad un'altra sezione.",
    );
  }
}

// ======================================================
// HELPER PER EMISSIONE AUTOMATICA CERTIFICATO & GAMIFICATION
// ======================================================

async function processGamificationAndCertificates(
  userId: string,
  quizId: string,
  quiz: any,
  finalScore: number,
): Promise<{ success: boolean; certificate?: any; error?: string }> {
  try {
    await onQuizCompletedAction({
      userId,
      quizId,
      finalScore,
    });

    let courseId = quiz?.courseId || quiz?.course_id;
    let moduleId = quiz?.moduleId || quiz?.module_id;
    const lessonId = quiz?.lessonId || quiz?.lesson_id;

    // Sblocco del badge passando direttamente quizId e courseId
    await unlockQuizBadge(userId, quizId, courseId);

    // Fallback difensivo centralizzato: usa la risoluzione del repository
    if (!moduleId && courseId) {
      moduleId =
        (await quizRepository.resolveMainCourseModule(courseId)) ?? undefined;
    }

    if (!courseId || !moduleId) {
      logger.warn(
        "⚠️ Impossibile emettere certificato: courseId o moduleId mancanti nel record del quiz",
        { quizId, courseId, moduleId },
      );

      return {
        success: false,
        error: "Dati corso/modulo mancanti nel quiz. Controllare le relazioni.",
      };
    }

    const maxScore = Number(quiz?.maxScore ?? 10);
    const scorePercentage = (finalScore / maxScore) * 100;

    const certResult = await autoIssueService.processAndIssue({
      userId,
      courseId,
      moduleId,
      lessonId,
      title: quiz?.title
        ? `Attestato: ${quiz.title}`
        : "Certificato di Completamento Modulo",
      subtitle: `Modulo superato con esito positivo (Voto: ${finalScore.toFixed(
        2,
      )} / ${maxScore})`,
      score: scorePercentage,
      completionPercentage: 100,
    });

    return {
      success: true,
      certificate: certResult?.certificate,
    };
  } catch (error: any) {
    logger.error(
      "❌ Errore durante l'elaborazione di Gamification/Certificati:",
      error,
    );

    return {
      success: false,
      error: error.message || "Errore sconosciuto.",
    };
  }
}

// ======================================================
// ADMIN ACTIONS
// ======================================================

export async function importQuizFromMarkdownAction(
  rawMarkdown: string,
  context?: {
    courseId?: string;
    moduleId?: string;
    lessonId?: string;
  },
) {
  try {
    const adminSession = await getAuthenticatedSession("admin");
    const parsedQuiz = await parseQuizMarkdown(rawMarkdown);

    // Trasmette il contesto esterno per disaccoppiare gli ID dal file .md
    const newQuiz = await quizRepository.createFromParsed(
      parsedQuiz,
      adminSession.id,
      context,
    );

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
      quizId: newQuiz.id,
    };
  } catch (error: any) {
    logger.error("Errore durante l'importazione del quiz da Markdown", error);

    return {
      success: false,
      error: error.message || "Errore sconosciuto durante l'importazione.",
    };
  }
}

export async function updateQuizStatusAction(
  quizId: string,
  status: "draft" | "active",
) {
  try {
    await getAuthenticatedSession("admin");

    await quizRepository.updateStatus(quizId, status);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
    };
  } catch (error: any) {
    logger.error(`Errore aggiornamento stato quiz ${quizId}`, error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function assignQuizToCourseAction(
  quizId: string,
  courseId: string,
  moduleId?: string,
  lessonId?: string,
) {
  try {
    await getAuthenticatedSession("admin");

    await quizRepository.assignToCourse(quizId, courseId, moduleId, lessonId);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
    };
  } catch (error: any) {
    logger.error(
      `Errore assegnazione quiz ${quizId} al corso ${courseId}`,
      error,
    );

    return {
      success: false,
      error: error.message,
    };
  }
}

// ======================================================
// STUDENT ACTIONS
// ======================================================

interface StudentAnswerInput {
  questionId: string;
  selectedOptionId?: string;
  openAnswerText?: string;
}

export async function submitStudentAttemptAction(
  quizId: string,
  userAnswers: StudentAnswerInput[],
) {
  try {
    const studentSession = await getAuthenticatedSession("student");

    /**
     * Il quiz viene recuperato PRIMA del controllo del tentativo
     * per poter verificare l'eventuale restrizione di classe.
     *
     * Questo controllo è server-side e non dipende dalla UI.
     */
    const { quiz, questions } =
      await quizRepository.findFullQuizStructure(quizId);

    /**
     * Controllo obbligatorio dell'accesso alla classe.
     *
     * Deve avvenire prima di:
     * - hasStudentAttempted()
     * - calcolo del punteggio
     * - createAttempt()
     *
     * In questo modo una chiamata diretta alla Server Action
     * non può aggirare la restrizione del quiz.
     */
    await assertStudentCanAccessQuiz(quiz, studentSession.id);

    const alreadyAttempted = await quizRepository.hasStudentAttempted(
      quizId,
      studentSession.id,
    );

    if (alreadyAttempted) {
      throw new Error("Hai già sottomesso un tentativo per questo quiz.");
    }

    let calculatedAutoScore = 0.0;
    let wrongClosedAnswers = 0;
    let hasOpenQuestions = false;

    const finalAnswersPayload: any[] = [];

    for (const q of questions) {
      const studentAns = userAnswers.find((ua) => ua.questionId === q.id);

      if (q.type === "multiple_choice") {
        const correctOption = q.options?.find((o) => o.isCorrect);

        const isCorrect = correctOption?.id === studentAns?.selectedOptionId;

        let scoreForQuestion = 0;

        if (isCorrect) {
          scoreForQuestion = Number(q.points);
          calculatedAutoScore += scoreForQuestion;
        } else if (studentAns?.selectedOptionId) {
          wrongClosedAnswers++;
        }

        finalAnswersPayload.push({
          questionId: q.id,
          selectedOptionId: studentAns?.selectedOptionId,
          isCorrect,
          score: scoreForQuestion,
        });
      } else {
        hasOpenQuestions = true;

        finalAnswersPayload.push({
          questionId: q.id,
          openAnswerText: studentAns?.openAnswerText || "",
          isCorrect: null,
          score: 0,
        });
      }
    }

    if (quiz.penaltyEnabled) {
      const penaltyPerWrong = Math.abs(Number(quiz.negativeMark));

      calculatedAutoScore -= wrongClosedAnswers * penaltyPerWrong;
    }

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

    const { data: studentProfile } = await getSupabaseAdmin()
      .from("profiles")
      .select("first_name,last_name,display_name")
      .eq("id", studentSession.id)
      .single();

    await sendQuizSubmittedMail(studentSession.email, {
      first_name: studentProfile?.first_name ?? "",
      last_name: studentProfile?.last_name ?? "",
      display_name: studentProfile?.display_name ?? "",
      quiz_title: quiz.title,
      auto_score: calculatedAutoScore.toFixed(2),
      quiz_status: hasOpenQuestions
        ? "In attesa della correzione della domanda aperta"
        : "Completato",
    });

    let certResult = null;

    if (!hasOpenQuestions) {
      certResult = await processGamificationAndCertificates(
        studentSession.id,
        quizId,
        quiz,
        calculatedAutoScore,
      );
    }

    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/courses", "layout");

    return {
      success: true,
      attemptId: attempt.id,
      autoScore: calculatedAutoScore,
      hasOpenQuestions,
      certificate: certResult?.certificate || null,
    };
  } catch (error: any) {
    logger.error(
      "Errore durante la sottomissione del tentativo dello studente",
      error,
    );

    return {
      success: false,
      error: error.message || "Errore durante il salvataggio delle risposte.",
    };
  }
}
