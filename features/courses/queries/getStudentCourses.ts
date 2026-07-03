import { getSupabaseAdmin } from "@/lib/supabase";

export async function getStudentCoursesAction(profileId: string) {
  const supabase = getSupabaseAdmin();

  try {
    // Interroghiamo la tabella fisica ed eseguiamo la join con i dettagli del corso
    const { data, error } = await supabase
      .from("profile_courses")
      .select(`
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
          published
        )
      `)
      .eq("profile_id", profileId)
      .eq("courses.published", true);

    if (error) {
      console.error("Errore nel recupero dei corsi dalla tabella fisica:", error.message);
      return { success: false, error: "Impossibile recuperare i corsi." };
    }

    // Trasformiamo la struttura annidata nel modello piatto richiesto dalla dashboard
    const normalizedCourses = data?.map((item: any) => ({
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
      course_assigned_at: item.enrolled_at
    })) || [];

    return { success: true, data: normalizedCourses };
  } catch (err) {
    console.error("Errore server in getStudentCoursesAction:", err);
    return { success: false, error: "Errore di rete o del server." };
  }
}