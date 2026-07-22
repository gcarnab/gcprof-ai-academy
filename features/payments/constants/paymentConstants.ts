/**
 * GCPROF AI ACADEMY - COSTANTI PAYMENTS
 * File: features/payments/constants/paymentConstants.ts
 *
 * Centralizzazione delle configurazioni, rotte, valori predefiniti e flag di sistema
 * per la feature Payments. Intercetta ed elimina ogni valore hardcoded facendo
 * riferimento diretto a process.env con fallback di sicurezza.
 */

import { CurrencyEnum, PaymentProviderEnum } from "../types/paymentTypes";

// =============================================================================
// 1. FEATURE FLAG & CONFIGURAZIONE DI SISTEMA
// =============================================================================

export const PAYMENTS_CONFIG = {
  /** Feature Flag principale: abilita/disabilita l'intero modulo pagamenti */
  IS_ENABLED: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true",

  /** Provider di pagamento di default */
  DEFAULT_PROVIDER: (process.env.PAYMENTS_PROVIDER ||
    "STRIPE") as PaymentProviderEnum,

  /** Valuta predefinita del sistema */
  DEFAULT_CURRENCY: (process.env.DEFAULT_CURRENCY || "EUR") as CurrencyEnum,

  /** URL base dell'applicazione */
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_LOCAL_URL || "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL || "https://gcprof-academy.com",

  /** Versione API Stripe usata */
  STRIPE_API_VERSION: process.env.STRIPE_API_VERSION || "2026-06-24",
} as const;

// =============================================================================
// 2. ROTTE E REDIRECT DI CHECKOUT
// =============================================================================

export const PAYMENT_ROUTES = {
  /** Callback in caso di successo */
  SUCCESS_URL: `${PAYMENTS_CONFIG.BASE_URL}${
    process.env.STRIPE_SUCCESS_URL ||
    "/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}"
  }`,

  /** Callback in caso di annullamento/abbandono */
  CANCEL_URL: `${PAYMENTS_CONFIG.BASE_URL}${
    process.env.STRIPE_CANCEL_URL || "/cart?payment=cancelled"
  }`,

  /** Endpoint webhook Stripe */
  WEBHOOK_ENDPOINT: "/api/webhooks/stripe",
} as const;

// =============================================================================
// 3. BADGES & COLORI UI (Supporto Light / Dark Theme)
// =============================================================================

export const ORDER_STATUS_UI: Record<
  string,
  { label: string; badgeClass: string }
> = {
  PENDING: {
    label: "In attesa",
    badgeClass:
      "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  },
  CHECKOUT_CREATED: {
    label: "Checkout avviato",
    badgeClass:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  PAYMENT_PROCESSING: {
    label: "In elaborazione",
    badgeClass:
      "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  },
  PAID: {
    label: "Pagato",
    badgeClass:
      "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  },
  FULFILLED: {
    label: "Completato",
    badgeClass:
      "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
  },
  FAILED: {
    label: "Fallito",
    badgeClass:
      "bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  },
  EXPIRED: {
    label: "Scaduto",
    badgeClass:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  },
  CANCELLED: {
    label: "Annullato",
    badgeClass:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  },
  REFUNDED: {
    label: "Rimborsato",
    badgeClass:
      "bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  },
};
