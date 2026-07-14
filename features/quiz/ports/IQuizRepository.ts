import { Quiz, QuizStatus } from "../domain/Quiz";
import { QuizQuestion } from "../domain/Question";
import { QuizAttempt } from "../domain/QuizAttempt";
import { QuizAnswer } from "../domain/QuizAnswer";
import { QuizReview } from "../domain/QuizReview";
import { ParsedQuiz } from "../validators/quizValidators";

export interface IQuizRepository {
  // --- OPERATIONS: QUIZ MANAGEMENT (ADMIN CRUD & ASSOCIAZIONI) ---
  
  /**
   * Registra in modo atomico un intero quiz parsed (metadati, domande ed opzioni) nel database.
   * Gestisce l'inserimento in transazione per garantire la consistenza dei dati.
   */
  createFromParsed(parsedQuiz: ParsedQuiz, adminId: string): Promise<Quiz>;

  /**
   * Recupera un quiz specifico tramite il suo identificativo unico.
   */
  findById(id: string): Promise<Quiz | null>;

  /**
   * Recupera la struttura completa di un quiz, includendo tutte le domande e le relative opzioni.
   */
  findFullQuizStructure(quizId: string): Promise<{ quiz: Quiz; questions: QuizQuestion[] }>;

  /**
   * Ritorna la lista di tutti i quiz presenti a sistema (per la dashboard di amministrazione).
   */
  findAll(): Promise<Quiz[]>;

  /**
   * Aggiorna lo stato di pubblicazione di un quiz ('draft' | 'active').
   */
  updateStatus(id: string, status: QuizStatus): Promise<void>;

  /**
   * Associa un quiz specifico a un determinato corso (Tabella pivot course_quizzes).
   */
  assignToCourse(quizId: string, courseId: string): Promise<void>;

  /**
   * Rimuove l'associazione tra un quiz e un determinato corso.
   */
  removeFromCourse(quizId: string, courseId: string): Promise<void>;

  /**
   * Recupera tutti i quiz attivi ed associati a uno specifico corso.
   */
  findActiveQuizzesByCourse(courseId: string): Promise<Quiz[]>;

  /**
   * Elimina definitivamente un quiz e tutte le sue dipendenze in cascata (domande, opzioni).
   */
  delete(id: string): Promise<void>;


  // --- OPERATIONS: STUDENT ATTEMPTS & ANSWERS ---

  /**
   * Inizializza un nuovo tentativo di sottomissione per uno studente.
   */
  createAttempt(quizId: string, studentId: string): Promise<QuizAttempt>;

  /**
   * Salva in blocco le risposte fornite dallo studente e contestualmente aggiorna 
   * il tentativo con i punteggi calcolati ed il cambio di stato in 'submitted'.
   */
  saveAttemptSubmission(
    attemptId: string, 
    answers: Omit<QuizAnswer, "id" | "createdAt">[], 
    autoScore: number
  ): Promise<QuizAttempt>;

  /**
   * Verifica se uno studente ha già completato o sottomesso un tentativo per un determinato quiz.
   */
  hasStudentAttempted(quizId: string, studentId: string): Promise<boolean>;

  /**
   * Recupera un tentativo specifico tramite ID.
   */
  findAttemptById(attemptId: string): Promise<QuizAttempt | null>;

  /**
   * Recupera tutte le risposte fornite dallo studente all'interno di un determinato tentativo.
   */
  findAnswersByAttemptId(attemptId: string): Promise<QuizAnswer[]>;

  /**
   * Ritorna tutti i tentativi sottomessi dagli studenti per un determinato quiz (per la griglia di correzione dell'admin).
   */
  findAttemptsByQuizId(quizId: string): Promise<QuizAttempt[]>;


  // --- OPERATIONS: GRADING & REVIEWS (TEACHER) ---

  /**
   * Salva la valutazione manuale della domanda aperta ed esegue la transazione di aggiornamento
   * del tentativo calcolando il final_score e mutando lo stato in 'graded'.
   */
  submitReviewAndGrade(
    review: Omit<QuizReview, "id" | "reviewedAt">, 
    finalScore: number
  ): Promise<QuizAttempt>;


  // --- OPERATIONS: ANALYTICS & STATS ---

  /**
   * Estrae i dati aggregati relativi alle performance globali dei quiz (conteggi, medie voti).
   */
  getGlobalQuizStats(): Promise<{
    totalCreated: number;
    totalPublished: number;
    totalCompleted: number;
    pendingReviewsCount: number;
    averageScore: number;
  }>;

  /**
   * Estrae la distribuzione dei voti finali aggregati per fasce (0-3, 4-6, 7-8, 9-10).
   */
  getVotesDistribution(): Promise<Record<string, number>>;

  /**
   * Ritorna la classifica o l'elenco delle domande chiuse che hanno registrato la percentuale di errore più alta.
   */
  getMostFailedQuestions(limit?: number): Promise<{ questionId: string; questionText: string; errorCount: number }[]>;
}