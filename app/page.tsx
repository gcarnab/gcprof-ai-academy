/**
 * ============================================================================
 * FILE: page.tsx
 * FEATURE: Home
 * ----------------------------------------------------------------------------
 * Home pubblica alimentata in tempo reale dal Database.
 * ============================================================================
 */

import PublicLayout from "@/shared/layout/PublicLayout";
import Hero from "@/features/home/components/Hero";
import CoursePreview from "@/features/home/components/CoursePreview";
import { getLiveCourses } from "@/features/courses/services/courseActions";

export default function HomePage() {
  // Nota: Essendo un Server Component di Next.js, possiamo chiamare l'azione direttamente qui!
  // Ma per non rompere la UI, lasciamo che sia il componente client interno (CoursePreview o useCourses)
  // a gestire i filtri. Per agganciare i corsi, ci assicuriamo che l'applicazione sia sincronizzata.

  return (
    <PublicLayout>
      <Hero />
      {/* Il componente CoursePreview internamente utilizzerà useCourses o mostrerà le anteprime */}
      <CoursePreview />
    </PublicLayout>
  );
}