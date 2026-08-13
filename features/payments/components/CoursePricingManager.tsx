"use client";

/**
 * GCPROF AI ACADEMY - COMPONENT: COURSE PRICING MANAGER
 * File: features/payments/components/CoursePricingManager.tsx
 *
 * Gestione UI avanzata del listino corsi, prezzi e identificativi Stripe per gli amministratori.
 */

import { useEffect, useState, useTransition } from "react";
import {
  getCoursePricingsAction,
  updateCoursePricingAction,
} from "../actions/coursePricingActions";
import {
  CoursePricing,
  UpdateCoursePricingDTO,
  CurrencyEnum,
} from "../types/paymentTypes";

const CURRENCY_OPTIONS: CurrencyEnum[] = ["EUR", "USD", "GBP"];

export function CoursePricingManager() {
  const [courses, setCourses] = useState<CoursePricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setErrorMessage(null);
    const result = await getCoursePricingsAction();

    if (result.success) {
      setCourses(result.data);
    } else {
      setErrorMessage(result.error);
    }
    setLoading(false);
  };

  const handleUpdatePricing = async (
    courseId: string,
    dto: UpdateCoursePricingDTO
  ) => {
    const result = await updateCoursePricingAction(courseId, dto);

    if (!result.success) {
      alert(`Errore durante il salvataggio: ${result.error}`);
      return;
    }

    // Ricarica la lista per sincronizzare lo stato col DB
    await fetchCourses();
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm border border-red-200 dark:border-red-800">
          {errorMessage}
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left font-semibold">Corso</th>
              <th className="p-3 text-left font-semibold">Accesso</th>
              <th className="p-3 text-left font-semibold">Prezzo e Valuta</th>
              <th className="p-3 text-left font-semibold">Stripe Product ID</th>
              <th className="p-3 text-left font-semibold">Stripe Price ID</th>
              <th className="p-3 text-right font-semibold">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Caricamento listino corsi...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Nessun corso presente nel sistema.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <CourseRow
                  key={course.course_id}
                  course={course}
                  onSave={handleUpdatePricing}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CourseRow({
  course,
  onSave,
}: {
  course: CoursePricing;
  onSave: (
    courseId: string,
    dto: UpdateCoursePricingDTO
  ) => Promise<void>;
}) {
  const [price, setPrice] = useState<number>(course.price);
  const [currency, setCurrency] = useState<CurrencyEnum>(
    course.currency || "EUR"
  );
  const [isPaid, setIsPaid] = useState<boolean>(course.is_paid);
  const [stripeProductId, setStripeProductId] = useState<string>(
    course.stripe_product_id || ""
  );
  const [stripePriceId, setStripePriceId] = useState<string>(
    course.stripe_price_id || ""
  );

  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await onSave(course.course_id, {
        price,
        currency,
        is_paid: isPaid,
        stripe_product_id: stripeProductId.trim() || null,
        stripe_price_id: stripePriceId.trim() || null,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    });
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Titolo Corso */}
      <td className="p-3 font-medium text-gray-900 dark:text-gray-100 min-w-[180px]">
        {course.title}
      </td>

      {/* Tipo Accesso */}
      <td className="p-3">
        <select
          value={isPaid ? "PAID" : "FREE"}
          onChange={(e) => {
            const paid = e.target.value === "PAID";
            setIsPaid(paid);
            if (!paid) {
              setPrice(0);
            }
          }}
          className="p-1.5 border rounded-md dark:bg-gray-900 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="FREE">Gratuito</option>
          <option value="PAID">A Pagamento</option>
        </select>
      </td>

      {/* Prezzo e Valuta */}
      <td className="p-3">
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            disabled={!isPaid}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-1.5 border rounded-md w-24 dark:bg-gray-900 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 disabled:opacity-40 focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={currency}
            disabled={!isPaid}
            onChange={(e) => setCurrency(e.target.value as CurrencyEnum)}
            className="p-1.5 border rounded-md dark:bg-gray-900 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 disabled:opacity-40 focus:ring-2 focus:ring-indigo-500"
          >
            {CURRENCY_OPTIONS.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </td>

      {/* Stripe Product ID */}
      <td className="p-3">
        <input
          type="text"
          value={stripeProductId}
          placeholder="prod_..."
          onChange={(e) => setStripeProductId(e.target.value)}
          className="p-1.5 border rounded-md w-36 dark:bg-gray-900 dark:border-gray-700 text-xs font-mono text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
        />
      </td>

      {/* Stripe Price ID */}
      <td className="p-3">
        <input
          type="text"
          value={stripePriceId}
          placeholder="price_..."
          onChange={(e) => setStripePriceId(e.target.value)}
          className="p-1.5 border rounded-md w-36 dark:bg-gray-900 dark:border-gray-700 text-xs font-mono text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
        />
      </td>

      {/* Azione Salva */}
      <td className="p-3 text-right">
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            isSaved
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          }`}
        >
          {isPending ? "Salvataggio..." : isSaved ? "Salvato!" : "Salva"}
        </button>
      </td>
    </tr>
  );
}