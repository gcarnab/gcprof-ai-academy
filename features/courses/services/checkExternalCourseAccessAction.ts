"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Verifica se uno studente esterno ha un accesso attivo per un determinato corso.
 */
export async function checkExternalCourseAccessAction(courseId: string, userId: string): Promise<boolean> {
  if (!courseId || !userId) return false;

  try {
    const { data, error } = await supabaseAdmin
      .from("profile_courses")
      .select("status")
      .eq("profile_id", userId)
      .eq("course_id", courseId)
      .eq("status", "active")
      .maybeSingle(); // Evita di lanciare eccezioni se il record non esiste

    if (error) {
      console.error("Errore durante il controllo dell'accesso esterno:", error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("Errore imprevisto nel controllo accesso esterno:", err);
    return false;
  }
}