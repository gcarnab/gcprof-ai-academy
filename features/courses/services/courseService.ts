/**
 * ============================================================================
 * SERVICE: CourseService
 * ----------------------------------------------------------------------------
 * Questo service rappresenta il livello di accesso ai dati dei corsi.
 *
 * FILOSOFIA
 * ----------------------------------------------------------------------------
 * La UI NON accede mai direttamente al file courses.ts.
 *
 * Tutte le ricerche vengono effettuate tramite questo service.
 *
 * In futuro sarà sufficiente sostituire l'implementazione con Supabase
 * senza modificare nessun componente React.
 *
 * RESPONSABILITÀ
 * ----------------------------------------------------------------------------
 * ✔ recuperare tutti i corsi
 * ✔ recuperare un corso tramite slug
 * ✔ recuperare un modulo
 * ✔ recuperare una lezione
 * ============================================================================
 */

import { courses } from "../data/courses";

import type {
  Course,
  Module,
  Lesson,
} from "../types/course";

/* ============================================================================
 * TUTTI I CORSI
 * ========================================================================== */

/**
 * Restituisce il catalogo completo.
 */
export function getAllCourses(): Course[] {
  return courses;
}

/* ============================================================================
 * CORSO
 * ========================================================================== */

/**
 * Restituisce un corso tramite slug.
 */
export function getCourseBySlug(
  slug: string
): Course | undefined {

  return courses.find(
    (course) => course.slug === slug
  );

}

/* ============================================================================
 * MODULO
 * ========================================================================== */

/**
 * Restituisce un modulo di un corso.
 */
export function getModule(
  courseSlug: string,
  moduleId: string
): Module | undefined {

  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return undefined;
  }

  return course.modules.find(
    (module) => module.id === moduleId
  );

}

/* ============================================================================
 * LEZIONE
 * ========================================================================== */

/**
 * Restituisce una lezione.
 */
export function getLesson(
  courseSlug: string,
  moduleId: string,
  lessonId: string
): Lesson | undefined {

  const module = getModule(
    courseSlug,
    moduleId
  );

  if (!module) {
    return undefined;
  }

  return module.lessons.find(
    (lesson) => lesson.id === lessonId
  );

}