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

/**
 * Conferisce il badge di completamento modulo tramite RPC SQL.
 *
 * La RPC award_module_badge() identifica autonomamente
 * modulo e corso partendo dal lessonId.
 */
export async function unlockModuleBadge(
  userId: string,
  lessonId: string,
): Promise<BadgeUnlockResult> {
  if (!userId || !lessonId) {
    return {
      success: false,
      error: "Parametri mancanti (userId o lessonId)",
    };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("award_module_badge", {
      p_user_id: userId,
      p_lesson_id: lessonId,
    });

    if (error) {
      logger.error("unlockModuleBadge: errore RPC", {
        userId,
        lessonId,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "Nessun dato restituito dalla RPC",
      };
    }

    const result = data[0];

    logger.info("unlockModuleBadge: badge elaborato", {
      userId,
      lessonId,
      awarded: result.awarded,
      xpGained: result.xp_gained,
    });

    return {
      success: true,
      alreadyUnlocked: !result.awarded,
      badgeTitle: result.badge_title,
      xpGained: result.xp_gained,
      newTotalXp: result.global_total_xp,
      newLevel: result.global_level,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    logger.error("unlockModuleBadge: eccezione", {
      userId,
      lessonId,
      error: message,
    });

    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Conferisce il badge del quiz tramite RPC SQL.
 * Mappato su p_quiz_code per supportare sia l'ID che il codice del quiz.
 * Integra un aggiornamento difensivo per garantire l'inserimento di quiz_id e course_id in user_badges.
 */
export async function unlockQuizBadge(
  userId: string,
  quizId: string,
  courseId?: string,
): Promise<BadgeUnlockResult> {
  if (!userId || !quizId) {
    return {
      success: false,
      error: "Parametri mancanti",
    };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("award_quiz_badge", {
      p_user_id: userId,
      p_quiz_code: quizId,
    });

    if (error) {
      logger.error("unlockQuizBadge: errore RPC", {
        userId,
        quizId,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "Nessun dato restituito dalla RPC",
      };
    }

    const result = data[0];

    // Allineamento difensivo: assicura la valorizzazione di quiz_id e course_id se rimasti null in user_badges
    if (result) {
      try {
        const { data: badgeData } = await supabase
          .from("badges")
          .select("id")
          .or(`quiz_id.eq.${quizId},code.eq.${quizId}`)
          .maybeSingle();

        if (badgeData?.id) {
          const updatePayload: Record<string, any> = { quiz_id: quizId };
          if (courseId) updatePayload.course_id = courseId;

          await supabase
            .from("user_badges")
            .update(updatePayload)
            .eq("profile_id", userId)
            .eq("badge_id", badgeData.id)
            .is("quiz_id", null);
        }
      } catch (patchErr) {
        logger.warn("unlockQuizBadge: impossibile aggiornare quiz_id su user_badges", { patchErr });
      }
    }

    logger.info("unlockQuizBadge: badge elaborato", {
      userId,
      quizId,
      alreadyUnlocked: result.already_unlocked,
      xpGained: result.xp_gained,
    });

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
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    logger.error("unlockQuizBadge: eccezione", {
      userId,
      quizId,
      error: message,
    });

    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Recupera XP, livello e catalogo badge dell'utente.
 */
export async function getUserGamificationData(userId: string) {
  if (!userId) {
    return {
      success: false,
      error: "userId mancante",
    };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("total_xp,current_level,total_minutes_active")
      .eq("id", userId)
      .single();

    if (profileErr) {
      throw profileErr;
    }

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
          course_id
        )
      `)
      .order("code");

    if (badgesErr) {
      throw badgesErr;
    }

    const formattedBadges: UserBadgeItem[] = (badges ?? []).map((badge: any) => {
      const unlocked = Array.isArray(badge.user_badges)
        ? badge.user_badges.find(
            (ub: any) => ub.profile_id === userId,
          )
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
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    logger.error("getUserGamificationData: errore", {
      userId,
      error: message,
    });

    return {
      success: false,
      error: message,
    };
  }
}