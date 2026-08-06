"use client";

import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, ArrowLeft, FileSpreadsheet } from "lucide-react";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizQuestion } from "@/features/quiz/domain/Question";
import { CorrectionForm } from "./CorrectionForm";
import { QuizAttemptFilterBar } from "./QuizAttemptFilterBar";
import { QuizAttemptList } from "./QuizAttemptList";
import { GradedAttemptSummary } from "./GradedAttemptSummary";
import {
  useQuizAttemptsFilter,
  AttemptWithUser,
} from "../hooks/useQuizAttemptsFilter";
import { getAttemptOpenAnswerAction } from "../actions/teacherActions";
import { logger } from "@/lib/logger";

interface TeacherQuizDashboardProps {
  quiz: Quiz;
  openQuestion: QuizQuestion;
  attempts: AttemptWithUser[];
}

export function TeacherQuizDashboard({
  quiz,
  openQuestion,
  attempts: initialAttempts,
}: TeacherQuizDashboardProps) {
  const [attemptsList, setAttemptsList] = useState<AttemptWithUser[]>(initialAttempts);

  useEffect(() => {
    setAttemptsList(initialAttempts);
  }, [initialAttempts]);

  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const filterProps = useQuizAttemptsFilter({ attemptsList, pageSize: 8 });

  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    userTypeFilter,
    setUserTypeFilter,
    sectionFilter,
    setSectionFilter,
    currentPage,
    setCurrentPage,
    availableSections,
    pendingAttemptsCount,
    gradedAttemptsCount,
    filteredAttempts,
    paginatedAttempts,
    totalPages,
  } = filterProps;

  // Auto-selezione del primo tentativo disponibile al caricamento o al cambio filtri/tab
  useEffect(() => {
    if (paginatedAttempts.length > 0) {
      const isStillInList = paginatedAttempts.some((a) => a.id === selectedAttemptId);
      if (!selectedAttemptId || !isStillInList) {
        setSelectedAttemptId(paginatedAttempts[0].id);
      }
    } else {
      setSelectedAttemptId(null);
    }
  }, [paginatedAttempts, selectedAttemptId]);

  // Selezione dinamica del tentativo corrente
  const selectedAttempt = useMemo(
    () => attemptsList.find((a) => a.id === selectedAttemptId) || null,
    [attemptsList, selectedAttemptId]
  );

  // Reset dello stato di modifica al cambio tab
  useEffect(() => {
    setIsEditing(false);
  }, [activeTab]);

  // Caricamento asincrono risposta aperta
  useEffect(() => {
    if (!selectedAttemptId) {
      setStudentAnswer("");
      return;
    }

    const attemptId = selectedAttemptId;
    let isCurrent = true;
    setIsLoadingAnswer(true);

    async function loadAnswer() {
      try {
        const result = await getAttemptOpenAnswerAction(
          attemptId,
          openQuestion.id
        );
        if (isCurrent && result.success) {
          const textToSet =
            (result as any).answerText ?? (result as any).answer ?? "";
          setStudentAnswer(textToSet);
        }
      } catch (error) {
        logger.error("Errore nel caricamento della risposta aperta:", error);
      } finally {
        if (isCurrent) {
          setIsLoadingAnswer(false);
        }
      }
    }

    loadAnswer();

    return () => {
      isCurrent = false;
    };
  }, [selectedAttemptId, openQuestion.id]);

  const handleGradedSuccess = (attemptId: string, finalScore: number) => {
    setAttemptsList((prev) =>
      prev.map((a) => {
        if (a.id === attemptId) {
          const teacherScore = Number((finalScore - a.autoScore).toFixed(2));
          return {
            ...a,
            status: "graded",
            finalScore,
            teacherScore,
          };
        }
        return a;
      })
    );

    const remainingPending = filteredAttempts.filter((a) => a.id !== attemptId);
    if (remainingPending.length > 0) {
      setSelectedAttemptId(remainingPending[0].id);
    } else {
      setSelectedAttemptId(null);
    }
  };

  logger.info("===> TeacherQuizDashboard DEBUG ATTEMPT:", selectedAttempt);

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
              {pendingAttemptsCount}
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
              {gradedAttemptsCount}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Colonna Sinistra: Barra Filtri e Lista Studenti */}
        <div className="lg:col-span-1 space-y-4">
          <QuizAttemptFilterBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            userTypeFilter={userTypeFilter}
            onUserTypeFilterChange={setUserTypeFilter}
            sectionFilter={sectionFilter}
            onSectionFilterChange={setSectionFilter}
            availableSections={availableSections}
          />

          <QuizAttemptList
            activeTab={activeTab}
            filteredAttemptsCount={filteredAttempts.length}
            paginatedAttempts={paginatedAttempts}
            selectedAttemptId={selectedAttemptId}
            onSelectAttempt={(id) => {
              setSelectedAttemptId(id);
              setIsEditing(false);
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Colonna Destra: Modulo di Correzione / Riepilogo */}
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
              <CorrectionForm
                key={`pending-${selectedAttempt.id}`}
                attemptId={selectedAttempt.id}
                questionId={openQuestion.id}
                questionText={openQuestion.text}
                studentAnswerText={studentAnswer}
                studentProfile={selectedAttempt.profile}
                editMode={false}
                initialScore={selectedAttempt.teacherScore}
                onGradedSuccess={handleGradedSuccess}
              />
            ) : isEditing ? (
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
                  studentProfile={selectedAttempt.profile}
                  editMode={true}
                  initialScore={selectedAttempt.teacherScore}
                  onGradedSuccess={handleGradedSuccess}
                />
              </div>
            ) : (
              <GradedAttemptSummary
                selectedAttempt={selectedAttempt}
                onEdit={() => setIsEditing(true)}
              />
            )
          ) : (
            <Card className="border-border bg-card p-12 text-center border-dashed flex flex-col items-center justify-center min-h-[300px]">
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-semibold text-lg">
                Nessun tentativo trovato
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Non ci sono risposte aperte disponibili per questa sezione o coi filtri correnti.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}