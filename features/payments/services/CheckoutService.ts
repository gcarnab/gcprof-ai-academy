/**
 * GCPROF AI ACADEMY - SERVICE: CHECKOUT SERVICE
 * File: features/payments/services/CheckoutService.ts
 *
 * Gestisce l'orchestrazione del checkout:
 * - Per carrelli > 0€: reindirizza su Stripe Checkout.
 * - Per carrelli = 0€: effettua il bypass, crea l'ordine FULFILLED,
 *   sblocca il corso ed elimina TASSATIVAMENTE gli elementi dal carrello.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { StripeGatewayAdapter } from "../adapters/stripe/StripeGatewayAdapter";
import { OrderItem, OrderStatusEnum, PaymentStatusEnum } from "../types/paymentTypes";
import { PAYMENTS_CONFIG, PAYMENT_ROUTES } from "../constants/paymentConstants";
import { logger } from "@/lib/logger";
import { IPaymentGateway } from "../ports/IPaymentGateway";

export interface CheckoutResult {
  order_id: string;
  order_number: string;
  checkout_url: string;
  is_free: boolean;
  session_id: string;
}

export class CheckoutService {
  constructor(
    private supabase: SupabaseClient,
    private stripeGateway: IPaymentGateway | StripeGatewayAdapter
  ) {}

  /**
   * Avvia il flusso di checkout per il carrello attivo dell'utente.
   */
  public async createCheckoutSession(
    profileId: string,
    customerEmail: string
  ): Promise<CheckoutResult> {
    logger.info("[CheckoutService] Avvio creazione sessione di checkout", { profileId, customerEmail });

    // 1. Recupera il carrello attivo con i relativi elementi
    const { data: cart, error: cartError } = await this.supabase
      .from("shopping_carts")
      .select("id, shopping_cart_items(*, courses(id, title, price))")
      .eq("profile_id", profileId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (cartError || !cart || !cart.shopping_cart_items || cart.shopping_cart_items.length === 0) {
      logger.warn("[CheckoutService] Tentativo di checkout con carrello vuoto o non trovato", { profileId });
      throw new Error("Il carrello è vuoto. Aggiungi un corso prima di procedere al checkout.");
    }

    const items = cart.shopping_cart_items;
    
    // Calcolo del totale
    const subtotal = items.reduce((acc: number, item: any) => {
      const unitPrice = Number(item.unit_price ?? item.courses?.price ?? 0);
      return acc + unitPrice * (item.quantity || 1);
    }, 0);

    const isFreeCheckout = subtotal === 0;
    const now = new Date().toISOString();
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 2. Creazione dell'ordine nel database
    const initialOrderStatus: OrderStatusEnum = isFreeCheckout ? "FULFILLED" : "CHECKOUT_CREATED";

    const { data: order, error: orderError } = await this.supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        profile_id: profileId,
        status: initialOrderStatus,
        subtotal: subtotal,
        discount: 0,
        tax: 0,
        total: subtotal,
        currency: PAYMENTS_CONFIG.DEFAULT_CURRENCY,
        payment_provider: PAYMENTS_CONFIG.DEFAULT_PROVIDER,
        metadata: {
          cart_id: cart.id,
          customer_email: customerEmail,
          is_free_checkout: isFreeCheckout,
        },
      })
      .select("*")
      .single();

    if (orderError || !order) {
      logger.error("[CheckoutService] Impossibile creare l'ordine nel database", { error: orderError?.message });
      throw new Error("Errore durante la creazione dell'ordine.");
    }

    // 3. Inserimento degli Order Items (utilizzando 'line_total' per lo schema DB di Supabase)
    const orderItemsPayload = items.map((item: any) => {
      const unitPrice = Number(item.unit_price ?? item.courses?.price ?? 0);
      const qty = item.quantity || 1;
      return {
        order_id: order.id,
        course_id: item.course_id,
        course_title_snapshot: item.courses?.title || "Corso Academy",
        unit_price: unitPrice,
        quantity: qty,
        line_total: unitPrice * qty, // <-- Nome colonna corretto per il DB
      };
    });

    const { data: insertedOrderItems, error: itemsError } = await this.supabase
      .from("order_items")
      .insert(orderItemsPayload)
      .select("*");

    if (itemsError) {
      logger.error("[CheckoutService] Errore durante il salvataggio dei dettagli ordine", { error: itemsError.message });
      throw new Error("Impossibile registrare i dettagli dell'ordine.");
    }

    // Mappatura sicura su tipo OrderItem[] per soddisfare le interfacce Gateway
    const orderItems: OrderItem[] = (insertedOrderItems && insertedOrderItems.length > 0
      ? insertedOrderItems
      : orderItemsPayload
    ).map((item: any, index: number) => {
      const calculatedTotal = Number(item.line_total ?? item.total_price ?? 0);
      return {
        id: item.id || `item_${order.id}_${index}`,
        order_id: item.order_id || order.id,
        course_id: item.course_id,
        course_title_snapshot: item.course_title_snapshot || "Corso Academy",
        unit_price: Number(item.unit_price ?? 0),
        quantity: Number(item.quantity ?? 1),
        line_total: calculatedTotal,
        total_price: calculatedTotal,
        metadata: item.metadata ?? {},
        created_at: item.created_at ?? now,
      };
    });

    // ------------------------------------------------------------------------
    // CASE A: CHECKOUT A 0€ (BYPASS STRIPE & SVUOTAMENTO CARRELLO)
    // ------------------------------------------------------------------------
    if (isFreeCheckout) {
      logger.info("[CheckoutService] Rilevato checkout a 0€. Esecuzione evasione immediata e svuotamento carrello.", {
        orderId: order.id,
      });

      // A1. Registra pagamento a 0€
      await this.supabase.from("payments").insert({
        order_id: order.id,
        amount: 0.00,
        currency: PAYMENTS_CONFIG.DEFAULT_CURRENCY,
        status: "CAPTURED" as PaymentStatusEnum,
        provider: PAYMENTS_CONFIG.DEFAULT_PROVIDER,
        provider_payment_id: `free_perm_${order.id}`,
        paid_at: now,
      });

      // A2. Iscrizione dell'utente ai corsi acquistati
      for (const item of items) {
        await this.supabase.from("profile_courses").upsert(
          {
            profile_id: profileId,
            course_id: item.course_id,
            status: "ACTIVE",
            enrolled_at: now,
            updated_at: now,
          },
          { onConflict: "profile_id,course_id" }
        );
      }

      // A3. SVUOTAMENTO TASSATIVO DEL CARRELLO
      await this.clearCart(cart.id, profileId);

      const freeSessionId = `free_session_${order.id}`;
      const redirectUrl = `${PAYMENT_ROUTES.SUCCESS_URL.replace("{CHECKOUT_SESSION_ID}", freeSessionId)}&order_id=${order.id}&is_free=true`;

      return {
        order_id: order.id,
        order_number: orderNumber,
        checkout_url: redirectUrl,
        is_free: true,
        session_id: freeSessionId,
      };
    }

    // ------------------------------------------------------------------------
    // CASE B: CHECKOUT A PAGAMENTO (> 0€)
    // ------------------------------------------------------------------------
    const stripeSession = await this.stripeGateway.createCheckoutSession({
      order: order,
      items: orderItems,
      customerEmail: customerEmail,
      successUrl: PAYMENT_ROUTES.SUCCESS_URL,
      cancelUrl: PAYMENT_ROUTES.CANCEL_URL,
    });

    return {
      order_id: order.id,
      order_number: orderNumber,
      checkout_url: stripeSession.checkoutUrl,
      is_free: false,
      session_id: stripeSession.sessionId,
    };
  }

  /**
   * Elimina definitivamente tutti gli elementi dal carrello dell'utente.
   */
  private async clearCart(cartId: string, profileId: string): Promise<void> {
    try {
      // Elimina tutti gli items associati al cartId
      await this.supabase
        .from("shopping_cart_items")
        .delete()
        .eq("cart_id", cartId);

      // Sicurezza aggiuntiva: pulisce qualsiasi elemento associato a carrelli ACTIVE dell'utente
      const { data: activeCarts } = await this.supabase
        .from("shopping_carts")
        .select("id")
        .eq("profile_id", profileId);

      if (activeCarts && activeCarts.length > 0) {
        const ids = activeCarts.map((c) => c.id);
        await this.supabase
          .from("shopping_cart_items")
          .delete()
          .in("cart_id", ids);
      }

      logger.info("[CheckoutService] Carrello svuotato con successo", { cartId, profileId });
    } catch (err) {
      logger.error("[CheckoutService] Errore durante lo svuotamento del carrello", { cartId, profileId, err });
    }
  }
}