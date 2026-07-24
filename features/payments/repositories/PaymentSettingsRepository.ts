/**
 * GCPROF AI ACADEMY
 * File: features/payments/repositories/PaymentSettingsRepository.ts
 *
 * Repository dedicato alla tabella payment_settings.
 * Responsabilità:
 * - Lettura configurazione pagamenti (resistente a duplicati o tabella vuota)
 * - Aggiornamento configurazione pagamenti
 *
 * Nessuna logica di business.
 */

import { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import { PaymentSettings } from "../types/paymentTypes";

export class PaymentSettingsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Recupera la configurazione corrente dei pagamenti.
   * Se esistono più configurazioni, seleziona la più recente.
   * Se la tabella è vuota, inizializza automaticamente una configurazione di default.
   */
  async getSettings(): Promise<PaymentSettings> {
    logger.info(
      "[PaymentSettingsRepository] Recupero configurazione pagamenti"
    );

    const { data, error } = await this.supabase
      .from("payment_settings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      logger.error(
        "[PaymentSettingsRepository] Errore lettura payment_settings",
        {
          error: error.message,
        }
      );

      throw new Error(error.message);
    }

    // Auto-inizializzazione se la tabella è vuota
    if (!data || data.length === 0) {
      logger.info(
        "[PaymentSettingsRepository] Nessuna configurazione trovata. Inizializzazione configurazione predefinita."
      );
      return await this.createDefaultSettings();
    }

    const settings = data[0] as PaymentSettings;

    logger.info(
      "[PaymentSettingsRepository] Configurazione recuperata con successo",
      {
        id: settings.id,
        provider: settings.provider,
        currency: settings.default_currency,
        sandbox: settings.sandbox_enabled,
      }
    );

    return settings;
  }

  /**
   * Crea la riga di configurazione di default nel DB.
   */
  private async createDefaultSettings(): Promise<PaymentSettings> {
    const defaultPayload = {
      provider: "STRIPE",
      sandbox_enabled: true,
      default_currency: "EUR",
      vat_percentage: 22,
      allow_coupons: true,
      academy_country: "IT",
      checkout_session_expire_minutes: 30,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from("payment_settings")
      .insert(defaultPayload)
      .select()
      .single();

    if (error) {
      logger.error(
        "[PaymentSettingsRepository] Errore durante l'inizializzazione dei dati predefiniti",
        {
          error: error.message,
        }
      );

      throw new Error(error.message);
    }

    logger.info(
      "[PaymentSettingsRepository] Configurazione predefinita creata con successo",
      { id: data.id }
    );

    return data as PaymentSettings;
  }

  /**
   * Aggiorna la configurazione dei pagamenti corrente.
   */
  async updateSettings(
    settings: Partial<PaymentSettings>
  ): Promise<PaymentSettings> {
    logger.info(
      "[PaymentSettingsRepository] Aggiornamento configurazione pagamenti",
      {
        fields: Object.keys(settings),
      }
    );

    // Recupera la configurazione corrente (o la crea se assente)
    const current = await this.getSettings();

    const { data, error } = await this.supabase
      .from("payment_settings")
      .update({
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
      .select()
      .single();

    if (error) {
      logger.error(
        "[PaymentSettingsRepository] Errore aggiornamento payment_settings",
        {
          error: error.message,
        }
      );

      throw new Error(error.message);
    }

    logger.info(
      "[PaymentSettingsRepository] Configurazione aggiornata con successo",
      {
        id: data.id,
        provider: data.provider,
      }
    );

    return data as PaymentSettings;
  }
}