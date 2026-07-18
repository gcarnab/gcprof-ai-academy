"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { ResourceFormValues } from "../schemas/resourceSchema";
import { logger } from "@/lib/logger"; // <-- Import del logger di sistema

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createResourceAction(data: ResourceFormValues) {
  try {
    // Trasformiamo i tags da "react, nextjs, frontend" a ["react", "nextjs", "frontend"]
    const tagsArray = data.tags
      ? data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const { data: newResource, error } = await supabase
      .from("resources")
      .insert([
        {
          title: data.title,
          description: data.description,
          url: data.url,
          type: data.type,
          typeVariant: "default",
          provider: data.provider || null,
          language: data.language.toUpperCase(),
          tags: tagsArray,
          is_visible: true, 
          rating: data.rating ?? null, 
        },
      ])
      .select()
      .single();

    if (error) {
      logger.error("Errore Database durante la creazione della risorsa", { error, payload: data });
      return { success: false, error: "Errore durante il salvataggio nel database." };
    }

    logger.info("Risorsa creata con successo", { resourceId: newResource.id });

    // Revalida le rotte per mostrare i dati aggiornati immediatamente
    revalidatePath("/admin/resources");
    revalidatePath("/resources");

    return { success: true, data: newResource };
  } catch (err) {
    logger.error("Eccezione non gestita in createResourceAction", { error: err });
    return { success: false, error: "Si è verificato un errore imprevisto durante la comunicazione con il server." };
  }
}