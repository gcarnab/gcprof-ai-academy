"use client";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/PaymentsNav.tsx
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin/payments", icon: "📊" },
  { label: "Orders", href: "/admin/payments/orders", icon: "🛒" },
  { label: "Enrollments", href: "/admin/payments/enrollments", icon: "🎓" },
  { label: "Courses", href: "/admin/payments/courses", icon: "🏷️" },
  { label: "Coupons", href: "/admin/payments/coupons", icon: "🎟️" },
  { label: "Logs", href: "/admin/payments/logs", icon: "📜" },
  { label: "Settings", href: "/admin/payments/settings", icon: "⚙️" },
];

export function PaymentsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3 mb-6 overflow-x-auto">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin/payments"
            ? pathname === "/admin/payments"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}