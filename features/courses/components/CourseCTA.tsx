"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: COURSE CTA
 * File dove è definito CourseCTA
 */

import { AddToCartButton } from "@/features/payments/components/AddToCartButton";

interface CourseCTAProps {
  courseId: string;
  price?: number | string;
  isPaid?: boolean;
  isEnrolling?: boolean;
  onFreeEnroll?: () => void;
  isEnrolled?: boolean;
  isInCart?: boolean;
}

export function CourseCTA({
  courseId,
  price = 0,
  isPaid,
  isEnrolling = false,
  onFreeEnroll,
  isEnrolled = false,
  isInCart = false,
}: CourseCTAProps) {
  // Conversione sicura di price in formato numerico (gestisce sia stringhe che numeri)
  const numericPrice = typeof price === "number" ? price : parseFloat(String(price || 0));

  // Determina se il corso è gratuito (priorità a isPaid, poi al prezzo)
  const isFree = isPaid !== undefined ? !isPaid : (isNaN(numericPrice) || numericPrice <= 0);

  // Se è gratuito e c'è una funzione personalizzata onFreeEnroll
  if (isFree && onFreeEnroll) {
    return (
      <button
        onClick={onFreeEnroll}
        disabled={isEnrolling}
        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isEnrolling ? "Iscrizione in corso..." : "✨ Iscriviti Gratuitamente"}
      </button>
    );
  }

  // Se è a pagamento (o gestito da AddToCartButton)
  return (
    <AddToCartButton 
      courseId={courseId} 
      price={numericPrice} 
      isPaid={isPaid}
      isEnrolled={isEnrolled}
      isInCart={isInCart}
    />
  );
}