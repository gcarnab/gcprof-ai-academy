"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
// 🛡️ Importiamo SOLO il tipo dal servizio di backend (evita l'inizializzazione del modulo sul client)
import type { AdminUserRow } from "../services/adminService";
// 🔌 Importiamo le Server Action sicure ("use server") per aggirare il blocco d'ambiente
import { getAdminUsersPaginatedAction } from "../actions/adminUserActions";
import { seedBulkUsersAction } from "../actions/seedUsersAction";
import {
  updateUserClasses,
  updateUserStatus,
} from "../../dashboard/actions/adminActions";
import AdminUsersHeader from "./AdminUsersHeader";
import AdminUsersToolbar from "./AdminUsersToolbar";
import AdminUsersRow from "./AdminUsersRow";
import { bulkActivateUsersAction } from "../actions/bulkActivateUsersAction";

interface AdminUsersTableProps {
  initialUsers: AdminUserRow[];
  availableClasses: string[];
}

export default function AdminUsersTable({
  initialUsers,
  availableClasses,
}: AdminUsersTableProps) {
  // ============================================================================
  // State: Data & Pagination
  // ============================================================================
  const [users, setUsers] = useState<AdminUserRow[]>(initialUsers);
  const [totalCount, setTotalCount] = useState(initialUsers.length);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State: Filters
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBulkClass, setSelectedBulkClass] = useState("");

  // UI Management State
  const [isPending, startTransition] = useTransition();
  const [isSeeding, startSeedTransition] = useTransition();
  const [editingClassesUserId, setEditingClassesUserId] = useState<
    string | null
  >(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // ============================================================================
  // Engine: Server-Side Fetching via Server Action
  // ============================================================================
  const fetchPaginatedUsers = useCallback(() => {
    startTransition(async () => {
      try {
        // Appoggiandosi alla Server Action l'esecuzione si sposta al riparo sul server Node.js
        const response = await getAdminUsersPaginatedAction({
          page,
          pageSize,
          searchTerm: searchTerm.trim() || undefined,
          statusFilter: selectedStatus,
          classFilter: selectedClass,
        });
        setUsers(response.users);
        setTotalCount(response.totalCount);
      } catch (error: any) {
        alert("Errore nel caricamento degli utenti: " + error.message);
      }
    });
  }, [page, pageSize, searchTerm, selectedStatus, selectedClass]);

  // Sincronizzazione automatica ad ogni mutazione di filtri o paginazione
  useEffect(() => {
    fetchPaginatedUsers();
  }, [fetchPaginatedUsers]);

  // Ritorna alla pagina 1 se i filtri vengono alterati per evitare disallineamenti di range
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedStatus, selectedClass, pageSize]);

  // ============================================================================
  // Handlers
  // ============================================================================
  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "blocked" | "pending",
  ) => {
    startTransition(async () => {
      const result = await updateUserStatus(userId, newStatus);
      if (result.success) {
        fetchPaginatedUsers();
      } else {
        alert("Errore durante l'aggiornamento dello stato: " + result.error);
      }
    });
  };

  const handleClassesSave = (userId: string) => {
    startTransition(async () => {
      const result = await updateUserClasses(userId, selectedClasses);
      if (result.success) {
        fetchPaginatedUsers();
        setEditingClassesUserId(null);
      } else {
        alert("Errore durante l'assegnazione delle classi: " + result.error);
      }
    });
  };

  const handleBulkActivate = () => {
    if (!selectedBulkClass) return;

    // 1. Troviamo nel client gli utenti attualmente caricati (o visibili)
    // che appartengono a quella classe e NON sono attivi
    const usersToActivate = users.filter(
      (user) =>
        user.classes.includes(selectedBulkClass) && user.status !== "active",
    );

    if (usersToActivate.length === 0) {
      alert(
        `Non ci sono utenti da attivare (in attesa o bloccati) nella classe "${selectedBulkClass}" tra quelli visualizzati.`,
      );
      return;
    }

    const confirmAction = confirm(
      `Trovati ${usersToActivate.length} utenti non attivi nella classe "${selectedBulkClass}". Vuoi attivarli tutti in blocco?`,
    );
    if (!confirmAction) return;

    startTransition(async () => {
      // 2. Estraiamo solo gli ID come richiesto dalla tua funzione
      const userIds = usersToActivate.map((user) => user.id);

      // 3. Invocazione della tua Server Action originale
      const result = await bulkActivateUsersAction(userIds);

      if (result.success) {
        alert(`🎉 Successo! Attivati ${userIds.length} utenti.`);
        fetchPaginatedUsers(); // Ricarica la griglia aggiornata
        setSelectedBulkClass(""); // Resetta il selettore delle azioni rapide
      } else {
        alert(`❌ Errore: ${result.error}`);
      }
    });
  };

  const handleTriggerSeed = () => {
    if (availableClasses.length === 0) {
      alert("Crea almeno una classe prima di avviare il seeding.");
      return;
    }
    const targetClass = availableClasses[0];
    const qty = prompt(
      `Quanti utenti di test vuoi generare per la classe '${targetClass}'?`,
      "50",
    );
    if (!qty) return;

    startSeedTransition(async () => {
      const res = await seedBulkUsersAction(
        parseInt(qty, 10) || 50,
        targetClass,
      );
      if (res.success) {
        alert(
          `Seeding completato con successo! Inseriti ${res.insertedCount} utenti.`,
        );
        fetchPaginatedUsers();
      } else {
        alert("Errore seeding: " + res.error);
      }
    });
  };

  const startEditingClasses = (user: AdminUserRow) => {
    setEditingClassesUserId(user.id);
    setSelectedClasses(user.classes);
  };

  const toggleClassSelection = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className],
    );
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="w-full space-y-4">
      {/* HEADER & SEED BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminUsersHeader totalUsers={totalCount} />
        <button
          onClick={handleTriggerSeed}
          disabled={isSeeding}
          className="px-4 py-2 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {isSeeding
            ? "⏳ Generazione in corso..."
            : "⚡ Seed Utenti (Test Carico)"}
        </button>
      </div>

      {/* TOOLBAR CONTROLS */}
      <AdminUsersToolbar
        selectedStatus={selectedStatus}
        selectedClass={selectedClass}
        searchTerm={searchTerm}
        availableClasses={availableClasses}
        totalUsers={totalCount}
        displayedUsers={users.length}
        isPending={isPending}
        onStatusChange={setSelectedStatus}
        onClassChange={setSelectedClass}
        onSearchChange={setSearchTerm}
        selectedBulkClass={selectedBulkClass}
        onBulkClassChange={setSelectedBulkClass}
        onBulkActivate={handleBulkActivate}
      />

      {/* TABLE DATA GRID */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">Studente / Nome Completo</th>
              <th className="px-6 py-4">Ruolo</th>
              <th className="px-6 py-4">Stato</th>
              <th className="px-6 py-4">Classi Assegnate</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center italic text-gray-400"
                >
                  Nessun utente trovato corrispondente ai criteri di ricerca.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <AdminUsersRow
                  key={user.id}
                  user={user}
                  availableClasses={availableClasses}
                  editingClassesUserId={editingClassesUserId}
                  selectedClasses={selectedClasses}
                  isPending={isPending}
                  onStartEditingClasses={startEditingClasses}
                  onToggleClass={toggleClassSelection}
                  onCancelEditing={() => setEditingClassesUserId(null)}
                  onSaveClasses={handleClassesSave}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DATA PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>Mostra</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-lg border bg-white p-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>
            utenti su un totale di <strong>{totalCount}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isPending}
            className="px-3 py-1.5 rounded-lg border bg-white font-medium hover:bg-gray-50 disabled:opacity-40 transition-colors shadow-sm"
          >
            Precedente
          </button>
          <span className="font-medium text-gray-700">
            Pagina {page} di {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isPending}
            className="px-3 py-1.5 rounded-lg border bg-white font-medium hover:bg-gray-50 disabled:opacity-40 transition-colors shadow-sm"
          >
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}
