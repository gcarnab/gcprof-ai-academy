"use server";

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Recupera gli studenti esterni attualmente attivi e i relativi corsi associati.
 */
export async function getActiveExternalEnrollmentsAction() {
  try {
    // !profile_id disambigua la doppia FK verso profiles (profile_id vs approved_by)
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select(
        `
        id,
        display_name,
        email,
        user_type,
        status,
        created_at,
        profile_courses:profile_courses!profile_id (
          course_id,
          status,
          enrolled_at,
          courses (
            id,
            title,
            slug
          )
        )
      `,
      )
      .eq("user_type", "EXTERNAL_STUDENT")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Errore recupero utenti esterni attivi:", error);
      return { success: false, error: error.message };
    }

    const mapped = (data || []).flatMap((profile: any) => {
      const userCourses = profile.profile_courses || [];

      // Caso 1: Utente esterno attivo ma senza corsi in profile_courses
      if (userCourses.length === 0) {
        return [
          {
            enrollmentId: `${profile.id}-no-course`,
            profileId: profile.id,
            courseId: null,
            studentName: profile.display_name || "Studente esterno",
            studentEmail: profile.email || "",
            userType: profile.user_type,
            courseTitle: "Nessun corso assegnato",
            courseSlug: "",
            status: profile.status,
            enrolledAt: profile.created_at,
          },
        ];
      }

      // Caso 2: Utente attivo con corsi associati
      return userCourses.map((pc: any) => ({
        enrollmentId: `${profile.id}-${pc.course_id}`,
        profileId: profile.id,
        courseId: pc.course_id,
        studentName: profile.display_name || "Studente esterno",
        studentEmail: profile.email || "",
        userType: profile.user_type,
        courseTitle: pc.courses?.title || "Corso non disponibile",
        courseSlug: pc.courses?.slug || "",
        status: pc.status || profile.status,
        enrolledAt: pc.enrolled_at || profile.created_at,
      }));
    });

    return { success: true, data: mapped };
  } catch (error: any) {
    logger.error("Errore imprevisto getActiveExternalEnrollmentsAction:", error);
    return {
      success: false,
      error:
        error.message ||
        "Errore interno durante il recupero degli studenti esterni.",
    };
  }
}