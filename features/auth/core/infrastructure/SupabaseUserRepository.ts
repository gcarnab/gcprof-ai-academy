import { supabaseServer } from "./supabaseClient";
import { IUserRepository } from "../ports/IUserRepository";
import { StudentUser } from "../domain/user";

interface SupabaseUserRow {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "student";
  display_name: string;
  classes: string[];
  created_at: string;
  updated_at: string;
}

export class SupabaseUserRepository implements IUserRepository {
  private readonly TABLE_NAME = "users";

  async findByEmail(email: string): Promise<StudentUser | null> {
    const cleanedEmail = email.toLowerCase().trim();

    const { data, error } = await supabaseServer
      .from(this.TABLE_NAME)
      .select("*")
      .eq("email", cleanedEmail)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("[SUPABASE ERROR] Errore in findByEmail:", error.message);
      throw new Error("Errore durante la ricerca dell'utente sul database.");
    }

    return data ? this.mapToDomain(data as SupabaseUserRow) : null;
  }

  async findById(id: string): Promise<StudentUser | null> {
    const { data, error } = await supabaseServer
      .from(this.TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("[SUPABASE ERROR] Errore in findById:", error.message);
      throw new Error("Errore durante la ricerca dell'utente per ID.");
    }

    return data ? this.mapToDomain(data as SupabaseUserRow) : null;
  }

  async create(
    user: Omit<StudentUser, "id" | "createdAt" | "updatedAt">,
  ): Promise<StudentUser> {
    const dbPayload = {
      email: user.email.toLowerCase().trim(),
      password_hash: user.passwordHash,
      role: user.role,
      display_name: user.displayName,
      // Se 'classes' non esiste nell'input, proviamo a mappare 'class' o lasciamo array vuoto
      classes: (user as any).classes || (user as any).class || [],
    };

    const { data, error } = await supabaseServer
      .from(this.TABLE_NAME)
      .insert([dbPayload])
      .select("*")
      .single();

    if (error) {
      console.error("[SUPABASE ERROR] Errore in create user:", error.message);
      throw new Error("Impossibile salvare il nuovo utente nel database.");
    }

    return this.mapToDomain(data as SupabaseUserRow);
  }

  async update(
    id: string,
    user: Partial<Omit<StudentUser, "id" | "createdAt">>,
  ): Promise<StudentUser> {
    if (!id) {
      console.error(
        "[SUPABASE CRITICAL] Tentativo di update con ID nullo o vuoto.",
      );
      throw new Error(
        "Impossibile aggiornare l'utente: ID sessione non valido.",
      );
    }

    const dbPayload: Record<string, any> = {};
    const anyUser = user as any;

    // Mappiamo solo i campi riconosciuti dal nostro schema Postgres
    if (user.email !== undefined)
      dbPayload.email = user.email.toLowerCase().trim();
    if (user.passwordHash !== undefined)
      dbPayload.password_hash = user.passwordHash;
    if (user.role !== undefined) dbPayload.role = user.role;
    if (user.displayName !== undefined)
      dbPayload.display_name = user.displayName;

    if (anyUser.classes !== undefined) dbPayload.classes = anyUser.classes;
    if (anyUser.class !== undefined) dbPayload.classes = anyUser.class;

    if (anyUser.updatedAt !== undefined) {
      dbPayload.updated_at =
        typeof anyUser.updatedAt === "string"
          ? anyUser.updatedAt
          : new Date(anyUser.updatedAt).toISOString();
    }

    // 🛡️ INTELLIGENZA DIFENSIVA: Se la loginAction passa campi extra non mappati, dbPayload sarà {}
    // Invece di mandare in crash la richiesta effettuando una query a vuoto, restituiamo l'utente esistente.
    if (Object.keys(dbPayload).length === 0) {
      console.log(
        `ℹ️ [SUPABASE INFO] Intercettato Update no-op per ID ${id}. Nessun campo compatibile rilevato. Dati ricevuti:`,
        user,
      );

      const currentUser = await this.findById(id);
      if (!currentUser) {
        throw new Error("Utente non trovato nel database per l'aggiornamento.");
      }
      return currentUser; // Ritorna l'utente intatto e prosegue il login senza errori!
    }

    // Se ci sono campi validi da modificare, eseguiamo l'update reale
    const { data, error } = await supabaseServer
      .from(this.TABLE_NAME)
      .update(dbPayload)
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("[SUPABASE ERROR] Errore in update user:", error.message);
      throw new Error("Impossibile aggiornare i dati dell'utente.");
    }

    if (!data || data.length === 0) {
      console.error(
        `[SUPABASE WARNING] Nessun utente trovato con ID: ${id} durante l'update.`,
      );
      throw new Error("Utente non trovato nel database per l'aggiornamento.");
    }

    return this.mapToDomain(data[0] as SupabaseUserRow);
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseServer
      .from(this.TABLE_NAME)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[SUPABASE ERROR] Errore in delete user:", error.message);
      return false;
    }

    return true;
  }

  async list(): Promise<StudentUser[]> {
    const { data, error } = await supabaseServer
      .from(this.TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[SUPABASE ERROR] Errore in list users:", error.message);
      throw new Error(
        "Impossibile recuperare il registro utenti dal database.",
      );
    }

    const rows = (data || []) as SupabaseUserRow[];
    return rows.map((row) => this.mapToDomain(row));
  }

  /**
   * 🎯 FIX TS(2322): Convertiamo i timestamp di Postgres in stringhe ISO
   * per allinearci al tipo 'string' richiesto dal tuo StudentUser di dominio.
   */
  private mapToDomain(row: SupabaseUserRow): StudentUser {
    const anyUser: any = {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      displayName: row.display_name,
      createdAt: new Date(row.created_at).toISOString(), // Output stringa ISO
      updatedAt: new Date(row.updated_at).toISOString(), // Output stringa ISO
    };

    // Iniettiamo dinamicamente sia classes che class per retrocompatibilità con la UI v1/v2
    anyUser.classes = row.classes || [];
    anyUser.class = (row.classes || []).join(", ");

    return anyUser as StudentUser;
  }
}
