"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

import { CheckoutService } from "@/features/payments/services/CheckoutService";
import { StripeGatewayAdapter } from "@/features/payments/adapters/stripe/StripeGatewayAdapter";
import { logger } from "@/lib/logger";

const jwtSecretValue = process.env.JWT_SECRET;
const JWT_SECRET = new TextEncoder().encode(jwtSecretValue || "");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(
  supabaseUrl || "",
  supabaseServiceKey || "",
  { auth: { persistSession: false, autoRefreshToken: false } }
);

/**
 * 1. Verifica se un utente ha accesso attivo al corso nel DB.
 */
export async function checkExternalCourseAccessAction(
  courseId: string,
  userId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from("profile_courses")
      .select("id, status")
      .eq("profile_id", userId)
      .eq("course_id", courseId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    return true;
  } catch (err) {
    logger.error("[checkExternalCourseAccessAction] Errore verifica accesso", { error: err });
    return false;
  }
}

/**
 * 2. Iscrizione a corso gratuito tramite Checkout Service (ordine 0€ e svuotamento carrello).
 */
export async function enrollFreeCourseAction(
  courseId: string
): Promise<{ success: boolean; redirectUrl?: string; error?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Sessione non trovata. Effettua il login." };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = (payload.sub || payload.id || payload.userId) as string;
    const userEmail = (payload.email as string) || "student@academy.com";

    // 1. Verifica che il corso esista e sia a €0
    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("id, price")
      .eq("id", courseId)
      .maybeSingle();

    if (!course || Number(course.price || 0) > 0) {
      return { success: false, error: "Corso non valido per l'iscrizione gratuita." };
    }

    // 2. Prepara il carrello attivo dell'utente
    let { data: cart } = await supabaseAdmin
      .from("shopping_carts")
      .select("id")
      .eq("profile_id", userId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (!cart) {
      const { data: newCart } = await supabaseAdmin
        .from("shopping_carts")
        .insert({ profile_id: userId, status: "ACTIVE" })
        .select("id")
        .single();
      cart = newCart;
    }

    // Svuota items residui e imposta il corso corrente
    if (cart) {
      await supabaseAdmin.from("shopping_cart_items").delete().eq("cart_id", cart.id);
      await supabaseAdmin.from("shopping_cart_items").insert({
        cart_id: cart.id,
        course_id: courseId,
        quantity: 1,
        unit_price: 0.00,
      });
    }

    // 3. Esegue il checkout (Crea Ordine FULFILLED + Paga 0€ + Sblocca Corso + SVUOTA CARRELLO)
    const stripeGateway = new StripeGatewayAdapter();
    const checkoutService = new CheckoutService(supabaseAdmin, stripeGateway);

    const checkoutResult = await checkoutService.createCheckoutSession(userId, userEmail);

    return {
      success: true,
      redirectUrl: checkoutResult.checkout_url,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Errore durante l'iscrizione.";
    logger.error("[enrollFreeCourseAction] Errore", { error: err });
    return { success: false, error: errorMessage };
  }
}