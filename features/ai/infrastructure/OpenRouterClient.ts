import { ResolvedAISettings } from "../config/aiConfig";

export class OpenRouterClient {
  private config: ResolvedAISettings;

  constructor(config: ResolvedAISettings) {
    this.config = config;
  }

  async generateCompletion(params: {
    prompt: string;
    systemPrompt?: string;
    modelOverride?: string;
  }): Promise<string> {
    if (!this.config.enabled) {
      throw new Error("Il servizio IA è disabilitato nelle impostazioni.");
    }

    if (!this.config.apiKey) {
      throw new Error("Chiave API OpenRouter (AI_API_KEY) mancante.");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://gcprof.com",
          "X-Title": "GCPROF AI Academy",
        },
        body: JSON.stringify({
          model: params.modelOverride || this.config.model,
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
          messages: [
            ...(params.systemPrompt
              ? [{ role: "system", content: params.systemPrompt }]
              : []),
            { role: "user", content: params.prompt },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Errore OpenRouter: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || "";
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error(`Timeout richiesta IA superato (${this.config.timeoutMs}ms).`);
      }
      throw error;
    }
  }
}