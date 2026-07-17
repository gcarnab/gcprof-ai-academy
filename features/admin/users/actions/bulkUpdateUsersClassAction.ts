"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Utilizziamo il service role per bypassare le RLS lato admin
const supabaseAdmin = createClient(supabaseUrl!, serviceRoleKey!);

export async function bulkUpdateUsersClassAction(userIds: string[], targetClassName: string) {
  if (!userIds || userIds.length === 0 || !targetClassName) {
    return { success: false, error: "Dati insufficienti per l'aggiornamento massivo." };
  }

  try {
    // 1. Troviamo l'ID della classe richiesta partendo dal nome (academy_classes)
    const { data: targetClass, error: classError } = await supabaseAdmin
      .from("academy_classes")
      .select("id")
      .eq("name", targetClassName)
      .single();

    if (classError || !targetClass) {
      throw new Error(`Classe '${targetClassName}' non trovata nel database.`);
    }

    // 2. Rimuoviamo eventuali assegnazioni precedenti per questi utenti (Spostamento totale)
    const { error: deleteError } = await supabaseAdmin
      .from("profile_classes")
      .delete()
      .in("profile_id", userIds);

    if (deleteError) throw deleteError;

    // 3. Creiamo le nuove relazioni
    const relationsToInsert = userIds.map((profileId) => ({
      profile_id: profileId,
      class_id: targetClass.id,
    }));

    const { error: insertError } = await supabaseAdmin
      .from("profile_classes")
      .insert(relationsToInsert);

    if (insertError) throw insertError;

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Errore bulk class update:", error);
    return { success: false, error: error.message || "Errore interno del server." };
  }
}