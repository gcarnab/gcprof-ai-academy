"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Crea una nuova classe accademica (coorte) nel database
 */
export async function createAcademyClass(name: string, description: string) {
  if (!name.trim()) {
    return { success: false, error: "Il nome della classe è obbligatorio." };
  }

  // Generazione dello slug (es: "Informatica 1°" -> "informatica-1")
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { error } = await supabaseAdmin
    .from("academy_classes")
    .insert({
      name,
      slug,
      description,
      created_at: new Date().toISOString()
    });

  if (error) {
    return { success: false, error: `Errore durante la creazione: ${error.message}` };
  }

  // Rinfresca la dashboard per mostrare la nuova classe nei form
  revalidatePath("/admin/dashboard");
  return { success: true };
}