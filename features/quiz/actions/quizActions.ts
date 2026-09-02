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
      moduleId = (await quizRepository.resolveMainCourseModule(courseId)) ?? undefined;
    }

    if (!courseId || !moduleId) {
      logger.warn(
        "⚠️ Impossibile emettere certificato: courseId o moduleId mancanti nel record del quiz",
        { quizId, courseId, moduleId }
      );
      return { success: false, error: "Dati corso/modulo mancanti nel quiz. Controllare le relazioni." };
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
      subtitle: `Modulo superato con esito positivo (Voto: ${finalScore.toFixed(2)} / ${maxScore})`,
      score: scorePercentage,
      completionPercentage: 100,
    });

    return { success: true, certificate: certResult?.certificate };
  } catch (error: any) {
    logger.error("❌ Errore durante l'elaborazione di Gamification/Certificati:", error);
    return { success: false, error: error.message || "Errore sconosciuto." };
  }
}

// ======================================================
// ADMIN ACTIONS
// ======================================================

export async function importQuizFromMarkdownAction(rawMarkdown: string) {
  try {
    const adminSession = await getAuthenticatedSession("admin");
    const parsedQuiz = await parseQuizMarkdown(rawMarkdown);

    const newQuiz = await quizRepository.createFromParsed(
      parsedQuiz,
      adminSession.id,
    );

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return { success: true, quizId: newQuiz.id };
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
    return { success: true };
  } catch (error: any) {
    logger.error(`Errore aggiornamento stato quiz ${quizId}`, error);
    return { success: false, error: error.message };
  }
}

export async function assignQuizToCourseAction(
  quizId: string,
  courseId: string,
  moduleId?: string,
) {
  try {
    await getAuthenticatedSession("admin");
    await quizRepository.assignToCourse(quizId, courseId, moduleId);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    return { success: true };
  } catch (error: any) {
    logger.error(
      `Errore assegnazione quiz ${quizId} al corso ${courseId}`,
      error,
    );
    return { success: false, error: error.message };
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

    const alreadyAttempted = await quizRepository.hasStudentAttempted(
      quizId,
      studentSession.id,
    );

    if (alreadyAttempted) {
      throw new Error("Hai già sottomesso un tentativo per questo quiz.");
    }

    const { quiz, questions } = await quizRepository.findFullQuizStructure(quizId);

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