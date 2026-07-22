"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: CART BADGE
 * File: features/payments/components/CartBadge.tsx
 * 
 * Icona carrello con contatore dinamico per la barra di navigazione.
 * Innesca l'apertura della CartDrawer.
 */

import React from "react";
import { PAYMENTS_CONFIG } from "../constants/paymentConstants";

interface CartBadgeProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}

export const CartBadge: React.FC<CartBadgeProps> = ({
  itemCount,
  onClick,
  className = "",
}) => {
  if (!PAYMENTS_CONFIG.IS_ENABLED) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-200 ${className}`}
      aria-label="Apri carrello"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-in zoom-in-50 duration-150">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
};