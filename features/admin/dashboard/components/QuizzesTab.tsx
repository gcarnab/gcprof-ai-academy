"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  importQuizFromMarkdownAction,
  updateQuizStatusAction,
} from "@/features/quiz/actions/quizActions";
import { logger } from "@/lib/logger";
import AssignQuizButton from "@/features/quiz/components/AssignQuizButton";

interface QuizzesTabProps {
  availableQuizzes: any[];
  availableCourses: {
    courseId: string;
    title: string;
  }[];
}

export default function QuizzesTab({
  availableQuizzes = [],
  availableCourses = [],
}: QuizzesTabProps) {
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);

  // Stato Filtri e Paginazione
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">(
    "all",
  );
  const [assignmentFilter, setAssignmentFilter] = useState<
    "all" | "assigned" | "unassigned"
  >("all");
  const [reviewFilter, setReviewFilter] = useState<
    "all" | "has_pending" | "no_pending"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleMarkdownImport = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        await uploadQuizFromMarkdown(content);
        setTimeout(() => {
          router.refresh();
          setIsImporting(false);
          e.target.value = "";
        }, 1000);
      };
      reader.readAsText(file);
    } catch (error) {
      logger.error("Errore durante la lettura del file Markdown:", error);
      setIsImporting(false);
    }
  };

  async function uploadQuizFromMarkdown(content: string) {
    try {
      const result = await importQuizFromMarkdownAction(content);
      if (!result.success) {
        alert(`Impossibile importare il quiz: ${result.error}`);
        return;
      }
      alert("Quiz importato e salvato nel database con successo!");
    } catch (error: any) {
      alert(`Errore imprevisto: ${error.message || "Riprova più tardi."}`);
    }
  }

  // Metriche generali (KPI)
  const totalQuizzes = availableQuizzes.length;
  const activeQuizzesCount = useMemo(
    () => availableQuizzes.filter((q) => q.status === "active").length,
    [availableQuizzes],
  );
  const draftQuizzesCount = useMemo(
    () => availableQuizzes.filter((q) => q.status === "draft").length,
    [availableQuizzes],
  );
  const pendingReviewsQuizzesCount = useMemo(
    () => availableQuizzes.filter((q) => (q.pendingReviews || 0) > 0).length,
    [availableQuizzes],
  );

  // Filtraggio lato client
  const filteredQuizzes = useMemo(() => {
    return availableQuizzes.filter((quiz) => {
      const matchesTitle = quiz.title
        ? quiz.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : quiz.status === statusFilter;

      const matchesAssignment =
        assignmentFilter === "all"
          ? true
          : assignmentFilter === "assigned"
            ? !!quiz.assignedCourse
            : !quiz.assignedCourse;

      const pendingCount = quiz.pendingReviews || 0;
      const matchesReview =
        reviewFilter === "all"
          ? true
          : reviewFilter === "has_pending"
            ? pendingCount > 0
            : pendingCount === 0;

      return (
        matchesTitle && matchesStatus && matchesAssignment && matchesReview
      );
    });
  }, [availableQuizzes, searchTerm, statusFilter, assignmentFilter, reviewFilter]);

  // Gestione Paginazione
  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuizzes.length / itemsPerPage),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedQuizzes = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredQuizzes.slice(start, start + itemsPerPage);
  }, [filteredQuizzes, safeCurrentPage, itemsPerPage]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: "all" | "active" | "draft") => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (val: number) => {
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setAssignmentFilter("all");
    setReviewFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* HEADER CON METRICHE ED IMPORT */}
      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Gestione Quiz di Sbarramento
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Monitora, filtra e gestisci i quiz della piattaforma o importane di
            nuovi da Markdown.
          </p>

          {/* BADGES DI STATO */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground border">
              Totali: <strong className="ml-1">{totalQuizzes}</strong>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
              Pubblicati: <strong className="ml-1">{activeQuizzesCount}</strong>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20">
              Bozze: <strong className="ml-1">{draftQuizzesCount}</strong>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20">
              Da Correggere: <strong className="ml-1">{pendingReviewsQuizzesCount}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <label
            className={`
              inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer
              ${
                isImporting
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700"
              }
            `}
          >
            <span>
              {isImporting
                ? "⌛ Elaborazione..."
                : "📥 Importa da Markdown (.md)"}
            </span>
            <input
              type="file"
              accept=".md"
              className="hidden"
              disabled={isImporting}
              onChange={handleMarkdownImport}
            />
          </label>
        </div>
      </div>

      {/* BARRA FILTRI E RICERCA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-card p-3 rounded-xl border">
        {/* Input Ricerca per Titolo */}
        <div className="md:col-span-4 relative">
          <input
            type="text"
            placeholder="🔍 Cerca quiz per titolo..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 transition-all placeholder:text-muted-foreground"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              title="Pulisci ricerca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtro per Stato */}
        <div className="md:col-span-2">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value as any)}
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 transition-all cursor-pointer"
          >
            <option value="all">Tutti gli stati</option>
            <option value="active">Pubblicati</option>
            <option value="draft">Bozze (Draft)</option>
          </select>
        </div>

        {/* Filtro Assegnazione */}
        <div className="md:col-span-2">
          <select
            value={assignmentFilter}
            onChange={(e) => {
              setAssignmentFilter(
                e.target.value as "all" | "assigned" | "unassigned",
              );
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 cursor-pointer"
          >
            <option value="all">Tutti i quiz</option>
            <option value="assigned">Solo assegnati</option>
            <option value="unassigned">Non assegnati</option>
          </select>
        </div>

        {/* NUOVO: Filtro da Correggere */}
        <div className="md:col-span-2">
          <select
            value={reviewFilter}
            onChange={(e) => {
              setReviewFilter(
                e.target.value as "all" | "has_pending" | "no_pending",
              );
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 cursor-pointer font-medium text-orange-600 dark:text-orange-400"
          >
            <option value="all" className="text-foreground">
              Tutte le revisioni
            </option>
            <option value="has_pending" className="text-foreground">
              ⚠️ Da correggere (&gt; 0)
            </option>
            <option value="no_pending" className="text-foreground">
              ✅ Completati (0)
            </option>
          </select>
        </div>

        {/* Bottone Reset Filtri */}
        <div className="md:col-span-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            disabled={
              !searchTerm &&
              statusFilter === "all" &&
              assignmentFilter === "all" &&
              reviewFilter === "all"
            }
            className="w-full text-xs"
          >
            Reset Filtri
          </Button>
        </div>
      </div>

      {/* TABELLA E CONTROLLI PAGINAZIONE */}
      <div className="rounded-xl border bg-background overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground font-semibold select-none">
                <th className="p-4 text-left">Titolo del Quiz</th>
                <th className="p-4 text-center">Stato</th>
                <th className="p-4 text-center">Corso</th>
                <th className="p-4 text-center">Tentativi</th>
                <th className="p-4 text-center">Da Correggere</th>
                <th className="p-4 text-center">Soglia</th>
                <th className="p-4 text-center">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedQuizzes.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      {totalQuizzes === 0 ? (
                        <>
                          <p className="text-base font-medium text-foreground">
                            Nessun quiz registrato nel database.
                          </p>
                          <p className="text-xs max-w-md mx-auto text-muted-foreground">
                            I quiz vengono estratti e strutturati partendo dai
                            tuoi file di testo Markdown.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-base font-medium text-foreground">
                            Nessun quiz trovato con i filtri applicati.
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={resetFilters}
                            className="text-xs text-blue-600 dark:text-violet-400"
                          >
                            Ripristina i filtri per mostrare tutti i quiz
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedQuizzes.map((quiz: any) => (
                  <tr
                    key={quiz.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-4 font-semibold text-foreground max-w-xs sm:max-w-md truncate">
                      {quiz.title}
                    </td>
                    <td className="p-4 text-center">
                      {quiz.status === "active" ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2.5 py-0.5 text-xs font-semibold border border-green-200 dark:border-green-800/50">
                          Pubblicato
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 px-2.5 py-0.5 text-xs font-semibold border border-yellow-200 dark:border-yellow-800/50">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {quiz.assignedCourse ? (
                        <span className="font-medium">
                          {quiz.assignedCourse.title}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <span className="font-semibold">
                        {quiz.attemptsCount}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {quiz.pendingReviews > 0 ? (
                        <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2 py-1 text-xs font-bold text-orange-700 dark:text-orange-400 border border-orange-500/20">
                          {quiz.pendingReviews}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>

                    <td className="p-4 text-center font-mono text-muted-foreground">
                      {quiz.passing_score != null
                        ? `${quiz.passing_score}%`
                        : "—"}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          disabled={quiz.status === "active"}
                          onClick={async () => {
                            await updateQuizStatusAction(quiz.id, "active");
                            router.refresh();
                          }}
                        >
                          Pubblica
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            await updateQuizStatusAction(quiz.id, "draft");
                            router.refresh();
                          }}
                          disabled={quiz.status === "draft"}
                        >
                          Ritira
                        </Button>
                        <AssignQuizButton
                          quizId={quiz.id}
                          quizTitle={quiz.title}
                          courses={availableCourses.map((c) => ({
                            id: c.courseId,
                            title: c.title,
                          }))}
                        />
                        <Link
                          href={`/admin/quiz/${quiz.id}/analytics`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 dark:bg-violet-600 text-white hover:bg-blue-700 dark:hover:bg-violet-700 rounded-lg transition-colors shadow-sm"
                        >
                          📊
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PIÈ DI PAGINA E PAGINAZIONE */}
        {filteredQuizzes.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4 bg-muted/10 text-xs text-muted-foreground">
            {/* Selettore Elementi per pagina e Dettaglio elementi */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span>Mostra</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="px-2 py-1 border rounded-md bg-background text-foreground focus:outline-none cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>per pagina</span>
              </div>
              <span>
                Mostrando{" "}
                <strong className="text-foreground">
                  {Math.min(
                    (safeCurrentPage - 1) * itemsPerPage + 1,
                    filteredQuizzes.length,
                  )}
                </strong>{" "}
                -{" "}
                <strong className="text-foreground">
                  {Math.min(
                    safeCurrentPage * itemsPerPage,
                    filteredQuizzes.length,
                  )}
                </strong>{" "}
                di{" "}
                <strong className="text-foreground">
                  {filteredQuizzes.length}
                </strong>{" "}
                quiz
              </span>
            </div>

            {/* Pulsanti Navigazione Pagine */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="h-8 px-2.5 text-xs"
              >
                ◀ Precedente
              </Button>

              <div className="flex items-center gap-1 font-medium px-2">
                <span>Pagina</span>
                <strong className="text-foreground">{safeCurrentPage}</strong>
                <span>di</span>
                <strong className="text-foreground">{totalPages}</strong>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safeCurrentPage >= totalPages}
                className="h-8 px-2.5 text-xs"
              >
                Successivo ▶
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}