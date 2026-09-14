import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface SessionRecord {
  id: string;
  profile_id: string;
  login_at: string;
  logout_at: string | null;
  session_duration_seconds: number | null;
  ip_address: string | null;
  user_agent: string | null;
  profiles: {
    display_name: string | null;
    email: string | null;
  } | null;
}

export async function getTrackingStats() {
  const supabase = getSupabaseAdmin();

  // Calcolo preciso della mezzanotte UTC/ISO corrente senza sfasamenti di fuso orario
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const todayStart = now.toISOString();

  try {
    const [sessionsResponse, statsResponse] = await Promise.all([
      // 1. Ultimi 50 accessi dettagliati per la tabella dashboard
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

      // 2. Sessioni di oggi per conteggio e utenti unici
      supabase
        .from("user_sessions")
        .select("profile_id, session_duration_seconds")
        .gte("login_at", todayStart)
    ]);

    if (sessionsResponse.error) {
      logger.error(`[TRACKING QUERY ERROR] Sessions fetch: ${sessionsResponse.error.message}`);
      return getEmptyStats();
    }

    if (statsResponse.error) {
      logger.error(`[TRACKING QUERY ERROR] Stats fetch: ${statsResponse.error.message}`);
      return getEmptyStats();
    }

    const rawSessions = sessionsResponse.data ?? [];
    const todaySessions = statsResponse.data ?? [];

    // Normalizzazione sicura del campo profiles (gestione array vs oggetto)
    const sessions: SessionRecord[] = rawSessions.map((s: any) => ({
      ...s,
      profiles: Array.isArray(s.profiles) ? s.profiles[0] ?? null : s.profiles ?? null,
    }));

    // Metriche aggregate
    const todayLogins = todaySessions.length;
    const activeUsers = new Set(todaySessions.map((s) => s.profile_id)).size;

    // Media permanenza basata sulle sessioni odierne (con fallback sulle ultime 50 se vuota)
    const activeDurationsSource = todaySessions.length > 0 ? todaySessions : sessions;
    const validDurations = activeDurationsSource
      .map((s) => s.session_duration_seconds)
      .filter((v): v is number => typeof v === "number" && v > 0);

    const averageDuration =
      validDurations.length > 0
        ? Math.floor(validDurations.reduce((a, b) => a + b, 0) / validDurations.length)
        : 0;

    return {
      totalSessions: sessions.length,
      todayLogins,
      activeUsers,
      averageDuration,
      sessions,
    };
  } catch (error) {
    logger.error(`[TRACKING QUERY EXCEPTION]: ${String(error)}`);
    return getEmptyStats();
  }
}

function getEmptyStats() {
  return {
    totalSessions: 0,
    todayLogins: 0,
    activeUsers: 0,
    averageDuration: 0,
    sessions: [],
  };
}