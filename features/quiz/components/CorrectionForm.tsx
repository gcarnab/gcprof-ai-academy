"use client";

import React, { useState, useTransition, useEffect } from "react";
// ⚡ Import aggiornato verso teacherActions
import { gradeOpenAnswerAction } from "../actions/teacherActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, GraduationCap, CheckCircle2, AlertCircle } from "lucide-react";

interface CorrectionFormProps {
  attemptId: string;
  questionId: string;
  questionText: string;
  studentAnswerText: string;
  studentEmail: string;
  editMode?: boolean;
  initialScore?: number | string;
  initialComment?: string;
  reviewId?: string;
}

const normalizeScore = (val: number | string | undefined): string => {
  if (val === undefined || val === null || val === "") return "";
  const num = parseFloat(val.toString());
  return isNaN(num) ? "" : num.toString();
};

export function CorrectionForm({
  attemptId,
  questionId,
  questionText,
  studentAnswerText,
  studentEmail,
  editMode = false,
  initialScore,
  initialComment,
  reviewId,
}: CorrectionFormProps) {
  const [score, setScore] = useState<string>(normalizeScore(initialScore));
  const [comment, setComment] = useState<string>(initialComment || "");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setScore(normalizeScore(initialScore));
    setComment(initialComment || "");
    setResult(null);
  }, [initialScore, initialComment, attemptId]);

  const handleGrade = () => {
    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 6) return;

    setResult(null);
    startTransition(async () => {
      const response = await gradeOpenAnswerAction({
        attemptId,
        questionId,
        score: numericScore,
        comment: comment.trim() || undefined,
        reviewId: editMode ? reviewId : undefined,
      });

      if (response.success) {
        setResult({
          success: true,
          message: `Valutazione ${editMode ? "aggiornata" : "registrata"} con successo! Voto finale ricalcolato: ${response.finalScore?.toFixed(2)} / 10.00`,
        });
      } else {
        setResult({
          success: false,
          message: response.error || "Impossibile salvare la valutazione.",
        });
      }
    });
  };

  const scoreOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-bold">Valutazione Risposta Aperta</CardTitle>
          </div>
          <CardDescription>
            {editMode ? "Modifica della revisione per:" : "Revisione del tentativo sottomesso da:"}{" "}
            <span className="font-semibold text-foreground">{studentEmail}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/60 border">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Testo della Domanda Aperta (Max 6.00 Punti)
            </span>
            <p className="text-sm font-medium leading-relaxed text-foreground">{questionText}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Risposta fornita dallo Studente
            </Label>
            <div className="p-4 rounded-lg border bg-background font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {studentAnswerText || <span className="italic text-muted-foreground">Nessun testo inserito.</span>}
            </div>
          </div>

          <hr className="border-muted" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="score-select" className="text-sm font-semibold">Assegna Punteggio</Label>
              <Select value={score} onValueChange={setScore} disabled={isPending}>
                <SelectTrigger id="score-select" className="w-full">
                  <SelectValue placeholder="Seleziona voto..." />
                </SelectTrigger>
                <SelectContent>
                  {scoreOptions.map((val) => (
                    <SelectItem key={val.toString()} value={val.toString()}>
                      {val.toFixed(1)} Punti
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="comment-input" className="text-sm font-semibold">Feedback Verbale / Commento (Opzionale)</Label>
              <Textarea
                id="comment-input"
                placeholder="Inserisci note sulla correzione o indicazioni per lo studente..."
                className="h-[45px] resize-y"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"} className="mt-4">
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{result.success ? "Operazione Completata" : "Errore"}</AlertTitle>
              <AlertDescription className="font-medium">
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-end border-t pt-4">
          <Button
            onClick={handleGrade}
            disabled={isPending || score === ""}
            className="px-6"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvataggio...
              </>
            ) : (
              editMode ? "Aggiorna Voto" : "Conferma ed Emetti Voto"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}