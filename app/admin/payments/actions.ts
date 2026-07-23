"use server";

import { requireAdminGuard } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function getAdminPaymentsOverviewAction() {
  // 1. Verifica che chi richiede i dati sia un vero Admin (tramite JoseTokenService)
  await requireAdminGuard();

  const supabaseAdmin = getSupabaseAdmin();

  // 2. Fetch parallela di tutte le tabelle utili per la Dashboard
  const [couponsRes, ordersRes, paymentsRes, settingsRes] = await Promise.all([
    supabaseAdmin
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false }),
    
    supabaseAdmin
      .from("orders")
      .select("*, profiles(first_name, last_name, email)")
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("payment_settings")
      .select("*")
      .maybeSingle(),
  ]);

  // Gestione errori centralizzata
  if (couponsRes.error) console.error("Errore Fetch Coupons:", couponsRes.error);
  if (ordersRes.error) console.error("Errore Fetch Orders:", ordersRes.error);
  if (paymentsRes.error) console.error("Errore Fetch Payments:", paymentsRes.error);

  return {
    coupons: couponsRes.data || [],
    orders: ordersRes.data || [],
    payments: paymentsRes.data || [],
    settings: settingsRes.data || null,
  };
}