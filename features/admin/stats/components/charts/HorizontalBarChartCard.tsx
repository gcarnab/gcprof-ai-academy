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
  // 🆕 Estendiamo l'oggetto aggiungendo 'classes' come stringa opzionale
  data: Array<{ name: string; hours: number; classes?: string }>;
};

export default function HorizontalBarChartCard({
  title,
  subtitle,
  data,
}: Props) {
  // Mappatura compatibile con lo standard Recharts che si porta dietro la classe
  const chartData = data.map((item) => ({
    name: item.name,
    displayName: item.classes ? `${item.name} [${item.classes}]` : item.name, // 🆕 Etichetta asse Y con classe
    value: item.hours,
    classes: item.classes || "Nessuna classe", // 🆕 Salvato per l'uso dentro il tooltip
  }));

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">{subtitle}</p>
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
              dataKey="displayName" // 🆕 Usiamo il nome esteso con la classe per l'etichetta dell'asse
              type="category"
              stroke="#4b5563"
              fontSize={10} // Abbassato leggermente per far spazio al testo più lungo della classe
              width={140}   // 🆕 Aumentato da 110 a 140 per evitare che il nome della classe venga tagliato
              tickLine={false}
            />
            <Tooltip
              // 🆕 Customizziamo il rendering del Tooltip per stampare anche la classe dentro il quadratino
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataObj = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md border-border text-xs space-y-1">
                      <p className="font-bold text-foreground">{dataObj.name}</p>
                      <p className="text-indigo-600 font-medium">
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