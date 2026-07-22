"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key-change-me-in-production"
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Verifica se uno studente esterno ha un accesso attivo per un determinato corso.
 */
export async function checkExternalCourseAccessAction(
  courseId: string,
  userId: string
): Promise<boolean> {
  if (!courseId || !userId) return false;

  try {
    const { data, error } = await supabaseAdmin
      .from("profile_courses")
      .select("status")
      .eq("profile_id", userId)
      .eq("course_id", courseId)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      console.error("Errore durante il controllo dell'accesso esterno:", error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("Errore imprevisto nel controllo accesso esterno:", err);
    return false;
  }
}

/**
 * Iscrive gratuitamente l'utente autenticato ad un corso a costo zero (0€).
 */
export async function enrollFreeCourseAction(
  courseId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Sessione non trovata. Effettua il login." };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    if (!userId) {
      return { success: false, error: "Utente non identificato." };
    }

    // Verifica che il corso sia effettivamente gratuito
    const { data: course, error: courseError } = await supabaseAdmin
      .from("courses")
      .select("price")
      .eq("id", courseId)
      .maybeSingle();

    if (courseError || !course) {
      return { success: false, error: "Corso non trovato." };
    }

    const price = Number(course.price || 0);
    if (price > 0) {
      return { success: false, error: "Questo corso richiede un acquisto." };
    }

    // Registra l'iscrizione attiva in profile_courses
    const { error: enrollError } = await supabaseAdmin
      .from("profile_courses")
      .upsert(
        {
          profile_id: userId,
          course_id: courseId,
          status: "active",
          created_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,course_id" }
      );

    if (enrollError) {
      console.error("[ENROLL FREE COURSE ERROR]:", enrollError.message);
      return { success: false, error: "Impossibile completare l'iscrizione." };
    }

    return { success: true };
  } catch (err) {
    console.error("[ENROLL FREE COURSE EXCEPTION]:", err);
    return { success: false, error: "Errore durante l'iscrizione gratuita." };
  }
}