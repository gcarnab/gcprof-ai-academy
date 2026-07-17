"use server";

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getPendingEnrollmentsAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from("profile_courses")
      .select(
        `
        profile_id,
        course_id,
        status,
        enrolled_at,
        profiles:profiles!profile_courses_profile_id_fkey!inner (
          email,
          display_name,
          user_type
        ),
        courses:courses!profile_courses_course_id_fkey (
          title
        )
      `,
      )
      .eq("status", "pending")
      .eq("profiles.user_type", "EXTERNAL_STUDENT")
      .order("enrolled_at", { ascending: false });

    if (error) {
      logger.error("Errore nel recupero delle iscrizioni pendenti:", error);
      return { success: false, error: error.message };
    }

    const mapped = (data || []).map((item: any) => ({
      profileId: item.profile_id,
      courseId: item.course_id,
      studentName: item.profiles?.display_name || "N/A",
      studentEmail: item.profiles?.email || "N/A",
      userType: item.profiles?.user_type || "UNKNOWN",
      courseTitle: item.courses?.title || "N/A",
      requestedAt: item.enrolled_at || new Date().toISOString(),
    }));

    return { success: true, data: mapped };
  } catch (err: any) {
    logger.error("Errore imprevisto in getPendingEnrollmentsAction:", err);
    return { success: false, error: err.message || "Errore interno." };
  }
}