"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
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
import { AwardBadgeResult } from "@/features/admin/users/actions/activityActions";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  logger.info(
    "gcprof-ai-academy\\app\\courses\\[slug]\\modules\\[moduleId]\\lessons\\[lessonId]\\page.tsx Componente avviato. Params correnti:",
    params,
  );
  logger.info(
    "gcprof-ai-academy\\app\\courses\\[slug]\\modules\\[moduleId]\\lessons\\[lessonId]\\page.tsx Componente avviato. Params correnti:",
    params,
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

  // 🎯 STATO MODAL SBLOCCO / COMPLETAMENTO DA TRACKER
  const [completionModal, setCompletionModal] = useState<{
    isOpen: boolean;
    badge: AwardBadgeResult | null;
  } | null>(null);

  const hasShownModalRef = useRef(false);

  // Reset del flag per la finestra modale ad ogni cambio lezione
  useEffect(() => {
    hasShownModalRef.current = false;
    setCompletionModal(null);
  }, [lessonId]);

  useEffect(() => {
    async function loadLessonData() {
      // 🔴 CHECKPOINT 2: L'effetto di caricamento parte?
      logger.debug("=== [CHECKPOINT 2] Avvio fetch dati per:", {
        slug,
        moduleId,
        lessonId,
      });

      try {
        //const liveCourses = await getLiveCourses(user?.role === "admin" ? "admin" : "student",);
        const liveCourses = await getLiveCourses("admin");

        // 🔴 CHECKPOINT 3: I corsi live sono arrivati?
        logger.debug(
          "=== [CHECKPOINT 3] Corsi scaricati dal service. Totale corsi:",
          liveCourses?.length,
        );

        const course = liveCourses.find((c) => c.slug === slug);
        const module = course?.modules?.find(
          (m: any) => String(m.id) === String(moduleId),
        );
        const lesson = module?.lessons?.find(
          (l: any) => String(l.id) === String(lessonId),
        );

        // 🔴 CHECKPOINT 4: Esito della ricerca interna
        logger.debug("=== [CHECKPOINT 4] Esito filtri:", {
          corsoTrovato: !!course,
          moduloTrovato: !!module,
          lezioneTrovata: !!lesson,
        });

        if (course && module && lesson) {
          logger.debug(
            "=== [CHECKPOINT 4-OK] Lezione trovata con successo:",
            lesson,
          );
          setData({ course, module, lesson });

          // 🎯 VERIFICA ACCESSO CORSO
          const currentUser = user as any;
          const rawUserType = String(
            currentUser?.userType || currentUser?.user_type || "",
          ).toUpperCase();
          const rawRole = String(currentUser?.role || "").toUpperCase();
          const isExternalStudent =
            rawUserType === "EXTERNAL_STUDENT" ||
            rawRole === "EXTERNAL_STUDENT";

          logger.debug("🔍 [DIAGNOSTICA ACCESSO]", {
            userId: currentUser?.id,
            userType: currentUser?.userType || currentUser?.user_type,
            role: currentUser?.role,
            isExternalStudent,
            courseId: course?.id,
            courseTitle: course?.title,
          });

          let accessGranted = false;
          if (currentUser?.role === "admin") {
            accessGranted = true;
          } else if (isExternalStudent && currentUser?.id) {
            accessGranted = await checkExternalCourseAccessAction(
              String(course.id),
              currentUser.id,
            );
          } else if (hasCourseAccess(course, user)) {
            accessGranted = true;
          }

          setHasAccess(accessGranted);
        } else {
          logger.debug(
            "=== [CHECKPOINT 4-FAIL] Impossibile trovare la tripletta nei dati!",
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
      logger.debug("=== [CHECKPOINT PARAMETRI MANCANTI]:", {
        slug,
        moduleId,
        lessonId,
      });
    }
  }, [slug, moduleId, lessonId, user]);

  // 🎯 ASCOLTTO EVENTO GLOBALE DI GAMIFICATION DA ACTIVITY TRACKER
  useEffect(() => {
    const handleGamificationUpdate = (event: CustomEvent) => {
      const detail = event.detail;
      if (!detail || String(detail.lessonId) !== String(lessonId)) return;

      const trackingResult = Array.isArray(detail.result)
        ? detail.result[0]
        : detail.result;

      const isCompleted = Boolean(
        trackingResult?.is_completed || trackingResult?.isCompleted,
      );

      if (isCompleted && !hasShownModalRef.current) {
        hasShownModalRef.current = true;
        setCompletionModal({
          isOpen: true,
          badge: detail.badge || null,
        });
      }
    };

    window.addEventListener(
      "gamification:updated",
      handleGamificationUpdate as EventListener,
    );

    return () => {
      window.removeEventListener(
        "gamification:updated",
        handleGamificationUpdate as EventListener,
      );
    };
  }, [lessonId]);

  // 🔴 CHECKPOINT 5: Stato dello switch di rendering
  logger.info("=== [CHECKPOINT 5] Stato render attuale:", {
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
      "=== [CHECKPOINT 6] Dati assenti. Innesco notFound() di Next.js",
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

  // 🎯 CALCOLO LINK LEZIONE SUCCESSIVA
  const currentModuleIndex =
    course.modules?.findIndex((m: any) => String(m.id) === String(moduleId)) ??
    -1;
  const currentLessonIndex =
    module.lessons?.findIndex((l: any) => String(l.id) === String(lessonId)) ??
    -1;

  let nextLessonUrl: string | null = null;
  if (
    module.lessons &&
    currentLessonIndex !== -1 &&
    currentLessonIndex < module.lessons.length - 1
  ) {
    const nextL = module.lessons[currentLessonIndex + 1];
    nextLessonUrl = `/courses/${slug}/modules/${module.id}/lessons/${nextL.id}`;
  } else if (
    course.modules &&
    currentModuleIndex !== -1 &&
    currentModuleIndex < course.modules.length - 1
  ) {
    const nextM = course.modules[currentModuleIndex + 1];
    if (nextM.lessons && nextM.lessons.length > 0) {
      const nextL = nextM.lessons[0];
      nextLessonUrl = `/courses/${slug}/modules/${nextM.id}/lessons/${nextL.id}`;
    }
  }

  // 🔴 CHECKPOINT 7: Arrivo al traguardo del rendering del Player
  logger.debug(
    "=== [CHECKPOINT 7] Dati pronti per il Player:",
    formattedContents,
  );

  const pageContent = (
    <div className="flex min-h-screen flex-col bg-muted">
      {/* 🎯 Tracciamento attività abilitato con passa-parametri ID Corso esplicito per la Gamification Multi-Corso */}
      {user && (
        <ActivityTracker
          key={lesson.id}
          courseId={String(course.id)}
          lessonId={String(lesson.id)}
        />
      )}

      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* BREADCRUMB INTERATTIVA 
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
*/}

        {/* BREADCRUMB INTERATTIVA */}
        <nav className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 select-none">
          {user && (
            <>
              <Link
                href="/dashboard"
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
            </>
          )}
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
          <h1 className="text-4xl font-bold text-foreground">{lesson.title}</h1>
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
                Questa lezione fa parte del corso{" "}
                <strong>{course.title}</strong> ed è accessibile solo agli
                studenti iscritti.
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

      {/* MODAL COMPLETAMENTO AUTOMATICO (Innescato da ActivityTracker) */}
      {completionModal?.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-background dark:bg-slate-900 border border-border dark:border-slate-800 p-6 md:p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="text-5xl animate-bounce">🎉</div>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                Lezione Completata!
              </h3>
              <p className="text-xs text-muted-foreground">
                Hai completato il tempo di fruizione richiesto per “
                {lesson.title}”.
              </p>
            </div>

            {/* NOTIFICA BADGE SBLOCCATO */}
            {completionModal.badge?.awarded && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      Nuovo Badge Sbloccato!
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      {completionModal.badge.badge_title}
                    </h4>
                  </div>
                </div>
                {completionModal.badge.xp_reward > 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-bold pl-11">
                    +{completionModal.badge.xp_reward} XP Bonus Guadagnati!
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => setCompletionModal(null)}
                className="w-full sm:flex-1 py-2.5 text-xs font-semibold bg-secondary text-secondary-foreground rounded-xl border border-border hover:bg-secondary/80 transition-all"
              >
                Rimani Qui
              </button>

              {nextLessonUrl ? (
                <button
                  onClick={() => {
                    setCompletionModal(null);
                    router.push(nextLessonUrl!);
                  }}
                  className="w-full sm:flex-1 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-all"
                >
                  Prossima Lezione ⚡
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="w-full sm:flex-1 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-all inline-flex items-center justify-center"
                >
                  Vai alla Dashboard 📊
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );

  // 🎯 Se è un'anteprima, non blocchiamo con ProtectedRoute
  if (isPreview) {
    return pageContent;
  }

  return <ProtectedRoute>{pageContent}</ProtectedRoute>;
}
