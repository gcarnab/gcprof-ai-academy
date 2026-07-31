"use server";

import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";
import { SupabaseSystemSettingsRepository } from "../repositories/SupabaseSystemSettingsRepository";
import { HomeBannerSettings } from "../types/SystemConfiguration";

export async function updateHomeBannerAction(
  settings: HomeBannerSettings
): Promise<{ success: boolean; error: string | null }> {
  try {
    logger.info("[updateHomeBannerAction] Aggiornamento impostazioni banner home in corso...");

    const repository = new SupabaseSystemSettingsRepository();

    const updates: { key: string; value: string }[] = [
      { key: "HOME_BANNER_ENABLED", value: String(settings.enabled) },
      { key: "HOME_BANNER_VERSION", value: settings.version || "1" },
      { key: "HOME_BANNER_TITLE", value: settings.title || "" },
      { key: "HOME_BANNER_MESSAGE", value: settings.message || "" },
      { key: "HOME_BANNER_TYPE", value: settings.type },
      {
        key: "HOME_BANNER_START_AT",
        value: settings.startAt ? new Date(settings.startAt).toISOString() : "",
      },
      {
        key: "HOME_BANNER_END_AT",
        value: settings.endAt ? new Date(settings.endAt).toISOString() : "",
      },
      { key: "HOME_BANNER_DISMISSIBLE", value: String(settings.dismissible) },
      { key: "HOME_BANNER_BUTTON_TEXT", value: settings.buttonText || "" },
      { key: "HOME_BANNER_BUTTON_URL", value: settings.buttonUrl || "" },
    ];

    for (const { key, value } of updates) {
      await repository.update(key, value);
    }

    logger.info("[updateHomeBannerAction] Banner aggiornato con successo.");

    // Forza il re-render lato server della homepage per applicare subito i cambiamenti
    revalidatePath("/");

    return { success: true, error: null };
  } catch (error) {
    logger.error("[updateHomeBannerAction] Errore durante l'aggiornamento del banner", error);
    return { success: false, error: "Impossibile salvare le impostazioni del banner." };
  }
}