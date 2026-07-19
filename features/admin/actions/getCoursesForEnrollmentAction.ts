"use server";

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getCoursesForEnrollmentAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select(`
        id,
        title
      `)
      .order("title", { ascending: true });

    if (error) {
      logger.error(
        "Errore recupero corsi per assegnazione iscrizioni:",
        error,
      );

      return {
        success: false,
        error: error.message,
      };
    }

    logger.info(
      `Recuperati ${data?.length ?? 0} corsi per assegnazione admin.`,
    );

    return {
      success: true,
      data: data ?? [],
    };
  } catch (error: any) {
    logger.error(
      "Errore imprevisto in getCoursesForEnrollmentAction:",
      error,
    );

    return {
      success: false,
      error: error.message || "Errore interno.",
    };
  }
}