"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";

import { Button } from "@/components/ui/button";

import CoursesTab from "../../courses/components/CoursesTab";
import UsersTab from "../../users/components/UsersTab";
import MailTab from "../../mail/components/MailTab";
import StatsTab from "../../stats/components/StatsTab";
import TrackingTab from "../../tracking/components/TrackingTab";

import {
  importQuizFromMarkdownAction,
  updateQuizStatusAction,
} from "@/features/quiz/actions/quizActions";

import { getPendingEnrollmentsAction } from "@/features/admin/actions/getPendingEnrollmentsAction";
import { approveEnrollmentAction } from "@/features/admin/actions/approveEnrollmentAction";
import { getActiveExternalEnrollmentsAction } from "@/features/admin/actions/getActiveExternalEnrollmentsAction";
import { revokeCourseAccessAction } from "@/features/admin/users/actions/revokeCourseAccessAction";
import { getRevokedExternalEnrollmentsAction } from "@/features/admin/actions/getRevokedExternalEnrollmentsAction";
import { reactivateExternalEnrollmentAction } from "@/features/admin/actions/reactivateExternalEnrollmentAction";

interface Props {
  stats: any;
  currentTab: string;
  trackingStats: any;
}

interface PendingEnrollment {
  profileId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  userType: string;
  courseTitle: string;
  requestedAt: string;
}

interface ActiveEnrollment {
  enrollmentId: string;
  profileId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  userType: string;
  courseTitle: string;
  courseSlug: string;
  status: string;
  enrolledAt: string;
}

const tabs = [
  { id: "courses", label: "📚 Corsi" },
  { id: "quizzes", label: "📝 Quiz" },
  { id: "users", label: "👥 Utenti" },
  { id: "requests", label: "🔔 Richieste esterni" },
  { id: "mail", label: "📧 Mail" },
  { id: "stats", label: "📊 Stats" },
  { id: "tracking", label: "🛰 Tracking" },
];

export default function AdminDashboard({
  stats,
  currentTab,
  trackingStats,
}: Props) {
  const router = useRouter();

  // Transizioni
  const [isPendingApproval, startApprovalTransition] = useTransition();
  const [isPendingRevoke, startRevokeTransition] = useTransition();
  const [isPendingReactivate, startReactivateTransition] = useTransition();

  const [isImporting, setIsImporting] = useState(false);

  // Stati per le richieste
  const [pendingRequests, setPendingRequests] = useState<PendingEnrollment[]>(
    [],
  );
  const [activeRequests, setActiveRequests] = useState<ActiveEnrollment[]>([]);

  const [requestView, setRequestView] = useState<
    "pending" | "active" | "revoked"
  >("pending"); // Aggiornato il tipo
  const [revokedRequests, setRevokedRequests] = useState<ActiveEnrollment[]>(
    [],
  );
  const [isLoadingRevoked, setIsLoadingRevoked] = useState(false);

  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [requestError, setRequestError] = useState("");

  const availableClassesNames = (stats.raw.classes || []).map(
    (c: any) => c.name,
  );
  const availableQuizzes = stats.raw?.quizzes || [];

  /*
   * Caricamento richieste utenti esterni (In attesa e Attivi)
   */
  useEffect(() => {
    if (currentTab === "requests") {
      loadPendingRequests();
      loadActiveRequests();
      loadRevokedRequests();
    }
  }, [currentTab]);

  async function loadPendingRequests() {
    setIsLoadingRequests(true);
    setRequestError("");
    try {
      const result = await getPendingEnrollmentsAction();
      if (result.success && result.data) {
        setPendingRequests(result.data);
      } else {
        setRequestError(result.error || "Impossibile caricare le richieste.");
      }
    } catch {
      setRequestError("Errore durante il caricamento.");
    } finally {
      setIsLoadingRequests(false);
    }
  }

  async function loadActiveRequests() {
    setIsLoadingActive(true);
    try {
      const result = await getActiveExternalEnrollmentsAction();
      if (result.success && result.data) {
        setActiveRequests(result.data);
      }
    } catch (error) {
      console.error("Errore caricamento iscritti attivi", error);
    } finally {
      setIsLoadingActive(false);
    }
  }

  async function loadRevokedRequests() {
    setIsLoadingRevoked(true);
    try {
      const result = await getRevokedExternalEnrollmentsAction();
      if (result.success && result.data) {
        setRevokedRequests(result.data as any);
      }
    } catch (error) {
      console.error("Errore caricamento iscritti revocati", error);
    } finally {
      setIsLoadingRevoked(false);
    }
  }

  /*
   * Approvazione richiesta corso esterno
   */
  const handleApproveEnrollment = (profileId: string, courseId: string) => {
    startApprovalTransition(async () => {
      try {
        const result = await approveEnrollmentAction(profileId, courseId);
        if (result.success) {
          // Rimuovi dai pending
          setPendingRequests((prev) =>
            prev.filter(
              (req) =>
                !(req.profileId === profileId && req.courseId === courseId),
            ),
          );
          // Ricarica la lista degli attivi
          await loadActiveRequests();
          router.refresh();
        } else {
          alert(`Errore: ${result.error}`);
        }
      } catch (err: any) {
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  /*
   * Revoca accesso corso esterno
   */
  const handleRevokeEnrollment = (profileId: string, courseId: string) => {
    if (
      !confirm(
        "Sei sicuro di voler revocare l'accesso a questo studente? L'operazione è immediata.",
      )
    )
      return;

    startRevokeTransition(async () => {
      try {
        const result = await revokeCourseAccessAction(profileId, courseId);
        if (result.success) {
          // Rimuovi dalla lista attivi locale
          setActiveRequests((prev) =>
            prev.filter(
              (req) =>
                !(req.profileId === profileId && req.courseId === courseId),
            ),
          );
          router.refresh();
        } else {
          alert(`Errore durante la revoca: ${result.error}`);
        }
      } catch (err: any) {
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  /*
   * Ripristina accesso corso esterno (Two-Way)
   */
  const handleReactivateEnrollment = (profileId: string, courseId: string) => {
    startReactivateTransition(async () => {
      try {
        const result = await reactivateExternalEnrollmentAction(
          profileId,
          courseId,
        );
        if (result.success) {
          // Rimuovi dalla lista locale dei revocati
          setRevokedRequests((prev) =>
            prev.filter(
              (req) =>
                !(req.profileId === profileId && req.courseId === courseId),
            ),
          );
          // Ricarica la lista degli attivi
          await loadActiveRequests();
          router.refresh();
        } else {
          alert(`Errore durante il ripristino: ${result.error}`);
        }
      } catch (err: any) {
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  function changeTab(tab: string) {
    router.push(`/admin/dashboard?tab=${tab}`);
  }

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
      console.error("Errore durante la lettura del file Markdown:", error);
      setIsImporting(false);
    }
  };
  return (
    <>
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Pannello Amministratore
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestisci la struttura dei corsi, gli utenti, i quiz di sbarramento e
          tutte le funzionalità amministrative della piattaforma.
        </p>
      </div>

      {/* TAB BAR */}
      <div className="rounded-xl border bg-background shadow mt-6">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`
                px-6 py-4 text-sm font-medium transition-colors
                ${
                  currentTab === tab.id
                    ? "border-b-2 border-blue-600 dark:border-violet-500 text-blue-600 dark:text-violet-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* COURSES */}
          {currentTab === "courses" && <CoursesTab stats={stats} />}

          {/* QUIZZES */}
          {currentTab === "quizzes" && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Gestione Quiz di Sbarramento
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Seleziona un quiz per monitorare le performance degli
                    studenti o importane uno nuovo.
                  </p>
                </div>
                <div>
                  <label
                    className={`
                      inline-flex items-center gap-2 px-4 py-2
                      text-xs font-bold rounded-lg shadow-sm
                      transition-colors cursor-pointer
                      ${
                        isImporting
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
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

              <div className="rounded-xl border bg-background overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                      <th className="p-4 text-left">Titolo del Quiz</th>
                      <th className="p-4 text-center">Stato</th>
                      <th className="p-4 text-center">Soglia Minima</th>
                      <th className="p-4 text-center">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {availableQuizzes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-12 text-center text-muted-foreground"
                        >
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <p className="text-base font-medium text-foreground">
                              Nessun quiz registrato nel database.
                            </p>
                            <p className="text-xs max-w-md mx-auto text-muted-foreground">
                              I quiz vengono estratti e strutturati partendo dai
                              tuoi file di testo.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      availableQuizzes.map((quiz: any) => (
                        <tr
                          key={quiz.id}
                          className="hover:bg-muted/10 transition-colors"
                        >
                          <td className="p-4 font-semibold text-foreground">
                            {quiz.title}
                          </td>
                          <td className="p-4 text-center">
                            {quiz.status === "active" ? (
                              <span className="rounded bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 px-2 py-1 text-xs font-semibold">
                                Pubblicato
                              </span>
                            ) : (
                              <span className="rounded bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 text-xs font-semibold">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center font-mono text-muted-foreground">
                            {quiz.passing_score
                              ? `${quiz.passing_score}%`
                              : "—"}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="default"
                                disabled={quiz.status === "active"}
                                onClick={async () => {
                                  await updateQuizStatusAction(
                                    quiz.id,
                                    "active",
                                  );
                                  router.refresh();
                                }}
                              >
                                Pubblica
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  await updateQuizStatusAction(
                                    quiz.id,
                                    "draft",
                                  );
                                  router.refresh();
                                }}
                                disabled={quiz.status === "draft"}
                              >
                                Ritira
                              </Button>
                              <Link
                                href={`/admin/quiz/${quiz.id}/analytics`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 dark:bg-violet-600 text-white hover:bg-blue-700 dark:hover:bg-violet-700 rounded-lg transition-colors shadow-sm"
                              >
                                📊 Analizza Risultati
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* REQUESTS */}
          {currentTab === "requests" && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Gestione Licenze e Iscrizioni Esterne
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Valuta le richieste di iscrizione degli utenti esterni o
                    gestisci e revoca gli accessi già concessi ai corsi.
                  </p>
                </div>

                {/* Sotto-Toggle di Visualizzazione */}
                <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border select-none self-start sm:self-center">
                  <button
                    onClick={() => setRequestView("pending")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      requestView === "pending"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🔔 In Attesa ({pendingRequests.length})
                  </button>
                  <button
                    onClick={() => setRequestView("active")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      requestView === "active"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    👥 Accessi Attivi ({activeRequests.length})
                  </button>

                  <button
                    onClick={() => setRequestView("revoked")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      requestView === "revoked"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🚫 Accessi Revocati ({revokedRequests.length})
                  </button>
                </div>
              </div>

              {requestError && (
                <div className="p-6 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-medium">
                  ⚠️ {requestError}
                </div>
              )}

              {/* VISTA: RICHIESTE IN ATTESA */}
              {requestView === "pending" && (
                <>
                  {isLoadingRequests ? (
                    <div className="p-12 text-center text-muted-foreground">
                      ⌛ Caricamento delle richieste in corso...
                    </div>
                  ) : pendingRequests.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-muted/10">
                      <span className="text-3xl mb-2 block">🎉</span>
                      <p className="text-base font-semibold text-foreground">
                        Nessuna richiesta in attesa
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                        Tutte le richieste di licenza degli utenti esterni sono
                        state elaborate.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl border bg-background overflow-hidden">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                            <th className="p-4 text-left">Studente</th>
                            <th className="p-4 text-center">Tipo Utente</th>
                            <th className="p-4 text-left">Corso Richiesto</th>
                            <th className="p-4 text-center">Data Richiesta</th>
                            <th className="p-4 text-right">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {pendingRequests.map((req) => (
                            <tr
                              key={`${req.profileId}-${req.courseId}`}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="p-4">
                                <div className="font-semibold text-foreground">
                                  {req.studentName}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {req.studentEmail}
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <span className="rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 px-3 py-1 text-xs font-semibold">
                                  🌐 Esterno
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-blue-600 dark:text-violet-400">
                                  {req.courseTitle}
                                </span>
                              </td>
                              <td className="p-4 text-center font-mono text-xs text-muted-foreground">
                                {new Date(req.requestedAt).toLocaleDateString(
                                  "it-IT",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <Button
                                  size="sm"
                                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold transition-all shadow-sm"
                                  onClick={() =>
                                    handleApproveEnrollment(
                                      req.profileId,
                                      req.courseId,
                                    )
                                  }
                                  disabled={isPendingApproval}
                                >
                                  {isPendingApproval
                                    ? "Abilitazione..."
                                    : "✅ Approva Accesso"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {/* VISTA: ACCESSI ATTIVI (BACK OFFICE E REVOCA) */}
              {requestView === "active" && (
                <>
                  {isLoadingActive ? (
                    <div className="p-12 text-center text-muted-foreground">
                      ⌛ Caricamento degli studenti abilitati...
                    </div>
                  ) : activeRequests.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-muted/10">
                      <span className="text-3xl mb-2 block">🤷‍♂️</span>
                      <p className="text-base font-semibold text-foreground">
                        Nessun utente esterno attivo
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                        Non ci sono attualmente studenti esterni abilitati alla
                        fruizione dei corsi.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl border bg-background overflow-hidden">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                            <th className="p-4 text-left">Studente</th>
                            <th className="p-4 text-center">Stato</th>
                            <th className="p-4 text-left">Corso Abilitato</th>
                            <th className="p-4 text-center">
                              Data Approvazione
                            </th>
                            <th className="p-4 text-right">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {activeRequests.map((req) => (
                            <tr
                              key={`${req.profileId}-${req.courseId}`}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="p-4">
                                <div className="font-semibold text-foreground">
                                  {req.studentName}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {req.studentEmail}
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <span className="rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-3 py-1 text-xs font-semibold ">
                                  ✓ Attivo
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-foreground">
                                  {req.courseTitle}
                                </span>
                              </td>
                              <td className="p-4 text-center font-mono text-xs text-muted-foreground">
                                {req.enrolledAt
                                  ? new Date(req.enrolledAt).toLocaleDateString(
                                      "it-IT",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                    )
                                  : "—"}
                              </td>
                              <td className="p-4 text-right">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-semibold transition-all shadow-sm"
                                  onClick={() =>
                                    handleRevokeEnrollment(
                                      req.profileId,
                                      req.courseId,
                                    )
                                  }
                                  disabled={isPendingRevoke}
                                >
                                  {isPendingRevoke
                                    ? "Revoca in corso..."
                                    : "🚫 Revoca Accesso"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* VISTA: ACCESSI REVOCATI (RIPRISTINO TWO-WAY) */}
          {requestView === "revoked" && (
            <>
              {isLoadingRevoked ? (
                <div className="p-12 text-center text-muted-foreground">
                  ⌛ Caricamento degli accessi revocati...
                </div>
              ) : revokedRequests.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-muted/10">
                  <span className="text-3xl mb-2 block">🛡️</span>
                  <p className="text-base font-semibold text-foreground">
                    Nessun accesso revocato
                  </p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    Non ci sono licenze per studenti esterni attualmente in
                    stato revocato.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border bg-background overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                        <th className="p-4 text-left">Studente</th>
                        <th className="p-4 text-center">Stato</th>
                        <th className="p-4 text-left">Corso Revocato</th>
                        <th className="p-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {revokedRequests.map((req) => (
                        <tr
                          key={`${req.profileId}-${req.courseId}`}
                          className="hover:bg-muted/10 transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-semibold text-foreground">
                              {req.studentName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {req.studentEmail}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-3 py-1 text-xs font-semibold ">
                              🚫 Revocato
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-muted-foreground line-through">
                              {req.courseTitle}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-700 dark:hover:bg-violet-600 text-white font-semibold transition-all shadow-sm"
                              onClick={() =>
                                handleReactivateEnrollment(
                                  req.profileId,
                                  req.courseId,
                                )
                              }
                              disabled={isPendingReactivate}
                            >
                              {isPendingReactivate
                                ? "Ripristino..."
                                : "🔄 Ripristina Accesso"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* USERS */}
          {currentTab === "users" && (
            <UsersTab
              users={stats.raw.users}
              availableClasses={availableClassesNames}
            />
          )}

          {/* MAIL */}
          {currentTab === "mail" && (
            <MailTab availableClasses={availableClassesNames} />
          )}

          {/* STATS */}
          {currentTab === "stats" && <StatsTab stats={stats} />}

          {/* TRACKING */}
          {currentTab === "tracking" && (
            <TrackingTab trackingStats={trackingStats} />
          )}
        </div>
      </div>
    </>
  );
}

/*
 * Funzione helper esterna per l'importazione Markdown
 */
async function uploadQuizFromMarkdown(content: string) {
  try {
    const result = await importQuizFromMarkdownAction(content);

    if (!result.success) {
      console.error("Errore durante l'importazione del quiz:", result.error);
      alert(`Impossibile importare il quiz: ${result.error}`);
      return;
    }

    alert("Quiz importato e salvato nel database con successo!");
  } catch (error: any) {
    console.error("Errore di rete o imprevisto:", error);
    alert(
      `Si è verificato un errore imprevisto: ${
        error.message || "Riprova più tardi."
      }`,
    );
  }
}
