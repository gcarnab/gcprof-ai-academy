export type AttemptStatus = "submitted" | "graded";

/**
 * Tentativo di svolgimento di un quiz da parte di uno studente.
 */
export interface QuizAttempt {
  id: string;

  quizId: string;
  studentId: string;

  /**
   * Istante di apertura del quiz.
   */
  startedAt: Date;

  /**
   * Istante di consegna del quiz.
   * Undefined finché il quiz non viene consegnato.
   */
  completedAt?: Date;

  /**
   * Punteggio calcolato automaticamente
   * sulle 8 domande chiuse.
   *
   * Range: 0.00 → 4.00
   */
  autoScore: number;

  /**
   * Punteggio assegnato dal docente
   * alla domanda aperta.
   *
   * Range: 0.00 → 6.00
   */
  teacherScore: number;

  /**
   * Voto finale.
   *
   * autoScore + teacherScore
   *
   * Range: 0.00 → 10.00
   */
  finalScore: number;

  status: AttemptStatus;

  createdAt: Date;
}
