/**
 * Questo file conterrà le funzioni per leggere le classi disponibili 
 * e per salvare il corso con le relative associazioni. Usiamo sempre 
 * il client amministrativo per garantire la massima stabilità operativa.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Mancano le chiavi di configurazione per Supabase Admin Service.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export interface AdminClassOption {
  id: string;
  name: string;
}

/**
 * Recupera la lista delle classi disponibili per popolare le checkbox del form
 */
export async function getAvailableClassesForCourses(): Promise<AdminClassOption[]> {
  const { data, error } = await supabaseAdmin
    .from("academy_classes")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}