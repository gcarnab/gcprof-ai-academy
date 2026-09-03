export type QuizStatus = "draft" | "active";

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
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseQuiz {
  courseId: string;
  quizId: string;
}
