import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Logger } from "@/features/auth/infrastructure/Logger";

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

      const ipAddress =
        forwardedFor?.split(",")[0]?.trim() ?? realIp ?? "unknown";

      const userAgent = headerStore.get("user-agent") ?? "unknown";

      const { error } = await supabase.from("user_sessions").insert({
        profile_id: profileId,
        login_at: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      });

      if (error) {
        Logger.error(
          `TrackingService.createSession DB error: ${error.message}`,
        );
        return;
      }

      Logger.info(`Tracking session creata per utente ${profileId}`);
    } catch (error) {
      Logger.error(`TrackingService.createSession exception: ${String(error)}`);
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
        .maybeSingle();

      if (findError) {
        Logger.error(
          `TrackingService.closeSession find error: ${findError.message}`,
        );
        return;
      }

      if (!session) {
        Logger.warn(`Nessuna sessione aperta trovata per utente ${profileId}`);
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
        Logger.error(
          `TrackingService.closeSession update error: ${updateError.message}`,
        );
        return;
      }

      Logger.info(
        `Tracking session chiusa per utente ${profileId}. Durata: ${durationSeconds}s`,
      );
    } catch (error) {
      Logger.error(`TrackingService.closeSession exception: ${String(error)}`);
    }
  }

  /**
   * Recupera le ultime sessioni per il pannello admin.
   */
  static async getSessions() {
    try {
      const supabase = getSupabaseAdmin();

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
        .limit(100);

      if (error) {
        Logger.error(`TrackingService.getSessions error: ${error.message}`);

        return [];
      }

      return data ?? [];
    } catch (error) {
      Logger.error(`TrackingService.getSessions exception: ${String(error)}`);

      return [];
    }
  }
}
