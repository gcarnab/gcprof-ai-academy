import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export class TrackingService {
  /**
   * Crea una nuova sessione dopo login riuscito.
   */
  static async createSession(profileId: string) {
    try {
      const supabase = getSupabaseAdmin();

      const headerStore = await headers();

      const forwardedFor = headerStore.get("x-forwarded-for");
      const realIp = headerStore.get("x-real-ip");

      const UNKNOWN_VALUE = process.env.TRACKING_UNKNOWN_VALUE ?? "unknown";

      const ipAddress =
        forwardedFor?.split(",")[0]?.trim() ?? realIp ?? UNKNOWN_VALUE;

      const userAgent = headerStore.get("user-agent") ?? UNKNOWN_VALUE;

      const { data: openSessions, error: findError } = await supabase
        .from("user_sessions")
        .select("id, login_at")
        .eq("profile_id", profileId)
        .is("logout_at", null);

      if (findError) {
        logger.error(
          `TrackingService.createSession find error: ${findError.message}`,
        );

        return;
      }
      if (openSessions && openSessions.length > 0) {
        const now = new Date();

        for (const session of openSessions) {
          const loginAt = new Date(session.login_at);

          const durationSeconds = Math.floor(
            (now.getTime() - loginAt.getTime()) / 1000,
          );

          const { error: updateError } = await supabase
            .from("user_sessions")
            .update({
              logout_at: now.toISOString(),
              session_duration_seconds: durationSeconds,
            })
            .eq("id", session.id);

          if (updateError) {
            logger.error(
              `TrackingService.createSession close previous session error: ${updateError.message}`,
            );

            continue;
          }

          logger.warn(
            `TrackingService.createSession chiusa sessione precedente ${session.id} per utente ${profileId}`,
          );
        }
      }
      const { error } = await supabase.from("user_sessions").insert({
        profile_id: profileId,
        login_at: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      });

      if (error) {
        logger.error(
          `TrackingService.createSession DB error: ${error.message}`,
        );
        return;
      }

      logger.info(`Tracking session creata per utente ${profileId}`);
    } catch (error) {
      logger.error(`TrackingService.createSession exception: ${String(error)}`);
    }
  }

  /**
   * Chiude l'ultima sessione aperta dell'utente.
   */
  static async closeSession(profileId: string) {
    try {
      const supabase = getSupabaseAdmin();

      const { data: session, error: findError } = await supabase
        .from("user_sessions")
        .select("id, login_at")
        .eq("profile_id", profileId)
        .is("logout_at", null)
        .order("login_at", { ascending: false })
        .limit(1)
        .single();
      if (findError) {
        logger.error(
          `TrackingService.closeSession find error: ${findError.message}`,
        );
        return;
      }

      if (!session) {
        logger.warn(`Nessuna sessione aperta trovata per utente ${profileId}`);
        return;
      }

      const logoutAt = new Date();
      const loginAt = new Date(session.login_at);

      const durationSeconds = Math.floor(
        (logoutAt.getTime() - loginAt.getTime()) / 1000,
      );

      const { error: updateError } = await supabase
        .from("user_sessions")
        .update({
          logout_at: logoutAt.toISOString(),
          session_duration_seconds: durationSeconds,
        })
        .eq("id", session.id);

      if (updateError) {
        logger.error(
          `TrackingService.closeSession update error: ${updateError.message}`,
        );
        return;
      }

      logger.info(
        `Tracking session chiusa per utente ${profileId}. Durata: ${durationSeconds}s`,
      );
    } catch (error) {
      logger.error(`TrackingService.closeSession exception: ${String(error)}`);
    }
  }

  /**
   * Registra la visualizzazione di una pagina (Clickstream Deep Analytics)
   */
  static async trackPageView(profileId: string, path: string) {
    try {
      const supabase = getSupabaseAdmin();

      // Estrazione intelligente dei segmenti dall'URL (es: /courses/react-101/lessons/components)
      const segments = path.split("/").filter(Boolean);
      let course_slug: string | null = null;
      let lesson_slug: string | null = null;

      const courseIndex = segments.indexOf("courses");

      if (courseIndex !== -1) {
        course_slug = segments[courseIndex + 1] ?? null;
      }

      const lessonIndex = segments.indexOf("lessons");

      if (lessonIndex !== -1) {
        lesson_slug = segments[lessonIndex + 1] ?? null;
      }

      const { error } = await supabase.from("user_page_views").insert({
        profile_id: profileId,
        path,
        course_slug,
        lesson_slug,
        viewed_at: new Date().toISOString(),
      });

      if (error) {
        logger.error(
          `TrackingService.trackPageView DB error: ${error.message}`,
        );
        return;
      }

      logger.info(`Page view tracciata per ${profileId}: ${path}`);
    } catch (error) {
      logger.error(`TrackingService.trackPageView exception: ${String(error)}`);
    }
  }

  /**
   * Recupera le ultime sessioni per il pannello admin.
   */
  static async getSessions() {
    try {
      const supabase = getSupabaseAdmin();

      const SESSIONS_LIMIT = Number(
        process.env.TRACKING_ADMIN_SESSIONS_LIMIT ?? 100,
      );

      const { data, error } = await supabase
        .from("user_sessions")
        .select(
          `
        id,
        login_at,
        logout_at,
        session_duration_seconds,
        ip_address,
        user_agent,
        profiles (
          email,
          display_name
        )
      `,
        )
        .order("login_at", {
          ascending: false,
        })
        .limit(SESSIONS_LIMIT);

      if (error) {
        logger.error(`TrackingService.getSessions error: ${error.message}`);

        return [];
      }

      return data ?? [];
    } catch (error) {
      logger.error(`TrackingService.getSessions exception: ${String(error)}`);

      return [];
    }
  }
}
