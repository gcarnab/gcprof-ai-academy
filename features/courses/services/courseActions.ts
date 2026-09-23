"use server";

import { revalidatePath } from "next/cache";
import type { Course, Module, Lesson } from "../types/course";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";

const supabaseAdmin = getSupabaseAdmin();

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

interface CourseUserSession {
  id: string;
  email: string;
  role: "admin" | "student";
}

interface StudentContext {
  userType: string | null;
  track: string | null;
  section: string | null;
  classIds: Set<string>;
}

/**

* Recupera la sessione autenticata dal cookie HttpOnly.
*
* La sessione viene utilizzata esclusivamente server-side per determinare
* quali quiz con restrizione possono essere restituiti alla pagina del corso.
  */
async function getCourseUserSession(): Promise<CourseUserSession | null> {
  try {
    const token = await cookieService.getSession();

    if (!token) {
      return null;
    }

    const payload = (await tokenService.verify(
      token,
    )) as CourseUserSession | null;

    if (!payload?.id || !payload?.role) {
      return null;
    }

    return payload;
  } catch (error) {
    logger.warn(
      "Impossibile recuperare la sessione utente per la visibilità dei quiz:",
      error,
    );

    return null;
  }
}

/**

* Recupera gli ID delle classi alle quali appartiene lo studente.
*
* La tabella profile_classes è la fonte autorevole per l'appartenenza
* dello studente alle classi (ANNO).
  */
async function getStudentClassIds(studentId: string): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("profile_classes")
    .select("class_id")
    .eq("profile_id", studentId);

  if (error) {
    logger.error(
      `Errore recupero classi dello studente ${studentId}:`,
      error.message,
    );
    return [];
  }

  return (data ?? [])
    .map((item: any) => item.class_id)
    .filter(
      (classId: any): classId is string =>
        typeof classId === "string" && classId.length > 0,
    );
}

/**

* Helper interno per generare gli slug in modo coerente e pulito
  */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ============================================================================

* 🛰️ LETTURA CORSI
* ========================================================================== */

/*
export async function getLiveCourses(
role?: "admin" | "student",
): Promise<Course[]> {
try {
// 1. 🟢 QUERY: Recupera i corsi includendo price e is_paid
const { data: coursesData, error: coursesError } = await supabaseAdmin
.from("courses")
.select(`         id,
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
// Recupera i quiz pubblicati e include i campi della tripletta di restrizione
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
        status,
        class_id,
        school_track,
        school_section
      )
    `,
  );

  if (role === "student") {
    quizzesQuery = quizzesQuery.eq("quizzes.status", "active");
  }

  const { data: quizzesData, error: quizzesError } =
    await quizzesQuery;

  if (quizzesError) {
    logger.warn(
      "Errore recupero quiz assegnati:",
      quizzesError.message,
    );
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
        quizId: quizEntity.id,
        quiz_title: quizEntity.title,
        quizTitle: quizEntity.title,
        due_at: assignment.due_at,
        dueAt: assignment.due_at,
        class_id: quizEntity.class_id ?? null,
        classId: quizEntity.class_id ?? null,
        school_track: quizEntity.school_track ?? null,
        schoolTrack: quizEntity.school_track ?? null,
        school_section: quizEntity.school_section ?? null,
        schoolSection: quizEntity.school_section ?? null,

        quiz: {
          id: quizEntity.id,
          title: quizEntity.title,
          status: quizEntity.status,
          class_id: quizEntity.class_id ?? null,
          school_track: quizEntity.school_track ?? null,
          school_section: quizEntity.school_section ?? null,
        },
      });
    });
  }
} catch (quizErr) {
  logger.error(
    "Eccezione durante recupero quiz assegnati:",
    quizErr,
  );
}

// 3. 🗺️ MAPPING FINALE COMBINATO
return coursesData.map((dbCourse: any) => {
  const sortedModules = (dbCourse.course_modules || []).sort(
    (a: any, b: any) => a.order_index - b.order_index,
  );

  const allowedClassesNames = (dbCourse.course_classes || [])
    .map((cc: any) => cc.academy_classes?.name)
    .filter(Boolean);

  const associatedQuizzes = quizzesByCourse[dbCourse.id] || [];

  const numPrice =
    dbCourse.price !== undefined && dbCourse.price !== null
      ? parseFloat(String(dbCourse.price))
      : 0;

  const isPaidCourse = dbCourse.is_paid ?? (numPrice > 0);

  const mappedAssignments = associatedQuizzes.map((qa: any) => ({
    id: qa.id,
    quiz_id: qa.quiz_id,
    quizId: qa.quiz_id,
    quiz_title: qa.quiz_title,
    quizTitle: qa.quiz_title,
    due_at: qa.due_at,
    dueAt: qa.due_at,
    class_id: qa.class_id ?? undefined,
    classId: qa.class_id ?? undefined,
    school_track: qa.school_track ?? undefined,
    schoolTrack: qa.school_track ?? undefined,
    school_section: qa.school_section ?? undefined,
    schoolSection: qa.school_section ?? undefined,
  }));

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
      dbCourse.cover_image ||
      "/courses/gcprof-ai-academy_logo_01.png",
    published: dbCourse.published ?? true,
    allowedClasses: allowedClassesNames,

    price: numPrice,
    is_paid: isPaidCourse,
    isPaid: isPaidCourse,

    quiz_assignments: mappedAssignments,
    quizAssignments: mappedAssignments,

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
          isPreview: moduleIsPreview,
          is_preview: moduleIsPreview,
          youtubeUrl:
            les.content_type === "video"
              ? les.external_url || les.video_url
              : undefined,
          googleDriveUrl:
            les.content_type === "document"
              ? les.external_url
              : undefined,
          external_url: les.external_url || "",
          video_url: les.video_url || "",
          content: les.content || "",
        })),
      };
    }),
  };
});


} catch (err) {
logger.error(
"Eccezione generale durante il fetch dei corsi dal DB:",
err,
);
return [];
}
}
*/

export async function getLiveCourses(
  role?: "admin" | "student",
): Promise<Course[]> {
  try {
    const session = await getCourseUserSession();

    let studentContext: StudentContext | null = null;

    if (session?.role === "student") {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("user_type, school_track, school_section")
        .eq("id", session.id)
        .maybeSingle();

      const userType = profile?.user_type ?? null;
      let classIds = new Set<string>();

      if (userType === "SCHOOL_STUDENT") {
        const ids = await getStudentClassIds(session.id);
        classIds = new Set(ids);
      }

      studentContext = {
        userType,
        track: profile?.school_track ?? null,
        section: profile?.school_section ?? null,
        classIds,
      };
    }

    const { data: coursesData, error: coursesError } = await supabaseAdmin.from(
      "courses",
    ).select(`
    id, title, slug, description, category, difficulty, teacher,
    estimated_hours, cover_image, published, price, is_paid,
    course_classes ( academy_classes ( name ) ),
    course_modules (
      id, title, order_index, is_preview,
      course_lessons (
        id, title, content_type, external_url, video_url, content, order_index, duration
      )
    )
  `);

    if (coursesError || !coursesData) return [];

    const quizzesByCourse: Record<string, any[]> = {};

    try {
      const { data: quizzesData, error: quizzesError } =
        await supabaseAdmin.from("quiz_assignments").select(`
      id, course_id, quiz_id, due_at, is_visible,
      quizzes!inner (
        id, title, status,
        target_user_type,
        class_id, school_track, school_section,
        quiz_class_assignments (
          class_id
        )
      )
    `);

      if (!quizzesError && quizzesData) {
        quizzesData.forEach((assignment: any) => {
          const quizEntity = Array.isArray(assignment.quizzes)
            ? assignment.quizzes[0]
            : assignment.quizzes;

          if (!quizEntity?.id || !quizEntity?.title) return;

          const isVisible = isQuizVisibleToUser(
            {
              status: quizEntity.status,
              target_user_type: quizEntity.target_user_type,
              class_id: quizEntity.class_id,
              school_track: quizEntity.school_track,
              school_section: quizEntity.school_section,
              quiz_class_assignments: quizEntity.quiz_class_assignments ?? [],
            },
            session,
            studentContext,
          );

          if (!isVisible) return;

          if (!quizzesByCourse[assignment.course_id]) {
            quizzesByCourse[assignment.course_id] = [];
          }

          quizzesByCourse[assignment.course_id].push({
            id: assignment.id,
            quiz_id: quizEntity.id,
            quizId: quizEntity.id,
            quiz_title: quizEntity.title,
            quizTitle: quizEntity.title,
            due_at: assignment.due_at,
            dueAt: assignment.due_at,
            is_visible: assignment.is_visible,
            isVisible: assignment.is_visible,
            target_user_type: quizEntity.target_user_type ?? "ALL",
            targetUserType: quizEntity.target_user_type ?? "ALL",
            class_id: quizEntity.class_id ?? null,
            classId: quizEntity.class_id ?? null,
            school_track: quizEntity.school_track ?? null,
            schoolTrack: quizEntity.school_track ?? null,
            school_section: quizEntity.school_section ?? null,
            schoolSection: quizEntity.school_section ?? null,
            quiz: quizEntity,
          });
        });
      }
    } catch (quizErr) {
      logger.error("Eccezione recupero quiz in getLiveCourses:", quizErr);
    }

    return coursesData.map((dbCourse: any) => {
      const sortedModules = (dbCourse.course_modules || []).sort(
        (a: any, b: any) => a.order_index - b.order_index,
      );

      const allowedClassesNames = (dbCourse.course_classes || [])
        .map((cc: any) => cc.academy_classes?.name)
        .filter(Boolean);

      const associatedQuizzes = quizzesByCourse[dbCourse.id] || [];
      const numPrice = dbCourse.price ? parseFloat(String(dbCourse.price)) : 0;
      const isPaidCourse = dbCourse.is_paid ?? numPrice > 0;

      const mappedAssignments = associatedQuizzes.map((qa: any) => ({
        id: qa.id,
        quiz_id: qa.quiz_id,
        quizId: qa.quiz_id,
        quiz_title: qa.quiz_title,
        quizTitle: qa.quiz_title,
        due_at: qa.due_at,
        dueAt: qa.due_at,
        is_visible: qa.is_visible,
        isVisible: qa.is_visible,
        target_user_type: qa.target_user_type ?? "ALL",
        targetUserType: qa.target_user_type ?? "ALL",
        class_id: qa.class_id ?? undefined,
        classId: qa.class_id ?? undefined,
        school_track: qa.school_track ?? undefined,
        schoolTrack: qa.school_track ?? undefined,
        school_section: qa.school_section ?? undefined,
        schoolSection: qa.school_section ?? undefined,
      }));

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
        price: numPrice,
        is_paid: isPaidCourse,
        isPaid: isPaidCourse,
        quiz_assignments: mappedAssignments,
        quizAssignments: mappedAssignments,
        modules: sortedModules.map((mod: any) => ({
          id: mod.id,
          title: mod.title,
          isPreview: Boolean(mod.is_preview),
          is_preview: Boolean(mod.is_preview),
          lessons: (mod.course_lessons || [])
            .sort((a: any, b: any) => a.order_index - b.order_index)
            .map((les: any) => ({
              id: les.id,
              title: les.title,
              duration: les.duration || 15,
              contentType: les.content_type,
              isPreview: Boolean(mod.is_preview),
              is_preview: Boolean(mod.is_preview),
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
        })),
      };
    });
  } catch (err) {
    logger.error("Eccezione generale getLiveCourses:", err);
    return [];
  }
}

/*🎯 Recupera i dettagli completi di un SINGOLO corso*/

export async function getCourseDetails(
  courseIdOrSlug: string,
): Promise<Course | null> {
  try {
    const isUuid =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        courseIdOrSlug,
      );

    let query = supabaseAdmin.from("courses").select(`
    id, title, slug, description, category, difficulty, teacher,
    estimated_hours, cover_image, published, price, is_paid,
    course_classes ( academy_classes ( name ) ),
    course_modules (
      id, title, order_index, is_preview,
      course_lessons (
        id, title, content_type, external_url, video_url, content, order_index, duration
      )
    )
  `);

    query = isUuid
      ? query.eq("id", courseIdOrSlug)
      : query.eq("slug", courseIdOrSlug);

    const { data: dbCourse, error } = await query.single();
    if (error || !dbCourse) return null;

    // Sessione e profilo studente
    const session = await getCourseUserSession();
    let studentContext: StudentContext | null = null;

    if (session?.role === "student") {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("user_type, school_track, school_section")
        .eq("id", session.id)
        .maybeSingle();

      const userType = profile?.user_type ?? null;
      let classIds = new Set<string>();

      if (userType === "SCHOOL_STUDENT") {
        const ids = await getStudentClassIds(session.id);
        classIds = new Set(ids);
      }

      studentContext = {
        userType,
        track: profile?.school_track ?? null,
        section: profile?.school_section ?? null,
        classIds,
      };
    }

    // Recupero e filtraggio quiz del corso
    let visibleQuizAssignments: any[] = [];

    const { data: quizAssignmentsData, error: quizAssignmentsError } =
      await supabaseAdmin
        .from("quiz_assignments")
        .select(
          `
      id, course_id, quiz_id, due_at, is_visible,
      quizzes!inner (
        id, title, status,
        target_user_type,
        class_id, school_track, school_section,
        quiz_class_assignments (
          class_id
        )
      )
    `,
        )
        .eq("course_id", dbCourse.id);

    if (!quizAssignmentsError && quizAssignmentsData) {
      visibleQuizAssignments = quizAssignmentsData.filter((assignment: any) => {
        const quizEntity = Array.isArray(assignment.quizzes)
          ? assignment.quizzes[0]
          : assignment.quizzes;

        if (!quizEntity?.id || !quizEntity?.title) return false;

        return isQuizVisibleToUser(
          {
            status: quizEntity.status,
            target_user_type: quizEntity.target_user_type,
            class_id: quizEntity.class_id,
            school_track: quizEntity.school_track,
            school_section: quizEntity.school_section,
            quiz_class_assignments: quizEntity.quiz_class_assignments ?? [],
          },
          session,
          studentContext,
        );
      });
    }

    const sortedModules = (dbCourse.course_modules || []).sort(
      (a: any, b: any) => a.order_index - b.order_index,
    );

    const allowedClassesNames = (dbCourse.course_classes || [])
      .map((cc: any) => cc.academy_classes?.name)
      .filter(Boolean);

    const numPrice = dbCourse.price ? parseFloat(String(dbCourse.price)) : 0;
    const isPaidCourse = dbCourse.is_paid ?? numPrice > 0;

    const mappedQuizAssignments = visibleQuizAssignments.map(
      (assignment: any) => {
        const quizEntity = Array.isArray(assignment.quizzes)
          ? assignment.quizzes[0]
          : assignment.quizzes;

        return {
          id: assignment.id,
          quiz_id: assignment.quiz_id,
          quizId: assignment.quiz_id,
          quiz_title: quizEntity.title,
          quizTitle: quizEntity.title,
          due_at: assignment.due_at,
          dueAt: assignment.due_at,
          is_visible: assignment.is_visible,
          isVisible: assignment.is_visible,
          target_user_type: quizEntity.target_user_type ?? "ALL",
          targetUserType: quizEntity.target_user_type ?? "ALL",
          class_id: quizEntity.class_id ?? undefined,
          classId: quizEntity.class_id ?? undefined,
          school_track: quizEntity.school_track ?? undefined,
          schoolTrack: quizEntity.school_track ?? undefined,
          school_section: quizEntity.school_section ?? undefined,
          schoolSection: quizEntity.school_section ?? undefined,
        };
      },
    );

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
      price: numPrice,
      is_paid: isPaidCourse,
      isPaid: isPaidCourse,
      quiz_assignments: mappedQuizAssignments,
      quizAssignments: mappedQuizAssignments,
      modules: sortedModules.map((mod: any) => ({
        id: mod.id,
        title: mod.title,
        isPreview: Boolean(mod.is_preview),
        is_preview: Boolean(mod.is_preview),
        lessons: (mod.course_lessons || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((les: any) => ({
            id: les.id,
            title: les.title,
            duration: les.duration || 15,
            contentType: les.content_type,
            isPreview: Boolean(mod.is_preview),
            is_preview: Boolean(mod.is_preview),
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
      })),
    };
  } catch (err) {
    logger.error("Eccezione recupero dettaglio corso:", err);
    return null;
  }
}

/* ============================================================================

* 🟢 CRUD: CORSI (COURSES)
* ========================================================================== */

export async function upsertCourse(
  course: Partial<Course> & Record<string, any>,
) {
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

  if (error) {
    throw new Error(`Errore salvataggio corso: ${error.message}`);
  }

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
  mod: {
    id?: string | number;
    title: string;
    orderIndex: number;
    isPreview?: boolean;
  },
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

  if (error) {
    throw new Error(`Errore salvataggio modulo: ${error.message}`);
  }

  return data;
}

export async function deleteModule(moduleId: string | number) {
  const { error } = await supabaseAdmin
    .from("course_modules")
    .delete()
    .eq("id", moduleId);

  if (error) {
    throw new Error(`Errore eliminazione modulo: ${error.message}`);
  }
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

  if (error) {
    throw new Error(`Errore salvataggio lezione: ${error.message}`);
  }

  return data;
}

export async function deleteLesson(lessonId: string | number) {
  const { error } = await supabaseAdmin
    .from("course_lessons")
    .delete()
    .eq("id", lessonId);

  if (error) {
    throw new Error(`Errore eliminazione lezione: ${error.message}`);
  }
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

  if (error) {
    throw new Error(`Errore creazione categoria: ${error.message}`);
  }

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
    .insert([
      {
        name: name.trim(),
        slug: generateSlug(name),
        description,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Errore creazione classe: ${error.message}`);
  }

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

  if (error) {
    throw new Error(`Errore salvataggio classe: ${error.message}`);
  }

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

  return {
    description: data?.description || "",
  };
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

/**

* Determina se un quiz è visibile all'utente corrente.
*
* Nuovo modello:
*
* EXTERNAL_STUDENT
* -> solo EXTERNAL_STUDENT
*
* SCHOOL_ONLY
* -> solo SCHOOL_STUDENT con almeno una classe assegnata
*
* ALL
* -> EXTERNAL_STUDENT
* -> SCHOOL_STUDENT con almeno una classe assegnata
*
* Per gli studenti scolastici, l'appartenenza viene verificata
* tramite:
*
* profile_classes.profile_id
* 
     +
  
* profile_classes.class_id
*
* contro:
*
* quiz_class_assignments.quiz_id
* quiz_class_assignments.class_id
*
* I campi legacy class_id / school_track / school_section
* vengono mantenuti nel DTO per compatibilità, ma non sono
* più la regola primaria di autorizzazione.
  */
function isQuizVisibleToUser(
  quiz: {
    status: string;
    target_user_type?: string | null;
    class_id?: string | null;
    school_track?: string | null;
    school_section?: string | null;
    quiz_class_assignments?: Array<{
      class_id?: string | null;
    }> | null;
  },
  session: CourseUserSession | null,
  studentContext?: StudentContext | null,
): boolean {
  // 1. Solo gli admin vedono i quiz non attivi.
  if (session?.role !== "admin" && quiz.status !== "active") {
    return false;
  }

  // 2. Admin bypassa tutte le restrizioni.
  if (session?.role === "admin") {
    return true;
  }

  // 3. Senza una sessione studente non è possibile mostrare
  //    un quiz riservato.
  if (session?.role !== "student") {
    return false;
  }

  const targetUserType = String(quiz.target_user_type ?? "ALL").toUpperCase();

  const userType = String(studentContext?.userType ?? "").toUpperCase();

  // 4. Studente esterno.
  //
  // EXTERNAL_STUDENT -> ALLOW
  // ALL              -> ALLOW
  // SCHOOL_ONLY      -> DENY
  if (userType === "EXTERNAL_STUDENT") {
    return targetUserType === "EXTERNAL_STUDENT" || targetUserType === "ALL";
  }

  // 5. Qualsiasi tipo diverso da SCHOOL_STUDENT viene negato.
  if (userType !== "SCHOOL_STUDENT") {
    return false;
  }

  // 6. Un quiz EXTERNAL_STUDENT non è visibile agli studenti scolastici.
  if (targetUserType === "EXTERNAL_STUDENT") {
    return false;
  }

  // 7. Recupera le classi assegnate al quiz.
  const assignedClassIds = (quiz.quiz_class_assignments ?? [])
    .map((assignment) => assignment.class_id)
    .filter(
      (classId): classId is string =>
        typeof classId === "string" && classId.length > 0,
    );

  // 8. Per SCHOOL_ONLY e ALL, zero assegnazioni significa
  //    esplicitamente DENY per gli studenti scolastici.
  if (assignedClassIds.length === 0) {
    return false;
  }

  // 9. N:M: basta una classe comune tra studente e quiz.
  const studentClassIds = studentContext?.classIds ?? new Set<string>();

  return assignedClassIds.some((classId) => studentClassIds.has(classId));
}
