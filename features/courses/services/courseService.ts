/**
 * ============================================================================
 * SERVICE: CourseService
 * ----------------------------------------------------------------------------
 * Questo service rappresenta il livello di accesso ai dati dei corsi.
 *
 * ATTUALMENTE:
 * - usa dati statici (mock)
 *
 * FUTURO:
 * - sarà sostituito da Supabase senza cambiare UI o hook
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * ✔ recuperare corsi
 * ✔ cercare corsi
 * ✔ recuperare corso per slug
 * ============================================================================
 */

import { courses } from "../data/courses";

/**
 * Recupera tutti i corsi
 */
export function getAllCourses() {
  return courses;
}

/**
 * Recupera un singolo corso tramite slug
 */
export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}