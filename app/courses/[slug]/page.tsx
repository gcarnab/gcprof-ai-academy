/**
 * ============================================================================
 * PAGINA: Course Detail
 * ----------------------------------------------------------------------------
 * Questa pagina mostra il dettaglio di un singolo corso.
 *
 * URL dinamico:
 * /courses/[slug]
 *
 * Esempi:
 * /courses/python-base
 * /courses/react-fundamentals
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * ✔ recuperare il corso dallo slug
 * ✔ mostrare i dettagli del corso
 * ✔ gestire caso "corso non trovato"
 * ============================================================================
 */

import { notFound } from "next/navigation";

import { getCourseBySlug } from "@/features/courses/services/courseService";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

interface Props {
  params: {
    slug: string;
  };
}
export default async function CourseDetailPage({ params }: Props) {
//export default function CourseDetailPage({ params }: Props) {

  const { slug } = await params;
  //const course = getCourseBySlug(params.slug);
  const course = getCourseBySlug(slug);

  /**
   * Se il corso non esiste → 404
   */
  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <Navbar />

      {/* ============================================================
          CONTENUTO
      ============================================================ */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">

        {/* HEADER CORSO */}
        <h1 className="text-4xl font-bold text-gray-900">
          {course.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          {course.description}
        </p>

        {/* METADATA */}
        <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-gray-700">

          <div>
            <strong>Categoria:</strong> {course.category}
          </div>

          <div>
            <strong>Difficoltà:</strong> {course.difficulty}
          </div>

          <div>
            <strong>Ore stimate:</strong> {course.estimatedHours}
          </div>

          <div>
            <strong>Docente:</strong> {course.teacher}
          </div>

        </div>

        {/* PLACEHOLDER FUTURO */}
        <div className="mt-12 rounded-lg border bg-white p-6">
          <p className="text-gray-500">
            Qui in futuro aggiungeremo:
            moduli, lezioni, progress tracking e video.
          </p>
        </div>

      </main>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <Footer />

    </div>
  );
}