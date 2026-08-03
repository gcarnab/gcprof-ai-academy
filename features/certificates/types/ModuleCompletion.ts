export interface ModuleCompletion {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  completionPercentage: number;
  quizScore?: number | null;
  xpAwarded: number;
  completed: boolean;
  completedAt?: string | null;
  certificateGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}