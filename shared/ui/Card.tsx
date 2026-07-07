/**
 * ============================================================================
 * FILE: Card.tsx
 * FEATURE: Shared UI
 * ----------------------------------------------------------------------------
 * Contenitore standard per elementi visualizzati sotto forma di card.
 * ============================================================================
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <article
      className={`
        rounded-2xl
        border
        border-border
        bg-background
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </article>
  );
}