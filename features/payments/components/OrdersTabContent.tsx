"use client";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/OrdersTabContent.tsx
 */

import { useState, useEffect } from "react";
import { LatestOrderDTO } from "../dto/PaymentDashboardDTO";
import { OrderDetailDTO } from "../dto/OrderDetailDTO";
import {
  getFilteredOrdersAction,
  getOrderDetailsAction,
} from "../actions/orderActions";
import { OrderDetailDrawer } from "./OrderDetailDrawer";

export function OrdersTabContent() {
  const [orders, setOrders] = useState<LatestOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Stato Drawer
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailDTO | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getFilteredOrdersAction(search, selectedStatus);
    if (res.success && res.data) {
      setOrders(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedStatus]);

  const handleOpenDrawer = async (orderId: string) => {
    setDrawerLoading(true);
    setIsDrawerOpen(true);
    const res = await getOrderDetailsAction(orderId);
    if (res.success && res.data) {
      setSelectedOrder(res.data);
    } else {
      alert(res.error || "Errore nel caricamento del dettaglio ordine.");
      setIsDrawerOpen(false);
    }
    setDrawerLoading(false);
  };

  const STATUS_FILTERS = [
    { id: "ALL", label: "Tutti" },
    { id: "PAID", label: "Pagati" },
    { id: "PENDING", label: "In Attesa" },
    { id: "REFUNDED", label: "Rimborsati" },
  ];

  return (
    <div className="space-y-4">
      {/* BARRA FILTRI & RICERCA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card border border-border rounded-xl shadow-sm">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cerca per codice ordine (es. ORD-)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedStatus(f.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === f.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABELLA ORDINI */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Numero Ordine</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Totale</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3 text-right">Azione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground animate-pulse">
                    Caricamento ordini in corso...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nessun ordine trovato con i criteri inseriti.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleOpenDrawer(o.id)}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-foreground">
                      {o.orderNumber}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {o.customerName}
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">
                      € {o.total.toFixed(2)} {o.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                          o.status === "PAID" || o.status === "FULFILLED"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : o.status === "REFUNDED"
                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(o.createdAt).toLocaleString("it-IT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(o.id);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-muted hover:bg-muted/80 text-foreground rounded border border-border transition-colors"
                      >
                        Ispeziona 🔍
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER DETTAGLIO */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        isLoading={drawerLoading}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}