"use client";

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
} from "lucide-react";
import { QuizAttempt } from "@/features/quiz/domain/QuizAttempt";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizQuestion } from "@/features/quiz/domain/Question";
import { CorrectionForm } from "./CorrectionForm";
import { useEffect, useState } from "react";
import { getAttemptOpenAnswerAction } from "../actions/teacherActions";

interface AttemptWithUser extends QuizAttempt {
  studentEmail: string;
}

interface TeacherQuizDashboardProps {
  quiz: Quiz;
  openQuestion: QuizQuestion; // La domanda aperta associata a questo quiz
  attempts: AttemptWithUser[];
}

export function TeacherQuizDashboard({
  quiz,
  openQuestion,
  attempts,
}: TeacherQuizDashboardProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "graded">("pending");

  const [selectedAttempt, setSelectedAttempt] =
    useState<AttemptWithUser | null>(null);

  const [studentAnswer, setStudentAnswer] = useState("");

  useEffect(() => {
    if (selectedAttempt === null) {
      setStudentAnswer("");
      return;
    }

    const attemptId = selectedAttempt.id;

    async function loadAnswer() {
      const result = await getAttemptOpenAnswerAction(
        attemptId,
        openQuestion.id,
      );

      if (result.success) {
        setStudentAnswer(result.answer);
      }
    }

    loadAnswer();
  }, [selectedAttempt, openQuestion.id]);

  const pendingAttempts = attempts.filter((a) => a.status === "submitted");

  const gradedAttempts = attempts.filter((a) => a.status === "graded");

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
            onClick={() => {
              setActiveTab("pending");
              setSelectedAttempt(null);
            }}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Da Correggere
            <span className="ml-1 px-1.5 py-0.2 bg-background text-foreground text-xs rounded-full font-bold">
              {pendingAttempts.length}
            </span>
          </Button>
          <Button
            variant={activeTab === "graded" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setActiveTab("graded");
              setSelectedAttempt(null);
            }}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Valutati
            <span className="ml-1 px-1.5 py-0.2 bg-background text-foreground text-xs rounded-full font-bold">
              {gradedAttempts.length}
            </span>
          </Button>
        </div>
      </div>

      {/* Layout a due colonne: Lista Tentativi + Pannello di Correzione Condizionale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Colonna Sinistra: Lista dei record */}
        <div className="lg:col-span-1 space-y-4">
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
                  selectedAttempt?.id === attempt.id
                    ? "ring-2 ring-primary border-primary"
                    : "bg-card"
                }`}
                onClick={() => setSelectedAttempt(attempt)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[180px]">
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
            activeTab === "pending" ? (
              // Se è da correggere, inietta il modulo CorrectionForm passando i dati statici dell'utente
              <CorrectionForm
                key={selectedAttempt.id} // Forza il reset dello stato del componente se si cambia studente
                attemptId={selectedAttempt.id}
                questionId={openQuestion.id}
                questionText={openQuestion.text}
                studentAnswerText={studentAnswer}
                studentEmail={selectedAttempt.studentEmail}
              />
            ) : (
              // Se è già valutato, mostra una card di riepilogo fissa
              <Card className="border-border bg-card">
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
                  <p className="text-xs text-muted-foreground italic text-center pt-2">
                    Il voto è definitivo e visibile nella dashboard dello
                    studente.
                  </p>
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
                la sua risposta aperta ed emettere il voto finale.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Piccola sotto-funzione di rendering interna per uniformare i Badge di punteggio
 */
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
      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 border border-green-500/20">
        {finalScore.toFixed(2)} / 10
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-400 border border-yellow-500/20">
      Parziale: {autoScore.toFixed(2)} pt
    </span>
  );
}
