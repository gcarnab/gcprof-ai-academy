"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  stats: any;
}

// Helper per formattare la durata in modo leggibile
function formatDuration(seconds: number | null) {
  if (seconds === null || seconds === undefined) return "—";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
}

// Helper per ripulire e abbreviare lo User Agent per la tabella
function parseUserAgent(ua: string) {
  if (!ua) return "Unknown";
  if (ua.includes("Firefox")) return "🦊 Firefox";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "🌐 Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "🧭 Safari";
  if (ua.includes("Edg")) return "🌐 Edge";
  return "📱 Dispositivo";
}

export default function TrackingDashboard({ stats }: Props) {
  return (
    <div className="space-y-6">
      {/* 📊 SEZIONE KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-muted-foreground">
            Sessioni totali (Log)
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.totalSessions}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-muted-foreground">
            Login oggi
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.todayLogins}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-muted-foreground">
            Utenti attivi oggi
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.activeUsers}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-muted-foreground">
            Permanenza media
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatDuration(stats.averageDuration)}
          </p>
        </div>
      </div>

      {/* 🗂 TABELLA ULTIMI ACCESSI */}
      <div className="rounded-xl border bg-card shadow-sm transition-colors duration-200 overflow-hidden">
        <div className="p-6 border-b bg-muted/20">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Registro Ultimi Accessi
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cronologia in tempo reale delle ultime 50 sessioni utente sulla
            piattaforma.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold text-foreground">
                  Utente
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Data Login
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Stato / Durata
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Indirizzo IP
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Browser
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.sessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Nessun dato di tracciamento disponibile.
                  </TableCell>
                </TableRow>
              ) : (
                stats.sessions.map((session: any) => {
                  const isOnline = !session.logout_at;
                  return (
                    <TableRow
                      key={session.id}
                      className="hover:bg-muted/50 transition-colors duration-150"
                    >
                      {/* Utente */}
                      <TableCell className="font-medium text-foreground">
                        {session.profiles?.display_name ?? "—"}
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-muted-foreground">
                        {session.profiles?.email ?? "—"}
                      </TableCell>

                      {/* Data Login */}
                      <TableCell className="text-foreground whitespace-nowrap">
                        {new Date(session.login_at).toLocaleString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>

                      {/* Stato / Durata */}
                      <TableCell className="whitespace-nowrap">
                        {isOnline ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Attiva
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {formatDuration(session.session_duration_seconds)}
                          </span>
                        )}
                      </TableCell>

                      {/* IP */}
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {session.ip_address}
                      </TableCell>

                      {/* Browser */}
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {parseUserAgent(session.user_agent)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
