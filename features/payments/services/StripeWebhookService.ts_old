/**
 * GCPROF AI ACADEMY - SERVICE: STRIPE WEBHOOK SERVICE
 * File: features/payments/services/StripeWebhookService.ts
 * 
 * Gestore degli eventi Webhook di Stripe per l'evasione automatica
 * degli ordini e l'iscrizione ai corsi.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { CouponService } from "./CouponService";
import { OrderStatusEnum, PaymentStatusEnum } from "../types/paymentTypes";

export class StripeWebhookService {
  private couponService: CouponService;

  constructor(
    private supabase: SupabaseClient,
    private stripe: Stripe,
    private webhookSecret: string
  ) {
    this.couponService = new CouponService(supabase);
  }

  /**
   * Processa un payload Webhook grezzo proveniente da Stripe.
   */
  public async handleWebhook(
    rawBody: string | Buffer,
    signature: string
  ): Promise<{ received: boolean; eventType: string }> {
    let event: Stripe.Event;

    // 1. Verifica la firma di sicurezza del Webhook Stripe
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.webhookSecret
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Firma non valida";
      console.error("[StripeWebhookService] Errore verifica firma Webhook:", errorMessage);
      throw new Error(`Webhook Error: ${errorMessage}`);
    }

    // 2. Registra l'evento nel log dei pagamenti
    await this.logWebhookEvent(event);

    // 3. Smistamento eventi
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.handleCheckoutSessionCompleted(session, event.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.handlePaymentFailed(paymentIntent, event.id);
        break;
      }

      default:
        console.log(`[StripeWebhookService] Evento ignorato: ${event.type}`);
    }

    return { received: true, eventType: event.type };
  }

  /**
   * Evasione dell'ordine a seguito del pagamento completato con successo.
   */
  private async handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session,
    eventId: string
  ): Promise<void> {
    const orderId = session.metadata?.order_id;
    const profileId = session.metadata?.profile_id;

    if (!orderId || !profileId) {
      console.error("[StripeWebhookService] Metadata mancanti nella sessione Checkout:", session.id);
      return;
    }

    // 1. Recupera l'ordine e i relativi articoli
    const { data: order, error: orderError } = await this.supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("[StripeWebhookService] Ordine non trovato:", orderId);
      return;
    }

    // Protezione contro elaborazioni duplicate (Idempotenza)
    if (order.status === "PAID" || order.status === "FULFILLED") {
      console.log(`[StripeWebhookService] Ordine ${orderId} già elaborato.`);
      return;
    }

    const now = new Date().toISOString();

    // 2. Aggiorna lo stato del pagamento nella tabella `payments`
    await this.supabase
      .from("payments")
      .update({
        status: "CAPTURED" as PaymentStatusEnum,
        paid_at: now,
        provider_payment_id: session.payment_intent as string || session.id,
        raw_response: session as unknown as Record<string, unknown>,
        updated_at: now,
      })
      .eq("order_id", orderId);

    // 3. Riscatta il coupon se applicato all'ordine
    if (order.coupon_id) {
      try {
        await this.couponService.redeemCoupon(order.coupon_id, orderId, profileId);
      } catch (err) {
        console.error("[StripeWebhookService] Errore riscatto coupon:", err);
      }
    }

    // 4. Effettua l'iscrizione (Enrollment) dell'utente ai corsi acquistati
    const orderItems = order.order_items || [];
    for (const item of orderItems) {
      await this.enrollUserInCourse(profileId, item.course_id);
    }

    // 5. Aggiorna lo stato dell'ordine a FULFILLED
    await this.supabase
      .from("orders")
      .update({
        status: "FULFILLED" as OrderStatusEnum,
        updated_at: now,
      })
      .eq("id", orderId);

    // 6. Svuota il carrello attivo dell'utente
    await this.clearUserCart(profileId);

    // 7. Segna il log dell'evento come processato
    await this.markLogProcessed(eventId);
  }

  /**
   * Gestione del fallimento di un pagamento.
   */
  private async handlePaymentFailed(
    paymentIntent: Stripe.PaymentIntent,
    eventId: string
  ): Promise<void> {
    const orderId = paymentIntent.metadata?.order_id;
    if (!orderId) return;

    const failureReason = paymentIntent.last_payment_error?.message || "Pagamento fallito";

    await this.supabase
      .from("payments")
      .update({
        status: "FAILED" as PaymentStatusEnum,
        failure_reason: failureReason,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId);

    await this.supabase
      .from("orders")
      .update({
        status: "FAILED" as OrderStatusEnum,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    await this.markLogProcessed(eventId);
  }

  /**
   * Iscrive l'utente al corso acquistato nella tabella `enrollments`.
   */
  private async enrollUserInCourse(profileId: string, courseId: string): Promise<void> {
    const { error } = await this.supabase
      .from("enrollments")
      .upsert(
        {
          profile_id: profileId,
          course_id: courseId,
          enrolled_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,course_id" }
      );

    if (error) {
      console.error(`[StripeWebhookService] Errore iscrizione utente ${profileId} al corso ${courseId}:`, error);
    }
  }

  /**
   * Resetta lo stato del carrello dell'utente dopo il completamento.
   */
  private async clearUserCart(profileId: string): Promise<void> {
    const { data: cart } = await this.supabase
      .from("shopping_carts")
      .select("id")
      .eq("profile_id", profileId)
      .eq("status", "ACTIVE")
      .single();

    if (cart) {
      await this.supabase
        .from("shopping_cart_items")
        .delete()
        .eq("cart_id", cart.id);
    }
  }

  /**
   * Salva l'evento arrivato nel registro `payment_logs`.
   */
  private async logWebhookEvent(event: Stripe.Event): Promise<void> {
    await this.supabase.from("payment_logs").insert({
      provider: "STRIPE",
      provider_event_id: event.id,
      event: event.type,
      payload: event as unknown as Record<string, unknown>,
      processed: false,
    });
  }

  /**
   * Aggiorna lo stato di elaborazione del log.
   */
  private async markLogProcessed(eventId: string): Promise<void> {
    await this.supabase
      .from("payment_logs")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("provider_event_id", eventId);
  }
}