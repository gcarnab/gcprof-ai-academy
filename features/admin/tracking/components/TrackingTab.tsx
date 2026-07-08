import { TrackingService } from "../services/trackingService";

function formatDate(value: string | null) {
  if (!value) return "-";

  return new Date(value).toLocaleString("it-IT");
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "-";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 1) {
    return `${seconds}s`;
  }

  return `${minutes} min`;
}

export default async function TrackingTab() {
  const sessions = await TrackingService.getSessions();

  const today = new Date().toISOString().slice(0, 10);

  const todayLogins = sessions.filter((session: any) =>
    session.login_at.startsWith(today),
  ).length;

  const activeSessions = sessions.filter(
    (session: any) => !session.logout_at,
  ).length;

  const durations = sessions
    .filter((session: any) => session.session_duration_seconds)
    .map((session: any) => session.session_duration_seconds);

  const averageDuration =
    durations.length > 0
      ? Math.floor(
          durations.reduce((a: number, b: number) => a + b, 0) /
            durations.length /
            60,
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          🛰 Tracking Accessi
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Monitoraggio delle sessioni utenti e degli accessi alla piattaforma.
        </p>
      </div>

      {/* STATISTICHE */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Sessioni totali
          </h3>

          <p className="mt-3 text-3xl font-bold">{sessions.length}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Login oggi
          </h3>

          <p className="mt-3 text-3xl font-bold">{todayLogins}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Utenti online
          </h3>

          <p className="mt-3 text-3xl font-bold">{activeSessions}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Permanenza media
          </h3>

          <p className="mt-3 text-3xl font-bold">{averageDuration} min</p>
        </div>
      </div>

      {/* TABELLA SESSIONI */}

      <div className="overflow-hidden rounded-xl border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-3 text-left">Utente</th>

              <th className="p-3 text-left">Login</th>

              <th className="p-3 text-left">Logout</th>

              <th className="p-3 text-left">Durata</th>

              <th className="p-3 text-left">Browser</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session: any) => (
              <tr key={session.id} className="border-b">
                <td className="p-3">
                  <div className="font-medium">
                    {session.profiles?.display_name ?? "Utente"}
                  </div>

                  <div className="text-muted-foreground">
                    {session.profiles?.email ?? "-"}
                  </div>
                </td>

                <td className="p-3">{formatDate(session.login_at)}</td>

                <td className="p-3">
                  {session.logout_at ? (
                    formatDate(session.logout_at)
                  ) : (
                    <span className="font-medium text-green-600">Attiva</span>
                  )}
                </td>

                <td className="p-3">
                  {formatDuration(session.session_duration_seconds)}
                </td>

                <td className="max-w-xs truncate p-3 text-muted-foreground">
                  {session.user_agent ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
