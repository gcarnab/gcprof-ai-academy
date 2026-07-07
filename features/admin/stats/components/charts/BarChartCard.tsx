"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: Record<string, number>;
};

export default function BarChartCard({ title, data }: Props) {
  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}