"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Award,
  FileSpreadsheet,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { QuizAttempt } from "@/features/quiz/domain/QuizAttempt";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizQuestion } from "@/features/quiz/domain/Question";
import { CorrectionForm } from "./CorrectionForm";
import { getAttemptOpenAnswerAction } from "../actions/teacherActions";

interface AttemptWithUser extends QuizAttempt {
  studentEmail: string;
}

interface TeacherQuizDashboardProps {
  quiz: Quiz;
  openQuestion: QuizQuestion;
  attempts: AttemptWithUser[];
}

export function TeacherQuizDashboard({
  quiz,
  openQuestion,
  attempts,
}: TeacherQuizDashboardProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "graded">("pending");
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(
    null,
  );
  const [studentAnswer, setStudentAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  // Deriviamo l'oggetto attempt in tempo reale ad ogni render per evitare disallineamenti di stato
  const selectedAttempt = useMemo(
    () => attempts.find((a) => a.id === selectedAttemptId) || null,
    [attempts, selectedAttemptId],
  );

  // Reset degli stati di visualizzazione al cambio di tab
  useEffect(() => {
    setIsEditing(false);
    setSelectedAttemptId(null);
  }, [activeTab]);

  // Caricamento asincrono della risposta con protezione dai race conditions
  useEffect(() => {
    if (!selectedAttemptId) {
      setStudentAnswer("");
      return;
    }

    // Creiamo una costante locale immutabile.
    // Essendo una const ed essendo posizionata dopo il controllo,
    // TypeScript la tipizza rigorosamente come 'string' (escludendo il null).
    const attemptId = selectedAttemptId;

    let isCurrent = true;
    setIsLoadingAnswer(true);

    async function loadAnswer() {
      try {
        const result = await getAttemptOpenAnswerAction(
          attemptId,
          openQuestion.id,
        );
        if (isCurrent && result.success) {
          const textToSet =
            (result as any).answerText ?? (result as any).answer ?? "";
          setStudentAnswer(textToSet);
        }
      } catch (error) {
        console.error("Errore nel caricamento della risposta aperta:", error);
      } finally {
        if (isCurrent) {
          setIsLoadingAnswer(false);
        }
      }
    }

    loadAnswer();

    return () => {
      isCurrent = false; // Annulla l'aggiornamento dello stato se l'utente cambia selezione rapidamente
    };
  }, [selectedAttemptId, openQuestion.id]);

  const pendingAttempts = attempts.filter((a) => a.status === "submitted");
  const gradedAttempts = attempts.filter((a) => a.status === "graded");

  console.log("===> TeacherQuizDashboard DEBUG ATTEMPT:", selectedAttempt);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Registro Correzioni Quiz
          </h1>
          <p className="text-muted-foreground mt-1">
            Quiz:{" "}
            <span className="font-semibold text-foreground">{quiz.title}</span>
          </p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg border">
          <Button
            variant={activeTab === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("pending")}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Da Correggere
            <span className="ml-1 px-1.5 py-0.5 bg-background text-foreground text-xs rounded-full font-bold">
              {pendingAttempts.length}
            </span>
          </Button>
          <Button
            variant={activeTab === "graded" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("graded")}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Valutati
            <span className="ml-1 px-1.5 py-0.5 bg-background text-foreground text-xs rounded-full font-bold">
              {gradedAttempts.length}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Colonna Sinistra: Lista dei record */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block px-1">
            {activeTab === "pending"
              ? "Sottomissioni pendenti"
              : "Storico valutazioni"}
          </span>

          {activeTab === "pending" && pendingAttempts.length === 0 && (
            <Card className="p-6 text-center border-dashed">
              <p className="text-sm text-muted-foreground">
                Nessun tentativo in attesa di correzione manuale.
              </p>
            </Card>
          )}

          {activeTab === "graded" && gradedAttempts.length === 0 && (
            <Card className="p-6 text-center border-dashed">
              <p className="text-sm text-muted-foreground">
                Nessun compito ancora corretto per questo quiz.
              </p>
            </Card>
          )}

          {(activeTab === "pending" ? pendingAttempts : gradedAttempts).map(
            (attempt) => (
              <Card
                key={attempt.id}
                className={`cursor-pointer transition-all border hover:border-primary/50 ${
                  selectedAttemptId === attempt.id
                    ? "ring-2 ring-primary border-primary"
                    : "bg-card"
                }`}
                onClick={() => {
                  setSelectedAttemptId(attempt.id);
                  setIsEditing(false); // Chiude form di edit se si cambia studente
                }}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium min-w-0">
                      <User className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate" title={attempt.studentEmail}>
                        {attempt.studentEmail}
                      </span>
                    </div>
                    <BadgeParziale
                      autoScore={attempt.autoScore}
                      status={attempt.status}
                      finalScore={attempt.finalScore}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Consegnato il:{" "}
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString(
                          "it-IT",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "N/D"}
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>

        {/* Colonna Destra: Modulo Dinamico di Correzione o Riepilogo */}
        <div className="lg:col-span-2">
          {selectedAttempt ? (
            isLoadingAnswer ? (
              <Card className="border-border bg-card p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Clock className="h-8 w-8 text-muted-foreground/60 animate-spin mb-3" />
                <p className="text-sm text-muted-foreground">
                  Recupero della risposta in corso...
                </p>
              </Card>
            ) : activeTab === "pending" ? (
              // NUOVA CORREZIONE
              <CorrectionForm
                key={`pending-${selectedAttempt.id}`}
                attemptId={selectedAttempt.id}
                questionId={openQuestion.id}
                questionText={openQuestion.text}
                studentAnswerText={studentAnswer}
                studentEmail={selectedAttempt.studentEmail}
                editMode={true}
                initialScore={selectedAttempt.teacherScore}
              />
            ) : // VALUTATI
            isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="gap-2 text-muted-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> Annulla Modifica
                  </Button>
                </div>
                <CorrectionForm
                  key={`edit-${selectedAttempt.id}`}
                  attemptId={selectedAttempt.id}
                  questionId={openQuestion.id}
                  questionText={openQuestion.text}
                  studentAnswerText={studentAnswer}
                  studentEmail={selectedAttempt.studentEmail}
                  editMode={true}

                  //initialScore={Number((selectedAttempt.finalScore - selectedAttempt.autoScore).toFixed(2),)}
                  initialScore={selectedAttempt.teacherScore}
                />
              </div>
            ) : (
              <Card className="border-border bg-card relative">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Modifica
                  </Button>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Award className="h-6 w-6" />
                    <CardTitle className="text-xl font-bold">
                      Valutazione Emessa
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Riepilogo dei punteggi consolidati per l'utente{" "}
                    <span className="font-semibold text-foreground">
                      {selectedAttempt.studentEmail}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <span className="text-xs text-muted-foreground block font-medium">
                        Test Chiuse
                      </span>
                      <span className="text-lg font-bold">
                        {selectedAttempt.autoScore.toFixed(2)} / 4.00
                      </span>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <span className="text-xs text-muted-foreground block font-medium">
                        Voto Aperta
                      </span>
                      <span className="text-lg font-bold">
                        {(
                          selectedAttempt.finalScore - selectedAttempt.autoScore
                        ).toFixed(2)}{" "}
                        / 6.00
                      </span>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg text-center text-primary">
                      <span className="text-xs opacity-80 block font-bold uppercase tracking-wider">
                        Voto Finale
                      </span>
                      <span className="text-xl font-black">
                        {selectedAttempt.finalScore.toFixed(2)} / 10.00
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="border-border bg-card p-12 text-center border-dashed flex flex-col items-center justify-center min-h-[300px]">
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-semibold text-lg">
                Nessun tentativo selezionato
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Seleziona uno studente dalla colonna di sinistra per esaminare
                la sua risposta aperta ed emettere o modificare il voto finale.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function BadgeParziale({
  autoScore,
  status,
  finalScore,
}: {
  autoScore: number;
  status: string;
  finalScore: number;
}) {
  if (status === "graded") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 border border-green-500/20 shrink-0">
        {finalScore.toFixed(2)} / 10
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-400 border border-yellow-500/20 shrink-0">
      Parziale: {autoScore.toFixed(2)} pt
    </span>
  );
}
