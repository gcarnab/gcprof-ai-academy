"use server";

import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface BadgeItem {
  badge_id: string;
  code: string;
  title: string;
  description?: string;
  icon: string;
  awarded_at: string;
  badge_type: "module" | "quiz" | string;
  type?: "module" | "quiz" | string;
  quiz_id: string | null;
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
 * Recupera la panoramica Gamification dell'utente (Globale + Dettaglio Corsi Iscritti)
 */
export async function getUserGamificationOverview(
  userId: string
): Promise<{ success: boolean; data?: UserGamificationOverview; error?: string }> {
  noStore();
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
  noStore();

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("get_admin_courses_gamification_stats");

    if (error) {
      logger.error("getAdminGamificationStats: Errore RPC, avvio fallback", { error: error.message });

      const { data: courses } = await supabase.from("courses").select("id, title");
      if (!courses || courses.length === 0) {
        return { success: true, data: [] };
      }

      const { data: xpData } = await supabase.from("profile_course_xp").select("course_id, xp, user_id");
      const { data: badgeData } = await supabase.from("user_badges").select("course_id, id");
      const { data: progressData } = await supabase.from("profile_lessons_progress").select("course_id, user_id");

      const stats: AdminCourseStat[] = courses.map((c) => {
        const courseIdStr = String(c.id);

        const activeStudents = new Set(
          (progressData || [])
            .filter((p) => String(p.course_id) === courseIdStr)
            .map((p) => p.user_id)
        ).size;

        const totalXp = (xpData || [])
          .filter((x) => String(x.course_id) === courseIdStr)
          .reduce((acc, curr) => acc + (curr.xp || 0), 0);

        const totalBadges = (badgeData || [])
          .filter((b) => String(b.course_id) === courseIdStr).length;

        const avgXp = activeStudents > 0 ? Math.round((totalXp / activeStudents) * 10) / 10 : 0;

        return {
          course_id: courseIdStr,
          course_title: c.title,
          total_students_active: activeStudents,
          total_xp_awarded: totalXp,
          total_badges_awarded: totalBadges,
          avg_xp_per_student: avgXp,
        };
      });

      return { success: true, data: stats };
    }

    return { success: true, data: data as AdminCourseStat[] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore server";
    return { success: false, error: message };
  }
}