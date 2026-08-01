import { Suspense } from "react";
import type { Metadata } from "next";
import PublicLayout from "@/shared/layout/PublicLayout";
import { siteConfig } from "@/shared/config/site";

// Componenti Marketing & Sistema
import HomeBanner from "@/features/system/components/HomeBanner";
import HeroSection from "@/features/marketing/components/HeroSection";
import CoursePreview from "@/features/home/components/CoursePreview";
import WhyChoose from "@/features/marketing/components/WhyChoose";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import StudentFeatures from "@/features/marketing/components/StudentFeatures";
import HomeCategories from "@/features/home/components/HomeCategories";


export const metadata: Metadata = {
  title: siteConfig.siteName ? `Home | ${siteConfig.siteName}` : "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Suspense isola il caricamento asincrono del banner ed evita blocchi in fase di SSG */}
      <Suspense fallback={null}>
        <HomeBanner />
      </Suspense>

      {/* 1. Hero Section "Apple Style" */}
      <HeroSection />

      {/* Categories */}
      <HomeCategories />
      
      {/* 2. Anteprima Corsi con Filtro Categorie dinamico <CoursePreview />*/}
      
      {/* 3. Vantaggi e Perchè Sceglierci */}
      <WhyChoose id="why-choose" />

      {/* 4. Come Funziona la Piattaforma */}
      <HowItWorks id="how-it-works" />

      {/* <StudentFeatures /> */}
    </PublicLayout>
  );
}
