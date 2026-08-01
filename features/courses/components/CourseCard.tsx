"use client";

import Link from "next/link";
import type { Course } from "../types/course";
import { Clock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  course: Course;
  /** Avanzamento in percentuale (es. 45 per 45%). Se presente, attiva la modalità 'Logged-in Student' */
  progress?: number;
  /** Punti Esperienza guadagnabili nel corso. Default: 300 XP */
  xp?: number;
}

export default function CourseCard({ course, progress, xp = 300 }: Props) {
  const isEnrolled = typeof progress === "number";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5">
      <div>
        {/* Header: Cover/Icona + Badge XP o Stato Iscrizione */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/30 p-1 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            {course.coverImage ? (
              course.coverImage.startsWith("http") ||
              course.coverImage.startsWith("/") ? (
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-full w-full object-contain rounded-lg"
                />
              ) : (
                <span>{course.coverImage}</span>
              )
            ) : (
              <span>📚</span>
            )}
          </div>

          {/* Gamification Badge (Guest) o Status (Student) */}
          {isEnrolled ? (
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Iscritto</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>+{xp} XP</span>
            </div>
          )}
        </div>

        {/* Titolo del Corso */}
        <h3 className="text-lg font-bold text-card-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
          {course.title}
        </h3>

        {/* Descrizione */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Tag Categoria e Difficoltà */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-md bg-muted/80 px-2 py-0.5 font-medium text-muted-foreground border border-border/50">
            {course.category}
          </span>
          <span className="rounded-md bg-muted/80 px-2 py-0.5 font-medium text-muted-foreground border border-border/50 capitalize">
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Footer & Progress */}
      <div className="mt-6 border-t border-border/50 pt-4">
        {/* Se lo studente è iscritto, mostra la barra di avanzamento */}
        {isEnrolled ? (
          <div className="mb-3 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progresso</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <Clock className="h-3.5 w-3.5" />
            {course.estimatedHours}h stimate
          </span>

          {/* Link Reale con pseudo-elemento after per cliccare l'intera card */}
          <Link
            className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 after:absolute after:inset-0 after:rounded-2xl"
            href={`/courses/${course.slug}`}
          >
            <span>{isEnrolled ? "Continua" : "Esplora"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}