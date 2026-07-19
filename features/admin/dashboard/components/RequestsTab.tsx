"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { getPendingEnrollmentsAction } from "@/features/admin/actions/getPendingEnrollmentsAction";
import {
  approveEnrollmentAction,
  syncUserCoursesAction,
} from "@/features/admin/actions/approveEnrollmentAction";
import { getActiveExternalEnrollmentsAction } from "@/features/admin/actions/getActiveExternalEnrollmentsAction";
import { revokeCourseAccessAction } from "@/features/admin/users/actions/revokeCourseAccessAction";
import { getRevokedExternalEnrollmentsAction } from "@/features/admin/actions/getRevokedExternalEnrollmentsAction";
import { reactivateExternalEnrollmentAction } from "@/features/admin/actions/reactivateExternalEnrollmentAction";
import { getCoursesForEnrollmentAction } from "@/features/admin/actions/getCoursesForEnrollmentAction";

interface PendingEnrollment {
  profileId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  userType: string;
  courseTitle: string;
  requestedAt: string;
  selectedCourseIds?: string[];
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

interface GroupedActiveEnrollment {
  profileId: string;
  studentName: string;
  studentEmail: string;
  userType: string;
  selectedCourseIds: string[];
  initialCourseIds: string[];
}

interface AvailableCourse {
  id: string;
  title: string;
}

export default function RequestsTab() {
  const router = useRouter();

  // Transizioni native React
  const [isPendingApproval, startApprovalTransition] = useTransition();
  const [isPendingRevoke, startRevokeTransition] = useTransition();
  const [isPendingReactivate, startReactivateTransition] = useTransition();

  // Stati della vista (Theme Light/Dark compliant tramite classi semantiche)
  const [requestView, setRequestView] = useState<
    "pending" | "active" | "revoked"
  >("pending");
  const [requestError, setRequestError] = useState("");

  // Stati dei dati
  const [pendingRequests, setPendingRequests] = useState<PendingEnrollment[]>(
    [],
  );
  const [groupedActiveRequests, setGroupedActiveRequests] = useState<
    GroupedActiveEnrollment[]
  >([]);
  const [revokedRequests, setRevokedRequests] = useState<ActiveEnrollment[]>(
    [],
  );
  const [availableCourses, setAvailableCourses] = useState<AvailableCourse[]>(
    [],
  );

  // Stati di caricamento
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [isLoadingRevoked, setIsLoadingRevoked] = useState(false);

  useEffect(() => {
    loadPendingRequests();
    loadActiveRequests();
    loadRevokedRequests();
    loadAvailableCourses();
  }, []);

  async function loadPendingRequests() {
    setIsLoadingRequests(true);
    setRequestError("");
    try {
      const result = await getPendingEnrollmentsAction();
      if (result.success && result.data) {
        setPendingRequests(
          result.data.map((request) => ({
            ...request,
            selectedCourseIds: [request.courseId],
          })),
        );
      } else {
        setRequestError(result.error || "Impossibile caricare le richieste.");
      }
    } catch (error) {
      console.error(
        "[RequestsTab Client] Errore caricamento richieste pendenti:",
        error,
      );
      setRequestError(
        "Errore durante il caricamento delle richieste in attesa.",
      );
    } finally {
      setIsLoadingRequests(false);
    }
  }

  async function loadAvailableCourses() {
    try {
      const result = await getCoursesForEnrollmentAction();
      if (result.success && result.data) {
        setAvailableCourses(result.data);
      } else {
        console.error(
          "[RequestsTab Client] Errore server azioni corsi:",
          result.error,
        );
      }
    } catch (error) {
      console.error(
        "[RequestsTab Client] Errore eccezione corsi disponibili:",
        error,
      );
    }
  }

  async function loadActiveRequests() {
    setIsLoadingActive(true);
    try {
      const result = await getActiveExternalEnrollmentsAction();
      if (result.success && result.data) {
        // Raggruppamento client-side degli studenti esterni attivi per consentire multi-assegnazione
        const groups: { [profileId: string]: GroupedActiveEnrollment } = {};

        result.data.forEach((item) => {
          if (!groups[item.profileId]) {
            groups[item.profileId] = {
              profileId: item.profileId,
              studentName: item.studentName,
              studentEmail: item.studentEmail,
              userType: item.userType,
              selectedCourseIds: [],
              initialCourseIds: [],
            };
          }
          groups[item.profileId].selectedCourseIds.push(item.courseId);
          groups[item.profileId].initialCourseIds.push(item.courseId);
        });

        setGroupedActiveRequests(Object.values(groups));
      }
    } catch (error) {
      console.error(
        "[RequestsTab Client] Errore caricamento iscritti attivi:",
        error,
      );
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
      console.error(
        "[RequestsTab Client] Errore caricamento iscritti revocati:",
        error,
      );
    } finally {
      setIsLoadingRevoked(false);
    }
  }

  const handleApproveEnrollment = (
    profileId: string,
    courseIdsToApprove: string[],
  ) => {
    if (courseIdsToApprove.length === 0) {
      alert("Seleziona almeno un corso da abilitare.");
      return;
    }

    startApprovalTransition(async () => {
      try {
        const result = await syncUserCoursesAction(
          profileId,
          courseIdsToApprove,
        );
        if (result.success) {
          setPendingRequests((prev) =>
            prev.filter((req) => req.profileId !== profileId),
          );
          await loadActiveRequests();
          router.refresh();
        } else {
          alert(`Errore durante l'abilitazione dei corsi: ${result.error}`);
        }
      } catch (err: any) {
        console.error(
          "[RequestsTab Client] Eccezione approvazione iscrizione:",
          err,
        );
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  const handleUpdateActiveCourses = (
    profileId: string,
    courseIdsToSync: string[],
  ) => {
    startApprovalTransition(async () => {
      try {
        const result = await syncUserCoursesAction(profileId, courseIdsToSync);
        if (result.success) {
          await loadActiveRequests();
          await loadPendingRequests();
          await loadRevokedRequests();
          router.refresh();
          alert("Licenze e corsi dello studente aggiornati con successo.");
        } else {
          alert(`Errore durante l'aggiornamento dei corsi: ${result.error}`);
        }
      } catch (err: any) {
        console.error(
          "[RequestsTab Client] Eccezione sincro corsi attivi:",
          err,
        );
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  const handleRevokeEnrollment = (profileId: string, courseId: string) => {
    if (
      !confirm(
        "Sei sicuro di voler revocare l'accesso a questo studente? L'operazione è immediata.",
      )
    ) {
      return;
    }

    startRevokeTransition(async () => {
      try {
        const result = await revokeCourseAccessAction(profileId, courseId);
        if (result.success) {
          await loadActiveRequests();
          await loadRevokedRequests();
          router.refresh();
        } else {
          alert(`Errore durante la revoca: ${result.error}`);
        }
      } catch (err: any) {
        console.error("[RequestsTab Client] Eccezione revoca corso:", err);
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  const handleReactivateEnrollment = (profileId: string, courseId: string) => {
    startReactivateTransition(async () => {
      try {
        const result = await reactivateExternalEnrollmentAction(
          profileId,
          courseId,
        );
        if (result.success) {
          setRevokedRequests((prev) =>
            prev.filter(
              (req) =>
                !(req.profileId === profileId && req.courseId === courseId),
            ),
          );
          await loadActiveRequests();
          router.refresh();
        } else {
          alert(`Errore durante il ripristino: ${result.error}`);
        }
      } catch (err: any) {
        console.error("[RequestsTab Client] Eccezione ripristino corso:", err);
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  const handleCourseSelection = (
    profileId: string,
    courseId: string,
    checked: boolean,
  ) => {
    setPendingRequests((prev) =>
      prev.map((request) => {
        if (request.profileId !== profileId) return request;
        const selected = new Set(request.selectedCourseIds ?? []);
        if (checked) selected.add(courseId);
        else selected.delete(courseId);
        return { ...request, selectedCourseIds: [...selected] };
      }),
    );
  };

  const handleActiveCourseSelection = (
    profileId: string,
    courseId: string,
    checked: boolean,
  ) => {
    setGroupedActiveRequests((prev) =>
      prev.map((student) => {
        if (student.profileId !== profileId) return student;
        const selected = new Set(student.selectedCourseIds);
        if (checked) selected.add(courseId);
        else selected.delete(courseId);
        return { ...student, selectedCourseIds: [...selected] };
      }),
    );
  };
  return (
    <div className="space-y-4 text-foreground bg-background">
      <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-muted">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Gestione Licenze e Iscrizioni Esterne
          </h3>
          <p className="text-xs text-muted-foreground">
            Valuta le richieste di iscrizione degli utenti esterni o gestisci in
            tempo reale gli accessi multipli.
          </p>
        </div>

        {/* Toggle Navigazione Tab */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border border-muted select-none self-start sm:self-center">
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
            👥 Accessi Attivi ({groupedActiveRequests.length})
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
            <div className="rounded-xl border border-dashed border-muted p-12 text-center text-muted-foreground bg-muted/10">
              <span className="text-3xl mb-2 block">🎉</span>
              <p className="text-base font-semibold text-foreground">
                Nessuna richiesta in attesa
              </p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Tutte le richieste di licenza degli utenti esterni sono state
                elaborate.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-muted bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground font-medium select-none">
                      <th className="p-4 text-left">Studente</th>
                      <th className="p-4 text-center">Tipo Utente</th>
                      <th className="p-4 text-left">Corso Richiesto</th>
                      <th className="p-4 text-left">Corsi da Abilitare</th>
                      <th className="p-4 text-center">Data Richiesta</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted">
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
                        <td className="p-4">
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                            {availableCourses.map((course) => (
                              <label
                                key={course.id}
                                className="flex items-center gap-2 text-xs cursor-pointer select-none py-0.5 hover:text-foreground"
                              >
                                <input
                                  type="checkbox"
                                  className="rounded border-muted text-primary focus:ring-ring"
                                  checked={
                                    req.selectedCourseIds?.includes(
                                      course.id,
                                    ) ?? false
                                  }
                                  onChange={(e) =>
                                    handleCourseSelection(
                                      req.profileId,
                                      course.id,
                                      e.target.checked,
                                    )
                                  }
                                />
                                <span className="text-foreground text-[11px]">
                                  {course.title}
                                </span>
                              </label>
                            ))}
                          </div>
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
                            onClick={() => {
                              const coursesToApprove =
                                req.selectedCourseIds &&
                                req.selectedCourseIds.length > 0
                                  ? req.selectedCourseIds
                                  : [req.courseId];
                              handleApproveEnrollment(
                                req.profileId,
                                coursesToApprove,
                              );
                            }}
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
            </div>
          )}
        </>
      )}

      {/* VISTA: ACCESSI ATTIVI (RAGGRUPPATI E MULTI-CORSO CON REVOCA NATIVA) */}
      {requestView === "active" && (
        <>
          {isLoadingActive ? (
            <div className="p-12 text-center text-muted-foreground">
              ⌛ Caricamento degli studenti abilitati...
            </div>
          ) : groupedActiveRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-muted p-12 text-center text-muted-foreground bg-muted/10">
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
            <div className="rounded-xl border border-muted bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground font-medium select-none">
                      <th className="p-4 text-left">Studente</th>
                      <th className="p-4 text-left">
                        Corsi Attivi (Clicca 🚫 per Revocare)
                      </th>
                      <th className="p-4 text-left">Assegna Nuovi Corsi</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted">
                    {groupedActiveRequests.map((student) => {
                      // I corsi che l'utente possiede già ATTIVAMENTE
                      const activeCoursesForStudent = availableCourses.filter(
                        (c) => student.initialCourseIds.includes(c.id),
                      );

                      // I corsi che l'utente NON ha ancora attivi (disponibili da aggiungere)
                      const assignableCourses = availableCourses.filter(
                        (c) => !student.initialCourseIds.includes(c.id),
                      );

                      // Controlla se l'admin ha selezionato qualche NUOVA checkbox
                      const hasNewSelections = student.selectedCourseIds.some(
                        (id) => !student.initialCourseIds.includes(id),
                      );

                      return (
                        <tr
                          key={student.profileId}
                          className="hover:bg-muted/10 transition-colors"
                        >
                          <td className="p-4 align-top w-1/4">
                            <div className="font-semibold text-foreground">
                              {student.studentName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {student.studentEmail}
                            </div>
                            <span className="mt-2 inline-block rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2 py-0.5 text-[10px] font-bold">
                              ✓ Account Attivo
                            </span>
                          </td>

                          {/* COLONNA 1: CORSI ATTIVI CON TASTO REVOCA DIRETTA (Stato 'revoked' preservato!) */}
                          <td className="p-4 align-top w-1/3">
                            {activeCoursesForStudent.length === 0 ? (
                              <span className="text-xs text-muted-foreground italic">
                                Nessun corso attivo
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {activeCoursesForStudent.map((course) => (
                                  <div
                                    key={course.id}
                                    className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground px-2 py-1 rounded-md text-[11px] font-medium shadow-sm"
                                  >
                                    <span>{course.title}</span>
                                    <button
                                      onClick={() =>
                                        handleRevokeEnrollment(
                                          student.profileId,
                                          course.id,
                                        )
                                      }
                                      disabled={isPendingRevoke}
                                      title="Revoca accesso a questo corso"
                                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold ml-1 px-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                    >
                                      🚫
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>

                          {/* COLONNA 2: SELEZIONE NUOVE LICENZE DA AGGIUNGERE */}
                          <td className="p-4 align-top">
                            {assignableCourses.length === 0 ? (
                              <span className="text-xs text-muted-foreground italic">
                                Tutti i corsi già assegnati
                              </span>
                            ) : (
                              <div className="space-y-1 max-h-32 overflow-y-auto pr-2">
                                {assignableCourses.map((course) => (
                                  <label
                                    key={course.id}
                                    className="flex items-center gap-2 text-xs cursor-pointer select-none py-0.5 hover:text-foreground text-muted-foreground"
                                  >
                                    <input
                                      type="checkbox"
                                      className="rounded border-muted text-violet-600 focus:ring-violet-500"
                                      checked={student.selectedCourseIds.includes(
                                        course.id,
                                      )}
                                      onChange={(e) =>
                                        handleActiveCourseSelection(
                                          student.profileId,
                                          course.id,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-[11px] text-foreground">
                                      {course.title}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </td>

                          {/* COLONNA 3: SALVATAGGIO DEI NUOVI CORSI AGGIUNTI */}
                          <td className="p-4 text-right align-top w-1/6">
                            <Button
                              size="sm"
                              className={`w-full font-semibold transition-all text-white ${
                                hasNewSelections
                                  ? "bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 shadow-md"
                                  : "bg-zinc-500/40 text-muted-foreground cursor-not-allowed"
                              }`}
                              disabled={!hasNewSelections || isPendingApproval}
                              onClick={() =>
                                // Inviamo l'array unito dei vecchi corsi + i nuovi selezionati
                                handleUpdateActiveCourses(
                                  student.profileId,
                                  student.selectedCourseIds,
                                )
                              }
                            >
                              {isPendingApproval
                                ? "Aggiunta..."
                                : "➕ Aggiungi Corsi"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* VISTA: ACCESSI REVOCATI */}
      {requestView === "revoked" && (
        <>
          {isLoadingRevoked ? (
            <div className="p-12 text-center text-muted-foreground">
              ⌛ Caricamento degli accessi revocati...
            </div>
          ) : revokedRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-muted p-12 text-center text-muted-foreground bg-muted/10">
              <span className="text-3xl mb-2 block">🛡️</span>
              <p className="text-base font-semibold text-foreground">
                Nessun accesso revocato
              </p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Non ci sono licenze per studenti esterni attualmente in stato
                revocato.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-muted bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground font-medium select-none">
                      <th className="p-4 text-left">Studente</th>
                      <th className="p-4 text-center">Stato</th>
                      <th className="p-4 text-left">Corso Revocato</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted">
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
                          <span className="rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-3 py-1 text-xs font-semibold">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
