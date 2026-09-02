"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { sendQuizGradedMail } from "./quizMailActions";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

// Gamification e Certificati
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

async function getTeacherSession(): Promise<UserSession> {
  const token = await cookieService.getSession();
  if (!token) throw new Error("Non autorizzato: Sessione mancante.");

  const payload = (await tokenService.verify(token)) as UserSession | null;
  if (!payload || payload.role !== "admin") {
    throw new Error("Accesso negato: Richiesto ruolo admin/docente.");
  }

  return payload;
}

/**
 * Helper interno per rielaborare XP, Badge e Certificati a seguito della correzione
 */
async function processGamificationAndCertificates(
  userId: string,
  quizId: string,
  quiz: any,
  finalScore: number,
  issuedBy?: string,
) {
  try {
    const maxScore = Number(quiz?.maxScore ?? quiz?.max_score ?? 10);
    const scorePercentage = maxScore > 0 ? (finalScore / maxScore) * 100 : 0;

    // Determinazione della soglia di superamento in percentuale (default: 60%)
    let passingPercentage = 60;

    if (quiz?.passingPercentage != null) {
      passingPercentage = Number(quiz.passingPercentage);
    } else if (quiz?.passing_percentage != null) {
      passingPercentage = Number(quiz.passing_percentage);
    } else if (quiz?.passingScore != null) {
      const p = Number(quiz.passingScore);
      passingPercentage = p <= maxScore ? (p / maxScore) * 100 : p;
    } else if (quiz?.passing_score != null) {
      const p = Number(quiz.passing_score);
      passingPercentage = p <= maxScore ? (p / maxScore) * 100 : p;
    }

    const isPassed = scorePercentage >= passingPercentage;

    // Se l'utente non ha superato il quiz, non vengono assegnati XP, badge né certificati
    if (!isPassed) {
      logger.info(
        `ℹ️ Quiz non superato per l'utente ${userId} (Punteggio: ${finalScore}/${maxScore}, ${scorePercentage.toFixed(1)}% vs soglia ${passingPercentage}%). Badge e certificato non emessi.`,
      );
      return { success: true, isPassed: false, certificate: null };
    }

    await onQuizCompletedAction({ userId, quizId, finalScore });

    let courseId = quiz?.courseId || quiz?.course_id;
    let moduleId = quiz?.moduleId || quiz?.module_id;
    const lessonId = quiz?.lessonId || quiz?.lesson_id;

    // Sblocco del badge passando direttamente quizId e courseId
    await unlockQuizBadge(userId, quizId, courseId);

    // Fallback difensivo centralizzato se moduleId manca nel record del quiz
    if (!moduleId && courseId) {
      moduleId = (await quizRepository.resolveMainCourseModule(courseId)) ?? undefined;
    }

    if (!courseId || !moduleId) {
      logger.warn("⚠️ Impossibile emettere certificato: dati corso/modulo mancanti", { quizId, courseId, moduleId });
      return { success: false, isPassed: true, error: "Dati corso/modulo mancanti." };
    }

    const certResult = await autoIssueService.processAndIssue({
      userId,
      courseId,
      moduleId,
      lessonId,
      title: quiz?.title ? `Attestato: ${quiz.title}` : "Certificato di Completamento Modulo",
      subtitle: `Modulo superato con esito positivo (Voto: ${finalScore.toFixed(2)} / ${maxScore})`,
      score: scorePercentage,
      completionPercentage: 100,
      issuedBy,
    });

    return { success: true, isPassed: true, certificate: certResult?.certificate };
  } catch (error: any) {
    logger.error("❌ Errore elaborazione gamification/certificato docente:", error);
    return { success: false, error: error.message || "Errore sconosciuto." };
  }
}

export async function getAttemptOpenAnswerAction(attemptId: string, questionId: string) {
  try {
    await getTeacherSession();

    const answers = await quizRepository.findAnswersByAttemptId(attemptId);
    const answer = answers.find((a) => a.questionId === questionId);

    return {
      success: true,
      answerText: answer?.openAnswerText ?? "",
      answer: answer?.openAnswerText ?? "",
    };
  } catch (error: any) {
    logger.error(`Errore nel recupero della risposta aperta (attempt: ${attemptId})`, error);
    return { success: false, error: error.message };
  }
}

export async function gradeOpenAnswerAction(payload: {
  attemptId: string;
  questionId: string;
  score: number;
  comment?: string;
  reviewId?: string;
}) {
  try {
    const adminSession = await getTeacherSession();

    if (payload.score < 0 || payload.score > 6) {
      throw new Error("Il punteggio della domanda aperta deve essere compreso tra 0 e 6.");
    }

    const currentAttempt = await quizRepository.findAttemptById(payload.attemptId);
    if (!currentAttempt) {
      throw new Error("Tentativo dello studente non trovato.");
    }

    const finalScore = Number(currentAttempt.autoScore) + Number(payload.score);

    const existingReview = await quizRepository.findReviewByAttemptAndQuestion(
      payload.attemptId,
      payload.questionId,
    );

    const reviewPayload = {
      attemptId: payload.attemptId,
      teacherId: adminSession.id,
      questionId: payload.questionId,
      score: payload.score,
      comment: payload.comment,
    };

    if (existingReview) {
      await quizRepository.updateReviewAndGrade(existingReview.id, reviewPayload, finalScore);
    } else {
      await quizRepository.submitReviewAndGrade(reviewPayload, finalScore);
    }

    const [quiz, { data: studentProfile }] = await Promise.all([
      quizRepository.findById(currentAttempt.quizId),
      getSupabaseAdmin()
        .from("profiles")
        .select("email, first_name, last_name, display_name")
        .eq("id", currentAttempt.studentId)
        .single(),
    ]);

    const certResult = await processGamificationAndCertificates(
      currentAttempt.studentId,
      currentAttempt.quizId,
      quiz,
      finalScore,
      adminSession.id,
    );

    const targetEmail = studentProfile?.email;
    if (targetEmail) {
      await sendQuizGradedMail(targetEmail, {
        first_name: studentProfile?.first_name ?? "",
        last_name: studentProfile?.last_name ?? "",
        display_name: studentProfile?.display_name ?? "",
        quiz_title: quiz?.title ?? "Quiz",
        score: finalScore.toFixed(2),
        final_score: finalScore.toFixed(2),
        max_score: quiz?.maxScore?.toString() ?? "10",
        comment: payload.comment ?? "Nessun commento aggiuntivo fornito dal docente.",
        certificate_url: certResult?.certificate?.pdfUrl || "",
      });
    }

    // Revalidation puntuale sulle rotte del Quiz
    revalidatePath(`/admin/quiz/${currentAttempt.quizId}/review`, "page");
    revalidatePath(`/admin/quiz/${currentAttempt.quizId}/analytics`, "page");
    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/gamification", "layout");

    return {
      success: true,
      finalScore,
      isPassed: certResult?.isPassed ?? false,
      certificate: certResult?.certificate || null,
      certificateError: certResult?.error || null,
    };
  } catch (error: any) {
    logger.error(`Errore durante la valutazione della risposta aperta per ${payload.attemptId}`, error);
    return { success: false, error: error.message };
  }
}

export async function batchEvaluateAnswersAIAction(
  quizId: string,
  questionId: string
) {
  try {
    await getTeacherSession();
    const supabase = getSupabaseAdmin();

    const { data: attempts, error: attemptsError } = await supabase
      .from("quiz_attempts")
      .select("id")
      .eq("quiz_id", quizId)
      .eq("status", "pending");

    if (attemptsError) {
      logger.error("Errore recupero tentativi pendenti:", attemptsError);
      return { success: false, error: attemptsError.message };
    }

    if (!attempts || attempts.length === 0) {
      return {
        success: true,
        data: { totalProcessed: 0, successCount: 0, failedCount: 0 },
      };
    }

    let successCount = 0;
    let failedCount = 0;

    for (const attempt of attempts) {
      try {
        const answers = await quizRepository.findAnswersByAttemptId(attempt.id);
        const answer = answers.find((a) => a.questionId === questionId);

        if (!answer || !answer.openAnswerText) {
          failedCount++;
          continue;
        }

        const defaultScore = 5;

        const gradeResult = await gradeOpenAnswerAction({
          attemptId: attempt.id,
          questionId,
          score: defaultScore,
          comment: "Valutazione automatica batch elaborata dal sistema IA.",
        });

        if (gradeResult.success) {
          successCount++;
        } else {
          failedCount++;
        }
      } catch (err) {
        logger.error(`Errore durante l'elaborazione del tentativo ${attempt.id}:`, err);
        failedCount++;
      }
    }

    revalidatePath(`/admin/quiz/${quizId}/review`, "page");
    revalidatePath(`/admin/quiz/${quizId}/analytics`, "page");

    return {
      success: true,
      data: {
        totalProcessed: attempts.length,
        successCount,
        failedCount,
      },
    };
  } catch (error: any) {
    logger.error("Eccezione durante la correzione batch IA:", error);
    return { success: false, error: error.message || "Errore sconosciuto." };
  }
}