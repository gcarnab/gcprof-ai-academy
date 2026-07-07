/**
 * =====================================================================
 * GCPROF AI Academy
 * ---------------------------------------------------------------------
 * File: CourseList.tsx
 * ---------------------------------------------------------------------
 * Questo componente visualizza un elenco di corsi.
 *
 * RESPONSABILITÀ
 * ---------------------------------------------------------------------
 * Riceve un array di Course e crea automaticamente
 * una CourseCard per ogni elemento.
 *
 * In questo modo evitiamo di duplicare lo stesso codice
 * nella Home, nella pagina Courses e in tutte le future pagine.
 *
 * PRINCIPIO
 * ---------------------------------------------------------------------
 * Single Responsibility Principle (SRP)
 *
 * CourseCard
 *      ↓
 * visualizza UN corso
 *
 * CourseList
 *      ↓
 * visualizza MOLTI corsi
 * =====================================================================
 */

import CourseCard from "./CourseCard";
import { Course } from "../types/course";
import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";

/**
 * Proprietà del componente.
 */
interface CourseListProps {
  /**
   * Elenco dei corsi.
   */
  courses: Course[];
}

/**
 * =====================================================================
 * COMPONENTE
 * =====================================================================
 */
export default function CourseList({ courses }: CourseListProps) {
  return (
    <section className="bg-muted py-20">
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
