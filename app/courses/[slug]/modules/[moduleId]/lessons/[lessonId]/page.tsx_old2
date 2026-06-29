/**
 * ============================================================================
 * PAGE: Lesson Page (Refactored)
 * ----------------------------------------------------------------------------
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * ✔ recupero parametri URL
 * ✔ recupero dati tramite CourseService
 * ✔ orchestration della UI
 *
 * NON fa più rendering dei contenuti
 * ============================================================================
 */

import { notFound } from "next/navigation";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import {
  getCourseBySlug,
  getModule,
  getLesson,
} from "@/features/courses/services/courseService";

import LessonRenderer from "@/features/courses/components/lesson/LessonRenderer";

interface Props {
  params: Promise<{
    slug: string;
    moduleId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: Props) {
  /**
   * ============================================================
   * PARAMETRI ROUTE
   * ============================================================
   */
  const { slug, moduleId, lessonId } = await params;

  /**
   * ============================================================
   * RECUPERO DATI
   * ============================================================
   */
  const course = getCourseBySlug(slug);
  const module = getModule(slug, moduleId);
  const lesson = getLesson(slug, moduleId, lessonId);

  /**
   * ============================================================
   * 404 SAFE CHECK
   * ============================================================
   */
  if (!course || !module || !lesson) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ======================================================== */}
      <Navbar />
      {/* ======================================================== */}

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* ======================================================
            BREADCRUMB
        ====================================================== */}
        <p className="text-sm text-gray-500">
          {course.title} {" > "} {module.title}
        </p>

        {/* ======================================================
            TITOLO LEZIONE
        ====================================================== */}
        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {lesson.title}
        </h1>

        {/* ======================================================
            RENDERER (UI ENGINE)
        ====================================================== */}
        <div className="mt-8">
          <LessonRenderer contents={lesson.contents} />
        </div>
      </main>

      {/* ======================================================== */}
      <Footer />
      {/* ======================================================== */}
    </div>
  );
}
