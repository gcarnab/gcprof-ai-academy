"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function assignCourseClassAction(formData: FormData) {
  const courseId = formData.get("course_id") as string;
  const classId = formData.get("class_id") as string;

  if (!courseId || !classId) {
    return { success: false, error: "Seleziona sia un corso che una classe." };
  }

  const supabase = getSupabaseAdmin();

  // Inseriamo l'associazione. Questo INSERT farà scattare il TRIGGER
  // che iscriverà automaticamente gli studenti abilitati della classe.
  const { error } = await supabase
    .from("course_classes")
    .insert([{ course_id: courseId, class_id: classId }]);

  if (error) {
    // Gestione errore chiave duplicata (se l'associazione esiste già)
    if (error.code === '23505') {
      return { success: false, error: "Questo corso è già stato assegnato a questa classe." };
    }
    console.error("Errore assegnazione corso:", error);
    return { success: false, error: "Errore durante l'assegnazione." };
  }

  // Ricarica la dashboard per aggiornare eventuali dati
  revalidatePath("/admin/dashboard");
  return { success: true };
}