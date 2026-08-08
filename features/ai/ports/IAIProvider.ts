import {
  MasterAnswerRequest,
  MasterAnswerResponse,
  StudentEvaluationRequest,
  StudentEvaluationResponse,
  AISettingConfig,
} from "../types/aiTypes";

export interface IAIProvider {
  readonly providerName: string;

  generateMasterAnswer(
    request: MasterAnswerRequest,
    configOverride?: Partial<AISettingConfig>
  ): Promise<MasterAnswerResponse>;

  evaluateStudentAnswer(
    request: StudentEvaluationRequest,
    configOverride?: Partial<AISettingConfig>
  ): Promise<StudentEvaluationResponse>;
}