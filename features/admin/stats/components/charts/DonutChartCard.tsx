"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: Record<string, number>;
};

export default function DonutChartCard({ title, data = {} }: Props) {
  // Palette di colori flessibile, armoniosa sia su sfondi chiari che scuri
  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#64748b"];

  // Generiamo i dati iniettando direttamente la proprietà 'fill' per evitare il tag deprecato <Cell />
  const chartData = Object.entries(data).map(([key, value], i) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizza la chiave per la legenda
    value: Number(value) || 0,
    fill: COLORS[i % COLORS.length] // Associazione nativa del colore al record del dato
  }));

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm text-foreground transition-colors duration-200">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>

      <div className="h-80">
        {chartData.length === 0 || chartData.every(d => d.value === 0) ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Nessun dato disponibile
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={60}
                outerRadius={85}
                label={{ fill: "currentColor", fontSize: 11 }}
                className="text-muted-foreground"
              />
              
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--background)", 
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  borderRadius: "8px"
                }} 
              />

              {/* Legenda configurata per il supporto Light/Dark */}
              <Legend
                verticalAlign="bottom"
                align="center"
                height={40}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ 
                  fontSize: "12px", 
                  color: "var(--muted-foreground)",
                  paddingTop: "12px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}