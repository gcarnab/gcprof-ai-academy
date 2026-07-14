export type QuestionType = "multiple_choice" | "open_ended";

/**
 * Opzione di risposta di una domanda a scelta multipla.
 */
export interface QuizOption {
  id: string;
  questionId: string;

  text: string;
  isCorrect: boolean;
}

/**
 * Domanda appartenente ad un Quiz.
 */
export interface QuizQuestion {
  id: string;
  quizId: string;

  type: QuestionType;

  /**
   * Ordine di visualizzazione all'interno del quiz.
   */
  orderIndex: number;

  /**
   * Testo della domanda.
   */
  text: string;

  /**
   * 0.50 per le domande chiuse.
   * 6.00 per la domanda aperta.
   */
  points: number;

  /**
   * Presente esclusivamente per le domande
   * di tipo multiple_choice.
   */
  options?: QuizOption[];

  createdAt: Date;
}
