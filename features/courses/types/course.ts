export type CourseDifficulty = "Facile" | "Intermedio" | "Avanzato";

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minuti
  contentType: "video" | "document" | "mixed";
  youtubeUrl?: string;
  googleDriveUrl?: string;
  quizId?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isPreview?: boolean;
}

// Nuova interfaccia per l'assegnazione dei quiz a livello di corso
export interface QuizAssignment {
  id: string;
  quizId: string;
  quizTitle: string;
  dueAt?: string;
}

export interface Course {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  teacher: string;
  estimatedHours: number;
  price?: number; // 🟢 Proprietà aggiunta come opzionale
  isPaid?: boolean;
  is_paid?: boolean;
  coverImage?: string;
  published: boolean;
  allowedClasses: string[];
  modules: Module[];
  quizAssignments?: QuizAssignment[];
}
