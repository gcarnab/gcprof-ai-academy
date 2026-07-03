/**
 * si occuperà di prelevare in modo sicuro le classi direttamente dal server 
 * (lato build o runtime), senza esporre client nel frontend
 */

"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getClassesAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from("academy_classes")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Errore nel recupero classi:", error);
    return { success: false, data: [] };
  }
}