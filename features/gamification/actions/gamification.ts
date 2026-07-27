"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

// --- TIPI DATO DIVERSIFICATI PER CORSO E GLOBALI ---

export interface BadgeItem {
  badge_id: string;
  code: string;
  title: string;
  icon: string;
  awarded_at: string;
}

export interface CourseGamificationStats {
  course_id: string;
  course_title: string;
  course_xp: number;
  course_level: number;
  badges: BadgeItem[];
}

export interface UserGamificationOverview {
  global: {
    total_xp: number;
    global_level: number;
    total_badges_count: number;
  };
  courses: CourseGamificationStats[];
}

export interface AdminCourseStat {
  course_id: string;
  course_title: string;
  total_students_active: number;
  total_xp_awarded: number;
  total_badges_awarded: number;
  avg_xp_per_student: number;
}

/**
 * Recupera la panoramica Gamification dell'utente (Globale + Dettaglio Corsi)
 */
export async function getUserGamificationOverview(
  userId: string
): Promise<{ success: boolean; data?: UserGamificationOverview; error?: string }> {
  if (!userId) return { success: false, error: "ID Utente mancante" };

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("get_user_gamification_overview", {
      p_user_id: userId,
    });

    if (error) {
      logger.error("getUserGamificationOverview: Errore RPC", { userId, error: error.message });
      return { success: false, error: error.message };
    }

    return { success: true, data: data as UserGamificationOverview };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore server";
    return { success: false, error: message };
  }
}

/**
 * Recupera le statistiche aggregate di Gamification per la Dashboard Admin
 */
export async function getAdminGamificationStats(): Promise<{
  success: boolean;
  data?: AdminCourseStat[];
  error?: string;
}> {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("get_admin_courses_gamification_stats");

    if (error) {
      logger.error("getAdminGamificationStats: Errore RPC", { error: error.message });
      return { success: false, error: error.message };
    }

    return { success: true, data: data as AdminCourseStat[] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore server";
    return { success: false, error: message };
  }
}