"use client";

import React from "react";
import { AdminCourseStat } from "../actions/gamification";


interface Props {
  stats: AdminCourseStat[];
}

export function AdminGamificationDashboard({ stats }: Props) {
  const totalPlatformXp = stats.reduce((acc, curr) => acc + Number(curr.total_xp_awarded), 0);
  const totalPlatformBadges = stats.reduce((acc, curr) => acc + Number(curr.total_badges_awarded), 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header Statistiche Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Totale XP Erogati in Piattaforma</p>
          <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {totalPlatformXp.toLocaleString()} XP
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Totale Badge Assegnati</p>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalPlatformBadges.toLocaleString()} Badge
          </p>
        </div>
      </div>

      {/* Tabella Statistiche per Corso */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Analisi Gamification per Corso
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">Corso</th>
                <th scope="col" className="px-6 py-3 text-center">Studenti Attivi</th>
                <th scope="col" className="px-6 py-3 text-center">XP Totali</th>
                <th scope="col" className="px-6 py-3 text-center">Badge Assegnati</th>
                <th scope="col" className="px-6 py-3 text-center">Media XP / Studente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {stats.map((row) => (
                <tr key={row.course_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {row.course_title}
                  </td>
                  <td className="px-6 py-4 text-center">{row.total_students_active}</td>
                  <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                    {row.total_xp_awarded}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-amber-600 dark:text-amber-400">
                    {row.total_badges_awarded}
                  </td>
                  <td className="px-6 py-4 text-center">{row.avg_xp_per_student} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}