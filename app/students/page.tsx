import type { Metadata } from "next";

import PublicLayout from "@/shared/layout/PublicLayout";

import StudentFeatures from "@/features/marketing/components/StudentFeatures";
import HeroSection from "@/features/marketing/components/HeroSection";

import { siteConfig } from "@/shared/config/site";


export const metadata: Metadata = {
  title: "Studenti",
  description:
    "Scopri come GCPROF AI Academy aiuta gli studenti delle superiori a imparare Informatica, programmazione e Intelligenza Artificiale.",
};


export default function StudentsPage() {
  return (
    <PublicLayout>

      {/* Hero dedicata agli studenti */}
      <HeroSection
        title="Impara Informatica costruendo il tuo futuro digitale"
        subtitle="Un ambiente di apprendimento pensato per studenti delle superiori: corsi strutturati, quiz interattivi, progressi personali e strumenti basati sull'Intelligenza Artificiale."
        primaryAction={{
          label: "Esplora i corsi",
          href: "/courses",
        }}
        secondaryAction={{
          label: "Accedi alla piattaforma",
          href: "/login",
        }}
      />


      {/* Valore per lo studente */}
      <StudentFeatures />


    </PublicLayout>
  );
}