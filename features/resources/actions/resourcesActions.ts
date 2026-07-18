"use server";

import { createClient } from "@supabase/supabase-js";
import { Resource } from "../types/Resource";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Recupera tutte le risorse attive per gli studenti
 */
export async function getActiveResources(): Promise<Resource[]> {
 
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Errore recupero risorse:", error.message);
    return [];
  }

  return data as Resource[];
}

/**
 * Recupera TUTTE le risorse (incluse le nascoste) per la tabella Admin
 */
export async function getAllResourcesAdmin(): Promise<Resource[]> {
  
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Errore recupero risorse admin:", error.message);
    return [];
  }

  return data as Resource[];
}

export async function createResource(formData: FormData) {

  // Estrai i dati dal form
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const category = formData.get("category") as string;

  // Inserisci in Supabase (assicurati che i nomi delle colonne combacino col tuo DB)
  const { data, error } = await supabase
    .from("resources")
    .insert([
      {
        title,
        description,
        url,
        category,
        is_active: true, // Di default la rendiamo attiva
      },
    ])
    .select();

  if (error) {
    console.error("Errore durante la creazione della risorsa:", error);
    return { success: false, error: error.message };
  }

  // Ricarica sia la pagina admin che la pagina pubblica per mostrare il nuovo dato
  revalidatePath("/admin/resources"); 
  revalidatePath("/resources");

  return { success: true, data };
}