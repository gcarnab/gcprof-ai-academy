import { courses } from "../data/courses";
import type { Course, Module, Lesson } from "../types/course";
import type { SessionUser } from "../../auth/services/authService";

export function hasCourseAccess(course: Course, user: SessionUser | null): boolean {
  // Se il corso non è pubblicato, nessuno studente lo vede
  if (!course.published) return false;

  // L'admin ha accesso a tutto
  if (user?.role === "admin") return true;

  // Se il corso non ha restrizioni di classe, è aperto a tutti gli utenti loggati
  if (!course.allowedClasses || course.allowedClasses.length === 0) {
    return user !== null;
  }

  // Se l'utente non è loggato o non ha classi assegnate, accesso negato
  if (!user || !user.class) return false;

  // Trasformiamo la stringa "1A,1B" in un array di classi dell'utente: ["1A", "1B"]
  const userClasses = user.class.split(",").map((c) => c.trim());

  // Controlliamo se almeno una delle classi dell'utente è tra quelle permesse dal corso
  return course.allowedClasses.some((allowedClass) => userClasses.includes(allowedClass));
}

// ... mantieni getAllCourses, getCourseBySlug, getModule, getLesson uguali a prima
export function getAllCourses(user: SessionUser | null): Course[] {
  return courses.filter((course) => hasCourseAccess(course, user));
}

export function getCourseBySlug(slug: string, user: SessionUser | null): Course | undefined {
  const course = courses.find((c) => c.slug === slug);
  if (!course || !hasCourseAccess(course, user)) return undefined;
  return course;
}

export function getModule(courseSlug: string, moduleId: string, user: SessionUser | null): Module | undefined {
  const course = getCourseBySlug(courseSlug, user);
  if (!course) return undefined;
  return course.modules.find((m) => m.id === moduleId);
}

export function getLesson(courseSlug: string, moduleId: string, lessonId: string, user: SessionUser | null): Lesson | undefined {
  const module = getModule(courseSlug, moduleId, user);
  if (!module) return undefined;
  return module.lessons.find((l) => l.id === lessonId);
}