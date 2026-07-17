"use server";

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Recupera gli studenti esterni attualmente abilitati ai corsi.
 */
export async function getActiveExternalEnrollmentsAction() {
  try {
    // Rimosso "id," visto che la tabella usa una chiave composta
    const { data, error } = await supabaseAdmin
      .from("profile_courses")
      .select(
        `
        profile_id,
        course_id,
        status,
        enrolled_at,
        profiles:profiles!profile_courses_profile_id_fkey!inner (
          id,
          display_name,
          email,
          user_type
        ),
        courses:courses!profile_courses_course_id_fkey (
          id,
          title,
          slug
        )
      `,
      )
      .eq("status", "active")
      .eq("profiles.user_type", "EXTERNAL_STUDENT")
      .order("enrolled_at", { ascending: false });

    if (error) {
      logger.error("Errore recupero iscrizioni esterne attive:", error);
      return { success: false, error: error.message };
    }

    const mapped = (data || []).map((item: any) => ({
      // Generiamo un id fittizio per la compatibilità con l'interfaccia combinando i due ID
      enrollmentId: `${item.profile_id}-${item.course_id}`,
      profileId: item.profile_id,
      courseId: item.course_id,
      studentName: item.profiles?.display_name || "Studente esterno",
      studentEmail: item.profiles?.email || "",
      userType: item.profiles?.user_type || "EXTERNAL_STUDENT",
      courseTitle: item.courses?.title || "Corso non disponibile",
      courseSlug: item.courses?.slug || "",
      status: item.status,
      enrolledAt: item.enrolled_at || null,
    }));

    return { success: true, data: mapped };
  } catch (error: any) {
    logger.error("Errore imprevisto getActiveExternalEnrollmentsAction:", error);
    return {
      success: false,
      error: error.message || "Errore interno durante il recupero degli studenti esterni.",
    };
  }
}