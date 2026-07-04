"use client";

import AdminStatsDashboard from "./AdminStatsDashboard";


interface Props {
  stats: any;
}

export default function StatsTab({ stats }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <AdminStatsDashboard stats={stats} />

    </div>
  );
}