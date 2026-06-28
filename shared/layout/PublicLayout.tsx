/**
 * ============================================================================
 * FILE: PublicLayout.tsx
 * FEATURE: Shared Layout
 * ----------------------------------------------------------------------------
 * SCOPO
 * Layout comune a tutte le pagine pubbliche della piattaforma.
 *
 * RESPONSABILITÀ
 * - Visualizzare la Navbar
 * - Visualizzare il Footer
 * - Ospitare il contenuto centrale
 *
 * FUTURO
 * In seguito verranno aggiunti:
 * - DashboardLayout
 * - AdminLayout
 * ============================================================================
 */

import type { ReactNode } from "react";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}