"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function deleteResourceAction(id: string) {
  try {
    if (!id) {
      return { success: false, error: "ID risorsa non valido o mancante." };
    }

    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) {
      logger.error("Errore Database durante l'eliminazione della risorsa", { error, id });
      return { success: false, error: "Impossibile eliminare la risorsa dal database." };
    }

    logger.info("Risorsa eliminata con successo", { resourceId: id });

    // Revalidiamo i percorsi per aggiornare la UI istantaneamente
    revalidatePath("/admin/resources");
    revalidatePath("/resources");

    return { success: true };
  } catch (err) {
    logger.error("Eccezione non gestita in deleteResourceAction", { error: err, id });
    return { success: false, error: "Si è verificato un errore imprevisto lato server." };
  }
}