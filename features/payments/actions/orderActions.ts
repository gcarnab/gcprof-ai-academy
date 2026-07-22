"use server";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/actions/orderActions.ts
 */

import { getSupabaseAdmin } from "@/lib/supabase";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { OrderDetailDTO } from "../dto/OrderDetailDTO";

/**
 * Recupera l'elenco filtrato degli ordini per la tabella.
 */
export async function getFilteredOrdersAction(search = "", status = "ALL") {
  try {
    const supabase = getSupabaseAdmin();
    const repository = new PaymentRepository(supabase);

    let orders;
    if (search.trim()) {
      orders = await repository.searchOrders(search.trim());
    } else if (status !== "ALL") {
      orders = await repository.getOrdersByStatus(status);
    } else {
      orders = await repository.getLatestOrders(50);
    }

    return { success: true, data: orders };
  } catch (error) {
    console.error("[getFilteredOrdersAction]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Errore nel recupero degli ordini.",
    };
  }
}

/**
 * Recupera il dettaglio completo di un singolo ordine per il Drawer.
 */
export async function getOrderDetailsAction(orderId: string) {
  try {
    const supabase = getSupabaseAdmin();
    const repository = new PaymentRepository(supabase);

    const rawOrder = await repository.getOrderDetails(orderId);
    if (!rawOrder) throw new Error("Ordine non trovato.");

    const profile = Array.isArray(rawOrder.profiles)
      ? rawOrder.profiles[0]
      : rawOrder.profiles;

    const customerName =
      profile?.display_name ||
      [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
      "Utente Sconosciuto";

    const payment = Array.isArray(rawOrder.payments)
      ? rawOrder.payments[0]
      : rawOrder.payments;

    const formattedDetail: OrderDetailDTO = {
      id: rawOrder.id,
      orderNumber: rawOrder.order_number,
      status: rawOrder.status,
      total: Number(rawOrder.total ?? 0),
      currency: rawOrder.currency ?? "EUR",
      createdAt: rawOrder.created_at,
      profileId: rawOrder.profile_id ?? "",
      customerName,
      customerEmail: profile?.email || "N/D",
      provider: payment?.provider || "stripe",
      providerCheckoutSessionId: rawOrder.provider_checkout_session_id,
      providerPaymentId: payment?.provider_payment_id,
      receiptUrl: payment?.receipt_url,
      couponCode: rawOrder.coupon_code,
      discountAmount: rawOrder.discount_amount ? Number(rawOrder.discount_amount) : 0,
      items: (rawOrder.order_items || []).map((item: any) => ({
        id: item.id,
        courseId: item.course_id,
        title: item.title || item.course_title || "Corso senza titolo",
        price: Number(item.price ?? 0),
      })),
    };

    return { success: true, data: formattedDetail };
  } catch (error) {
    console.error("[getOrderDetailsAction]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Errore durante il recupero del dettaglio ordine.",
    };
  }
}