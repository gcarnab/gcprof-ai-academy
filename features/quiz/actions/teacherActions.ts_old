"use server";

import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";

const quizRepository = new SupabaseQuizRepository();

const tokenService = new JoseTokenService();

const cookieService = new NextCookieService();

export async function getAttemptOpenAnswerAction(
  attemptId: string,
  questionId: string,
) {
  const token = await cookieService.getSession();

  if (!token) {
    throw new Error("Non autorizzato");
  }

  const session = await tokenService.verify(token);

  if (!session || session.role !== "admin") {
    throw new Error("Accesso negato");
  }

  const answers = await quizRepository.findAnswersByAttemptId(attemptId);

  const answer = answers.find((a) => a.questionId === questionId);

  return {
    success: true,
    answer: answer?.openAnswerText ?? "",
  };
}
