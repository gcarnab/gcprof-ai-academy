/**
 * GCPROF AI ACADEMY
 * File: features/payments/repositories/PaymentRepository.ts
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { LatestOrderDTO, RevenuePointDTO } from "../dto/PaymentDashboardDTO";
import { logger } from "@/lib/logger";

export interface PaymentOverviewData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  paidOrders: number;
  refundedOrders: number;
  abandonedCarts: number;
  activeStudents: number;
  conversionRate: number;
}

export class PaymentRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Helper interno: Verifica se un ordine è pagato (case-insensitive)
   */
  private isOrderPaid(status?: string): boolean {
    if (!status) return false;
    const s = status.toUpperCase();
    return s === "PAID" || s === "FULFILLED" || s === "COMPLETED";
  }

  /**
   * Helper interno: Verifica se un ordine è rimborsato (case-insensitive)
   */
  private isOrderRefunded(status?: string): boolean {
    if (!status) return false;
    return status.toUpperCase() === "REFUNDED";
  }

  /**
   * Recupera i KPI principali della dashboard Payments.
   */
  async getOverview(): Promise<PaymentOverviewData> {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const { data: orders, error: ordersError } = await this.supabase
      .from("orders")
      .select("status, total, created_at");

    if (ordersError) {
      logger.error("❌ [DB Repository Error - getOverview Orders]:", ordersError);
      throw new Error(ordersError.message);
    }

    const totalOrders = orders?.length ?? 0;

    const paidOrders =
      orders?.filter((o) => this.isOrderPaid(o.status)).length ?? 0;

    const refundedOrders =
      orders?.filter((o) => this.isOrderRefunded(o.status)).length ?? 0;

    const totalRevenue =
      orders
        ?.filter((o) => this.isOrderPaid(o.status))
        .reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

    const monthlyRevenue =
      orders
        ?.filter(
          (o) =>
            this.isOrderPaid(o.status) && new Date(o.created_at) >= monthStart
        )
        .reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

    let abandonedCarts = 0;
    try {
      const { count, error: cartError } = await this.supabase
        .from("shopping_carts")
        .select("*", { count: "exact", head: true })
        .eq("status", "ABANDONED");

      if (!cartError) {
        abandonedCarts = count ?? 0;
      }
    } catch (e) {
      logger.warn("⚠️ [DB Repository Warning - Cart]: Query carrelli saltata.", e);
    }

    const { count: activeStudents, error: profileError } = await this.supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .in("role", [
        "student",
        "external_student",
        "STUDENT",
        "EXTERNAL_STUDENT",
      ]);

    if (profileError) {
      logger.error("❌ [DB Repository Error - Profiles]:", profileError);
      throw new Error(profileError.message);
    }

    const conversionRate =
      totalOrders === 0
        ? 0
        : Number(((paidOrders / totalOrders) * 100).toFixed(2));

    return {
      totalRevenue,
      monthlyRevenue,
      totalOrders,
      paidOrders,
      refundedOrders,
      abandonedCarts: abandonedCarts ?? 0,
      activeStudents: activeStudents ?? 0,
      conversionRate,
    };
  }

  /**
   * Recupera gli ultimi ordini.
   */
  async getLatestOrders(limit = 10): Promise<LatestOrderDTO[]> {
    const { data: orders, error } = await this.supabase
      .from("orders")
      .select(
        `
          id,
          order_number,
          total,
          currency,
          status,
          created_at,
          profiles(
            display_name,
            first_name,
            last_name
          )
        `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("❌ [DB Repository Error - getLatestOrders]:", error);
      throw new Error(error.message);
    }

    return (orders ?? []).map((order: any) => this.mapLatestOrder(order));
  }

  /**
   * Ricerca ordini per codice ordine.
   */
  async searchOrders(search: string): Promise<LatestOrderDTO[]> {
    const { data: orders, error } = await this.supabase
      .from("orders")
      .select(
        `
          id,
          order_number,
          total,
          currency,
          status,
          created_at,
          profiles(
            display_name,
            first_name,
            last_name
          )
        `
      )
      .ilike("order_number", `%${search}%`)
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("❌ [DB Repository Error - searchOrders]:", error);
      throw new Error(error.message);
    }

    return (orders ?? []).map((order: any) => this.mapLatestOrder(order));
  }

  /**
   * Recupera gli ordini filtrati per stato.
   * ✅ Mappatura corretta per ENUM PostgreSQL (PAID include anche FULFILLED e COMPLETED)
   */
  async getOrdersByStatus(status: string): Promise<LatestOrderDTO[]> {
    try {
      const cleanStatus = status.toUpperCase();

      let query = this.supabase
        .from("orders")
        .select(
          `
          id,
          order_number,
          total,
          currency,
          status,
          created_at,
          profiles (
            first_name,
            last_name,
            display_name
          )
        `
        );

      // Gestione sinonimi di stato per la query DB
      if (cleanStatus === "PAID") {
        query = query.in("status", ["PAID", "FULFILLED", "COMPLETED"]);
      } else if (cleanStatus === "REFUNDED") {
        query = query.in("status", ["REFUNDED"]);
      } else if (cleanStatus === "PENDING") {
        query = query.in("status", ["PENDING"]);
      } else {
        query = query.eq("status", status);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        logger.error("❌ [DB Repository Error - getOrdersByStatus]:", error);
        throw error;
      }

      return (data || []).map((o: any) => this.mapLatestOrder(o));
    } catch (error) {
      logger.error("[PaymentRepository.getOrdersByStatus]", error);
      return [];
    }
  }

  /**
   * Dettaglio completo ordine per Drawer.
   */
  async getOrderDetails(orderId: string) {
    const { data: order, error } = await this.supabase
      .from("orders")
      .select(
        `
          *,
          profiles(*),
          order_items(*),
          payments(*)
        `
      )
      .eq("id", orderId)
      .single();

    if (error) {
      logger.error("❌ [DB Repository Error - getOrderDetails]:", error);
      throw new Error(error.message);
    }

    return order;
  }

  /**
   * Ricavi degli ultimi 30 giorni per grafico.
   */
  async getRevenueChart(): Promise<RevenuePointDTO[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);

    const { data, error } = await this.supabase
      .from("orders")
      .select("total, status, created_at")
      .gte("created_at", startDate.toISOString());

    if (error) {
      logger.error("❌ [DB Repository Error - getRevenueChart]:", error);
      throw new Error(error.message);
    }

    const map = new Map<string, number>();

    for (const order of data ?? []) {
      if (!this.isOrderPaid(order.status)) {
        continue;
      }

      const day = new Date(order.created_at).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
      });

      const amount = Number(order.total ?? 0);
      map.set(day, (map.get(day) ?? 0) + amount);
    }

    return [...map.entries()]
      .sort((a, b) => {
        const [da, ma] = a[0].split("/");
        const [db, mb] = b[0].split("/");

        const aa = Number(ma) * 100 + Number(da);
        const bb = Number(mb) * 100 + Number(db);

        return aa - bb;
      })
      .map(([label, revenue]) => this.mapRevenuePoint(label, revenue));
  }

  /**
   * Mapper ordine -> DTO.
   */
  private mapLatestOrder(order: any): LatestOrderDTO {
    const profile = Array.isArray(order.profiles)
      ? order.profiles[0]
      : order.profiles;

    const customerName =
      profile?.display_name ||
      [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
      "Utente Sconosciuto";

    return {
      id: order.id,
      orderNumber: order.order_number || order.id?.slice(0, 8),
      customerName,
      total: Number(order.total ?? 0),
      currency: order.currency || "EUR",
      status: order.status,
      createdAt: order.created_at,
    };
  }

  /**
   * Mapper punto grafico.
   */
  private mapRevenuePoint(label: string, revenue: number): RevenuePointDTO {
    return {
      label,
      revenue,
    };
  }
}