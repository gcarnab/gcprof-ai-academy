import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "../../users/services/adminService";
import { getAvailableClassesForCourses } from "../../courses/services/adminCourseService";
import { getAllCoursesList } from "../../courses/services/adminStructureService";
import { getCourseClasses } from "@/features/courses/services/courseActions";
import { logger } from "@/lib/logger";

// 🎯 Interfaccia esportata per ProgressChartCard.tsx
export interface ChartDataPoint {
  date: string;
  views: number;
  completions: number;
}

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getAdminDashboardStats() {
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
    users,
    classes,
    courses,
    courseClasses,
    sessionsResponse,
    pageViewsResponse,
    progressResponse,
    aiReviewsResponse,
  ] = await Promise.all([
    getAdminUsersList(),
    getAvailableClassesForCourses(),
    getAllCoursesList(),
    getCourseClasses(),
    supabaseAdmin
      .from("user_sessions")
      .select("login_at, user_agent, session_duration_seconds")
      .gte("login_at", twoWeeksAgo.toISOString()),
    supabaseAdmin
      .from("user_page_views")
      .select("course_slug, lesson_slug, path")
      .gte("viewed_at", twoWeeksAgo.toISOString()),
    supabaseAdmin
      .from("profile_lessons_progress")
      .select("course_id, user_id, minutes_watched, is_completed"),
    supabaseAdmin
      .from("quiz_ai_reviews")
      .select(
        "prompt_tokens, completion_tokens, model, created_at",
      )
      .gte("created_at", twoWeeksAgo.toISOString()),
  ]);

  // 🔍 DEBUG: Verifica errori o dati restituiti da Supabase
  if (aiReviewsResponse.error) {
    logger.error(
      "❌ Errore Supabase quiz_ai_reviews:",
      aiReviewsResponse.error,
    );
  } else {
    logger.info(
      `✅ Trovate ${aiReviewsResponse.data?.length || 0} righe in quiz_ai_reviews.`,
    );
    console.log("Esempio riga AI:", aiReviewsResponse.data?.[0]);
  }

  const sessions = sessionsResponse.data ?? [];
  const pageViews = pageViewsResponse.data ?? [];
  const lessonProgress = progressResponse.data ?? [];
  const aiReviews = aiReviewsResponse.data ?? [];

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

  // ============================================================================
  // 🤖 METRICHE E AGGREGAZIONE CONSUMI AI & TOKEN
  // ============================================================================
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

    // Modello AI
    const modelName = review.model || "Gemini / AI Standard";
    aiModelDistribution[modelName] = (aiModelDistribution[modelName] || 0) + 1;

    // Trend giornaliero
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

  // ============================================================================
  // 🏆 CALCOLO GAMIFICATION & TEMPO CUMULATO GLOBALE
  // ============================================================================
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

  // ============================================================================
  // 📊 CALCOLO AGGREGATO GAMIFICATION PER SINGOLO CORSO
  // ============================================================================
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
    if (p.user_id) entry.uniqueStudents.add(p.user_id);
    if (p.is_completed) entry.completedLessons += 1;
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

    return {
      courseId: String(c.id),
      title: c.title,
      slug: c.slug,
      isPublished: Boolean(c.published),
      difficulty: c.difficulty || "Facile",
      enrolledStudentsCount: progData.uniqueStudents.size,
      totalMinutesStudied: progData.totalMinutes,
      totalXp: progData.completedLessons * 50,
      averageLevel: 1,
    };
  });

  // ============================================================================
  // 👥 USERS CHARTS
  // ============================================================================
  const usersByRole = users.reduce((acc: any, u: any) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const usersByStatus = users.reduce((acc: any, u: any) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
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

  const studentEngagement = users
    .filter((u: any) => u.role === "student")
    .map((u: any) => {
      const userClassesArray = u.classes || [];
      return {
        name:
          u.display_name ||
          `${u.first_name || ""} ${u.last_name || ""}`.trim() ||
          u.email ||
          "Studente",
        hours: u.total_minutes_active ?? 0,
        classes:
          userClassesArray.length > 0
            ? userClassesArray.join(", ")
            : "Nessuna classe",
      };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, engagementLimit);

  // ============================================================================
  // 🛰️ TRACKING & TRAFFIC CHARTS
  // ============================================================================
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

  // ============================================================================
  // 🚀 TRASFORMAZIONE DIVERSE
  // ============================================================================
  const courseViewsMap = pageViews.reduce((acc: Record<string, number>, pv) => {
    if (pv.course_slug) acc[pv.course_slug] = (acc[pv.course_slug] || 0) + 1;
    return acc;
  }, {});

  const mostViewedCoursesRaw = Object.entries(courseViewsMap)
    .map(([slug, count]) => {
      const courseObj = courses.find(
        (c: any) => c.slug === slug || c.id === slug,
      );
      return { label: courseObj?.title || slug, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, statsLimit);

  const mostViewedCourses: Record<string, number> = {};
  if (mostViewedCoursesRaw.length > 0) {
    mostViewedCoursesRaw.forEach((item) => {
      mostViewedCourses[item.label] = item.count;
    });
  } else {
    mostViewedCourses["Nessun dato di navigazione"] = 0;
  }

  const lessonTitleMap = new Map<string, string>();
  const lessonSlugsList: string[] = [];

  courses.forEach((c: any) => {
    (c.course_modules || []).forEach((m: any) => {
      (m.course_lessons || []).forEach((l: any) => {
        if (l.slug && l.title) {
          lessonTitleMap.set(l.slug, l.title);
          lessonSlugsList.push(l.slug);
        }
      });
    });
  });

  lessonSlugsList.sort((a, b) => b.length - a.length);

  const lessonViewsMap = pageViews.reduce(
    (acc: Record<string, number>, pv: any) => {
      let matchedTitle = "";

      if (pv.lesson_slug && lessonTitleMap.has(pv.lesson_slug)) {
        matchedTitle = lessonTitleMap.get(pv.lesson_slug)!;
      } else if (pv.path) {
        const foundSlug = lessonSlugsList.find((slug) =>
          pv.path.includes(slug),
        );
        if (foundSlug) {
          matchedTitle = lessonTitleMap.get(foundSlug)!;
        }
      }

      if (!matchedTitle) {
        if (!pv.path && !pv.lesson_slug) return acc;
        const rawKey = pv.lesson_slug || pv.path;
        matchedTitle = rawKey.split("/").filter(Boolean).pop() || rawKey;
        matchedTitle = matchedTitle.replace(/-/g, " ");
      }

      acc[matchedTitle] = (acc[matchedTitle] || 0) + 1;
      return acc;
    },
    {},
  );

  const mostViewedLessonsRaw = Object.entries(lessonViewsMap)
    .map(([label, count]) => ({ label, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, statsLimit);

  const mostViewedLessons: Record<string, number> = {};
  if (mostViewedLessonsRaw.length > 0) {
    mostViewedLessonsRaw.forEach((item) => {
      mostViewedLessons[item.label] = item.count;
    });
  } else {
    mostViewedLessons["Nessun dato di navigazione"] = 0;
  }

  // ============================================================================
  // 🎓 COURSES CHARTS
  // ============================================================================
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
      title: c.title,
      modules: c.course_modules?.length ?? 0,
    }))
    .sort((a, b) => b.modules - a.modules)
    .slice(0, statsLimit);

  const lessonsPerCourse = courses
    .map((c: any) => ({
      title: c.title,
      lessons:
        c.course_modules?.reduce(
          (acc: number, m: any) => acc + (m.course_lessons?.length ?? 0),
          0,
        ) ?? 0,
    }))
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, statsLimit);

  const courseComplexity = {
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
      mostViewedCourses,
      mostViewedLessons,
      aiDailyTokensTrend,
      aiDailyReviewsTrend,
      aiModelDistribution,
    },
    raw: { users, classes, courses, course_classes: courseClasses },
  };
}
