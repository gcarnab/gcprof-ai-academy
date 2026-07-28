"use client";

import AdminStatsDashboard from "./AdminStatsDashboard";

interface CourseStatItem {
  courseId: string;
  title: string;
  slug: string;
  isPublished: boolean;
  difficulty: string;
  enrolledStudentsCount: number;
  totalXp: number;
  totalMinutesStudied: number;
  averageLevel: number;
}

interface Props {
  stats: any;
}

export default function StatsTab({ stats }: Props) {
  const courseStats: CourseStatItem[] = stats?.courseStats || [];

  const formatStudyTime = (totalMinutes: number) => {
    if (!totalMinutes || totalMinutes <= 0) return "0 min";

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hours === 0) return `${mins} min`;

    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* 📈 DASHBOARD GRAFICI E STATISTICHE GENERALI */}
      <div className="overflow-hidden rounded-xl border bg-background shadow">
        <AdminStatsDashboard stats={stats} />
      </div>

      {/* 🏆 TABELLA GAMIFICATION PER CORSO */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            🏆 Gamification & Engagement per Corso
          </h3>
          <p className="text-sm text-muted-foreground">
            Riepilogo analitico dei punti XP generati, delle ore di studio
            effettive e dei livelli medi per ogni corso.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
          {courseStats.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Nessun dato di gamification per singolo corso disponibile.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3.5">Corso</th>
                    <th className="px-6 py-3.5 text-center">Studenti</th>
                    <th className="px-6 py-3.5 text-center">Tempo di Studio</th>
                    <th className="px-6 py-3.5 text-center">XP Erogati</th>
                    <th className="px-6 py-3.5 text-center">Livello Medio</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {courseStats.map((item) => (
                    <tr
                      key={item.courseId}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {item.title}
                      </td>

                      <td className="px-6 py-4 text-center">
                        👥 {item.enrolledStudentsCount}
                      </td>

                      <td className="px-6 py-4 text-center font-mono text-xs font-semibold text-foreground">
                        ⏱️ {formatStudyTime(item.totalMinutesStudied)}
                      </td>

                      <td className="px-6 py-4 text-center font-bold text-amber-500">
                        ⚡ {(item.totalXp || 0).toLocaleString("it-IT")} XP
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-violet-400">
                          Lvl {item.averageLevel || 1}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}