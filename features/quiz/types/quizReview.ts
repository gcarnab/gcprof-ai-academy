export type StudentUserType = "SCHOOL_STUDENT" | "EXTERNAL_STUDENT";

export interface StudentProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  userType: StudentUserType;
  studyPath?: string;
  section?: string;
}

export interface TeacherQuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  autoScore: number;
  finalScore?: number | null;
  status: "SUBMITTED" | "GRADED";
  submittedAt: string;
  profile: StudentProfile;
  questionId: string;
  questionText: string;
  studentAnswerText: string;
  reviewId?: string;
  initialScore?: number;
  initialComment?: string;
}