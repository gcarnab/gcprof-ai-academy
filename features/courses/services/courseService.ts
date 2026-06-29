import { courses as staticCourses } from "../data/courses";
import type { Course, Module, Lesson } from "../types/course";
import type { SessionUser } from "../../auth/services/authService";

export function getMergedCourses(): Course[] {
  if (typeof window === "undefined") return staticCourses;
  const localData = localStorage.getItem("cms_courses");
  if (!localData) return staticCourses;
  try {
    const dynamicCourses = JSON.parse(localData) as Course[];
    const allCourses = [...staticCourses];
    dynamicCourses.forEach((dc) => {
      const exists = allCourses.some((sc) => sc.slug === dc.slug);
      if (!exists) allCourses.push(dc);
    });
    return allCourses;
  } catch (e) {
    return staticCourses;
  }
}

/**
 * 🎯 NUOVA LOGICA: Chiunque può vedere la scheda/dettaglio del corso pubblico.
 * Il filtro per classe si attiva solo se l'utente è loggato e il corso ha restrizioni.
 */
export function hasCourseAccess(course: Course, user: SessionUser | null): boolean {
  if (!course.published) return user?.role === "admin";
  
  // Se l'utente non è loggato, può comunque vedere la pagina di DETTAGLIO generica (regola 2)
  if (!user) return true; 
  
  if (user.role === "admin") return true;
  if (!course.allowedClasses || course.allowedClasses.length === 0) return true;

  const userClasses = user.class?.split(",").map((c) => c.trim()) || [];
  return course.allowedClasses.some((allowedClass) => userClasses.includes(allowedClass));
}

export function getAllCourses(user: SessionUser | null): Course[] {
  // Mostra tutti i corsi pubblicati nel catalogo (regola 2)
  return getMergedCourses().filter((course) => course.published || user?.role === "admin");
}

export function getCourseBySlug(slug: string, user: SessionUser | null): Course | undefined {
  return getMergedCourses().find((c) => c.slug === slug);
}

// Le lezioni e i moduli restano super protetti: se non sei loggato o non hai la classe, non li vedi
export function getModule(courseSlug: string, moduleId: string, user: SessionUser | null): Module | undefined {
  const course = getCourseBySlug(courseSlug, user);
  if (!course || !user) return undefined; // Forza login per i moduli
  
  // Controllo classe stringente per lo studente loggato
  if (user.role !== "admin" && course.allowedClasses && course.allowedClasses.length > 0) {
    const userClasses = user.class?.split(",").map((c) => c.trim()) || [];
    const hasClass = course.allowedClasses.some((ac) => userClasses.includes(ac));
    if (!hasClass) return undefined;
  }
  
  return course.modules.find((m) => m.id === moduleId);
}

export function getLesson(courseSlug: string, moduleId: string, lessonId: string, user: SessionUser | null): Lesson | undefined {
  const module = getModule(courseSlug, moduleId, user);
  if (!module) return undefined;
  return module.lessons.find((l) => l.id === lessonId);
}

export function saveCmsCourse(newCourse: Course) {
  if (typeof window === "undefined") return;
  const localData = localStorage.getItem("cms_courses");
  let currentDynamic: Course[] = [];
  if (localData) {
    try { currentDynamic = JSON.parse(localData); } catch (e) { currentDynamic = []; }
  }
  const index = currentDynamic.findIndex((c) => c.slug === newCourse.slug);
  if (index >= 0) { currentDynamic[index] = newCourse; } else { currentDynamic.push(newCourse); }
  localStorage.setItem("cms_courses", JSON.stringify(currentDynamic));
}