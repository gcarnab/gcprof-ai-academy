"use server";

import { supabase, getSupabaseAdmin } from "@/lib/supabase"; // Importiamo i client corretti definiti da te
import { SupabaseCourseRepository } from "../repositories/SupabaseCourseRepository";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { getLiveCourses } from "../services/courseActions";

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
    userId: (payload as any).id || (payload as any).userId || (payload as any).sub,
    role: payload.role,
    studentClass: (payload as any).class || null,
  };
}

/**
 * Recupera l'elenco dei corsi accessibili dall'utente corrente in base alla sua classe
 */
export async function getAvailableCoursesAction() {
  try {
    // 1. Recuperiamo i corsi dal servizio (che ora estrae correttamente i quiz)
    const courses = await getLiveCourses();

    // 2. Rimappiamo i dati per il frontend includendo i quiz mancanti
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
      
      // 🎯 IL PEZZO MANCANTE: Iniettiamo i quiz per completare il tipo Omit<Course, "modules">
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
      error: error.message || "Errore durante il recupero dei corsi disponibili.",
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

    if (session.role !== "admin" && !course.allowedClasses.includes(session.studentClass || "")) {
      return { success: false, error: "Non hai i permessi per accedere ai contenuti di questo corso." };
    }

    return { success: true, data: course };
  } catch (error: any) {
    return { success: false, error: error.message || "Errore nel caricamento dei dettagli del corso." };
  }
}