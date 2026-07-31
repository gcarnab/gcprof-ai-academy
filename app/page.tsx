import { Suspense } from "react";
import PublicLayout from "@/shared/layout/PublicLayout";
import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import HeroSection from "@/features/marketing/components/HeroSection";
import WhyChoose from "@/features/marketing/components/WhyChoose";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import StudentFeatures from "@/features/marketing/components/StudentFeatures";
import HomeBanner from "@/features/system/components/HomeBanner";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Suspense isola il caricamento asincrono del banner ed evita blocchi in fase di SSG */}
      <Suspense fallback={null}>
        <HomeBanner />
      </Suspense>

      <HeroSection />
      <WhyChoose id="why-choose" />
      <HowItWorks id="how-it-works" />
      {/* <StudentFeatures /> */}
    </PublicLayout>
  );
}