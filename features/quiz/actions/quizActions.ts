"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { parseQuizMarkdown } from "../markdown/parser/quizParser";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { sendQuizSubmittedMail, sendQuizGradedMail } from "./quizMailActions";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

// Gamification e Badge Actions
import { onQuizCompletedAction } from "@/features/gamification/actions/awardXpAction";
import { unlockQuizBadge } from "@/features/gamification/actions/badgeActions";

const quizRepository = new SupabaseQuizRepository();
const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

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
) {
  try {
    await getAuthenticatedSession("admin");
    await quizRepository.assignToCourse(quizId, courseId);

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

    const { quiz, questions } =
      await quizRepository.findFullQuizStructure(quizId);

    let calculatedAutoScore = 0.0;
    let wrongClosedAnswers = 0;

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
      quiz_status: "In attesa della correzione della domanda aperta",
    });

    revalidatePath("/dashboard/courses", "layout");

    return {
      success: true,
      attemptId: attempt.id,
      autoScore: calculatedAutoScore,
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

// ======================================================
// TEACHER ACTIONS
// ======================================================

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

    const currentAttempt = await quizRepository.findAttemptById(
      payload.attemptId,
    );
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
      await quizRepository.updateReviewAndGrade(
        existingReview.id,
        reviewPayload,
        finalScore,
      );
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
        comment:
          payload.comment ?? "Nessun commento aggiuntivo fornito dal docente.",
      });
    }

    // ==========================================================
    // GAMIFICATION & BADGES
    // ==========================================================
    try {
      // 1. Assegnazione XP in base al voto
      await onQuizCompletedAction({
        userId: currentAttempt.studentId,
        quizId: currentAttempt.quizId,
        finalScore,
      });

      // 2. Sblocco Badge tramite la RPC Postgres 'award_quiz_badge'
      const quizCode =
        (quiz as any)?.code || (quiz as any)?.slug || currentAttempt.quizId;

      const badgeResult = await unlockQuizBadge(
        currentAttempt.studentId,
        quizCode,
      );

      logger.info("Gamification e Badge elaborati con successo", {
        studentId: currentAttempt.studentId,
        quizId: currentAttempt.quizId,
        quizCode,
        finalScore,
        badgeResult,
      });
    } catch (gamificationError) {
      logger.error(
        "Errore durante l'assegnazione di XP/Badge nel quiz",
        gamificationError,
      );
    }

    // Invalidazione cache Next.js per riflettere immediatamente badge e XP nella UI
    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");
    revalidatePath(`/admin/quiz/${payload.attemptId}`, "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/gamification", "layout");

    return {
      success: true,
      finalScore,
    };
  } catch (error: any) {
    logger.error(
      `Errore durante la valutazione della risposta aperta per il tentativo ${payload.attemptId}`,
      error,
    );
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
    logger.error(
      `Errore nel recupero della risposta aperta del tentativo ${attemptId}`,
      error,
    );
    return {
      success: false,
      error: error.message,
    };
  }
}