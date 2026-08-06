"use client";

import React, { useState, useTransition, useMemo } from "react";
import { Quiz } from "../domain/Quiz";
import { QuizQuestion } from "../domain/Question";
import { submitStudentAttemptAction } from "../actions/quizActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertTriangle, HelpCircle, Award, Download } from "lucide-react";

interface QuizViewerProps {
  quiz: Quiz;
  questions: QuizQuestion[];
}

/**
 * Algoritmo Fisher-Yates per rimescolare un array in modo imparziale.
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizViewer({ quiz, questions }: QuizViewerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    success: boolean;
    score?: number;
    message?: string;
    hasOpenQuestions?: boolean;
    certificate?: any;
  } | null>(null);

  // ⚡ SHUFFLE OPZIONI: Memoizzato per avvenire una sola volta al caricamento del quiz
  const shuffledQuestions = useMemo(() => {
    return questions.map((q) => {
      if (q.type === "multiple_choice" && q.options && q.options.length > 0) {
        return {
          ...q,
          options: shuffleArray(q.options),
        };
      }
      return q;
    });
  }, [questions]);

  const handleOptionChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    const payload = shuffledQuestions.map((q) => {
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
          hasOpenQuestions: result.hasOpenQuestions,
          certificate: result.certificate,
        });
      } else {
        setFeedback({
          success: false,
          message: result.error || "Impossibile elaborare il tentativo.",
        });
      }
    });
  };

  const isQuizIncomplete = shuffledQuestions
    .filter((q) => q.type === "multiple_choice")
    .some((q) => !answers[q.id]);

  if (feedback?.success) {
    return (
      <Card className="max-w-2xl mx-auto border-border bg-card mt-8 text-center p-6 shadow-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
          <CardTitle className="text-2xl font-bold">Quiz Sottomesso!</CardTitle>
          <CardDescription>
            Le tue risposte sono state registrate ed elaborate dal sistema centrale.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg inline-block">
            <span className="text-sm font-medium text-muted-foreground block">
              {feedback.hasOpenQuestions ? "Punteggio Parziale Chiuse" : "Punteggio Finale"}
            </span>
            <span className="text-3xl font-extrabold text-foreground">
              {feedback.score?.toFixed(2)} / {quiz.maxScore || 10.0}
            </span>
          </div>

          {feedback.hasOpenQuestions ? (
            <div className="p-4 rounded-lg border text-left flex gap-3 bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400">
              <HelpCircle className="h-5 w-5 shrink-0" />
              <div>
                <h5 className="font-semibold leading-none tracking-tight mb-1">In attesa del Docente</h5>
                <p className="text-sm opacity-95">
                  La domanda aperta è stata inviata ai docenti della piattaforma. Riceverai la notifica e il certificato d'attestato appena completata la correzione manuale.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg border text-left flex flex-col gap-3 bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-emerald-600 shrink-0" />
                <h5 className="font-semibold text-lg">Modulo Completato & Certificato Emesso!</h5>
              </div>
              <p className="text-sm opacity-90">
                Complimenti! Hai superato con successo la lezione/modulo. Il tuo certificato PDF è stato generato ed inviato via email.
              </p>

              {feedback.certificate && (
                <div className="pt-2 flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    onClick={() => {
                      const url = feedback.certificate.pdfUrl || `/dashboard/certificates/${feedback.certificate.id}`;
                      window.open(url, "_blank");
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Scarica / Visualizza Certificato
                  </Button>
                </div>
              )}
            </div>
          )}
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
          <Badge variant="secondary">Punti totali: {quiz.maxScore || "10.00"}</Badge>
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
        {shuffledQuestions.map((question, qIdx) => (
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
          disabled={isPending || isQuizIncomplete || (shuffledQuestions.some((q) => q.type !== "multiple_choice") && !openAnswer.trim())}
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