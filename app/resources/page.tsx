import { Metadata } from "next";
import { getActiveResources } from "@/features/resources/actions/resourcesActions";
import { ResourceDashboard } from "@/features/resources/components/ResourceDashboard";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

export const metadata: Metadata = {
  title: "Risorse | GCPROF Academy",
  description: "Dashboard delle risorse disponibili per la GCPROF Academy",
};

export default async function ResourcesPage() {
  // 1. Fetch server-side da Supabase
  const resources = await getActiveResources();

  // 2. Passaggio dei dati puliti al componente Client
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* HEADER */}
      <Navbar />

      {/* CONTENUTO PRINCIPALE */}
      <main className="flex-1 w-full py-8 md:py-12">
        <ResourceDashboard initialResources={resources} />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
