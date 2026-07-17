"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import type { AdminUserRow } from "../services/adminService";

// Server Actions
import { getAdminUsersPaginatedAction } from "../actions/adminUserActions";
import { seedBulkUsersAction } from "../actions/seedUsersAction";
import { bulkActivateUsersAction } from "../actions/bulkActivateUsersAction";
import { bulkUpdateUsersClassAction } from "../actions/bulkUpdateUsersClassAction"; // 🆕 NEW
import {
  updateUserClasses,
  updateUserStatus,
} from "../../dashboard/actions/adminActions";

// Componenti
import AdminUsersHeader from "./AdminUsersHeader";
import AdminUsersToolbar from "./AdminUsersToolbar";
import AdminUsersRow from "./AdminUsersRow";

interface AdminUsersTableProps {
  initialUsers: AdminUserRow[];
  availableClasses: string[];
}

export default function AdminUsersTable({
  initialUsers,
  availableClasses,
}: AdminUsersTableProps) {
  // State: Data & Pagination
  const [users, setUsers] = useState<AdminUserRow[]>(initialUsers);
  const [totalCount, setTotalCount] = useState(initialUsers.length);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State: Filters
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBulkClass, setSelectedBulkClass] = useState("");

  // 🆕 State: Checkbox & Bulk Update
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetBulkClass, setTargetBulkClass] = useState("");

  // UI Management State
  const [isPending, startTransition] = useTransition();
  const [isSeeding, startSeedTransition] = useTransition();
  const [editingClassesUserId, setEditingClassesUserId] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // Engine: Fetching
  const fetchPaginatedUsers = useCallback(() => {
    startTransition(async () => {
      try {
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

  useEffect(() => { fetchPaginatedUsers(); }, [fetchPaginatedUsers]);

  // Reset pagina e selezioni in caso di mutazioni ai filtri
  useEffect(() => {
    setPage(1);
    setSelectedIds([]); // 🛡️ Evita ghost-selections
  }, [searchTerm, selectedStatus, selectedClass, pageSize]);

  // Handlers
  const handleStatusChange = (userId: string, newStatus: "active" | "blocked" | "pending") => {
    startTransition(async () => {
      const result = await updateUserStatus(userId, newStatus);
      if (result.success) fetchPaginatedUsers();
      else alert("Errore: " + result.error);
    });
  };

  const handleClassesSave = (userId: string) => {
    startTransition(async () => {
      const result = await updateUserClasses(userId, selectedClasses);
      if (result.success) {
        fetchPaginatedUsers();
        setEditingClassesUserId(null);
      } else {
        alert("Errore: " + result.error);
      }
    });
  };

  const handleBulkActivate = () => {
    if (!selectedBulkClass) return;
    const usersToActivate = users.filter((u) => u.classes.includes(selectedBulkClass) && u.status !== "active");
    if (usersToActivate.length === 0) {
      alert("Nessun utente bloccato trovato in questa classe.");
      return;
    }
    if (!confirm(`Attivare ${usersToActivate.length} utenti in blocco?`)) return;

    startTransition(async () => {
      const result = await bulkActivateUsersAction(usersToActivate.map((u) => u.id));
      if (result.success) {
        alert("🎉 Attivati con successo.");
        fetchPaginatedUsers();
        setSelectedBulkClass("");
      } else alert("❌ Errore: " + result.error);
    });
  };

  // 🆕 HANDLER: Cambio Classe di Massa tramite Checkbox
  const handleBulkClassUpdate = () => {
    if (selectedIds.length === 0 || !targetBulkClass) return;
    if (!confirm(`Vuoi spostare ${selectedIds.length} utenti nella classe "${targetBulkClass}"?`)) return;

    startTransition(async () => {
      const result = await bulkUpdateUsersClassAction(selectedIds, targetBulkClass);
      if (result.success) {
        alert(`🎉 ${selectedIds.length} utenti spostati con successo.`);
        setSelectedIds([]);
        setTargetBulkClass("");
        fetchPaginatedUsers();
      } else {
        alert(`❌ Errore: ${result.error}`);
      }
    });
  };

  // 🧬 OTTIMIZZATO: Seed per TUTTE le classi
  const handleTriggerSeed = () => {
    if (availableClasses.length === 0) {
      alert("Crea almeno una classe prima di avviare il seeding.");
      return;
    }
    const qty = prompt(`Quanti utenti generare per CIASCUNA delle ${availableClasses.length} classi?`, "10");
    if (!qty) return;

    startSeedTransition(async () => {
      try {
        let count = 0;
        // Cicliamo e usiamo la tua funzione originale per ogni classe
        for (const cls of availableClasses) {
          const res = await seedBulkUsersAction(parseInt(qty, 10) || 10, cls);
          if (res.success) count += res.insertedCount;
        }
        alert(`🎉 Seeding completato: ${count} utenti generati totali.`);
        fetchPaginatedUsers();
      } catch (err: any) {
        alert("Errore seeding: " + err.message);
      }
    });
  };

  // 🆕 LOGICA CHECKBOX MASTER
  const currentPageIds = users.map(u => u.id);
  const isAllPageSelected = users.length > 0 && currentPageIds.every(id => selectedIds.includes(id));
  
  const handleMasterCheckboxToggle = () => {
    if (isAllPageSelected) {
      setSelectedIds(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...currentPageIds])));
    }
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
          {isSeeding ? "⏳ Generazione in corso..." : "⚡ Seed Utenti (Tutte le Classi)"}
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

      {/* 🆕 FLOATING BANNER AZIONI DI MASSA */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-blue-50 border border-blue-200 p-3 rounded-lg animate-in fade-in zoom-in-95 duration-200">
          <span className="text-sm font-medium text-blue-800">
            ✅ <strong>{selectedIds.length}</strong> utenti selezionati
          </span>
          <div className="flex items-center gap-2">
            <select
              value={targetBulkClass}
              onChange={(e) => setTargetBulkClass(e.target.value)}
              className="text-sm border rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sposta in classe...</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <button
              onClick={handleBulkClassUpdate}
              disabled={!targetBulkClass || isPending}
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Conferma Spostamento
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-sm text-gray-500 hover:text-gray-800 underline ml-2"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* TABLE DATA GRID */}
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm bg-background">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b bg-muted text-xs font-semibold uppercase text-muted-foreground">
            <tr>
              {/* 🆕 Intestazione Checkbox Master */}
              <th className="px-6 py-4 text-center w-[50px]">
                <input
                  type="checkbox"
                  checked={isAllPageSelected}
                  onChange={handleMasterCheckboxToggle}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4">Studente / Nome Completo</th>
              <th className="px-6 py-4">Ruolo</th>
              <th className="px-6 py-4">Stato</th>
              <th className="px-6 py-4">Classi Assegnate</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-background">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center italic text-muted-foreground">
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
                  onStartEditingClasses={(u) => { setEditingClassesUserId(u.id); setSelectedClasses(u.classes); }}
                  onToggleClass={(cls) => setSelectedClasses(p => p.includes(cls) ? p.filter(c => c !== cls) : [...p, cls])}
                  onCancelEditing={() => setEditingClassesUserId(null)}
                  onSaveClasses={handleClassesSave}
                  onStatusChange={handleStatusChange}
                  // 🆕 Props Passate al componente Riga
                  isChecked={selectedIds.includes(user.id)}
                  onToggleSelect={() => setSelectedIds(prev => prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id])}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DATA PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Mostra</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-lg border bg-background p-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>utenti su un totale di <strong>{totalCount}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isPending}
            className="px-3 py-1.5 rounded-lg border bg-background font-medium hover:bg-muted disabled:opacity-40 transition-colors shadow-sm"
          >
            Precedente
          </button>
          <span className="font-medium text-muted-foreground">Pagina {page} di {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isPending}
            className="px-3 py-1.5 rounded-lg border bg-background font-medium hover:bg-muted disabled:opacity-40 transition-colors shadow-sm"
          >
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}