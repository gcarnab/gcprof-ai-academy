"use client";

import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";
import CourseCard from "@/features/courses/components/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";

export default function CoursePreview() {
  // Sfruttiamo il tuo hook dinamico che interroga Supabase e applica i filtri di sicurezza
  const { courses, isLoading } = useCourses();

  return (
    <section className="bg-gray-50 py-20">
      <PageContainer>
        <SectionTitle
          title="Corsi in evidenza"
          subtitle="Una selezione dei corsi disponibili nella piattaforma in tempo reale."
        />

        {isLoading ? (
          /* Stato di caricamento mentre i corsi arrivano dal DB */
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500 text-sm animate-pulse">
              Caricamento corsi in evidenza...
            </p>
          </div>
        ) : courses.length === 0 ? (
          /* Fallback nel caso in cui non ci siano corsi abilitati per l'utente */
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm italic">
              Nessun corso disponibile al momento.
            </p>
          </div>
        ) : (
          /* Griglia dinamica alimentata da Supabase */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}