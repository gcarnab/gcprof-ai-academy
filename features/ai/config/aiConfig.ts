export interface ResolvedAISettings {
  enabled: boolean;
  provider: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  masterModel: string;
  gradingModel: string;
  timeoutMs: number;
  maxTokens: number;
  temperature: number;
}

export function getResolvedAISettings(dbSettings?: any): ResolvedAISettings {
  return {
    enabled: dbSettings?.enabled ?? process.env.AI_ENABLE === "true",
    provider: dbSettings?.provider || process.env.AI_PROVIDER || "openrouter",
    baseUrl: process.env.AI_BASE_URL || "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_API_KEY || "",
    model: dbSettings?.model || process.env.AI_MODEL || "deepseek/deepseek-chat",
    masterModel: dbSettings?.master_model || process.env.AI_MASTER_MODEL || "deepseek/deepseek-chat",
    gradingModel: dbSettings?.grading_model || process.env.AI_GRADING_MODEL || "deepseek/deepseek-chat",
    timeoutMs: Number(dbSettings?.timeout_ms ?? process.env.AI_TIMEOUT_MS ?? 30000),
    maxTokens: Number(dbSettings?.max_tokens ?? process.env.AI_MAX_TOKENS ?? 2048),
    temperature: Number(dbSettings?.temperature ?? process.env.AI_TEMPERATURE ?? 0.2),
  };
}