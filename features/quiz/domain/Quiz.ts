export type QuizStatus = "draft" | "active";

export type QuizTargetUserType =
  | "EXTERNAL_STUDENT"
  | "SCHOOL_ONLY"
  | "ALL";

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  status: QuizStatus;
  penaltyEnabled: boolean;
  negativeMark: number;
  maxScore: number;
  passingScore: number;
  courseId?: string;
  moduleId?: string;
  lessonId?: string;

  /**
   * Nuovo modello di targeting.
   *
   * - EXTERNAL_STUDENT: accesso agli studenti esterni
   * - SCHOOL_ONLY: accesso agli studenti scolastici appartenenti
   *   alle classi assegnate tramite quiz_class_assignments
   * - ALL: accesso agli studenti esterni e agli studenti scolastici
   *   appartenenti alle classi assegnate
   */
  targetUserType?: QuizTargetUserType;

  /**
   * Campi legacy mantenuti per compatibilità e rollback.
   * Non rappresentano il nuovo modello N:M.
   */
  classId?: string;
  schoolTrack?: string;
  schoolSection?: string;

  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseQuiz {
  courseId: string;
  quizId: string;
}