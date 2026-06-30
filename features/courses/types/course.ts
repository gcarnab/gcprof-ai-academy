export type CourseDifficulty = "Facile" | "Intermedio" | "Avanzato";

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minuti
  contentType: "video" | "document" | "mixed";
  youtubeUrl?: string;     // es: https://www.youtube.com/watch?v=... o https://youtu.be/...
  googleDriveUrl?: string; // es: https://docs.google.com/document/d/.../edit o /pub
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: CourseDifficulty | string;
  teacher: string;
  estimatedHours: number;
  coverImage?: string;
  published: boolean;
  allowedClasses: string[];
  modules: Module[]; // Struttura ad albero per i contenuti
}