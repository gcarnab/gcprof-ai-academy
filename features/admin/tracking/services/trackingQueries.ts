import { getSupabaseAdmin } from "@/lib/supabase";

export async function getTrackingStats() {
  const supabase = getSupabaseAdmin();

  const { data: sessions, error } = await supabase
    .from("user_sessions")
    .select(
      `
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
    `,
    )
    .order("login_at", {
      ascending: false,
    })
    .limit(50);

  if (error) {
    console.error("[TRACKING QUERY ERROR]", error.message);

    return {
      totalSessions: 0,
      todayLogins: 0,
      activeUsers: 0,
      averageDuration: 0,
      sessions: [],
    };
  }

  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const todaySessions = (sessions ?? []).filter(
    (session) => new Date(session.login_at) >= todayStart,
  );

  const activeUsers = new Set(
    todaySessions.map((session) => session.profile_id),
  ).size;

  const durations = (sessions ?? [])
    .map((s) => s.session_duration_seconds)
    .filter((v): v is number => v !== null);

  const averageDuration =
    durations.length > 0
      ? Math.floor(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

  return {
    totalSessions: sessions?.length ?? 0,

    todayLogins: todaySessions.length,

    activeUsers,

    averageDuration,

    sessions: sessions ?? [],
  };
}
