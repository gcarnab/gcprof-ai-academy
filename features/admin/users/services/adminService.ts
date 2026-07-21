import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Mancano le chiavi di configurazione per Supabase Admin Service.",
  );
}

// Client privilegiato per bypassare RLS lato server nelle azioni di amministrazione
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export interface AdminUserRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  email: string | null;
  role: "admin" | "student";
  status: "pending" | "active" | "blocked";
  created_at: string;
  total_minutes_active: number;
  classes: string[];
  userType?: "SCHOOL_STUDENT" | "EXTERNAL_STUDENT" | null;
  schoolTrack?: string | null;
  schoolSection?: string | null;
}

export interface PaginatedUsersResponse {
  users: AdminUserRow[];
  totalCount: number;
}

export interface UserFilterParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  statusFilter?: string;
  classFilter?: string;
  userTypeFilter?: string;
  schoolTrackFilter?: string;
  schoolSectionFilter?: string;
}

/**
 * Recupera la lista paginata e filtrata degli utenti DIRETTAMENTE lato database
 */
export async function getAdminUsersPaginated({
  page,
  pageSize,
  searchTerm,
  statusFilter,
  classFilter,
  userTypeFilter,
  schoolTrackFilter,
  schoolSectionFilter,
}: UserFilterParams): Promise<PaginatedUsersResponse> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const isClassFiltered = classFilter && classFilter !== "all";
  const relationSelect = isClassFiltered
    ? "profile_classes!inner(academy_classes!inner(name))"
    : "profile_classes(academy_classes(name))";

  // Inserito user_type nella select testuale
  let query = supabaseAdmin.from("profiles").select(
    `
      id,
      first_name,
      last_name,
      display_name,
      email,
      role,
      status,
      created_at,
      total_minutes_active,
      user_type,
      school_track,
      school_section,      
      ${relationSelect}
    `,
    { count: "exact" },
  );

  if (searchTerm && searchTerm.trim() !== "") {
    const search = `%${searchTerm.trim()}%`;
    query = query.or(
      `display_name.ilike.${search},first_name.ilike.${search},last_name.ilike.${search},email.ilike.${search}`,
    );
  }

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  if (isClassFiltered) {
    query = query.eq("profile_classes.academy_classes.name", classFilter);
  }

  if (userTypeFilter && userTypeFilter !== "all") {
    query = query.eq("user_type", userTypeFilter);
  }

  if (schoolTrackFilter && schoolTrackFilter !== "all") {
    query = query.eq("school_track", schoolTrackFilter);
  }

  if (schoolSectionFilter && schoolSectionFilter !== "all") {
    query = query.eq("school_section", schoolSectionFilter);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(
      `Errore durante il fetching degli utenti paginati: ${error.message}`,
    );
  }

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
      userType: p.user_type,
      schoolTrack: p.school_track,
      schoolSection: p.school_section,
    };
  });

  return {
    users: mappedUsers,
    totalCount: count || 0,
  };
}

/**
 * DEPRECATED: Recupera la lista di tutti gli utenti
 */
export async function getAdminUsersList(): Promise<AdminUserRow[]> {
  const { data: profiles, error: profError } = await supabaseAdmin
    .from("profiles")
    .select("*") // Qui prende già tutto, incluso user_type
    .order("created_at", { ascending: false });

  if (profError) throw new Error(profError.message);

  const { data: relations, error: relError } = await supabaseAdmin.from(
    "profile_classes",
  ).select(`
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
      email: p.email,
      role: p.role,
      status: p.status,
      created_at: p.created_at,
      total_minutes_active: p.total_minutes_active || 0,
      classes: userClasses,
      userType: p.user_type,
      schoolTrack: p.school_track,
      schoolSection: p.school_section,
    };
  });
}
