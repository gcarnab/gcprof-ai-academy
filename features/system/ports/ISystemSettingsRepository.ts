import { SystemSetting } from "../types/SystemConfiguration";

export interface ISystemSettingsRepository {
  /**
   * Restituisce tutte le impostazioni presenti
   * nella tabella system_settings.
   */
  getAll(): Promise<SystemSetting[]>;

  /**
   * Restituisce una singola impostazione.
   */
  getByKey(key: string): Promise<SystemSetting | null>;

  /**
   * Aggiorna il valore di una impostazione.
   */
  update(key: string, value: string): Promise<void>;
}