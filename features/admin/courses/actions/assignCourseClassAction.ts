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
    // Gestione mirata dell'errore di duplicazione (codice 23505)
    if (error.code === '23505') {
      const errorContext = (error.message || "").toLowerCase() + (error.details || "").toLowerCase();
      const isPivotConflict = errorContext.includes("course_classes");

      if (isPivotConflict) {
        return { success: false, error: "Questo corso è già stato assegnato a questa classe." };
      }

      // Se il codice è 23505 ma non riguarda la tabella 'course_classes', la colpa è del trigger studenti
      return { 
        success: false, 
        error: `Trappola del Trigger: Uno o più studenti di questa classe sono già iscritti a questo corso individualmente. Il trigger del database va corretto con 'ON CONFLICT DO NOTHING'.` 
      };
    }
    
    console.error("Errore assegnazione corso:", error);
    return { success: false, error: error.message || "Errore durante l'assegnazione." };
  }

  // Ricarica in modo esteso le rotte admin per aggiornare i componenti in tempo reale
  revalidatePath("/admin");
  revalidatePath("/admin/dashboard");
  
  return { success: true };
}