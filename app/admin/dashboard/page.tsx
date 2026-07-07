import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminDashboard from "@/features/admin/dashboard/components/AdminDashboard";
import { getAdminDashboardStats } from "@/features/admin/stats/services/adminStatsService";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Amministrazione",
  description:
    "Dashboard amministrativa di GCPROF Academy.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Recupera tutti i dati necessari con un'unica chiamata
  const stats = await getAdminDashboardStats();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        <AdminDashboard stats={stats} />
      </main>

      <Footer />
    </div>
  );
}
