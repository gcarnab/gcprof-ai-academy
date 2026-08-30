"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface AwardBadgeResult {
  awarded: boolean;
  badge_code: string;
  badge_title: string;
  xp_reward: number;
  course_xp: number;
  course_level: number;
  global_total_xp: number;
  global_level: number;
}

/**
 * Registra immediatamente l'accesso/cambio di una lezione aggiornando last_accessed_at (0 minuti aggiunti).
 */
export async function touchLessonAccess(
  userId: string,
  courseId: string,
  lessonId: string,
) {
  if (!userId || !courseId || !lessonId) {
    return { success: false, error: "Parametri mancanti" };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("track_lesson_activity", {
      p_user_id: userId,
      p_course_id: courseId,
      p_lesson_id: lessonId,
      p_minutes_to_add: 0,
    });

    if (error) {
      logger.error("touchLessonAccess: errore RPC", { error: error.message });
      return { success: false, error: error.message };
    }

    const result = Array.isArray(data) ? data[0] : data;

    const minutesWatched = Number(result?.minutes_watched ?? 0);
    const lessonCompleted = Boolean(result?.is_completed);

    logger.info("touchLessonAccess ===> Lesson tracking result", {
      userId,
      courseId,
      lessonId,
      minutesWatched,
      lessonCompleted,
    });

    logger.info("touchLessonAccess: accesso lezione registrato con successo", {
      userId,
      courseId,
      lessonId,
      data,
    });

    return { success: true, data };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    logger.error("touchLessonAccess: eccezione non gestita", {
      error: message,
    });
    return { success: false, error: message };
  }
}

/**
 * Incrementa il tempo di studio dello studente e aggiorna lo stato della lezione tramite la RPC atomica.
 * Se la lezione risulta completata, innesca l'assegnazione del badge di modulo e l'aggiornamento XP per corso e globale via award_module_badge.
 */
export async function incrementStudentMinutes(
  userId: string,
  courseId?: string,
  lessonId?: string,
  minutesToAdd: number = 1,
) {
  logger.info("SERVER ACTION incrementStudentMinutes", {
    userId,
    courseId,
    lessonId,
    minutesToAdd,
  });

  if (!userId || !courseId || !lessonId) {
    logger.debug("incrementStudentMinutes: Parametri mancanti", {
      userId,
      courseId,
      lessonId,
    });
    return { success: false, error: "Parametri mancanti" };
  }

  if (minutesToAdd <= 0) {
    return { success: true, message: "Nessun minuto da aggiungere" };
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase.rpc("track_lesson_activity", {
      p_user_id: userId,
      p_course_id: courseId,
      p_lesson_id: lessonId,
      p_minutes_to_add: minutesToAdd,
    });

    if (error) {
      logger.error("incrementStudentMinutes: errore RPC", {
        userId,
        courseId,
        lessonId,
        error: error.message,
      });
      return { success: false, error: error.message };
    }

    const result = Array.isArray(data) ? data[0] : data;

    const minutesWatched = Number(result?.minutes_watched ?? 0);
    const lessonCompleted = Boolean(result?.is_completed);

    logger.info("incrementStudentMinutes ===> Lesson tracking result", {
      userId,
      courseId,
      lessonId,
      minutesWatched,
      lessonCompleted,
    });

    let badgeAwarded: AwardBadgeResult | null = null;

    // Se la lezione è completata, inneschiamo l'assegnazione del badge di modulo
    if (lessonCompleted) {
      const { data: badgeData, error: badgeError } = await supabase.rpc(
        "award_module_badge",
        {
          p_user_id: userId,
          p_lesson_id: lessonId,
        },
      );

      if (badgeError) {
        // Gestione errore non bloccante: logghiamo l'errore senza fallire l'heartbeat
        logger.error(
          "incrementStudentMinutes: errore RPC award_module_badge",
          {
            userId,
            lessonId,
            error: badgeError.message,
          },
        );
      } else {
        const badgeResult = Array.isArray(badgeData)
          ? badgeData[0]
          : badgeData;

        if (badgeResult?.awarded) {
          badgeAwarded = badgeResult as AwardBadgeResult;
          logger.info(
            "incrementStudentMinutes: Badge modulo sbloccato con successo!",
            {
              userId,
              lessonId,
              badge: badgeResult,
            },
          );
        }
      }
    }

    logger.info(
      "incrementStudentMinutes: attività registrata con successo via RPC",
      {
        userId,
        courseId,
        lessonId,
        minutesToAdd,
        result: data,
        badgeUnlocked: badgeAwarded,
      },
    );

    return {
      success: true,
      message: "Heartbeat memorizzato con successo",
      data,
      badge: badgeAwarded,
    };
  } catch (error: unknown) {
    logger.error("incrementStudentMinutes: unexpected exception", {
      userId,
      courseId,
      lessonId,
      error: String(error),
    });

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return { success: false, error: message };
  }
}