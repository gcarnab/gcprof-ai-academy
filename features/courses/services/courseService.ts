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
    
    // 🎯 STRATEGIA CORRETTA: Partiamo dai dati del localStorage (che contengono le ultime modifiche dell'Admin)
    // e aggiungiamo dal file statico solo i corsi che l'utente non ha ancora toccato o modificato nel browser.
    const merged = [...dynamicCourses];
    
    staticCourses.forEach((sc) => {
      const existsInDynamic = dynamicCourses.some((dc) => dc.id === sc.id || dc.slug === sc.slug);
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
  user: AuthUser | null, // 🎯 FIX: Aggiornato da SessionUser a AuthUser
): boolean {
  if (!course.published) return user?.role === "admin";

  // Chiunque può vedere la scheda descrittiva pubblica del corso
  if (!user) return true;

  if (user.role === "admin") return true;
  if (!course.allowedClasses || course.allowedClasses.length === 0) return true;

  // 🎯 FIX: Usiamo direttamente l'array 'classes' della V2 senza split
  const userClasses = user.classes || [];
  return course.allowedClasses.some((allowedClass) =>
    userClasses.includes(allowedClass),
  );
}

/* ============================================================================
 * 3. FUNZIONI DI LETTURA RIPRISTINATE (Risolve il Build Error)
 * ========================================================================== */

/**
 * 🎯 FIX: Recupera tutti i corsi filtrati in base ai permessi dell'utente loggato.
 */
export function getAllCourses(user: AuthUser | null): Course[] {
  // Se non c'è un utente loggato, puoi decidere se mostrare solo i corsi pubblici o nessuno
  if (!user) {
    return staticCourses.filter(course => !course.allowedClasses || course.allowedClasses.length === 0);
  }

  // Se l'utente è un admin, ha accesso incondizionato a tutti i corsi
  if (user.role === "admin") {
    return staticCourses;
  }

  // Se è uno studente, filtriamo i corsi in base al nuovo array 'classes' della V2
  const userClasses = user.classes || [];
  
  return staticCourses.filter((course) => {
    // Se il corso non ha restrizioni, è accessibile a tutti
    if (!course.allowedClasses || course.allowedClasses.length === 0) {
      return true;
    }
    // Verifica se almeno una delle classi dell'utente è autorizzata per questo corso
    return course.allowedClasses.some((allowedClass) => userClasses.includes(allowedClass));
  });
}

// Recupera un singolo corso tramite lo Slug
export function getCourseBySlug(
  slug: string,
  user: AuthUser | null,
): Course | undefined {
  return getMergedCourses().find((c) => c.slug === slug);
}

// Recupera un modulo protetto (Forza login e controllo classe per gli studenti)
export function getModule(
  courseSlug: string,
  moduleId: string,
  user: AuthUser | null,
): Module | undefined {
  const course = getCourseBySlug(courseSlug, user);
  if (!course || !user) return undefined;

  if (
    user.role !== "admin" &&
    course.allowedClasses &&
    course.allowedClasses.length > 0
  ) {
    // 🎯 FIX: Allineato all'array 'classes' nativo della V2
    const userClasses = user.classes || [];
    const hasClass = course.allowedClasses.some((ac) =>
      userClasses.includes(ac),
    );
    if (!hasClass) return undefined;
  }

  return course.modules.find((m) => m.id === moduleId);
}

// Recupera una lezione protetta
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

// Salva o aggiorna un corso nel localStorage
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

// Elimina un corso dal localStorage
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

/**
 * Converte un link standard di Google Drive / Google Docs nel formato adatto all'embedding in iframe
 */
export function getGoogleDriveEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    // Gestione specifica per i Google Docs / Fogli / Presentazioni
    if (url.includes("docs.google.com")) {
      // Rimuove la parte finale (/edit...) e la sostituisce con /preview
      const baseUrl = url.split("/edit")[0].split("/view")[0];
      return `${baseUrl}/preview`;
    }

    // Gestione per file generici caricati su Google Drive (es. PDF, Immagini)
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