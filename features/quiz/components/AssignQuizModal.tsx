"use client";

import { useState } from "react";
import { assignQuizAction } from "@/app/admin/quiz/actions";

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
  const [dueDate, setDueDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    // AGGIUNGI QUESTO LOG:
    console.log(
      "DEBUG ASSEGNAZIONE -> Quiz ID:",
      quizId,
      "Course ID:",
      selectedCourseId,
    );
    
    setLoading(true);
    setError(null);

    const result = await assignQuizAction({
      quizId,
      courseId: selectedCourseId,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl scale-in-95 duration-150">
        <h2 className="text-xl font-bold text-foreground">
          Assegna questo Quiz
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Target:{" "}
          <span className="font-semibold text-primary">{quizTitle}</span>
        </p>

        {error && (
          <div className="mt-4 p-3 rounded bg-destructive/10 text-destructive text-xs border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleAssign} className="mt-5 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Seleziona Corso / Classe
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Scegli un corso attivo --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              Scadenza Consegna (Opzionale)
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/30">
            <div>
              <label className="text-sm font-medium block">
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
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent text-foreground"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Salvataggio..." : "Salva Assegnazione"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
