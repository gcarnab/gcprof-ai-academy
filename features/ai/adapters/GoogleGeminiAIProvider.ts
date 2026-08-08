import { IAIProvider } from "../ports/IAIProvider";
import {
  StudentEvaluationRequest,
  StudentEvaluationResponse,
  MasterAnswerRequest,
  MasterAnswerResponse,
} from "../types/aiTypes";
import { logger } from "@/lib/logger";

export class GoogleGeminiAIProvider implements IAIProvider {
  readonly providerName: string = "google";

  async generateMasterAnswer(
    request: MasterAnswerRequest,
    settings?: any
  ): Promise<MasterAnswerResponse> {
    const apiKey = settings?.apiKey || process.env.GEMINI_API_KEY;
    const model =
      settings?.masterModel ||
      settings?.model ||
      process.env.GEMINI_MASTER_MODEL ||
      process.env.GEMINI_MODEL;

    if (!apiKey) {
      throw new Error("API Key di Google Gemini (GEMINI_API_KEY) non configurata.");
    }

    if (!model) {
      throw new Error("Nessun modello specificato per la risposta master (GEMINI_MASTER_MODEL).");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt =
      settings?.masterPrompt ||
      settings?.systemPrompt ||
      "Sei un docente esperto nella creazione di soluzioni di riferimento per i quiz.";

    const prompt = `
Domanda: ${request.questionText}
${request.quizContext ? `Contesto Quiz: ${request.quizContext}` : ""}
Punteggio Massimo: ${request.maxScore ?? 6}

Genera una risposta master di riferimento completa, chiara e rigorosa con relativa rubrica di valutazione.
Rispondi TASSATIVAMENTE con un oggetto JSON avente questo schema:
{
  "masterAnswer": "testo della risposta di riferimento",
  "rubric": "criteri sintetici di valutazione"
}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: settings?.temperature ?? Number(process.env.AI_TEMPERATURE ?? 0.2),
        maxOutputTokens: settings?.maxTokens ?? Number(process.env.AI_MAX_TOKENS ?? 2048),
        responseMimeType: "application/json",
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(`Errore API Gemini (${response.status}): ${JSON.stringify(errJson)}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Risposta vuota ricevuta da Google Gemini API.");
      }

      const parsed = JSON.parse(rawText);
      const usage = data.usageMetadata;

      return {
        masterAnswer: parsed.masterAnswer || parsed.answer || rawText,
        rubric: parsed.rubric || "",
        provider: this.providerName,
        model: model,
        promptTokens: usage?.promptTokenCount ? Number(usage.promptTokenCount) : undefined,
        completionTokens: usage?.candidatesTokenCount ? Number(usage.candidatesTokenCount) : undefined,
      };
    } catch (error: any) {
      logger.error("Errore generazione risposta master Gemini:", error);
      throw new Error(`Fallimento generazione master Gemini: ${error.message}`);
    }
  }

  async evaluateStudentAnswer(
    request: StudentEvaluationRequest,
    settings?: any
  ): Promise<StudentEvaluationResponse> {
    const apiKey = settings?.apiKey || process.env.GEMINI_API_KEY;
    const model =
      settings?.gradingModel ||
      settings?.model ||
      process.env.GEMINI_GRADING_MODEL ||
      process.env.GEMINI_MODEL;

    if (!apiKey) {
      throw new Error("API Key di Google Gemini (GEMINI_API_KEY) non configurata.");
    }

    if (!model) {
      throw new Error("Nessun modello specificato per la valutazione (GEMINI_GRADING_MODEL).");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt =
      settings?.gradingPrompt ||
      settings?.systemPrompt ||
      "Sei un valutatore universitario esperto e rigoroso.";

    const prompt = `
Domanda: ${request.questionText}
Risposta Master di Riferimento: ${request.masterAnswer}
Risposta fornita dallo Studente: ${request.studentAnswer}
Punteggio Massimo Ordinabile: ${request.maxScore}

Valuta la risposta dello studente confrontandola con la risposta master.
Rispondi TASSATIVAMENTE con un oggetto JSON avente questo schema:
{
  "suggestedScore": number (da 0 a ${request.maxScore}),
  "feedback": "stringa dettagliata con commenti e motivazione del punteggio",
  "confidence": number (da 0.0 a 1.0)
}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: settings?.temperature ?? Number(process.env.AI_TEMPERATURE ?? 0.2),
        maxOutputTokens: settings?.maxTokens ?? Number(process.env.AI_MAX_TOKENS ?? 2048),
        responseMimeType: "application/json",
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(`Errore API Gemini (${response.status}): ${JSON.stringify(errJson)}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Risposta vuota ricevuta da Google Gemini API.");
      }

      const parsed = JSON.parse(rawText);
      const rawScore = Number(parsed.suggestedScore ?? parsed.score ?? 0);
      const usage = data.usageMetadata;

      return {
        suggestedScore: Math.min(Math.max(rawScore, 0), request.maxScore),
        feedback: parsed.feedback || "Nessun feedback generato.",
        confidence: Number(parsed.confidence ?? 1.0),
        provider: this.providerName,
        model: model,
        promptTokens: usage?.promptTokenCount ? Number(usage.promptTokenCount) : undefined,
        completionTokens: usage?.candidatesTokenCount ? Number(usage.candidatesTokenCount) : undefined,
      };
    } catch (error: any) {
      logger.error("Errore durante la valutazione nativa Gemini:", error);
      throw new Error(`Fallimento valutazione Gemini: ${error.message}`);
    }
  }
}