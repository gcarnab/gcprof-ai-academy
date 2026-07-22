/**
 * GCPROF AI ACADEMY
 * File: features/payments/dto/OrderDetailDTO.ts
 */

export interface OrderItemDTO {
  id: string;
  courseId: string;
  title: string;
  price: number;
}

export interface OrderDetailDTO {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  profileId: string;
  customerName: string;
  customerEmail: string;
  provider: string;
  providerCheckoutSessionId?: string;
  providerPaymentId?: string;
  receiptUrl?: string;
  couponCode?: string;
  discountAmount?: number;
  items: OrderItemDTO[];
}