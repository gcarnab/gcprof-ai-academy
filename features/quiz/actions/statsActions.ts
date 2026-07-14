"use server";

import { QuizStatsRepository } from "../repositories/QuizStatsRepository";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";

const statsRepository = new QuizStatsRepository();
const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

async function verifyAdminSession() {
  const token = await cookieService.getSession();
  if (!token) throw new Error("Non autorizzato.");

  const payload = await tokenService.verify(token);
  if (!payload || payload.role !== "admin") {
    throw new Error("Accesso negato: Richiesti privilegi docente.");
  }
}

export async function getQuizAnalyticsAction(quizId: string) {
  try {
    await verifyAdminSession();
    const data = await statsRepository.getQuizAnalytics(quizId);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}