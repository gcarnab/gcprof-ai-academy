"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import PageContainer from "@/shared/ui/PageContainer";
import SectionTitle from "@/shared/ui/SectionTitle";
import CourseCard from "@/features/courses/components/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useCourseCategories } from "@/features/courses/hooks/useCourseCategories";
import { siteConfig } from "@/shared/config/site";

export default function CoursePreview() {
  const { courses, isLoading: isCoursesLoading } = useCourses();
  const { categories: dbCategories, isLoading: isCategoriesLoading } = useCourseCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");

  const isLoading = isCoursesLoading || isCategoriesLoading;

  // 1. Estraiamo solo le categorie che hanno visible_home = true
  const visibleCategories = useMemo(() => {
    if (!dbCategories) return [];

    return dbCategories
      .filter((cat) => {
        // Gestisce sia il formato camelCase che snake_case di Supabase
        const isVisible = (cat as any).visible_home ?? cat.visibleHome;
        return isVisible !== false;
      })
      .sort((a, b) => {
        const orderA = (a as any).display_order ?? a.displayOrder ?? 0;
        const orderB = (b as any).display_order ?? b.displayOrder ?? 0;
        return orderA - orderB;
      });
  }, [dbCategories]);

  // Lista dei nomi per i pulsanti del filtro
  const categoryNames = useMemo(() => {
    return ["Tutti", ...visibleCategories.map((cat) => cat.name)];
  }, [visibleCategories]);

  // 2. Filtriamo i corsi da mostrare
  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses
      .filter((course) => {
        // Verifica che il corso sia pubblicato
        const isPublished = course.published !== false;
        if (!isPublished) return false;

        // Se è selezionata una categoria specifica (diversa da "Tutti")
        if (selectedCategory !== "Tutti") {
          return course.category?.toLowerCase() === selectedCategory.toLowerCase();
        }

        // Se è selezionato "Tutti", mostriamo solo i corsi delle categorie visibili in Home
        const belongsToVisibleCategory = visibleCategories.some(
          (cat) => cat.name.toLowerCase() === course.category?.toLowerCase()
        );

        return belongsToVisibleCategory;
      })
      .slice(0, 4); // Limita ai primi 4 corsi
  }, [courses, selectedCategory, visibleCategories]);

  return (
    <section className="bg-muted/40 py-16 lg:py-24 transition-colors duration-300 border-b border-border/40">
      <PageContainer>
        {/* Intestazione */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Catalogo Formativo</span>
            </div>
            <SectionTitle
              title="Corsi in evidenza"
              subtitle={`Esplora i percorsi didattici guidati dall'IA su ${siteConfig.siteName}.`}
            />
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 group self-start md:self-auto transition-colors"
          >
            <span>Vedi tutti i corsi</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Barra dei Filtri (Mostra solo le categorie con visible_home = true) */}
        {!isLoading && categoryNames.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <div className="flex items-center gap-1.5 pr-3 text-xs font-medium text-muted-foreground border-r border-border/60 shrink-0">
              <Layers className="h-3.5 w-3.5" />
              <span>Filtra:</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {categoryNames.map((categoryName) => {
                const isActive = selectedCategory === categoryName;
                return (
                  <button
                    key={categoryName}
                    onClick={() => setSelectedCategory(categoryName)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-card border border-border/80 text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {categoryName}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Griglia Corsi */}
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] rounded-2xl border border-border/60 bg-card p-5 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-muted" />
                  <div className="h-5 w-3/4 rounded-md bg-muted" />
                  <div className="h-3 w-full rounded-md bg-muted" />
                  <div className="h-3 w-2/3 rounded-md bg-muted" />
                </div>
                <div className="h-4 w-1/2 rounded-md bg-muted mt-6" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              Nessun corso disponibile per la categoria "{selectedCategory}".
            </p>
            <button
              onClick={() => setSelectedCategory("Tutti")}
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
            >
              Mostra tutti i corsi
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-300">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}