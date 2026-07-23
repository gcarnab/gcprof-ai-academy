/**
 * GCPROF AI ACADEMY
 * File: features/payments/services/PaymentDashboardService.ts
 *
 * Service di dominio della Dashboard Payments.
 * Coordina il repository e prepara i dati per la UI.
 */

import { PaymentRepository } from "../repositories/PaymentRepository";
import {
  PaymentDashboardDTO,
  LatestOrderDTO,
} from "../dto/PaymentDashboardDTO";

export class PaymentDashboardService {
  constructor(private readonly repository: PaymentRepository) {}

  /**
   * Restituisce il DTO completo aggregando KPI, grafico e ultimi ordini.
   */
  async getOverview(): Promise<PaymentDashboardDTO> {
    try {
      const [overviewData, revenueChart, latestOrders] = await Promise.all([
        this.repository.getOverview(),
        this.repository.getRevenueChart(),
        this.repository.getLatestOrders(10),
      ]);

      return {
        ...overviewData,
        revenueChart,
        latestOrders,
      };
    } catch (error) {
      console.error("❌ [PaymentDashboardService Error - getOverview]:", error);
      throw error;
    }
  }

  /**
   * Restituisce gli ultimi ordini.
   */
  async getRecentOrders(limit = 10): Promise<LatestOrderDTO[]> {
    return await this.repository.getLatestOrders(limit);
  }

  /**
   * Ricerca ordini per stringa di testo.
   */
  async searchOrders(search: string): Promise<LatestOrderDTO[]> {
    return await this.repository.searchOrders(search);
  }

  /**
   * Ordini filtrati per stato.
   */
  async getOrdersByStatus(status: string): Promise<LatestOrderDTO[]> {
    return await this.repository.getOrdersByStatus(status);
  }

  /**
   * Dettaglio completo ordine per Drawer.
   */
  async getOrderDetails(orderId: string) {
    return await this.repository.getOrderDetails(orderId);
  }

  /**
   * KPI rapidi.
   */
  async getKpis() {
    const overview = await this.repository.getOverview();

    return {
      revenue: overview.totalRevenue,
      orders: overview.totalOrders,
      paidOrders: overview.paidOrders,
      pendingOrders: overview.totalOrders - overview.paidOrders,
      averageOrderValue:
        overview.totalOrders > 0
          ? overview.totalRevenue / overview.totalOrders
          : 0,
    };
  }

  /**
   * Vendite dell'ultimo mese per il grafico.
   */
  async getMonthlyRevenue() {
    return await this.repository.getRevenueChart();
  }
}