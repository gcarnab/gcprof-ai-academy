"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; hours: number }>;
};

export default function HorizontalBarChartCard({
  title,
  subtitle,
  data,
}: Props) {
  // Mappatura compatibile con lo standard Recharts
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.hours,
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-0.5 mb-4">{subtitle}</p>
        )}
      </div>

      <div className="h-80 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f3f4f6"
            />
            <XAxis
              type="number"
              stroke="#9ca3af"
              fontSize={11}
              tickFormatter={(v) => `${v} m`}
              domain={[0, "dataMax + 5"]}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#4b5563"
              fontSize={11}
              width={110}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: any) => [`${value} min`, "Tempo di studio"]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            {/* Usiamo una tonalità viola/indigo per differenziarlo dai grafici dei corsi */}
            <Bar
              dataKey="value"
              fill="#6366f1"
              radius={[0, 4, 4, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
