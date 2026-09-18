"use client";

import { useMemo, ReactNode } from "react";
import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import DonutChartCard from "./charts/DonutChartCard";
import StatsKpiCards from "./charts/StatsKpiCards";
import HorizontalBarChartCard from "./charts/HorizontalBarChartCard";
import LessonCompletionChartCard from "./charts/LessonCompletionChartCard";
import type { AdminStatsData } from "../services/adminStatsService";

type Props = {
  stats: AdminStatsData;
};

function DashboardSection({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-b border-border pb-2">
        <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export default function AdminStatsDashboard({ stats }: Props) {
  const avgLessonsPerModule = useMemo(() => {
    const modules = stats?.totals?.modules ?? 0;
    const lessons = stats?.totals?.lessons ?? 0;
    return modules > 0 ? (lessons / modules).toFixed(1) : "0";
  }, [stats?.totals?.modules, stats?.totals?.lessons]);

  const completionRate = stats?.totals?.completionRate ?? 0;
  const dropOffRate = stats?.totals?.dropOffRate ?? 0;

  const refinedStudentEngagement = useMemo(() => {
    return (stats?.charts?.studentEngagement ?? []).map((student) => ({
      name: student.name,
      hours: student.hours,
      classes: student.classes ?? undefined,
    }));
  }, [stats?.charts?.studentEngagement]);

  const aiTotals = stats?.totals?.ai ?? {
    totalReviews: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
  };

  const rawCourses = stats?.raw?.courses ?? [];
  const rawUsers = stats?.raw?.users ?? [];
  const rawLessonProgress = (stats?.raw as any)?.lessonProgress ?? [];

  return (
    <div className="space-y-10 p-6">
      {/* 📊 KPI PRINCIPALI */}
      <div className="relative">
        <StatsKpiCards
          totalUsers={stats?.totals?.users ?? 0}
          totalCourses={stats?.totals?.courses ?? 0}
          totalModules={stats?.totals?.modules ?? 0}
          totalLessons={stats?.totals?.lessons ?? 0}
          totalXp={stats?.totals?.totalXp ?? 0}
          totalHoursActive={stats?.totals?.totalHoursActive ?? 0}
          averageLevel={stats?.totals?.averageLevel ?? 1}
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

      {/* 🎓 STRUTTURA DIDATTICA & COMPLETAMENTO LEZIONI */}
      <DashboardSection
        title="🎓 Struttura Didattica & Avanzamento Corsi"
        subtitle="Analisi sintetica delle categorie e dettaglio del completamento lezioni per corso e classe."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <BarChartCard
              title="Corsi per Categoria"
              data={stats?.charts?.coursesByCategory ?? {}}
            />
          </div>
          <div className="lg:col-span-2">
            <LessonCompletionChartCard
              courses={rawCourses}
              users={rawUsers}
              lessonProgress={rawLessonProgress}
            />
          </div>
        </div>
      </DashboardSection>

      {/* 📝 VALUTAZIONI & QUIZ */}
      <DashboardSection
        title="📝 Valutazioni & Performance Quiz"
        subtitle="Analisi dettagliata dei punteggi ottenuti dagli studenti e del tasso di superamento dei test."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <BarChartCard
              title="Distribuzione Voti Quiz (Scala 0-10)"
              data={stats?.charts?.quizScoreDistribution ?? {}}
            />
          </div>
          <div>
            <DonutChartCard
              title="Tasso di Superamento Quiz"
              data={stats?.charts?.quizPassRate ?? {}}
            />
          </div>
        </div>
      </DashboardSection>

      {/* 🤖 CONSUMO AI */}
      <DashboardSection
        title="🤖 Consumo AI & Correzioni Automatiche"
        subtitle="Monitoraggio in tempo reale dell'uso dei token, modelli e valutazioni generate dall'AI."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Valutazioni AI Totali</p>
            <p className="mt-1 text-2xl font-extrabold text-foreground">
              {aiTotals.totalReviews.toLocaleString("it-IT")}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Token Totali Consumati</p>
            <p className="mt-1 text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {aiTotals.totalTokens.toLocaleString("it-IT")}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Prompt Tokens (Input)</p>
            <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              {aiTotals.promptTokens.toLocaleString("it-IT")}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Completion Tokens (Output)</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {aiTotals.completionTokens.toLocaleString("it-IT")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <BarChartCard
            title="Consumo Token AI (Finestra temporale)"
            data={stats?.charts?.aiDailyTokensTrend ?? {}}
          />
          <BarChartCard
            title="Correzioni Quiz Per Giorno"
            data={stats?.charts?.aiDailyReviewsTrend ?? {}}
          />
          <DonutChartCard
            title="Distribuzione Modelli AI"
            data={stats?.charts?.aiModelDistribution ?? {}}
          />
        </div>
      </DashboardSection>

      {/* 👥 COMMUNITY */}
      <DashboardSection
        title="👥 Community Studenti"
        subtitle="Distribuzione degli iscritti per classe, sezione e indirizzo."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PieChartCard
            title="Studenti per Classe"
            data={stats?.charts?.studentsByClass ?? {}}
          />
          <PieChartCard
            title="Studenti per Sezione"
            data={stats?.charts?.studentsBySection ?? {}}
          />
          <div className="md:col-span-2 lg:col-span-2">
            <BarChartCard
              title="Studenti per Indirizzo"
              data={stats?.charts?.studentsByTrack ?? {}}
            />
          </div>
        </div>
      </DashboardSection>

      {/* 🛰️ MONITORAGGIO ACCESSI */}
      <DashboardSection
        title="🛰️ Monitoraggio Accessi & Attività"
        subtitle="Analisi analitica dei flussi di traffico, tempi di ritenzione, dispositivi e fruizione dei contenuti."
      >
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Flussi di Accesso & Dispositivi
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <BarChartCard
              title="Distribuzione Oraria dei Login (00-23)"
              data={stats?.charts?.hourlyTraffic ?? {}}
            />
            <BarChartCard
              title="Trend Accessi Ultimi 7 Giorni"
              data={stats?.charts?.dailyTrend ?? {}}
            />
            <DonutChartCard
              title="Profili di Durata delle Sessioni"
              data={stats?.charts?.sessionDurationDist ?? {}}
            />
            <DonutChartCard
              title="Dispositivi & Browser Utilizzati"
              data={stats?.charts?.deviceDistribution ?? {}}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Fruizione Contenuti
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <HorizontalBarChartCard
              title="Tempo di Attività Studenti"
              subtitle="Classifica del tempo totale cumulato dagli studenti all'interno dei corsi"
              data={refinedStudentEngagement}
            />
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}