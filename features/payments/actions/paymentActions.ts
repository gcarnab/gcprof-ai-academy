"use server";

/**
 * GCPROF AI ACADEMY - SERVER ACTIONS: PAYMENTS
 * File: features/payments/actions/paymentActions.ts
 *
 * Server Actions per la gestione del carrello e l'avvio del checkout.
 * Verificano l'autenticazione lato server via cookie JWT, la feature flag ed eseguono i servizi di dominio.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";
import { CartService } from "../services/CartService";
import { CheckoutService } from "../services/CheckoutService";
import { PaymentGatewayFactory } from "../factories/PaymentGatewayFactory";
import { PAYMENTS_CONFIG } from "../constants/paymentConstants";
import { CartSummaryDTO, CheckoutSessionResult } from "../types/paymentTypes";
import { EnrollmentService } from "../services/EnrollmentService";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key-change-me-in-production"
);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Type wrapper per standardizzare le risposte delle Server Actions
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Helper interno per recuperare l'utente autenticato dal cookie JWT 'auth_token'.
 */
async function getAuthenticatedUser(): Promise<{ id: string; email?: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload || !payload.id) {
      return null;
    }

    return {
      id: payload.id as string,
      email: (payload.email as string) || "",
    };
  } catch (error) {
    console.error("[getAuthenticatedUser] Errore di verifica JWT:", error);
    return null;
  }
}

/**
 * Recupera il riepilogo del carrello per l'utente autenticato corrente.
 */
export async function getCartSummaryAction(): Promise<
  ActionResult<CartSummaryDTO>
> {
  try {
    if (!PAYMENTS_CONFIG.IS_ENABLED) {
      return {
        success: false,
        error: "Il modulo pagamenti non è attualmente abilitato.",
      };
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      return { success: false, error: "Utente non autenticato." };
    }

    const cartService = new CartService(supabase);
    const summary = await cartService.getCartSummary(user.id);

    return { success: true, data: summary };
  } catch (error) {
    console.error("[getCartSummaryAction] Errore:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante il recupero del carrello.",
    };
  }
}

/**
 * Aggiunge un corso al carrello dell'utente autenticato.
 */
export async function addToCartAction(
  courseId: string
): Promise<ActionResult<CartSummaryDTO>> {
  try {
    if (!PAYMENTS_CONFIG.IS_ENABLED) {
      return {
        success: false,
        error: "Il modulo pagamenti non è attualmente abilitato.",
      };
    }

    if (!courseId) {
      return { success: false, error: "ID corso non valido." };
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        error: "Devi effettuare l'accesso per aggiungere corsi al carrello.",
      };
    }

    const cartService = new CartService(supabase);
    const updatedCart = await cartService.addToCart(user.id, courseId);

    return { success: true, data: updatedCart };
  } catch (error) {
    console.error("[addToCartAction] Errore:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante l'aggiunta al carrello.",
    };
  }
}

/**
 * Rimuove un corso dal carrello dell'utente autenticato.
 */
export async function removeFromCartAction(
  courseId: string
): Promise<ActionResult<CartSummaryDTO>> {
  try {
    if (!PAYMENTS_CONFIG.IS_ENABLED) {
      return {
        success: false,
        error: "Il modulo pagamenti non è attualmente abilitato.",
      };
    }

    if (!courseId) {
      return { success: false, error: "ID corso non valido." };
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      return { success: false, error: "Utente non autenticato." };
    }

    const cartService = new CartService(supabase);
    const updatedCart = await cartService.removeFromCart(user.id, courseId);

    return { success: true, data: updatedCart };
  } catch (error) {
    console.error("[removeFromCartAction] Errore:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante la rimozione dal carrello.",
    };
  }
}

/**
 * Inizia il processo di checkout creando un ordine e restituendo l'URL di reindirizzamento Stripe.
 */
export async function createCheckoutSessionAction(): Promise<
  ActionResult<CheckoutSessionResult>
> {
  try {
    if (!PAYMENTS_CONFIG.IS_ENABLED) {
      return {
        success: false,
        error: "Il modulo pagamenti non è attualmente abilitato.",
      };
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        error: "Devi effettuare l'accesso per procedere al pagamento.",
      };
    }

    const gatewayAdapter = PaymentGatewayFactory.create();
    const checkoutService = new CheckoutService(supabase, gatewayAdapter);

    const result = await checkoutService.createCheckoutSession(
      user.id,
      user.email || ""
    );

    return { success: true, data: result };
  } catch (error) {
    console.error("[createCheckoutSessionAction] Errore:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante l'avvio del checkout.",
    };
  }
}

/**
 * Iscrive gratuitamente l'utente autenticato a un corso.
 */
export async function enrollInFreeCourseAction(
  courseId: string
): Promise<ActionResult<void>> {
  try {
    if (!courseId) {
      return { success: false, error: "ID corso non valido." };
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        error: "Devi effettuare l'accesso per iscriverti a questo corso.",
      };
    }

    // Usiamo il client Supabase con Service Role già presente nel file per superare eventuali blocchi RLS
    const enrollmentService = new EnrollmentService(supabase);
    await enrollmentService.enrollUserInCourses(user.id, [courseId]);

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[enrollInFreeCourseAction] Errore:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante l'iscrizione al corso.",
    };
  }
}