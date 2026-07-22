"use client";

import { useMemo } from "react";
import { useCourses } from "@/features/courses/hooks/useCourses";
import CourseList from "@/features/courses/components/CourseList";
import CourseSearch from "@/features/courses/components/CourseSearch";
import CategoryFilter from "@/features/courses/components/CategoryFilter";
import CoursesHeader from "@/features/courses/components/CoursesHeader";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { useAuth } from "@/features/auth/context/AuthContext";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { logger } from "@/lib/logger";

export default function CoursesPage() {
  const { user } = useAuth();

  const {
    courses,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    isLoading,
  } = useCourses();

  const isPendingUser =
    user && user.status === "pending" && user.role !== "admin";

  const displayCourses = useMemo(() => {
    if (!courses || !Array.isArray(courses)) return [];

    const currentUser = user as any;
    
    // Lettura sicura tramite String() per evitare l'errore di overlapping dei tipi TS
    const rawUserType = String(currentUser?.userType || currentUser?.user_type || "").toUpperCase();
    const rawRole = String(currentUser?.role || "").toUpperCase();

    const isExternalOrGuest =
      !user || rawUserType === "EXTERNAL_STUDENT" || rawRole === "EXTERNAL_STUDENT";

    if (isExternalOrGuest) {
      return courses
        .map((course: any) => {
          const rawModules = course.modules || course.course_modules;

          if (!rawModules || !Array.isArray(rawModules)) {
            return course;
          }

          const previewModules = rawModules.filter((mod: any) =>
            Boolean(mod.isPreview ?? mod.is_preview),
          );

          return {
            ...course,
            modules: previewModules,
            course_modules: previewModules,
          };
        })
        .filter((course: any) => {
          const rawModules = course.modules || course.course_modules;
          if (!rawModules) return true;
          return rawModules.length > 0;
        });
    }

    return courses;
  }, [courses, user]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 text-foreground transition-colors duration-200">
      <ActivityTracker />
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <CoursesHeader />

        {isPendingUser ? (
          <div className="mt-12 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-10 text-center shadow-sm max-w-2xl mx-auto">
            <span className="text-4xl">⏳</span>
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-3">
              Account in fase di verifica
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
              Il tuo profilo è stato registrato con successo ed è in attesa di
              abilitazione da parte del docente.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <CourseSearch onSearch={setSearch} />
            </div>

            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                selected={category}
                onChange={setCategory}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12 text-muted-foreground">
                Caricamento corsi in corso...
              </div>
            ) : (
              <CourseList courses={displayCourses} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}