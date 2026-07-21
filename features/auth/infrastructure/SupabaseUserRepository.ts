import { getSupabaseAdmin } from "@/lib/supabase";
import { IUserRepository } from "../ports/IUserRepository";
import { StudentUser } from "../domain/user";
import { randomUUID } from "crypto";

interface SupabaseProfileRow {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "student";
  display_name: string;
  status: "pending" | "active" | "blocked";
  user_type: "SCHOOL_STUDENT" | "EXTERNAL_STUDENT" | null;

  first_name: string | null; // 🎯 NUOVO
  last_name: string | null; // 🎯 NUOVO
  avatar_url: string | null; // 🎯 NUOVO

  school_track: string | null;
  school_section: string | null;

  created_at: string;
  updated_at: string;
}

export class SupabaseUserRepository implements IUserRepository {
  private readonly TABLE_NAME = "profiles";

  private async getUserClasses(userId: string): Promise<string[]> {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("profile_classes")
      .select(
        `
        academy_classes ( name )
      `,
      )
      .eq("profile_id", userId);

    if (error) {
      console.error(
        "[SUPABASE ERROR] Errore in getUserClasses:",
        error.message,
      );
      return [];
    }

    return (data || [])
      .map((r: any) => r.academy_classes?.name)
      .filter(Boolean);
  }

  async findByEmail(email: string): Promise<StudentUser | null> {
    const supabase = getSupabaseAdmin();

    const cleanedEmail = email.toLowerCase().trim();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("email", cleanedEmail)
      .maybeSingle();

    if (error) {
      console.error("[SUPABASE ERROR] Errore in findByEmail:", error.message);
      throw new Error("Errore durante la ricerca dell'utente sul database.");
    }

    if (!data) return null;

    const classes = await this.getUserClasses(data.id);
    return this.mapToDomain(data as SupabaseProfileRow, classes);
  }

  async findById(id: string): Promise<StudentUser | null> {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[SUPABASE ERROR] Errore in findById:", error.message);
      throw new Error("Errore durante la ricerca dell'utente per ID.");
    }

    if (!data) return null;

    const classes = await this.getUserClasses(id);
    return this.mapToDomain(data as SupabaseProfileRow, classes);
  }

  async create(
    user: Omit<StudentUser, "id" | "createdAt" | "updatedAt">,
  ): Promise<StudentUser> {
    const dbPayload = {
      id: randomUUID(), // 🎯 GENERA L'ID PRIMA DI INVIARE IL PAYLOAD
      email: user.email.toLowerCase().trim(),
      password_hash: user.passwordHash,
      role: user.role,
      display_name: user.displayName,
      status: "pending",
      first_name: user.firstName || null,
      last_name: user.lastName || null,
      avatar_url: user.avatarUrl || null,
      user_type: user.userType ?? null,
      school_track: user.schoolTrack ?? null,
      school_section: user.schoolSection ?? null,
    };

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .insert([dbPayload])
      .select("*")
      .single();

    if (error) {
      console.error("[SUPABASE ERROR] Errore in create user:", error.message);
      throw new Error("Impossibile salvare il nuovo utente nel database.");
    }

    return this.mapToDomain(data as SupabaseProfileRow, []);
  }

  async update(
    id: string,
    user: Partial<Omit<StudentUser, "id" | "createdAt">>,
  ): Promise<StudentUser> {
    if (!id) {
      throw new Error(
        "Impossibile aggiornare l'utente: ID sessione non valido.",
      );
    }

    const dbPayload: Record<string, any> = {};
    const anyUser = user as any;

    if (user.email !== undefined)
      dbPayload.email = user.email.toLowerCase().trim();
    if (user.passwordHash !== undefined)
      dbPayload.password_hash = user.passwordHash;
    if (user.role !== undefined) dbPayload.role = user.role;
    if (user.displayName !== undefined)
      dbPayload.display_name = user.displayName;
    if (anyUser.status !== undefined) dbPayload.status = anyUser.status;

    // Mappatura nuovi campi profilo
    if (user.firstName !== undefined) dbPayload.first_name = user.firstName;
    if (user.lastName !== undefined) dbPayload.last_name = user.lastName;
    if (user.avatarUrl !== undefined) dbPayload.avatar_url = user.avatarUrl;

    if (user.userType !== undefined) dbPayload.user_type = user.userType;
    if (user.schoolTrack !== undefined)
      dbPayload.school_track = user.schoolTrack;
    if (user.schoolSection !== undefined)
      dbPayload.school_section = user.schoolSection;

    dbPayload.updated_at = new Date().toISOString();

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from(this.TABLE_NAME)
      .update(dbPayload)
      .eq("id", id);

    if (error) {
      console.error("[SUPABASE ERROR] Errore in update user:", error.message);
      throw new Error("Impossibile aggiornare i dati dell'utente.");
    }

    const updated = await this.findById(id);
    if (!updated) throw new Error("Utente non trovato dopo l'aggiornamento.");
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq("id", id);

    return !error;
  }

  async list(): Promise<StudentUser[]> {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[SUPABASE ERROR] Errore in list users:", error.message);
      throw new Error("Impossibile recuperare il registro utenti.");
    }

    const users: StudentUser[] = [];
    for (const row of data || []) {
      const classes = await this.getUserClasses(row.id);
      users.push(this.mapToDomain(row as SupabaseProfileRow, classes));
    }

    return users;
  }

  private mapToDomain(row: SupabaseProfileRow, classes: string[]): StudentUser {
    const anyUser: any = {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      displayName: row.display_name,
      status: row.status,
      firstName: row.first_name || undefined, // 🎯 Mappatura in camelCase
      lastName: row.last_name || undefined, // 🎯 Mappatura in camelCase
      avatarUrl: row.avatar_url || undefined, // 🎯 Mappatura in camelCase

      userType: row.user_type || undefined,
      schoolTrack: row.school_track || undefined,
      schoolSection: row.school_section || undefined,

      createdAt: new Date(row.created_at).toISOString(),
      updatedAt: new Date(row.updated_at).toISOString(),
    };

    anyUser.classes = classes;
    anyUser.class = classes.join(", ");

    return anyUser as StudentUser;
  }
}
