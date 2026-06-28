/**
 * ============================================================================
 * COMPONENTE: CoursePreview
 * ----------------------------------------------------------------------------
 * Sezione che mostra i corsi in evidenza nella homepage.
 *
 * RUOLO:
 * - Anteprima dei corsi disponibili
 *
 * ATTUALMENTE:
 * - Lista statica di corsi (mock data)
 * - Render tramite CourseCard
 *
 * FUTURO:
 * - Dati dinamici da Supabase
 * - Filtri per categoria
 * - Ordinamento per popolarità
 *
 * NOTA ARCHITETTURALE:
 * Questo componente NON deve contenere logica business.
 * Deve solo orchestrare la UI.
 * ============================================================================
 */


import PageContainer from "@/shared/ui/PageContainer"
import { courses } from "../data/courses"
//import { CourseCard } from "./CourseCard"
import CourseCard from "./CourseCard"

export default function CoursePreview() {
  return (
    <section className="bg-gray-50 py-20">
      <PageContainer>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Corsi in evidenza
          </h2>

          <p className="mt-3 text-gray-600">
            Alcuni dei corsi disponibili nella piattaforma.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>

      </PageContainer>
    </section>
  )
}