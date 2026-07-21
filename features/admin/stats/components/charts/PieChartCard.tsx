"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Props = {
  title: string;
  data: Record<string, number>;
};

export default function PieChartCard({ title, data }: Props) {
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  // Generiamo i dati iniettando direttamente la proprietà 'fill' per evitare il tag deprecato <Cell />
  const chartData = Object.entries(data || {}).map(([name, value], i) => ({
    name,
    value: Number(value) || 0,
    fill: COLORS[i % COLORS.length], // Associazione nativa ed efficiente del colore
  }));

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm text-foreground transition-colors duration-200">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>

      <div className="h-80">
        {chartData.length === 0 || chartData.every((d) => d.value === 0) ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Nessun dato disponibile
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="40%"
                outerRadius={70}
                label={{ fill: "currentColor", fontSize: 10 }}
                className="text-muted-foreground"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  borderRadius: "8px",
                }}
              />

              {/* Legenda allineata e configurata per il supporto al tema attivo */}
              <Legend
                verticalAlign="bottom"
                align="center"
                height={40}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "11px",
                  color: "var(--muted-foreground)",
                  paddingTop: "8px",
                  maxHeight: "75px",
                  overflowY: "auto",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
