"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

/**
 * Incrementa il contatore dei minuti dello studente in modo sicuro lato server
 */
export async function incrementStudentMinutes(userId: string) {
  if (!userId) return { success: false, error: "UserId mancante" };

  // Invochiamo la funzione RPC atomica definita sul database
  const { error } = await supabaseAdmin.rpc("increment_profile_minutes", {
    user_id: userId,
  });

  if (error) {
    console.error("Errore RPC increment_profile_minutes:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}