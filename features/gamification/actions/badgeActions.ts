"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface BadgeUnlockResult {
  success: boolean;
  alreadyUnlocked?: boolean;
  badgeTitle?: string;
  badgeIcon?: string;
  xpGained?: number;
  newTotalXp?: number;
  newLevel?: number;
  error?: string;
}

export interface UserBadgeItem {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  awardedAt: string | null;
}

export async function unlockModuleBadge(
  userId: string,
  lessonId: string,
): Promise<BadgeUnlockResult> {
  if (!userId || !lessonId) {
    return { success: false, error: "Parametri mancanti (userId o lessonId)" };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("award_module_badge", {
      p_user_id: userId,
      p_lesson_id: lessonId,
    });

    if (error) {
      logger.error("unlockModuleBadge: errore RPC", { userId, lessonId, error: error.message });
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Nessun dato restituito dalla RPC" };
    }

    const result = data[0];

    return {
      success: true,
      alreadyUnlocked: !result.awarded,
      badgeTitle: result.badge_title,
      xpGained: result.xp_gained,
      newTotalXp: result.global_total_xp,
      newLevel: result.global_level,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    logger.error("unlockModuleBadge: eccezione", { userId, lessonId, error: message });
    return { success: false, error: message };
  }
}

export async function unlockQuizBadge(
  userId: string,
  quizId: string,
  _courseId?: string,
): Promise<BadgeUnlockResult> {
  if (!userId || !quizId) {
    return { success: false, error: "Parametri mancanti" };
  }

  const supabase = getSupabaseAdmin();

  try {
    // Esecuzione affidata interamente alla Stored Procedure atomica
    const { data, error } = await supabase.rpc("award_quiz_badge", {
      p_user_id: userId,
      p_quiz_code: quizId,
    });

    if (error) {
      logger.error("unlockQuizBadge: errore RPC", { userId, quizId, error: error.message });
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Nessun dato restituito dalla RPC" };
    }

    const result = data[0];

    return {
      success: true,
      alreadyUnlocked: result.already_unlocked,
      badgeTitle: result.badge_title ?? undefined,
      badgeIcon: result.badge_icon ?? undefined,
      xpGained: result.xp_gained ?? 0,
      newTotalXp: result.new_total_xp,
      newLevel: result.new_level,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    logger.error("unlockQuizBadge: eccezione", { userId, quizId, error: message });
    return { success: false, error: message };
  }
}

export async function getUserGamificationData(userId: string) {
  if (!userId) {
    return { success: false, error: "userId mancante" };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("total_xp,current_level,total_minutes_active")
      .eq("id", userId)
      .single();

    if (profileErr) throw profileErr;

    const { data: badges, error: badgesErr } = await supabase
      .from("badges")
      .select(`
        id,
        code,
        title,
        description,
        icon,
        xp_reward,
        user_badges!left(
          profile_id,
          awarded_at,
          course_id,
          quiz_id
        )
      `)
      .order("code");

    if (badgesErr) throw badgesErr;

    const formattedBadges: UserBadgeItem[] = (badges ?? []).map((badge: any) => {
      const unlocked = Array.isArray(badge.user_badges)
        ? badge.user_badges.find((ub: any) => ub.profile_id === userId)
        : null;

      return {
        id: badge.id,
        code: badge.code,
        title: badge.title,
        description: badge.description,
        icon: badge.icon,
        xpReward: badge.xp_reward,
        isUnlocked: Boolean(unlocked),
        awardedAt: unlocked?.awarded_at ?? null,
      };
    });

    return {
      success: true,
      data: {
        totalXp: profile?.total_xp ?? 0,
        currentLevel: profile?.current_level ?? 1,
        totalMinutesActive: profile?.total_minutes_active ?? 0,
        badges: formattedBadges,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    logger.error("getUserGamificationData: errore", { userId, error: message });
    return { success: false, error: message };
  }
}