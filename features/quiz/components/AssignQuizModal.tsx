"use client";

import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";
import { assignQuizAction, getCourseModulesAction } from "@/app/admin/quiz/actions";

interface Lesson {
  id: string;
  title: string;
}

interface ModuleWithLessons {
  id: string;
  title: string;
  lessons?: Lesson[];
}

interface AssignQuizModalProps {
  quizId: string;
  quizTitle: string;
  courses: Array<{ id: string; title: string }>;
  onClose: () => void;
}

export default function AssignQuizModal({
  quizId,
  quizTitle,
  courses,
  onClose,
}: AssignQuizModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [modules, setModules] = useState<ModuleWithLessons[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [loadingModules, setLoadingModules] = useState(false);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carica i moduli del corso appena viene selezionato un corso
  useEffect(() => {
    if (!selectedCourseId) {
      setModules([]);
      setSelectedModuleId("");
      setLessons([]);
      setSelectedLessonId("");
      return;
    }

    async function fetchModules() {
      setLoadingModules(true);
      setError(null);
      try {
        const res = await getCourseModulesAction(selectedCourseId);
        logger.info("📡 Risposta getCourseModulesAction:", res);

        if (res && res.success && Array.isArray(res.modules)) {
          setModules(res.modules);
        } else {
          setModules([]);
          if (res && !res.success) {
            setError("Impossibile caricare i moduli del corso selezionato.");
          }
        }
      } catch (err: any) {
        logger.error("❌ Errore durante il caricamento dei moduli:", err);
        setModules([]);
      } finally {
        setSelectedModuleId("");
        setLessons([]);
        setSelectedLessonId("");
        setLoadingModules(false);
      }
    }

    fetchModules();
  }, [selectedCourseId]);

  // Aggiorna la lista delle lezioni quando cambia il modulo selezionato
  useEffect(() => {
    if (!selectedModuleId) {
      setLessons([]);
      setSelectedLessonId("");
      return;
    }

    const currentModule = modules.find(
      (m) => String(m.id) === String(selectedModuleId)
    );

    const extractedLessons =
      currentModule?.lessons ||
      (currentModule as any)?.course_lessons ||
      [];

    if (Array.isArray(extractedLessons)) {
      setLessons(extractedLessons);
    } else {
      setLessons([]);
    }
    setSelectedLessonId("");
  }, [selectedModuleId, modules]);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    logger.info(
      "DEBUG ASSEGNAZIONE -> Quiz ID:",
      quizId,
      "Course ID:",
      selectedCourseId,
      "Module ID:",
      selectedModuleId,
      "Lesson ID:",
      selectedLessonId
    );

    setLoading(true);
    setError(null);

    const result = await assignQuizAction({
      quizId,
      courseId: selectedCourseId,
      moduleId: selectedModuleId || null,
      lessonId: selectedLessonId || null,
      dueDate: dueDate || null,
      isVisible,
    });

    setLoading(false);

    if (result.success) {
      onClose();
      alert("🎉 Quiz assegnato con successo!");
    } else {
      setError(result.error || "Errore imprevisto durante il salvataggio.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden scale-in-95 duration-150">
        
        {/* INTESTAZIONE STAZIONARIA */}
        <div className="p-6 pb-4 border-b border-border bg-card shrink-0">
          <h2 className="text-xl font-bold text-foreground">
            Assegna questo Quiz
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Target:{" "}
            <span className="font-semibold text-primary">{quizTitle}</span>
          </p>
        </div>

        {/* CORPO FORM SCROLLABILE */}
        <form onSubmit={handleAssign} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-135px)]">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs border border-destructive/20 font-medium">
                {error}
              </div>
            )}

            {/* SELEZIONE CORSO */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Seleziona Corso <span className="text-destructive">*</span>
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                required
                className="w-full max-w-full truncate rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Scegli un corso attivo --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id} className="truncate">
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SELEZIONE MODULO (DINAMICA) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Seleziona Modulo (Opzionale / Consigliato)
              </label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                disabled={!selectedCourseId || loadingModules}
                className="w-full max-w-full truncate rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="">
                  {loadingModules
                    ? "Caricamento moduli in corso..."
                    : !selectedCourseId
                    ? "-- Seleziona prima un corso --"
                    : modules.length === 0
                    ? "-- Nessun modulo trovato in questo corso --"
                    : "-- Seleziona un modulo --"}
                </option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id} className="truncate">
                    {module.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SELEZIONE LEZIONE (DINAMICA) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Seleziona Lezione (Opzionale)
              </label>
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                disabled={!selectedModuleId || lessons.length === 0}
                className="w-full max-w-full truncate rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="">
                  {!selectedModuleId
                    ? "-- Seleziona prima un modulo --"
                    : lessons.length === 0
                    ? "-- Nessuna lezione presente in questo modulo --"
                    : "-- Seleziona una lezione --"}
                </option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id} className="truncate">
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SCADENZA */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Scadenza Consegna (Opzionale)
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* VISIBILITÀ */}
            <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/30">
              <div>
                <label className="text-sm font-medium block text-foreground">
                  Visibilità immediata
                </label>
                <span className="text-xs text-muted-foreground">
                  Rendilo subito visibile sul pannello degli studenti
                </span>
              </div>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
              />
            </div>
          </div>

          {/* PIÈ DI PAGINA CON PULSANTI STAZIONARI */}
          <div className="p-4 border-t border-border bg-muted/20 shrink-0 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent text-foreground transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Salvataggio..." : "Salva Assegnazione"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}