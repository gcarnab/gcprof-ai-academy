/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/SettingsTabContent.tsx
 *
 * Server Component della sezione "Impostazioni Pagamenti".
 */

import { getPaymentSettingsAction } from "../actions/paymentSettingsActions";
import { PaymentSettingsForm } from "./PaymentSettingsForm";

export async function SettingsTabContent() {
  const response = await getPaymentSettingsAction();

  if (!response.success || !response.data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800/60 dark:bg-red-950/30">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
          Errore durante il caricamento
        </h3>

        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          {response.error ??
            "Impossibile recuperare la configurazione dei pagamenti."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PaymentSettingsForm initialSettings={response.data} />
    </div>
  );
}