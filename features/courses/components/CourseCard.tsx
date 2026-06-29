/**
 * =====================================================================
 * GCPROF AI Academy
 * ---------------------------------------------------------------------
 * File: CourseCard.tsx
 * ---------------------------------------------------------------------
 * Questo componente rappresenta una singola "scheda corso".
 *
 * RESPONSABILITÀ
 * ---------------------------------------------------------------------
 * Il componente NON conosce dove vengono recuperati i dati.
 *
 * Riceve semplicemente un oggetto Course tramite le props
 * e si limita a mostrarlo.
 *
 * Questo principio prende il nome di:
 *
 *      Presentational Component
 *
 * ovvero un componente dedicato esclusivamente
 * alla presentazione grafica.
 *
 * In futuro potrà essere riutilizzato:
 *
 * • Home
 * • Catalogo corsi
 * • Ricerca
 * • Dashboard docente
 * • Dashboard studente
 * • Preferiti
 *
 * senza alcuna modifica.
 * =====================================================================
 */

import { Course } from "../types/course";

/**
 * Definizione delle proprietà (Props)
 * ricevute dal componente.
 */
interface CourseCardProps {
  /**
   * Corso da visualizzare.
   */
  course: Course;
}

/**
 * =====================================================================
 * COMPONENTE
 * =====================================================================
 */
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article
      className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition
                duration-300
                hover:shadow-lg
                hover:-translate-y-1
            "
    >
      {/* ==========================================================
                Titolo
            =========================================================== */}

      <h3 className="text-xl font-bold text-slate-800">{course.title}</h3>

      {/* ==========================================================
                Livello
            =========================================================== */}

      <h3 className="text-sm italic text-green-600 font-semibold">
        {course.level}
      </h3>

      {/* ==========================================================
                Descrizione
            =========================================================== */}

      <p className=" mt-3 text-gray-600 leading-relaxed">
        {course.description}
      </p>
    </article>
  );
}
