"use server";

import { revalidatePath } from "next/cache";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";
import { SupabaseCourseRepository } from "../repositories/SupabaseCourseRepository";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { getLiveCourses } from "../services/courseActions";
import { logger } from "@/lib/logger";

export interface CompleteLessonParams {
  courseId: string;
  moduleId?: string;
  lessonId: string;
  moduleCode?: string; // Es. "M0", "M1", ..., "M17"
  allLessonIdsInModule?: string[]; // Lista di tutti gli ID delle lezioni del modulo
}

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

/**
 * Helper interno per recuperare la sessione e decodificare il ruolo/classe dell'utente
 */
async function getUserSessionData() {
  const token = await cookieService.getSession();
  if (!token) return null;

  const payload = await tokenService.verify(token);
  if (!payload) return null;

  return {
    userId:
      (payload as any).id || (payload as any).userId || (payload as any).sub,
    role: payload.role,
    studentClass: (payload as any).class || null,
  };
}

/**
 * Recupera l'elenco dei corsi accessibili dall'utente corrente in base alla sua classe
 */
export async function getAvailableCoursesAction() {
  try {
    const courses = await getLiveCourses();

    const mappedCourses = courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      teacher: course.teacher,
      estimatedHours: course.estimatedHours,
      coverImage: course.coverImage,
      published: course.published,
      allowedClasses: course.allowedClasses,
      quizAssignments: course.quizAssignments || [],
      quiz_assignments: course.quizAssignments || [],
    }));

    return {
      success: true,
      data: mappedCourses,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.message || "Errore durante il recupero dei corsi disponibili.",
    };
  }
}

/**
 * Recupera un singolo corso completo di moduli e lezioni tramite il suo slug
 */
export async function getCourseDetailAction(slug: string) {
  try {
    const session = await getUserSessionData();
    if (!session) {
      return { success: false, error: "Sessione scaduta o non valida." };
    }

    const courseRepository = new SupabaseCourseRepository(supabase);

    const course = await courseRepository.getBySlug(slug);
    if (!course) {
      return { success: false, error: "Corso non trovato." };
    }

    if (
      session.role !== "admin" &&
      !course.allowedClasses.includes(session.studentClass || "")
    ) {
      return {
        success: false,
        error: "Non hai i permessi per accedere ai contenuti di questo corso.",
      };
    }

    return { success: true, data: course };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Errore nel caricamento dei dettagli del corso.",
    };
  }
}

/**
 * Action di test avanzata: aumenta XP, aggiorna Livello e sblocca Badge di prova!
 */
export async function testAddXpAction(amount: number = 50) {
  try {
    const session = await getUserSessionData();
    if (!session) {
      return { success: false, error: "Non sei autenticato." };
    }

    const adminSupabase = getSupabaseAdmin();

    // 1. Legge profilo attuale
    const { data: profile, error: fetchErr } = await adminSupabase
      .from("profiles")
      .select("total_xp, current_level")
      .eq("id", session.userId)
      .single();

    if (fetchErr) throw fetchErr;

    const currentXp = profile?.total_xp || 0;
    const oldLevel = profile?.current_level || 1;
    const newXp = currentXp + amount;
    const newLevel = Math.floor(newXp / 100) + 1;
    const leveledUp = newLevel > oldLevel;

    // 2. Aggiorna XP e Livello
    const { error: updateErr } = await adminSupabase
      .from("profiles")
      .update({ total_xp: newXp, current_level: newLevel })
      .eq("id", session.userId);

    if (updateErr) throw updateErr;

    // 3. Cerca il badge da assegnare in base al codice
    const targetCode = newLevel >= 2 ? "level_2" : "first_step";

    const { data: badgeData, error: badgeFetchErr } = await adminSupabase
      .from("badges")
      .select("id, title, code")
      .eq("code", targetCode)
      .single();

    if (badgeFetchErr || !badgeData) {
      revalidatePath("/dashboard");
      return {
        success: true,
        addedXp: amount,
        totalXp: newXp,
        currentLevel: newLevel,
        leveledUp,
        badgeWarning: `XP aggiornati! Ma il badge con code '${targetCode}' non esiste nel DB.`,
      };
    }

    // 4. Inserisce il badge in user_badges con la colonna corretta awarded_at
    const { error: insertErr } = await adminSupabase.from("user_badges").upsert(
      {
        profile_id: session.userId,
        badge_id: badgeData.id,
        awarded_at: new Date().toISOString(),
      },
      { onConflict: "profile_id, badge_id" },
    );

    let badgeStatusMsg = `🎉 Sbloccato Badge: "${badgeData.title}"`;
    if (insertErr) {
      badgeStatusMsg = `Badge non inserito: ${insertErr.message}`;
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      addedXp: amount,
      totalXp: newXp,
      currentLevel: newLevel,
      leveledUp,
      badgeInfo: badgeStatusMsg,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Errore durante il test XP.",
    };
  }
}

/**
 * Completa una lezione per l'utente loggato, assegna gli XP e controlla lo sblocco Badge di Modulo (M0-M17).
 * Restituisce i dettagli completi per attivare modali o toast di congratulazioni nel frontend.
 */
export async function completeLessonAction(
  input: string | CompleteLessonParams,
  courseIdArg?: string,
  moduleIdArg?: string,
  moduleCodeArg?: string,
  allLessonIdsInModuleArg?: string[],
) {
  try {
    // Normalizzazione dei parametri per retrocompatibilità
    let lessonId: string;
    let courseId: string;
    let moduleId: string | undefined;
    let moduleCode: string | undefined;
    let allLessonIdsInModule: string[] | undefined;

    if (typeof input === "object" && input !== null) {
      lessonId = input.lessonId;
      courseId = input.courseId;
      moduleId = input.moduleId;
      moduleCode = input.moduleCode;
      allLessonIdsInModule = input.allLessonIdsInModule;
    } else {
      lessonId = input;
      courseId = courseIdArg || "";
      moduleId = moduleIdArg;
      moduleCode = moduleCodeArg;
      allLessonIdsInModule = allLessonIdsInModuleArg;
    }

    logger.info(
      `📥 [completeLesson] Ricevuto modulo: ${moduleCode}, Lezioni da completare: ${allLessonIdsInModule?.length}`,
    );

    // 1. Recupera la sessione utente
    const session = await getUserSessionData();
    if (!session) {
      return {
        success: false,
        error: "Sessione non valida o utente non autenticato.",
      };
    }

    const userId = session.userId;
    const adminSupabase = getSupabaseAdmin();

    // 2. Controllo idempotenza
    const { data: existingProgress } = await adminSupabase
      .from("profile_lessons_progress")
      .select("is_completed")
      .eq("profile_id", userId)
      .eq("lesson_id", lessonId)
      .single();

    const isFirstTime = !existingProgress?.is_completed;

    // 3. Registra/Aggiorna il completamento
    const { error: progressError } = await adminSupabase
      .from("profile_lessons_progress")
      .upsert(
        {
          profile_id: userId,
          lesson_id: lessonId,
          course_id: courseId,
          is_completed: true,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: "profile_id, lesson_id" },
      );

    if (progressError) throw progressError;

    // 4. Assegnazione XP Lezione
    const XP_PER_LESSON = 50;
    let updatedXp = 0;
    let updatedLevel = 1;
    let leveledUp = false;

    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("total_xp, current_level")
      .eq("id", userId)
      .single();

    const currentXp = profile?.total_xp || 0;
    const oldLevel = profile?.current_level || 1;

    if (isFirstTime) {
      updatedXp = currentXp + XP_PER_LESSON;
      updatedLevel = Math.floor(updatedXp / 100) + 1;
      leveledUp = updatedLevel > oldLevel;

      await adminSupabase
        .from("profiles")
        .update({ total_xp: updatedXp, current_level: updatedLevel })
        .eq("id", userId);
    } else {
      updatedXp = currentXp;
      updatedLevel = oldLevel;
    }

    let unlockedBadgeObject: {
      id: string;
      title: string;
      description?: string | null;
      iconUrl?: string | null;
      xpReward?: number;
    } | null = null;

    let isModuleComplete = false;

    // 5. CONTROLLO SBLOCCO BADGE MODULO
    if (moduleCode && allLessonIdsInModule && allLessonIdsInModule.length > 0) {
      const { data: completedLessons } = await adminSupabase
        .from("profile_lessons_progress")
        .select("lesson_id")
        .eq("profile_id", userId)
        .eq("course_id", courseId)
        .eq("is_completed", true);

      const completedSet = new Set(
        (completedLessons || []).map((p) => String(p.lesson_id)),
      );

      isModuleComplete = allLessonIdsInModule.every((id) =>
        completedSet.has(String(id)),
      );

      logger.info(
        `🔍 [completeLesson] Stato modulo ${moduleCode}: completate ${completedSet.size} lezioni (Serve averne fatte ${allLessonIdsInModule.length}). Modulo completo? ${isModuleComplete}`,
      );

      if (isModuleComplete) {
        const { data: badgeData, error: badgeFetchError } = await adminSupabase
          .from("badges")
          .select("id, title, description, icon_url, icon, xp_reward")
          .eq("code", moduleCode)
          .single();

        if (badgeFetchError || !badgeData) {
          logger.warn(
            `⚠️ [completeLesson] Modulo completo, ma il badge con code '${moduleCode}' NON ESISTE nel database badges!`,
          );
        }

        if (badgeData) {
          const { error: badgeInsertErr } = await adminSupabase
            .from("user_badges")
            .upsert(
              {
                profile_id: userId,
                badge_id: badgeData.id,
                awarded_at: new Date().toISOString(),
              },
              { onConflict: "profile_id, badge_id" },
            );

          if (badgeInsertErr) {
            logger.error(
              `❌ [completeLesson] ERRORE GRAVE DURANTE L'INSERIMENTO DEL BADGE IN user_badges:`,
              badgeInsertErr,
            );
          } else {
            logger.info(
              `✅ [completeLesson] Badge '${badgeData.title}' assegnato con successo all'utente!`,
            );

            unlockedBadgeObject = {
              id: badgeData.id,
              title: badgeData.title,
              description: badgeData.description || null,
              iconUrl: badgeData.icon_url || badgeData.icon || null,
              xpReward: badgeData.xp_reward || 0,
            };

            if (badgeData.xp_reward && badgeData.xp_reward > 0) {
              updatedXp += badgeData.xp_reward;
              const levelWithBonus = Math.floor(updatedXp / 100) + 1;
              if (levelWithBonus > updatedLevel) {
                updatedLevel = levelWithBonus;
                leveledUp = true;
              }

              await adminSupabase
                .from("profiles")
                .update({ total_xp: updatedXp, current_level: updatedLevel })
                .eq("id", userId);

              logger.info(
                `🎁 [completeLesson] Aggiunti ${badgeData.xp_reward} XP bonus per il completamento modulo.`,
              );
            }
          }
        }
      }
    } else {
      logger.warn(
        "⚠️ [completeLesson] Attenzione: moduleCode o allLessonIdsInModule non sono stati passati correttamente dal frontend.",
      );
    }

    // Revalidate della dashboard e della sezione corsi
    revalidatePath("/dashboard");
    revalidatePath("/courses");

    return {
      success: true,
      alreadyCompleted: !isFirstTime,
      xpGained: isFirstTime ? XP_PER_LESSON : 0,
      totalXp: updatedXp,
      level: updatedLevel,
      leveledUp,
      isModuleComplete,
      unlockedBadgeTitle: unlockedBadgeObject?.title || null, // Per retrocompatibilità
      unlockedBadge: unlockedBadgeObject, // Dati estesi per il Modal
    };
  } catch (error: any) {
    logger.error("❌ [completeLesson] Errore critico:", error);
    return {
      success: false,
      error: error.message || "Errore durante il completamento della lezione.",
    };
  }
}
