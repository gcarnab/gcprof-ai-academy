"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Coupon, DiscountTypeEnum } from "../types/paymentTypes";

export function CouponManager() {

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountTypeEnum>("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [maxRedemptions, setMaxRedemptions] = useState<number | "">("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Errore durante il recupero dei coupon:", error);
      setErrorMsg("Impossibile caricare i coupon. Verifica i permessi o le politiche RLS.");
    } else if (data) {
      setCoupons(data as Coupon[]);
    }

    setLoading(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("coupons")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      alert(`Errore durante l'aggiornamento: ${error.message}`);
    } else {
      fetchCoupons();
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const { error } = await supabase.from("coupons").insert({
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: Number(discountValue),
      max_redemptions: maxRedemptions ? Number(maxRedemptions) : null,
      is_active: true,
    });

    if (error) {
      alert(`Errore durante la creazione del coupon: ${error.message}`);
    } else {
      setCode("");
      setMaxRedemptions("");
      fetchCoupons();
    }
  };

  return (
    <div className="space-y-8">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Form Creazione Coupon */}
      <form
        onSubmit={handleCreateCoupon}
        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Crea Nuovo Coupon
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Codice (es. SUMMER2026)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 border rounded dark:bg-gray-900 dark:text-white"
            required
          />
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as DiscountTypeEnum)}
            className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          >
            <option value="PERCENTAGE">Percentuale (%)</option>
            <option value="FIXED">Fisso (€)</option>
          </select>
          <input
            type="number"
            placeholder="Valore Sconto"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            className="p-2 border rounded dark:bg-gray-900 dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Max Utilizzi (Opzionale)"
            value={maxRedemptions}
            onChange={(e) => setMaxRedemptions(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Crea Coupon
        </button>
      </form>

      {/* Tabella Coupon */}
      <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Codice</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Valore</th>
              <th className="p-3 text-left">Utilizzi</th>
              <th className="p-3 text-left">Stato</th>
              <th className="p-3 text-right">Azione</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Caricamento in corso...
                </td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Nessun coupon trovato.
                </td>
              </tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id}>
                  <td className="p-3 font-bold">{c.code}</td>
                  <td className="p-3">
                    {c.discount_type === "PERCENTAGE" ? "Percentuale" : "Fisso"}
                  </td>
                  <td className="p-3">
                    {c.discount_type === "PERCENTAGE"
                      ? `${c.discount_value}%`
                      : `€${c.discount_value}`}
                  </td>
                  <td className="p-3">
                    {c.current_redemptions} / {c.max_redemptions ?? "∞"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        c.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {c.is_active ? "Attivo" : "Disattivato"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleToggleActive(c.id, c.is_active)}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      {c.is_active ? "Disattiva" : "Attiva"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}