"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { hasCourseAccess } from "@/features/courses/services/courseService";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import type { Course, Module } from "@/features/courses/types/course";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Caricamento asincrono del corso in base allo slug reale presente sul DB
  useEffect(() => {
    async function loadCourseDetail() {
      setIsLoading(true);
      try {
        const liveCourses = await getLiveCourses();
        const currentCourse = liveCourses.find((c) => c.slug === slug);
        setCourse(currentCourse || null);
      } catch (err) {
        console.error("Errore nel caricamento del corso:", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) {
      loadCourseDetail();
    }
  }, [slug]);

  // Se stiamo caricando, mostriamo uno stato di attesa elegante
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm animate-pulse">
            Sincronizzazione contenuti del corso...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Se il corso non esiste sul DB emaniamo il 404
  if (!course) {
    notFound();
  }

  // Calcolo delle autorizzazioni di acesso basate sulla logica esistente
  const isClassAuthorized = hasCourseAccess(course, user);
  const isPendingUser =
    user && user.status === "pending" && user.role !== "admin";

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      {/* 🎯 IL SENSORE ATTIVO IN BACKGROUND */}
      <ActivityTracker />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {/* INTESTAZIONE DEL CORSO */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center border-b border-border pb-8">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-border bg-background p-2 shadow-sm flex items-center justify-center text-4xl">
            {course.coverImage ? (
              course.coverImage.startsWith("http") ||
              course.coverImage.startsWith("/") ? (
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span>{course.coverImage}</span>
              )
            ) : (
              <div className="h-full w-full rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                📚 LMS
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {course.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{course.description}</p>
          </div>
        </div>

        {/* CORPO INFERIORE */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Moduli del corso
            </h2>

            {!user ? (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
                <span className="text-3xl">🔒</span>
                <h3 className="text-lg font-bold text-yellow-800 mt-2">
                  Autenticazione Richiesta
                </h3>
                <p className="text-sm text-yellow-700 my-2">
                  Accedi con il tuo account per sbloccare i moduli multimediali.
                </p>
                <div className="mt-3">
                  <LoginDialog />
                </div>
              </div>
            ) : isPendingUser ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center shadow-sm">
                <span className="text-3xl">⏳</span>
                <h3 className="text-lg font-bold text-amber-800 mt-2">
                  Account in fase di verifica
                </h3>
                <p className="text-sm text-amber-700 mt-2">
                  Il tuo account è attualmente in attesa di attivazione da parte
                  dello staff.
                </p>
              </div>
            ) : !isClassAuthorized ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                <span className="text-3xl">🚫</span>
                <h3 className="text-lg font-bold text-red-800 mt-2">
                  Accesso Riservato
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Il tuo utente non ha i permessi per accedere a questo
                  materiale.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module: Module) => (
                    <div
                      key={module.id}
                      className="rounded-lg border bg-background p-4 shadow-sm"
                    >
                      <h3 className="font-bold text-foreground">
                        📂 {module.title}
                      </h3>
                      <ul className="mt-3 space-y-2 pl-2">
                        {module.lessons && module.lessons.length > 0 ? (
                          module.lessons.map((lesson: any) => {
                            const currentType =
                              lesson.contentType || lesson.content_type;
                            return (
                              <li
                                key={lesson.id}
                                className="flex justify-between items-center text-sm p-2 rounded border border-transparent transition-colors hover:bg-muted hover:border-border"
                              >
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/courses/${slug}/modules/${module.id}/lessons/${lesson.id}`,
                                    )
                                  }
                                  className="text-blue-600 hover:underline font-medium text-left flex items-center gap-2"
                                >
                                  <span>
                                    {currentType === "video"
                                      ? "📺"
                                      : currentType === "colab"
                                        ? "🚀"
                                        : "📄"}
                                  </span>
                                  <span>{lesson.title}</span>
                                </button>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {currentType === "video"
                                    ? "Video YouTube"
                                    : currentType === "colab"
                                      ? "Google Colab"
                                      : "Google Drive"}
                                </span>
                              </li>
                            );
                          })
                        ) : (
                          <li className="text-xs italic text-muted-foreground pl-6">
                            Nessuna lezione presente.
                          </li>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-muted-foreground p-4">
                    Nessun modulo didattico caricato per questo corso.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* COLONNA INFO LATERALE */}
          <div className="space-y-4 rounded-xl border bg-background p-5 shadow-sm h-fit">
            <h3 className="font-bold text-foreground border-b pb-2">
              Informazioni Corso
            </h3>
            <div className="text-sm space-y-3 text-muted-foreground">
              <div>
                <strong>Categoria:</strong>{" "}
                <p className="text-foreground mt-0.5">{course.category}</p>
              </div>
              <div>
                <strong>Difficoltà:</strong>{" "}
                <p className="text-foreground mt-0.5">{course.difficulty}</p>
              </div>
              <div>
                <strong>Ore stimate:</strong>{" "}
                <p className="text-foreground mt-0.5">
                  {course.estimatedHours} ore
                </p>
              </div>
              <div>
                <strong>Docente:</strong>{" "}
                <p className="text-foreground mt-0.5">{course.teacher}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}