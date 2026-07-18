"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { ResourceFormValues } from "../schemas/resourceSchema";
import { logger } from "@/lib/logger";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function updateResourceAction(id: string, data: ResourceFormValues) {
  try {
    if (!id) {
      return { success: false, error: "ID risorsa mancante per l'aggiornamento." };
    }

    const tagsArray = data.tags
      ? data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const { data: updatedResource, error } = await supabase
      .from("resources")
      .update({
        title: data.title,
        description: data.description,
        url: data.url,
        type: data.type,
        provider: data.provider || null,
        language: data.language.toUpperCase(),
        tags: tagsArray,
        rating: data.rating ?? null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      logger.error("Errore Database durante l'aggiornamento della risorsa", { error, id, payload: data });
      return { success: false, error: "Errore durante il salvataggio delle modifiche nel database." };
    }

    logger.info("Risorsa aggiornata con successo", { resourceId: id });

    revalidatePath("/admin/resources");
    revalidatePath("/resources");

    return { success: true, data: updatedResource };
  } catch (err) {
    logger.error("Eccezione non gestita in updateResourceAction", { error: err, id });
    return { success: false, error: "Si è verificato un errore imprevisto lato server." };
  }
}