"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CourseCommercialInfo } from "../types/paymentTypes";


export function CoursePricingManager() {

  const [courses, setCourses] = useState<CourseCommercialInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("courses")
      .select("id, title, price, currency, is_paid, stripe_product_id, stripe_price_id")
      .order("title");

    if (data) setCourses(data as unknown as CourseCommercialInfo[]);
    setLoading(false);
  };

  const handleUpdatePrice = async (courseId: string, price: number, isPaid: boolean) => {
    await supabase.from("courses").update({
      price: price,
      is_paid: isPaid,
    }).eq("id", courseId);

    fetchCourses();
  };

  return (
    <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr>
            <th className="p-3 text-left">Corso</th>
            <th className="p-3 text-left">Tipo Accesso</th>
            <th className="p-3 text-left">Prezzo (€)</th>
            <th className="p-3 text-left">Stripe Product ID</th>
            <th className="p-3 text-right">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr><td colSpan={5} className="p-4 text-center">Caricamento corsi...</td></tr>
          ) : courses.map((course) => (
            <CourseRow key={course.id} course={course} onSave={handleUpdatePrice} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseRow({ course, onSave }: { course: any; onSave: (id: string, price: number, isPaid: boolean) => void }) {
  const [price, setPrice] = useState(course.price);
  const [isPaid, setIsPaid] = useState(course.is_paid);

  return (
    <tr>
      <td className="p-3 font-medium">{course.title}</td>
      <td className="p-3">
        <select
          value={isPaid ? "PAID" : "FREE"}
          onChange={(e) => {
            const paid = e.target.value === "PAID";
            setIsPaid(paid);
            if (!paid) setPrice(0);
          }}
          className="p-1 border rounded dark:bg-gray-900"
        >
          <option value="FREE">Gratuito</option>
          <option value="PAID">A Pagamento</option>
        </select>
      </td>
      <td className="p-3">
        <input
          type="number"
          step="0.01"
          value={price}
          disabled={!isPaid}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-1 border rounded w-24 dark:bg-gray-900 disabled:opacity-50"
        />
      </td>
      <td className="p-3 text-xs text-gray-500 font-mono">
        {course.stripe_product_id || "Non sincronizzato"}
      </td>
      <td className="p-3 text-right">
        <button
          onClick={() => onSave(course.id, price, isPaid)}
          className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
        >
          Salva
        </button>
      </td>
    </tr>
  );
}