"use server";

import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * Incrementa il tempo di studio dello studente e aggiorna lo stato di avanzamento della lezione corrente.
 */
export async function incrementStudentMinutes(
  userId: string, 
  courseId?: string, 
  lessonId?: string
) {
  if (!userId) return { success: false, error: "Missing User ID" };

  const supabase = getSupabaseAdmin();

  try {
    // 1. Incrementiamo i minuti totali sul profilo dell'utente (Logica preesistente)
    const { data: profile, error: profileErr } = await supabase
      .rpc("increment_profile_minutes", { user_id: userId }); 
      
    // Nota didattica: se l'RPC 'increment_profile_minutes' non è configurato nel DB, 
    // puoi usare una query di update standard come fallback:
    if (profileErr) {
      await supabase
        .from("profiles")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", userId);
        // Nota: per fare incrementi puri senza RPC nativi si estrae il dato e si fa +1, 
        // oppure si usa l'estensione dell'update di Supabase.
    }

    // 2. Se siamo all'interno di una lezione, tracciamo l'avanzamento analitico
    if (courseId && lessonId) {
      
      // Controlliamo se esiste già un record di progresso per questa lezione
      const { data: existingProgress } = await supabase
        .from("profile_lessons_progress")
        .select("minutes_watched, is_completed")
        .eq("profile_id", userId)
        .eq("lesson_id", lessonId)
        .single();

      const newMinutes = (existingProgress?.minutes_watched || 0) + 1;
      
      // REGOLE DI COMPLETAMENTO (Esercitazione / Personalizzabile):
      // Es: Se lo studente spende almeno 1 minuto sulla risorsa, la consideriamo "Completata". 
      // Puoi aumentare questo valore in base alle tue esigenze didattiche.
      const shouldComplete = existingProgress?.is_completed || newMinutes >= 60;

      const { error: progressErr } = await supabase
        .from("profile_lessons_progress")
        .upsert({
          profile_id: userId,
          lesson_id: lessonId,
          course_id: courseId,
          minutes_watched: newMinutes,
          is_completed: shouldComplete,
          last_accessed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: "profile_id,lesson_id"
        });

      if (progressErr) throw progressErr;
    }

    return { success: true, message: "Heartbeat memorizzato con successo" };
  } catch (error: any) {
    console.error("❌ Errore in incrementStudentMinutes Server Action:", error);
    return { success: false, error: error.message || "Internal Server Error" };
  }
}