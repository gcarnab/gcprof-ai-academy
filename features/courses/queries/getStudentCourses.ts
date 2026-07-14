import { getSupabaseAdmin } from "@/lib/supabase";

export async function getStudentCoursesAction(profileId: string) {
  const supabase = getSupabaseAdmin();

  try {
    // 🎯 AGGIORNATO: Estesa la select per includere moduli e lezioni con la colonna quiz_id
    const { data, error } = await supabase
      .from("profile_courses")
      .select(
        `
        course_id,
        enrolled_at,
        courses!inner (
          id,
          slug,
          title,
          description,
          category,
          difficulty,
          teacher,
          estimated_hours,
          cover_image,
          published,
          course_modules (
            id,
            title,
            order_index,
            course_lessons (
              id,
              title,
              content_type,
              external_url,
              content,
              order_index,
              quiz_id
            )
          )
        )
      `,
      )
      .eq("profile_id", profileId)
      .eq("courses.published", true);

    if (error) {
      console.error(
        "Errore nel recupero dei corsi dalla tabella fisica:",
        error.message,
      );
      return { success: false, error: "Impossibile recuperare i corsi." };
    }

    // Trasformiamo la struttura annidata nel modello richiesto dalla dashboard mantenendo la gerarchia
    const normalizedCourses =
      data?.map((item: any) => ({
        course_id: item.course_id,
        course_title: item.courses.title,
        course_slug: item.courses.slug,
        course_description: item.courses.description,
        category: item.courses.category,
        difficulty: item.courses.difficulty,
        teacher: item.courses.teacher,
        estimated_hours: item.courses.estimated_hours,
        cover_image: item.courses.cover_image,
        published: item.courses.published,
        course_assigned_at: item.enrolled_at,
        // 🎯 NUOVO: Passiamo la struttura moduli/lezioni aggiornata alla UI
        modules: item.courses.course_modules || [],
      })) || [];

    return { success: true, data: normalizedCourses };
  } catch (err) {
    console.error("Errore server in getStudentCoursesAction:", err);
    return { success: false, error: "Errore di rete o del server." };
  }
}
