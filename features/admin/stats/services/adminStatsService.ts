import { createClient } from "@supabase/supabase-js";
import { getAdminUsersList } from "../../users/services/adminService";
import { getAvailableClassesForCourses } from "../../courses/services/adminCourseService";
import { getAllCoursesList } from "../../courses/services/adminStructureService";
import { getCourseClasses } from "@/features/courses/services/courseActions";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * SERVICE CENTRALE STATISTICHE ADMIN DASHBOARD
 */
export async function getAdminDashboardStats() {
  const [users, classes, courses, courseClasses] = await Promise.all([
    getAdminUsersList(),
    getAvailableClassesForCourses(),
    getAllCoursesList(),
    getCourseClasses(),
  ]);

  //console.log("=== DEBUG courseClasses ===");
  //console.log(courseClasses);

  // 🌐 CONFIGURAZIONE DINAMICA CONFIGURATA DA .ENV
  const statsLimit = parseInt(
    process.env.NEXT_PUBLIC_ADMIN_STATS_LIMIT || "5",
    10,
  );
  const engagementLimit = parseInt(
    process.env.NEXT_PUBLIC_ADMIN_STATS_ENGAGEMENT_LIMIT || "8",
    10,
  );

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

  // ============================================================================
  // 🎯 AGGIORNATO: CALCOLO ENGAGEMENT E MAPPATURA CLASSI REALI PER IL GRAFICO
  // ============================================================================
  const studentEngagement = users
    .filter((u: any) => u.role === "student")
    .map((u: any) => {
      // Estraiamo l'array delle classi e lo formattiamo come stringa separata da virgole
      const userClassesArray = u.classes || [];
      const classLabel =
        userClassesArray.length > 0
          ? userClassesArray.join(", ")
          : "Nessuna classe";

      return {
        name:
          u.display_name ||
          `${u.first_name || ""} ${u.last_name || ""}`.trim() ||
          u.email ||
          "Studente",
        hours: u.total_minutes_active ?? 0,
        classes: classLabel, // 👈 Questa proprietà viene ora inviata correttamente alla UI e letta da Recharts!
      };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, engagementLimit);

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
  // 📌 MODULES + LESSONS
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
  // 📊 GRAFICI LMS
  // =========================
  const modulesPerCourse = courses
    .map((c: any) => ({
      title: c.title,
      modules: c.course_modules?.length ?? 0,
    }))
    .sort((a, b) => b.modules - a.modules)
    .slice(0, statsLimit);

  const lessonsPerCourse = courses
    .map((c: any) => {
      const lessons =
        c.course_modules?.reduce(
          (acc: number, m: any) => acc + (m.course_lessons?.length ?? 0),
          0,
        ) ?? 0;
      return { title: c.title, lessons };
    })
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, statsLimit);

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
      studentEngagement,
      coursesByCategory,
      publishedCourses,
      modulesPerCourse,
      lessonsPerCourse,
      courseComplexity,
    },
    raw: { users, classes, courses, course_classes: courseClasses },
  };
}
