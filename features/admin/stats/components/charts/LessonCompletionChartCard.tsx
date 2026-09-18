"use client";

import { useState, useMemo } from "react";

interface LessonCompletionChartCardProps {
  courses: any[];
  users: any[];
  lessonProgress: any[];
}

export default function LessonCompletionChartCard({
  courses = [],
  users = [],
  lessonProgress = [],
}: LessonCompletionChartCardProps) {
  // Stati per i filtri selezionati
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id ? String(courses[0].id) : ""
  );
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");

  // Estrazione opzioni univoche per i filtri
  const availableClasses = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      (u.classes || []).forEach((c: string) => set.add(c));
    });
    return Array.from(set).sort();
  }, [users]);

  const availableTracks = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      const track = u.schoolTrack || u.school_track;
      if (track) set.add(track);
    });
    return Array.from(set).sort();
  }, [users]);

  const availableSections = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      const section = u.schoolSection || u.school_section;
      if (section) set.add(section);
    });
    return Array.from(set).sort();
  }, [users]);

  // Utenti filtrati per Classe, Indirizzo e Sezione
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (u.role && u.role !== "student") return false;

      if (selectedClass !== "all") {
        const userClasses = u.classes || [];
        if (!userClasses.includes(selectedClass)) return false;
      }

      if (selectedTrack !== "all") {
        const track = u.schoolTrack || u.school_track || "";
        if (track !== selectedTrack) return false;
      }

      if (selectedSection !== "all") {
        const section = u.schoolSection || u.school_section || "";
        if (section !== selectedSection) return false;
      }

      return true;
    });
  }, [users, selectedClass, selectedTrack, selectedSection]);

  const filteredUserIds = useMemo(() => {
    return new Set(filteredUsers.map((u) => String(u.id || u.profile_id)));
  }, [filteredUsers]);

  // Corso attualmente selezionato e relative lezioni/moduli
  const selectedCourse = useMemo(() => {
    return courses.find((c) => String(c.id) === selectedCourseId) || courses[0];
  }, [courses, selectedCourseId]);

  // Calcolo avanzamento lezioni per il corso selezionato
  const lessonStats = useMemo(() => {
    if (!selectedCourse) return [];

    const modules = selectedCourse.course_modules || [];
    const totalStudentsInFilter = filteredUserIds.size;

    const stats: Array<{
      moduleTitle: string;
      lessonId: string;
      lessonTitle: string;
      orderIndex: number;
      completedCount: number;
      percentage: number;
    }> = [];

    modules.forEach((mod: any) => {
      const lessons = mod.course_lessons || [];
      lessons.forEach((les: any) => {
        const lesId = String(les.id);

        // Conta quanti studenti tra quelli filtrati hanno completato questa lezione
        let completedCount = 0;
        lessonProgress.forEach((lp) => {
          if (
            String(lp.lesson_id) === lesId &&
            lp.is_completed &&
            filteredUserIds.has(String(lp.profile_id))
          ) {
            completedCount++;
          }
        });

        const percentage =
          totalStudentsInFilter > 0
            ? Math.round((completedCount / totalStudentsInFilter) * 100)
            : 0;

        stats.push({
          moduleTitle: mod.title || "Modulo",
          lessonId: lesId,
          lessonTitle: les.title || "Lezione",
          orderIndex: les.order_index ?? 0,
          completedCount,
          percentage,
        });
      });
    });

    return stats;
  }, [selectedCourse, lessonProgress, filteredUserIds]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
      {/* Header & Controlli Filtri */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            📖 Percentuale Completamento per Lezione
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitora l'avanzamento degli studenti lezione per lezione filtrato per corso e classe.
          </p>
        </div>

        {/* Selettori dei Filtri */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs">
          {/* Seleziona Corso */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Corso</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Classe */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Classe</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tutte le Classi</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Indirizzo */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Indirizzo</label>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tutti gli Indirizzi</option>
              {availableTracks.map((tr) => (
                <option key={tr} value={tr}>
                  {tr}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Sezione */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Sezione</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tutte le Sezioni</option>
              {availableSections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Info Studenti Coinvolti */}
      <div className="flex items-center justify-between text-xs bg-muted/50 p-2.5 rounded-lg border border-border">
        <span className="text-muted-foreground">
          Studenti rispondenti ai filtri:{" "}
          <strong className="text-foreground font-semibold">{filteredUserIds.size}</strong>
        </span>
        <span className="text-muted-foreground">
          Totale lezioni nel corso:{" "}
          <strong className="text-foreground font-semibold">{lessonStats.length}</strong>
        </span>
      </div>

      {/* Lista Lezioni con Barra di Progresso */}
      {lessonStats.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          Nessuna lezione trovata per il corso selezionato.
        </div>
      ) : (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {lessonStats.map((item) => (
            <div key={item.lessonId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground truncate max-w-[70%]" title={item.lessonTitle}>
                  <span className="text-muted-foreground font-normal mr-1 border-r border-border pr-1">
                    {item.moduleTitle}
                  </span>
                  {item.lessonTitle}
                </span>
                <span className="font-semibold text-foreground">
                  {item.percentage}%{" "}
                  <span className="text-muted-foreground text-[10px] font-normal">
                    ({item.completedCount}/{filteredUserIds.size})
                  </span>
                </span>
              </div>

              {/* Graphical Bar */}
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}