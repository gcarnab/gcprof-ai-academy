/**
 * ============================================================================
 * PAGINA: /courses
 * ----------------------------------------------------------------------------
 * Questa è la pagina del Catalogo Corsi.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - orchestrare i componenti della feature courses
 * - collegare UI e logica (useCourses)
 * - NON contenere logica di business
 *
 * ARCHITETTURA:
 * ----------------------------------------------------------------------------
 * UI → Components
 * State → useCourses
 * Data → mock (futuro Supabase)
 * ============================================================================
 */

"use client";

import { useCourses } from "@/features/courses/hooks/useCourses";

import CourseList from "@/features/courses/components/CourseList";
import CourseSearch from "@/features/courses/components/CourseSearch";
import CategoryFilter from "@/features/courses/components/CategoryFilter";
import CoursesHeader from "@/features/courses/components/CoursesHeader";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { categories } from "@/features/courses/data/categories";

/**
 * ============================================================================
 * COMPONENTE PAGINA
 * ============================================================================
 */
export default function CoursesPage() {
  /**
   * Hook centrale del catalogo
   */
  const { courses, search, setSearch, category, setCategory } = useCourses();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <Navbar />

      {/* ============================================================
          CONTENUTO PRINCIPALE
      ============================================================ */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {/* HEADER */}
        <CoursesHeader />

        {/* SEARCH */}
        <div className="mb-6">
          <CourseSearch onSearch={setSearch} />
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />
        </div>

        {/* COURSE LIST */}
        <CourseList courses={courses} />
      </main>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <Footer />
    </div>
  );
}
