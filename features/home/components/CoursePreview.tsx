"use client";

import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";
import CourseCard from "@/features/courses/components/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";

export default function CoursePreview() {
  const { courses, isLoading } = useCourses();

  return (
    <section className="bg-muted py-20 transition-colors duration-300">
      <PageContainer>

        <SectionTitle
          title="Corsi in evidenza"
          subtitle="Una selezione dei corsi disponibili nella piattaforma in tempo reale."
        />


        {isLoading ? (

          <div className="flex justify-center items-center py-12">
            <p className="text-muted-foreground text-sm animate-pulse">
              Caricamento corsi in evidenza...
            </p>
          </div>

        ) : courses.length === 0 ? (

          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm italic">
              Nessun corso disponibile al momento.
            </p>
          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
              />
            ))}
          </div>

        )}

      </PageContainer>
    </section>
  );
}