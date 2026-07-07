"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link"; // 🎯 Importato per gestire la navigazione interna immediata
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import LessonRenderer, {
  LessonContent,
} from "@/features/courses/components/lesson/LessonRenderer";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";

export default function LessonPage() {
  const params = useParams();

  // 🔴 CHECKPOINT 1: Il componente si sta avviando?
  console.log(
    "=== [CHECKPOINT 1] Componente avviato. Params correnti:",
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

  useEffect(() => {
    async function loadLessonData() {
      // 🔴 CHECKPOINT 2: L'effetto di caricamento parte?
      console.log("=== [CHECKPOINT 2] Avvio fetch dati per:", {
        slug,
        moduleId,
        lessonId,
      });

      try {
        const liveCourses = await getLiveCourses();
        // 🔴 CHECKPOINT 3: I corsi live sono arrivati?
        console.log(
          "=== [CHECKPOINT 3] Corsi scaricati dal service. Totale corsi:",
          liveCourses?.length,
        );

        const course = liveCourses.find((c) => c.slug === slug);
        const module = course?.modules?.find((m: any) => m.id === moduleId);
        const lesson = module?.lessons?.find((l: any) => l.id === lessonId);

        // 🔴 CHECKPOINT 4: Esito della ricerca interna
        console.log("=== [CHECKPOINT 4] Esito filtri:", {
          corsoTrovato: !!course,
          moduloTrovato: !!module,
          lezioneTrovata: !!lesson,
        });

        if (course && module && lesson) {
          console.log(
            "=== [CHECKPOINT 4-OK] Lezione trovata con successo:",
            lesson,
          );
          setData({ course, module, lesson });
        } else {
          console.warn(
            "=== [CHECKPOINT 4-FAIL] Impossibile trovare la tripletta nei dati!",
          );
          setData(null);
        }
      } catch (err) {
        console.error("=== [ERRORE GRAVE NEL FETCH]:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug && moduleId && lessonId) {
      loadLessonData();
    } else {
      console.log("=== [CHECKPOINT PARAMETRI MANCANTI]:", {
        slug,
        moduleId,
        lessonId,
      });
    }
  }, [slug, moduleId, lessonId]);

  // 🔴 CHECKPOINT 5: Stato dello switch di rendering
  console.log("=== [CHECKPOINT 5] Stato render attuale:", {
    isLoading,
    haDati: !!data,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-sm animate-pulse">
            Caricamento risorsa didattica (Diagnostica Attiva)...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    // 🔴 CHECKPOINT 6: Deviazione verso il 404
    console.log(
      "=== [CHECKPOINT 6] Dati assenti. Innesco notFound() di Next.js",
    );
    notFound();
    return null;
  }

  const { course, module, lesson } = data;

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
    "" ;
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
  console.log(
    "=== [CHECKPOINT 7] Dati pronti per il Player:",
    formattedContents,
  );

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50">
        
        {/* 🎯 PASSO 1: Passiamo gli identificativi reali del corso e della lezione al tracker */}
        <ActivityTracker
          courseId={course.id || course.course_id}
          lessonId={lesson.id}
        />

        <Navbar />

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {/* 🎯 BREADCRUMB INTERATTIVA PER LA NAVIGAZIONE DI RITORNO */}
          <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-2 select-none">
            <Link
              href="/courses"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              Corsi
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/courses/${slug}`}
              className="hover:text-blue-600 hover:underline transition-colors max-w-[200px] truncate"
              title={course.title}
            >
              {course.title}
            </Link>
            <span className="text-gray-400">/</span>
            <span
              className="text-gray-700 font-medium max-w-[250px] truncate"
              title={module.title}
            >
              {module.title}
            </span>
          </nav>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {lesson.title}
          </h1>

          <div className="mt-8">
            <LessonRenderer contents={formattedContents} />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}