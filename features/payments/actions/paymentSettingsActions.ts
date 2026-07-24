"use server";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/actions/paymentSettingsActions.ts
 *
 * Server Actions per la gestione delle impostazioni dei pagamenti.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

import { PaymentSettings } from "../types/paymentTypes";
import { PaymentSettingsRepository } from "../repositories/PaymentSettingsRepository";
import { PaymentSettingsService } from "../services/PaymentSettingsService";

// -----------------------------------------------------------------------------
// Configurazione Ambiente & Clients
// -----------------------------------------------------------------------------

const jwtSecretValue = process.env.JWT_SECRET;

if (!jwtSecretValue) {
  logger.error("[paymentSettingsActions] JWT_SECRET non configurata.");
}

const JWT_SECRET = new TextEncoder().encode(jwtSecretValue || "");

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  logger.error(
    "[paymentSettingsActions] Configurazione Supabase mancante."
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
// Controllo Autorizzazioni
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
    throw new Error("Operazione non autorizzata.");
  }

  return payload;
}

// -----------------------------------------------------------------------------
// Server Actions
// -----------------------------------------------------------------------------

export async function getPaymentSettingsAction() {
  try {
    logger.info(
      "[getPaymentSettingsAction] Recupero configurazione pagamenti"
    );

    await ensureAdmin();

    const repository = new PaymentSettingsRepository(supabase);
    const service = new PaymentSettingsService(repository);

    const settings = await service.getSettings();

    return {
      success: true,
      data: settings,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    logger.error("[getPaymentSettingsAction] Errore", {
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage || "Errore imprevisto.",
    };
  }
}

export async function updatePaymentSettingsAction(
  settings: Partial<PaymentSettings>
) {
  try {
    logger.info(
      "[updatePaymentSettingsAction] Aggiornamento configurazione"
    );

    await ensureAdmin();

    const repository = new PaymentSettingsRepository(supabase);
    const service = new PaymentSettingsService(repository);

    const updated = await service.updateSettings(settings);

    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    logger.error("[updatePaymentSettingsAction] Errore", {
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage || "Errore imprevisto.",
    };
  }
}