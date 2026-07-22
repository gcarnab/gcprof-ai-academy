"use server";

/**
 * GCPROF AI ACADEMY
 * Payment Dashboard Server Actions
 *
 * Espone i dati del modulo Payments alla Dashboard Admin.
 */

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

import { PaymentDashboardService } from "../services/PaymentDashboardService";
import { PaymentRepository } from "../repositories/PaymentRepository";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key-change-me-in-production",
);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function ensureAdmin() {
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

export async function getPaymentDashboardOverviewAction() {
  try {
    await ensureAdmin();

    const repository = new PaymentRepository(supabase);

    const service = new PaymentDashboardService(repository);

    const overview = await service.getOverview();

    return {
      success: true,
      data: overview,
    };
  } catch (error) {
    console.error("[getPaymentDashboardOverviewAction]", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante il recupero della dashboard pagamenti.",
    };
  }
}

export async function getLatestOrdersAction(limit = 10) {
  try {
    await ensureAdmin();

    const repository = new PaymentRepository(supabase);

    const service = new PaymentDashboardService(repository);

    const orders = await service.getRecentOrders(limit);

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    console.error("[getLatestOrdersAction]", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante il recupero degli ordini.",
    };
  }
}

export async function getSalesChartAction(days = 30) {
  try {
    await ensureAdmin();

    const repository = new PaymentRepository(supabase);

    const service = new PaymentDashboardService(repository);

    const chart = await service.getMonthlyRevenue();

    return {
      success: true,
      data: chart,
    };
  } catch (error) {
    console.error("[getSalesChartAction]", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Errore durante il recupero del grafico vendite.",
    };
  }
}
