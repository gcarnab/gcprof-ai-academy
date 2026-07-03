"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function bulkActivateUsersAction(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    return { success: false, error: "Nessun utente selezionato." };
  }

  const supabase = getSupabaseAdmin();

  try {
    // Aggiorna lo stato a 'active' (o il valore che usi per gli utenti abilitati)
    const { error } = await supabase
      .from("profiles")
      .update({ status: "active" })
      .in("id", userIds);

    if (error) throw error;

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Errore attivazione massiva:", err.message);
    return { success: false, error: "Errore durante l'attivazione degli utenti." };
  }
}