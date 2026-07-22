/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/OverviewComponents.tsx
 */

import { PaymentDashboardDTO } from "../dto/PaymentDashboardDTO";

interface OverviewProps {
  data: PaymentDashboardDTO;
}

export function OverviewCards({ data }: OverviewProps) {
  const cards = [
    {
      title: "Ricavi Totali",
      value: `€ ${data.totalRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`,
      subtitle: `Mese corrente: € ${data.monthlyRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`,
      icon: "💰",
    },
    {
      title: "Ordini Totali",
      value: data.totalOrders,
      subtitle: `${data.paidOrders} pagati, ${data.refundedOrders} rimborsati`,
      icon: "🛒",
    },
    {
      title: "Studenti Attivi",
      value: data.activeStudents,
      subtitle: "Iscritti in piattaforma",
      icon: "🎓",
    },
    {
      title: "Conversione",
      value: `${data.conversionRate}%`,
      subtitle: "Tasso ordini completati",
      icon: "📈",
    },
    {
      title: "Carrelli Abbandonati",
      value: data.abandonedCarts,
      subtitle: "Sessioni non concluse",
      icon: "⚠️",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {card.title}
            </span>
            <span className="text-lg">{card.icon}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {card.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SalesChart({ data }: OverviewProps) {
  const maxRevenue = Math.max(...data.revenueChart.map((p) => p.revenue), 1);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Vendite ultimi 30 giorni
      </h3>

      {data.revenueChart.length === 0 ? (
        <p className="text-sm text-gray-500 py-10 text-center">
          Nessuna vendita registrata negli ultimi 30 giorni.
        </p>
      ) : (
        <div className="h-48 flex items-end gap-2 pt-6">
          {data.revenueChart.map((point, idx) => {
            const heightPercent = Math.max((point.revenue / maxRevenue) * 100, 4);

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative"
              >
                {/* Tooltip hover */}
                <div className="absolute -top-8 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 shadow">
                  {point.label}: €{point.revenue}
                </div>

                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-500"
                />
                <span className="text-[10px] text-gray-400 truncate w-full text-center">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function RecentOrdersTable({ data }: OverviewProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Ultimi Ordini
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-4 py-3">Ordine</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Totale</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.latestOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Nessun ordine presente.
                </td>
              </tr>
            ) : (
              data.latestOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    € {order.total.toFixed(2)} {order.currency}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        order.status === "PAID" || order.status === "FULFILLED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "REFUNDED"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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