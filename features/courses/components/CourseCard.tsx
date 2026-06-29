/**
 * ============================================================================
 * COMPONENTE: CourseCard
 * ----------------------------------------------------------------------------
 * Card che rappresenta un singolo corso nel catalogo.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - mostrare dati corso
 * - navigare alla pagina dettaglio corso (/courses/[slug])
 *
 * NOTA:
 * ----------------------------------------------------------------------------
 * Il routing è gestito tramite Next.js Link (client-side navigation)
 * ============================================================================
 */

"use client";

import Link from "next/link";

import { Course } from "../types/course";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      {/* Titolo corso */}
      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>

      {/* Descrizione */}
      <p className="mt-2 text-sm text-gray-600">{course.description}</p>

      {/* Meta info */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>{course.category}</span>
        <span>{course.difficulty}</span>
      </div>

      {/* CTA implicita*/}
      <Link
        className="mt-4 text-sm font-medium text-blue-600"
        href={`/courses/${course.slug}`}
      >
        Vai al corso
      </Link>
    </Link>
  );
}
