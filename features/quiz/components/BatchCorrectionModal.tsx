"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizQuestion } from "@/features/quiz/domain/Question";
import { batchEvaluateAnswersAIAction } from "../actions/teacherActions";
import { logger } from "@/lib/logger";

interface BatchCorrectionModalProps {
  quizId: string;
  openQuestion: QuizQuestion;
  pendingAttemptsCount: number;
  onCorrectionComplete?: () => void;
}

export function BatchCorrectionModal({
  quizId,
  openQuestion,
  pendingAttemptsCount,
  onCorrectionComplete,
}: BatchCorrectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);

  const handleStartBatch = async () => {
    try {
      setIsProcessing(true);
      setProgress(15);
      setResults(null);

      const res = await batchEvaluateAnswersAIAction(quizId, openQuestion.id);

      setProgress(85);

      if (res.success && res.data) {
        setResults({
          total: res.data.totalProcessed,
          success: res.data.successCount,
          failed: res.data.failedCount,
        });
        setProgress(100);
        if (onCorrectionComplete) {
          onCorrectionComplete();
        }
      } else {
        logger.error("Errore correzione batch:", res.error);
        setResults({ total: 0, success: 0, failed: pendingAttemptsCount });
      }
    } catch (err) {
      logger.error("Eccezione durante correzione batch:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/30 hover:border-primary text-primary"
          disabled={pendingAttemptsCount === 0}
        >
          <Sparkles className="h-4 w-4" />
          Correzione Batch IA ({pendingAttemptsCount})
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Correzione Automatica Batch IA
          </DialogTitle>
          <DialogDescription>
            Valuta tutti i tentativi in attesa di correzione per la domanda aperta:
            <span className="block mt-2 italic font-medium text-foreground">
              "{openQuestion.text}"
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Elaborazione valutazioni IA in corso...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {results && (
            <div className="rounded-lg border p-4 bg-muted/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Elaborazione Completata
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Totale elaborati: {results.total}</p>
                <p className="text-emerald-600 font-medium">
                  Valutati con successo: {results.success}
                </p>
                {results.failed > 0 && (
                  <p className="text-destructive font-medium flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> Errore /
                    Non elaborati: {results.failed}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            disabled={isProcessing}
          >
            Annulla
          </Button>
          <Button
            onClick={handleStartBatch}
            disabled={isProcessing || pendingAttemptsCount === 0}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Elaborazione...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Avvia Correzione ({pendingAttemptsCount})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}