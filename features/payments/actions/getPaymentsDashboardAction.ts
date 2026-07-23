"use server";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/actions/getPaymentsDashboardAction.ts
 *
 * Server Actions per la Dashboard Admin Pagamenti.
 * Bypassa le RLS usando la SUPABASE_SERVICE_ROLE_KEY dopo aver verificato il token JWT admin.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

import { PaymentDashboardService } from "../services/PaymentDashboardService";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { logger } from "@/lib/logger";

// 1. Validazione e lettura sicura delle variabili d'ambiente
const jwtSecretValue = process.env.JWT_SECRET;
if (!jwtSecretValue) {
  logger.error("[getPaymentsDashboardAction] JWT_SECRET non configurata nelle variabili d'ambiente.");
}
const JWT_SECRET = new TextEncoder().encode(jwtSecretValue || "");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  logger.error("[getPaymentsDashboardAction] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY non configurate nel file .env.");
}

// Istanza Supabase Admin (Bypassa RLS)
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

/**
 * Verificatore interno di autorizzazione Admin basato su cookie JWT custom
 */
async function ensureAdmin() {
  if (!jwtSecretValue) {
    throw new Error("Errore di configurazione del server: JWT_SECRET mancante.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  logger.info("[ensureAdmin] Verifica presenza cookie auth_token", { hasToken: !!token });

  if (!token) {
    logger.warn("[ensureAdmin] Token di autenticazione mancante nei cookie.");
    throw new Error("Utente non autenticato.");
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    logger.info("[ensureAdmin] Payload JWT decodificato", {
      userId: payload.sub,
      role: payload.role,
    });

    if (payload.role !== "admin") {
      logger.warn("[ensureAdmin] Accesso negato: il ruolo utente non è admin", { role: payload.role });
      throw new Error("Operazione non autorizzata.");
    }

    return payload;
  } catch (jwtErr) {
    logger.error("[ensureAdmin] Errore durante la verifica del token JWT", { error: jwtErr });
    throw jwtErr;
  }
}

export async function getPaymentDashboardOverviewAction() {
  try {
    logger.info("[getPaymentDashboardOverviewAction] Avvio recupero Overview Dashboard Pagamenti");

    await ensureAdmin();

    const repository = new PaymentRepository(supabase);
    const service = new PaymentDashboardService(repository);

    const overview = await service.getOverview();

    logger.info("[getPaymentDashboardOverviewAction] Dati Overview recuperati con successo", {
      totalRevenue: overview.totalRevenue,
      totalOrders: overview.totalOrders,
    });

    return {
      success: true,
      data: overview,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Errore durante il recupero della dashboard pagamenti.";

    logger.error("[getPaymentDashboardOverviewAction] Errore recupero overview", { error: errorMessage });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getLatestOrdersAction(limit = 10) {
  try {
    logger.info("[getLatestOrdersAction] Recupero ultimi ordini", { limit });

    await ensureAdmin();

    const repository = new PaymentRepository(supabase);
    const service = new PaymentDashboardService(repository);

    const orders = await service.getRecentOrders(limit);

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Errore durante il recupero degli ordini.";

    logger.error("[getLatestOrdersAction] Errore recupero ordini recenti", { error: errorMessage });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getSalesChartAction(days = 30) {
  try {
    logger.info("[getSalesChartAction] Recupero grafico vendite", { days });

    await ensureAdmin();

    const repository = new PaymentRepository(supabase);
    const service = new PaymentDashboardService(repository);

    const chart = await service.getMonthlyRevenue();

    return {
      success: true,
      data: chart,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Errore durante il recupero del grafico vendite.";

    logger.error("[getSalesChartAction] Errore recupero grafico vendite", { error: errorMessage });

    return {
      success: false,
      error: errorMessage,
    };
  }
}