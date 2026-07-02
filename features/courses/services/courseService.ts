import type { Course, Module, Lesson } from "../types/course";
import { AuthUser } from "@/features/auth/core/context/AuthContext";

/**
 * Verifica se un utente specifico ha i permessi per accedere a un determinato corso
 */
export function hasCourseAccess(
  course: Course,
  user: AuthUser | null,
): boolean {
  if (!course.published) return user?.role === "admin";

  // 🎯 BLOCCO PENDING: Se l'utente è in attesa di approvazione, non ha mai accesso a nessun corso
  if (user && user.status === "pending" && user.role !== "admin") {
    return false;
  }

  // Se l'utente non è attivo (es. bloccato) e non è admin, può vedere solo i corsi liberi
  if (user && user.status !== "active" && user.role !== "admin") {
    return !course.allowedClasses || course.allowedClasses.length === 0;
  }
  
  if (!user) return true; // Gestione ospiti (se applicabile sul catalogo)
  if (user.role === "admin") return true;
  if (!course.allowedClasses || course.allowedClasses.length === 0) return true;

  const userClasses = user.classes || [];
  return course.allowedClasses.some((allowedClass) =>
    userClasses.includes(allowedClass),
  );
}

/**
 * Filtra un array di corsi passati in base ai privilegi dell'utente (utilizzabile negli hook client)
 */
export function filterCoursesByUser(courses: Course[], user: AuthUser | null): Course[] {
  // 🎯 BLOCCO PENDING: Se l'utente è pending, non estrae nessun corso
  if (user && user.status === "pending" && user.role !== "admin") {
    return [];
  }

  if (!user || (user.status !== "active" && user.role !== "admin")) {
    return courses.filter(
      (course) => !course.allowedClasses || course.allowedClasses.length === 0,
    );
  }
  
  if (user.role === "admin") return courses;
  
  const userClasses = user.classes || [];
  return courses.filter((course) => {
    if (!course.allowedClasses || course.allowedClasses.length === 0) return true;
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

  if (course.allowedClasses && course.allowedClasses.length > 0) {
    const userClasses = user.classes || [];
    const hasClass = course.allowedClasses.some((ac) =>
      userClasses.includes(ac),
    );
    if (!hasClass) return undefined;
  }
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