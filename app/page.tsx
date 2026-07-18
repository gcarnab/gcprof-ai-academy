import PublicLayout from "@/shared/layout/PublicLayout";
import Hero from "@/features/home/components/Hero";
import CoursePreview from "@/features/home/components/CoursePreview";
import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import HeroSection from "@/features/marketing/components/HeroSection";
import WhyChoose from "@/features/marketing/components/WhyChoose";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import StudentFeatures from "@/features/marketing/components/StudentFeatures";

export const metadata: Metadata = {
  title: "Home",
  description:
    siteConfig.description,
};


export default function HomePage() {
  // Nota: Essendo un Server Component di Next.js, possiamo chiamare l'azione direttamente qui!
  // Ma per non rompere la UI, lasciamo che sia il componente client interno (CoursePreview o useCourses)
  // a gestire i filtri. Per agganciare i corsi, ci assicuriamo che l'applicazione sia sincronizzata.

  return (
    <PublicLayout>
      <HeroSection/>
      <WhyChoose id="why-choose"/>
      <HowItWorks id="how-it-works"/>
      {/* <StudentFeatures/> */}
    </PublicLayout>
  );
}