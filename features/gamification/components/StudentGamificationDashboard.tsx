"use client";

import React from "react";
import { UserGamificationOverview } from "../actions/gamification";


interface Props {
  overview: UserGamificationOverview;
}

export function StudentGamificationDashboard({ overview }: Props) {
  const { global, courses } = overview;

  // Filtriamo solo i corsi attivi (con XP o badge) se si vuole dare priorità, oppure li mostriamo tutti
  const activeCourses = courses.filter((c) => c.course_xp > 0 || c.badges.length > 0);
  const otherCourses = courses.filter((c) => c.course_xp === 0 && c.badges.length === 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      {/* 1. SEZIONE OVERVIEW GLOBALE */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold tracking-wide uppercase text-indigo-300 mb-4">
          Progresso Globale Piattaforma
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium text-indigo-200">Livello Globale</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-extrabold text-amber-400">Lvl {global.global_level}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium text-indigo-200">XP Totali Guadagnati</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-extrabold text-indigo-300">{global.total_xp}</span>
              <span className="text-sm text-indigo-200">XP</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium text-indigo-200">Badge Sbloccati</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-extrabold text-emerald-400">{global.total_badges_count}</span>
              <span className="text-sm text-indigo-200">Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEZIONE CORSI ATTIVI */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          I Tuoi Corsi In Corso
        </h3>

        {activeCourses.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center text-gray-500">
            Non hai ancora iniziato ad accumulare XP nei tuoi corsi. Completa una lezione per sbloccare i primi badge!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {course.course_title}
                    </h4>
                    <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full">
                      Lvl {course.course_level}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    XP Corso: <strong className="text-indigo-600 dark:text-indigo-400">{course.course_xp} XP</strong>
                  </p>

                  {/* Badge sbloccati per il corso */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Badge Ottenuti ({course.badges.length})
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {course.badges.map((badge) => (
                        <div
                          key={badge.badge_id}
                          className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-900 dark:text-amber-200"
                          title={`Ottenuto il ${new Date(badge.awarded_at).toLocaleDateString()}`}
                        >
                          <span className="text-base">{badge.icon || "⭐"}</span>
                          <span>{badge.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. ALTRI CORSI DISPONIBILI */}
      {otherCourses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-3">
            Altri Corsi Disponibili ({otherCourses.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherCourses.map((course) => (
              <div
                key={course.course_id}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 font-medium"
              >
                {course.course_title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}