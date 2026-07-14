"use client";

import React, { useState, useTransition } from "react";
import { Quiz } from "../domain/Quiz";
import { QuizQuestion } from "../domain/Question";
import { submitStudentAttemptAction } from "../actions/quizActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";

interface QuizViewerProps {
  quiz: Quiz;
  questions: QuizQuestion[];
}

export function QuizViewer({ quiz, questions }: QuizViewerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ success: boolean; score?: number; message?: string } | null>(null);

  const handleOptionChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    const payload = questions.map((q) => {
      if (q.type === "multiple_choice") {
        return {
          questionId: q.id,
          selectedOptionId: answers[q.id],
        };
      } else {
        return {
          questionId: q.id,
          openAnswerText: openAnswer,
        };
      }
    });

    startTransition(async () => {
      const result = await submitStudentAttemptAction(quiz.id, payload);

      if (result.success) {
        setFeedback({
          success: true,
          score: result.autoScore,
        });
      } else {
        setFeedback({
          success: false,
          message: result.error || "Impossibile elaborare il tentativo.",
        });
      }
    });
  };

  const isQuizIncomplete = questions
    .filter((q) => q.type === "multiple_choice")
    .some((q) => !answers[q.id]);

  if (feedback?.success) {
    return (
      <Card className="max-w-2xl mx-auto border-border bg-card mt-8 text-center p-6">
        <CardHeader className="flex flex-col items-center gap-2">
          <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
          <CardTitle className="text-2xl font-bold">Quiz Sottomesso!</CardTitle>
          <CardDescription>
            Le tue risposte sono state registrate ed elaborate dal sistema centrale.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg inline-block">
            <span className="text-sm font-medium text-muted-foreground block">Punteggio Parziale Chiuse</span>
            <span className="text-3xl font-extrabold text-foreground">{feedback.score?.toFixed(2)} / 4.00</span>
          </div>
          
          <div className="p-4 rounded-lg border text-left flex gap-3 bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5 shrink-0" />
            <div>
              <h5 className="font-semibold leading-none tracking-tight mb-1">In attesa del Docente</h5>
              <p className="text-sm opacity-95">
                La domanda aperta (valore max 6.00 punti) è stata inviata ai docenti della piattaforma. Riceverai la notifica del voto complessivo appena completata la correzione manuale.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{quiz.title}</h1>
          <p className="text-muted-foreground mt-1">{quiz.description}</p>
        </div>
        <div className="flex gap-2">
          {quiz.penaltyEnabled && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Penalità attiva (-{quiz.negativeMark})
            </Badge>
          )}
          <Badge variant="secondary">Punti totali: 10.00</Badge>
        </div>
      </div>

      {feedback?.success === false && (
        <div className="p-4 rounded-lg border flex gap-3 bg-destructive/10 border-destructive/20 text-destructive">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div>
            <h5 className="font-semibold leading-none tracking-tight mb-1">Errore durante l'invio</h5>
            <p className="text-sm opacity-90">{feedback.message}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question, qIdx) => (
          <Card key={question.id} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">Domanda {qIdx + 1}</span>
                <span className="text-xs text-muted-foreground">({question.points.toFixed(2)} pt)</span>
              </div>
              <CardTitle className="text-lg font-medium pt-1">
                {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "multiple_choice" && question.options ? (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(val) => handleOptionChange(question.id, val)}
                  disabled={isPending}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-muted hover:bg-accent/40 transition-colors"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer font-normal leading-relaxed">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor={`open-${question.id}`} className="text-xs text-muted-foreground">
                    Scrivi qui la tua risposta testuale esaustiva:
                  </Label>
                  <Textarea
                    id={`open-${question.id}`}
                    placeholder="Fornisci argomentazioni chiare e dettagliate..."
                    className="min-h-[150px] resize-y"
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                    disabled={isPending}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isPending || isQuizIncomplete || !openAnswer.trim()}
          className="px-8 font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sottomissione in corso...
            </>
          ) : (
            "Invia e Completa Quiz"
          )}
        </Button>
      </div>
    </div>
  );
}