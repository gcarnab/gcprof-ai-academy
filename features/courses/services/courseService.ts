import type { Course, Module, Lesson } from "../types/course";
import { AuthUser } from "@/features/auth/context/AuthContext";

/**
 * Verifica se un utente specifico ha i permessi per accedere a un determinato corso
 */
export function hasCourseAccess(
  course: Course,
  user: AuthUser | null,
): boolean {
  if (!course.published) return user?.role === "admin";

  // 🎯 BLOCCO PENDING: Se l'utente è in attesa di approvazione, non ha mai accesso
  if (user && user.status === "pending" && user.role !== "admin") {
    return false;
  }

  // Se l'utente è bloccato e non è admin, non accede a nulla
  if (user && user.status !== "active" && user.role !== "admin") {
    return false;
  }

  if (!user) return false; // 🎯 MODIFICATO: Gli ospiti non loggati non accedono ai corsi interni
  if (user.role === "admin") return true;

  /*
  const userClasses = user.classes || [];
  return course.allowedClasses.some((allowedClass) =>
    userClasses.includes(allowedClass),
  );

  */

  // STUDENTI ESTERNI
  if (user.userType === "EXTERNAL_STUDENT") {
    const userCourses = user.enrolledCourses || [];

    return userCourses.includes(course.id);
  }

  // STUDENTI SCUOLA
  const userClasses = user.classes || [];

  return course.allowedClasses.some((allowedClass) =>
    userClasses.includes(allowedClass),
  );
}

/**
 * Filtra un array di corsi passati in base ai privilegi dell'utente (utilizzato nel catalogo)
 */
export function filterCoursesByUser(
  courses: Course[],
  user: AuthUser | null,
): Course[] {
  if (user && user.status === "pending" && user.role !== "admin") {
    return [];
  }

  if (!user || (user.status !== "active" && user.role !== "admin")) {
    return []; // Ospiti o utenti non attivi non vedono corsi protetti
  }

  if (user.role === "admin") return courses;

  // 🎯 MODIFICATO: Filtro stringente sulle classi associate al corso
  const userClasses = user.classes || [];
  return courses.filter((course) => {
    return course.allowedClasses.some((allowedClass) =>
      userClasses.includes(allowedClass),
    );
  });
}

/**
 * Recupera un modulo specifico all'interno di un corso, verificando i permessi di visualizzazione
 */
export function getModuleFromCourse(
  course: Course | undefined,
  moduleId: string,
  user: AuthUser | null,
): Module | undefined {
  if (!course || !user) return undefined;
  if (user.role !== "admin" && user.status !== "active") return undefined;

  const userClasses = user.classes || [];
  const hasClass = course.allowedClasses.some((ac) => userClasses.includes(ac));

  if (user.role !== "admin" && !hasClass) return undefined;

  return course.modules.find((m) => m.id === moduleId);
}

/**
 * Recupera una lezione specifica all'interno di un modulo, verificando i permessi di visualizzazione
 */
export function getLessonFromCourse(
  course: Course | undefined,
  moduleId: string,
  lessonId: string,
  user: AuthUser | null,
): Lesson | undefined {
  const module = getModuleFromCourse(course, moduleId, user);
  if (!module) return undefined;
  return module.lessons.find((l) => l.id === lessonId);
}

/**
 * Trasforma un normale link di condivisione YouTube nell'URL corretto per il tag iframe embed
 */
export function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  let videoId = "";
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(new URL(url).search);
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtube.com/embed/")) return url;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

/**
 * Trasforma un link di Google Drive (Documento, PDF, Presentazione) nel formato compatibile con l'embed/preview
 */
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
