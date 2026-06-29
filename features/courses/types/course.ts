/**
 * ============================================================================
 * TYPE: Course (LMS Version)
 * ----------------------------------------------------------------------------
 * Estensione del modello per supportare:
 * - moduli
 * - lezioni
 * ============================================================================
 */

export interface LessonContent {
  type: "video" | "text" | "link" | "file";

  title?: string;

  /**
   * URL generico:
   * - YouTube
   * - Google Drive
   * - PDF
   * - link esterni
   */
  url?: string;

  /**
   * contenuto testuale (futuro)
   */
  content?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // minuti

  contents: LessonContent[];
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
  difficulty: string;
  teacher: string;

  estimatedHours: number;

  coverImage?: string;

  published: boolean;

  /**
   * NUOVA STRUTTURA LMS
   */
  modules: Module[];
}
