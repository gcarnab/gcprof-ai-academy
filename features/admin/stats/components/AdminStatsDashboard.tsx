"use client";

import { useMemo } from "react";
import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import DonutChartCard from "./charts/DonutChartCard";
import StatsKpiCards from "./charts/StatsKpiCards";
import HorizontalBarChartCard from "./charts/HorizontalBarChartCard";

type Props = {
  stats: any;
};

export default function AdminStatsDashboard({ stats }: Props) {
  // ---------------------------------------------------------------------------
  // 🧮 MEMO & DATING PREPARATION
  // ---------------------------------------------------------------------------
  const avgLessonsPerModule = useMemo(() => {
    return stats?.totals?.modules > 0
      ? (stats.totals.lessons / stats.totals.modules).toFixed(1)
      : "0";
  }, [stats?.totals?.modules, stats?.totals?.lessons]);

  const completionRate = stats?.totals?.completionRate ?? 0;
  const dropOffRate = stats?.totals?.dropOffRate ?? 0;

  const refinedStudentEngagement = useMemo(() => {
    return (stats?.charts?.studentEngagement || []).map((student: any) => ({
      name: student.name,
      hours: student.hours,
      classes: student.classes || student.class_name || undefined,
    }));
  }, [stats?.charts?.studentEngagement]);

  // Moduli e Lezioni per corso isolati dal JSX
  const modulesPerCourseData = useMemo(() => {
    return Object.fromEntries(
      (stats?.charts?.modulesPerCourse || []).map((c: any) => [
        c.title,
        c.modules,
      ]),
    );
  }, [stats?.charts?.modulesPerCourse]);

  const lessonsPerCourseData = useMemo(() => {
    return Object.fromEntries(
      (stats?.charts?.lessonsPerCourse || []).map((c: any) => [
        c.title,
        c.lessons,
      ]),
    );
  }, [stats?.charts?.lessonsPerCourse]);

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
          totalXp={stats?.totals?.totalXp || 0}
          totalHoursActive={stats?.totals?.totalHoursActive || 0}
          averageLevel={stats?.totals?.averageLevel || 1}
        />

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
            Community Studenti
          </h2>
          <p className="text-xs text-muted-foreground">
            Distribuzione degli iscritti per classe, sezione e indirizzo.
          </p>
        </div>

        {/* Layout Tablet/Desktop coerente: 2 col su tablet, 4 su desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PieChartCard
            title="Studenti per Classe"
            data={stats?.charts?.studentsByClass || {}}
          />
          <PieChartCard
            title="Studenti per Sezione"
            data={stats?.charts?.studentsBySection || {}}
          />
          <div className="md:col-span-2 lg:col-span-2">
            <BarChartCard
              title="Studenti per Indirizzo"
              data={stats?.charts?.studentsByTrack || {}}
            />
          </div>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <BarChartCard
            title="Corsi per Categoria"
            data={stats?.charts?.coursesByCategory || {}}
          />
          <BarChartCard
            title="Top Corsi per Lezioni"
            data={lessonsPerCourseData}
          />
          <BarChartCard
            title="Top Corsi per Moduli"
            data={modulesPerCourseData}
          />
          <PieChartCard
            title="Complessità dei Corsi"
            data={stats?.charts?.courseComplexity || {}}
          />
          {/* 
          <DonutChartCard
            title="Stato Pubblicazione Corsi"
            data={stats?.charts?.publishedCourses || {}}
          />
          */}
        </div>
      </div>

      {/* ==========================================
          🛰️ SEZIONE 3: MONITORAGGIO ACCESSI & TRAFFICO
          ========================================== */}
      <div className="space-y-6 pt-2">
        {/* Intestazione Sezione */}
        <div className="border-b border-border pb-2">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Monitoraggio Accessi & Piattaforma
          </h2>
          <p className="text-xs text-muted-foreground">
            Analisi analitica dei flussi di traffico, tempi di ritenzione,
            dispositivi e fruizione dei contenuti.
          </p>
        </div>

        {/* 🔹 GRUPPO 1: FLUSSI DI ACCESSO, SESSIONI E DISPOSITIVI */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Flussi di Accesso & Dispositivi
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <BarChartCard
              title="Distribuzione Oraria dei Login (00-23)"
              data={stats?.charts?.hourlyTraffic || {}}
            />
            <BarChartCard
              title="Trend Accessi Ultimi 7 Giorni"
              data={stats?.charts?.dailyTrend || {}}
            />
            <DonutChartCard
              title="Profili di Durata delle Sessioni"
              data={stats?.charts?.sessionDurationDist || {}}
            />
            <DonutChartCard
              title="Dispositivi & Browser Utilizzati"
              data={stats?.charts?.deviceDistribution || {}}
            />
          </div>
        </div>

        {/* 🔹 GRUPPO 2: FRUIZIONE CONTENUTI & ENGAGEMENT */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Fruizione Contenuti & Attività
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <DonutChartCard
              title="Classifica Corsi Più Visualizzati"
              data={stats?.charts?.mostViewedCourses || {}}
            />
            <BarChartCard
              title="Lezioni Con Maggior Frequenza di Click"
              data={stats?.charts?.mostViewedLessons || {}}
            />
            <div className="lg:col-span-2">
              <HorizontalBarChartCard
                title="Tempo di Attività Studenti"
                subtitle="Classifica del tempo totale cumulato dagli studenti all'interno dei corsi"
                data={refinedStudentEngagement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
