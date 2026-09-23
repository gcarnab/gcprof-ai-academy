"use client";

import { useEffect, useState } from "react";
import {
  assignQuizAction,
  getAvailableClassTargetsAction,
  getCourseModulesAction,
} from "@/app/admin/quiz/actions";
import { logger } from "@/lib/logger";

type QuizTargetUserType =
  | "EXTERNAL_STUDENT"
  | "SCHOOL_ONLY"
  | "ALL";

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

    /**
     * Nuovo modello.
     */
    targetUserType?: QuizTargetUserType;
    classIds?: string[];

    /**
     * Legacy.
     */
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
   * Nuovo modello di targeting:
   *
   * EXTERNAL_STUDENT
   * SCHOOL_ONLY
   * ALL
   */
  const [targetUserType, setTargetUserType] =
    useState<QuizTargetUserType>(
      initialAssignment?.targetUserType ?? "ALL",
    );

  /**
   * Nuovo modello N:M.
   *
   * Contiene gli academy_classes.id assegnati al quiz.
   */
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>(
    initialAssignment?.classIds?.length
      ? Array.from(new Set(initialAssignment.classIds))
      : initialAssignment?.classId
        ? [initialAssignment.classId]
        : [],
  );

  /**
   * Campi legacy mantenuti per compatibilità con il vecchio
   * modello e con eventuali dati già presenti.
   */
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialAssignment?.classId || "",
  );

  const [selectedSchoolTrack, setSelectedSchoolTrack] =
    useState<string>(
      initialAssignment?.schoolTrack || "",
    );

  const [selectedSchoolSection, setSelectedSchoolSection] =
    useState<string>(
      initialAssignment?.schoolSection || "",
    );

  const [availableClassTargets, setAvailableClassTargets] =
    useState<AvailableClassTarget[]>([]);

  const [loadingModules, setLoadingModules] = useState(false);
  const [loadingClassTargets, setLoadingClassTargets] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

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

  /**
   * Restituisce una chiave stabile per una combinazione
   * anno + indirizzo + sezione.
   *
   * La chiave UI rimane distinta anche quando più combinazioni
   * appartengono allo stesso academy_classes.id.
   */
  const getClassTargetValue = (
    target: AvailableClassTarget,
  ) =>
    `${target.classId}|${target.schoolTrack}|${target.schoolSection}`;

  /**
   * Determina se una specifica combinazione è selezionata.
   *
   * L'accesso effettivo del nuovo modello utilizza classId.
   * Track e section vengono mantenuti nella UI per continuare
   * a mostrare le classi reali presenti nel database.
   */
  const isClassTargetSelected = (
    target: AvailableClassTarget,
  ): boolean =>
    selectedClassIds.includes(target.classId);

  /**
   * Gestisce la selezione/deselezione di una classe.
   *
   * Il DB usa academy_classes.id come identificatore della
   * relazione N:M, quindi classId viene deduplicato.
   */
  const handleClassTargetToggle = (
    target: AvailableClassTarget,
  ) => {
    setSelectedClassIds((current) => {
      if (current.includes(target.classId)) {
        return current.filter(
          (classId) => classId !== target.classId,
        );
      }

      return [...current, target.classId];
    });

    /*
     * Manteniamo aggiornati i campi legacy con l'ultima
     * combinazione selezionata, senza utilizzarli come fonte
     * del nuovo controllo di accesso.
     */
    setSelectedClassId(target.classId);
    setSelectedSchoolTrack(target.schoolTrack);
    setSelectedSchoolSection(target.schoolSection);
  };

  /**
   * Rimuove tutte le classi scolastiche selezionate.
   */
  const clearSelectedClasses = () => {
    setSelectedClassIds([]);
    setSelectedClassId("");
    setSelectedSchoolTrack("");
    setSelectedSchoolSection("");
  };

  /**
   * Seleziona/deseleziona tutte le classi macro disponibili.
   *
   * Le combinazioni UI vengono deduplicate per academy_classes.id.
   */
  const handleToggleAllClasses = () => {
    const allClassIds = Array.from(
      new Set(
        availableClassTargets
          .map((target) => target.classId)
          .filter(
            (classId): classId is string =>
              typeof classId === "string" && classId.length > 0,
          ),
      ),
    );

    if (
      allClassIds.length > 0 &&
      allClassIds.every((classId) =>
        selectedClassIds.includes(classId),
      )
    ) {
      clearSelectedClasses();
      return;
    }

    setSelectedClassIds(allClassIds);

    /*
     * Manteniamo il primo target come valore legacy di
     * compatibilità, senza alterare la relazione N:M.
     */
    const firstTarget = availableClassTargets.find(
      (target) => allClassIds.includes(target.classId),
    );

    if (firstTarget) {
      setSelectedClassId(firstTarget.classId);
      setSelectedSchoolTrack(firstTarget.schoolTrack);
      setSelectedSchoolSection(firstTarget.schoolSection);
    }
  };

  const selectedClassCount = selectedClassIds.length;

  const allAvailableClassIds = Array.from(
    new Set(
      availableClassTargets
        .map((target) => target.classId)
        .filter(
          (classId): classId is string =>
            typeof classId === "string" && classId.length > 0,
        ),
    ),
  );

  const allClassesSelected =
    allAvailableClassIds.length > 0 &&
    allAvailableClassIds.every((classId) =>
      selectedClassIds.includes(classId),
    );

  /**
   * Salva l'assegnazione.
   */
  const handleSave = async () => {
    if (!selectedCourseId) {
      setErrorMessage(
        "Seleziona un corso a cui assegnare il quiz.",
      );
      return;
    }

    /*
     * SCHOOL_ONLY e ALL richiedono una classe per gli
     * studenti scolastici.
     *
     * EXTERNAL_STUDENT non necessita di classi.
     */
    if (
      (targetUserType === "SCHOOL_ONLY" ||
        targetUserType === "ALL") &&
      selectedClassIds.length === 0
    ) {
      setErrorMessage(
        "Per questo tipo di targeting devi selezionare almeno una classe scolastica.",
      );
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
        dueDate: dueDate
          ? new Date(dueDate).toISOString()
          : null,
        isVisible,

        /*
         * Nuovo modello.
         */
        targetUserType,
        classIds: selectedClassIds,

        /*
         * Legacy.
         *
         * Vengono mantenuti per compatibilità con il DB e con
         * eventuali dati/consumatori esistenti.
         */
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

          {/* TARGET UTENTE */}
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <label
                htmlFor="quiz-target-user-type"
                className="block text-xs font-bold uppercase tracking-wider text-foreground"
              >
                Destinatari del Quiz
              </label>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Determina quali studenti possono accedere al quiz.
              </p>
            </div>

            <select
              id="quiz-target-user-type"
              value={targetUserType}
              onChange={(event) =>
                setTargetUserType(
                  event.target.value as QuizTargetUserType,
                )
              }
              disabled={isSubmitting}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="ALL">
                Tutti gli studenti autorizzati
              </option>

              <option value="EXTERNAL_STUDENT">
                Solo studenti esterni
              </option>

              <option value="SCHOOL_ONLY">
                Solo studenti scolastici
              </option>
            </select>

            <div className="rounded-md border border-border bg-background px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {targetUserType === "EXTERNAL_STUDENT" && (
                <>
                  Il quiz sarà accessibile agli studenti esterni.
                  Gli studenti scolastici non potranno accedervi.
                </>
              )}

              {targetUserType === "SCHOOL_ONLY" && (
                <>
                  Il quiz sarà accessibile esclusivamente agli
                  studenti scolastici appartenenti ad almeno una
                  delle classi selezionate.
                </>
              )}

              {targetUserType === "ALL" && (
                <>
                  Gli studenti esterni potranno accedere al quiz.
                  Gli studenti scolastici potranno accedere solo
                  se appartengono ad almeno una delle classi
                  selezionate.
                </>
              )}
            </div>
          </div>

          {/* CLASSI */}
          {(targetUserType === "SCHOOL_ONLY" ||
            targetUserType === "ALL") && (
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    Classi scolastiche autorizzate
                  </label>

                  {availableClassTargets.length > 0 && (
                    <button
                      type="button"
                      onClick={handleToggleAllClasses}
                      disabled={
                        loadingClassTargets || isSubmitting
                      }
                      className="text-xs font-semibold text-primary hover:underline disabled:opacity-50"
                    >
                      {allClassesSelected
                        ? "Deseleziona tutte"
                        : "Seleziona tutte"}
                    </button>
                  )}
                </div>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Seleziona una o più classi. Uno studente scolastico
                  potrà accedere se appartiene ad almeno una delle
                  classi selezionate.
                </p>
              </div>

              {loadingClassTargets && (
                <p className="text-xs text-muted-foreground">
                  Caricamento delle classi disponibili...
                </p>
              )}

              {!loadingClassTargets &&
                availableClassTargets.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Nessuna combinazione anno/indirizzo/sezione
                    disponibile.
                  </p>
                )}

              {!loadingClassTargets &&
                availableClassTargets.length > 0 && (
                  <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border border-border bg-background p-2">
                    {availableClassTargets.map((target) => {
                      const value = getClassTargetValue(target);
                      const checked =
                        isClassTargetSelected(target);

                      return (
                        <label
                          key={value}
                          className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 transition-colors ${
                            checked
                              ? "border-primary/40 bg-primary/10"
                              : "border-transparent hover:bg-muted"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              handleClassTargetToggle(target)
                            }
                            disabled={isSubmitting}
                            className="h-4 w-4 rounded border-input text-primary focus:ring-primary disabled:opacity-50"
                          />

                          <span className="min-w-0 text-sm">
                            <span className="font-medium text-foreground">
                              {target.className}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {target.schoolTrack}{" "}
                              {target.schoolSection}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}

              <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs">
                <span className="text-muted-foreground">
                  Classi selezionate
                </span>

                <span className="font-semibold text-primary">
                  {selectedClassCount}
                </span>
              </div>

              {selectedClassCount === 0 && (
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Se non selezioni alcuna classe, gli studenti
                  scolastici non potranno accedere al quiz.
                </p>
              )}
            </div>
          )}

          {/* INFORMAZIONE EXTERNAL */}
          {targetUserType === "EXTERNAL_STUDENT" && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Non è necessario selezionare classi per un quiz
                destinato agli studenti esterni.
              </p>
            </div>
          )}

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
              onChange={(event) =>
                setIsVisible(event.target.checked)
              }
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
            {isSubmitting
              ? "Salvataggio..."
              : "Conferma e Assegna"}
          </button>
        </div>
      </div>
    </div>
  );
}