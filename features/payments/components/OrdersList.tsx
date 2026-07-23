"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order } from "../types/paymentTypes";


export function OrdersList() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setOrders(data as Order[]);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "FULFILLED":
      case "PAID":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Completato</span>;
      case "PENDING":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">In Attesa</span>;
      case "FAILED":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Fallito</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr>
            <th className="p-3 text-left">N° Ordine</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Stato</th>
            <th className="p-3 text-left">Subtotale</th>
            <th className="p-3 text-left">Sconto</th>
            <th className="p-3 text-left">Totale</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr><td colSpan={6} className="p-4 text-center">Caricamento ordini...</td></tr>
          ) : orders.length === 0 ? (
            <tr><td colSpan={6} className="p-4 text-center text-gray-500">Nessun ordine trovato.</td></tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td className="p-3 font-mono font-medium">{o.order_number}</td>
                <td className="p-3">{new Date(o.created_at).toLocaleDateString("it-IT")}</td>
                <td className="p-3">{getStatusBadge(o.status)}</td>
                <td className="p-3">€{o.subtotal.toFixed(2)}</td>
                <td className="p-3 text-green-600">-€{o.discount.toFixed(2)}</td>
                <td className="p-3 font-bold">€{o.total.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}