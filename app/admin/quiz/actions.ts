"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface AssignQuizPayload {
  quizId: string;
  courseId: string;
  dueDate: string | null;
  isVisible: boolean;
}

export async function assignQuizAction(payload: AssignQuizPayload) {
  const supabase = getSupabaseAdmin();

  console.log("👉 DATI RICEVUTI DALLA SERVER ACTION:", payload);

  // Prepariamo il salvataggio formattando correttamente la data ISO se presente
  const { error } = await supabase.from("quiz_assignments").upsert(
    {
      quiz_id: payload.quizId,
      course_id: payload.courseId,
      due_at: payload.dueDate ? new Date(payload.dueDate).toISOString() : null,
      is_visible: payload.isVisible,
    },
    { onConflict: "quiz_id,course_id" },
  );

  if (error) {
    console.error("❌ Errore DB durante l'assegnazione:", error.message);
    return { success: false, error: error.message };
  }

  // Forza Next.js a rigenerare la pagina di analytics aggiornando lo stato
  revalidatePath(`/admin/quiz/${payload.quizId}/analytics`);
  return { success: true };
}
