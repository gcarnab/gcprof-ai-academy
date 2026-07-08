"use client";

interface Props {
  stats: any;
}

function formatDuration(seconds: number) {
  if (!seconds) return "0 min";

  const minutes = Math.floor(seconds / 60);

  return `${minutes} min`;
}

export default function TrackingDashboard({ stats }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Sessioni totali</p>

          <p className="mt-2 text-3xl font-bold">{stats.totalSessions}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Login oggi</p>

          <p className="mt-2 text-3xl font-bold">{stats.todayLogins}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Utenti oggi</p>

          <p className="mt-2 text-3xl font-bold">{stats.activeUsers}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Permanenza media</p>

          <p className="mt-2 text-3xl font-bold">
            {formatDuration(stats.averageDuration)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <h3 className="mb-4 text-lg font-semibold">Ultimi accessi</h3>

        <div className="space-y-3">
          {stats.sessions.map((session: any) => (
            <div key={session.id} className="rounded-lg border p-3">
              <div className="font-medium">
                {session.profiles?.display_name ??
                  session.profiles?.email ??
                  "Utente"}
              </div>

              <div className="text-sm text-muted-foreground">
                {new Date(session.login_at).toLocaleString("it-IT")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
