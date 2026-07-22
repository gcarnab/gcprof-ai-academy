/**
 * GCPROF AI ACADEMY - PORT: PAYMENT GATEWAY INTERFACE
 * File: features/payments/ports/IPaymentGateway.ts
 * 
 * Interfaccia di astrazione (Porta) per i gateway di pagamento.
 * Isolando la logica di dominio dai dettagli di implementazione dei singoli provider,
 * garantisce disaccoppiamento totale e la possibilità di sostituire o affiancare Stripe.
 */

import { 
  Order, 
  OrderItem, 
  PaymentProviderEnum 
} from "../types/paymentTypes";

// =============================================================================
// INPUT & OUTPUT DTOs PER IL GATEWAY
// =============================================================================

export interface CreateCheckoutSessionInput {
  order: Order;
  items: OrderItem[];
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  expiresInMinutes?: number;
}

export interface CheckoutSessionOutput {
  sessionId: string;
  checkoutUrl: string;
  providerOrderId?: string;
  rawResponse: Record<string, unknown>;
}

export interface WebhookEventPayload {
  id: string;
  type: string;
  provider: PaymentProviderEnum;
  data: Record<string, unknown>;
  rawEvent: unknown;
}

// =============================================================================
// INTERFACCIA CONTRATTO (PORT)
// =============================================================================

export interface IPaymentGateway {
  /**
   * Restituisce l'identificativo del provider gestito dall'adattatore (es. 'STRIPE')
   */
  getProviderName(): PaymentProviderEnum;

  /**
   * Crea una sessione di checkout remota sul provider di pagamento
   */
  createCheckoutSession(
    input: CreateCheckoutSessionInput
  ): Promise<CheckoutSessionOutput>;

  /**
   * Valida la firma digitale e converte il payload grezzo del webhook in un evento tipizzato
   */
  constructWebhookEvent(
    rawBody: string | Buffer,
    signature: string
  ): Promise<WebhookEventPayload>;
}