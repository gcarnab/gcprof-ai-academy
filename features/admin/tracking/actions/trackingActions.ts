"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Elimina permanentemente un array di sessioni di tracking dal database
 * @param sessionIds Array di stringhe contenente gli ID delle sessioni da rimuovere
 */
export async function deleteSessionsAction(sessionIds: string[]) {
  if (!sessionIds || sessionIds.length === 0) {
    return { success: false, error: "Nessun ID fornito per l'eliminazione." };
  }

  // Inizializzazione corretta passando URL e Service Role Key (o Anon Key se non usi RLS sui log)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Oppure NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // Esegue il DELETE di massa usando l'operatore .in()
    const { error } = await supabase
      .from("user_sessions") 
      .delete()
      .in("id", sessionIds);

    if (error) {
      console.error("Errore database durante la rimozione dei log:", error.message);
      return { success: false, error: error.message };
    }

    // Forza Next.js a rigenerare i dati della dashboard senza fare reload della pagina
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (err: any) {
    console.error("Errore imprevisto nella Server Action tracking:", err);
    return { success: false, error: err.message || "Errore interno del server." };
  }
}