import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

import { ISystemSettingsRepository } from "../ports/ISystemSettingsRepository";
import { SystemSetting } from "../types/SystemConfiguration";

interface SupabaseSystemSettingRow {
  key: string;
  value: string;
  description: string | null;
  updated_at: string | null;
}

export class SupabaseSystemSettingsRepository
  implements ISystemSettingsRepository
{
  private readonly TABLE_NAME = "system_settings";

  async getAll(): Promise<SystemSetting[]> {
    logger.info("[SystemSettingsRepository] Loading system settings...");

    try {
      const supabase = getSupabaseAdmin();

      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("*")
        .order("key", { ascending: true });

      if (error) {
        logger.error(
          `[SystemSettingsRepository] Error loading settings: ${error.message || String(error)}`
        );

        throw new Error(
          "Impossibile recuperare la configurazione di sistema."
        );
      }

      return (data ?? []).map((row) => this.mapToDomain(row));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`[SystemSettingsRepository] Exception in getAll: ${message}`);
      throw err;
    }
  }

  async getByKey(key: string): Promise<SystemSetting | null> {
    logger.debug("[SystemSettingsRepository] Loading setting", { key });

    try {
      const supabase = getSupabaseAdmin();

      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select("*")
        .eq("key", key)
        .maybeSingle();

      if (error) {
        logger.error(
          `[SystemSettingsRepository] Error loading setting '${key}': ${error.message || String(error)}`
        );

        throw new Error(
          `Impossibile recuperare la configurazione '${key}'.`
        );
      }

      if (!data) {
        logger.warn(`[SystemSettingsRepository] Setting not found: ${key}`);
        return null;
      }

      return this.mapToDomain(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`[SystemSettingsRepository] Exception in getByKey '${key}': ${message}`);
      throw err;
    }
  }

  async update(key: string, value: string): Promise<void> {
    logger.info("[SystemSettingsRepository] Updating setting", { key });

    try {
      const supabase = getSupabaseAdmin();

      const { error } = await supabase
        .from(this.TABLE_NAME)
        .update({
          value,
          updated_at: new Date().toISOString(),
        })
        .eq("key", key);

      if (error) {
        logger.error(
          `[SystemSettingsRepository] Error updating setting '${key}': ${error.message || String(error)}`
        );

        throw new Error(
          `Impossibile aggiornare la configurazione '${key}'.`
        );
      }

      logger.info("[SystemSettingsRepository] Setting updated", { key });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`[SystemSettingsRepository] Exception in update '${key}': ${message}`);
      throw err;
    }
  }

  private mapToDomain(row: SupabaseSystemSettingRow): SystemSetting {
    return {
      key: row.key,
      value: row.value,
      description: row.description,
      updatedAt: row.updated_at,
    };
  }
}