import { getSupabaseAdmin } from "@/lib/supabase";
import { AISettingConfig, StudentEvaluationResponse } from "../types/aiTypes";
import { logger } from "@/lib/logger";

export interface SaveAIReviewPayload extends StudentEvaluationResponse {
  attemptId: string;
  questionId: string;
  studentAnswer: string;
  masterAnswer: string;
  maxScore: number;
  systemPrompt?: string;
  gradingPrompt?: string;
}

export interface AITokenStats {
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalReviews: number;
}

export class SupabaseAIRepository {
  private client = getSupabaseAdmin();

  async getAISettings(): Promise<AISettingConfig | null> {
    try {
      const { data, error } = await this.client
        .from("ai_settings")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        logger.error("Errore nel recupero ai_settings da DB:", error);
        return null;
      }

      if (!data) return null;

      return {
        provider: data.provider,
        model: data.model,
        masterModel: data.master_model,
        gradingModel: data.grading_model,
        temperature: Number(data.temperature),
        maxTokens: Number(data.max_tokens),
        timeoutMs: Number(data.timeout_ms),
        systemPrompt: data.system_prompt ?? "",
        masterPrompt: data.master_prompt ?? "",
        gradingPrompt: data.grading_prompt ?? "",
        enabled: Boolean(data.enabled),
      };
    } catch (err: any) {
      logger.error("Eccezione durante getAISettings:", err);
      return null;
    }
  }

  async saveAIReview(payload: SaveAIReviewPayload): Promise<boolean> {
    try {
      const { error } = await this.client
        .from("quiz_ai_reviews")
        .upsert(
          {
            attempt_id: payload.attemptId,
            question_id: payload.questionId,
            student_answer: payload.studentAnswer,
            master_answer: payload.masterAnswer,
            suggested_score: payload.suggestedScore,
            max_score: payload.maxScore,
            feedback: payload.feedback,
            confidence: payload.confidence,
            provider: payload.provider,
            model: payload.model,
            system_prompt: payload.systemPrompt,
            grading_prompt: payload.gradingPrompt,
            prompt_tokens: payload.promptTokens,
            completion_tokens: payload.completionTokens,
            elapsed_ms: payload.elapsedMs,
          },
          { onConflict: "attempt_id,question_id" },
        );

      if (error) {
        logger.error(
          `Errore nel salvataggio quiz_ai_review (attempt: ${payload.attemptId}):`,
          error,
        );
        return false;
      }

      return true;
    } catch (err: any) {
      logger.error("Eccezione durante saveAIReview:", err);
      return false;
    }
  }

  async findAIReview(attemptId: string, questionId: string) {
    try {
      const { data, error } = await this.client
        .from("quiz_ai_reviews")
        .select("*")
        .eq("attempt_id", attemptId)
        .eq("question_id", questionId)
        .maybeSingle();

      if (error) {
        logger.error(
          `Errore ricerca quiz_ai_review (${attemptId}, ${questionId}):`,
          error,
        );
        return null;
      }

      if (!data) return null;

      return {
        id: data.id,
        attemptId: data.attempt_id,
        questionId: data.question_id,
        studentAnswer: data.student_answer,
        masterAnswer: data.master_answer,
        suggestedScore: Number(data.suggested_score),
        maxScore: Number(data.max_score),
        feedback: data.feedback,
        confidence:
          data.confidence !== null ? Number(data.confidence) : undefined,
        provider: data.provider,
        model: data.model,
        createdAt: data.created_at,
      };
    } catch (err: any) {
      logger.error("Eccezione durante findAIReview:", err);
      return null;
    }
  }

  async getAITokenUsageStats(): Promise<AITokenStats> {
    try {
      const { data, error } = await this.client
        .from("quiz_ai_reviews")
        .select("prompt_tokens, completion_tokens");

      if (error) {
        logger.error("Errore recupero statistiche token:", error);
        return { totalPromptTokens: 0, totalCompletionTokens: 0, totalTokens: 0, totalReviews: 0 };
      }

      let totalPromptTokens = 0;
      let totalCompletionTokens = 0;

      (data || []).forEach((row) => {
        totalPromptTokens += Number(row.prompt_tokens || 0);
        totalCompletionTokens += Number(row.completion_tokens || 0);
      });

      return {
        totalPromptTokens,
        totalCompletionTokens,
        totalTokens: totalPromptTokens + totalCompletionTokens,
        totalReviews: data?.length || 0,
      };
    } catch (err: any) {
      logger.error("Eccezione durante getAITokenUsageStats:", err);
      return { totalPromptTokens: 0, totalCompletionTokens: 0, totalTokens: 0, totalReviews: 0 };
    }
  }
}