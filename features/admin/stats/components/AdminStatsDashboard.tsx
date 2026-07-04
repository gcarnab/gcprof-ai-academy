"use client";

import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import DonutChartCard from "./charts/DonutChartCard";
import StatsKpiCards from "./charts/StatsKpiCards";

type Props = {
  stats: any;
};

export default function AdminStatsDashboard({ stats }: Props) {
  return (
    <div className="space-y-6 p-6">
      {/* KPI */}
      <StatsKpiCards
        totalUsers={stats.totals.users}
        totalCourses={stats.totals.courses}
        totalModules={0}
        totalLessons={0}
      />

      {/* GRID CHARTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* USERS BY ROLE */}
        <PieChartCard
          title="Utenti per Ruolo"
          data={stats.charts.usersByRole}
        />

        {/* USERS BY STATUS */}
        <BarChartCard
          title="Utenti per Stato"
          data={stats.charts.usersByStatus}
        />

        {/* STUDENTS BY CLASS */}
        <PieChartCard
          title="Studenti per Classe"
          data={stats.charts.studentsByClass}
        />

        {/* COURSES BY CATEGORY */}
        <BarChartCard
          title="Corsi per Categoria"
          data={stats.charts.coursesByCategory}
        />

        {/* PUBLISHED VS DRAFT */}
        <DonutChartCard
          title="Corsi Pubblicati"
          data={stats.charts.publishedCourses}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard
          title="Top 5 Corsi per Moduli"
          data={Object.fromEntries(
            stats.charts.modulesPerCourse.map((c: any) => [c.title, c.modules]),
          )}
        />

        <BarChartCard
          title="Top 5 Corsi per Lezioni"
          data={Object.fromEntries(
            stats.charts.lessonsPerCourse.map((c: any) => [c.title, c.lessons]),
          )}
        />

        <PieChartCard
          title="Complessità Corsi"
          data={stats.charts.courseComplexity}
        />
      </div>
    </div>
  );
}
