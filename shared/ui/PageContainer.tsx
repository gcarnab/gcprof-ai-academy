/**
 * ============================================================================
 * COMPONENTE: PageContainer
 * ----------------------------------------------------------------------------
 * Wrapper layout riutilizzabile per tutte le sezioni della pagina.
 *
 * RUOLO:
 * - Gestire larghezza massima del contenuto
 * - Gestire padding laterale coerente
 *
 * ATTUALMENTE:
 * - max-width fisso (7xl)
 * - padding orizzontale standard
 *
 * FUTURO:
 * - Possibili varianti (sm, md, lg container)
 * - Supporto layout dashboard
 *
 * NOTA ARCHITETTURALE:
 * Evita duplicazione di classi Tailwind in tutta la piattaforma.
 * ============================================================================
 */

import { ReactNode } from "react";

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