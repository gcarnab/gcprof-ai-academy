"use client";

import { AddToCartButton } from "@/features/payments/components/AddToCartButton";

interface CourseCTAProps {
  courseId: string;
  price: number;
  isEnrolling: boolean;
  onFreeEnroll: () => void;
}

export function CourseCTA({
  courseId,
  price,
  isEnrolling,
  onFreeEnroll,
}: CourseCTAProps) {
  if (price === 0) {
    return (
      <button
        onClick={onFreeEnroll}
        disabled={isEnrolling}
        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
      >
        {isEnrolling ? "Iscrizione in corso..." : "✨ Iscriviti Gratuitamente"}
      </button>
    );
  }
  return <AddToCartButton courseId={courseId} price={price} />;
}