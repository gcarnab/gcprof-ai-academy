import CourseCard from "./CourseCard";
import { Course } from "../types/course";
import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";
import { siteConfig } from "@/shared/config/site";

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
          subtitle={`Tutti i corsi disponibili su ${siteConfig.siteName}.`}
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
