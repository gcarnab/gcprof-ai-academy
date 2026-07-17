"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Se hai azioni server specifiche per i quiz (es. importazione), importale qui:
// import { importQuizAction } from "@/features/admin/actions/importQuizAction";

interface Quiz {
  id: string;
  title: string;
  courseId?: string;
  courseTitle?: string;
  questionsCount?: number;
  updatedAt?: string;
}

interface QuizzesTabProps {
  availableQuizzes: Quiz[];
}

export default function QuizzesTab({ availableQuizzes }: QuizzesTabProps) {
  const router = useRouter();
  const [isPendingImport, startImportTransition] = useTransition();
  
  // Stato per gestire l'apertura di un eventuale box/modale di importazione Markdown
  const [isImporting, setIsImporting] = useState(false);
  const [markdownText, setMarkdownText] = useState("");

  // Gestore per l'importazione del Markdown
  const handleMarkdownImport = () => {
    if (!markdownText.trim()) return alert("Il testo Markdown è vuoto.");

    startImportTransition(async () => {
      try {
        // Incolla qui la tua azione server originale per importare il quiz
        // const result = await importQuizAction(markdownText);
        // if (result.success) {
        //   setIsImporting(false);
        //   setMarkdownText("");
        //   router.refresh();
        // }
      } catch (err: any) {
        alert(`Errore durante l'importazione: ${err.message || err}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Intestazione del Tab */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Gestione Quiz Academy</h2>
          <p className="text-sm text-muted-foreground">
            Visualizza i quiz esistenti o importane di nuovi via Markdown.
          </p>
        </div>

        <Button 
          onClick={() => setIsImporting(!isImporting)}
          variant={isImporting ? "outline" : "default"}
          className="font-semibold"
        >
          {isImporting ? "❌ Annulla" : "📝 Importa Quiz (Markdown)"}
        </Button>
      </div>

      {/* Zona di Importazione (Se attiva) */}
      {isImporting && (
        <div className="p-4 rounded-xl border bg-muted/20 space-y-3 animation-fadeIn">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Incolla il testo in formato Markdown
          </label>
          <textarea
            className="w-full h-48 p-3 text-sm rounded-lg border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="# Titolo Quiz&#10;1. Domanda?&#10;- [x] Risposta corretta&#10;- [ ] Risposta errata"
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            disabled={isPendingImport}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleMarkdownImport}
              disabled={isPendingImport}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              {isPendingImport ? "Importazione in corso..." : "🚀 Avvia Importazione"}
            </Button>
          </div>
        </div>
      )}

      {/* Tabella / Lista dei Quiz disponibili */}
      {availableQuizzes.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-muted/10">
          <span className="text-3xl mb-2 block">✏️</span>
          <p className="text-base font-semibold text-foreground">Nessun quiz trovato</p>
          <p className="text-xs text-muted-foreground mt-1">
            Non ci sono ancora quiz configurati nel sistema.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border bg-background overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                <th className="p-4">Titolo Quiz</th>
                <th className="p-4">Corso Collegato</th>
                <th className="p-4 text-center">Domande</th>
                {/* Aggiungi qui altre intestazioni se necessarie */}
              </tr>
            </thead>
            <tbody className="divide-y">
              {availableQuizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-semibold text-foreground">
                    {quiz.title}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {quiz.courseTitle || "Nessun corso collegato"}
                  </td>
                  <td className="p-4 text-center font-mono font-medium">
                    {quiz.questionsCount ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}