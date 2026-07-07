"use client";

import Link from "next/link";
import type { Course } from "../types/course";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    /* 🎯 FIX: Cambiato da <Link> a un normale <div>. 
       La classe 'group' ci permette di controllare gli effetti hover dei figli */
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div>
        {/* Intestazione Mini Logo */}
        <div className="mb-4 h-12 w-12 overflow-hidden rounded-md border border-border bg-background flex items-center justify-center text-2xl shadow-sm">
          {" "}
          {course.coverImage ? (
            course.coverImage.startsWith("http") ||
            course.coverImage.startsWith("/") ? (
              <img
                src={course.coverImage}
                alt={course.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <span>{course.coverImage}</span>
            )
          ) : (
            <span>📚</span>
          )}
        </div>

        {/* Titolo del Corso */}
        <h3 className="text-xl font-bold text-card-foreground group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Descrizione */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Tag informativi */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium border border-border">
            {course.category}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium border border-border">
            {course.difficulty}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">
          🕒 {course.estimatedHours} ore stimate
        </span>

        {/* 🎯 UNICO LINK REALE: Rende l'intera scheda cliccabile in sicurezza 
           sfruttando l'absolute positioning pseudo-elemento 'after:absolute' */}
        <Link
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 after:absolute after:inset-0 after:rounded-xl"
          href={`/courses/${course.slug}`}
        >
          Esplora corso{" "}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
