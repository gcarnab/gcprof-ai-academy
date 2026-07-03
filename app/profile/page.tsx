import React from "react";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer"; // 💡 Nota: Se il Footer si trova in un altro percorso (es. @/shared/ui/Footer), adegua questo import.
import ProfileForm from "@/features/profile/components/ProfileForm";
import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";

export const metadata = {
  title: "Profilo - GCPROF AI Academy",
  description: "Gestisci le tue informazioni personali, visualizza le tue classi e aggiorna la tua foto del profilo.",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* 🔹 Barra di navigazione superiore */}
      <Navbar />

      {/* 🔹 Area di contenuto principale centralizzata */}
      <main className="flex-1">
        <PageContainer>
          <div className="space-y-6 py-8">
            {/* Intestazione della pagina allineata al design system */}
            <SectionTitle 
              title="Gestione Profilo" 
              subtitle="Modifica i dati del tuo account, personalizza il tuo avatar e visualizza i tuoi dettagli istituzionali."
            />
            
            {/* Form Client di modifica e upload */}
            <div className="mt-6">
              <ProfileForm />
            </div>
          </div>
        </PageContainer>
      </main>

      {/* 🔹 Footer istituzionale a fondo pagina */}
      <Footer />
    </div>
  );
}