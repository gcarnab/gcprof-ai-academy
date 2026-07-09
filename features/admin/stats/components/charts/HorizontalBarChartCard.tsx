"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; hours: number; classes?: string }>;
};

export default function HorizontalBarChartCard({
  title,
  subtitle,
  data = [],
}: Props) {
  // Mappatura compatibile con lo standard Recharts
  const chartData = (data || []).map((item) => ({
    name: item.name,
    displayName: item.classes ? `${item.name} [${item.classes}]` : item.name,
    value: Number(item.hours) || 0,
    classes: item.classes || "Nessuna classe",
  }));

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm flex flex-col justify-between text-foreground transition-colors duration-200">
      <div>
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">{subtitle}</p>
        )}
      </div>

      <div className="h-80 w-full mt-4">
        {chartData.length === 0 || chartData.every(d => d.value === 0) ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Nessun dato disponibile
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              {/* Griglia verticale sensibile al tema attivo */}
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="var(--border)"
                opacity={0.5}
              />
              <XAxis
                type="number"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickFormatter={(v) => `${v} m`}
                domain={[0, "dataMax + 5"]}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="displayName"
                type="category"
                stroke="var(--muted-foreground)"
                fontSize={10}
                width={140}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataObj = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md border-border text-xs space-y-1 text-foreground">
                        <p className="font-bold">{dataObj.name}</p>
                        <p className="text-blue-500 font-medium">
                          Classe: <span className="text-muted-foreground font-normal">{dataObj.classes}</span>
                        </p>
                        <p className="text-muted-foreground font-medium">
                          Tempo di studio: <span className="text-foreground font-bold">{dataObj.value} min</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              {/* Legenda integrata e allineata con i font del sistema */}
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

              <Bar
                name="Minuti Attivi per Studente"
                dataKey="value"
                fill="#6366f1"
                radius={[0, 4, 4, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}