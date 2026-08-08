import { IAIProvider } from "../ports/IAIProvider";
import { OpenRouterAIProvider } from "../adapters/OpenRouterAIProvider";
import { GoogleGeminiAIProvider } from "../adapters/GoogleGeminiAIProvider";
import { SupabaseAIRepository } from "../repositories/SupabaseAIRepository";
import {
  StudentEvaluationRequest,
  StudentEvaluationResponse,
} from "../types/aiTypes";
import { logger } from "@/lib/logger";

export class AICorrectionService {
  private aiRepository = new SupabaseAIRepository();

  private getProvider(providerName?: string): IAIProvider {
    switch ((providerName || "google").toLowerCase()) {
      case "google":
      case "gemini":
        return new GoogleGeminiAIProvider();

      case "openrouter":
        return new OpenRouterAIProvider();

      default:
        throw new Error(
          `Provider AI non supportato: ${providerName}`,
        );
    }
  }

  async evaluateAndSave(
    attemptId: string,
    questionId: string,
    request: StudentEvaluationRequest,
  ): Promise<StudentEvaluationResponse> {
    const dbSettings = await this.aiRepository.getAISettings();

    const rawDbSettings = dbSettings as Record<string, any> | null;

    const mergedSettings = {
      ...dbSettings,

      enabled:
        dbSettings?.enabled ??
        (process.env.AI_ENABLE === "true"),

      provider:
        dbSettings?.provider ||
        process.env.AI_PROVIDER ||
        "google",

      model:
        dbSettings?.model ||
        process.env.GEMINI_MODEL ||
        "gemini-2.5-flash",

      masterModel:
        dbSettings?.masterModel ||
        rawDbSettings?.master_model ||
        process.env.GEMINI_MODEL ||
        "gemini-2.5-flash",

      gradingModel:
        dbSettings?.gradingModel ||
        rawDbSettings?.grading_model ||
        process.env.GEMINI_MODEL ||
        "gemini-2.5-flash",

      temperature:
        dbSettings?.temperature !== undefined
          ? Number(dbSettings.temperature)
          : Number(process.env.AI_TEMPERATURE ?? 0.2),

      maxTokens:
        dbSettings?.maxTokens !== undefined
          ? Number(dbSettings.maxTokens)
          : rawDbSettings?.max_tokens !== undefined
            ? Number(rawDbSettings.max_tokens)
            : Number(process.env.AI_MAX_TOKENS ?? 2048),

      timeoutMs:
        dbSettings?.timeoutMs !== undefined
          ? Number(dbSettings.timeoutMs)
          : rawDbSettings?.timeout_ms !== undefined
            ? Number(rawDbSettings.timeout_ms)
            : Number(process.env.AI_TIMEOUT_MS ?? 30000),

      systemPrompt:
        dbSettings?.systemPrompt ||
        rawDbSettings?.system_prompt ||
        "",

      gradingPrompt:
        dbSettings?.gradingPrompt ||
        rawDbSettings?.grading_prompt ||
        "",
    };

    if (!mergedSettings.enabled) {
      logger.warn(
        `⚠️ Valutazione AI saltata per attempt ${attemptId}: il servizio IA è disabilitato.`,
      );

      throw new Error(
        "Il servizio di valutazione IA è disabilitato nelle impostazioni.",
      );
    }

    const provider = this.getProvider(mergedSettings.provider);

    logger.info(
      `🤖 Inizio valutazione AI (${provider.providerName}) per attempt: ${attemptId}, question: ${questionId}`,
    );

    const evaluation = await provider.evaluateStudentAnswer(
      request,
      mergedSettings,
    );

    await this.aiRepository.saveAIReview({
      ...evaluation,
      attemptId,
      questionId,
      studentAnswer: request.studentAnswer,
      masterAnswer: request.masterAnswer,
      maxScore: request.maxScore,
      systemPrompt: mergedSettings.systemPrompt,
      gradingPrompt: mergedSettings.gradingPrompt,
    });

    return evaluation;
  }
}