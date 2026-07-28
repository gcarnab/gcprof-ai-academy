"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

/**
 * Elimina permanentemente un array di sessioni di tracking dal database
 * @param sessionIds Array di stringhe contenente gli ID delle sessioni da rimuovere
 */
export async function deleteSessionsAction(sessionIds: string[]) {
  if (!sessionIds || sessionIds.length === 0) {
    return { success: false, error: "Nessun ID fornito per l'eliminazione." };
  }

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("user_sessions")
      .delete()
      .in("id", sessionIds);

    if (error) {
      logger.error("Errore database durante la rimozione dei log:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (err: any) {
    logger.error("Errore imprevisto nella Server Action tracking:", err);
    return {
      success: false,
      error: err.message || "Errore interno del server.",
    };
  }
}