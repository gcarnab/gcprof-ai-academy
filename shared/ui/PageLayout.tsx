/**
 * ============================================================================
 * COMPONENTE: PageLayout
 * ----------------------------------------------------------------------------
 * Layout base per le pagine della piattaforma.
 *
 * RUOLO:
 * - Definire struttura orizzontale coerente del sito
 *
 * ATTUALMENTE:
 * - Contenitore centrato (max-width + padding)
 *
 * FUTURO:
 * - Supporto sidebar (dashboard)
 * - Layout multipli (public / auth / admin)
 *
 * NOTA ARCHITETTURALE:
 * Questo componente rappresenta il livello "page structure".
 * ============================================================================
 */

import { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      {children}
    </div>
  )
}