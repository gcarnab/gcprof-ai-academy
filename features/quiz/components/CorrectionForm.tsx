"use client";

import React, { useState, useTransition, useEffect } from "react";
import { gradeOpenAnswerAction } from "../actions/teacherActions";
import {
  generateMasterAnswerAction,
  evaluateAnswerAIAction,
  getAIReviewAction,
} from "@/features/ai/actions/aiActions";
import { StudentProfile } from "../types/quizReview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Bot,
  Sparkles,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

interface CorrectionFormProps {
  attemptId: string;
  questionId: string;
  questionText: string;
  studentAnswerText: string;
  studentProfile: StudentProfile;
  editMode?: boolean;
  initialScore?: number | string;
  initialComment?: string;
  reviewId?: string;
  onGradedSuccess?: (attemptId: string, finalScore: number) => void;
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
  studentProfile,
  editMode = false,
  initialScore,
  initialComment,
  reviewId,
  onGradedSuccess,
}: CorrectionFormProps) {
  const [score, setScore] = useState<string>(normalizeScore(initialScore));
  const [comment, setComment] = useState<string>(initialComment || "");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Stati dedicati al modulo AI
  const [masterAnswer, setMasterAnswer] = useState<string>("");
  const [isGeneratingMaster, setIsGeneratingMaster] =
    useState<boolean>(false);
  const [isEvaluatingAI, setIsEvaluatingAI] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [aiSuggestedScore, setAiSuggestedScore] = useState<number | null>(
    null,
  );
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const [aiModelInfo, setAiModelInfo] = useState<{
    provider: string;
    model: string;
  } | null>(null);

  useEffect(() => {
    setScore(normalizeScore(initialScore));
    setComment(initialComment || "");
    setResult(null);
    setAiError(null);

    // Recupero eventuale revisione AI già presente a DB
    async function fetchExistingAIReview() {
      const res = await getAIReviewAction(attemptId, questionId);

      if (res.success && res.review) {
        setAiSuggestedScore(res.review.suggestedScore);
        setAiFeedback(res.review.feedback);

        // confidence è opzionale nel contratto della revisione AI.
        // Lo stato React utilizza null come valore "non disponibile".
        setAiConfidence(res.review.confidence ?? null);

        setMasterAnswer(res.review.masterAnswer || "");
        setAiModelInfo({
          provider: res.review.provider,
          model: res.review.model,
        });
      }
    }

    fetchExistingAIReview();
  }, [initialScore, initialComment, attemptId, questionId]);

  const handleGenerateMaster = async () => {
    setIsGeneratingMaster(true);
    setAiError(null);

    const res = await generateMasterAnswerAction({ questionText });

    if (res.success && res.data) {
      setMasterAnswer(res.data.masterAnswer);
    } else {
      setAiError(
        res.error || "Impossibile generare la risposta master.",
      );
    }

    setIsGeneratingMaster(false);
  };

  const handleEvaluateAI = async () => {
    if (!masterAnswer.trim()) {
      setAiError(
        "Inserisci o genera prima la Risposta Master di riferimento.",
      );
      return;
    }

    setIsEvaluatingAI(true);
    setAiError(null);

    const res = await evaluateAnswerAIAction({
      attemptId,
      questionId,
      questionText,
      masterAnswer,
      studentAnswer: studentAnswerText,
      maxScore: 6,
    });

    if (res.success && res.data) {
      setAiSuggestedScore(res.data.suggestedScore);
      setAiFeedback(res.data.feedback);
      setAiConfidence(res.data.confidence);
      setAiModelInfo({
        provider: res.data.provider,
        model: res.data.model,
      });
    } else {
      setAiError(
        res.error ||
          "Errore nella valutazione della risposta con AI.",
      );
    }

    setIsEvaluatingAI(false);
  };

  const handleApplyAISuggestion = () => {
    if (aiSuggestedScore !== null) {
      setScore(aiSuggestedScore.toString());
    }

    if (aiFeedback) {
      setComment(aiFeedback);
    }
  };

  const handleGrade = () => {
    const numericScore = parseFloat(score);

    if (
      isNaN(numericScore) ||
      numericScore < 0 ||
      numericScore > 6
    ) {
      return;
    }

    setResult(null);

    startTransition(async () => {
      const response = await gradeOpenAnswerAction({
        attemptId,
        questionId,
        score: numericScore,
        comment: comment.trim() || undefined,
        reviewId: editMode ? reviewId : undefined,
      });

      if (response.success && response.finalScore !== undefined) {
        setResult({
          success: true,
          message: `Valutazione ${
            editMode ? "aggiornata" : "registrata"
          } con successo! Voto finale ricalcolato: ${response.finalScore.toFixed(
            2,
          )} / 10.00`,
        });

        if (onGradedSuccess) {
          onGradedSuccess(attemptId, response.finalScore);
        }
      } else {
        setResult({
          success: false,
          message:
            response.error ||
            "Impossibile salvare la valutazione.",
        });
      }
    });
  };

  const scoreOptions = [
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
  ];

  const fullName =
    `${studentProfile.firstName || ""} ${
      studentProfile.lastName || ""
    }`.trim() || studentProfile.email;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-bold">
                Valutazione Risposta Aperta
              </CardTitle>
            </div>

            <Badge
              variant={
                studentProfile.userType === "SCHOOL_STUDENT"
                  ? "default"
                  : "secondary"
              }
            >
              {studentProfile.userType === "SCHOOL_STUDENT"
                ? "Studente Scolastico"
                : "Utente Esterno"}
            </Badge>
          </div>

          <CardDescription className="pt-2">
            {editMode
              ? "Modifica della revisione per:"
              : "Revisione del tentativo sottomesso da:"}{" "}
            <span className="font-semibold text-foreground">
              {fullName}
            </span>{" "}
            ({studentProfile.email})
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Domanda */}
          <div className="p-4 rounded-lg bg-muted/60 border">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Testo della Domanda Aperta (Max 6.00 Punti)
            </span>

            <p className="text-sm font-medium leading-relaxed text-foreground">
              {questionText}
            </p>
          </div>

          {/* Risposta Studente */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Risposta fornita dallo Studente
            </Label>

            <div className="p-4 rounded-lg border bg-background font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {studentAnswerText || (
                <span className="italic text-muted-foreground">
                  Nessun testo inserito.
                </span>
              )}
            </div>
          </div>

          {/* SEZIONE AI ASSISTANT */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">
                  Assistente AI per la Correzione
                </span>
              </div>

              {aiModelInfo && (
                <Badge
                  variant="outline"
                  className="text-xs font-mono"
                >
                  {aiModelInfo.provider} / {aiModelInfo.model}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              {/* Risposta Master */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    Risposta Master (Riferimento di Correzione)
                  </Label>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={handleGenerateMaster}
                    disabled={isGeneratingMaster}
                  >
                    {isGeneratingMaster ? (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    ) : (
                      <Sparkles className="h-3 w-3 mr-1 text-primary" />
                    )}
                    Genera Risposta Master
                  </Button>
                </div>

                <Textarea
                  placeholder="Inserisci o genera la soluzione di riferimento per la valutazione..."
                  value={masterAnswer}
                  onChange={(e) => setMasterAnswer(e.target.value)}
                  className="text-xs h-20 bg-background"
                />
              </div>

              {/* Azione Valutazione */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEvaluateAI}
                  disabled={
                    isEvaluatingAI || !masterAnswer.trim()
                  }
                  className="text-xs"
                >
                  {isEvaluatingAI ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                      Analisi in corso...
                    </>
                  ) : (
                    <>
                      <BrainCircuit className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Valuta Risposta Studente con AI
                    </>
                  )}
                </Button>
              </div>

              {/* Errori AI */}
              {aiError && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {aiError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Risultato Suggerimento AI */}
              {aiSuggestedScore !== null && (
                <div className="p-3 bg-background border rounded-md space-y-3 mt-2">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground">
                        Voto AI Suggerito:
                      </span>

                      <Badge
                        variant="default"
                        className="text-sm font-bold bg-primary"
                      >
                        {aiSuggestedScore.toFixed(1)} / 6.0 Punti
                      </Badge>
                    </div>

                    {aiConfidence !== null && (
                      <span className="text-xs text-muted-foreground">
                        Confidenza:{" "}
                        <strong className="text-foreground">
                          {aiConfidence}%
                        </strong>
                      </span>
                    )}
                  </div>

                  {aiFeedback && (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground block">
                        Motivazione AI:
                      </span>

                      <p className="text-xs text-foreground leading-relaxed">
                        {aiFeedback}
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleApplyAISuggestion}
                    className="w-full text-xs font-semibold mt-2"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                    Applica Suggerimento nel Form Sottostante
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <hr className="border-muted" />

          {/* Form Finale Manuale del Docente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="space-y-2 md:col-span-1">
              <Label
                htmlFor="score-select"
                className="text-sm font-semibold"
              >
                Assegna Punteggio Ufficiale
              </Label>

              <Select
                value={score}
                onValueChange={setScore}
                disabled={isPending}
              >
                <SelectTrigger id="score-select" className="w-full">
                  <SelectValue placeholder="Seleziona voto..." />
                </SelectTrigger>

                <SelectContent>
                  {scoreOptions.map((val) => (
                    <SelectItem
                      key={val.toString()}
                      value={val.toString()}
                    >
                      {val.toFixed(1)} Punti
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="comment-input"
                className="text-sm font-semibold"
              >
                Feedback Ufficiale Docente (Opzionale)
              </Label>

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
            <Alert
              variant={result.success ? "default" : "destructive"}
              className="mt-4"
            >
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}

              <AlertTitle>
                {result.success
                  ? "Operazione Completata"
                  : "Errore"}
              </AlertTitle>

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
            ) : editMode ? (
              "Aggiorna Voto"
            ) : (
              "Conferma ed Emetti Voto"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}