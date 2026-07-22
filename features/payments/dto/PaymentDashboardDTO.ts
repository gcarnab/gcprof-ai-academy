/**
 * GCPROF AI ACADEMY
 * File: features/payments/dto/PaymentDashboardDTO.ts
 *
 * DTO utilizzato dalla dashboard amministrativa Payments.
 */

export interface RevenuePointDTO {
  label: string;
  revenue: number;
}

export interface LatestOrderDTO {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface PaymentDashboardDTO {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  paidOrders: number;
  refundedOrders: number;
  abandonedCarts: number;
  activeStudents: number;
  conversionRate: number;
  revenueChart: RevenuePointDTO[];
  latestOrders: LatestOrderDTO[];
}