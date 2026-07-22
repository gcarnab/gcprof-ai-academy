"use client";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/OrderDetailDrawer.tsx
 */

import { OrderDetailDTO } from "../dto/OrderDetailDTO";

interface OrderDetailDrawerProps {
  order: OrderDetailDTO | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export function OrderDetailDrawer({
  order,
  isOpen,
  isLoading,
  onClose,
}: OrderDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-card text-card-foreground border-l border-border p-6 space-y-6 shadow-2xl overflow-y-auto">
          
          {/* Header Drawer */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {order ? `Ordine #${order.orderNumber}` : "Caricamento in corso..."}
              </span>
              <h2 className="text-xl font-bold text-foreground">Dettaglio Transazione</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              ✕
            </button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              <p className="text-xs">Recupero informazioni da Supabase...</p>
            </div>
          ) : !order ? (
            <div className="p-6 text-center text-rose-500">
              Impossibile caricare i dettagli dell'ordine.
            </div>
          ) : (
            <>
              {/* Stato e Importo */}
              <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Totale Pagato</p>
                  <p className="text-2xl font-black text-foreground">
                    € {order.total.toFixed(2)} {order.currency}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    order.status === "PAID" || order.status === "FULFILLED"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : order.status === "REFUNDED"
                      ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Dati Cliente */}
              <div className="space-y-2 border-b border-border pb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Acquirente
                </h3>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p className="text-muted-foreground text-xs">{order.customerEmail}</p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1">
                    ID Profile: {order.profileId}
                  </p>
                </div>
              </div>

              {/* Corsi Acquistati */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prodotti / Corsi Acquistati
                </h3>
                <div className="space-y-2">
                  {order.items.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Nessun elemento collegato.</p>
                  ) : (
                    order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-background border border-border text-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">
                            ID Corso: {item.courseId}
                          </p>
                        </div>
                        <span className="font-semibold text-foreground">
                          € {item.price.toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Dettagli Sconti */}
              {order.couponCode && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs space-y-1">
                  <p className="font-semibold text-blue-500">
                    Coupon Applicato: {order.couponCode}
                  </p>
                  <p className="text-muted-foreground">
                    Sconto: € {order.discountAmount?.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Dettagli Tecnici Gateway */}
              <div className="space-y-2 border-b border-border pb-4 text-xs font-mono">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                  Identificativi Gateway ({order.provider})
                </h3>
                <div className="p-3 bg-muted/30 rounded-lg space-y-1 break-all">
                  <p>
                    <span className="text-muted-foreground">Session ID:</span>{" "}
                    {order.providerCheckoutSessionId || "N/D"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Payment ID:</span>{" "}
                    {order.providerPaymentId || "N/D"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Data:</span>{" "}
                    {new Date(order.createdAt).toLocaleString("it-IT")}
                  </p>
                </div>
              </div>

              {/* Pulsanti Azione Rapidi */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Azioni Rapide
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <button
                    onClick={() => alert("Pulsante pronto per l'integrazione con API Stripe Refund")}
                    className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors text-center"
                  >
                    💸 Esegui Rimborso
                  </button>
                  <button
                    onClick={() => alert("Email di conferma reinviata all'utente")}
                    className="p-2.5 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-lg transition-colors text-center"
                  >
                    📧 Reinvia Ricevuta
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}