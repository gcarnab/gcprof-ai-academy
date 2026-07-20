"use client";

import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import DonutChartCard from "./charts/DonutChartCard";
import StatsKpiCards from "./charts/StatsKpiCards";
import HorizontalBarChartCard from "./charts/HorizontalBarChartCard";

type Props = {
  stats: any;
};

export default function AdminStatsDashboard({ stats }: Props) {
  // Calcolo della densità contenuti (lezioni per modulo)
  const avgLessonsPerModule =
    stats?.totals?.modules > 0
      ? (stats.totals.lessons / stats.totals.modules).toFixed(1)
      : "0";

  // Estrazione e ripartizione sicura dei KPI di completamento e drop-off
  const completionRate = stats?.totals?.completionRate ?? 0;
  const dropOffRate = stats?.totals?.dropOffRate ?? 0;

  // Ottimizzazione preventiva dei dati di engagement degli studenti
  const refinedStudentEngagement = (stats?.charts?.studentEngagement || []).map(
    (student: any) => ({
      name: student.name,
      hours: student.hours,
      classes: student.classes || student.class_name || undefined,
    }),
  );

  return (
    <div className="space-y-10 p-6">
      {/* ==========================================
          📊 SEZIONE KPI PRINCIPALI & METRICHE RAPIDE
          ========================================== */}
      <div className="relative">
        <StatsKpiCards
          totalUsers={stats?.totals?.users || 0}
          totalCourses={stats?.totals?.courses || 0}
          totalModules={stats?.totals?.modules || 0}
          totalLessons={stats?.totals?.lessons || 0}
        />
        
        {/* Badge Informativi e KPI Aggiuntivi (Densità & Completamento) */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3 text-xs font-medium">
          <div className="text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border shadow-sm">
            📚 Densità contenuti:{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {avgLessonsPerModule}
            </span>{" "}
            lezioni/modulo avg
          </div>

          {completionRate > 0 && (
            <div className="text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border shadow-sm">
              🎯 Tasso di Completamento:{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {completionRate}%
              </span>
            </div>
          )}

          {dropOffRate > 0 && (
            <div className="text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border shadow-sm">
              📉 Drop-off Rate:{" "}
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {dropOffRate}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          👥 SEZIONE 1: ANALYTICS COMMUNITY & STUDENTI
          ========================================== */}
      <div className="space-y-4">
        <div className="border-b border-border pb-2">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Community & Engagement Studenti
          </h2>
          <p className="text-xs text-muted-foreground">
            Distribuzione degli iscritti e monitoraggio del tempo speso in
            piattaforma.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PieChartCard
            title="Utenti per Ruolo"
            data={stats?.charts?.usersByRole || {}}
          />
          <BarChartCard
            title="Utenti per Stato"
            data={stats?.charts?.usersByStatus || {}}
          />
          <PieChartCard
            title="Studenti per Classe"
            data={stats?.charts?.studentsByClass || {}}
          />
        </div>

        <div className="pt-2">
          <HorizontalBarChartCard
            title="Tempo di Attività Studenti"
            subtitle="Classifica del tempo totale cumulato dagli studenti all'interno dei corsi"
            data={refinedStudentEngagement}
          />
        </div>
      </div>

      {/* ==========================================
          🎓 SEZIONE 2: ANALYTICS CATALOGO & STRUTTURA LMS
          ========================================== */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-border pb-2">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Struttura Didattica & Corsi
          </h2>
          <p className="text-xs text-muted-foreground">
            Analisi della complessità del catalogo, categorie e volumi interni.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Corsi per Categoria"
            data={stats?.charts?.coursesByCategory || {}}
          />
          <DonutChartCard
            title="Stato Pubblicazione Corsi"
            data={stats?.charts?.publishedCourses || {}}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 pt-2">
          <BarChartCard
            title="Top Corsi per Moduli"
            data={Object.fromEntries(
              (stats?.charts?.modulesPerCourse || []).map((c: any) => [
                c.title,
                c.modules,
              ]),
            )}
          />
          <BarChartCard
            title="Top Corsi per Lezioni"
            data={Object.fromEntries(
              (stats?.charts?.lessonsPerCourse || []).map((c: any) => [
                c.title,
                c.lessons,
              ]),
            )}
          />
          <PieChartCard
            title="Complessità dei Corsi"
            data={stats?.charts?.courseComplexity || {}}
          />
        </div>
      </div>

      {/* ==========================================
          🛰️ SEZIONE 3: MONITORAGGIO ACCESSI & TRAFFICO
          ========================================== */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-border pb-2">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            🛰️ Monitoraggio Accessi & Piattaforma
          </h2>
          <p className="text-xs text-muted-foreground">
            Analisi analitica dei flussi di traffico, tempi di ritenzione e
            dispositivi degli utenti.
          </p>
        </div>

        {/* Traffico Orario e Trend Giornaliero */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Distribuzione Oraria dei Login (Fasce 00-23)"
            data={stats?.charts?.hourlyTraffic || {}}
          />
          <BarChartCard
            title="Trend Accessi Ultimi 7 Giorni"
            data={stats?.charts?.dailyTrend || {}}
          />
        </div>

        {/* Durata Sessioni, Dispositivi e Contenuti Più Visti */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DonutChartCard
            title="Profili di Durata delle Sessioni"
            data={stats?.charts?.sessionDurationDist || {}}
          />
          <DonutChartCard
            title="Dispositivi & Browser Utilizzati"
            data={stats?.charts?.deviceDistribution || {}}
          />
          <DonutChartCard
            title="Classifica Corsi Più Visualizzati"
            data={stats?.charts?.mostViewedCourses || {}}
          />
          {/* Riattivata la classifica delle lezioni più viste */}
          <BarChartCard
            title="Lezioni Con Maggior Frequenza di Click"
            data={stats?.charts?.mostViewedLessons || {}}
          />
        </div>
      </div>
    </div>
  );
}