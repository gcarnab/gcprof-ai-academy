"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { Course, Module, Lesson } from "../types/course";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* ============================================================================
 * 🛰️ LETTURA CORSI (Risolve l'errore dell'esportazione mancante)
 * ========================================================================== */
export async function getLiveCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabaseAdmin.from("courses").select(`
        id, 
        title, 
        slug, 
        description, 
        category, 
        difficulty, 
        teacher, 
        estimated_hours, 
        cover_image, 
        published,
        course_modules (
          id, 
          title, 
          order_index,
          course_lessons (
            id, 
            title, 
            content_type, 
            external_url, 
            order_index, 
            duration
          )
        )
      `);

    if (error) {
      console.error(
        "❌ Errore Supabase nel recupero dei corsi:",
        error.message,
      );
      return [];
    }

    if (!data) return [];

    return data.map((dbCourse: any) => {
      const sortedModules = (dbCourse.course_modules || []).sort(
        (a: any, b: any) => a.order_index - b.order_index,
      );

      return {
        id: dbCourse.id,
        title: dbCourse.title,
        slug: dbCourse.slug || "",
        description: dbCourse.description || "",
        category: dbCourse.category || "Informatica",
        difficulty: dbCourse.difficulty || "Facile",
        teacher: dbCourse.teacher || "Prof. G. Carnabuci",
        estimatedHours: dbCourse.estimated_hours || 0,
        coverImage:
          dbCourse.cover_image || "/courses/gcprof-ai-academy_logo_info_01.png",
        published: dbCourse.published ?? true,
        allowedClasses: [], // Fallback temporaneo per la colonna mancante
        modules: sortedModules.map((mod: any) => {
          const sortedLessons = (mod.course_lessons || []).sort(
            (a: any, b: any) => a.order_index - b.order_index,
          );

          return {
            id: mod.id,
            title: mod.title,
            lessons: sortedLessons.map((les: any) => ({
              id: les.id,
              title: les.title,
              duration: les.duration || 15,
              contentType: les.content_type,
              youtubeUrl:
                les.content_type === "video" ? les.external_url : undefined,
              googleDriveUrl:
                les.content_type === "document" ? les.external_url : undefined,
            })),
          };
        }),
      };
    });
  } catch (err) {
    console.error("💥 Eccezione durante il fetch dei corsi dal DB:", err);
    return [];
  }
}
/* ============================================================================
 * 🟢 CRUD: CORSI (COURSES)
 * ========================================================================== */

export async function upsertCourse(course: Partial<Course>) {
  // Costruiamo il payload di base con i campi mappati sul DB
  const payload: Record<string, any> = {
    title: course.title,
    slug: course.slug,
    description: course.description,
    category: course.category,
    difficulty: course.difficulty,
    teacher: course.teacher,
    estimated_hours: course.estimatedHours,
    cover_image: course.coverImage,
    published: course.published,
    allowed_classes: course.allowedClasses,
  };

  // Se stiamo facendo un UPDATE (l'id esiste), inseriamo l'id nello stesso oggetto
  if (course.id) {
    payload.id = course.id;
  }

  // Passiamo direttamente l'oggetto pulito senza espansioni ternarie inline che confondono il compilatore
  const { data, error } = await supabaseAdmin
    .from("courses")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio corso: ${error.message}`);
  revalidatePath("/courses");
  return data;
}

export async function deleteCourse(courseId: string) {
  // Nota: Se nel DB non hai impostato il "ON DELETE CASCADE", Supabase bloccherà l'azione
  // se ci sono moduli o lezioni collegate. Questo comportamento protegge i tuoi dati!
  const { error } = await supabaseAdmin
    .from("courses")
    .delete()
    .eq("id", courseId);

  if (error) {
    throw new Error(`Impossibile eliminare il corso: ${error.message}. Assicurati di svuotare prima i suoi moduli e lezioni.`);
  }

  revalidatePath("/courses");
}
/* ============================================================================
 * 📂 CRUD: MODULI (MODULES)
 * ========================================================================== */

export async function upsertModule(
  courseId: string,
  mod: { id?: string; title: string; orderIndex: number },
) {
  const payload: Record<string, any> = {
    course_id: courseId,
    title: mod.title,
    order_index: mod.orderIndex,
  };

  // Se è una modifica, iniettiamo l'id nello stesso oggetto senza rompere i tipi
  if (mod.id) {
    payload.id = mod.id;
  }

  const { data, error } = await supabaseAdmin
    .from("course_modules")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio modulo: ${error.message}`);
  return data;
}

export async function deleteModule(moduleId: string) {
  const { error } = await supabaseAdmin
    .from("course_modules")
    .delete()
    .eq("id", moduleId);
  if (error) throw new Error(`Errore eliminazione modulo: ${error.message}`);
}

/* ============================================================================
 * 📺 CRUD: LEZIONI (LESSONS)
 * ========================================================================== */

export async function upsertLesson(moduleId: string, lesson: { 
  id?: string; 
  title: string; 
  contentType: "video" | "document"; 
  externalUrl: string; 
  orderIndex: number;
  duration?: number;
}) {
  // Generiamo lo slug a partire dal titolo per soddisfare il vincolo del DB
  const generatedSlug = lesson.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Sostituisce spazi e caratteri speciali con un trattino
    .replace(/(^-|-$)/g, "");     // Pulisce eventuali trattini all'inizio o alla fine

  const payload: Record<string, any> = {
    module_id: moduleId,
    title: lesson.title.trim(),
    slug: generatedSlug, // 👈 Inserito lo slug obbligatorio
    content_type: lesson.contentType,
    external_url: lesson.externalUrl,
    order_index: lesson.orderIndex,
    duration: lesson.duration || 15,
  };

  // Se è un update, iniettiamo l'id
  if (lesson.id) {
    payload.id = lesson.id;
  }

  const { data, error } = await supabaseAdmin
    .from("course_lessons")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio lezione: ${error.message}`);
  return data;
}

export async function deleteLesson(lessonId: string) {
  const { error } = await supabaseAdmin
    .from("course_lessons")
    .delete()
    .eq("id", lessonId);
  if (error) throw new Error(`Errore eliminazione lezione: ${error.message}`);
}

/* ============================================================================
 * 🏷️ CRUD: ANAGRAFICA CATEGORIE (COURSE CATEGORIES)
 * ========================================================================== */

export async function getLiveCategories(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("course_categories")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Errore recupero categorie:", error.message);
    return [];
  }
  return ["Tutti", ...data.map((c: any) => c.name)];
}

export async function createCategory(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const { data, error } = await supabaseAdmin
    .from("course_categories")
    .insert([{ name, slug }])
    .select()
    .single();

  if (error) throw new Error(`Errore creazione categoria: ${error.message}`);
  return data;
}

export async function deleteCategory(name: string) {
  const { error } = await supabaseAdmin
    .from("course_categories")
    .delete()
    .eq("name", name); // 👈 Filtriamo per nome anziché per ID UUID

  if (error) {
    throw new Error(`Errore eliminazione categoria: ${error.message}`);
  }
}

/* ============================================================================
 * 🏫 CRUD: ANAGRAFICA CLASSI (SCHOOL CLASSES)
 * ========================================================================== */

export async function getLiveClasses(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("school_classes")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Errore recupero classi:", error.message);
    return [];
  }
  return data.map((c: any) => c.name);
}

export async function createSchoolClass(name: string, description?: string) {
  const { data, error } = await supabaseAdmin
    .from("school_classes")
    .insert([{ name, description }])
    .select()
    .single();

  if (error) throw new Error(`Errore creazione classe: ${error.message}`);
  return data;
}

export async function upsertSchoolClass(id: string | null, name: string, description?: string) {
  const payload: Record<string, any> = {
    name: name.trim(),
    description: description?.trim() || "",
  };

  if (id) {
    payload.id = id;
  }

  const { data, error } = await supabaseAdmin
    .from("school_classes")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio classe: ${error.message}`);
  return data;
}


export async function deleteSchoolClass(className: string) {
  const { error } = await supabaseAdmin
    .from("school_classes")
    .delete()
    .eq("name", className);

  if (error) {
    throw new Error(`Impossibile eliminare la classe: ${error.message}. Verifica che non ci siano studenti o corsi attivi associati.`);
  }
}

export async function getClassDetails(className: string) {
  const { data, error } = await supabaseAdmin
    .from("school_classes")
    .select("description")
    .eq("name", className)
    .maybeSingle();

  if (error) return { description: "" };
  return { description: data?.description || "" };
}