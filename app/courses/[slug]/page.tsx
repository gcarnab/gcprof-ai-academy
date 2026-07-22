"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { useAuth } from "@/features/auth/context/AuthContext";

import type { Course, Module, Lesson } from "@/features/courses/types/course";
import { hasCourseAccess } from "@/features/courses/services/courseService";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import { checkExternalCourseAccessAction } from "@/features/courses/services/checkExternalCourseAccessAction";
import { enrollInFreeCourseAction } from "@/features/payments/actions/paymentActions";

import { AccessNoticeBanner } from "@/features/courses/components/AccessNoticeBanner";
import { LessonRow } from "@/features/courses/components/LessonRow";
import { CourseSidebar } from "@/features/courses/components/CourseSidebar";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourseDetail() {
      setIsLoading(true);
      try {
        const allCourses = await getLiveCourses(user?.role === "admin" ? "admin" : "student");
        const currentCourse = allCourses.find((c: Course) => c.slug === slug);
        setCourse(currentCourse || null);

        if (currentCourse) {
          const currentUser = user as any;
          const rawUserType = String(currentUser?.userType || currentUser?.user_type || "").toUpperCase();
          const rawRole = String(currentUser?.role || "").toUpperCase();
          const isExternalStudent = rawUserType === "EXTERNAL_STUDENT" || rawRole === "EXTERNAL_STUDENT";

          if (currentUser?.role === "admin") {
            setHasAccess(true);
          } else if (isExternalStudent && currentUser?.id) {
            const hasExternalAccess = await checkExternalCourseAccessAction(String(currentCourse.id), currentUser.id);
            setHasAccess(hasExternalAccess);
          } else if (hasCourseAccess(currentCourse, user)) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
          }
        }
      } catch (err) {
        console.error("Errore caricamento corso:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) loadCourseDetail();
  }, [slug, user]);

  const handleFreeEnrollment = async () => {
    if (!course?.id) return;
    setIsEnrolling(true);
    setEnrollError(null);

    try {
      const result = await enrollInFreeCourseAction(String(course.id));
      if (result.success) {
        setHasAccess(true);
        router.refresh();
      } else {
        setEnrollError(result.error || "Impossibile completare l'iscrizione.");
      }
    } catch (err) {
      console.error("Errore iscrizione gratuita:", err);
      setEnrollError("Si è verificato un errore inaspettato.");
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm animate-pulse flex items-center gap-2">
            <span className="text-lg">⏳</span> Sincronizzazione contenuti del corso...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) notFound();

  const isPendingUser = user && user.status === "pending" && user.role !== "admin";
  const courseQuizzes = (course as any).quiz_assignments || [];
  const coursePrice = (course as any).price ?? 0;

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <ActivityTracker />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 overflow-x-auto pb-2">
          <ol className="flex items-center space-x-2">
            <li><span>🏠</span> <Link href="/dashboard?tab=courses">Dashboard</Link></li>
            <li><span>/</span></li>
            <li><Link href="/dashboard?tab=courses">I Miei Corsi</Link></li>
            <li><span>/</span></li>
            <li><span className="text-foreground font-medium truncate" aria-current="page">{course.title}</span></li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <div className="bg-background rounded-2xl border border-border shadow-sm p-6 lg:p-8 mb-8 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative h-32 w-32 md:h-40 md:w-40 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/50 p-2 shadow-inner flex items-center justify-center text-5xl">
            {course.coverImage ? (
              course.coverImage.startsWith("http") || course.coverImage.startsWith("/") ? (
                <img src={course.coverImage} alt={course.title} className="h-full w-full object-contain drop-shadow-md" loading="lazy" />
              ) : (
                <span>{course.coverImage}</span>
              )
            ) : (
              <div className="h-full w-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl">📚 LMS</div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {course.category && <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs font-semibold">{course.category}</span>}
              {course.difficulty && <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-xs font-semibold">{course.difficulty}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{course.title}</h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">{course.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNA PRINCIPALE */}
          <div className="lg:col-span-2 space-y-6">
            <AccessNoticeBanner
              user={user}
              isPendingUser={isPendingUser || false}
              hasAccess={hasAccess}
              courseId={String(course.id)}
              price={coursePrice}
              isEnrolling={isEnrolling}
              enrollError={enrollError}
              onFreeEnroll={handleFreeEnrollment}
            />

            {/* SEZIONE QUIZ */}
            {hasAccess && courseQuizzes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>🎯</span> Verifiche e Quiz</h2>
                <div className="rounded-2xl border border-purple-100 bg-purple-50/30 p-2 shadow-sm space-y-1">
                  {courseQuizzes.map((assignment: any, index: number) => (
                    <div key={assignment.id || index} className="flex justify-between items-center text-sm p-3 rounded-xl border bg-background/80 border-purple-100/50 transition-all hover:bg-white hover:shadow-sm">
                      <button
                        onClick={() => router.push(`/courses/${slug}/quizzes/${assignment.quiz_id}`)}
                        className="font-semibold text-left flex items-center gap-3 text-purple-700 hover:text-purple-900 transition-colors"
                      >
                        <span className="text-lg bg-purple-100 rounded-lg p-1.5 select-none">📝</span>
                        <span className="hover:underline underline-offset-4">{assignment.quiz_title || assignment.quiz?.title || `Quiz #${index + 1}`}</span>
                      </button>
                      {assignment.due_at && (
                        <span className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-md">
                          Scadenza: {new Date(assignment.due_at).toLocaleDateString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEZIONE MODULI */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📚</span> Moduli del Corso</h2>
              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules.map((module: Module) => (
                    <div key={module.id} className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:border-muted-foreground/30">
                      <div className="bg-muted/30 px-5 py-4 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                          <span className="text-muted-foreground">📂</span> {module.title}
                        </h3>
                      </div>
                      <div className="p-3">
                        <ul className="space-y-1">
                          {module.lessons && module.lessons.length > 0 ? (
                            module.lessons.map((lesson: Lesson) => (
                              <LessonRow
                                key={lesson.id}
                                lesson={lesson}
                                moduleId={module.id}
                                courseSlug={slug}
                                hasAccess={hasAccess}
                                onNavigate={(path) => router.push(path)}
                              />
                            ))
                          ) : (
                            <li className="text-sm italic text-muted-foreground p-4 text-center">Nessun contenuto attualmente presente in questo modulo.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-transparent p-12 text-center">
                  <p className="text-muted-foreground">Nessun modulo didattico caricato per questo corso.</p>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <CourseSidebar
            course={course}
            hasAccess={hasAccess}
            coursePrice={coursePrice}
            isEnrolling={isEnrolling}
            onFreeEnroll={handleFreeEnrollment}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}