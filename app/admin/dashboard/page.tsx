import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminDashboard from "@/features/admin/dashboard/components/AdminDashboard";
import { getAdminDashboardStats } from "@/features/admin/stats/services/adminStatsService";

import type { Metadata } from "next";
import { getTrackingStats } from "@/features/admin/tracking/services/trackingQueries";

export const metadata: Metadata = {
  title: "Area Amministrazione",
  description: "Dashboard amministrativa di GCPROF Academy.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const params = await searchParams;

  // Recupera tutti i dati necessari con un'unica chiamata
  const stats = await getAdminDashboardStats();

  const trackingStats = await getTrackingStats();

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        <AdminDashboard
          stats={stats}
          currentTab={params.tab ?? "courses"}
          trackingStats={trackingStats}
        />
      </main>

      <Footer />
    </div>
  );
}
