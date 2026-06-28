/**
 * ============================================================================
 * COMPONENTE: CourseCard
 * ----------------------------------------------------------------------------
 * Card riutilizzabile per la visualizzazione di un singolo corso.
 *
 * RUOLO:
 * - Mostrare informazioni base di un corso
 *
 * ATTUALMENTE:
 * - Titolo corso
 * - Descrizione breve
 * - Link alla pagina corso
 *
 * FUTURO:
 * - Immagine corso
 * - Badge (novità, popolare)
 * - Stato progresso utente
 *
 * NOTA ARCHITETTURALE:
 * Questo è un componente UI puro e RIUTILIZZABILE.
 * NON deve contenere logica dati.
 * ============================================================================
 */

import Link from "next/link"
import type { Course } from "../data/courses"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900">
        {course.title}
      </h3>

      <p className="mt-4 text-gray-600">
        {course.description}
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-block font-semibold text-blue-600 hover:text-blue-700"
      >
        Scopri il corso →
      </Link>
    </article>
  )
}