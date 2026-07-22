/**
 * GCPROF AI ACADEMY
 * File: app/(admin)/admin/payments/layout.tsx
 */

import { PaymentsNav } from "@/features/payments/components/PaymentsNav";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Payments & Finance
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gestisci ricavi, ordini, iscrizioni e prodotti commerciali.
        </p>
      </div>

      <PaymentsNav />

      {children}
    </div>
  );
}