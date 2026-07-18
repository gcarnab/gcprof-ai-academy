import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminDashboard from "@/features/admin/dashboard/components/AdminDashboard";
import { getAdminDashboardStats } from "@/features/admin/stats/services/adminStatsService";
import { getSupabaseAdmin } from "@/lib/supabase"; // 🎯 Importato Supabase per recuperare i quiz
import { getAllResourcesAdmin } from "@/features/resources/actions/resourcesActions"; // 🎯 Import per il Knowledge Hub

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
  const supabase = getSupabaseAdmin();

  // 1. Recupera i dati statici/statistiche esistenti
  const stats = await getAdminDashboardStats();

  // 2. Recupera le statistiche di tracciamento
  const trackingStats = await getTrackingStats();

  // 3. Eseguiamo il fetch in tempo reale di tutti i quiz per l'interfaccia Admin
  const { data: quizzes, error: quizzesError } = await supabase
    .from("quizzes")
    .select(
      `
    id,
    title,
    status,
    passing_score,
    created_at
  `,
    )
    .order("created_at", { ascending: false });

  if (quizzesError) {
    console.error(
      "Errore nel recupero dei quiz nella rotta admin page:",
      quizzesError.message,
    );
  }

  // 4. 🎯 AGGIORNATO: Iniettiamo l'array `quizzes` dentro l'oggetto `stats.raw` atteso dal componente client
  const enrichedStats = {
    ...stats,
    raw: {
      ...(stats?.raw || {}),
      quizzes: quizzes || [], // Passiamo l'array (vuoto se ci sono errori o non ci sono record)
    },
  };

  // 5. 🎯 AGGIUNTO: Recuperiamo tutte le risorse per il tab "Risorse" (incluso quelle nascoste)
  const resources = await getAllResourcesAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        {/* Passiamo l'oggetto arricchito enrichedStats invece del vecchio stats e le initialResources */}
        <AdminDashboard
          stats={enrichedStats}
          currentTab={params.tab ?? "courses"}
          trackingStats={trackingStats}
          initialResources={resources}
        />
      </main>

      <Footer />
    </div>
  );
}