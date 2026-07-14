export type QuizStatus = "draft" | "active";

export interface Quiz {
  id: string;

  title: string;

  description?: string;

  status: QuizStatus;

  /**
   * Abilita la penalizzazione
   * delle risposte errate.
   */
  penaltyEnabled: boolean;

  /**
   * Penalizzazione applicata
   * ad ogni risposta chiusa errata.
   *
   * Default dominio:
   * -0.25 punti
   */
  negativeMark: number;

  /**
   * Punteggio massimo teorico.
   *
   * Dominio quiz:
   * 8 domande chiuse = 4 punti
   * 1 domanda aperta = 6 punti
   *
   * Totale:
   * 10 punti
   */
  maxScore: number;

  /**
   * Soglia minima per superare il quiz.
   *
   * Valore percentuale o equivalente
   * definito dal creatore quiz.
   */
  passingScore: number;

  createdBy?: string;

  createdAt: Date;

  updatedAt: Date;
}


export interface CourseQuiz {
  courseId: string;
  quizId: string;
}