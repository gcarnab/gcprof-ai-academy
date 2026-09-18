import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "../../users/services/adminService";
import { getAvailableClassesForCourses } from "../../courses/services/adminCourseService";
import { getAllCoursesList } from "../../courses/services/adminStructureService";
import { getCourseClasses } from "@/features/courses/services/courseActions";
import { logger } from "@/lib/logger";

export interface AdminStatsFilters {
  role?: string;
  schoolTrack?: string;
  schoolSection?: string;
  className?: string;
}

export interface ChartDataPoint {
  date: string;
  views: number;
  completions: number;
}

export interface StudentEngagementItem {
  name: string;
  hours: number;
  classes: string;
}

export interface AdminStatsData {
  totals: {
    users: number;
    courses: number;
    classes: number;
    modules: number;
    lessons: number;
    totalXp: number;
    totalHoursActive: number;
    averageLevel: number;
    completionRate?: number;
    dropOffRate?: number;
    ai: {
      totalReviews: number;
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  };
  courseStats: Array<{
    courseId: string;
    title: string;
    slug: string;
    isPublished: boolean;
    difficulty: string;
    enrolledStudentsCount: number;
    totalMinutesStudied: number;
    totalXp: number;
    averageLevel: number;
  }>;
  charts: {
    usersByRole: Record<string, number>;
    usersByStatus: Record<string, number>;
    studentsByClass: Record<string, number>;
    studentsByTrack: Record<string, number>;
    studentsBySection: Record<string, number>;
    studentEngagement: StudentEngagementItem[];
    coursesByCategory: Record<string, number>;
    publishedCourses: { published: number; draft: number };
    modulesPerCourse: Array<{ title: string; modules: number }>;
    lessonsPerCourse: Array<{ title: string; lessons: number }>;
    courseComplexity: Record<string, number>;
    hourlyTraffic: Record<string, number>;
    dailyTrend: Record<string, number>;
    sessionDurationDist: Record<string, number>;
    deviceDistribution: Record<string, number>;
    mostViewedCourses: Record<string, number>;
    mostViewedLessons: Record<string, number>;
    aiDailyTokensTrend: Record<string, number>;
    aiDailyReviewsTrend: Record<string, number>;
    aiModelDistribution: Record<string, number>;
    quizPassRate: Record<string, number>;
    quizScoreDistribution: Record<string, number>;
  };
  raw?: {
    users: any[];
    classes: any[];
    courses: any[];
    course_classes: any[];
  };
}

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getAdminDashboardStats(
  filters?: AdminStatsFilters,
): Promise<AdminStatsData> {
  const statsWindowDays = parseInt(
    process.env.NEXT_PUBLIC_ADMIN_STATS_WINDOW_DAYS || "7",
    10,
  );

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - statsWindowDays);

  logger.info(
    `Estrazione statistiche admin con finestra temporale di ${statsWindowDays} giorni.`,
  );

  const [
    rawUsers,
    classes,
    courses,
    courseClasses,
    sessionsResponse,
    progressResponse,
    aiReviewsResponse,
    userCourseStatsResponse,
    quizAttemptsResponse,
  ] = await Promise.all([
    getAdminUsersList(),
    getAvailableClassesForCourses(),
    getAllCoursesList(),
    getCourseClasses(),
    supabaseAdmin
      .from("user_sessions")
      .select("login_at, user_agent, session_duration_seconds, user_id")
      .gte("login_at", twoWeeksAgo.toISOString()),
    supabaseAdmin
      .from("profile_lessons_progress")
      .select("course_id, profile_id, minutes_watched, is_completed"),
    supabaseAdmin
      .from("quiz_ai_reviews")
      .select(
        "prompt_tokens, completion_tokens, model, created_at, quiz_attempts!inner(student_id)",
      )
      .gte("created_at", twoWeeksAgo.toISOString()),
    supabaseAdmin
      .from("user_course_stats")
      .select("course_id, profile_id, course_xp, course_level"),
    supabaseAdmin
      .from("quiz_attempts")
      .select("final_score, status, student_id")
      .eq("status", "graded"),
  ]);

  if (aiReviewsResponse.error) {
    logger.error(
      "❌ Errore Supabase quiz_ai_reviews:",
      aiReviewsResponse.error,
    );
  }
  if (userCourseStatsResponse.error) {
    logger.error(
      "❌ Errore Supabase user_course_stats:",
      userCourseStatsResponse.error,
    );
  }
  if (quizAttemptsResponse.error) {
    logger.error(
      "❌ Errore Supabase quiz_attempts:",
      quizAttemptsResponse.error,
    );
  }

  // 🔍 Applica Filtri Utenti
  const users = rawUsers.filter((u: any) => {
    if (filters?.role && filters.role !== "all") {
      const userRole = u.role || "student";
      if (userRole !== filters.role) return false;
    }
    if (filters?.schoolTrack && filters.schoolTrack !== "all") {
      const track = u.schoolTrack || u.school_track || "Non Specificato";
      if (track !== filters.schoolTrack) return false;
    }
    if (filters?.schoolSection && filters.schoolSection !== "all") {
      const section = u.schoolSection || u.school_section || "Non Specificata";
      if (section !== filters.schoolSection) return false;
    }
    if (filters?.className && filters.className !== "all") {
      const userClasses = u.classes || [];
      if (!userClasses.includes(filters.className)) return false;
    }
    return true;
  });

  const filteredUserIds = new Set(
    users.map((u: any) => String(u.id || u.profile_id)),
  );
  const hasActiveUserFilter = Boolean(
    filters?.role ||
    filters?.schoolTrack ||
    filters?.schoolSection ||
    filters?.className,
  );

  // Filtra dataset secondari solo se sono presenti filtri utenti
  const sessions = (sessionsResponse.data ?? []).filter(
    (s: any) =>
      !hasActiveUserFilter ||
      !s.user_id ||
      filteredUserIds.has(String(s.user_id)),
  );

  const lessonProgress = (progressResponse.data ?? []).filter(
    (p: any) =>
      !hasActiveUserFilter ||
      !p.profile_id ||
      filteredUserIds.has(String(p.profile_id)),
  );

  const aiReviews = (aiReviewsResponse.data ?? []).filter((r: any) => {
    const studentId = String(r.quiz_attempts?.student_id || "");
    return !hasActiveUserFilter || !studentId || filteredUserIds.has(studentId);
  });

  const rawUserCourseStats = (userCourseStatsResponse.data ?? []).filter(
    (ucs: any) =>
      !hasActiveUserFilter ||
      !ucs.profile_id ||
      filteredUserIds.has(String(ucs.profile_id)),
  );

  const quizAttempts = (quizAttemptsResponse.data ?? []).filter((q: any) => {
    const studentId = String(q.student_id || "");
    return !hasActiveUserFilter || !studentId || filteredUserIds.has(studentId);
  });

  const statsLimit = parseInt(
    process.env.NEXT_PUBLIC_ADMIN_STATS_LIMIT || "5",
    10,
  );
  const engagementLimit = parseInt(
    process.env.NEXT_PUBLIC_ADMIN_STATS_ENGAGEMENT_LIMIT || "8",
    10,
  );

  const totalUsers = users.length;
  const totalCourses = courses.length;
  const totalClasses = classes.length;

  // AI & Token Metriche
  let totalPromptTokens = 0;
  let totalCompletionTokens = 0;
  let totalAiTokens = 0;
  const totalAiReviews = aiReviews.length;

  const aiDailyTokensTrend: Record<string, number> = {};
  const aiDailyReviewsTrend: Record<string, number> = {};
  const aiModelDistribution: Record<string, number> = {};

  for (let i = statsWindowDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayKey = d.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
    });
    aiDailyTokensTrend[dayKey] = 0;
    aiDailyReviewsTrend[dayKey] = 0;
  }

  aiReviews.forEach((review: any) => {
    const pTokens = Number(review.prompt_tokens || 0);
    const cTokens = Number(review.completion_tokens || 0);
    const tTokens = Number(review.total_tokens || pTokens + cTokens);

    totalPromptTokens += pTokens;
    totalCompletionTokens += cTokens;
    totalAiTokens += tTokens;

    const modelName = review.model || "Gemini / AI Standard";
    aiModelDistribution[modelName] = (aiModelDistribution[modelName] || 0) + 1;

    if (review.created_at) {
      const reviewDate = new Date(review.created_at);
      const dayStr = reviewDate.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
      });

      if (aiDailyTokensTrend[dayStr] !== undefined) {
        aiDailyTokensTrend[dayStr] += tTokens;
        aiDailyReviewsTrend[dayStr] += 1;
      }
    }
  });

  // Analytics Quiz & Voti
  const quizPassRate: Record<string, number> = {
    "Superato (≥ 6.0)": 0,
    "Non Superato (< 6.0)": 0,
  };

  const quizScoreDistribution: Record<string, number> = {
    "Insufficiente (<6.0)": 0,
    "Sufficiente (6.0-7.0)": 0,
    "Buono (7.1-8.5)": 0,
    "Eccellente (8.6-10.0)": 0,
  };

  quizAttempts.forEach((q: any) => {
    const score = Number(q.final_score ?? 0);
    if (score >= 6.0) {
      quizPassRate["Superato (≥ 6.0)"]++;
    } else {
      quizPassRate["Non Superato (< 6.0)"]++;
    }

    if (score < 6.0) {
      quizScoreDistribution["Insufficiente (<6.0)"]++;
    } else if (score <= 7.0) {
      quizScoreDistribution["Sufficiente (6.0-7.0)"]++;
    } else if (score <= 8.5) {
      quizScoreDistribution["Buono (7.1-8.5)"]++;
    } else {
      quizScoreDistribution["Eccellente (8.6-10.0)"]++;
    }
  });

  // Gamification Globale
  let totalXp = 0;
  let totalMinutesActive = 0;
  let totalLevelSum = 0;
  let studentCount = 0;

  users.forEach((u: any) => {
    const userXp = Number(u.xp ?? u.total_xp ?? u.experience_points ?? 0);
    totalXp += userXp;

    const minutes = Number(u.total_minutes_active ?? u.minutes_active ?? 0);
    totalMinutesActive += minutes;

    if (u.role === "student" || !u.role) {
      const userLevel = Number(u.level ?? u.user_level ?? 1);
      totalLevelSum += userLevel;
      studentCount++;
    }
  });

  const totalHoursActive = Math.round(totalMinutesActive / 60);
  const averageLevel =
    studentCount > 0 ? Number((totalLevelSum / studentCount).toFixed(1)) : 1;

  // Aggregazione lezioni e statistiche corsi
  const courseProgressMap = new Map<
    string,
    {
      totalMinutes: number;
      uniqueStudents: Set<string>;
      completedLessons: number;
    }
  >();

  lessonProgress.forEach((p) => {
    if (!p.course_id) return;
    const key = String(p.course_id);

    if (!courseProgressMap.has(key)) {
      courseProgressMap.set(key, {
        totalMinutes: 0,
        uniqueStudents: new Set<string>(),
        completedLessons: 0,
      });
    }

    const entry = courseProgressMap.get(key)!;
    entry.totalMinutes += Number(p.minutes_watched || 0);

    if (p.profile_id) {
      entry.uniqueStudents.add(p.profile_id);
    }

    if (p.is_completed) entry.completedLessons += 1;
  });

  const courseGamificationMap = new Map<
    string,
    { totalXp: number; levelSum: number; count: number }
  >();

  rawUserCourseStats.forEach((ucs) => {
    if (!ucs.course_id) return;
    const key = String(ucs.course_id);
    if (!courseGamificationMap.has(key)) {
      courseGamificationMap.set(key, { totalXp: 0, levelSum: 0, count: 0 });
    }
    const g = courseGamificationMap.get(key)!;
    g.totalXp += Number(ucs.course_xp || 0);
    g.levelSum += Number(ucs.course_level || 1);
    g.count += 1;
  });

  const courseStats = courses.map((c: any) => {
    const courseIdStr = String(c.id);
    const courseSlugStr = String(c.slug || "");

    const progData = courseProgressMap.get(courseIdStr) ||
      courseProgressMap.get(courseSlugStr) || {
        totalMinutes: 0,
        uniqueStudents: new Set<string>(),
        completedLessons: 0,
      };

    const gamificationData = courseGamificationMap.get(courseIdStr) || {
      totalXp: progData.completedLessons * 50,
      levelSum: 1,
      count: 1,
    };

    return {
      courseId: courseIdStr,
      title: c.title,
      slug: c.slug,
      isPublished: Boolean(c.published),
      difficulty: c.difficulty || "Facile",
      enrolledStudentsCount: progData.uniqueStudents.size,
      totalMinutesStudied: progData.totalMinutes,
      totalXp: gamificationData.totalXp,
      averageLevel: Number(
        (gamificationData.levelSum / (gamificationData.count || 1)).toFixed(1),
      ),
    };
  });

  // Profilazione Utenti
  const usersByRole = users.reduce((acc: any, u: any) => {
    const r = u.role || "student";
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  const usersByStatus = users.reduce((acc: any, u: any) => {
    const s = u.status || "attivo";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const studentsByClass = users.reduce((acc: any, u: any) => {
    const userClasses = u.classes || [];
    if (userClasses.length === 0) {
      acc["Senza Classe"] = (acc["Senza Classe"] || 0) + 1;
    } else {
      userClasses.forEach((c: string) => {
        acc[c] = (acc[c] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const studentsByTrack = users.reduce((acc: any, u: any) => {
    const track = u.schoolTrack || u.school_track || "Non Specificato";
    acc[track] = (acc[track] || 0) + 1;
    return acc;
  }, {});

  const studentsBySection = users.reduce((acc: any, u: any) => {
    const section = u.schoolSection || u.school_section || "Non Specificata";
    acc[section] = (acc[section] || 0) + 1;
    return acc;
  }, {});

  const studentEngagement: StudentEngagementItem[] = users
    .filter((u: any) => u.role === "student" || !u.role)
    .map((u: any) => {
      const userClassesArray = u.classes || [];
      return {
        name:
          u.display_name ||
          `${u.first_name || ""} ${u.last_name || ""}`.trim() ||
          u.email ||
          "Studente",
        hours: Math.round((Number(u.total_minutes_active ?? 0) / 60) * 10) / 10,
        classes:
          userClassesArray.length > 0
            ? userClassesArray.join(", ")
            : "Nessuna classe",
      };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, engagementLimit);

  // Traffico & Log
  const hourlyTraffic: Record<string, number> = {};
  for (let i = 0; i < 24; i++) {
    hourlyTraffic[`${String(i).padStart(2, "0")}:00`] = 0;
  }

  const dailyTrend: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyTrend[
      d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" })
    ] = 0;
  }

  const sessionDurationDist: Record<string, number> = {
    "0-2 min": 0,
    "2-10 min": 0,
    "10-30 min": 0,
    "30+ min": 0,
  };

  const deviceDistribution: Record<string, number> = {
    Desktop: 0,
    "Mobile/Tablet": 0,
    Altro: 0,
  };

  sessions.forEach((s) => {
    if (!s.login_at) return;
    const loginDate = new Date(s.login_at);

    const hourStr = `${String(loginDate.getHours()).padStart(2, "0")}:00`;
    if (hourlyTraffic[hourStr] !== undefined) hourlyTraffic[hourStr]++;

    const dayStr = loginDate.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
    });
    if (dailyTrend[dayStr] !== undefined) dailyTrend[dayStr]++;

    const duration = s.session_duration_seconds ?? 0;
    if (duration <= 120) sessionDurationDist["0-2 min"]++;
    else if (duration <= 600) sessionDurationDist["2-10 min"]++;
    else if (duration <= 1800) sessionDurationDist["10-30 min"]++;
    else sessionDurationDist["30+ min"]++;

    const ua = (s.user_agent || "").toLowerCase();
    if (
      ua.includes("mobi") ||
      ua.includes("android") ||
      ua.includes("iphone")
    ) {
      deviceDistribution["Mobile/Tablet"]++;
    } else if (
      ua.includes("mozilla") ||
      ua.includes("chrome") ||
      ua.includes("safari") ||
      ua.includes("windows")
    ) {
      deviceDistribution["Desktop"]++;
    } else {
      deviceDistribution["Altro"]++;
    }
  });

  // Struttura Didattica
  const coursesByCategory = courses.reduce((acc: any, c: any) => {
    const category =
      c.category ||
      c.categories?.name ||
      c.course_categories?.name ||
      "Senza categoria";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const publishedCourses = {
    published: courses.filter((c: any) => c.published === true).length,
    draft: courses.filter((c: any) => c.published !== true).length,
  };

  let totalModules = 0;
  let totalLessons = 0;
  for (const course of courses) {
    const modules = course.course_modules ?? [];
    totalModules += modules.length;
    for (const module of modules) {
      totalLessons += (module.course_lessons ?? []).length;
    }
  }

  const modulesPerCourse = courses
    .map((c: any) => ({
      title: String(c.title || "Senza titolo"),
      modules: c.course_modules?.length ?? 0,
    }))
    .sort((a, b) => b.modules - a.modules)
    .slice(0, statsLimit);

  const lessonsPerCourse = courses
    .map((c: any) => ({
      title: String(c.title || "Senza titolo"),
      lessons:
        c.course_modules?.reduce(
          (acc: number, m: any) => acc + (m.course_lessons?.length ?? 0),
          0,
        ) ?? 0,
    }))
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, statsLimit);

  const courseComplexity: Record<string, number> = {
    Facile: 0,
    Intermedio: 0,
    Avanzato: 0,
  };

  courses.forEach((c: any) => {
    const diff = (c.difficulty || "Facile").toLowerCase();
    if (diff.includes("medio") || diff.includes("intermedio")) {
      courseComplexity["Intermedio"]++;
    } else if (diff.includes("avanzato") || diff.includes("difficile")) {
      courseComplexity["Avanzato"]++;
    } else {
      courseComplexity["Facile"]++;
    }
  });

  return {
    totals: {
      users: totalUsers,
      courses: totalCourses,
      classes: totalClasses,
      modules: totalModules,
      lessons: totalLessons,
      totalXp,
      totalHoursActive,
      averageLevel,
      ai: {
        totalReviews: totalAiReviews,
        promptTokens: totalPromptTokens,
        completionTokens: totalCompletionTokens,
        totalTokens: totalAiTokens,
      },
    },
    courseStats,
    charts: {
      usersByRole,
      usersByStatus,
      studentsByClass,
      studentsByTrack,
      studentsBySection,
      studentEngagement,
      coursesByCategory,
      publishedCourses,
      modulesPerCourse,
      lessonsPerCourse,
      courseComplexity,
      hourlyTraffic,
      dailyTrend,
      sessionDurationDist,
      deviceDistribution,
      mostViewedCourses: { "Dati non disponibili": 0 },
      mostViewedLessons: { "Dati non disponibili": 0 },
      aiDailyTokensTrend,
      aiDailyReviewsTrend,
      aiModelDistribution,
      quizPassRate,
      quizScoreDistribution,
    },
    raw: { users: rawUsers, classes, courses, course_classes: courseClasses },
  };
}
