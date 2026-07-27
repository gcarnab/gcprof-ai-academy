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

  // 🧮 Calcoli aggregati di Gamification a livello globale di piattaforma
  const totalGlobalXp = courseStats.reduce((acc, curr) => acc + (curr.totalXp || 0), 0);
  const totalGlobalMinutes = courseStats.reduce((acc, curr) => acc + (curr.totalMinutesStudied || 0), 0);
  const globalAvgLevel = courseStats.length > 0
    ? Math.round((courseStats.reduce((acc, curr) => acc + (curr.averageLevel || 1), 0) / courseStats.length) * 10) / 10
    : 1;

  const formatStudyTime = (totalMinutes: number) => {
    if (!totalMinutes || totalMinutes <= 0) return "0 min";
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) return `${mins} min`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* 📊 KPI SINTETICI GAMIFICATION DI PIATTAFORMA */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            XP Totali Piattaforma
          </p>
          <p className="text-2xl font-extrabold text-amber-500 mt-1">
            ⚡ {totalGlobalXp.toLocaleString()} XP
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Tempo di Studio Cumulato
          </p>
          <p className="text-2xl font-extrabold text-foreground mt-1">
            ⏱️ {formatStudyTime(totalGlobalMinutes)}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Livello Medio Generale
          </p>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-violet-400 mt-1">
            🎖️ Lvl {globalAvgLevel}
          </p>
        </div>
      </div>

      {/* 📈 DASHBOARD GRAFICI E STATISTICHE GENERALI */}
      <div className="overflow-hidden rounded-xl border bg-background shadow">
        <AdminStatsDashboard stats={stats} />
      </div>

      {/* 🏆 TABELLA GAMIFICATION Dettagliata per Singolo Corso */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            🏆 Gamification & Engagement per Corso
          </h3>
          <p className="text-sm text-muted-foreground">
            Riepilogo analitico dei punti XP generati, delle ore di studio effettive e dei livelli medi per ogni corso.
          </p>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {courseStats.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Nessun dato di gamification ancora disponibile.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                      className="hover:bg-muted/30 transition-colors"
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
                        ⚡ {item.totalXp.toLocaleString()} XP
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-violet-400 border border-blue-500/20">
                          Lvl {item.averageLevel}
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