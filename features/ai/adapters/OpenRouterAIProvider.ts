import { IAIProvider } from "../ports/IAIProvider";
import {
  MasterAnswerRequest,
  MasterAnswerResponse,
  StudentEvaluationRequest,
  StudentEvaluationResponse,
  AISettingConfig,
} from "../types/aiTypes";
import { logger } from "@/lib/logger";

export class OpenRouterAIProvider implements IAIProvider {
  readonly providerName = "openrouter";

  private getApiKey(): string {
    const key = process.env.AI_API_KEY;
    if (!key) {
      throw new Error("Configurazione mancante: AI_API_KEY non definita nelle variabili d'ambiente.");
    }
    return key;
  }

  private getBaseUrl(): string {
    return process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  }

  private cleanJsonResponse(rawText: string): string {
    return rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
  }

  async generateMasterAnswer(
    request: MasterAnswerRequest,
    configOverride?: Partial<AISettingConfig>
  ): Promise<MasterAnswerResponse> {
    const startTime = Date.now();
    const model = configOverride?.masterModel || configOverride?.model || process.env.AI_MASTER_MODEL || process.env.AI_MODEL || "deepseek/deepseek-chat";
    const temperature = configOverride?.temperature ?? Number(process.env.AI_TEMPERATURE || 0.2);
    const maxTokens = configOverride?.maxTokens ?? Number(process.env.AI_MAX_TOKENS || 2048);
    const timeoutMs = configOverride?.timeoutMs ?? Number(process.env.AI_TIMEOUT_MS || 30000);

    const systemPrompt =
      configOverride?.systemPrompt ||
      process.env.AI_SYSTEM_PROMPT ||
      "Sei un docente esperto incaricato di creare soluzioni ufficiali di riferimento per quesiti d'esame.";

    const userPrompt = `
Domanda Aperta:
"${request.questionText}"

${request.quizContext ? `Contesto del Quiz: ${request.quizContext}\n` : ""}
Punteggio massimo disponibile: ${request.maxScore ?? 6} punti.

Rispondi tassativamente in formato JSON con la seguente struttura esatta:
{
  "masterAnswer": "Testo completo e dettagliato della risposta ideale.",
  "rubric": ["Punto chiave 1 per la valutazione", "Punto chiave 2", "Punto chiave 3"]
}
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${this.getBaseUrl()}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.getApiKey()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "Quiz Management Platform",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(this.cleanJsonResponse(rawContent));

      return {
        masterAnswer: parsed.masterAnswer || "",
        rubric: Array.isArray(parsed.rubric) ? parsed.rubric : [],
        provider: this.providerName,
        model,
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        elapsedMs: Date.now() - startTime,
      };
    } catch (error: any) {
      logger.error("❌ Errore durante OpenRouter generateMasterAnswer:", error);
      throw new Error(`Impossibile generare la risposta master con AI: ${error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  async evaluateStudentAnswer(
    request: StudentEvaluationRequest,
    configOverride?: Partial<AISettingConfig>
  ): Promise<StudentEvaluationResponse> {
    const startTime = Date.now();
    const model = configOverride?.gradingModel || configOverride?.model || process.env.AI_GRADING_MODEL || process.env.AI_MODEL || "deepseek/deepseek-chat";
    const temperature = configOverride?.temperature ?? Number(process.env.AI_TEMPERATURE || 0.2);
    const maxTokens = configOverride?.maxTokens ?? Number(process.env.AI_MAX_TOKENS || 2048);
    const timeoutMs = configOverride?.timeoutMs ?? Number(process.env.AI_TIMEOUT_MS || 30000);

    const systemPrompt =
      configOverride?.systemPrompt ||
      process.env.AI_SYSTEM_PROMPT ||
      "Sei un docente rigoroso ed equo incaricato di valutare le risposte degli studenti.";

    const userPrompt = `
Valuta la seguente risposta aperta fornita dallo studente.

Testo della Domanda:
"${request.questionText}"

Risposta Master di Riferimento:
"${request.masterAnswer}"

Risposta Fornita dallo Studente:
"${request.studentAnswer || "Nessuna risposta fornita."}"

Punteggio Massimo Disponibile: ${request.maxScore} punti.

Istruzioni per l'assegnazione del voto:
- Assegna un valore numerico tra 0 e ${request.maxScore} (sono ammessi decimali a passi di 0.5, ad es. 4.5).
- Sii oggettivo e confronta la risposta con la risposta master.
- Calcola una percentuale di confidenza (0-100) basata su quanto la risposta dello studente sia chiara e confrontabile.

Rispondi tassativamente in formato JSON con la seguente struttura esatta:
{
  "suggestedScore": 5.5,
  "feedback": "Motivazione chiara e sintetica sui punti di forza e le omissioni.",
  "confidence": 95
}
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${this.getBaseUrl()}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.getApiKey()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "Quiz Management Platform",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(this.cleanJsonResponse(rawContent));

      let suggestedScore = Number(parsed.suggestedScore ?? 0);
      if (isNaN(suggestedScore)) suggestedScore = 0;
      if (suggestedScore < 0) suggestedScore = 0;
      if (suggestedScore > request.maxScore) suggestedScore = request.maxScore;

      return {
        suggestedScore,
        feedback: parsed.feedback || "Nessun dettaglio motivazionale fornito.",
        confidence: Number(parsed.confidence ?? 80),
        provider: this.providerName,
        model,
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        elapsedMs: Date.now() - startTime,
      };
    } catch (error: any) {
      logger.error("❌ Errore durante OpenRouter evaluateStudentAnswer:", error);
      throw new Error(`Impossibile valutare la risposta con AI: ${error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }
}