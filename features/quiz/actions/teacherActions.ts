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
    await onQuizCompletedAction({ userId, quizId, finalScore });

    const quizCode = quiz?.code || quiz?.slug || quizId;
    await unlockQuizBadge(userId, quizCode);

    const courseId = quiz?.courseId || quiz?.course_id;
    const moduleId = quiz?.moduleId || quiz?.module_id;
    const lessonId = quiz?.lessonId || quiz?.lesson_id;

    if (!courseId || !moduleId) {
      logger.warn("⚠️ Impossibile emettere certificato: dati corso/modulo mancanti", { quizId });
      return { success: false, error: "Dati corso/modulo mancanti." };
    }

    const maxScore = Number(quiz?.maxScore ?? 10);
    const scorePercentage = (finalScore / maxScore) * 100;

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

    return { success: true, certificate: certResult?.certificate };
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
      certificate: certResult?.certificate || null,
      certificateError: certResult?.error || null,
    };
  } catch (error: any) {
    logger.error(`Errore durante la valutazione della risposta aperta per ${payload.attemptId}`, error);
    return { success: false, error: error.message };
  }
}