"use server";

/**
 * GCPROF AI ACADEMY - SERVER ACTIONS: COURSE PRICING
 * File: features/payments/actions/coursePricingActions.ts
 *
 * Server Actions per la gestione del listino corsi e dei prezzi.
 * Protegge gli endpoint verificando il ruolo 'admin' dal cookie JWT 'auth_token'.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import { CoursePricingService } from "../services/CoursePricingService";
import { CoursePricing, UpdateCoursePricingDTO } from "../types/paymentTypes";

// -----------------------------------------------------------------------------
// Configurazione Ambiente & Client Supabase (Service Role per Admin)
// -----------------------------------------------------------------------------

const jwtSecretValue = process.env.JWT_SECRET;

if (!jwtSecretValue) {
  logger.error("[coursePricingActions] JWT_SECRET non configurata.");
}

const JWT_SECRET = new TextEncoder().encode(jwtSecretValue || "");

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  logger.error(
    "[coursePricingActions] Configurazione Supabase mancante."
  );
}

const supabase = createClient(
  supabaseUrl || "",
  supabaseServiceKey || "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// -----------------------------------------------------------------------------
// Controllo Autorizzazioni (Solo Admin)
// -----------------------------------------------------------------------------

async function ensureAdmin() {
  if (!jwtSecretValue) {
    throw new Error("JWT_SECRET non configurata.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Utente non autenticato.");
  }

  const { payload } = await jwtVerify(token, JWT_SECRET);

  if (payload.role !== "admin") {
    throw new Error("Operazione non autorizzata. Richiesti privilegi di Amministratore.");
  }

  return payload;
}

// -----------------------------------------------------------------------------
// Server Actions
// -----------------------------------------------------------------------------

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Recupera il listino completo dei corsi con i relativi parametri di prezzo e status commerciale.
 */
export async function getCoursePricingsAction(): Promise<ActionResult<CoursePricing[]>> {
  try {
    logger.info("[getCoursePricingsAction] Recupero listino corsi");

    await ensureAdmin();

    const service = new CoursePricingService(supabase);
    const pricings = await service.getAllCoursePricings();

    return {
      success: true,
      data: pricings,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    logger.error("[getCoursePricingsAction] Errore", {
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage || "Errore durante il recupero del listino corsi.",
    };
  }
}

/**
 * Aggiorna le impostazioni commerciali (prezzo, valuta, is_paid, stripe IDs) di un corso.
 */
export async function updateCoursePricingAction(
  courseId: string,
  dto: UpdateCoursePricingDTO
): Promise<ActionResult<CoursePricing>> {
  try {
    logger.info(`[updateCoursePricingAction] Aggiornamento prezzo per il corso ID: ${courseId}`);

    await ensureAdmin();

    if (!courseId) {
      return { success: false, error: "ID corso non valido." };
    }

    const service = new CoursePricingService(supabase);
    const updatedPricing = await service.updateCoursePricing(courseId, dto);

    return {
      success: true,
      data: updatedPricing,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    logger.error("[updateCoursePricingAction] Errore", {
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage || "Errore durante l'aggiornamento del prezzo del corso.",
    };
  }
}