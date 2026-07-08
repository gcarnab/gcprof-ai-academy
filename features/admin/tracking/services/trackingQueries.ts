import { getSupabaseAdmin } from "@/lib/supabase";
import { Logger } from "@/features/auth/infrastructure/Logger";

export async function getTrackingStats() {
  const supabase = getSupabaseAdmin();

  // Data di inizio giornata (oggi a mezzanotte) per i filtri mirati
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  try {
    // 1. Recupero parallelo per ottimizzare i tempi di risposta ed evitare colli di bottiglia
    const [sessionsResponse, statsResponse] = await Promise.all([
      // Query per gli ultimi 50 accessi da mostrare nella tabella
      supabase
        .from("user_sessions")
        .select(`
          id,
          profile_id,
          login_at,
          logout_at,
          session_duration_seconds,
          ip_address,
          user_agent,
          profiles (
            display_name,
            email
          )
        `)
        .order("login_at", { ascending: false })
        .limit(50),

      // Query globale per calcolare le metriche reali di oggi su tutto il set di dati
      supabase
        .from("user_sessions")
        .select("profile_id, login_at, session_duration_seconds")
        .gte("login_at", todayStart)
    ]);

    if (sessionsResponse.error) {
      Logger.error(`[TRACKING QUERY ERROR] Sessions fetch: ${sessionsResponse.error.message}`);
      return getEmptyStats();
    }

    if (statsResponse.error) {
      Logger.error(`[TRACKING QUERY ERROR] Stats fetch: ${statsResponse.error.message}`);
      return getEmptyStats();
    }

    const sessions = sessionsResponse.data ?? [];
    const todaySessions = statsResponse.data ?? [];

    // 2. Calcolo metriche accurate basate su tutte le sessioni odierne (senza il cap di 50 elementi)
    const todayLogins = todaySessions.length;
    const activeUsers = new Set(todaySessions.map((s) => s.profile_id)).size;

    // Calcolo della permanenza media basata sullo storico delle sessioni concluse caricate
    const durations = sessions
      .map((s) => s.session_duration_seconds)
      .filter((v): v is number => v !== null);

    const averageDuration =
      durations.length > 0
        ? Math.floor(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;

    return {
      totalSessions: sessions.length, // Conteggio relativo al set visualizzato o estendibile
      todayLogins,
      activeUsers,
      averageDuration,
      sessions,
    };
  } catch (error) {
    Logger.error(`[TRACKING QUERY EXCEPTION]: ${String(error)}`);
    return getEmptyStats();
  }
}

/**
 * Ritorna lo stato vuoto di fallback in caso di errore
 */
function getEmptyStats() {
  return {
    totalSessions: 0,
    todayLogins: 0,
    activeUsers: 0,
    averageDuration: 0,
    sessions: [],
  };
}