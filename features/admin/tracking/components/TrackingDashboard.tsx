"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteSessionsAction } from "@/features/admin/tracking/actions/trackingActions";

interface Props {
  stats: any;
}

function formatDuration(seconds: number | null) {
  if (seconds === null || seconds === undefined) return "—";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
}

function parseUserAgent(ua: string) {
  if (!ua) return "Unknown";
  if (ua.includes("Firefox")) return "🦊 Firefox";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "🌐 Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "🧭 Safari";
  if (ua.includes("Edg")) return "🌐 Edge";
  return "📱 Dispositivo";
}

export default function TrackingDashboard({ stats }: Props) {
  const router = useRouter();
  const [isPendingDelete, startDeleteTransition] = useTransition();

  // Stati per Filtri, Paginazione e Selezione
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const itemsPerPage = 10;

  const sessions = stats?.sessions || [];

  // 1. Gestione del cambio testo (senza useEffect distruttivi)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Torna istantaneamente alla pagina 1
    setSelectedIds([]); // Svuota le selezioni precedenti per sicurezza UX
  };

  // 2. Logica di Filtraggio Multi-campo ad alte prestazioni
  const filteredSessions = sessions.filter((session: any) => {
    const searchLower = searchTerm.trim().toLowerCase();
    if (!searchLower) return true; // Se vuoto, mostra tutto

    const name = session.profiles?.display_name?.toLowerCase() || "";
    const email = session.profiles?.email?.toLowerCase() || "";
    const ip = session.ip_address?.toLowerCase() || "";

    // Cerca sia nell'User Agent grezzo del DB sia nell'emoji formattata
    const uaRaw = session.user_agent?.toLowerCase() || "";
    const uaParsed = parseUserAgent(session.user_agent).toLowerCase();

    return (
      name.includes(searchLower) ||
      email.includes(searchLower) ||
      ip.includes(searchLower) ||
      uaRaw.includes(searchLower) ||
      uaParsed.includes(searchLower)
    );
  });

  // 3. Logica di Paginazione
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSessions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 4. Gestione Selezione Checkbox
  const currentItemsIds = currentItems.map((s: any) => s.id);
  const isAllPageSelected =
    currentItemsIds.length > 0 &&
    currentItemsIds.every((id: string) => selectedIds.includes(id));
  const handleSelectPageToggle = () => {
    if (isAllPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentItemsIds.includes(id)),
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...currentItemsIds])),
      );
    }
  };

  const handleSelectRowToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleSelectAllFiltered = () => {
    const allFilteredIds = filteredSessions.map((s: any) => s.id);
    setSelectedIds(allFilteredIds);
  };

  // 5. Azione di Eliminazione Massiva
  const handleBulkDelete = () => {
    const count = selectedIds.length;
    if (count === 0) return;

    const confirmMessage = `⚠️ ATTENZIONE ELIMINAZIONE PERMANENTE ⚠️\nStai per cancellare DEFINITIVAMENTE ${count} sessioni selezionate dal database.\nL'azione è irreversibile. Continuare?`;
    if (!confirm(confirmMessage)) return;

    startDeleteTransition(async () => {
      try {
        const result = await deleteSessionsAction(selectedIds);

        if (result.success) {
          alert(`🔥 Successo: ${count} record rimossi dal database.`);
          setSelectedIds([]);
          setSearchTerm("");
          router.refresh();
        } else {
          alert(`🔴 Errore del database: ${result.error}`);
        }
      } catch (error: any) {
        alert(`Errore imprevisto: ${error.message || error}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* 📊 KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Sessioni totali (Log)
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.totalSessions}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Login oggi
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.todayLogins}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Utenti attivi oggi
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {stats.activeUsers}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Permanenza media
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatDuration(stats.averageDuration)}
          </p>
        </div>
      </div>

      {/* 🗂 REGISTRO ACCESSI */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              Registro Accessi Piattaforma
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Seleziona manualmente o filtra i record per la manutenzione del
              database.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Cerca per nome, email, IP o browser..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-1.5 text-xs rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* 🚨 BANNER DI SELEZIONE ATTIVA */}
        {selectedIds.length > 0 && (
          <div className="bg-red-500/10 dark:bg-red-950/20 px-6 py-3 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all">
            <div className="text-xs font-medium text-red-600 dark:text-red-400">
              Hai selezionato{" "}
              <span className="font-bold">{selectedIds.length}</span> record.
              {searchTerm && selectedIds.length < filteredSessions.length && (
                <button
                  type="button"
                  onClick={handleSelectAllFiltered}
                  className="ml-2 underline hover:text-red-700 dark:hover:text-red-300 font-bold"
                >
                  Seleziona tutti i {filteredSessions.length} risultati della
                  ricerca
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedIds([])}
                className="text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                Annulla
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={isPendingDelete}
                onClick={handleBulkDelete}
                className="text-xs font-semibold h-8 shadow-sm"
              >
                {isPendingDelete
                  ? "Eliminazione..."
                  : `🗑️ Elimina selezionati (${selectedIds.length})`}
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[50px] p-4 text-center">
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={handleSelectPageToggle}
                    className="h-4 w-4 rounded border-muted-foreground/30 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer"
                  />
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Utente
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Data Login
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Stato / Durata
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Indirizzo IP
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Browser
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-muted-foreground text-sm"
                  >
                    Nessun dato di tracciamento trovato.
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((session: any) => {
                  const isOnline = !session.logout_at;
                  const isChecked = selectedIds.includes(session.id);
                  return (
                    <TableRow
                      key={session.id}
                      className={`transition-colors duration-150 ${
                        isChecked
                          ? "bg-red-500/5 dark:bg-red-500/10 hover:bg-red-500/10"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRowToggle(session.id)}
                          className="h-4 w-4 rounded border-muted-foreground/30 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer"
                        />
                      </TableCell>

                      <TableCell className="font-medium text-foreground">
                        {session.profiles?.display_name ?? "—"}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {session.profiles?.email ?? "—"}
                      </TableCell>

                      <TableCell className="text-foreground whitespace-nowrap">
                        {new Date(session.login_at).toLocaleString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {isOnline ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Attiva
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {formatDuration(session.session_duration_seconds)}
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {session.ip_address}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {parseUserAgent(session.user_agent)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* 🔘 PAGINAZIONE */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 bg-muted/10 border-t">
            <p className="text-xs text-muted-foreground">
              Mostrati da{" "}
              <span className="font-semibold">{indexOfFirstItem + 1}</span> a{" "}
              <span className="font-semibold">
                {Math.min(indexOfLastItem, filteredSessions.length)}
              </span>{" "}
              di{" "}
              <span className="font-semibold">{filteredSessions.length}</span>{" "}
              record
            </p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="text-xs"
              >
                ⬅️ Precedente
              </Button>
              <span className="text-xs font-medium px-2">
                Pagina {currentPage} di {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="text-xs"
              >
                Successivo ➡️
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
