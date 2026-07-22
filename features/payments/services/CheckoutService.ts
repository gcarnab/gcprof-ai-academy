/**
 * GCPROF AI ACADEMY - SERVICE: CHECKOUT SERVICE
 * File: features/payments/services/CheckoutService.ts
 * 
 * Servizio di dominio per l'orchestrazione del checkout.
 * Trasforma il carrello in un ordine economico immutabile con snapshot dei titoli
 * e invoca il gateway di pagamento astratto (IPaymentGateway).
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { IPaymentGateway } from "../ports/IPaymentGateway";
import { CartService } from "./CartService";
import { CheckoutSessionResult, Order, OrderItem } from "../types/paymentTypes";
import { PAYMENT_ROUTES } from "../constants/paymentConstants";

export class CheckoutService {
  private cartService: CartService;

  constructor(
    private supabase: SupabaseClient,
    private paymentGateway: IPaymentGateway
  ) {
    this.cartService = new CartService(supabase);
  }

  /**
   * Genera un ordine immutabile e crea la sessione di checkout remota sul provider.
   */
  public async createCheckoutSession(
    profileId: string,
    customerEmail: string
  ): Promise<CheckoutSessionResult> {
    // 1. Recupera il carrello attivo dell'utente
    const cartSummary = await this.cartService.getCartSummary(profileId);

    if (!cartSummary.items || cartSummary.items.length === 0) {
      throw new Error("Impossibile avviare il checkout: il carrello è vuoto.");
    }

    // 2. Crea il record primario dell'Ordine (Stato iniziale: PENDING)
    // Nota: order_number viene generato automaticamente dal trigger PostgreSQL
    const { data: orderData, error: orderError } = await this.supabase
      .from("orders")
      .insert({
        profile_id: profileId,
        status: "PENDING",
        subtotal: cartSummary.subtotal,
        discount: cartSummary.discount,
        tax: 0.00,
        total: cartSummary.total,
        currency: "EUR",
        payment_provider: this.paymentGateway.getProviderName(),
        metadata: {
          customer_email: customerEmail,
          cart_id: cartSummary.cart.id,
        },
      })
      .select()
      .single();

    if (orderError || !orderData) {
      console.error("[CheckoutService] Errore creazione ordine:", orderError);
      throw new Error("Impossibile creare l'ordine di acquisto.");
    }

    const order = orderData as Order;

    // 3. Prepara e inserisce gli Order Items (Snapshot dei corsi e dei prezzi)
    const orderItemsToInsert = cartSummary.items.map((item) => ({
      order_id: order.id,
      course_id: item.course_id,
      course_title_snapshot: item.course?.title || "Corso Academy",
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.unit_price * item.quantity,
      metadata: {
        image_url: item.course?.image_url || null,
      },
    }));

    const { data: itemsData, error: itemsError } = await this.supabase
      .from("order_items")
      .insert(orderItemsToInsert)
      .select();

    if (itemsError || !itemsData) {
      console.error("[CheckoutService] Errore inserimento order items:", itemsError);
      // Rollback logico dello stato dell'ordine
      await this.supabase.from("orders").update({ status: "FAILED" }).eq("id", order.id);
      throw new Error("Impossibile associare i corsi all'ordine.");
    }

    const orderItems = itemsData as OrderItem[];

    // 4. Invoca l'adattatore del Gateway di Pagamento
    let gatewaySession;
    try {
      gatewaySession = await this.paymentGateway.createCheckoutSession({
        order,
        items: orderItems,
        customerEmail,
        successUrl: PAYMENT_ROUTES.SUCCESS_URL,
        cancelUrl: PAYMENT_ROUTES.CANCEL_URL,
      });
    } catch (gatewayError) {
      console.error("[CheckoutService] Errore risposta Payment Gateway:", gatewayError);
      await this.supabase.from("orders").update({ status: "FAILED" }).eq("id", order.id);
      throw new Error("Impossibile comunicare con il gateway di pagamento.");
    }

    // 5. Aggiorna lo stato dell'ordine a CHECKOUT_CREATED
    await this.supabase
      .from("orders")
      .update({
        status: "CHECKOUT_CREATED",
        payment_provider_order_id: gatewaySession.providerOrderId || null,
      })
      .eq("id", order.id);

    // 6. Registra il record di tracciamento iniziale nella tabella payments
    const { error: paymentError } = await this.supabase
      .from("payments")
      .insert({
        order_id: order.id,
        provider: this.paymentGateway.getProviderName(),
        provider_checkout_session_id: gatewaySession.sessionId,
        provider_payment_id: gatewaySession.providerOrderId || null,
        status: "CREATED",
        amount: order.total,
        currency: order.currency,
        raw_response: gatewaySession.rawResponse,
      });

    if (paymentError) {
      console.warn("[CheckoutService] Avviso: Impossibile registrare la transazione iniziale in payments:", paymentError);
      // Non blocchiamo il redirect dell'utente poiché l'ordine e la sessione Stripe esistono già
    }

    return {
      order_id: order.id,
      order_number: order.order_number,
      checkout_url: gatewaySession.checkoutUrl,
      session_id: gatewaySession.sessionId,
    };
  }
}