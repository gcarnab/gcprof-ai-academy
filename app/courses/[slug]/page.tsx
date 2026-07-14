"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { hasCourseAccess} from "@/features/courses/services/courseService";
import type { Course, Module, Lesson } from "@/features/courses/types/course"; 
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { getLiveCourses } from "@/features/courses/services/courseActions";

// Mappa di configurazione dei contenuti per gestire i Quiz e gli altri formati
const CONTENT_TYPES: Record<string, { icon: string; label: string; textStyle: string; badgeStyle: string }> = {
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

  useEffect(() => {
    async function loadCourseDetail() {
      setIsLoading(true);
      try {
        const allCourses = await getLiveCourses(user?.role === "admin" ? "admin" : "student");
        const currentCourse = allCourses.find((c: Course) => c.slug === slug);
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

  if (!course) {
    notFound();
  }

  const isClassAuthorized = hasCourseAccess(course, user);
  const isPendingUser = user && user.status === "pending" && user.role !== "admin";

  // Estraiamo in modo sicuro l'array dei quiz a livello di corso
  const courseQuizzes = (course as any).quiz_assignments || [];

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <ActivityTracker />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {/* INTESTAZIONE DEL CORSO */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center border-b border-border pb-8">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-border bg-background p-2 shadow-sm flex items-center justify-center text-4xl">
            {course.coverImage ? (
              course.coverImage.startsWith("http") || course.coverImage.startsWith("/") ? (
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

        {/* CORPO CONTENUTI */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

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
                  Il tuo account è attualmente in attesa di attivazione da parte dello staff.
                </p>
              </div>
            ) : !isClassAuthorized ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                <span className="text-3xl">🚫</span>
                <h3 className="text-lg font-bold text-red-800 mt-2">
                  Accesso Riservato
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Il tuo utente non ha i permessi per accedere a questo materiale.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* SEZIONE: QUIZ DIRETTI DEL CORSO */}
                {courseQuizzes.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground">
                      Quiz del Corso
                    </h2>
                    <div className="rounded-lg border border-purple-100 bg-purple-50/40 p-4 shadow-sm space-y-2">
                      {courseQuizzes.map((assignment: any, index: number) => {
                        const quizTitle = assignment.quiz_title || assignment.quiz?.title || `Quiz di Verifica #${index + 1}`;
                        
                        return (
                          <div 
                            key={assignment.id || index}
                            className="flex justify-between items-center text-sm p-2 rounded border bg-background border-purple-100 transition-colors hover:bg-purple-50/50"
                          >
                            <button
                              onClick={() => router.push(`/courses/${slug}/quizzes/${assignment.quiz_id}`)}
                              className="underline-offset-2 hover:underline font-semibold text-left flex items-center gap-2 text-purple-700 hover:text-purple-900"
                            >
                              <span className="text-base select-none">📝</span>
                              <span>{quizTitle}</span>
                            </button>
                            
                            {assignment.due_at && (
                              <span className="text-xs text-muted-foreground font-mono">
                                Scadenza: {new Date(assignment.due_at).toLocaleDateString("it-IT", {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SEZIONE: MODULI E LEZIONI */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-foreground">
                    Moduli del corso
                  </h2>
                  
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
                            module.lessons.map((lesson: Lesson) => {
                              const rawType = (lesson.contentType || (lesson as any).content_type) as string;
                              const config = CONTENT_TYPES[rawType] || CONTENT_TYPES.default;

                              const targetPath = rawType === "quiz"
                                ? `/courses/${slug}/modules/${module.id}/quizzes/${lesson.id}`
                                : `/courses/${slug}/modules/${module.id}/lessons/${lesson.id}`;

                              return (
                                <li
                                  key={lesson.id}
                                  className="flex justify-between items-center text-sm p-2 rounded border border-transparent transition-colors hover:bg-muted hover:border-border"
                                >
                                  <button
                                    onClick={() => router.push(targetPath)}
                                    className={`underline-offset-2 hover:underline font-medium text-left flex items-center gap-2 ${config.textStyle}`}
                                  >
                                    <span className="text-base select-none">{config.icon}</span>
                                    <span>{lesson.title}</span>
                                  </button>
                                  
                                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${config.badgeStyle}`}>
                                    {config.label}
                                  </span>
                                </li>
                              );
                            })
                          ) : (
                            <li className="text-xs italic text-muted-foreground pl-6">
                              Nessun contenuto presente in questo modulo.
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