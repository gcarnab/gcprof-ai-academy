"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: ADD TO CART BUTTON
 * File: features/payments/components/AddToCartButton.tsx
 *
 * Componente UI Client per aggiungere un corso al carrello o effettuare l'iscrizione gratuita.
 */

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "../actions/paymentActions";
import { PAYMENTS_CONFIG } from "../constants/paymentConstants";
import { enrollFreeCourseAction } from "@/features/courses/services/checkExternalCourseAccessAction";

interface AddToCartButtonProps {
  courseId: string;
  price?: number | string;
  isPaid?: boolean;
  isEnrolled?: boolean;
  isInCart?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  courseId,
  price = 0,
  isPaid,
  isEnrolled = false,
  isInCart = false,
  className = "",
  onSuccess,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [added, setAdded] = useState(isInCart);

  // Conversione sicura di price in formato numerico (gestisce sia stringhe che numeri)
  const numericPrice =
    typeof price === "number" ? price : parseFloat(String(price || 0));

  // Determina se è gratuito prioritariamente con isPaid, poi analizzando il prezzo numerico
  const isFree =
    isPaid !== undefined ? !isPaid : isNaN(numericPrice) || numericPrice <= 0;

  // Se il modulo pagamenti è disabilitato e non è un corso gratuito, nascondi
  if (!PAYMENTS_CONFIG.IS_ENABLED && !isFree) {
    return null;
  }

  // Se l'utente è già iscritto al corso
  if (isEnrolled) {
    return (
      <button
        disabled
        className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 cursor-default flex items-center justify-center gap-2 ${className}`}
      >
        <span>✓ Sei già iscritto</span>
      </button>
    );
  }

  const handleAction = () => {
    setErrorMessage(null);

    startTransition(async () => {
      if (isFree) {
        const result = await enrollFreeCourseAction(courseId);
        if (result.success) {
          router.refresh();
          if (onSuccess) onSuccess();
        } else {
          setErrorMessage(result.error || "Errore durante l'iscrizione.");
        }
      } else {
        const result = await addToCartAction(courseId);
        if (result.success) {
          setAdded(true);

          // Notifica globale che il carrello è cambiato
          window.dispatchEvent(new Event("cart-updated"));

          if (onSuccess) {
            onSuccess();
          }
        } else {
          setErrorMessage(result.error);
        }
      }
    });
  };

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handleAction}
        disabled={isPending || added}
        className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
          added
            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 cursor-default"
            : isFree
              ? "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        } ${className}`}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>
              {isFree ? "Iscrizione in corso..." : "Aggiunta in corso..."}
            </span>
          </>
        ) : added ? (
          <span>✓ Presente nel carrello</span>
        ) : isFree ? (
          <span>🎁 Iscriviti Gratuitamente</span>
        ) : (
          <span>Aggiungi al carrello — € {numericPrice.toFixed(2)}</span>
        )}
      </button>

      {errorMessage && (
        <p className="text-xs text-rose-500 dark:text-rose-400 text-center font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
