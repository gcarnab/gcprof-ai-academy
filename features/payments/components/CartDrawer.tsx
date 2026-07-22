"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: CART DRAWER
 * File: features/payments/components/CartDrawer.tsx
 * 
 * Pannello laterale per la visualizzazione e gestione del carrello.
 * Consente di rimuovere corsi e avviare la sessione di checkout con Stripe.
 */

import React, { useState, useEffect, useTransition } from "react";
import {
  getCartSummaryAction,
  removeFromCartAction,
  createCheckoutSessionAction,
} from "../actions/paymentActions";
import { CartSummaryDTO } from "../types/paymentTypes";
import { PAYMENTS_CONFIG } from "../constants/paymentConstants";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdated?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onCartUpdated,
}) => {
  const [cart, setCart] = useState<CartSummaryDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isRemoving, startRemoveTransition] = useTransition();
  const [isCheckingOut, startCheckoutTransition] = useTransition();

  // Carica il contenuto del carrello quando il pannello viene aperto
  useEffect(() => {
    if (isOpen && PAYMENTS_CONFIG.IS_ENABLED) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await getCartSummaryAction();
    if (result.success) {
      setCart(result.data);
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  const handleRemoveItem = (courseId: string) => {
    setErrorMessage(null);
    startRemoveTransition(async () => {
      const result = await removeFromCartAction(courseId);
      if (result.success) {
        setCart(result.data);
        if (onCartUpdated) onCartUpdated();
      } else {
        setErrorMessage(result.error);
      }
    });
  };

  const handleCheckout = () => {
    setErrorMessage(null);
    startCheckoutTransition(async () => {
      const result = await createCheckoutSessionAction();

      if (result.success && result.data.checkout_url) {
        window.location.href = result.data.checkout_url;
      } else if (!result.success) {
        setErrorMessage(result.error);
      }
    });
  };

  if (!isOpen || !PAYMENTS_CONFIG.IS_ENABLED) {
    return null;
  }

  // Estrazione sicura del conteggio elementi e dell'importo totale
  const itemCount = cart?.items?.length || 0;
  const rawCart = cart as unknown as { totalAmount?: number; total_amount?: number };
  const totalAmount = rawCart?.totalAmount ?? rawCart?.total_amount ?? 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Sfondo Oscurato (Backdrop) */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          
          {/* Header del Drawer */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
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
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Il tuo Carrello
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Chiudi carrello"
            >
              ✕
            </button>
          </div>

          {/* Messaggio di Errore se presente */}
          {errorMessage && (
            <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400">
              {errorMessage}
            </div>
          )}

          {/* Corpo del Drawer */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-3">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Caricamento carrello...
                </p>
              </div>
            ) : !cart || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  🛒
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Il tuo carrello è vuoto
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  Esplora il catalogo corsi ed aggiungi i contenuti che desideri seguire.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.items.map((item) => {
                  const itemWithTitle = item as unknown as {
                    title?: string;
                    course_title?: string;
                    course_title_snapshot?: string;
                    course?: { title?: string };
                  };

                  const displayTitle =
                    itemWithTitle.title ||
                    itemWithTitle.course_title ||
                    itemWithTitle.course_title_snapshot ||
                    itemWithTitle.course?.title ||
                    "Corso";

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {displayTitle}
                        </h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                          € {item.unit_price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.course_id)}
                        disabled={isRemoving}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-50"
                        title="Rimuovi dal carrello"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer del Drawer con Totale e Checkout */}
          {cart && cart.items.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Totale ({itemCount} {itemCount === 1 ? "corso" : "corsi"}):
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  € {totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || isRemoving}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connessione a Stripe...</span>
                  </>
                ) : (
                  <>
                    <span>Procedi al Pagamento</span>
                    <span>→</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                🔒 Pagamento sicuro elaborato crittograficamente da Stripe.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};