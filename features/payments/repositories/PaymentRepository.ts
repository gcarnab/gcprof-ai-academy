/**
 * GCPROF AI ACADEMY
 * File: features/payments/repositories/PaymentRepository.ts
 *
 * Repository della feature Payments.
 * Incapsula tutte le query verso Supabase utilizzate dalla Dashboard.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import {
  LatestOrderDTO,
  RevenuePointDTO,
} from "../dto/PaymentDashboardDTO";

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
   * Recupera i KPI principali della dashboard Payments.
   */
  async getOverview(): Promise<PaymentOverviewData> {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    // -----------------------------
    // ORDINI
    // -----------------------------
    const { data: orders, error: ordersError } = await this.supabase
      .from("orders")
      .select("status,total,created_at");

    if (ordersError) {
      throw new Error(ordersError.message);
    }

    const totalOrders = orders?.length ?? 0;

    const paidOrders =
      orders?.filter((o) => o.status === "PAID" || o.status === "FULFILLED")
        .length ?? 0;

    const refundedOrders =
      orders?.filter((o) => o.status === "REFUNDED").length ?? 0;

    const totalRevenue =
      orders
        ?.filter((o) => o.status === "PAID" || o.status === "FULFILLED")
        .reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

    const monthlyRevenue =
      orders
        ?.filter(
          (o) =>
            (o.status === "PAID" || o.status === "FULFILLED") &&
            new Date(o.created_at) >= monthStart,
        )
        .reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

    // -----------------------------
    // CARRELLI ABBANDONATI
    // -----------------------------
    const { count: abandonedCarts, error: cartError } = await this.supabase
      .from("shopping_carts")
      .select("*", { count: "exact", head: true })
      .eq("status", "ABANDONED");

    if (cartError) {
      throw new Error(cartError.message);
    }

    // -----------------------------
    // STUDENTI
    // -----------------------------
    const { count: activeStudents, error: profileError } = await this.supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .in("role", ["student", "external_student"]);

    if (profileError) {
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
        `,
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
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
        `,
      )
      .ilike("order_number", `%${search}%`)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (orders ?? []).map((order: any) => this.mapLatestOrder(order));
  }

  /**
   * Ordini filtrati per stato.
   */
  async getOrdersByStatus(status: string): Promise<LatestOrderDTO[]> {
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
        `,
      )
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (orders ?? []).map((order: any) => this.mapLatestOrder(order));
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
        `,
      )
      .eq("id", orderId)
      .single();

    if (error) {
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
      .select("total,status,created_at")
      .gte("created_at", startDate.toISOString());

    if (error) {
      throw new Error(error.message);
    }

    const map = new Map<string, number>();

    for (const order of data ?? []) {
      if (order.status !== "PAID" && order.status !== "FULFILLED") {
        continue;
      }

      const day = new Date(order.created_at).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
      });

      map.set(day, (map.get(day) ?? 0) + Number(order.total));
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
      "Utente";

    return {
      id: order.id,
      orderNumber: order.order_number,
      customerName,
      total: Number(order.total),
      currency: order.currency,
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