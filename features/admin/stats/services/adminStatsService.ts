import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "../../users/services/adminService";
import { getAvailableClassesForCourses } from "../../courses/services/adminCourseService";
import { getAllCoursesList } from "../../courses/services/adminStructureService";
import { getCourseClasses } from "@/features/courses/services/courseActions";
import { logger } from "@/lib/logger"; // Utilizzo rigoroso del logger minuscolo

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getAdminDashboardStats() {
  // Variable d'ambiente configurata per la finestra temporale
  const statsWindowDays = parseInt(process.env.NEXT_PUBLIC_ADMIN_STATS_WINDOW_DAYS || "14", 10);
  
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - statsWindowDays);

  logger.info(`Estrazione statistiche admin con finestra temporale di ${statsWindowDays} giorni.`);

  const [users, classes, courses, courseClasses, sessionsResponse, pageViewsResponse] =
    await Promise.all([
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
        .select("course_slug, lesson_slug")
        .gte("viewed_at", twoWeeksAgo.toISOString())
    ]);

  const sessions = sessionsResponse.data ?? [];
  const pageViews = pageViewsResponse.data ?? [];

  const statsLimit = parseInt(process.env.NEXT_PUBLIC_ADMIN_STATS_LIMIT || "5", 10);
  const engagementLimit = parseInt(process.env.NEXT_PUBLIC_ADMIN_STATS_ENGAGEMENT_LIMIT || "8", 10);

  const totalUsers = users.length;
  const totalCourses = courses.length;
  const totalClasses = classes.length;

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

  const studentEngagement = users
    .filter((u: any) => u.role === "student")
    .map((u: any) => {
      const userClassesArray = u.classes || [];
      return {
        name: u.display_name || `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.email || "Studente",
        hours: u.total_minutes_active ?? 0,
        classes: userClassesArray.length > 0 ? userClassesArray.join(", ") : "Nessuna classe",
      };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, engagementLimit);

  // ============================================================================
  // 🛰️ TRACKING & TRAFFIC CHARTS (Unificato ed efficiente)
  // ============================================================================
  const hourlyTraffic: Record<string, number> = {};
  for (let i = 0; i < 24; i++) {
    hourlyTraffic[`${String(i).padStart(2, "0")}:00`] = 0;
  }

  const dailyTrend: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyTrend[d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" })] = 0;
  }

  const sessionDurationDist: Record<string, number> = {
    "0-2 min": 0,
    "2-10 min": 0,
    "10-30 min": 0,
    "30+ min": 0,
  };

  const deviceDistribution: Record<string, number> = {
    "Desktop": 0,
    "Mobile/Tablet": 0,
    "Altro": 0,
  };

  // Ciclo unico di iterazione per estrarre traffico temporale, durate e user-agent
  sessions.forEach((s) => {
    if (!s.login_at) return;
    const loginDate = new Date(s.login_at);

    // 1. Traffico Orario
    const hourStr = `${String(loginDate.getHours()).padStart(2, "0")}:00`;
    if (hourlyTraffic[hourStr] !== undefined) hourlyTraffic[hourStr]++;

    // 2. Trend Giornaliero
    const dayStr = loginDate.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" });
    if (dailyTrend[dayStr] !== undefined) dailyTrend[dayStr]++;

    // 3. Durata Sessioni
    const duration = s.session_duration_seconds ?? 0;
    if (duration <= 120) sessionDurationDist["0-2 min"]++;
    else if (duration <= 600) sessionDurationDist["2-10 min"]++;
    else if (duration <= 1800) sessionDurationDist["10-30 min"]++;
    else sessionDurationDist["30+ min"]++;

    // 4. Mappatura Dispositivi
    const ua = (s.user_agent || "").toLowerCase();
    if (ua.includes("mobi") || ua.includes("android") || ua.includes("iphone")) {
      deviceDistribution["Mobile/Tablet"]++;
    } else if (ua.includes("mozilla") || ua.includes("chrome") || ua.includes("safari") || ua.includes("windows")) {
      deviceDistribution["Desktop"]++;
    } else {
      deviceDistribution["Altro"]++;
    }
  });

  // ============================================================================
  // 🚀 TRASFORMAZIONE IN OGGETTI PIATTI PER COMPONENTI GRAFICI ({})
  // ============================================================================
  
  // A. Aggregazione Corsi più visti
  const courseViewsMap = pageViews.reduce((acc: Record<string, number>, pv) => {
    if (pv.course_slug) acc[pv.course_slug] = (acc[pv.course_slug] || 0) + 1;
    return acc;
  }, {});

  const mostViewedCoursesRaw = Object.entries(courseViewsMap)
    .map(([slug, count]) => {
      const courseObj = courses.find((c: any) => c.slug === slug || c.id === slug);
      return { label: courseObj?.title || slug, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, statsLimit);

  const mostViewedCourses: Record<string, number> = {};
  if (mostViewedCoursesRaw.length > 0) {
    mostViewedCoursesRaw.forEach(item => {
      mostViewedCourses[item.label] = item.count;
    });
  } else {
    mostViewedCourses["Nessun dato di navigazione"] = 0;
  }

  // B. Aggregazione Lezioni più viste
  const lessonViewsMap = pageViews.reduce((acc: Record<string, number>, pv) => {
    if (pv.lesson_slug) acc[pv.lesson_slug] = (acc[pv.lesson_slug] || 0) + 1;
    return acc;
  }, {});

  const mostViewedLessonsRaw = Object.entries(lessonViewsMap)
    .map(([slug, count]) => {
      const formattedLabel = slug.replace(/-/g, " ");
      return { label: formattedLabel, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, statsLimit);

  const mostViewedLessons: Record<string, number> = {};
  if (mostViewedLessonsRaw.length > 0) {
    mostViewedLessonsRaw.forEach(item => {
      mostViewedLessons[item.label] = item.count;
    });
  } else {
    mostViewedLessons["Nessun dato di navigazione"] = 0;
  }

  // ============================================================================
  // 🎓 COURSES CHARTS
  // ============================================================================
  const coursesByCategory = courses.reduce((acc: any, c: any) => {
    const category = c.category || c.categories?.name || c.course_categories?.name || "Senza categoria";
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
    .map((c: any) => ({ title: c.title, modules: c.course_modules?.length ?? 0 }))
    .sort((a, b) => b.modules - a.modules)
    .slice(0, statsLimit);

  const lessonsPerCourse = courses
    .map((c: any) => ({
      title: c.title,
      lessons: c.course_modules?.reduce((acc: number, m: any) => acc + (m.course_lessons?.length ?? 0), 0) ?? 0,
    }))
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, statsLimit);

  const courseComplexity = { "Semplici (1-3 moduli)": 0, "Medio (4-7 moduli)": 0, "Complessi (8+ moduli)": 0 };
  courses.forEach((c: any) => {
    const modules = c.choice_modules?.length || c.course_modules?.length || 0;
    if (modules <= 3) courseComplexity["Semplici (1-3 moduli)"]++;
    else if (modules <= 7) courseComplexity["Medio (4-7 moduli)"]++;
    else courseComplexity["Complessi (8+ moduli)"]++;
  });

  logger.info("Stats di tracking elaborate correttamente per la dashboard.");

  return {
    totals: { users: totalUsers, courses: totalCourses, classes: totalClasses, modules: totalModules, lessons: totalLessons },
    charts: {
      usersByRole,
      usersByStatus,
      studentsByClass,
      studentEngagement,
      coursesByCategory,
      publishedCourses,
      modulesPerCourse,
      lessonsPerCourse,
      courseComplexity,
      hourlyTraffic,
      dailyTrend,
      sessionDurationDist, // Adesso integrato e mappato per DonutChartCard
      deviceDistribution,  // Adesso integrato e mappato per DonutChartCard
      mostViewedCourses, 
      mostViewedLessons, 
    },
    raw: { users, classes, courses, course_classes: courseClasses },
  };
}