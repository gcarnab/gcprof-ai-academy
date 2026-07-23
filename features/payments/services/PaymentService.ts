/**
 * GCPROF AI ACADEMY - SERVICE: PAYMENT SERVICE
 * File: features/payments/services/PaymentService.ts
 *
 * Servizio di orchestrazione principale per la gestione degli ordini,
 * l'elaborazione dei webhook e il fulfillment dei corsi.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { CouponService } from "./CouponService";
import { OrderStatusEnum, PaymentStatusEnum } from "../types/paymentTypes";
import { logger } from "@/lib/logger";

export class PaymentService {
  private couponService: CouponService;

  constructor(private supabase: SupabaseClient) {
    this.couponService = new CouponService(supabase);
  }

  /**
   * Elabora l'evento Webhook ricevuto ed eseguito tramite StripeGatewayAdapter.
   */
  public async processWebhookEvent(event: {
    id: string;
    type: string;
    data: Record<string, unknown>;
  }): Promise<void> {
    const dataObject = (
      typeof event.data?.object === "object" && event.data.object !== null
        ? event.data.object
        : event.data
    ) as Record<string, unknown>;

    // 1. Logga l'evento nel database
    await this.logWebhookEvent(event.id, event.type, dataObject);

    // 2. Dispatch in base al tipo di evento
    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutSessionCompleted(event.id, dataObject);
        break;

      case "payment_intent.payment_failed":
        await this.handlePaymentFailed(event.id, dataObject);
        break;

      default:
        logger.info("[PaymentService] Evento non gestito o ignorato", {
          eventId: event.id,
          eventType: event.type,
        });
    }
  }

  /**
   * Gestisce l'evasione dell'ordine e l'iscrizione ai corsi.
   */
  private async handleCheckoutSessionCompleted(
    eventId: string,
    session: Record<string, unknown>,
  ): Promise<void> {
    const metadata = (session.metadata as Record<string, string>) || {};
    const orderId = metadata.order_id;
    const profileId = metadata.profile_id;

    if (!orderId || !profileId) {
      logger.error("[PaymentService] Metadata mancanti nella sessione di checkout", {
        sessionId: session.id,
      });
      return;
    }

    // 1. Recupero ordine e voci d'ordine
    const { data: order, error: orderError } = await this.supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      logger.error("[PaymentService] Ordine non trovato", { orderId, error: orderError?.message });
      return;
    }

    // Protezione Idempotenza: se già pagato o evaso, stop
    if (order.status === "PAID" || order.status === "FULFILLED") {
      logger.info("[PaymentService] Ordine già evaso in precedenza", { orderId });
      return;
    }

    const now = new Date().toISOString();
    const paymentIntentId =
      (session.payment_intent as string) || (session.id as string);

    // 2. Aggiorna la tabella `payments`
    await this.supabase
      .from("payments")
      .update({
        status: "CAPTURED" as PaymentStatusEnum,
        paid_at: now,
        provider_payment_id: paymentIntentId,
        raw_response: session,
        updated_at: now,
      })
      .eq("order_id", orderId);

    // 3. Riscatto Coupon (se presente nell'ordine)
    if (order.coupon_id) {
      try {
        await this.couponService.redeemCoupon(
          order.coupon_id,
          orderId,
          profileId,
        );
      } catch (err) {
        logger.error("[PaymentService] Errore durante il riscatto del coupon", {
          couponId: order.coupon_id,
          orderId,
          error: err,
        });
      }
    }

    // 4. Enrollment (Iscrizione utente ai corsi acquistati)
    const orderItems = order.order_items || [];
    for (const item of orderItems) {
      await this.enrollUser(profileId, item.course_id);
    }

    // 5. Aggiorna stato ordine a FULFILLED
    await this.supabase
      .from("orders")
      .update({
        status: "FULFILLED" as OrderStatusEnum,
        updated_at: now,
      })
      .eq("id", orderId);

    // 6. Svuota carrello attivo
    await this.clearActiveCart(profileId);

    // 7. Segna log come processato
    await this.markLogAsProcessed(eventId);

    logger.info("[PaymentService] Ordine e iscrizioni evasi con successo via Webhook", { orderId, profileId });
  }

  /**
   * Gestisce l'evento di pagamento fallito.
   */
  private async handlePaymentFailed(
    eventId: string,
    paymentIntent: Record<string, unknown>,
  ): Promise<void> {
    const metadata = (paymentIntent.metadata as Record<string, string>) || {};
    const orderId = metadata.order_id;
    if (!orderId) return;

    const lastError = paymentIntent.last_payment_error as
      | Record<string, string>
      | undefined;
    const failureReason =
      lastError?.message || "Pagamento rifiutato o non riuscito.";

    const now = new Date().toISOString();

    await this.supabase
      .from("payments")
      .update({
        status: "FAILED" as PaymentStatusEnum,
        failure_reason: failureReason,
        updated_at: now,
      })
      .eq("order_id", orderId);

    await this.supabase
      .from("orders")
      .update({
        status: "FAILED" as OrderStatusEnum,
        updated_at: now,
      })
      .eq("id", orderId);

    await this.markLogAsProcessed(eventId);

    logger.warn("[PaymentService] Pagamento fallito registrato", { orderId, failureReason });
  }

  /**
   * Iscrive l'utente al corso salvando il record in `enrollments`.
   */
  private async enrollUser(profileId: string, courseId: string): Promise<void> {
    const { error } = await this.supabase.from("enrollments").upsert(
      {
        profile_id: profileId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,course_id" },
    );

    if (error) {
      logger.error("[PaymentService] Errore iscrizione utente al corso", {
        profileId,
        courseId,
        error: error.message,
      });
    }
  }

  /**
   * Elimina gli elementi dal carrello attivo dell'utente dopo un acquisto con esito positivo.
   */
  private async clearActiveCart(profileId: string): Promise<void> {
    const { data: cart } = await this.supabase
      .from("shopping_carts")
      .select("id")
      .eq("profile_id", profileId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (cart) {
      await this.supabase
        .from("shopping_cart_items")
        .delete()
        .eq("cart_id", cart.id);
    }
  }

  private async logWebhookEvent(
    eventId: string,
    eventType: string,
    payload: Record<string, unknown>,
  ): Promise<void> {
    await this.supabase.from("payment_logs").insert({
      provider: "STRIPE",
      provider_event_id: eventId,
      event: eventType,
      payload: payload,
      processed: false,
    });
  }

  private async markLogAsProcessed(eventId: string): Promise<void> {
    await this.supabase
      .from("payment_logs")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("provider_event_id", eventId);
  }
}