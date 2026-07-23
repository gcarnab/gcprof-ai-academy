/**
 * GCPROF AI ACADEMY - ADAPTER: STRIPE GATEWAY
 * File: features/payments/adapters/stripe/StripeGatewayAdapter.ts
 *
 * Implementazione concreta dell'interfaccia IPaymentGateway per Stripe.
 * Converte i DTO interni nel formato nativo di Stripe Checkout e valida i Webhook.
 */

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  IPaymentGateway,
  CreateCheckoutSessionInput,
  CheckoutSessionOutput,
  WebhookEventPayload,
} from "../../ports/IPaymentGateway";
import { PaymentProviderEnum } from "../../types/paymentTypes";
import { PAYMENTS_CONFIG } from "../../constants/paymentConstants";
import { logger } from "@/lib/logger";

export class StripeGatewayAdapter implements IPaymentGateway {
  private stripe: Stripe;

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey && PAYMENTS_CONFIG.IS_ENABLED) {
      logger.warn(
        "[StripeGatewayAdapter] STRIPE_SECRET_KEY non configurata nelle variabili d'ambiente.",
      );
    }

    this.stripe = stripe;
  }

  /**
   * Identificativo del provider
   */
  public getProviderName(): PaymentProviderEnum {
    return "STRIPE";
  }

  /**
   * Crea una sessione Stripe Checkout
   */
  public async createCheckoutSession(
    input: CreateCheckoutSessionInput,
  ): Promise<CheckoutSessionOutput> {
    try {
      // Mappatura degli OrderItem negli elementi di riga per Stripe
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        input.items.map((item) => ({
          price_data: {
            currency: input.order.currency.toLowerCase(),
            product_data: {
              name: item.course_title_snapshot,
              metadata: {
                course_id: item.course_id,
              },
            },
            // Stripe richiede l'importo espresso in centesimi
            unit_amount: Math.round(item.unit_price * 100),
          },
          quantity: item.quantity,
        }));

      // Calcolo della scadenza della sessione (in secondi Unix Timestamp)
      const expireMinutes = input.expiresInMinutes || 30;
      const expiresAt = Math.floor(Date.now() / 1000) + expireMinutes * 60;

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: input.customerEmail,
        line_items: lineItems,
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        expires_at: expiresAt,
        client_reference_id: input.order.id,
        metadata: {
          order_id: input.order.id,
          order_number: input.order.order_number,
          profile_id: input.order.profile_id,
          cart_id: String(input.order.metadata.cart_id ?? ""),
        },
      });

      if (!session.url) {
        throw new Error("Stripe non ha restituito un URL di checkout valido.");
      }

      return {
        sessionId: session.id,
        checkoutUrl: session.url,
        providerOrderId: session.payment_intent as string | undefined,
        rawResponse: session as unknown as Record<string, unknown>,
      };
    } catch (error) {
      logger.error(
        "[StripeGatewayAdapter] Errore durante la creazione della sessione Stripe",
        { error },
      );
      throw error;
    }
  }

  /**
   * Valida la firma del webhook Stripe e costruisce l'evento tipizzato
   */
  public async constructWebhookEvent(
    rawBody: string | Buffer,
    signature: string,
  ): Promise<WebhookEventPayload> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET non definita nel file di configurazione .env",
      );
    }

    try {
      const stripeEvent = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );

      return {
        id: stripeEvent.id,
        type: stripeEvent.type,
        provider: "STRIPE",
        data: stripeEvent.data.object as unknown as Record<string, unknown>,
        rawEvent: stripeEvent,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Firma webhook non valida";
      logger.error("[StripeGatewayAdapter] Validazione firma webhook fallita", {
        error: errorMessage,
      });
      throw new Error(`Firma Webhook non valida: ${errorMessage}`);
    }
  }
}
