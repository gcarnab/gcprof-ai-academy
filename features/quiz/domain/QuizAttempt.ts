export type AttemptStatus = "submitted" | "graded";

/**
 * Tentativo di svolgimento di un quiz da parte di uno studente.
 */
export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  autoScore: number;
  teacherScore: number;
  finalScore: number;
  status: AttemptStatus;
  xpAwarded?: boolean;
  createdAt: Date;
}
