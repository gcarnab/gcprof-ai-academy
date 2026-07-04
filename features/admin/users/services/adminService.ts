import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Mancano le chiavi di configurazione per Supabase Admin Service.");
}

// Client privilegiato per bypassare RLS lato server nelle azioni di amministrazione
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export interface AdminUserRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  role: "admin" | "student";
  status: "pending" | "active" | "blocked";
  created_at: string;
  classes: string[]; // Aggregato via codice dalle JOIN
}

/**
 * Recupera la lista di tutti gli utenti con le rispettive classi associate
 */
export async function getAdminUsersList(): Promise<AdminUserRow[]> {
  // 1. Recuperiamo i profili
  const { data: profiles, error: profError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (profError) throw new Error(profError.message);

  // 2. Recuperiamo la giunzione profili-classi con i nomi delle classi
  const { data: relations, error: relError } = await supabaseAdmin
    .from("profile_classes")
    .select(`
      profile_id,
      academy_classes ( name )
    `);

  if (relError) throw new Error(relError.message);

  // 3. Mappiamo e uniamo i dati in una struttura pulita
  return profiles.map((p) => {
    const userClasses = relations
      .filter((r) => r.profile_id === p.id)
      .map((r: any) => r.academy_classes?.name)
      .filter(Boolean);

    return {
      ...p,
      classes: userClasses,
    };
  });
}