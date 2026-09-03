"use server";

import { logger } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface AssignQuizPayload {
  quizId: string;
  courseId: string;
  moduleId?: string | null; // 👈 Aggiunto supporto al modulo
  dueDate: string | null;
  isVisible: boolean;
}

export async function assignQuizAction(payload: AssignQuizPayload) {
  const supabase = getSupabaseAdmin();

  logger.info("👉 DATI RICEVUTI DALLA SERVER ACTION:", payload);

  // 1. Aggiorna direttamente la tabella `quizzes` (Essenziale per i Certificati)
  const { error: quizError } = await supabase
    .from("quizzes")
    .update({
      course_id: payload.courseId,
      module_id: payload.moduleId || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.quizId);

  if (quizError) {
    logger.error("❌ Errore DB durante l'aggiornamento del quiz:", quizError.message);
    return { success: false, error: quizError.message };
  }

  // 2. Salva o aggiorna i metadati di assegnazione (Scadenza e Visibilità)
  const { error: assignmentError } = await supabase.from("quiz_assignments").upsert(
    {
      quiz_id: payload.quizId,
      course_id: payload.courseId,
      due_at: payload.dueDate ? new Date(payload.dueDate).toISOString() : null,
      is_visible: payload.isVisible,
    },
    { onConflict: "quiz_id,course_id" },
  );

  if (assignmentError) {
    logger.error("❌ Errore DB durante quiz_assignments:", assignmentError.message);
    return { success: false, error: assignmentError.message };
  }

  // Forza il refresh delle cache Next.js
  revalidatePath(`/admin/quiz/${payload.quizId}/analytics`);
  revalidatePath("/admin/quiz", "layout");
  revalidatePath("/admin/dashboard", "layout");

  return { success: true };
}

/**
 * Server Action per recuperare i moduli appartenenti a un corso
 */
export async function getCourseModulesAction(courseId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("course_modules")
    .select("id, title")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (error) {
    logger.error(`❌ Errore caricamento moduli per corso ${courseId}:`, error.message);
    return { success: false, modules: [] };
  }

  return { success: true, modules: data ?? [] };
}