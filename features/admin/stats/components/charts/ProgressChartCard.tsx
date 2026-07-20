'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; // Adegua ai tuoi componenti
import { ChartDataPoint } from '../../services/adminStatsService';

interface ProgressChartCardProps {
  data: ChartDataPoint[];
}

export function ProgressChartCard({ data }: ProgressChartCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Traffico vs Completamenti</CardTitle>
        <CardDescription>
          Analisi delle visite alla piattaforma rispetto alle lezioni concluse dagli studenti.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Nessun dato disponibile per il periodo selezionato.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} />
              
              <Line
                name="Visualizzazioni"
                type="monotone"
                dataKey="views"
                stroke="#3b82f6" // Blue
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Lezioni Completate"
                type="monotone"
                dataKey="completions"
                stroke="#10b981" // Emerald
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}