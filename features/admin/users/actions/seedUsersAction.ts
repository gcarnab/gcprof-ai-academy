"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ⚠️ Intercettazione Sicurezza: Verifichiamo le variabili d'ambiente
if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Mancano le chiavi di configurazione per Supabase Admin Service.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// Array di nomi e cognomi realistici per generare combinazioni casuali coerenti
const MOCK_FIRST_NAMES = ["Alessandro", "Beatrice", "Claudio", "Diana", "Francesco", "Giulia", "Leonardo", "Martina", "Marco", "Sofia", "Riccardo", "Elena"];
const MOCK_LAST_NAMES = ["Rossi", "Ferrari", "Russo", "Bianchi", "Romano", "Gallo", "Costa", "Fontana", "Conti", "Esposito", "Ricci", "Bruno"];

interface SeedResult {
  success: boolean;
  insertedCount: number;
  error?: string;
}

/**
 * Server Action per il popolamento massivo del database ad uso Collaudo/Performance Test
 */
export async function seedBulkUsersAction(
  count: number,
  targetClassName: string
): Promise<SeedResult> {
  try {
    // 1. Recuperiamo l'ID della classe di destinazione partendo dal nome scelto
    const { data: targetClass, error: classError } = await supabaseAdmin
      .from("academy_classes")
      .select("id")
      .eq("name", targetClassName)
      .single();

    if (classError || !targetClass) {
      return {
        success: false,
        insertedCount: 0,
        error: `Classe '${targetClassName}' non trovata. Crea prima la classe nella dashboard.`,
      };
    }

    const insertedProfiles: any[] = [];
    const profileClassesRelations: any[] = [];

    // Recuperiamo un hash di default dall'ambiente o usiamo un placeholder sicuro per i test
    // ⚠️ Spostare SEED_DEFAULT_PASSWORD_HASH nel file .env.local se si desidera simulare anche i login dei test user
    const defaultPasswordHash = process.env.SEED_DEFAULT_PASSWORD_HASH || "$2a$10$MockHashPlaceholderForTestingPurposesOnly";

    // 2. Generazione dei dati in memoria
    for (let i = 0; i < count; i++) {
      // Generiamo un UUID valido lato server per coordinare la relazione Many-to-Many
      const profileId = crypto.randomUUID();
      
      const firstName = MOCK_FIRST_NAMES[Math.floor(Math.random() * MOCK_FIRST_NAMES.length)];
      const lastName = MOCK_LAST_NAMES[Math.floor(Math.random() * MOCK_LAST_NAMES.length)];
      const displayName = `${firstName} ${lastName}`;
      
      // Creiamo un'email univoca basata su timestamp e indice
      const uniqueSuffix = `${Date.now().toString().slice(-4)}${i}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${uniqueSuffix}@gcprof-test.com`;

      // Simuliamo un tempo di fruizione attivo casuale (es. tra 10 e 480 minuti) per i grafici delle statistiche
      const randomMinutes = Math.floor(Math.random() * 470) + 10;

      insertedProfiles.push({
        id: profileId,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
        email: email,
        role: "student",
        status: "active", // Li creiamo direttamente attivi per testare i filtri della tabella
        password_hash: defaultPasswordHash,
        total_minutes_active: randomMinutes,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Date casuali negli ultimi 30 giorni
        updated_at: new Date().toISOString(),
      });

      profileClassesRelations.push({
        profile_id: profileId,
        class_id: targetClass.id,
        assigned_at: new Date().toISOString(),
      });
    }

    // 3. Inserimento in chunk o bulk su Supabase (sfruttando l'efficienza dei payload array)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert(insertedProfiles);

    if (profileError) throw new Error(`Errore inserimento profili: ${profileError.message}`);

    const { error: relationError } = await supabaseAdmin
      .from("profile_classes")
      .insert(profileClassesRelations);

    if (relationError) throw new Error(`Errore associazione classi: ${relationError.message}`);

    // Ricarichiamo i dati della pagina dell'amministrazione per riflettere i cambiamenti
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      insertedCount: count,
    };

  } catch (err: any) {
    return {
      success: false,
      insertedCount: 0,
      error: err.message || "Errore sconosciuto durante il seeding.",
    };
  }
}