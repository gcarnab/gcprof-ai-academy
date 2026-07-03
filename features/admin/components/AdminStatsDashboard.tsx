"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminStatsDashboard({ users }: any) {
  // Calcolo distribuzione basato su array di classi
  const classDistribution = users.reduce((acc: any, user: any) => {
    const classes = user.classes || [];
    
    if (classes.length === 0) {
      acc["Senza Classe"] = (acc["Senza Classe"] || 0) + 1;
    } else {
      classes.forEach((cls: string) => {
        acc[cls] = (acc[cls] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(classDistribution).map((key) => ({
    name: key,
    value: classDistribution[key],
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Distribuzione Studenti per Classe</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => [value, "Studenti"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}