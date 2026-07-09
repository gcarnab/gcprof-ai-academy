"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: Record<string, number>;
};

export default function BarChartCard({ title, data }: Props) {
  // Generiamo i dati assicurandoci che il valore sia numerico
  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value: Number(value) || 0,
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
            <BarChart 
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              {/* Griglia di sfondo sottile, sensibile al tema */}
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
              
              <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--muted-foreground)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--background)", 
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  borderRadius: "8px"
                }} 
              />
              
              {/* Legenda integrata e stilizzata */}
              <Legend 
                verticalAlign="bottom"
                align="center"
                height={36}
                iconType="rect"
                iconSize={12}
                wrapperStyle={{ 
                  fontSize: "12px", 
                  color: "var(--muted-foreground)",
                  paddingTop: "12px"
                }}
              />

              {/* Barra principale con colore di brand dell'Academy */}
              <Bar 
                name={title}
                dataKey="value" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}