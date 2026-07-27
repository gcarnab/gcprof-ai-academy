/**
 * GCPROF AI ACADEMY
 * File: app/admin/dashboard/page.tsx
 */

import { Suspense } from "react";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminDashboard from "@/features/admin/dashboard/components/AdminDashboard";
import { getAdminDashboardStats } from "@/features/admin/stats/services/adminStatsService";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getAllResourcesAdmin } from "@/features/resources/actions/resourcesActions";
import { getTrackingStats } from "@/features/admin/tracking/services/trackingQueries";

import { PaymentsTabContent } from "@/features/payments/components/PaymentsTabContent";

import type { Metadata } from "next";

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
    subtab?: string; // 👈 Aggiunto subtab
  }>;
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();

  const stats = await getAdminDashboardStats();
  const trackingStats = await getTrackingStats();

  const { data: quizzes, error: quizzesError } = await supabase
    .from("quizzes")
    .select(
      `
    id,
    title,
    status,
    passing_score,
    created_at
  `
    )
    .order("created_at", { ascending: false });

  if (quizzesError) {
    console.error(
      "Errore nel recupero dei quiz nella rotta admin page:",
      quizzesError.message
    );
  }

  const enrichedStats = {
    ...stats,
    raw: {
      ...(stats?.raw || {}),
      quizzes: quizzes || [],
    },
  };

  const resources = await getAllResourcesAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        <AdminDashboard
          stats={enrichedStats}
          currentTab={params.tab ?? "courses"}
          trackingStats={trackingStats}
          initialResources={resources}
          paymentsTab={
            <Suspense
              key={params.subtab || "overview"}
              fallback={
                <div className="p-12 text-center text-muted-foreground animate-pulse">
                  Caricamento sezione pagamenti...
                </div>
              }
            >
              <PaymentsTabContent subtab={params.subtab} />
            </Suspense>
          }
        />
      </main>

      <Footer />
    </div>
  );
}