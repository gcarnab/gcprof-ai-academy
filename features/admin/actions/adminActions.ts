"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Cambia lo stato approvativo di un utente (es. da pending ad active)
 */
export async function updateUserStatus(userId: string, newStatus: "pending" | "active" | "blocked") {
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}

/**
 * Riassegna le classi a un determinato utente (Svuota le precedenti e inserisce le nuove)
 */
export async function updateUserClasses(userId: string, classNames: string[]) {
  // 1. Rimuove tutte le associazioni attuali nella tabella pivot
  const { error: deleteError } = await supabaseAdmin
    .from("profile_classes")
    .delete()
    .eq("profile_id", userId);

  if (deleteError) return { success: false, error: deleteError.message };

  if (classNames.length === 0) {
    revalidatePath("/admin/dashboard");
    return { success: true };
  }

  // 2. Recupera gli ID delle classi corrispondenti ai nomi passati
  const { data: classes, error: classError } = await supabaseAdmin
    .from("academy_classes")
    .select("id, name")
    .in("name", classNames);

  if (classError) return { success: false, error: classError.message };

  // 3. Prepara i record da inserire nella tabella pivot
  const inserts = classes.map((c) => ({
    profile_id: userId,
    class_id: c.id,
  }));

  const { error: insertError } = await supabaseAdmin
    .from("profile_classes")
    .insert(inserts);

  if (insertError) return { success: false, error: insertError.message };

  revalidatePath("/admin/dashboard");
  return { success: true };
}

/**
 * 🎯 NUOVA: Crea una nuova classe allineata ad academy_classes generando lo slug automaticamente
 */
export async function createClass(name: string, description?: string) {
  if (!name || name.trim() === "") {
    return { success: false, error: "Il nome della classe è obbligatorio." };
  }

  // Generazione intelligente dello slug partendo dal nome (es. "Terza LSA" -> "terza-lsa")
  const generatedSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")     // Sostituisce caratteri non alfanumerici (incluso il simbolo °) con un trattino
    .replace(/(^-|-$)/g, "");         // Rimuove i trattini all'inizio o alla fine

  const { data, error } = await supabaseAdmin
    .from("academy_classes")
    .insert([
      {
        name: name.trim(),
        slug: generatedSlug,
        description: description?.trim() || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ [ADMIN ACTION ERROR] Creazione classe fallita:", error.message);
    return { success: false, error: error.message };
  }

  // Forza l'aggiornamento dei percorsi amministrativi che leggono l'elenco classi
  revalidatePath("/admin/dashboard");
  return { success: true, data };
}