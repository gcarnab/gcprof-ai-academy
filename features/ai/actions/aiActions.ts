"use server";

import { revalidatePath } from "next/cache";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { AIMasterAnswerService } from "../services/AIMasterAnswerService";
import { AICorrectionService } from "../services/AICorrectionService";
import { SupabaseAIRepository } from "../repositories/SupabaseAIRepository";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();
const masterAnswerService = new AIMasterAnswerService();
const correctionService = new AICorrectionService();
const aiRepository = new SupabaseAIRepository();

export interface AISettingsData {
  id?: string;
  provider?: string;
  model?: string;
  master_model?: string;
  grading_model?: string;
  temperature?: number;
  max_tokens?: number;
  timeout_ms?: number;
  system_prompt?: string;
  master_prompt?: string;
  grading_prompt?: string;
  enabled?: boolean;
}

async function verifyAdminSession() {
  const token = await cookieService.getSession();
  if (!token) throw new Error("Non autorizzato: Sessione mancante.");

  const payload = (await tokenService.verify(token)) as { id: string; role: string } | null;
  if (!payload || payload.role !== "admin") {
    throw new Error("Accesso negato: Richiesto ruolo amministratore/docente.");
  }
  return payload;
}

export async function getAiSettingsAction() {
  try {
    await verifyAdminSession();
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("ai_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      logger.error("Errore nel recupero delle impostazioni AI:", error);
      return { success: false, error: error.message, data: null };
    }

    return { success: true, data };
  } catch (error: any) {
    logger.error("Eccezione in getAiSettingsAction:", error);
    return { success: false, error: error.message, data: null };
  }
}

export async function getAITokenStatsAction() {
  try {
    await verifyAdminSession();
    const stats = await aiRepository.getAITokenUsageStats();
    return { success: true, data: stats };
  } catch (error: any) {
    logger.error("Eccezione in getAITokenStatsAction:", error);
    return { success: false, error: error.message, data: null };
  }
}

export async function updateAiSettingsAction(payload: AISettingsData) {
  try {
    await verifyAdminSession();
    const supabase = getSupabaseAdmin();

    const { data: existingRow } = await supabase
      .from("ai_settings")
      .select("id")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const rowData = {
      provider: payload.provider ?? process.env.AI_PROVIDER ?? "google",
      model: payload.model ?? process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite",
      master_model: payload.master_model ?? process.env.GEMINI_MASTER_MODEL ?? process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite",
      grading_model: payload.grading_model ?? process.env.GEMINI_GRADING_MODEL ?? process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite",
      temperature: payload.temperature !== undefined ? Number(payload.temperature) : Number(process.env.AI_TEMPERATURE ?? 0.20),
      max_tokens: payload.max_tokens !== undefined ? Number(payload.max_tokens) : Number(process.env.AI_MAX_TOKENS ?? 2048),
      timeout_ms: payload.timeout_ms !== undefined ? Number(payload.timeout_ms) : Number(process.env.AI_TIMEOUT_MS ?? 30000),
      system_prompt: payload.system_prompt ?? "",
      master_prompt: payload.master_prompt ?? "",
      grading_prompt: payload.grading_prompt ?? "",
      enabled: payload.enabled ?? (process.env.AI_ENABLE === "true"),
      updated_at: new Date().toISOString(),
    };

    const targetId = payload.id || existingRow?.id;
    let result;

    if (targetId) {
      result = await supabase
        .from("ai_settings")
        .update(rowData)
        .eq("id", targetId)
        .select()
        .single();
    } else {
      result = await supabase
        .from("ai_settings")
        .insert(rowData)
        .select()
        .single();
    }

    if (result.error) {
      logger.error("Errore nel salvataggio di ai_settings:", result.error);
      return { success: false, error: result.error.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/dashboard", "page");
    revalidatePath("/admin/settings/ai", "page");

    return { success: true, data: result.data };
  } catch (error: any) {
    logger.error("Eccezione in updateAiSettingsAction:", error);
    return { success: false, error: error.message };
  }
}

export async function generateMasterAnswerAction(payload: {
  questionText: string;
  quizContext?: string;
  maxScore?: number;
}) {
  try {
    await verifyAdminSession();

    if (!payload.questionText?.trim()) {
      return { success: false, error: "Il testo della domanda è obbligatorio." };
    }

    const result = await masterAnswerService.generate({
      questionText: payload.questionText,
      quizContext: payload.quizContext,
      maxScore: payload.maxScore ?? 6,
    });

    return { success: true, data: result };
  } catch (error: any) {
    logger.error("Errore Action generateMasterAnswerAction:", error);
    return { success: false, error: error.message || "Errore nella generazione della risposta master." };
  }
}

export async function evaluateAnswerAIAction(payload: {
  attemptId: string;
  questionId: string;
  questionText: string;
  masterAnswer: string;
  studentAnswer: string;
  maxScore?: number;
  quizId?: string;
}) {
  try {
    await verifyAdminSession();

    if (!payload.masterAnswer?.trim()) {
      return { success: false, error: "È richiesta una risposta master di riferimento prima di valutare con AI." };
    }

    const result = await correctionService.evaluateAndSave(
      payload.attemptId,
      payload.questionId,
      {
        questionText: payload.questionText,
        masterAnswer: payload.masterAnswer,
        studentAnswer: payload.studentAnswer,
        maxScore: payload.maxScore ?? 6,
      }
    );

    if (payload.quizId) {
      revalidatePath(`/admin/quiz/${payload.quizId}/review`, "page");
    }

    return { success: true, data: result };
  } catch (error: any) {
    logger.error(`Errore Action evaluateAnswerAIAction (${payload.attemptId}):`, error);
    return { success: false, error: error.message || "Errore durante la valutazione AI." };
  }
}

export async function batchEvaluateAnswersAIAction(payload: {
  questionId: string;
  questionText: string;
  masterAnswer: string;
  quizId?: string;
  attempts: Array<{
    attemptId: string;
    studentAnswer: string;
    maxScore?: number;
  }>;
}) {
  try {
    await verifyAdminSession();

    if (!payload.attempts || payload.attempts.length === 0) {
      return { success: false, error: "Nessun tentativo selezionato per la correzione batch." };
    }

    let processedCount = 0;
    let failureCount = 0;

    for (const item of payload.attempts) {
      try {
        await correctionService.evaluateAndSave(
          item.attemptId,
          payload.questionId,
          {
            questionText: payload.questionText,
            masterAnswer: payload.masterAnswer,
            studentAnswer: item.studentAnswer,
            maxScore: item.maxScore ?? 6,
          }
        );
        processedCount++;
      } catch (err) {
        logger.error(`Fallimento correzione batch per attempt ${item.attemptId}:`, err);
        failureCount++;
      }
    }

    if (payload.quizId) {
      revalidatePath(`/admin/quiz/${payload.quizId}/review`, "page");
    }

    return {
      success: true,
      processedCount,
      failureCount,
      total: payload.attempts.length,
    };
  } catch (error: any) {
    logger.error("Errore Action batchEvaluateAnswersAIAction:", error);
    return { success: false, error: error.message || "Errore durante la correzione batch." };
  }
}

export async function getAIReviewAction(attemptId: string, questionId: string) {
  try {
    await verifyAdminSession();
    const review = await aiRepository.findAIReview(attemptId, questionId);
    return { success: true, review };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}