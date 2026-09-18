"use client";

import { useState, useMemo, useEffect } from "react";

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
  // Normalizzazione array lessonProgress
  const rawProgressArray = useMemo(() => {
    if (Array.isArray(lessonProgress)) return lessonProgress;
    if (lessonProgress && Array.isArray((lessonProgress as any).data)) {
      return (lessonProgress as any).data;
    }
    return [];
  }, [lessonProgress]);

  // Stato corso e filtri
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(String(courses[0].id));
    }
  }, [courses, selectedCourseId]);

  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");

  // Estrazione opzioni classi per la Select
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

  // Filtraggio utenti (Include sia SCHOOL_STUDENT che EXTERNAL_STUDENT)
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Controllo Ruolo (Accetta sia 'student' che 'studente')
      const roleStr = String(u.role || "").toLowerCase();
      if (roleStr && roleStr !== "student" && roleStr !== "studente") {
        return false;
      }

      // Logica Filtro Classe / Tipo Utente
      if (selectedClass === "external") {
        // Solo Studenti Esterni (senza classe o userType === EXTERNAL_STUDENT)
        const isExternal =
          u.userType === "EXTERNAL_STUDENT" ||
          !u.classes ||
          u.classes.length === 0;
        if (!isExternal) return false;
      } else if (selectedClass !== "all") {
        // Classe specifica
        const userClasses = u.classes || [];
        if (!userClasses.includes(selectedClass)) return false;
      }

      // Filtro Indirizzo
      if (selectedTrack !== "all") {
        const track = u.schoolTrack || u.school_track || "";
        if (track !== selectedTrack) return false;
      }

      // Filtro Sezione
      if (selectedSection !== "all") {
        const section = u.schoolSection || u.school_section || "";
        if (section !== selectedSection) return false;
      }

      return true;
    });
  }, [users, selectedClass, selectedTrack, selectedSection]);

  // Registra tutti i possibili ID per il matching
  const filteredUserIds = useMemo(() => {
    const set = new Set<string>();
    filteredUsers.forEach((u) => {
      const possibleIds = [
        u.id,
        u.profile_id,
        u.profileId,
        u.user_id,
        u.userId,
        u.auth_id,
      ];
      possibleIds.forEach((id) => {
        if (id !== undefined && id !== null && String(id).trim() !== "") {
          set.add(String(id).trim().toLowerCase());
        }
      });
    });
    return set;
  }, [filteredUsers]);

  // Corso Selezionato
  const selectedCourse = useMemo(() => {
    if (!courses || courses.length === 0) return null;
    return (
      courses.find(
        (c) =>
          String(c.id).trim().toLowerCase() ===
          selectedCourseId.trim().toLowerCase(),
      ) || courses[0]
    );
  }, [courses, selectedCourseId]);

  // Valida stato completamento riga
  const checkIsCompleted = (lp: any): boolean => {
    if (
      lp.is_completed === true ||
      lp.is_completed === "true" ||
      lp.is_completed === 1
    )
      return true;
    if (lp.completed === true || lp.completed === "true" || lp.completed === 1)
      return true;
    if (
      lp.status &&
      ["completed", "complete", "done", "finished"].includes(
        String(lp.status).toLowerCase(),
      )
    )
      return true;
    if (
      lp.completed_at !== undefined &&
      lp.completed_at !== null &&
      lp.completed_at !== ""
    )
      return true;
    return false;
  };

  // Calcolo dati avanzamento per il grafico
  const lessonStats = useMemo(() => {
    if (!selectedCourse) return [];

    const modules =
      selectedCourse.course_modules || selectedCourse.modules || [];
    const totalStudentsInFilter = filteredUsers.length;

    const stats: Array<{
      moduleTitle: string;
      lessonId: string;
      lessonTitle: string;
      orderIndex: number;
      completedCount: number;
      percentage: number;
    }> = [];

    modules.forEach((mod: any) => {
      const lessons = mod.course_lessons || mod.lessons || [];
      lessons.forEach((les: any) => {
        const possibleLesIds = [les.id, les.lesson_id, les.course_lesson_id]
          .filter(Boolean)
          .map((id) => String(id).trim().toLowerCase());

        let completedCount = 0;

        rawProgressArray.forEach((lp: any) => {
          const lpLessonId = String(
            lp.lesson_id || lp.course_lesson_id || lp.lessonId || lp.id || "",
          )
            .trim()
            .toLowerCase();

          const lpUserId = String(
            lp.profile_id || lp.user_id || lp.student_id || lp.userId || "",
          )
            .trim()
            .toLowerCase();

          const isLessonMatch = possibleLesIds.includes(lpLessonId);
          const isUserMatch = filteredUserIds.has(lpUserId);
          const isDone = checkIsCompleted(lp);

          if (isLessonMatch && isUserMatch && isDone) {
            completedCount++;
          }
        });

        const percentage =
          totalStudentsInFilter > 0
            ? Math.min(
                100,
                Math.round((completedCount / totalStudentsInFilter) * 100),
              )
            : 0;

        stats.push({
          moduleTitle: mod.title || mod.name || "Modulo",
          lessonId: String(les.id),
          lessonTitle: les.title || les.name || "Lezione",
          orderIndex: les.order_index ?? 0,
          completedCount,
          percentage,
        });
      });
    });

    return stats;
  }, [selectedCourse, rawProgressArray, filteredUserIds, filteredUsers.length]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
      {/* Controlli Filtri */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            📖 Percentuale Completamento per Lezione
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitora l'avanzamento degli studenti (Scolastici ed Esterni)
            lezione per lezione.
          </p>
        </div>

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
                <option key={c.id} value={String(c.id)}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Classe / Tipo Utente */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">
              Classe / Utenti
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tutti (Scolastici ed Esterni)</option>
              <option value="external">
                🌐 Studenti Esterni (Senza classe)
              </option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  🏫 {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Indirizzo */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">
              Indirizzo
            </label>
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

      {/* Info Studenti Filtrati */}
      <div className="flex items-center justify-between text-xs bg-muted/50 p-2.5 rounded-lg border border-border">
        <span className="text-muted-foreground">
          Studenti rispondenti ai filtri:{" "}
          <strong className="text-foreground font-semibold">
            {filteredUsers.length}
          </strong>
        </span>
        <span className="text-muted-foreground">
          Totale lezioni nel corso:{" "}
          <strong className="text-foreground font-semibold">
            {lessonStats.length}
          </strong>
        </span>
      </div>

      {/* Lista Lezioni */}
      {lessonStats.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          Nessuna lezione trovata per il corso selezionato.
        </div>
      ) : (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {lessonStats.map((item) => (
            <div key={item.lessonId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span
                  className="font-medium text-foreground truncate max-w-[70%]"
                  title={item.lessonTitle}
                >
                  <span className="text-muted-foreground font-normal mr-1 border-r border-border pr-1">
                    {item.moduleTitle}
                  </span>
                  {item.lessonTitle}
                </span>
                <span className="font-semibold text-foreground">
                  {item.percentage}%{" "}
                  <span className="text-muted-foreground text-[10px] font-normal">
                    ({item.completedCount}/{filteredUsers.length})
                  </span>
                </span>
              </div>

              {/* Graphical Bar */}
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
