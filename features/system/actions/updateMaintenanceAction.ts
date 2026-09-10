"use server";

import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

import { isAuthenticatedAdmin } from "../guards/maintenanceGuard";
import { SupabaseSystemSettingsRepository } from "../repositories/SupabaseSystemSettingsRepository";
import { MaintenanceSettings } from "../types/SystemConfiguration";

export async function updateMaintenanceAction(
  settings: MaintenanceSettings,
): Promise<{ success: boolean; error: string | null }> {
  try {
    // Controllo di autorizzazione server-side.
    if (!(await isAuthenticatedAdmin())) {
      logger.warn(
        "[updateMaintenanceAction] Tentativo non autorizzato di modifica delle impostazioni di manutenzione.",
      );

      return {
        success: false,
        error: "Non sei autorizzato a modificare queste impostazioni.",
      };
    }

    logger.info(
      "[updateMaintenanceAction] Aggiornamento impostazioni manutenzione in corso...",
    );

    const repository = new SupabaseSystemSettingsRepository();

    const updates: { key: string; value: string }[] = [
      {
        key: "MAINTENANCE_MODE",
        value: String(settings.enabled),
      },
      {
        key: "MAINTENANCE_TITLE",
        value: settings.title || "Sito temporaneamente in manutenzione",
      },
      {
        key: "MAINTENANCE_MESSAGE",
        value:
          settings.message ||
          "Il sito è temporaneamente non disponibile. Stiamo effettuando alcune operazioni di manutenzione. Riprova più tardi.",
      },
    ];

    for (const { key, value } of updates) {
      await repository.update(key, value);
    }

    logger.info(
      "[updateMaintenanceAction] Impostazioni manutenzione aggiornate con successo.",
    );

    revalidatePath("/admin/dashboard");
    revalidatePath("/maintenance");

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    logger.error(
      "[updateMaintenanceAction] Errore durante l'aggiornamento delle impostazioni di manutenzione.",
      error,
    );

    return {
      success: false,
      error: "Impossibile salvare le impostazioni di manutenzione.",
    };
  }
}