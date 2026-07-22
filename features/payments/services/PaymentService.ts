/**
 * GCPROF AI ACADEMY - SERVICE: PAYMENT SERVICE
 * File: features/payments/services/PaymentService.ts
 * 
 * Servizio di dominio per la gestione e l'elaborazione delle transazioni e dei Webhook.
 * Registra i log in payment_logs per idempotenza e audit, aggiorna lo stato dei pagamenti,
 * innesca l'evasione dell'ordine ed effettua la pulizia del carrello.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { WebhookEventPayload } from "../ports/IPaymentGateway";
import { EnrollmentService } from "./EnrollmentService";
import { CartService } from "./CartService";
import { PaymentStatusEnum } from "../types/paymentTypes";

export class PaymentService {
  private enrollmentService: EnrollmentService;
  private cartService: CartService;

  constructor(private supabase: SupabaseClient) {
    this.enrollmentService = new EnrollmentService(supabase);
    this.cartService = new CartService(supabase);
  }

  /**
   * Registra il log grezzo del webhook nel database per audit trail.
   */
  public async logWebhookEvent(event: WebhookEventPayload): Promise<string> {
    const { data, error } = await this.supabase
      .from("payment_logs")
      .insert({
        provider: event.provider,
        provider_event_id: event.id,
        event: event.type,
        payload: event.data,
        processed: false,
      })
      .select("id")
      .single();

    if (error) {
      // Se il log esiste già (duplicate key), lanciamo un errore per bloccare l'elaborazione duplicata
      if (error.code === "23505") {
        console.warn(`[PaymentService.logWebhookEvent] Webhook duplicato già registrato: ${event.id}`);
        throw new Error(`Event ${event.id} already processed.`);
      }
      console.error("[PaymentService.logWebhookEvent] Errore inserimento log:", error);
      throw error;
    }

    return data.id;
  }

  /**
   * Elabora l'evento proveniente dal webhook del provider di pagamento.
   */
  public async processWebhookEvent(event: WebhookEventPayload): Promise<void> {
    // 1. Registra l'evento per tracciamento ed evita elaborazioni duplicate
    let logId: string;
    try {
      logId = await this.logWebhookEvent(event);
    } catch (err) {
      // Se l'evento è già stato inserito, interrompiamo l'esecuzione in sicurezza per idempotenza
      return;
    }

    try {
      // 2. Gestione degli eventi specifici di Stripe
      switch (event.type) {
        case "checkout.session.completed":
          await this.handleCheckoutSessionCompleted(event.data);
          break;

        case "payment_intent.payment_failed":
          await this.handlePaymentFailed(event.data);
          break;

        default:
          console.log(`[PaymentService] Evento webhook ignorato: ${event.type}`);
          break;
      }

      // 3. Contrassegna il log come elaborato con successo
      await this.supabase
        .from("payment_logs")
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
        })
        .eq("id", logId);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
      console.error(`[PaymentService] Errore durante l'elaborazione del webhook (${event.id}):`, errorMessage);

      // Registra l'errore nel record di audit
      await this.supabase
        .from("payment_logs")
        .update({
          processed: false,
          error: errorMessage,
        })
        .eq("id", logId);

      throw error;
    }
  }

  /**
   * Gestisce l'evento di successo 'checkout.session.completed'
   */
  private async handleCheckoutSessionCompleted(
    sessionData: Record<string, unknown>
  ): Promise<void> {
    const sessionId = sessionData.id as string;
    const metadata = (sessionData.metadata || {}) as Record<string, string>;
    const orderId = metadata.order_id;
    const cartId = metadata.cart_id;
    const paymentIntentId = sessionData.payment_intent as string | undefined;

    if (!orderId) {
      throw new Error(`Impossibile identificare order_id nei metadata della sessione Checkout: ${sessionId}`);
    }

    // 1. Aggiorna lo stato del pagamento nella tabella payments
    // Nota: Il trigger SQL 'trg_sync_order_status' aggiornerà automaticamente orders.status a 'PAID'
    const { error: paymentError } = await this.supabase
      .from("payments")
      .update({
        status: "CAPTURED" as PaymentStatusEnum,
        provider_payment_id: paymentIntentId || null,
        paid_at: new Date().toISOString(),
        raw_response: sessionData,
        updated_at: new Date().toISOString(),
      })
      .eq("provider_checkout_session_id", sessionId);

    if (paymentError) {
      console.error("[PaymentService.handleCheckoutSessionCompleted] Errore aggiornamento record payment:", paymentError);
      throw new Error(`Impossibile aggiornare il pagamento per la sessione ${sessionId}`);
    }

    // 2. Iscrive l'utente ai corsi ed imposta l'ordine su FULFILLED
    await this.enrollmentService.fulfillOrder(orderId);

    // 3. Svuota il carrello dell'utente se presente
    if (cartId) {
      try {
        await this.cartService.clearCart(cartId);
      } catch (cartErr) {
        console.warn("[PaymentService] Avviso: Impossibile svuotare il carrello dopo il pagamento:", cartErr);
      }
    }
  }

  /**
   * Gestisce il fallimento di un pagamento
   */
  private async handlePaymentFailed(
    paymentIntentData: Record<string, unknown>
  ): Promise<void> {
    const paymentIntentId = paymentIntentData.id as string;
    const lastError = paymentIntentData.last_payment_error as Record<string, unknown> | undefined;
    const failureReason = lastError?.message ? String(lastError.message) : "Pagamento rifiutato";

    // 1. Aggiorna il pagamento a FAILED
    const { data: updatedPayment, error } = await this.supabase
      .from("payments")
      .update({
        status: "FAILED" as PaymentStatusEnum,
        failure_reason: failureReason,
        raw_response: paymentIntentData,
        updated_at: new Date().toISOString(),
      })
      .eq("provider_payment_id", paymentIntentId)
      .select("order_id")
      .single();

    if (error) {
      console.error("[PaymentService.handlePaymentFailed] Errore aggiornamento payment:", error);
      return;
    }

    // 2. Aggiorna anche l'ordine corrispondente a FAILED
    if (updatedPayment?.order_id) {
      await this.supabase
        .from("orders")
        .update({
          status: "FAILED",
          updated_at: new Date().toISOString(),
        })
        .eq("id", updatedPayment.order_id);
    }
  }
}