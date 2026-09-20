"use client";

import { useEffect, useState } from "react";
import {
  assignQuizAction,
  getAvailableClassTargetsAction,
  getCourseModulesAction,
} from "@/app/admin/quiz/actions";
import { logger } from "@/lib/logger";

interface Course {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lessons?: {
    id: string;
    title: string;
  }[];
}

interface AvailableClassTarget {
  classId: string;
  className: string;
  schoolTrack: string;
  schoolSection: string;
}

interface AssignQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  quizTitle: string;
  courses: Course[];
  initialAssignment?: {
    courseId?: string;
    moduleId?: string;
    lessonId?: string;
    dueDate?: string;
    isVisible?: boolean;
    classId?: string;
    schoolTrack?: string;
    schoolSection?: string;
  };
  onSuccess?: () => void;
}

export function AssignQuizModal({
  isOpen,
  onClose,
  quizId,
  quizTitle,
  courses,
  initialAssignment,
  onSuccess,
}: AssignQuizModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialAssignment?.courseId || "",
  );

  const [modules, setModules] = useState<Module[]>([]);

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialAssignment?.moduleId || "",
  );

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialAssignment?.lessonId || "",
  );

  const [dueDate, setDueDate] = useState<string>(
    initialAssignment?.dueDate
      ? new Date(initialAssignment.dueDate).toISOString().slice(0, 16)
      : "",
  );

  const [isVisible, setIsVisible] = useState<boolean>(
    initialAssignment?.isVisible ?? true,
  );

  /**
   * Restrizione scolastica.
   *
   * classId       = anno/macro-classe
   * schoolTrack   = indirizzo
   * schoolSection = sezione
   */
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialAssignment?.classId || "",
  );

  const [selectedSchoolTrack, setSelectedSchoolTrack] = useState<string>(
    initialAssignment?.schoolTrack || "",
  );

  const [selectedSchoolSection, setSelectedSchoolSection] =
    useState<string>(initialAssignment?.schoolSection || "");

  const [availableClassTargets, setAvailableClassTargets] = useState<
    AvailableClassTarget[]
  >([]);

  const [loadingModules, setLoadingModules] = useState(false);
  const [loadingClassTargets, setLoadingClassTargets] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Carica le combinazioni reali:
   *
   * anno + indirizzo + sezione
   *
   * presenti nel database.
   */
  useEffect(() => {
    if (!isOpen) return;

    async function loadClassTargets() {
      setLoadingClassTargets(true);

      try {
        const res = await getAvailableClassTargetsAction();

        if (res.success && res.targets) {
          setAvailableClassTargets(res.targets);
        } else {
          setAvailableClassTargets([]);
        }
      } catch (error) {
        logger.error(
          "Errore caricamento combinazioni classe:",
          error,
        );

        setAvailableClassTargets([]);
      } finally {
        setLoadingClassTargets(false);
      }
    }

    loadClassTargets();
  }, [isOpen]);

  /**
   * Carica moduli e lezioni al cambio di corso.
   */
  useEffect(() => {
    if (!selectedCourseId) {
      setModules([]);
      setSelectedModuleId("");
      setSelectedLessonId("");
      return;
    }

    async function loadModules() {
      setLoadingModules(true);

      try {
        const res = await getCourseModulesAction(selectedCourseId);

        if (res.success && res.modules) {
          setModules(res.modules);
        } else {
          setModules([]);
        }
      } catch (error) {
        logger.error("Errore caricamento moduli:", error);
        setModules([]);
      } finally {
        setLoadingModules(false);
      }
    }

    loadModules();
  }, [selectedCourseId]);

  if (!isOpen) return null;

  const selectedModule = modules.find(
    (module) => module.id === selectedModuleId,
  );

  const lessons = selectedModule?.lessons || [];

  const selectedClassTarget = availableClassTargets.find(
    (target) =>
      target.classId === selectedClassId &&
      target.schoolTrack === selectedSchoolTrack &&
      target.schoolSection === selectedSchoolSection,
  );

  const handleClassTargetChange = (value: string) => {
    if (!value) {
      setSelectedClassId("");
      setSelectedSchoolTrack("");
      setSelectedSchoolSection("");
      return;
    }

    const target = availableClassTargets.find(
      (item) => item.classId === value.split("|")[0]
        && item.schoolTrack === value.split("|")[1]
        && item.schoolSection === value.split("|")[2],
    );

    if (!target) {
      setSelectedClassId("");
      setSelectedSchoolTrack("");
      setSelectedSchoolSection("");
      return;
    }

    setSelectedClassId(target.classId);
    setSelectedSchoolTrack(target.schoolTrack);
    setSelectedSchoolSection(target.schoolSection);
  };

  const getClassTargetValue = (target: AvailableClassTarget) =>
    `${target.classId}|${target.schoolTrack}|${target.schoolSection}`;

  const selectedTargetValue =
    selectedClassTarget
      ? getClassTargetValue(selectedClassTarget)
      : "";

  const handleSave = async () => {
    if (!selectedCourseId) {
      setErrorMessage("Seleziona un corso a cui assegnare il quiz.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await assignQuizAction({
        quizId,
        courseId: selectedCourseId,
        moduleId: selectedModuleId || null,
        lessonId: selectedLessonId || null,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        isVisible,
        classId: selectedClassId || null,
        schoolTrack: selectedSchoolTrack || null,
        schoolSection: selectedSchoolSection || null,
      });

      if (!result.success) {
        setErrorMessage(
          result.error ||
            "Si è verificato un errore durante l'assegnazione.",
        );
        return;
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      logger.error("Errore submit assegnazione:", error);
      setErrorMessage("Errore di connessione al server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-6 rounded-xl border border-border bg-card p-6 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Assegna Quiz
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Stai assegnando:{" "}
              <span className="font-semibold text-primary">
                {quizTitle}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-lg font-bold text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>

        {/* ERRORE */}
        {errorMessage && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/15 p-3 text-sm font-medium text-destructive">
            {errorMessage}
          </div>
        )}

        <div className="space-y-5">
          {/* CORSO */}
          <div className="space-y-1.5">
            <label
              htmlFor="quiz-course"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Corso di Riferimento *
            </label>

            <select
              id="quiz-course"
              value={selectedCourseId}
              onChange={(event) => {
                setSelectedCourseId(event.target.value);
                setSelectedModuleId("");
                setSelectedLessonId("");
              }}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">-- Seleziona Corso --</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* MODULO / LEZIONE */}
          {selectedCourseId && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="quiz-module"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Modulo (Opzionale)
                </label>

                <select
                  id="quiz-module"
                  value={selectedModuleId}
                  onChange={(event) => {
                    setSelectedModuleId(event.target.value);
                    setSelectedLessonId("");
                  }}
                  disabled={loadingModules || isSubmitting}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">-- Tutto il corso --</option>

                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="quiz-lesson"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Lezione (Opzionale)
                </label>

                <select
                  id="quiz-lesson"
                  value={selectedLessonId}
                  onChange={(event) =>
                    setSelectedLessonId(event.target.value)
                  }
                  disabled={
                    !selectedModuleId ||
                    lessons.length === 0 ||
                    isSubmitting
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">-- Tutto il modulo --</option>

                  {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* RESTRIZIONE CLASSE */}
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <label
                htmlFor="quiz-class-target"
                className="block text-xs font-bold uppercase tracking-wider text-foreground"
              >
                Restrizione di Classe
              </label>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Seleziona una classe completa per consentire l&apos;accesso
                esclusivamente agli studenti scolastici appartenenti a quella
                combinazione di anno, indirizzo e sezione. Lascia
                &quot;Nessuna restrizione&quot; per mantenere l&apos;accesso
                libero.
              </p>
            </div>

            <select
              id="quiz-class-target"
              value={selectedTargetValue}
              onChange={(event) =>
                handleClassTargetChange(event.target.value)
              }
              disabled={loadingClassTargets || isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">
                -- Nessuna restrizione di classe --
              </option>

              {availableClassTargets.map((target) => (
                <option
                  key={getClassTargetValue(target)}
                  value={getClassTargetValue(target)}
                >
                  {target.className} {target.schoolTrack}{" "}
                  {target.schoolSection}
                </option>
              ))}
            </select>

            {selectedClassTarget && (
              <div className="rounded-md border border-border bg-background px-3 py-2 text-xs">
                <span className="text-muted-foreground">
                  Classe autorizzata:{" "}
                </span>

                <span className="font-semibold text-primary">
                  {selectedClassTarget.className}{" "}
                  {selectedClassTarget.schoolTrack}{" "}
                  {selectedClassTarget.schoolSection}
                </span>
              </div>
            )}

            {loadingClassTargets && (
              <p className="text-xs text-muted-foreground">
                Caricamento delle classi disponibili...
              </p>
            )}

            {!loadingClassTargets &&
              availableClassTargets.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Nessuna combinazione anno/indirizzo/sezione disponibile.
                </p>
              )}
          </div>

          {/* SCADENZA */}
          <div className="space-y-1.5">
            <label
              htmlFor="quiz-due-date"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Data e Ora Scadenza (Opzionale)
            </label>

            <input
              id="quiz-due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          {/* VISIBILITÀ */}
          <div className="flex items-center space-x-3 pt-1">
            <input
              type="checkbox"
              id="isVisible"
              checked={isVisible}
              onChange={(event) => setIsVisible(event.target.checked)}
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary disabled:opacity-50"
            />

            <label
              htmlFor="isVisible"
              className="cursor-pointer text-sm font-medium text-foreground"
            >
              Rendi il quiz subito visibile agli studenti autorizzati
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end space-x-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-50"
          >
            Annulla
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting || !selectedCourseId}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Salvataggio..." : "Conferma e Assegna"}
          </button>
        </div>
      </div>
    </div>
  );
}
