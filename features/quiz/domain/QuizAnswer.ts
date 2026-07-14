/**
 * Risposta fornita dallo studente ad una singola domanda del quiz.
 */
export interface QuizAnswer {
  id: string;

  attemptId: string;
  questionId: string;

  /**
   * Opzione selezionata dallo studente.
   * Presente solo per le domande a risposta multipla.
   */
  selectedOptionId?: string;

  /**
   * Testo della risposta aperta.
   * Presente solo per le domande open_ended.
   */
  openAnswerText?: string;

  /**
   * Esito della valutazione.
   *
   * - true  -> risposta corretta
   * - false -> risposta errata
   * - undefined -> non ancora valutata
   */
  isCorrect?: boolean;

  /**
   * Punteggio assegnato a questa risposta.
   *
   * Domande chiuse:
   * +0.50  risposta corretta
   * -0.25  risposta errata (se la penalità è abilitata)
   *  0.00  risposta errata (se la penalità è disabilitata)
   *
   * Domanda aperta:
   * 0.00 → 6.00 (assegnato dal docente)
   */
  score: number;

  createdAt: Date;
}
