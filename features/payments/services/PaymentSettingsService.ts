/**
 * GCPROF AI ACADEMY
 * File: features/payments/services/PaymentSettingsService.ts
 *
 * Service della feature Payment Settings.
 *
 * Responsabilità:
 * - Validazione business
 * - Coordinamento Repository
 * - Nessuna dipendenza dalla UI
 */

import { logger } from "@/lib/logger";

import { PaymentSettingsRepository } from "../repositories/PaymentSettingsRepository";
import {
  CurrencyEnum,
  PaymentProviderEnum,
  PaymentSettings,
} from "../types/paymentTypes";

export class PaymentSettingsService {
  constructor(
    private readonly repository: PaymentSettingsRepository,
  ) {}

  /**
   * Restituisce la configurazione corrente.
   */
  async getSettings(): Promise<PaymentSettings> {
    logger.info(
      "[PaymentSettingsService] Recupero configurazione pagamenti",
    );

    return this.repository.getSettings();
  }

  /**
   * Aggiorna la configurazione.
   */
  async updateSettings(
    settings: Partial<PaymentSettings>,
  ): Promise<PaymentSettings> {
    logger.info(
      "[PaymentSettingsService] Validazione configurazione pagamenti",
    );

    this.validate(settings);

    const updated = await this.repository.updateSettings(settings);

    logger.info(
      "[PaymentSettingsService] Configurazione aggiornata",
      {
        provider: updated.provider,
        currency: updated.default_currency,
      },
    );

    return updated;
  }

  /**
   * Validazioni business.
   */
  private validate(
    settings: Partial<PaymentSettings>,
  ): void {
    if (
      settings.provider &&
      !this.isValidProvider(settings.provider)
    ) {
      throw new Error(
        "Provider di pagamento non valido.",
      );
    }

    if (
      settings.default_currency &&
      !this.isValidCurrency(settings.default_currency)
    ) {
      throw new Error(
        "Valuta non valida.",
      );
    }

    if (
      settings.vat_percentage !== undefined
    ) {
      if (
        settings.vat_percentage < 0 ||
        settings.vat_percentage > 100
      ) {
        throw new Error(
          "L'IVA deve essere compresa tra 0 e 100."
        );
      }
    }

    if (
      settings.checkout_session_expire_minutes !== undefined
    ) {
      if (
        settings.checkout_session_expire_minutes < 5 ||
        settings.checkout_session_expire_minutes > 1440
      ) {
        throw new Error(
          "La durata della sessione checkout deve essere compresa tra 5 e 1440 minuti."
        );
      }
    }

    if (
      settings.academy_country !== undefined
    ) {
      if (
        settings.academy_country.trim().length < 2
      ) {
        throw new Error(
          "Paese Academy non valido."
        );
      }
    }
  }

  private isValidProvider(
    provider: string,
  ): provider is PaymentProviderEnum {
    return [
      "STRIPE",
      "PAYPAL",
      "MOLLIE",
    ].includes(provider);
  }

  private isValidCurrency(
    currency: string,
  ): currency is CurrencyEnum {
    return [
      "EUR",
      "USD",
      "GBP",
    ].includes(currency);
  }
}