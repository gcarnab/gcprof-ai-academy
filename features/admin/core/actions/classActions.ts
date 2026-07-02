"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createAcademyClass(name: string, description?: string, slug?: string) {
  // Genera lo slug se non viene passato dal frontend (es. "Informatica 1°" -> "informatica-1")
  const classSlug = slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const { data, error } = await supabaseAdmin
    .from("academy_classes")
    .insert([
      {
        name: name.trim(),
        slug: classSlug,
        description: description?.trim() || null,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ Errore creazione classe:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}