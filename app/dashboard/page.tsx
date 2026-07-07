import { redirect } from "next/navigation";
import Link from "next/link";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { getStudentCoursesAction } from "@/features/courses/queries/getStudentCourses";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Studente",
  description:
    "Area personale dello studente con corsi iscritti, lezioni e contenuti riservati.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudentDashboardPage() {
  const cookieService = new NextCookieService();
  const tokenService = new JoseTokenService();
  
  const token = await cookieService.getSession();
  const user = token ? (tokenService.decode(token) as any) : null;

  if (!user) {
    redirect("/");
  }

  const userId = user.id || user.sub;
  const supabase = getSupabaseAdmin();

  // 📡 1. RECUPERO MINUTI TOTALI REALI DAL PROFILO
  const { data: profileData } = await supabase
    .from("profiles")
    .select("total_minutes_active")
    .eq("id", userId)
    .single();

  const totalMinutesStudied = profileData?.total_minutes_active || 0;

  // 📡 2. RECUPERO INSIEME DEI CORSI ABILITATI E DEL CATALOGO STRUTTURATO
  const [coursesResult, liveCourses] = await Promise.all([
    getStudentCoursesAction(userId),
    getLiveCourses()
  ]);

  const catalog = liveCourses || [];
  const allowedCourses = coursesResult.success && coursesResult.data ? coursesResult.data : [];

  // 📡 3. RECUPERO DELLO STORICO PROGRESSI DAL DATABASE
  const { data: progressList } = await supabase
    .from("profile_lessons_progress")
    .select("course_id, lesson_id, is_completed, last_accessed_at")
    .eq("profile_id", userId);

  // Mappa di supporto velocissima per controllare lo stato delle lezioni completate
  const completedLessonsSet = new Set(
    progressList?.filter(p => p.is_completed).map(p => String(p.lesson_id)) || []
  );

  // 🧭 4. LOGICA "RIPRENDI DA DOVE ERI" (Trova l'ultimo record per timestamp)
  let resumeLink = null;
  let resumeLessonTitle = "";

  if (progressList && progressList.length > 0) {
    const latestProgress = [...progressList].sort(
      (a, b) => new Date(b.last_accessed_at).getTime() - new Date(a.last_accessed_at).getTime()
    )[0];

    let matchFound = false;
    for (const course of catalog) {
      if (String(course.id) === String(latestProgress.course_id) || String((course as any).course_id) === String(latestProgress.course_id)) {
        for (const module of course.modules || []) {
          for (const lesson of module.lessons || []) {
            if (String(lesson.id) === String(latestProgress.lesson_id)) {
              resumeLink = `/courses/${course.slug}/modules/${module.id}/lessons/${lesson.id}`;
              resumeLessonTitle = lesson.title;
              matchFound = true;
              break;
            }
          }
          if (matchFound) break;
        }
      }
      if (matchFound) break;
    }
  }

  // 🧮 5. LOGICA PROGRESSO %: Incrocio reale tra i corsi abilitati e l'albero delle lezioni completate
  const coursesWithRealMetrics = allowedCourses.map((allowedCourse: any) => {
    const structuralCourse = catalog.find(
      (c) => String(c.id) === String(allowedCourse.course_id) || String(c.id) === String(allowedCourse.course_id) || c.slug === allowedCourse.course_slug
    );

    let totalLessons = 0;
    let completedLessonsCount = 0;

    if (structuralCourse && structuralCourse.modules) {
      structuralCourse.modules.forEach((m: any) => {
        if (m.lessons) {
          m.lessons.forEach((l: any) => {
            totalLessons++;
            if (completedLessonsSet.has(String(l.id))) {
              completedLessonsCount++;
            }
          });
        }
      });
    }

    const percentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    return {
      ...allowedCourse,
      totalLessons,
      completedLessons: completedLessonsCount,
      percentage
    };
  });

  return (
    <div className="p-8 max-w-7xl mx-auto text-slate-100 space-y-6">
      
      {/* SCHEDA PROFILO */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-lg text-white">
            {user.displayName?.substring(0, 2).toUpperCase() || "ST"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Bentornato, {user.displayName}</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Email di studio: <span className="text-slate-300 font-medium">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Classe</div>
            <div className="text-base font-bold text-blue-400 mt-0.5">
              {user.classes?.join(", ") || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Tempo Studio</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              {totalMinutesStudied} min {/* 🌟 Adesso estrae i 13 minuti reali del DB */}
            </div>
          </div>
        </div>
      </div>

      {/* BANNER RIPRENDI DA DOVE ERI RIMASTO */}
      {resumeLink && (
        <div className="bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border border-blue-900/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg backdrop-blur-sm">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Continua la sessione</span>
            <p className="text-sm text-slate-200 font-medium">
              Eri rimasto a: <span className="text-white font-semibold">“{resumeLessonTitle}”</span>
            </p>
          </div>
          <Link
            href={resumeLink}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-all shrink-0 inline-flex items-center gap-1.5"
          >
            Riprendi Lezione ⚡
          </Link>
        </div>
      )}

      {/* SEZIONE CORSI ABILITATI */}
      <h2 className="text-lg font-bold text-white flex items-center gap-2 pt-2">
        <span>📖</span> I tuoi Corsi Abilitati
      </h2>

      {coursesWithRealMetrics.length === 0 ? (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center text-sm text-slate-500 shadow-inner">
          Nessun corso associato alla tua classe al momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithRealMetrics.map((course: any) => (
            <div 
              key={course.course_id} 
              className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div className="p-5 flex-1 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900/40 uppercase tracking-wider">
                    {course.difficulty || "Base"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                  {course.course_title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {course.course_description || "Nessuna descrizione disponibile per questo corso."}
                </p>
                <div className="text-[11px] text-slate-500">
                  Docente: <span className="text-slate-400">{course.teacher || "Staff"}</span>
                </div>
              </div>

              {/* BARRA DI PROGRESSO REALE */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-850/50">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1.5">
                  <span>Avanzamento</span>
                  <span className="font-bold text-slate-200">{course.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500" 
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {course.completedLessons} di {course.totalLessons} lezioni completate
                </p>
                
                <Link
                  href={`/courses/${course.course_slug}`}
                  className="w-full mt-4 inline-flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all tracking-wide uppercase"
                >
                  Entra nel Corso ⚡
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}