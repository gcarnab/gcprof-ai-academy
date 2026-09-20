import type { Metadata } from "next";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import ProfileForm from "@/features/profile/components/ProfileForm";
import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Profilo | GCPROF Academy",
  description:
    "Gestisci il tuo profilo personale, visualizza i tuoi dettagli scolastici e aggiorna i tuoi dati su GCPROF Academy.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-8">
            <SectionTitle
              title="Gestione Profilo"
              subtitle="Consulta le tue informazioni scolastiche (classe, indirizzo, sezione) e personalizza i dati del tuo account."
            />

            {/* Qui viene montato ProfileForm con i campi in sola lettura */}
            <ProfileForm />
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}