"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: {
    published: number;
    draft: number;
  };
};

export default function DonutChartCard({ title, data }: Props) {
  const chartData = [
    { name: "Published", value: data.published },
    { name: "Draft", value: data.draft },
  ];

  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              label
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}