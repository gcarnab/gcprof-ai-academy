import { IAIProvider } from "../ports/IAIProvider";
import { OpenRouterAIProvider } from "../adapters/OpenRouterAIProvider";
import { GoogleGeminiAIProvider } from "../adapters/GoogleGeminiAIProvider";
import { SupabaseAIRepository } from "../repositories/SupabaseAIRepository";
import { MasterAnswerRequest, MasterAnswerResponse } from "../types/aiTypes";
import { logger } from "@/lib/logger";

export class AIMasterAnswerService {
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

  async generate(request: MasterAnswerRequest): Promise<MasterAnswerResponse> {
    const dbSettings = await this.aiRepository.getAISettings();

    if (dbSettings && !dbSettings.enabled) {
      throw new Error(
        "Il servizio di generazione AI è disabilitato nelle impostazioni.",
      );
    }

    const provider = this.getProvider(dbSettings?.provider);

    logger.info("🤖 Inizio generazione risposta master con AI", {
      questionText: request.questionText.substring(0, 50),
      provider: provider.providerName,
      model:
        dbSettings?.masterModel ||
        dbSettings?.model ||
        "gemini-2.5-flash",
    });

    return provider.generateMasterAnswer(
      request,
      dbSettings || undefined,
    );
  }
}