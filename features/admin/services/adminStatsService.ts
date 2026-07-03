import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "./adminService";
import { getAvailableClassesForCourses } from "./adminCourseService";
import { getAllCoursesList } from "./adminStructureService";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * SERVICE CENTRALE STATISTICHE ADMIN DASHBOARD
 * - zero logica UI
 * - tutti i dati già normalizzati
 * - safe per nested relations Supabase
 */
export async function getAdminDashboardStats() {

  const [users, classes, courses] = await Promise.all([
    getAdminUsersList(),
    getAvailableClassesForCourses(),
    getAllCoursesList(),
  ]);

  // =========================
  // KPI BASE
  // =========================
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

  // =========================
  // COURSES CHARTS
  // =========================

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

  // =========================
  // 📌 MODULES + LESSONS (FIX ROBUSTO)
  // =========================

  let totalModules = 0;
  let totalLessons = 0;

  for (const course of courses) {
    const modules = course.course_modules ?? [];

    totalModules += modules.length;

    for (const module of modules) {
      const lessons = module.course_lessons ?? [];
      totalLessons += lessons.length;
    }
  }

  // =========================
  // 📊 NUOVI GRAFICI LMS
  // =========================

  const modulesPerCourse = courses
    .map((c: any) => ({
      title: c.title,
      modules: c.course_modules?.length ?? 0,
    }))
    .sort((a, b) => b.modules - a.modules)
    .slice(0, 5);

  const lessonsPerCourse = courses
    .map((c: any) => {
      const lessons =
        c.course_modules?.reduce(
          (acc: number, m: any) =>
            acc + (m.course_lessons?.length ?? 0),
          0
        ) ?? 0;

      return {
        title: c.title,
        lessons,
      };
    })
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, 5);

  const courseComplexity = {
    "Semplici (1-3 moduli)": 0,
    "Medio (4-7 moduli)": 0,
    "Complessi (8+ moduli)": 0,
  };

  courses.forEach((c: any) => {
    const modules = c.course_modules?.length ?? 0;

    if (modules <= 3) courseComplexity["Semplici (1-3 moduli)"]++;
    else if (modules <= 7) courseComplexity["Medio (4-7 moduli)"]++;
    else courseComplexity["Complessi (8+ moduli)"]++;
  });

  // =========================
  // OUTPUT UNIFICATO
  // =========================
  return {
    totals: {
      users: totalUsers,
      courses: totalCourses,
      classes: totalClasses,
      modules: totalModules,
      lessons: totalLessons,
    },

    charts: {
      usersByRole,
      usersByStatus,
      studentsByClass,
      coursesByCategory,
      publishedCourses,
      modulesPerCourse,
      lessonsPerCourse,
      courseComplexity,
    },

    raw: {
      users,
      classes,
      courses,
    },
  };
}