/**
 * Valutazione manuale effettuata dal docente
 * sulla domanda aperta del quiz.
 */
export interface QuizReview {
  id: string;

  /**
   * Tentativo dello studente.
   */
  attemptId: string;

  /**
   * Docente che ha effettuato la correzione.
   */
  teacherId: string;

  /**
   * Domanda aperta valutata.
   */
  questionId: string;

  /**
   * Punteggio assegnato.
   *
   * Range: 0.00 → 6.00
   */
  score: number;

  /**
   * Commento opzionale del docente.
   */
  comment?: string;

  /**
   * Data della correzione.
   */
  reviewedAt: Date;
}