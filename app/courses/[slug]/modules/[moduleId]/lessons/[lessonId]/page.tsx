"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import LessonRenderer, {
  LessonContent,
} from "@/features/courses/components/lesson/LessonRenderer";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { MarkdownPreview } from "@/features/courses/components/MarkdownPreview";
import { logger } from "@/lib/logger";
import { useAuth } from "@/features/auth/context/AuthContext";
import { hasCourseAccess } from "@/features/courses/services/courseService";
import { checkExternalCourseAccessAction } from "@/features/courses/services/checkExternalCourseAccessAction";

export default function LessonPage() {
  const params = useParams();
  const { user } = useAuth();

  logger.info(
    "gcprof-ai-academy\\app\\courses\\[slug]\\modules\\[moduleId]\\lessons\\[lessonId]\\page.tsx Componente avviato. Params correnti:",
    params
  );
  console.log(
    "gcprof-ai-academy\\app\\courses\\[slug]\\modules\\[moduleId]\\lessons\\[lessonId]\\page.tsx Componente avviato. Params correnti:",
    params
  );

  const slug = params?.slug as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;

  const [data, setData] = useState<{
    course: any;
    module: any;
    lesson: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function loadLessonData() {
      // 🔴 CHECKPOINT 2: L'effetto di caricamento parte?
      logger.warn("=== [CHECKPOINT 2] Avvio fetch dati per:", {
        slug,
        moduleId,
        lessonId,
      });

      try {
        const liveCourses = await getLiveCourses(
          user?.role === "admin" ? "admin" : "student"
        );
        // 🔴 CHECKPOINT 3: I corsi live sono arrivati?
        logger.warn(
          "=== [CHECKPOINT 3] Corsi scaricati dal service. Totale corsi:",
          liveCourses?.length
        );

        const course = liveCourses.find((c) => c.slug === slug);
        const module = course?.modules?.find((m: any) => m.id === moduleId);
        const lesson = module?.lessons?.find((l: any) => l.id === lessonId);

        // 🔴 CHECKPOINT 4: Esito della ricerca interna
        logger.warn("=== [CHECKPOINT 4] Esito filtri:", {
          corsoTrovato: !!course,
          moduloTrovato: !!module,
          lezioneTrovata: !!lesson,
        });

        if (course && module && lesson) {
          logger.warn(
            "=== [CHECKPOINT 4-OK] Lezione trovata con successo:",
            lesson
          );
          setData({ course, module, lesson });

          // 🎯 VERIFICA ACCESSO CORSO
          const currentUser = user as any;
          const rawUserType = String(
            currentUser?.userType || currentUser?.user_type || ""
          ).toUpperCase();
          const rawRole = String(currentUser?.role || "").toUpperCase();
          const isExternalStudent =
            rawUserType === "EXTERNAL_STUDENT" || rawRole === "EXTERNAL_STUDENT";

          let accessGranted = false;
          if (currentUser?.role === "admin") {
            accessGranted = true;
          } else if (isExternalStudent && currentUser?.id) {
            accessGranted = await checkExternalCourseAccessAction(
              String(course.id),
              currentUser.id
            );
          } else if (hasCourseAccess(course, user)) {
            accessGranted = true;
          }

          setHasAccess(accessGranted);
        } else {
          logger.warn(
            "=== [CHECKPOINT 4-FAIL] Impossibile trovare la tripletta nei dati!"
          );
          setData(null);
        }
      } catch (err) {
        logger.error("=== [ERRORE GRAVE NEL FETCH]:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug && moduleId && lessonId) {
      loadLessonData();
    } else {
      logger.info("=== [CHECKPOINT PARAMETRI MANCANTI]:", {
        slug,
        moduleId,
        lessonId,
      });
    }
  }, [slug, moduleId, lessonId, user]);

  // 🔴 CHECKPOINT 5: Stato dello switch di rendering
  logger.warn("=== [CHECKPOINT 5] Stato render attuale:", {
    isLoading,
    haDati: !!data,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm animate-pulse">
            Caricamento risorsa didattica (Diagnostica Attiva)...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    // 🔴 CHECKPOINT 6: Deviazione verso il 404
    logger.warn(
      "=== [CHECKPOINT 6] Dati assenti. Innesco notFound() di Next.js"
    );
    notFound();
    return null;
  }

  const { course, module, lesson } = data;

  // 🎯 CALCOLO DISPONIBILITÀ ANTEPRIMA / ACCESSO
  const isPreview = Boolean(lesson.isPreview || lesson.is_preview);
  const canAccessLesson = hasAccess || isPreview;

  const normalizedType = (
    lesson.content_type ||
    lesson.contentType ||
    ""
  ).toLowerCase();
  const normalizedUrl =
    lesson.external_url ||
    lesson.externalUrl ||
    lesson.video_url ||
    lesson.youtubeUrl ||
    lesson.googleDriveUrl ||
    "";
  const normalizedContent = lesson.content || "";

  const formattedContents: LessonContent[] = [
    {
      type: normalizedType as any,
      title: lesson.title,
      url: normalizedUrl,
      content: normalizedContent,
    },
  ];

  // 🔴 CHECKPOINT 7: Arrivo al traguardo del rendering del Player
  logger.warn(
    "=== [CHECKPOINT 7] Dati pronti per il Player:",
    formattedContents
  );

  const pageContent = (
    <div className="flex min-h-screen flex-col bg-muted">
      {/* 🎯 Tracciamento attività abilitato se l'utente è autenticato */}
      {user && (
        <ActivityTracker
          courseId={course.id || course.course_id}
          lessonId={lesson.id}
        />
      )}

      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* BREADCRUMB INTERATTIVA */}
        <nav className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 select-none">
          <Link
            href="/courses"
            className="hover:text-blue-600 hover:underline transition-colors"
          >
            Corsi
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/courses/${slug}`}
            className="hover:text-blue-600 hover:underline transition-colors max-w-[200px] truncate"
            title={course.title}
          >
            {course.title}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span
            className="text-muted-foreground font-medium max-w-[250px] truncate"
            title={module.title}
          >
            {module.title}
          </span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-foreground">
            {lesson.title}
          </h1>
          {isPreview && !hasAccess && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              👀 Modulo in Anteprima
            </span>
          )}
        </div>

        <div className="mt-8">
          {!canAccessLesson ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/40 p-8 text-center shadow-sm space-y-4">
              <span className="text-4xl">🔒</span>
              <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300">
                Contenuto Riservato
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-400 max-w-md mx-auto leading-relaxed">
                Questa lezione fa parte del corso <strong>{course.title}</strong> ed è accessibile solo agli studenti iscritti.
              </p>
              <div className="pt-2">
                <Link
                  href={`/courses/${slug}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Iscriviti al corso per accedere
                </Link>
              </div>
            </div>
          ) : normalizedType === "markdown" ? (
            <div className="p-6 bg-background dark:bg-card rounded-lg shadow-sm border border-border">
              <MarkdownPreview content={normalizedContent} />
            </div>
          ) : (
            <LessonRenderer contents={formattedContents} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );

  // 🎯 Se è un'anteprima, non blocchiamo con ProtectedRoute (consente anche la fruizione libera dell'anteprima)
  if (isPreview) {
    return pageContent;
  }

  return <ProtectedRoute>{pageContent}</ProtectedRoute>;
}