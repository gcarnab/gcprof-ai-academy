"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  importQuizFromMarkdownAction,
  updateQuizStatusAction,
} from "@/features/quiz/actions/quizActions";

interface QuizzesTabProps {
  availableQuizzes: any[];
}

export default function QuizzesTab({ availableQuizzes }: QuizzesTabProps) {
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);

  const handleMarkdownImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        await uploadQuizFromMarkdown(content);
        setTimeout(() => {
          router.refresh();
          setIsImporting(false);
          e.target.value = "";
        }, 1000);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Errore durante la lettura del file Markdown:", error);
      setIsImporting(false);
    }
  };

  async function uploadQuizFromMarkdown(content: string) {
    try {
      const result = await importQuizFromMarkdownAction(content);
      if (!result.success) {
        alert(`Impossibile importare il quiz: ${result.error}`);
        return;
      }
      alert("Quiz importato e salvato nel database con successo!");
    } catch (error: any) {
      alert(`Errore imprevisto: ${error.message || "Riprova più tardi."}`);
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Gestione Quiz di Sbarramento</h3>
          <p className="text-xs text-muted-foreground">
            Seleziona un quiz per monitorare le performance degli studenti o importane uno nuovo.
          </p>
        </div>
        <div>
          <label
            className={`
              inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer
              ${isImporting ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}
            `}
          >
            <span>{isImporting ? "⌛ Elaborazione..." : "📥 Importa da Markdown (.md)"}</span>
            <input type="file" accept=".md" className="hidden" disabled={isImporting} onChange={handleMarkdownImport} />
          </label>
        </div>
      </div>

      <div className="rounded-xl border bg-background overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
              <th className="p-4 text-left">Titolo del Quiz</th>
              <th className="p-4 text-center">Stato</th>
              <th className="p-4 text-center">Soglia Minima</th>
              <th className="p-4 text-center">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {availableQuizzes.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <p className="text-base font-medium text-foreground">Nessun quiz registrato nel database.</p>
                    <p className="text-xs max-w-md mx-auto text-muted-foreground">
                      I quiz vengono estratti e strutturati partendo dai tuoi file di testo.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              availableQuizzes.map((quiz: any) => (
                <tr key={quiz.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-semibold text-foreground">{quiz.title}</td>
                  <td className="p-4 text-center">
                    {quiz.status === "active" ? (
                      <span className="rounded bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 px-2 py-1 text-xs font-semibold">
                        Pubblicato
                      </span>
                    ) : (
                      <span className="rounded bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 text-xs font-semibold">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center font-mono text-muted-foreground">
                    {quiz.passing_score ? `${quiz.passing_score}%` : "—"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="default" disabled={quiz.status === "active"} onClick={async () => { await updateQuizStatusAction(quiz.id, "active"); router.refresh(); }}>Pubblica</Button>
                      <Button size="sm" variant="outline" onClick={async () => { await updateQuizStatusAction(quiz.id, "draft"); router.refresh(); }} disabled={quiz.status === "draft"}>Ritira</Button>
                      <Link href={`/admin/quiz/${quiz.id}/analytics`} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 dark:bg-violet-600 text-white hover:bg-blue-700 dark:hover:bg-violet-700 rounded-lg transition-colors shadow-sm">
                        📊 Analizza Risultati
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}