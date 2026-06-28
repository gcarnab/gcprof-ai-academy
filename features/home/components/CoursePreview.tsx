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

import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";

import { courses } from "@/features/courses/data/courses";
import CourseCard from "@/features/courses/components/CourseCard";

export default function CoursePreview() {
  return (
    <section className="bg-gray-50 py-20">
      <PageContainer>

        <SectionTitle
          title="Corsi in evidenza"
          subtitle="Una selezione dei corsi disponibili nella piattaforma."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
