"use client";

import { useCourses } from "@/features/courses/hooks/useCourses";
import CourseList from "@/features/courses/components/CourseList";
import CourseSearch from "@/features/courses/components/CourseSearch";
import CategoryFilter from "@/features/courses/components/CategoryFilter";
import CoursesHeader from "@/features/courses/components/CoursesHeader";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { useAuth } from "@/features/auth/context/AuthContext";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";

export default function CoursesPage() {
  const { user } = useAuth(); // 🎯 Recuperiamo la sessione utente

  // 🎯 Recuperiamo categories direttamente dall'hook dinamico collegato al DB
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 🎯 IL SENSORE ATTIVO IN BACKGROUND */}
      <ActivityTracker />
      
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <CoursesHeader />

        {isPendingUser ? (
          // 🎯 Schermata di blocco dedicata all'utente registrato ma non ancora attivato
          <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-10 text-center shadow-sm max-w-2xl mx-auto">
            <span className="text-4xl">⏳</span>
            <h3 className="text-xl font-bold text-amber-800 mt-3">
              Account in fase di verifica
            </h3>
            <p className="text-sm text-amber-700 mt-2">
              Il tuo profilo è stato registrato con successo ed è in attesa di
              abilitazione da parte del docente. Riceverai una notifica email
              non appena l'accesso sarà attivo.
            </p>
          </div>
        ) : (
          // Catalogo Standard per Utenti Attivi o Ospiti
          <>
            <div className="mb-6">
              <CourseSearch onSearch={setSearch} />
            </div>

            <div className="mb-8">
              <CategoryFilter
                categories={categories} // 🎯 Adesso usa l'array dinamico fornito da useCourses
                selected={category}
                onChange={setCategory}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12 text-muted-foreground">
                Caricamento corsi in corso...
              </div>
            ) : (
              <CourseList courses={courses} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
