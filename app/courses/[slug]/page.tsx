"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { hasCourseAccess } from "@/features/courses/services/courseService";
import type { Course, Module, Lesson } from "@/features/courses/types/course";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import { checkExternalCourseAccessAction } from "@/features/courses/services/checkExternalCourseAccessAction";
import { AddToCartButton } from "@/features/payments/components/AddToCartButton";

const CONTENT_TYPES: Record<
  string,
  { icon: string; label: string; textStyle: string; badgeStyle: string }
> = {
  video: {
    icon: "📺",
    label: "Video YouTube",
    textStyle: "text-blue-600 hover:text-blue-800",
    badgeStyle: "text-blue-600 bg-blue-50 border-blue-200",
  },
  colab: {
    icon: "🚀",
    label: "Google Colab",
    textStyle: "text-emerald-600 hover:text-emerald-800",
    badgeStyle: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  quiz: {
    icon: "📝",
    label: "Quiz di Verifica",
    textStyle: "text-purple-600 hover:text-purple-800",
    badgeStyle: "text-purple-600 bg-purple-50 border-purple-200",
  },
  default: {
    icon: "📄",
    label: "Google Drive",
    textStyle: "text-slate-600 hover:text-slate-800",
    badgeStyle: "text-slate-500 bg-slate-50 border-slate-200",
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function loadCourseDetail() {
      setIsLoading(true);
      try {
        const allCourses = await getLiveCourses(
          user?.role === "admin" ? "admin" : "student",
        );
        const currentCourse = allCourses.find((c: Course) => c.slug === slug);
        setCourse(currentCourse || null);

        if (currentCourse) {
          const currentUser = user as any;
          const rawUserType = String(
            currentUser?.userType || currentUser?.user_type || "",
          ).toUpperCase();
          const rawRole = String(currentUser?.role || "").toUpperCase();

          const isExternalStudent =
            rawUserType === "EXTERNAL_STUDENT" ||
            rawRole === "EXTERNAL_STUDENT";

          // 1. Gli Admin passano sempre
          if (currentUser?.role === "admin") {
            setHasAccess(true);
          }
          // 2. Controllo Iscrizione Singola per Studenti Esterni
          else if (isExternalStudent && currentUser?.id) {
            const hasExternalAccess = await checkExternalCourseAccessAction(
              String(currentCourse.id),
              currentUser.id,
            );
            setHasAccess(hasExternalAccess);
          }
          // 3. Controllo Via Classe Interna per Studenti Scuola
          else if (hasCourseAccess(currentCourse, user)) {
            setHasAccess(true);
          }
          // 4. Utente non autenticato o non autorizzato
          else {
            setHasAccess(false);
          }
        }
      } catch (err) {
        console.error("Errore nel caricamento del corso:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadCourseDetail();
    }
  }, [slug, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm animate-pulse flex items-center gap-2">
            <span className="text-lg">⏳</span> Sincronizzazione contenuti del
            corso...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const isPendingUser =
    user && user.status === "pending" && user.role !== "admin";
  const courseQuizzes = (course as any).quiz_assignments || [];
  const coursePrice = (course as any).price ?? 0;

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <ActivityTracker />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 overflow-x-auto pb-2"
        >
          <ol className="flex items-center space-x-2">
            <li>
              <span>🏠</span>{" "}
              <Link href="/dashboard?tab=courses">Dashboard</Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link href="/dashboard?tab=courses">I Miei Corsi</Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <span
                className="text-foreground font-medium truncate"
                aria-current="page"
              >
                {course.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <div className="bg-background rounded-2xl border border-border shadow-sm p-6 lg:p-8 mb-8 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative h-32 w-32 md:h-40 md:w-40 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/50 p-2 shadow-inner flex items-center justify-center text-5xl">
            {course.coverImage ? (
              course.coverImage.startsWith("http") ||
              course.coverImage.startsWith("/") ? (
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-full w-full object-contain drop-shadow-md"
                  loading="lazy"
                />
              ) : (
                <span>{course.coverImage}</span>
              )
            ) : (
              <div className="h-full w-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl">
                📚 LMS
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {course.category && (
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs font-semibold">
                  {course.category}
                </span>
              )}
              {course.difficulty && (
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-xs font-semibold">
                  {course.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {course.title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNA PRINCIPALE */}
          <div className="lg:col-span-2 space-y-6">
            {!user ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50/50 p-6 text-center shadow-sm space-y-4 mb-6">
                <span className="text-4xl">🔒</span>
                <h3 className="text-xl font-bold text-yellow-800">
                  Autenticazione Richiesta
                </h3>
                <p className="text-sm text-yellow-700 max-w-md mx-auto">
                  Accedi con il tuo account o registrati per completare
                  l'iscrizione ed accedere ai moduli didattici.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <LoginDialog />
                  <AddToCartButton
                    courseId={String(course.id)}
                    price={coursePrice}
                  />
                </div>
              </div>
            ) : isPendingUser ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-center shadow-sm mb-6">
                <span className="text-4xl">⏳</span>
                <h3 className="text-xl font-bold text-amber-800 mt-2">
                  Account in fase di verifica
                </h3>
                <p className="text-sm text-amber-700 mt-2 max-w-md mx-auto">
                  Il tuo account è attualmente in attesa di attivazione da parte
                  dello staff.
                </p>
              </div>
            ) : (
              !hasAccess && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-900/40 p-6 text-center shadow-sm mb-6 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-lg">
                    <span>👀</span> Visualizzazione Anteprima
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 max-w-md mx-auto">
                    Stai consultando l'anteprima del corso. Iscriviti per
                    sbloccare l'accesso completo a tutti i moduli e le
                    verifiche.
                  </p>
                  <div className="pt-2 max-w-xs mx-auto">
                    <AddToCartButton
                      courseId={String(course.id)}
                      price={coursePrice}
                    />
                  </div>
                </div>
              )
            )}

            {/* SEZIONE QUIZ (Visibile solo agli utenti con accesso completo) */}
            {hasAccess && courseQuizzes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span>🎯</span> Verifiche e Quiz
                </h2>
                <div className="rounded-2xl border border-purple-100 bg-purple-50/30 p-2 shadow-sm space-y-1">
                  {courseQuizzes.map((assignment: any, index: number) => {
                    const quizTitle =
                      assignment.quiz_title ||
                      assignment.quiz?.title ||
                      `Quiz di Verifica #${index + 1}`;

                    return (
                      <div
                        key={assignment.id || index}
                        className="flex justify-between items-center text-sm p-3 rounded-xl border bg-background/80 border-purple-100/50 transition-all hover:bg-white hover:shadow-sm"
                      >
                        <button
                          onClick={() =>
                            router.push(
                              `/courses/${slug}/quizzes/${assignment.quiz_id}`,
                            )
                          }
                          className="font-semibold text-left flex items-center gap-3 text-purple-700 hover:text-purple-900 transition-colors"
                        >
                          <span className="text-lg bg-purple-100 rounded-lg p-1.5 select-none">
                            📝
                          </span>
                          <span className="hover:underline underline-offset-4">
                            {quizTitle}
                          </span>
                        </button>

                        {assignment.due_at && (
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-md">
                            Scadenza:{" "}
                            {new Date(assignment.due_at).toLocaleDateString(
                              "it-IT",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SEZIONE MODULI (Visibile sia in anteprima che per gli iscritti) */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span>📚</span> Moduli del Corso
              </h2>

              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules.map((module: Module) => (
                    <div
                      key={module.id}
                      className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:border-muted-foreground/30"
                    >
                      <div className="bg-muted/30 px-5 py-4 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                          <span className="text-muted-foreground">📂</span>{" "}
                          {module.title}
                        </h3>
                      </div>

                      <div className="p-3">
                        <ul className="space-y-1">
                          {module.lessons && module.lessons.length > 0 ? (
                            module.lessons.map((lesson: Lesson) => {
                              const rawType = (lesson.contentType ||
                                (lesson as any).content_type) as string;
                              const config =
                                CONTENT_TYPES[rawType] || CONTENT_TYPES.default;

                              const isPreview = Boolean(
                                (lesson as any).is_preview,
                              );

                              const canAccessLesson = hasAccess || isPreview;

                              const targetPath =
                                rawType === "quiz"
                                  ? `/courses/${slug}/modules/${module.id}/quizzes/${lesson.id}`
                                  : `/courses/${slug}/modules/${module.id}/lessons/${lesson.id}`;

                              return (
                                <li key={lesson.id}>
                                  <button
                                    onClick={() => {
                                      if (canAccessLesson) {
                                        router.push(targetPath);
                                      }
                                    }}
                                    disabled={!canAccessLesson}
                                    className={`w-full flex justify-between items-center text-sm p-3 rounded-xl transition-all ${
                                      canAccessLesson
                                        ? "hover:bg-muted group cursor-pointer"
                                        : "opacity-60 cursor-not-allowed bg-muted/20"
                                    }`}
                                  >
                                    <div
                                      className={`font-medium text-left flex items-center gap-3 ${
                                        canAccessLesson
                                          ? config.textStyle
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      <span className="text-lg bg-background shadow-sm rounded-md p-1 group-hover:scale-110 transition-transform select-none">
                                        {canAccessLesson ? config.icon : "🔒"}
                                      </span>
                                      <span
                                        className={
                                          canAccessLesson
                                            ? "group-hover:underline underline-offset-4"
                                            : ""
                                        }
                                      >
                                        {lesson.title}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {isPreview && !hasAccess && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                          Anteprima
                                        </span>
                                      )}
                                      <span
                                        className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border ${config.badgeStyle}`}
                                      >
                                        {config.label}
                                      </span>
                                    </div>
                                  </button>
                                </li>
                              );
                            })
                          ) : (
                            <li className="text-sm italic text-muted-foreground p-4 text-center">
                              Nessun contenuto attualmente presente in questo
                              modulo.
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-transparent p-12 text-center">
                  <p className="text-muted-foreground">
                    Nessun modulo didattico caricato per questo corso.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="relative">
            <div className="space-y-6 rounded-2xl border border-border bg-background p-6 shadow-sm sticky top-6">
              <h3 className="font-bold text-lg text-foreground border-b border-border pb-3 flex items-center gap-2">
                <span>ℹ️</span> Info Corso
              </h3>

              <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  Sintesi
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {course.description
                    ? course.description.length > 160
                      ? `${course.description.substring(0, 160).trim()}...`
                      : course.description
                    : "Nessuna sintesi disponibile per questo corso."}
                </p>
              </div>

              <div className="space-y-1 text-sm pt-2">
                <div className="flex justify-between items-center py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Categoria</span>
                  <span className="font-medium text-foreground text-right">
                    {course.category || "Generale"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Livello</span>
                  <span className="font-medium text-foreground text-right">
                    {course.difficulty || "Non specificato"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Durata stimata</span>
                  <span className="font-medium text-foreground text-right">
                    {course.estimatedHours
                      ? `${course.estimatedHours} ore`
                      : "N/D"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5">
                  <span className="text-muted-foreground">Docente</span>
                  <span className="font-medium text-foreground text-right">
                    {course.teacher || "Team Academy"}
                  </span>
                </div>
              </div>

              {!hasAccess && (
                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Prezzo Iscrizione
                    </span>
                    <span className="text-2xl font-extrabold text-foreground">
                      {coursePrice > 0 ? `€${coursePrice}` : "Gratuito"}
                    </span>
                  </div>
                  <AddToCartButton
                    courseId={String(course.id)}
                    price={coursePrice}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
