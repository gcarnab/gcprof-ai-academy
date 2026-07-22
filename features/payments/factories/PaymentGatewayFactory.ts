/**
 * GCPROF AI ACADEMY - FACTORY: PAYMENT GATEWAY
 * File: features/payments/factories/PaymentGatewayFactory.ts
 *
 * Factory centrale per la creazione dei gateway di pagamento.
 * Mantiene il dominio disaccoppiato dagli adapter concreti.
 */

import { IPaymentGateway } from "../ports/IPaymentGateway";
import { PaymentProviderEnum } from "../types/paymentTypes";
import { StripeGatewayAdapter } from "../adapters/stripe/StripeGatewayAdapter";
import { PAYMENTS_CONFIG } from "../constants/paymentConstants";

export class PaymentGatewayFactory {
  /**
   * Restituisce l'implementazione concreta del gateway configurato.
   */
  public static create(
    provider?: PaymentProviderEnum
  ): IPaymentGateway {

    const selectedProvider =
      provider || PAYMENTS_CONFIG.DEFAULT_PROVIDER;

    switch (selectedProvider) {
      case "STRIPE":
        return new StripeGatewayAdapter();

      case "PAYPAL":
        throw new Error(
          "PAYPAL gateway non ancora implementato."
        );

      case "MOLLIE":
        throw new Error(
          "MOLLIE gateway non ancora implementato."
        );

      default:
        throw new Error(
          `Payment provider non supportato: ${selectedProvider}`
        );
    }
  }
}