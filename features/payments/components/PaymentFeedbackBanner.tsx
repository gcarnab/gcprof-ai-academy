"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: PAYMENT FEEDBACK BANNER
 * File: features/payments/components/PaymentFeedbackBanner.tsx
 * 
 * Banner visivo per notificare all'utente l'esito dell'operazione di pagamento
 * al rientro dal checkout di Stripe (leggendo i query parameters dell'URL).
 */

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const PaymentFeedbackBanner: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<"success" | "cancelled" | null>(null);

  useEffect(() => {
    const paymentParam = searchParams.get("payment");
    if (paymentParam === "success") {
      setStatus("success");
    } else if (paymentParam === "cancelled") {
      setStatus("cancelled");
    }
  }, [searchParams]);

  const handleDismiss = () => {
    setStatus(null);
    // Rimuove i parametri dall'URL senza ricaricare la pagina
    const params = new URLSearchParams(searchParams.toString());
    params.delete("payment");
    params.delete("session_id");
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  if (!status) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {status === "success" ? (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-white font-bold text-sm">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Pagamento completato con successo!
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                Il tuo ordine è stato evaso. Troverai i tuoi nuovi corsi direttamente nella tua Dashboard.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline px-2 py-1"
          >
            Chiudi
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white font-bold text-sm">
              !
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Pagamento annullato
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                L&apos;operazione è stata annullata. Gli articoli sono ancora salvati nel tuo carrello.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline px-2 py-1"
          >
            Chiudi
          </button>
        </div>
      )}
    </div>
  );
};