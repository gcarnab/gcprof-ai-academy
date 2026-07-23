/**
 * GCPROF AI ACADEMY
 * File: app/admin/payments/page.tsx
 * 
 * Server Component: recupera i dati KPI e l'overview delle vendite
 * direttamente dal server prima di inviare l'HTML al client.
 */

import { getPaymentDashboardOverviewAction } from "@/features/payments/actions/getPaymentsDashboardAction";
import {
  OverviewCards,
  SalesChart,
  RecentOrdersTable,
} from "@/features/payments/components/OverviewComponents";

// Forza il re-rendering dinamico ad ogni richiesta
export const revalidate = 0;

export default async function PaymentsOverviewPage() {
  // Fetch lato server tramite Server Action protetta
  const response = await getPaymentDashboardOverviewAction();

  // Gestione visiva dell'errore (sessione scaduta, non admin o problema DB)
  if (!response.success || !response.data) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
        <h2 className="font-semibold text-lg">Errore durante il caricamento</h2>
        <p className="text-sm mt-1">
          {response.error || "Impossibile recuperare i dati della dashboard."}
        </p>
      </div>
    );
  }

  const data = response.data;

  return (
    <div className="space-y-6">
      {/* 1. Carte KPI (Ricavi, Ordini, Conversione, Carrelli) */}
      <OverviewCards data={data} />

      {/* 2. Grafico Vendite (Ultimi 30 giorni) */}
      <SalesChart data={data} />

      {/* 3. Tabella Ultimi Ordini */}
      <RecentOrdersTable data={data} />
    </div>
  );
}