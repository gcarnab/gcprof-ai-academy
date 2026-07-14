import { Course, Module, Lesson } from "../types/course";

export class CourseMapper {
  /**
   * Converte le righe aggregate provenienti da Supabase nella tua struttura ad albero tipizzata
   */
  static toDomain(rawCourse: any, rawModules: any[], rawLessons: any[]): Course {
    const modules: Module[] = rawModules
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => {
        const lessons: Lesson[] = rawLessons
          .filter((l) => l.module_id === m.id)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            contentType: l.content_type as "video" | "document" | "mixed",
            youtubeUrl: l.youtube_url || undefined,
            googleDriveUrl: l.google_drive_url || undefined,
            quizId: l.quiz_id || undefined, // Mantiene la foreign key verso il modulo quiz
          }));

        return {
          id: m.id,
          title: m.title,
          lessons,
        };
      });

    return {
      id: rawCourse.id,
      slug: rawCourse.slug,
      title: rawCourse.title,
      description: rawCourse.description,
      category: rawCourse.category,
      difficulty: rawCourse.difficulty,
      teacher: rawCourse.teacher,
      estimatedHours: rawCourse.estimated_hours,
      coverImage: rawCourse.cover_image || undefined,
      published: rawCourse.published,
      allowedClasses: rawCourse.allowed_classes || [],
      modules,
      // 🎯 RIMEDIO QUI: Mappiamo i quiz dal formato database (snake_case) a camelCase
      quizAssignments: rawCourse.quiz_assignments || rawCourse.quizAssignments || [],
    };
  }
}