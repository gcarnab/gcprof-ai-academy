"use client";

import { useState, useMemo, useEffect } from "react";

interface StudentProgressMatrixCardProps {
  courses: any[];
  users: any[];
  lessonProgress: any[];
}

export default function StudentProgressMatrixCard({
  courses = [],
  users = [],
  lessonProgress = [],
}: StudentProgressMatrixCardProps) {
  // Normalizzazione array lessonProgress
  const rawProgressArray = useMemo(() => {
    if (Array.isArray(lessonProgress)) return lessonProgress;
    if (lessonProgress && Array.isArray((lessonProgress as any).data)) {
      return (lessonProgress as any).data;
    }
    return [];
  }, [lessonProgress]);

  // Stato filtri e ricerca
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Stato per l'espansione degli accordion studenti
  const [expandedStudentIds, setExpandedStudentIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(String(courses[0].id));
    }
  }, [courses, selectedCourseId]);

  // Estrazione opzioni univoche per i filtri
  const availableClasses = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u: any) => {
      (u.classes || []).forEach((c: string) => set.add(c));
    });
    return Array.from(set).sort();
  }, [users]);

  const availableTracks = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u: any) => {
      const track = u.schoolTrack || u.school_track;
      if (track) set.add(track);
    });
    return Array.from(set).sort();
  }, [users]);

  const availableSections = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u: any) => {
      const section = u.schoolSection || u.school_section;
      if (section) set.add(section);
    });
    return Array.from(set).sort();
  }, [users]);

  // Corso attualmente selezionato
  const selectedCourse = useMemo(() => {
    if (!courses || courses.length === 0) return null;
    return (
      courses.find(
        (c: any) =>
          String(c.id).trim().toLowerCase() ===
          selectedCourseId.trim().toLowerCase()
      ) || courses[0]
    );
  }, [courses, selectedCourseId]);

  // Utility per verificare completamento
  const checkIsCompleted = (lp: any): boolean => {
    if (
      lp.is_completed === true ||
      lp.is_completed === "true" ||
      lp.is_completed === 1
    )
      return true;
    if (
      lp.completed === true ||
      lp.completed === "true" ||
      lp.completed === 1
    )
      return true;
    if (
      lp.status &&
      ["completed", "complete", "done", "finished"].includes(
        String(lp.status).toLowerCase()
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

  // Filtraggio utenti (SCHOOL_STUDENT e EXTERNAL_STUDENT)
  const filteredUsers = useMemo(() => {
    return users.filter((u: any) => {
      const roleStr = String(u.role || "").toLowerCase();
      if (roleStr && roleStr !== "student" && roleStr !== "studente") {
        return false;
      }

      if (selectedClass === "external") {
        const isExternal =
          u.userType === "EXTERNAL_STUDENT" ||
          !u.classes ||
          u.classes.length === 0;
        if (!isExternal) return false;
      } else if (selectedClass !== "all") {
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

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const fullName = `${u.first_name || ""} ${u.last_name || ""} ${
          u.display_name || ""
        }`.toLowerCase();
        const email = String(u.email || "").toLowerCase();
        if (!fullName.includes(q) && !email.includes(q)) return false;
      }

      return true;
    });
  }, [users, selectedClass, selectedTrack, selectedSection, searchQuery]);

  // Calcolo avanzamento individuale per ciascun utente filtrato
  const studentProgressData = useMemo(() => {
    if (!selectedCourse) return [];

    const modules = selectedCourse.course_modules || selectedCourse.modules || [];

    // Estrae tutte le lezioni con relative informazioni di modulo
    const allLessons: Array<{
      lessonId: string;
      lessonTitle: string;
      moduleId: string;
      moduleTitle: string;
    }> = [];

    modules.forEach((mod: any) => {
      const lessons = mod.course_lessons || mod.lessons || [];
      lessons.forEach((les: any) => {
        allLessons.push({
          lessonId: String(les.id).trim().toLowerCase(),
          lessonTitle: les.title || les.name || "Lezione",
          moduleId: String(mod.id || mod.title),
          moduleTitle: mod.title || mod.name || "Modulo",
        });
      });
    });

    const totalCourseLessons = allLessons.length;

    return filteredUsers.map((u: any) => {
      const possibleUserIds = [
        u.id,
        u.profile_id,
        u.profileId,
        u.user_id,
        u.userId,
        u.auth_id,
      ]
        .filter(Boolean)
        .map((id) => String(id).trim().toLowerCase());

      // Set delle lezioni completate da questo specifico utente
      const completedLessonIds = new Set<string>();

      rawProgressArray.forEach((lp: any) => {
        const lpUserId = String(
          lp.profile_id || lp.user_id || lp.student_id || lp.userId || ""
        )
          .trim()
          .toLowerCase();

        if (possibleUserIds.includes(lpUserId) && checkIsCompleted(lp)) {
          const lpLessonId = String(
            lp.lesson_id || lp.course_lesson_id || lp.lessonId || lp.id || ""
          )
            .trim()
            .toLowerCase();
          completedLessonIds.add(lpLessonId);
        }
      });

      // Calcolo avanzamento per ciascun modulo
      const moduleStats = modules.map((mod: any) => {
        const modLessons = mod.course_lessons || mod.lessons || [];
        let modCompleted = 0;

        const lessonDetails = modLessons.map((les: any) => {
          const lesId = String(les.id).trim().toLowerCase();
          const isDone = completedLessonIds.has(lesId);
          if (isDone) modCompleted++;

          return {
            id: les.id,
            title: les.title || les.name || "Lezione",
            isCompleted: isDone,
          };
        });

        const modTotal = modLessons.length;
        const modPercentage =
          modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

        return {
          id: mod.id || mod.title,
          title: mod.title || mod.name || "Modulo",
          completedCount: modCompleted,
          totalCount: modTotal,
          percentage: modPercentage,
          lessons: lessonDetails,
        };
      });

      const totalCompleted = completedLessonIds.size;
      const overallPercentage =
        totalCourseLessons > 0
          ? Math.min(100, Math.round((totalCompleted / totalCourseLessons) * 100))
          : 0;

      return {
        user: u,
        userIdStr: String(u.id || u.profile_id),
        totalCompleted,
        totalCourseLessons,
        overallPercentage,
        moduleStats,
      };
    });
  }, [selectedCourse, filteredUsers, rawProgressArray]);

  // Calcolo media generale della classe/gruppo selezionato
  const classAveragePercentage = useMemo(() => {
    if (studentProgressData.length === 0) return 0;
    const sum = studentProgressData.reduce(
      (acc, curr) => acc + curr.overallPercentage,
      0
    );
    return Math.round(sum / studentProgressData.length);
  }, [studentProgressData]);

  // Gestione toggle Accordion
  const toggleStudentExpand = (userId: string) => {
    setExpandedStudentIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedStudentIds(
      new Set(studentProgressData.map((s) => s.userIdStr))
    );
  };

  const collapseAll = () => {
    setExpandedStudentIds(new Set());
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
      {/* Header e Titolo */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            👤 Avanzamento Individuale Studenti per Modulo
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dettaglio lezioni e moduli completati per ciascuno studente.
          </p>
        </div>

        {/* Filtri Principali */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs">
          {/* Seleziona Corso */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Corso</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {courses.map((c: any) => (
                <option key={c.id} value={String(c.id)}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Seleziona Classe */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-muted-foreground">Classe / Gruppo</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tutti gli Studenti</option>
              <option value="external">🌐 Studenti Esterni</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  🏫 {cls}
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

      {/* Barra di Ricerca e Controlli Rapidi */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-muted/40 p-3 rounded-lg border border-border text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <span className="text-muted-foreground">🔍</span>
          <input
            type="text"
            placeholder="Cerca studente per nome, cognome o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-input rounded-md px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <div>
            Media Gruppo:{" "}
            <strong className="text-foreground font-semibold">
              {classAveragePercentage}%
            </strong>
          </div>
          <div>
            Studenti:{" "}
            <strong className="text-foreground font-semibold">
              {studentProgressData.length}
            </strong>
          </div>
          <div className="flex items-center gap-1.5 border-l border-border pl-3">
            <button
              type="button"
              onClick={expandAll}
              className="hover:text-foreground hover:underline"
            >
              Espandi tutti
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-foreground hover:underline"
            >
              Comprimi
            </button>
          </div>
        </div>
      </div>

      {/* Elenco Studenti */}
      {studentProgressData.length === 0 ? (
        <div className="py-12 text-center text-xs text-muted-foreground">
          Nessun studente trovato per i criteri di ricerca impostati.
        </div>
      ) : (
        <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
          {studentProgressData.map((item) => {
            const u = item.user;
            const isExpanded = expandedStudentIds.has(item.userIdStr);
            const userClassLabel =
              u.classes && u.classes.length > 0
                ? u.classes.join(", ")
                : "Esterno";

            return (
              <div
                key={item.userIdStr}
                className="border border-border rounded-lg bg-background transition-all hover:border-primary/40 overflow-hidden"
              >
                {/* Riga Sintetica Studente */}
                <div
                  onClick={() => toggleStudentExpand(item.userIdStr)}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-muted/30 select-none"
                >
                  {/* Anagrafica Studente */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                      {u.first_name?.[0] || u.email?.[0] || "S"}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-foreground flex items-center gap-2">
                        {u.first_name || u.last_name
                          ? `${u.first_name || ""} ${u.last_name || ""}`.trim()
                          : u.email}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-normal text-muted-foreground">
                          {userClassLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {u.email}
                      </div>
                    </div>
                  </div>

                  {/* Avanzamento Globale Studente */}
                  <div className="flex items-center gap-4 sm:min-w-[280px]">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Corso</span>
                        <span className="font-semibold text-foreground">
                          {item.overallPercentage}% ({item.totalCompleted}/
                          {item.totalCourseLessons})
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${item.overallPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Icona espansione */}
                    <span className="text-muted-foreground text-xs pl-1">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Dettaglio Espanso Moduli e Lezioni */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/20 p-4 space-y-4 text-xs">
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Dettaglio Moduli e Lezioni
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.moduleStats.map((mod: any) => (
                        <div
                          key={mod.id}
                          className="bg-card border border-border p-3 rounded-lg space-y-2.5"
                        >
                          {/* Intestazione Modulo */}
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground truncate max-w-[70%]" title={mod.title}>
                              {mod.title}
                            </span>
                            <span className="text-[11px] font-bold text-foreground">
                              {mod.percentage}% ({mod.completedCount}/{mod.totalCount})
                            </span>
                          </div>

                          {/* Progress bar modulo */}
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${mod.percentage}%` }}
                            />
                          </div>

                          {/* Lista Lezioni con badge */}
                          <div className="space-y-1.5 pt-1">
                            {mod.lessons.map((les: any) => (
                              <div
                                key={les.id}
                                className="flex items-center justify-between text-[11px] py-0.5 border-b border-border/40 last:border-0"
                              >
                                <span className="text-muted-foreground truncate max-w-[80%]" title={les.title}>
                                  {les.title}
                                </span>
                                {les.isCompleted ? (
                                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[10px]">
                                    ✓ Completata
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground/60 text-[10px]">
                                    ○ Non completata
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}