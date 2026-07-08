import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "../../users/services/adminService";
import { getAvailableClassesForCourses } from "../../courses/services/adminCourseService";
import { getAllCoursesList } from "../../courses/services/adminStructureService";
import { getCourseClasses } from "@/features/courses/services/courseActions";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getAdminDashboardStats() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

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

  // =========================
  // USERS CHARTS
  // =========================
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
    dailyTrend[d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" })] = 0;
  }

  sessions.forEach((s) => {
    if (!s.login_at) return;
    const loginDate = new Date(s.login_at);

    const hourStr = `${String(loginDate.getHours()).padStart(2, "0")}:00`;
    if (hourlyTraffic[hourStr] !== undefined) hourlyTraffic[hourStr]++;

    const dayStr = loginDate.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" });
    if (dailyTrend[dayStr] !== undefined) dailyTrend[dayStr]++;
  });

  // ============================================================================
  // 🚀 MAPPATURA POLIMORFICA CHIAVI PER EVITARE SCHERMATE VUOTE
  // ============================================================================
  
  // A. Aggregazione Corsi più visti
  const courseViewsMap = pageViews.reduce((acc: Record<string, number>, pv) => {
    if (pv.course_slug) acc[pv.course_slug] = (acc[pv.course_slug] || 0) + 1;
    return acc;
  }, {});

  const mostViewedCourses = Object.entries(courseViewsMap)
    .map(([slug, count]) => {
      const courseObj = courses.find((c: any) => c.slug === slug || c.id === slug);
      const titleLabel = courseObj?.title || slug;
      return {
        name: titleLabel,
        title: titleLabel,
        value: count,
        count: count
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, statsLimit);

  // B. Aggregazione Lezioni più viste
  const lessonViewsMap = pageViews.reduce((acc: Record<string, number>, pv) => {
    if (pv.lesson_slug) acc[pv.lesson_slug] = (acc[pv.lesson_slug] || 0) + 1;
    return acc;
  }, {});

  const mostViewedLessons = Object.entries(lessonViewsMap)
    .map(([slug, count]) => {
      const formattedLabel = slug.replace(/-/g, " ");
      return {
        name: formattedLabel,
        title: formattedLabel,
        value: count,
        count: count
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, statsLimit);

  // ============================================================================
  // 🛡️ FALLBACK DATI SICURI IN ASSENZA DI NAVIGAZIONE
  // ============================================================================
  const finalCourses = mostViewedCourses.length > 0 ? mostViewedCourses : [
    { name: "Nessun dato di navigazione", title: "Nessun dato di navigazione", value: 1, count: 1 }
  ];

  const finalLessons = mostViewedLessons.length > 0 ? mostViewedLessons : [
    { name: "Nessun dato di navigazione", title: "Nessun dato di navigazione", value: 1, count: 1 }
  ];

  // =========================
  // COURSES CHARTS
  // =========================
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
    const modules = c.course_modules?.length ?? 0;
    if (modules <= 3) courseComplexity["Semplici (1-3 moduli)"]++;
    else if (modules <= 7) courseComplexity["Medio (4-7 moduli)"]++;
    else courseComplexity["Complessi (8+ moduli)"]++;
  });

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
      mostViewedCourses: finalCourses, 
      mostViewedLessons: finalLessons, 
    },
    raw: { users, classes, courses, course_classes: courseClasses },
  };
}