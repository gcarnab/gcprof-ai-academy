"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { Course, Module, Lesson } from "../types/course";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Helper interno per generare gli slug in modo coerente e pulito
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Sostituisce spazi e caratteri speciali con un trattino
    .replace(/(^-|-$)/g, ""); // Pulisce eventuali trattini all'inizio o alla fine
}

/* ============================================================================
 * 🛰️ LETTURA CORSI
 * ========================================================================== */
export async function getLiveCourses(): Promise<Course[]> {
  try {
    // 🎯 SCHEMA ALLINEATO: Scarichiamo le relazioni course_classes -> academy_classes (name)
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
        course_classes (
          academy_classes ( name )
        ),
        course_modules (
          id, 
          title, 
          order_index,
          course_lessons (
            id,
            title,
            content_type,
            external_url,
            video_url,
            content,
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

      // Mappiamo i nomi delle classi abilitate a questo specifico corso
      const allowedClassesNames = (dbCourse.course_classes || [])
        .map((cc: any) => cc.academy_classes?.name)
        .filter(Boolean);

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
        allowedClasses: allowedClassesNames,

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

              // Manteniamo la logica attuale
              contentType: les.content_type,

              youtubeUrl:
                les.content_type === "video"
                  ? les.external_url || les.video_url
                  : undefined,

              googleDriveUrl:
                les.content_type === "document" ? les.external_url : undefined,

              // ✅ Nuovi campi necessari ai nuovi renderer
              external_url: les.external_url || "",
              video_url: les.video_url || "",
              content: les.content || "",
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
  const payload: Record<string, any> = {
    title: course.title,
    slug:
      course.slug || (course.title ? generateSlug(course.title) : undefined),
    description: course.description,
    category: course.category,
    difficulty: course.difficulty,
    teacher: course.teacher,
    estimated_hours: course.estimatedHours,
    cover_image: course.coverImage,
    published: course.published,
    // 🛡️ Nota: Non inviamo allowed_classes direttamente sulla tabella courses
    // poiché la gestione ora avviene tramite la pivot autonoma course_classes.
  };

  if (course.id) {
    payload.id = course.id;
  }

  const { data, error } = await supabaseAdmin
    .from("courses")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio corso: ${error.message}`);

  // Se vengono passate delle classi specifiche nell'azione, aggiorna la tabella pivot
  if (course.allowedClasses && data?.id) {
    // 1. Svuota le vecchie relazioni per il corso
    await supabaseAdmin
      .from("course_classes")
      .delete()
      .eq("course_id", data.id);

    if (course.allowedClasses.length > 0) {
      // 2. Prendi gli ID reali delle classi dai nomi passati
      const { data: targetClasses } = await supabaseAdmin
        .from("academy_classes")
        .select("id")
        .in("name", course.allowedClasses);

      if (targetClasses && targetClasses.length > 0) {
        const inserts = targetClasses.map((c) => ({
          course_id: data.id,
          class_id: c.id,
        }));
        await supabaseAdmin.from("course_classes").insert(inserts);
      }
    }
  }

  revalidatePath("/courses");
  return data;
}

// 🎯 Fissato l'argomento accettando string | number per evitare l'errore di build in page.tsx
export async function deleteCourse(courseId: string | number) {
  const { error } = await supabaseAdmin
    .from("courses")
    .delete()
    .eq("id", courseId);

  if (error) {
    throw new Error(
      `Impossibile eliminare il corso: ${error.message}. Assicurati di svuotare prima i suoi moduli e lezioni.`,
    );
  }

  revalidatePath("/courses");
}

/* ============================================================================
 * 📂 CRUD: MODULI (MODULES)
 * ========================================================================== */

export async function upsertModule(
  courseId: string | number,
  mod: { id?: string | number; title: string; orderIndex: number },
) {
  const payload: Record<string, any> = {
    course_id: courseId,
    title: mod.title,
    order_index: mod.orderIndex,
  };

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

export async function deleteModule(moduleId: string | number) {
  const { error } = await supabaseAdmin
    .from("course_modules")
    .delete()
    .eq("id", moduleId);
  if (error) throw new Error(`Errore eliminazione modulo: ${error.message}`);
}

/* ============================================================================
 * 📺 CRUD: LEZIONI (LESSONS)
 * ========================================================================== */

interface UpsertLessonInput {
  id?: string | number;
  title: string;
  contentType: "video" | "document" | "colab" | "markdown" | "sandbox"; // 🎯 Aggiornato con tutti i tipi
  externalUrl: string;
  content?: string; // 📝 Aggiunto per gestire il testo Markdown
  orderIndex: number;
  duration?: number;
}

export async function upsertLesson(
  moduleId: string | number,
  lesson: UpsertLessonInput, // 🎯 Utilizza l'interfaccia aggiornata per eliminare l'errore di build
) {
  const payload: Record<string, any> = {
    module_id: moduleId,
    title: lesson.title.trim(),
    slug: generateSlug(lesson.title),
    content_type: lesson.contentType,
    external_url: lesson.externalUrl,
    content: lesson.content || "", // 🎯 FONDAMENTALE: Salva il testo Markdown/Dati aggiuntivi sul DB
    order_index: lesson.orderIndex,
    duration: lesson.duration || 15,
  };

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

export async function deleteLesson(lessonId: string | number) {
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
  const slug = generateSlug(name);
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
    .eq("name", name);

  if (error) {
    throw new Error(`Errore eliminazione categoria: ${error.message}`);
  }
}

/* ============================================================================
 * 🏫 CRUD: ANAGRAFICA CLASSI (ACADEMY CLASSES)
 * ========================================================================== */

export async function getLiveClasses(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("academy_classes")
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
    .from("academy_classes")
    .insert([{ name: name.trim(), slug: generateSlug(name), description }])
    .select()
    .single();

  if (error) throw new Error(`Errore creazione classe: ${error.message}`);
  return data;
}

export async function upsertSchoolClass(
  id: string | number | null,
  name: string,
  description?: string,
) {
  const payload: Record<string, any> = {
    name: name.trim(),
    slug: generateSlug(name), // 🎯 RISOLTO: Ora valorizza sempre lo slug obbligatorio
    description: description?.trim() || "",
  };

  if (id) {
    payload.id = id;
  }

  const { data, error } = await supabaseAdmin
    .from("academy_classes")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio classe: ${error.message}`);
  return data;
}

export async function deleteSchoolClass(className: string) {
  const { error } = await supabaseAdmin
    .from("academy_classes")
    .delete()
    .eq("name", className);

  if (error) {
    throw new Error(
      `Impossibile eliminare la classe: ${error.message}. Verifica che non ci siano studenti o corsi attivi associati.`,
    );
  }
}

export async function getClassDetails(className: string) {
  const { data, error } = await supabaseAdmin
    .from("academy_classes")
    .select("description")
    .eq("name", className)
    .maybeSingle();

  if (error) return { description: "" };
  return { description: data?.description || "" };
}