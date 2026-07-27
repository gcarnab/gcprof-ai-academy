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
  Invoca la procedura SQL atomica `award_module_badge` per conferire il badge al completamento di un modulo.
 */
export async function unlockModuleBadge(
  userId: string,
  moduleCode: string,
): Promise<BadgeUnlockResult> {
  if (!userId || !moduleCode) {
    return { success: false, error: "Parametri mancanti (userId o moduleCode)" };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("award_module_badge", {
      p_user_id: userId,
      p_module_code: moduleCode,
    });

    if (error) {
      logger.error("unlockModuleBadge: errore RPC", {
        userId,
        moduleCode,
        error: error.message,
      });
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Nessun dato restituito dalla RPC" };
    }

    const result = data[0];

    logger.info("unlockModuleBadge: esito elaborato", {
      userId,
      moduleCode,
      alreadyUnlocked: result.already_unlocked,
      xpGained: result.xp_gained,
    });

    return {
      success: true,
      alreadyUnlocked: result.already_unlocked,
      badgeTitle: result.badge_title,
      badgeIcon: result.badge_icon,
      xpGained: result.xp_gained,
      newTotalXp: result.new_total_xp,
      newLevel: result.new_level,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    logger.error("unlockModuleBadge: eccezione non gestita", {
      userId,
      moduleCode,
      error: message,
    });
    return { success: false, error: message };
  }
}

/**
  Recupera le statistiche di gamification dello studente (XP, Livello) e la lista completa dei badge con relativo stato di sblocco.
 */
export async function getUserGamificationData(userId: string) {
  if (!userId) {
    return { success: false, error: "userId mancante" };
  }

  const supabase = getSupabaseAdmin();

  try {
    // 1. Dati profilo (XP, Livello)
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("total_xp, current_level, total_minutes_active")
      .eq("id", userId)
      .single();

    if (profileErr) throw profileErr;

    // 2. Catalogo badge + badge posseduti dall'utente
    const { data: badges, error: badgesErr } = await supabase
      .from("badges")
      .select(`
        id,
        code,
        title,
        description,
        icon,
        xp_reward,
        user_badges!left(awarded_at, profile_id)
      `)
      .order("code", { ascending: true });

    if (badgesErr) throw badgesErr;

    // 3. Mappatura unificata per la UI
    const formattedBadges: UserBadgeItem[] = (badges || []).map((b: any) => {
      const userBadge = Array.isArray(b.user_badges)
        ? b.user_badges.find((ub: any) => ub?.profile_id === userId)
        : null;

      return {
        id: b.id,
        code: b.code,
        title: b.title,
        description: b.description,
        icon: b.icon,
        xpReward: b.xp_reward,
        isUnlocked: Boolean(userBadge),
        awardedAt: userBadge?.awarded_at || null,
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
    logger.error("getUserGamificationData: errore durante il recupero", {
      userId,
      error: message,
    });
    return { success: false, error: message };
  }
}