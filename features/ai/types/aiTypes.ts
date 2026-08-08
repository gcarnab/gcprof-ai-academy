export interface AISettingConfig {
  provider: string;
  model: string;
  masterModel?: string;
  gradingModel?: string;
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
  systemPrompt?: string;
  masterPrompt?: string;
  gradingPrompt?: string;
  enabled: boolean;
}

export interface MasterAnswerRequest {
  questionText: string;
  quizContext?: string;
  maxScore?: number;
}

export interface MasterAnswerResponse {
  masterAnswer: string;
  rubric: string[];
  provider: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
  elapsedMs?: number;
}

export interface StudentEvaluationRequest {
  questionText: string;
  masterAnswer: string;
  studentAnswer: string;
  maxScore: number;
  quizContext?: string;
}

export interface StudentEvaluationResponse {
  suggestedScore: number;
  feedback: string;
  confidence: number;
  provider: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
  elapsedMs?: number;
}