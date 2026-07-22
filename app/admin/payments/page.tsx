/**
 * GCPROF AI ACADEMY
 * File: app/(admin)/admin/payments/page.tsx
 */

import { getPaymentDashboardOverviewAction } from "@/features/payments/actions/getPaymentsDashboardAction";
import {
  OverviewCards,
  SalesChart,
  RecentOrdersTable,
} from "@/features/payments/components/OverviewComponents";

export const revalidate = 0; // Rendering dinamico sempre aggiornato

export default async function PaymentsOverviewPage() {
  const response = await getPaymentDashboardOverviewAction();

  if (!response.success || !response.data) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl border border-red-200 dark:border-red-800">
        <h2 className="font-semibold text-lg">Errore durante il caricamento</h2>
        <p className="text-sm mt-1">{response.error || "Impossibile recuperare i dati."}</p>
      </div>
    );
  }

  const data = response.data;

  return (
    <div className="space-y-6">
      {/* 1. Carte KPI */}
      <OverviewCards data={data} />

      {/* 2. Grafico Vendite */}
      <SalesChart data={data} />

      {/* 3. Tabella Ultimi Ordini */}
      <RecentOrdersTable data={data} />
    </div>
  );
}