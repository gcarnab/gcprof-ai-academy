import { AuthUser } from "@/features/auth/core/context/AuthContext";
import { courses as staticCourses } from "../data/courses";
import type { Course, Module, Lesson } from "../types/course";

/* ============================================================================
 * 1. PERSISTENZA IBRIDA & INIZIALIZZAZIONE
 * ========================================================================== */
export function getMergedCourses(): Course[] {
  if (typeof window === "undefined") return staticCourses;

  const localData = localStorage.getItem("cms_courses");
  if (!localData) {
    localStorage.setItem("cms_courses", JSON.stringify(staticCourses));
    return staticCourses;
  }

  try {
    const dynamicCourses = JSON.parse(localData) as Course[];

    // 🎯 Partiamo dai dati del localStorage (modifiche dell'Admin)
    const merged = [...dynamicCourses];

    staticCourses.forEach((sc) => {
      const existsInDynamic = dynamicCourses.some(
        (dc) => dc.id === sc.id || dc.slug === sc.slug,
      );
      if (!existsInDynamic) {
        merged.push(sc);
      }
    });

    return merged;
  } catch (e) {
    return staticCourses;
  }
}

/* ============================================================================
 * 2. HELPER DI CONTROLLO ACCESSO (SICUREZZA LAYER)
 * ========================================================================== */
export function hasCourseAccess(
  course: Course,
  user: AuthUser | null,
): boolean {
  if (!course.published) return user?.role === "admin";

  // 🎯 BLOCCO V2: Se l'utente è in stato pending o blocked, non ha accesso ai corsi riservati
  if (user && user.status !== "active" && user.role !== "admin") {
    return !course.allowedClasses || course.allowedClasses.length === 0;
  }

  // Chiunque (anche anonimo) può vedere la scheda descrittiva pubblica del corso
  if (!user) return true;

  if (user.role === "admin") return true;
  if (!course.allowedClasses || course.allowedClasses.length === 0) return true;

  const userClasses = user.classes || [];
  return course.allowedClasses.some((allowedClass) =>
    userClasses.includes(allowedClass),
  );
}

/* ============================================================================
 * 3. FUNZIONI DI LETTURA E RECUPERO PROTETTO
 * ========================================================================== */

/**
 * Recupera tutti i corsi visibili in base allo stato dell'utente
 */
export function getAllCourses(user: AuthUser | null): Course[] {
  // 🎯 BLOCCO V2: Se l'utente è registrato ma non ancora attivo, vede solo i corsi pubblici
  if (!user || (user.status !== "active" && user.role !== "admin")) {
    return getMergedCourses().filter(
      (course) => !course.allowedClasses || course.allowedClasses.length === 0,
    );
  }

  if (user.role === "admin") {
    return getMergedCourses();
  }

  const userClasses = user.classes || [];

  return getMergedCourses().filter((course) => {
    if (!course.allowedClasses || course.allowedClasses.length === 0) {
      return true;
    }
    return course.allowedClasses.some((allowedClass) =>
      userClasses.includes(allowedClass),
    );
  });
}

/**
 * Recupera un singolo corso tramite lo Slug.
 * 🎯 STABILIZZAZIONE V2: Restituisce sempre il corso se esiste nell'elenco.
 * Il controllo dei permessi sulle lezioni viene demandato alla UI (page.tsx)
 * per evitare di generare falsi errori 404 sulle rotte esistenti.
 */
export function getCourseBySlug(
  slug: string,
  user: AuthUser | null, // Manteniamo il parametro per non rompere i tipi esistenti
): Course | undefined {
  // Cerca il corso nell'array unito (statico + localStorage)
  return getMergedCourses().find((c) => c.slug === slug);
}

/**
 * 🎯 REINTEGRATA: Recupera un modulo protetto (Forza il controllo stato e classi)
 */
export function getModule(
  courseSlug: string,
  moduleId: string,
  user: AuthUser | null,
): Module | undefined {
  const course = getCourseBySlug(courseSlug, user);
  if (!course || !user) return undefined;

  // Blocco immediato se l'utente non è attivo o admin
  if (user.role !== "admin" && user.status !== "active") return undefined;

  if (course.allowedClasses && course.allowedClasses.length > 0) {
    const userClasses = user.classes || [];
    const hasClass = course.allowedClasses.some((ac) => userClasses.includes(ac));
    if (!hasClass) return undefined;
  }

  return course.modules.find((m) => m.id === moduleId);
}

/**
 * 🎯 REINTEGRATA: Recupera una lezione protetta
 */
export function getLesson(
  courseSlug: string,
  moduleId: string,
  lessonId: string,
  user: AuthUser | null,
): Lesson | undefined {
  const module = getModule(courseSlug, moduleId, user);
  if (!module) return undefined;
  return module.lessons.find((l) => l.id === lessonId);
}

/* ============================================================================
 * 4. OPERAZIONI CRUD (CREATE, UPDATE, DELETE)
 * ========================================================================== */
export function saveCmsCourse(updatedCourse: Course) {
  if (typeof window === "undefined") return;
  const currentCourses = getMergedCourses();
  const index = currentCourses.findIndex(
    (c) => c.id === updatedCourse.id || c.slug === updatedCourse.slug,
  );

  if (index >= 0) {
    currentCourses[index] = updatedCourse;
  } else {
    currentCourses.push(updatedCourse);
  }
  localStorage.setItem("cms_courses", JSON.stringify(currentCourses));
}

export function deleteCmsCourse(courseId: number) {
  if (typeof window === "undefined") return;
  const currentCourses = getMergedCourses();
  const filtered = currentCourses.filter((c) => c.id !== courseId);
  localStorage.setItem("cms_courses", JSON.stringify(filtered));
}

/* ============================================================================
 * 5. TRASFORMAZIONE URL EMBED MULTIMEDIALI
 * ========================================================================== */
export function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  let videoId = "";
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(new URL(url).search);
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtube.com/embed/")) {
    return url;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export function getGoogleDriveEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    if (url.includes("docs.google.com")) {
      const baseUrl = url.split("/edit")[0].split("/view")[0];
      return `${baseUrl}/preview`;
    }
    if (url.includes("drive.google.com")) {
      if (url.includes("/file/d/")) {
        const fileId = url.split("/file/d/")[1]?.split("/")[0];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      if (url.includes("id=")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const fileId = urlParams.get("id");
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return url;
  } catch (error) {
    console.error("Errore nella formattazione del link Drive:", error);
    return url;
  }
}