/**
 * GCPROF AI ACADEMY - DOMINIO PAYMENTS
 * File: features/payments/types/paymentTypes.ts
 * 
 * Mappatura 1:1 degli Enum, delle Entità DB e dei DTO per la feature Payments.
 */

// =============================================================================
// 1. ENUMS (Allineati a payments_schema.sql)
// =============================================================================

export type OrderStatusEnum = 
  | 'PENDING'
  | 'CHECKOUT_CREATED'
  | 'PAYMENT_PROCESSING'
  | 'PAID'
  | 'FULFILLED'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatusEnum = 
  | 'CREATED'
  | 'AUTHORIZED'
  | 'CAPTURED'
  | 'FAILED'
  | 'REFUNDED';

export type DiscountTypeEnum = 
  | 'PERCENTAGE'
  | 'FIXED';

export type PaymentProviderEnum = 
  | 'STRIPE'
  | 'PAYPAL'
  | 'MOLLIE';

export type CurrencyEnum = 
  | 'EUR'
  | 'USD'
  | 'GBP';

export type CartStatusEnum = 
  | 'ACTIVE'
  | 'CHECKOUT'
  | 'ABANDONED'
  | 'EXPIRED';

// =============================================================================
// 2. ENTITÀ DEL DATABASE (Database Models)
// =============================================================================

/**
 * Estensione delle informazioni commerciali della tabella courses
 */
export interface CourseCommercialInfo {
  id: string;
  price: number;
  currency: CurrencyEnum;
  is_paid: boolean;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
}

/**
 * Tabella: shopping_carts
 */
export interface ShoppingCart {
  id: string;
  profile_id: string;
  status: CartStatusEnum;
  created_at: string;
  updated_at: string;
}

/**
 * Tabella: shopping_cart_items
 */
export interface ShoppingCartItem {
  id: string;
  cart_id: string;
  course_id: string;
  unit_price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  // Join opzionale per arricchire la risposta UI
  course?: {
    id: string;
    title: string;
    image_url?: string | null;
  };
}

/**
 * Tabella: coupons
 */
export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: DiscountTypeEnum;
  discount_value: number;
  valid_from: string;
  valid_to: string | null;
  max_redemptions: number | null;
  current_redemptions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Tabella: payment_settings
 */
export interface PaymentSettings {
  id: string;
  provider: PaymentProviderEnum;
  sandbox_enabled: boolean;
  default_currency: CurrencyEnum;
  vat_percentage: number;
  allow_coupons: boolean;
  academy_country: string;
  checkout_session_expire_minutes: number;
  created_at: string;
  updated_at: string;
}

/**
 * Tabella: orders
 */
export interface Order {
  id: string;
  order_number: string;
  profile_id: string;
  status: OrderStatusEnum;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: CurrencyEnum;
  payment_provider: PaymentProviderEnum;
  payment_provider_order_id: string | null;
  coupon_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Tabella: order_items
 */
export interface OrderItem {
  id: string;
  order_id: string;
  course_id: string;
  course_title_snapshot: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

/**
 * Tabella: payments
 */
export interface Payment {
  id: string;
  order_id: string;
  provider: PaymentProviderEnum;
  provider_payment_id: string | null;
  provider_checkout_session_id: string | null;
  provider_event_id: string | null;
  status: PaymentStatusEnum;
  amount: number;
  currency: CurrencyEnum;
  transaction_reference: string | null;
  failure_reason: string | null;
  paid_at: string | null;
  raw_response: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Tabella: payment_logs
 */
export interface PaymentLog {
  id: string;
  provider: PaymentProviderEnum;
  provider_event_id: string | null;
  event: string;
  payload: Record<string, unknown>;
  processed: boolean;
  processed_at: string | null;
  error: string | null;
  created_at: string;
}

// =============================================================================
// 3. DTO & DOMAIN INTERFACES (Carrello e Checkout)
// =============================================================================

export interface CartSummaryDTO {
  cart: ShoppingCart;
  items: ShoppingCartItem[];
  subtotal: number;
  discount: number;
  total: number;
  applied_coupon: Coupon | null;
}

export interface AddToCartInput {
  course_id: string;
}

export interface RemoveFromCartInput {
  course_id: string;
}

export interface CheckoutSessionInput {
  cart_id: string;
  coupon_code?: string;
}

export interface CheckoutSessionResult {
  order_id: string;
  order_number: string;
  checkout_url: string;
  session_id: string;
}