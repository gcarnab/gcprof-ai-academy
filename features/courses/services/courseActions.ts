"use server";

import { revalidatePath } from "next/cache";
import type { Course, Module, Lesson } from "../types/course";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const supabaseAdmin = getSupabaseAdmin();

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
export async function getLiveCourses(
  role?: "admin" | "student",
): Promise<Course[]> {
  try {
    // 1. 🟢 QUERY: Recupera i corsi includendo price e is_paid
    const { data: coursesData, error: coursesError } = await supabaseAdmin.from(
      "courses",
    ).select(`
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
        price,
        is_paid,
        course_classes (
          academy_classes ( name )
        ),
        course_modules (
          id, 
          title, 
          order_index,
          is_preview,
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

    if (coursesError) {
      logger.error(
        "Errore Supabase nel recupero dei corsi:",
        coursesError.message,
      );
      return [];
    }

    if (!coursesData) return [];

    // 2. QUIZ
    // Recupera solamente i quiz pubblicati per la visualizzazione studenti
    const quizzesByCourse: Record<string, any[]> = {};

    try {
      let quizzesQuery = supabaseAdmin.from("quiz_assignments").select(
        `
          id,
          course_id,
          quiz_id,
          due_at,
          quizzes!inner (
            id,
            title,
            status
          )
        `,
      );

      if (role === "student") {
        quizzesQuery = quizzesQuery.eq("quizzes.status", "active");
      }
      const { data: quizzesData, error: quizzesError } = await quizzesQuery;

      if (quizzesError) {
        logger.warn("Errore recupero quiz assegnati:", quizzesError.message);
      }

      if (quizzesData) {
        quizzesData.forEach((assignment: any) => {
          const quizEntity = Array.isArray(assignment.quizzes)
            ? assignment.quizzes[0]
            : assignment.quizzes;

          if (!quizEntity?.id || !quizEntity?.title) {
            logger.warn(
              "Assegnazione quiz senza relazione valida:",
              assignment,
            );
            return;
          }

          if (!quizzesByCourse[assignment.course_id]) {
            quizzesByCourse[assignment.course_id] = [];
          }

          quizzesByCourse[assignment.course_id].push({
            id: assignment.id,
            quiz_id: quizEntity.id,
            quiz_title: quizEntity.title,
            due_at: assignment.due_at,

            quiz: {
              id: quizEntity.id,
              title: quizEntity.title,
              status: quizEntity.status,
            },
          });
        });
      }
    } catch (quizErr) {
      logger.error("Eccezione durante recupero quiz assegnati:", quizErr);
    }

    // 3. 🗺️ MAPPING FINALE COMBINATO
    return coursesData.map((dbCourse: any) => {
      const sortedModules = (dbCourse.course_modules || []).sort(
        (a: any, b: any) => a.order_index - b.order_index,
      );

      logger.debug(
        `[COURSES] ${dbCourse.title}: ${sortedModules.filter((m: any) => m.is_preview).length} preview module(s) su ${sortedModules.length}`,
      );

      // Mappiamo i nomi delle classi abilitate a questo specifico corso
      const allowedClassesNames = (dbCourse.course_classes || [])
        .map((cc: any) => cc.academy_classes?.name)
        .filter(Boolean);

      // Recuperiamo i quiz associati a questo ID corso (se presenti)
      const associatedQuizzes = quizzesByCourse[dbCourse.id] || [];

      logger.debug(`[COURSES] Mapping corso "${dbCourse.title}" completato`);

      // ✅ Estrazione e parsing sicuro del prezzo
      const numPrice = dbCourse.price !== undefined && dbCourse.price !== null
        ? parseFloat(String(dbCourse.price))
        : 0;

      const isPaidCourse = dbCourse.is_paid ?? (numPrice > 0);

      return {
        id: dbCourse.id,
        title: dbCourse.title,
        slug: dbCourse.slug || "",
        description: dbCourse.description || "",
        category: dbCourse.category || "Informatica",
        difficulty: dbCourse.difficulty || "Facile",
        teacher:
          dbCourse.teacher ||
          process.env.NEXT_PUBLIC_DEFAULT_TEACHER ||
          "Prof. G. Carnabuci",
        estimatedHours: dbCourse.estimated_hours || 0,
        coverImage:
          dbCourse.cover_image || "/courses/gcprof-ai-academy_logo_01.png",
        published: dbCourse.published ?? true,
        allowedClasses: allowedClassesNames,

        // ✅ Inseriamo i campi prezzo e is_paid nel mapping ritornato
        price: numPrice,
        is_paid: isPaidCourse,
        isPaid: isPaidCourse,

        quiz_assignments: associatedQuizzes.map((qa: any) => ({
          id: qa.id,
          quiz_id: qa.quiz_id,
          quiz_title: qa.quiz_title,
          due_at: qa.due_at,
          quiz: {
            id: qa.quiz_id,
            title: qa.quiz_title,
          },
        })),
        quizAssignments: associatedQuizzes.map((qa: any) => ({
          id: qa.id,
          quizId: qa.quiz_id,
          quizTitle: qa.quiz_title,
          dueAt: qa.due_at,
        })),

        modules: sortedModules.map((mod: any) => {
          const sortedLessons = (mod.course_lessons || []).sort(
            (a: any, b: any) => a.order_index - b.order_index,
          );

          const moduleIsPreview = Boolean(mod.is_preview);

          return {
            id: mod.id,
            title: mod.title,
            isPreview: moduleIsPreview,
            is_preview: moduleIsPreview,
            lessons: sortedLessons.map((les: any) => ({
              id: les.id,
              title: les.title,
              duration: les.duration || 15,
              contentType: les.content_type,
              // Propaghiamo l'anteprima dal modulo padre sia in cammello che con underscore
              isPreview: moduleIsPreview,
              is_preview: moduleIsPreview,
              youtubeUrl:
                les.content_type === "video"
                  ? les.external_url || les.video_url
                  : undefined,
              googleDriveUrl:
                les.content_type === "document" ? les.external_url : undefined,
              external_url: les.external_url || "",
              video_url: les.video_url || "",
              content: les.content || "",
            })),
          };
        }),
      };
    });
  } catch (err) {
    logger.error("Eccezione generale durante il fetch dei corsi dal DB:", err);
    return [];
  }
}

/* ============================================================================
 * 🟢 CRUD: CORSI (COURSES)
 * ========================================================================== */

export async function upsertCourse(course: Partial<Course> & Record<string, any>) {
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
  };

  // ✅ Gestione salvataggio prezzo e flag a pagamento
  if (course.price !== undefined) {
    payload.price = course.price;
  }
  if (course.is_paid !== undefined) {
    payload.is_paid = course.is_paid;
  } else if (course.price !== undefined) {
    payload.is_paid = Number(course.price) > 0;
  }

  if (course.id) {
    payload.id = course.id;
  }

  const { data, error } = await supabaseAdmin
    .from("courses")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(`Errore salvataggio corso: ${error.message}`);

  if (course.allowedClasses && data?.id) {
    await supabaseAdmin
      .from("course_classes")
      .delete()
      .eq("course_id", data.id);

    if (course.allowedClasses.length > 0) {
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
  mod: { id?: string | number; title: string; orderIndex: number; isPreview?: boolean },
) {
  const payload: Record<string, any> = {
    course_id: courseId,
    title: mod.title,
    order_index: mod.orderIndex,
  };

  if (mod.isPreview !== undefined) {
    payload.is_preview = mod.isPreview;
  }

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
  contentType: "video" | "document" | "colab" | "markdown" | "sandbox";
  externalUrl: string;
  content?: string;
  orderIndex: number;
  duration?: number;
}

export async function upsertLesson(
  moduleId: string | number,
  lesson: UpsertLessonInput,
) {
  const payload: Record<string, any> = {
    module_id: moduleId,
    title: lesson.title.trim(),
    slug: generateSlug(lesson.title),
    content_type: lesson.contentType,
    external_url: lesson.externalUrl,
    content: lesson.content || "",
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
    logger.error("Errore recupero categorie:", error.message);
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
    logger.error("Errore recupero classi:", error.message);
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
    slug: generateSlug(name),
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

/**
 * Dissocia un corso da una classe eliminando il record dalla tabella course_classes
 */
export async function dissociateCourseFromClass(
  courseId: string,
  classId: string,
) {
  try {
    const { error } = await supabaseAdmin
      .from("course_classes")
      .delete()
      .eq("course_id", courseId)
      .eq("class_id", classId);

    if (error) {
      logger.error("Errore Supabase:", error.message);
      throw error;
    }

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/courses");

    return { success: true };
  } catch (error) {
    logger.error(
      "Errore Supabase durante la dissociazione corso-classe:",
      error,
    );

    return {
      success: false,
      error: "Impossibile rimuovere l'associazione.",
    };
  }
}

/**
 * Recupera tutte le associazioni attive tra corsi e classi
 */
export async function getCourseClasses() {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("course_classes")
    .select("course_id, class_id");

  if (error) {
    logger.error("Errore getCourseClasses:", error);
    return [];
  }

  return data || [];
}