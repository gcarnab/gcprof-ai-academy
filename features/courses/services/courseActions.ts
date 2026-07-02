"use server";

import { createClient } from "@supabase/supabase-js";
import type { Course } from "../types/course";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Recupera i corsi dal DB in tempo reale (Server Action pura)
 */
export async function getLiveCourses(): Promise<Course[]> {
  try {
    console.log("=== 🛰️ INIZIO QUERY SUPABASE ===");

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
      console.error("❌ ERRORE DA SUPABASE:", error.message);
      return [];
    }

    console.log(
      "📦 DATI GREZZI RICEVUTI DAL DB:",
      JSON.stringify(data, null, 2),
    );

    if (!data || data.length === 0) {
      console.log(
        "⚠️ ATTENZIONE: La tabella 'courses' ha risposto con successo ma è VUOTA (0 record).",
      );
      return [];
    }

    // Mappatura e adattamento dati per la UI
    const mappedData = data.map((dbCourse: any) => {
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
        allowedClasses: dbCourse.allowed_classes || [],
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

    console.log(
      "🚀 DATI ADATTATI PER LA UI:",
      mappedData.length,
      "corsi pronti.",
    );
    return mappedData;
  } catch (err) {
    console.error("💥 ECCEZIONE DURANTE IL FETCH:", err);
    return [];
  }
}
