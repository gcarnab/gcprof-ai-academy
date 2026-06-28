/**
 * ============================================================================
 * FILE: PageContainer.tsx
 * FEATURE: Shared UI
 * ----------------------------------------------------------------------------
 * SCOPO
 * Contenitore riutilizzabile che definisce la larghezza massima e il padding
 * orizzontale di tutte le pagine pubbliche della piattaforma.
 *
 * RESPONSABILITÀ
 * - Centrare il contenuto
 * - Limitare la larghezza massima
 * - Evitare duplicazione delle classi Tailwind
 *
 * NOTE
 * Utilizzare questo componente ogni volta che si vuole allineare il contenuto
 * con il layout principale della piattaforma.
 * ============================================================================
 */

import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 ${className}`}>
      {children}
    </div>
  );
}