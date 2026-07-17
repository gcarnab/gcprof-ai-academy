"use server";

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Riattiva un accesso precedentemente revocato impostando lo stato su 'active'.
 */
export async function reactivateExternalEnrollmentAction(profileId: string, courseId: string) {
  if (!profileId || !courseId) {
    return { success: false, error: "Dati mancanti per la riattivazione." };
  }

  try {
    const { error } = await supabaseAdmin
      .from("profile_courses")
      .update({
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("profile_id", profileId)
      .eq("course_id", courseId);

    if (error) {
      logger.error("Errore durante la riattivazione dell'accesso:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    logger.error("Errore imprevisto in reactivateExternalEnrollmentAction:", err);
    return { success: false, error: err.message || "Errore interno del server." };
  }
}