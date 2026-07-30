"use client";

import React from "react";
import { UserGamificationOverview, BadgeItem } from "../actions/gamification";

interface Props {
  overview: UserGamificationOverview;
}

export function StudentGamificationDashboard({ overview }: Props) {
  const { global, courses } = overview;

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
              <span className="text-4xl font-extrabold text-amber-400">
                Lvl {global.global_level}
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium text-indigo-200">XP Totali Guadagnati</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-extrabold text-indigo-300">
                {global.total_xp}
              </span>
              <span className="text-sm text-indigo-200">XP</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium text-indigo-200">Badge Sbloccati</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-extrabold text-emerald-400">
                {global.total_badges_count}
              </span>
              <span className="text-sm text-indigo-200">Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEZIONE I TUOI CORSI ISCRITTI */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          I Tuoi Corsi ({courses.length})
        </h3>

        {courses.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center text-gray-500 border border-gray-200 dark:border-gray-700">
            Non sei ancora iscritto a nessun corso. Visita il catalogo per iniziare!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {courses.map((course) => {
              // Divisione robusta dei badge tra Quiz e Moduli
              const quizBadges = course.badges.filter(
                (b) => (b.badge_type || b.type) === "quiz" || Boolean(b.quiz_id)
              );
              const moduleBadges = course.badges.filter(
                (b) => (b.badge_type || b.type) !== "quiz" && !b.quiz_id
              );

              const isNewCourse = course.course_xp === 0 && course.badges.length === 0;

              return (
                <div
                  key={course.course_id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm space-y-6"
                >
                  {/* Header Corso */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {course.course_title}
                        </h4>
                        {isNewCourse && (
                          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Nuovo / Da iniziare
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        XP accumulati:{" "}
                        <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                          {course.course_xp} XP
                        </strong>
                      </p>
                    </div>
                    <span className="self-start sm:self-center bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                      Livello Corso: {course.course_level}
                    </span>
                  </div>

                  {/* Griglia Badge del Corso */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BadgeList
                      title="📘 Badge Moduli"
                      badges={moduleBadges}
                      emptyText="Nessun badge modulo sbloccato."
                      colorScheme="amber"
                      defaultIcon="⭐"
                    />

                    <BadgeList
                      title="🎯 Badge Quiz"
                      badges={quizBadges}
                      emptyText="Nessun badge quiz sbloccato in questo corso."
                      colorScheme="indigo"
                      defaultIcon="🎯"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sotto-componente Helper Reutilizzabile per la Griglia Badge
// ----------------------------------------------------------------------
interface BadgeListProps {
  title: string;
  badges: BadgeItem[];
  emptyText: string;
  colorScheme: "amber" | "indigo";
  defaultIcon: string;
}

function BadgeList({ title, badges, emptyText, colorScheme, defaultIcon }: BadgeListProps) {
  const styles = {
    amber: {
      textHeader: "text-gray-500 dark:text-gray-400",
      badgeBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200",
    },
    indigo: {
      textHeader: "text-indigo-600 dark:text-indigo-400",
      badgeBg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200",
    },
  }[colorScheme];

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${styles.textHeader}`}>
          {title} ({badges.length})
        </span>
      </div>

      {badges.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">{emptyText}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <div
              key={badge.badge_id}
              tabIndex={0}
              className={`group relative flex items-center space-x-2 border px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${styles.badgeBg}`}
            >
              <span className="text-base">{badge.icon || defaultIcon}</span>
              <span>{badge.title}</span>

              {/* Tooltip Hover + Focus */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus:flex flex-col bg-gray-900 text-white text-[11px] p-2.5 rounded-lg shadow-xl w-max max-w-xs z-20 pointer-events-none whitespace-normal">
                <span className="font-semibold">{badge.description || badge.title}</span>
                <span className="text-gray-400 text-[10px] mt-1">
                  Sbloccato: {new Date(badge.awarded_at).toLocaleDateString("it-IT")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}