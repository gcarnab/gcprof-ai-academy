/**
 * GCPROF AI ACADEMY
 * File: app/admin/dashboard/page.tsx
 */

import { Suspense } from "react";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminDashboard from "@/features/admin/dashboard/components/AdminDashboard";
import { getAdminDashboardStats } from "@/features/admin/stats/services/adminStatsService";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getAllResourcesAdmin } from "@/features/resources/actions/resourcesActions";
import { getTrackingStats } from "@/features/admin/tracking/services/trackingQueries";
import { PaymentsTabContent } from "@/features/payments/components/PaymentsTabContent";
import { logger } from "@/lib/logger";

// Import dell'infrastruttura di gestione configurazioni di sistema
import { SupabaseSystemSettingsRepository } from "@/features/system/repositories/SupabaseSystemSettingsRepository";
import { SystemSettingsService } from "@/features/system/services/SystemSettingsService";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Amministrazione",
  description: "Dashboard amministrativa di GCPROF Academy.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    tab?: string;
    subtab?: string;
  }>;
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();

  // Inizializzazione repository e servizio per le impostazioni
  const systemSettingsRepository = new SupabaseSystemSettingsRepository();
  const systemSettingsService = new SystemSettingsService(
    systemSettingsRepository,
  );

  // 📡 Esecuzione in parallelo delle chiamate principali
  const [
    stats,
    trackingStats,
    resources,
    quizzesRes,
    coursesRes,
    courseStatsRes,
    initialSystemSettings,
  ] = await Promise.all([
    getAdminDashboardStats(),
    getTrackingStats(),
    getAllResourcesAdmin(),

    /*

    supabase
      .from("quizzes")
      .select("id, title, status, passing_score, created_at")
      .order("created_at", { ascending: false }),
*/

    supabase
      .from("quizzes")
      .select(
        `
    id,
    title,
    status,
    passing_score,
    created_at,
    course_id,
    module_id,

    courses (
      id,
      title
    ),

    course_modules (
      id,
      title
    ),

    quiz_attempts (
      id,
      status
    )
  `,
      )
      .order("created_at", { ascending: false }),

    supabase
      .from("courses")
      .select("id, title, slug, published, difficulty, created_at")
      .order("title", { ascending: true }),
    supabase
      .from("user_course_stats")
      .select("course_id, profile_id, course_xp, course_level"),
    systemSettingsService.getHomeBannerSettings(),
  ]);

  if (quizzesRes.error) {
    logger.error(
      "Errore nel recupero dei quiz nella rotta admin page:",
      quizzesRes.error,
    );
  }

  if (coursesRes.error) {
    logger.error(
      "Errore nel recupero dei corsi per le statistiche admin:",
      coursesRes.error,
    );
  }

  if (courseStatsRes.error) {
    logger.error(
      "Errore nel recupero delle statistiche gamification (user_course_stats):",
      courseStatsRes.error,
    );
  }

  // 🧮 Aggregazione delle metriche di Gamification e Utilizzo per Singolo Corso
  const coursesList = coursesRes.data || [];
  const rawCourseStats = courseStatsRes.data || [];

  const courseStats = coursesList.map((course) => {
    const statsForCourse = rawCourseStats.filter(
      (s) => String(s.course_id) === String(course.id),
    );

    const enrolledStudentsCount = statsForCourse.length;
    const totalXp = statsForCourse.reduce(
      (acc, curr) => acc + (curr.course_xp || 0),
      0,
    );
    const totalMinutesStudied = 0; // In attesa di tracciamento minuti dedicati per singolo corso

    const averageLevel =
      enrolledStudentsCount > 0
        ? Math.round(
            (statsForCourse.reduce(
              (acc, curr) => acc + (curr.course_level || 1),
              0,
            ) /
              enrolledStudentsCount) *
              10,
          ) / 10
        : 1;

    return {
      courseId: course.id,
      title: course.title,
      slug: course.slug,
      isPublished: course.published ?? true,
      difficulty: course.difficulty || "Facile",
      enrolledStudentsCount,
      totalXp,
      totalMinutesStudied,
      averageLevel,
    };
  });

  const enrichedStats = {
    ...stats,
    courseStats,
    raw: {
      ...(stats?.raw || {}),
      quizzes: (quizzesRes.data || []).map((quiz: any) => ({
        ...quiz,

        attemptsCount: quiz.quiz_attempts?.length ?? 0,

        pendingReviews:
          quiz.quiz_attempts?.filter((a: any) => a.status === "submitted")
            .length ?? 0,

        assignedCourse: quiz.courses ?? null,

        assignedModule: quiz.course_modules ?? null,
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        <AdminDashboard
          stats={enrichedStats}
          currentTab={params.tab ?? "courses"}
          trackingStats={trackingStats}
          initialResources={resources}
          initialSystemSettings={initialSystemSettings}
          paymentsTab={
            <Suspense
              key={params.subtab || "overview"}
              fallback={
                <div className="p-12 text-center text-muted-foreground animate-pulse">
                  Caricamento sezione pagamenti...
                </div>
              }
            >
              <PaymentsTabContent subtab={params.subtab} />
            </Suspense>
          }
        />
      </main>

      <Footer />
    </div>
  );
}
