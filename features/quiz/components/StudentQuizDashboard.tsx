"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Se disponibile nel tuo shadcn, altrimenti si può fare in Tailwind puro
import {
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { QuizAttempt } from "@/features/quiz/domain/QuizAttempt";

// Estendiamo l'Attempt con le informazioni del Quiz necessarie per lo studente
interface StudentAttemptExtended extends QuizAttempt {
  quizTitle: string;
  quizDescription?: string;
  totalQuestionsCount: number;
  teacherFeedback?: string; // Feedback testuale opzionale lasciato dal docente
}

interface StudentQuizDashboardProps {
  attempts: StudentAttemptExtended[];
}

export function StudentQuizDashboard({ attempts }: StudentQuizDashboardProps) {
  const [filter, setFilter] = useState<"all" | "graded" | "pending">("all");
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);

  // 1. Calcolo delle statistiche dello studente in tempo reale
  const stats = useMemo(() => {
    const graded = attempts.filter((a) => a.status === "graded");
    const pending = attempts.filter((a) => a.status === "submitted");
    
    const average =
      graded.length > 0
        ? graded.reduce((sum, a) => sum + a.finalScore, 0) / graded.length
        : 0;

    return {
      totalCompleted: attempts.length,
      gradedCount: graded.length,
      pendingCount: pending.length,
      averageGrade: Number(average.toFixed(2)),
    };
  }, [attempts]);

  // 2. Filtro della lista dei tentativi
  const filteredAttempts = useMemo(() => {
    return attempts.filter((attempt) => {
      if (filter === "graded") return attempt.status === "graded";
      if (filter === "pending") return attempt.status === "submitted";
      return true;
    });
  }, [attempts, filter]);

  // Trova il dettaglio del tentativo selezionato
  const selectedAttempt = useMemo(() => {
    return attempts.find((a) => a.id === selectedAttemptId) || null;
  }, [attempts, selectedAttemptId]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      {/* Intestazione */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Il Mio Pannello Quiz</h1>
        <p className="text-muted-foreground mt-1">
          Monitora le tue consegne, visualizza i voti e leggi i feedback dei professori.
        </p>
      </div>

      {/* Widget delle Statistiche (KPI) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Quiz Svolti</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Totale prove consegnate</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Media Voti</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.gradedCount > 0 ? `${stats.averageGrade} / 10` : "N/D"}
            </div>
            {stats.gradedCount > 0 ? (
              <div className="mt-2">
                <Progress value={(stats.averageGrade / 10) * 100} className="h-1.5" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">In attesa di valutazioni</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Valutati</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gradedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Correzione completata</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">In Valutazione</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">In attesa del professore</p>
          </CardContent>
        </Card>
      </div>

      {/* Sezione Principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Colonna Sinistra: Lista dei Quiz Svolti */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              I miei tentativi
            </span>
            {/* Selettore Filtro */}
            <div className="flex gap-1 bg-muted p-1 rounded-md border text-xs">
              <button
                onClick={() => setFilter("all")}
                className={`px-2 py-1 rounded ${
                  filter === "all" ? "bg-background font-semibold shadow-sm" : "opacity-70"
                }`}
              >
                Tutti
              </button>
              <button
                onClick={() => setFilter("graded")}
                className={`px-2 py-1 rounded ${
                  filter === "graded" ? "bg-background font-semibold shadow-sm" : "opacity-70"
                }`}
              >
                Valutati
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-2 py-1 rounded ${
                  filter === "pending" ? "bg-background font-semibold shadow-sm" : "opacity-70"
                }`}
              >
                In attesa
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredAttempts.length === 0 ? (
              <Card className="p-6 text-center border-dashed">
                <AlertCircle className="h-8 w-8 text-muted-foreground/60 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nessun tentativo trovato per questa categoria.
                </p>
              </Card>
            ) : (
              filteredAttempts.map((attempt) => (
                <Card
                  key={attempt.id}
                  className={`cursor-pointer transition-all border hover:border-primary/40 ${
                    selectedAttemptId === attempt.id
                      ? "ring-2 ring-primary border-primary"
                      : "bg-card"
                  }`}
                  onClick={() => setSelectedAttemptId(attempt.id)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate" title={attempt.quizTitle}>
                          {attempt.quizTitle}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          <span>
                            {attempt.completedAt
                              ? new Date(attempt.completedAt).toLocaleDateString("it-IT")
                              : "N/D"}
                          </span>
                        </div>
                      </div>
                      <BadgeStato status={attempt.status} finalScore={attempt.finalScore} />
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Colonna Destra: Dettaglio del Voto e Riscontro */}
        <div className="lg:col-span-2">
          {selectedAttempt ? (
            <Card className="border-border bg-card">
              <CardHeader className="border-b pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold">{selectedAttempt.quizTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedAttempt.quizDescription || "Nessuna descrizione disponibile per questo quiz."}
                    </CardDescription>
                  </div>
                  <div className="shrink-0">
                    <div className="text-xs text-muted-foreground text-left md:text-right">
                      Stato della correzione:
                    </div>
                    <div className="mt-1">
                      <BadgeStato Esteso status={selectedAttempt.status} finalScore={selectedAttempt.finalScore} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Visualizzazione Punteggio (se valutato) */}
                {selectedAttempt.status === "graded" ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Resoconto Punteggio
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <span className="text-xs text-muted-foreground block font-medium mb-1">
                          Domande Chiuse (Automatico)
                        </span>
                        <div className="text-lg font-bold">
                          {selectedAttempt.autoScore.toFixed(2)} <span className="text-xs font-normal text-muted-foreground">/ 4.00 pt</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Calcolato dal sistema</span>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <span className="text-xs text-muted-foreground block font-medium mb-1">
                          Domanda Aperta (Docente)
                        </span>
                        <div className="text-lg font-bold">
                          {(selectedAttempt.finalScore - selectedAttempt.autoScore).toFixed(2)}{" "}
                          <span className="text-xs font-normal text-muted-foreground">/ 6.00 pt</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Valutato manualmente</span>
                      </div>

                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg flex flex-col justify-center">
                        <span className="text-xs text-primary block font-bold uppercase tracking-wider mb-1">
                          Voto Finale
                        </span>
                        <div className="text-2xl font-black text-primary">
                          {selectedAttempt.finalScore.toFixed(2)} <span className="text-sm font-medium opacity-80">/ 10.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Feedback del Professore */}
                    {selectedAttempt.teacherFeedback && (
                      <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg mt-4">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                          <MessageSquare className="h-4 w-4" />
                          Nota del docente
                        </div>
                        <p className="text-sm text-foreground italic leading-relaxed">
                          "{selectedAttempt.teacherFeedback}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Stato in attesa di valutazione
                  <div className="flex flex-col items-center justify-center p-8 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-center">
                    <Clock className="h-10 w-10 text-yellow-500 mb-3 animate-pulse" />
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-400">Compito in fase di correzione</h4>
                    <p className="text-sm text-muted-foreground max-w-md mt-2">
                      Il professore ha ricevuto la tua consegna. Il punteggio parziale delle domande a risposta chiusa è{" "}
                      <span className="font-bold text-foreground">{selectedAttempt.autoScore.toFixed(2)}/4.00</span>. 
                      Riceverai una notifica non appena verrà valutata anche la risposta aperta.
                    </p>
                  </div>
                )}

                {/* Dati temporali di riepilogo della sottomissione */}
                <div className="border-t pt-4 text-xs text-muted-foreground grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium text-foreground block">Data Sottomissione:</span>
                    {selectedAttempt.completedAt
                      ? new Date(selectedAttempt.completedAt).toLocaleString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Non disponibile"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground block">ID Tentativo:</span>
                    <span className="font-mono text-[10px] break-all">{selectedAttempt.id}</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            // Stato vuoto colonna destra
            <Card className="border-border bg-card p-12 text-center border-dashed flex flex-col items-center justify-center min-h-[350px]">
              <Award className="h-12 w-12 text-muted-foreground/40 mb-3" />
              <h3 className="font-semibold text-lg">Seleziona un quiz</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Scegli una delle prove completate sulla sinistra per analizzare il dettaglio del tuo punteggio e le correzioni.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Semplice componente badge per definire lo stato visivo in base ai dati
function BadgeStato({
  status,
  finalScore,
  Esteso = false,
}: {
  status: string;
  finalScore: number;
  Esteso?: boolean;
}) {
  if (status === "graded") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 border border-green-500/20 shrink-0">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        {Esteso ? "Valutato" : `${finalScore.toFixed(2)}/10`}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-400 border border-yellow-500/20 shrink-0">
      <Clock className="h-3.5 w-3.5 shrink-0" />
      {Esteso ? "Da Correggere" : "In attesa"}
    </span>
  );
}