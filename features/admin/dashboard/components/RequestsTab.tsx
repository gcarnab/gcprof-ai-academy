"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Modifica il path se la tua Button si trova altrove

// Import delle azioni (Verifica che i path corrispondano a quelli attuali nel tuo progetto)
import { getRevokedExternalEnrollmentsAction } from "@/features/admin/actions/getRevokedExternalEnrollmentsAction";
import { reactivateExternalEnrollmentAction } from "@/features/admin/actions/reactivateExternalEnrollmentAction";
import { revokeCourseAccessAction } from "../../users/actions/revokeCourseAccessAction";

// Aggiungi qui gli import delle tue vecchie azioni per "approvare" e "caricare" i pendenti/attivi
// esempio: import { approveEnrollmentAction, getPendingEnrollmentsAction, getActiveEnrollmentsAction } from "../actions/...";

interface ActiveEnrollment {
  profileId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  enrolledAt?: string;
}

export default function RequestsTab() {
  const router = useRouter();

  // Transizioni
  const [isPendingApprove, startApproveTransition] = useTransition();
  const [isPendingRevoke, startRevokeTransition] = useTransition();
  const [isPendingReactivate, startReactivateTransition] = useTransition();

  // Stati della vista
  const [requestView, setRequestView] = useState<
    "pending" | "active" | "revoked"
  >("pending");

  // Stati dei dati
  const [pendingRequests, setPendingRequests] = useState<ActiveEnrollment[]>(
    [],
  );
  const [activeRequests, setActiveRequests] = useState<ActiveEnrollment[]>([]);
  const [revokedRequests, setRevokedRequests] = useState<ActiveEnrollment[]>(
    [],
  );

  // Stati di caricamento
  const [isLoadingPending, setIsLoadingPending] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [isLoadingRevoked, setIsLoadingRevoked] = useState(false);

  // Effetto di caricamento iniziale
  useEffect(() => {
    loadPendingRequests();
    loadActiveRequests();
    loadRevokedRequests();
  }, []);

  // --- FUNZIONI DI FETCH ---
  async function loadPendingRequests() {
    setIsLoadingPending(true);
    try {
      // Sostituisci con la tua action reale per i pendenti
      // const result = await getPendingEnrollmentsAction();
      // if (result.success) setPendingRequests(result.data);
    } catch (error) {
      console.error("Errore caricamento richieste pendenti", error);
    } finally {
      setIsLoadingPending(false);
    }
  }

  async function loadActiveRequests() {
    setIsLoadingActive(true);
    try {
      // Sostituisci con la tua action reale per gli attivi
      // const result = await getActiveEnrollmentsAction();
      // if (result.success) setActiveRequests(result.data);
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

  // --- GESTORI DELLE AZIONI (APPROVA, REVOCA, RIPRISTINA) ---
  const handleApproveEnrollment = (profileId: string, courseId: string) => {
    startApproveTransition(async () => {
      try {
        // Incolla qui la tua logica originale di approvazione
        // Dopo il successo, ricordati di aggiornare gli stati locali:
        // await loadPendingRequests();
        // await loadActiveRequests();
      } catch (err: any) {
        alert(`Errore: ${err.message}`);
      }
    });
  };

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
          setActiveRequests((prev) =>
            prev.filter(
              (req) =>
                !(req.profileId === profileId && req.courseId === courseId),
            ),
          );
          await loadRevokedRequests();
          router.refresh();
        } else {
          alert(`Errore durante la revoca: ${result.error}`);
        }
      } catch (err: any) {
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
        alert(`Errore imprevisto: ${err.message || err}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Intestazione del Tab */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Richieste Iscrizione Esterni
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestisci le licenze, approvazioni e revoche per studenti esterni.
          </p>
        </div>

        {/* Sotto-Toggle di Visualizzazione */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg self-start sm:self-center">
          <button
            onClick={() => setRequestView("pending")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              requestView === "pending"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ⏳ Pendenti ({pendingRequests.length})
          </button>
          <button
            onClick={() => setRequestView("active")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              requestView === "active"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ✅ Accessi Attivi ({activeRequests.length})
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

      {/* VISTA: PENDENTI */}
      {requestView === "pending" && (
        <>
          {/* Taglia e incolla qui il codice HTML/JSX della tabella PENDENTI dal vecchio file */}
          {/* Ricordati di usare handleApproveEnrollment al click */}
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
        </>
      )}

      {/* VISTA: ATTIVI */}
      {requestView === "active" && (
        <>
          {/* Taglia e incolla qui il codice HTML/JSX della tabella ATTIVI dal vecchio file */}
          {/* Ricordati di usare handleRevokeEnrollment al click */}

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
        </>
      )}

      {/* VISTA: REVOCATI */}
      {requestView === "revoked" && (
        <>
          {/* ... Qui c'è già il blocco tabella revocati che abbiamo configurato prima ... */}
          {/* Utilizza handleReactivateEnrollment al click */}

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
        </>
      )}
    </div>
  );
}
