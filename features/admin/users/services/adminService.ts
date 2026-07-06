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
  email: string | null; // 🆕 Esplicitato per la visualizzazione e l'invio delle email
  role: "admin" | "student";
  status: "pending" | "active" | "blocked";
  created_at: string;
  total_minutes_active: number; // 🆕 Sincronizzato con lo schema DB per le statistiche
  classes: string[]; // Aggregato via codice dalle JOIN
}

export interface PaginatedUsersResponse {
  users: AdminUserRow[];
  totalCount: number;
}

export interface UserFilterParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  statusFilter?: string; // "all", "active", "pending", "blocked"
  classFilter?: string;  // Nome della classe o "all"
}

/**
 * 🆕 Recupera la lista paginata e filtrata degli utenti DIRETTAMENTE lato database (Scalabilità Enterprise)
 */
export async function getAdminUsersPaginated({
  page,
  pageSize,
  searchTerm,
  statusFilter,
  classFilter,
}: UserFilterParams): Promise<PaginatedUsersResponse> {
  
  // Calcolo dei range per la paginazione nativa di Postgres (0-based)
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Se c'è un filtro per classe, usiamo "!inner" per forzare Postgres a scartare i profili non associati
  const isClassFiltered = classFilter && classFilter !== "all";
  const relationSelect = isClassFiltered
    ? "profile_classes!inner(academy_classes!inner(name))"
    : "profile_classes(academy_classes(name))";

  // costruiamo la query base con il conteggio esatto dei record filtrati
  let query = supabaseAdmin
    .from("profiles")
    .select(`
      id,
      first_name,
      last_name,
      display_name,
      email,
      role,
      status,
      created_at,
      total_minutes_active,
      ${relationSelect}
    `, { count: "exact" });

  // 1. Filtro di ricerca testuale (ilike su più colonne in OR)
  if (searchTerm && searchTerm.trim() !== "") {
    const search = `%${searchTerm.trim()}%`;
    query = query.or(`display_name.ilike.${search},first_name.ilike.${search},last_name.ilike.${search},email.ilike.${search}`);
  }

  // 2. Filtro sullo Stato
  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  // 3. Filtro sulla Classe (sfrutta la relazione filtrata nell'inner join precedente)
  if (isClassFiltered) {
    query = query.eq("profile_classes.academy_classes.name", classFilter);
  }

  // 4. Ordinamento e Paginazione applicati lato database
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(`Errore durante il fetching degli utenti paginati: ${error.message}`);
  }

  // Mappiamo i dati nidificati di Supabase nel nostro formato piatto AdminUserRow
  const mappedUsers: AdminUserRow[] = (data || []).map((p: any) => {
    const userClasses = (p.profile_classes || [])
      .map((pc: any) => pc.academy_classes?.name)
      .filter(Boolean);

    return {
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      display_name: p.display_name,
      email: p.email,
      role: p.role,
      status: p.status,
      created_at: p.created_at,
      total_minutes_active: p.total_minutes_active || 0,
      classes: userClasses,
    };
  });

  return {
    users: mappedUsers,
    totalCount: count || 0,
  };
}

/**
 * DEPRECATED: Recupera la lista di tutti gli utenti (mantenuta temporaneamente per retrocompatibilità)
 */
export async function getAdminUsersList(): Promise<AdminUserRow[]> {
  const { data: profiles, error: profError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (profError) throw new Error(profError.message);

  const { data: relations, error: relError } = await supabaseAdmin
    .from("profile_classes")
    .select(`
      profile_id,
      academy_classes ( name )
    `);

  if (relError) throw new Error(relError.message);

  return profiles.map((p) => {
    const userClasses = relations
      .filter((r) => r.profile_id === p.id)
      .map((r: any) => r.academy_classes?.name)
      .filter(Boolean);

    return {
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      display_name: p.display_name,
      email: p.email, // Garantiamo la presenza del campo anche qui
      role: p.role,
      status: p.status,
      created_at: p.created_at,
      total_minutes_active: p.total_minutes_active || 0,
      classes: userClasses,
    };
  });
}