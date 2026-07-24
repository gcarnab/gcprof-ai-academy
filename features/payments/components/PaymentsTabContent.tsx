/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/PaymentsTabContent.tsx
 *
 * Componente Server-Side che gestisce i Sotto-Tab della sezione Payments.
 */

import Link from "next/link";
import { getPaymentDashboardOverviewAction } from "../actions/getPaymentsDashboardAction";
import {
  OverviewCards,
  SalesChart,
  RecentOrdersTable,
} from "./OverviewComponents";
import { OrdersTabContent } from "./OrdersTabContent";
import { SettingsTabContent } from "./SettingsTabContent";

const SUB_TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "Ordini", icon: "🛒" },
  { id: "enrollments", label: "Iscrizioni", icon: "🎓" },
  { id: "courses", label: "Listino Corsi", icon: "🏷️" },
  { id: "coupons", label: "Coupon", icon: "🎟️" },
  { id: "logs", label: "Log Stripe", icon: "📜" },
  { id: "settings", label: "Impostazioni", icon: "⚙️" },
];

interface PaymentsTabContentProps {
  subtab?: string;
}

export async function PaymentsTabContent({
  subtab = "overview",
}: PaymentsTabContentProps) {
  // Carichiamo i dati dell'overview se ci troviamo nel sotto-tab overview
  const isOverview = subtab === "overview";
  const overviewResponse = isOverview
    ? await getPaymentDashboardOverviewAction()
    : null;

  return (
    <div className="space-y-6">
      {/* SOTTO-BARRA DI NAVIGAZIONE PAYMENTS */}
      <div className="flex items-center gap-1.5 border-b border-border pb-3 overflow-x-auto no-scrollbar">
        {SUB_TABS.map((st) => {
          const isActive = subtab === st.id;
          return (
            <Link
              key={st.id}
              href={`/admin/dashboard?tab=payments&subtab=${st.id}`}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </Link>
          );
        })}
      </div>

      {/* CONTENUTO DELLE SUB-TAB */}
      <div className="animate-in fade-in duration-200">
        {/* 1. OVERVIEW */}
        {subtab === "overview" && (
          <>
            {!overviewResponse?.success || !overviewResponse.data ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-lg">
                  Errore durante il caricamento
                </h3>
                <p className="text-sm mt-1">
                  {overviewResponse?.error ||
                    "Impossibile recuperare i dati dei pagamenti."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <OverviewCards data={overviewResponse.data} />
                <SalesChart data={overviewResponse.data} />
                <RecentOrdersTable data={overviewResponse.data} />
              </div>
            )}
          </>
        )}

        {/* 2. ORDERS (Fase 2) */}
        {subtab === "orders" && <OrdersTabContent />}

        {/* 3. ENROLLMENTS (Fase 3) */}
        {subtab === "enrollments" && (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-card/50">
            <span className="text-3xl block mb-2">🎓</span>
            <h3 className="font-semibold text-foreground">
              Gestione Iscrizioni
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Fase 3: Monitoraggio accessi ai corsi e revoca manuale iscrizioni.
            </p>
          </div>
        )}

        {/* 4. COURSES (Fase 4) */}
        {subtab === "courses" && (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-card/50">
            <span className="text-3xl block mb-2">🏷️</span>
            <h3 className="font-semibold text-foreground">
              Prezzi e Pacchetti Corsi
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Fase 4: Configurazione prezzi commerciali, valute e bundle.
            </p>
          </div>
        )}

        {/* 5. COUPONS (Fase 5) */}
        {subtab === "coupons" && (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-card/50">
            <span className="text-3xl block mb-2">🎟️</span>
            <h3 className="font-semibold text-foreground">
              Codici Sconto & Coupon
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Fase 5: Creazione coupon percentuali/fissi e limiti di utilizzo.
            </p>
          </div>
        )}

        {/* 6. LOGS (Fase 6) */}
        {subtab === "logs" && (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-card/50">
            <span className="text-3xl block mb-2">📜</span>
            <h3 className="font-semibold text-foreground">
              Log Transazioni Stripe & Webhook
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Fase 6: Tracciamento eventi Webhook di pagamento e diagnostica
              errori.
            </p>
          </div>
        )}

        {/* SETTINGS */}
        {subtab === "settings" && <SettingsTabContent />}

      </div>
    </div>
  );
}
