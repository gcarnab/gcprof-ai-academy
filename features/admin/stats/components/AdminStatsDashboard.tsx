"use client";

import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import DonutChartCard from "./charts/DonutChartCard";
import StatsKpiCards from "./charts/StatsKpiCards";

type Props = {
  stats: any;
};

export default function AdminStatsDashboard({ stats }: Props) {
  // Calcolo al volo di un indicatore di densità didattica (Media lezioni per modulo)
  const avgLessonsPerModule = stats.totals.modules > 0 
    ? (stats.totals.lessons / stats.totals.modules).toFixed(1) 
    : "0";

  return (
    <div className="space-y-10 p-6">
      {/* ==========================================
          🎯 PANNELLO KPI (Risolto Bug Contatori a 0)
          ========================================== */}
      <div className="relative">
        <StatsKpiCards
          totalUsers={stats.totals.users}
          totalCourses={stats.totals.courses}
          totalModules={stats.totals.modules}
          totalLessons={stats.totals.lessons}
        />
        <div className="absolute top-2 right-2 hidden md:block text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
          📚 Densità contenuti: <span className="font-semibold text-blue-600">{avgLessonsPerModule}</span> lezioni/modolo avg
        </div>
      </div>

      {/* ==========================================
          👥 SEZIONE 1: ANALYTICS COMMUNITY & STUDENTI
          ========================================== */}
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-2">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">
            Community & Gestione Accessi
          </h2>
          <p className="text-xs text-gray-500">Distribuzione degli utenti registrati, ruoli e stato di attivazione.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PieChartCard
            title="Utenti per Ruolo"
            data={stats.charts.usersByRole}
          />
          <BarChartCard
            title="Utenti per Stato"
            data={stats.charts.usersByStatus}
          />
          <PieChartCard
            title="Studenti per Classe"
            data={stats.charts.studentsByClass}
          />
        </div>
      </div>

      {/* ==========================================
          🎓 SEZIONE 2: ANALYTICS CATALOGO & STRUTTURA LMS
          ========================================== */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-gray-200 pb-2">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">
            Struttura Didattica & Corsi
          </h2>
          <p className="text-xs text-gray-500">Analisi della complessità del catalogo, categorie e volumi interni.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Corsi per Categoria"
            data={stats.charts.coursesByCategory}
          />
          <DonutChartCard
            title="Stato Pubblicazione Corsi"
            data={stats.charts.publishedCourses}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 pt-2">
          <BarChartCard
            title="Top Corsi per Moduli"
            data={Object.fromEntries(
              stats.charts.modulesPerCourse.map((c: any) => [c.title, c.modules]),
            )}
          />
          <BarChartCard
            title="Top Corsi per Lezioni"
            data={Object.fromEntries(
              stats.charts.lessonsPerCourse.map((c: any) => [c.title, c.lessons]),
            )}
          />
          <PieChartCard
            title="Complessità dei Corsi"
            data={stats.charts.courseComplexity}
          />
        </div>
      </div>
    </div>
  );
}