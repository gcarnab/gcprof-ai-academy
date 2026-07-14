import { SupabaseClient } from "@supabase/supabase-js";
import { Course } from "../types/course";
import { CourseMapper } from "../domain/CourseMapper";


export class SupabaseCourseRepository {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Recupera un corso completo di moduli e lezioni tramite il suo slug
   */
  async getBySlug(slug: string): Promise<Course | null> {
    // 1. Estrai il corso
    const { data: course, error: courseError } = await this.supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .single();

    if (courseError || !course) return null;

    // 2. Estrai tutti i moduli associati al corso
    const { data: modules, error: modulesError } = await this.supabase
      .from("course_modules")
      .select("*")
      .eq("course_id", course.id)
      .order("sort_order", { ascending: true });

    if (modulesError || !modules) return null;

    const moduleIds = modules.map((m) => m.id);

    // 3. Estrai tutte le lezioni dei moduli estratti
    let lessons: any[] = [];
    if (moduleIds.length > 0) {
      const { data: lessonsData, error: lessonsError } = await this.supabase
        .from("lessons")
        .select("*")
        .in("module_id", moduleIds)
        .order("sort_order", { ascending: true });

      if (!lessonsError && lessonsData) {
        lessons = lessonsData;
      }
    }

    // 4. Mappa i dati flat nella struttura ad albero del tuo dominio
    return CourseMapper.toDomain(course, modules, lessons);
  }

  /**
   * Elenca i corsi visibili a una specifica classe dello studente
   */
  async findAvailableForClass(className: string): Promise<Omit<Course, "modules">[]> {
    const { data, error } = await this.supabase
      .from("courses")
      .select("*")
      .eq("published", true)
      .contains("allowed_classes", [className])
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      category: c.category,
      difficulty: c.difficulty,
      teacher: c.teacher,
      estimatedHours: c.estimated_hours,
      coverImage: c.cover_image || undefined,
      published: c.published,
      allowedClasses: c.allowed_classes,
      // 🎯 SOLUZIONE: Mappiamo i quiz anche nel catalogo iniziale dei corsi
      quizAssignments: c.quiz_assignments || c.quizAssignments || [],
    }));
  }
}