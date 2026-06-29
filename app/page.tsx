/**
 * ============================================================================
 * FILE: page.tsx
 * FEATURE: Home
 * ----------------------------------------------------------------------------
 * Home pubblica della piattaforma.
 *
 * Questo componente si limita ad assemblare le sezioni della homepage.
 * ============================================================================
 */

import PublicLayout from "@/shared/layout/PublicLayout";

import Hero from "@/features/home/components/Hero";
import CoursePreview from "@/features/home/components/CoursePreview";
import CourseList from "@/features/courses/components/CourseList";
import { courses } from "@/features/courses/data/courses";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <CoursePreview />
      {/*<CourseList courses={courses}/>*/}
    </PublicLayout>
  );
}