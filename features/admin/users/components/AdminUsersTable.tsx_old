"use client";

import { useMemo, useState, useTransition } from "react";
import { AdminUserRow } from "../services/adminService";
import { updateUserClasses, updateUserStatus } from "../../dashboard/actions/adminActions";
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
  // ============================================================================
  // State
  // ============================================================================

  const [users, setUsers] = useState<AdminUserRow[]>(initialUsers);

  const [filterPending, setFilterPending] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [editingClassesUserId, setEditingClassesUserId] = useState<
    string | null
  >(null);

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBulkClass, setSelectedBulkClass] = useState("");

  // ============================================================================
  // Derived State
  // ============================================================================

  const displayedUsers = useMemo(() => {
    let filtered = [...users];

    // ==========================
    // Compatibilità con il vecchio filtro
    // ==========================

    if (filterPending) {
      filtered = filtered.filter((u) => u.status === "pending");
    }

    // ==========================
    // Stato
    // ==========================

    if (selectedStatus !== "all") {
      filtered = filtered.filter((u) => u.status === selectedStatus);
    }

    // ==========================
    // Classe
    // ==========================

    if (selectedClass !== "all") {
      filtered = filtered.filter((u) => u.classes.includes(selectedClass));
    }

    // ==========================
    // Ricerca
    // ==========================

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter((u) => {
        const display = u.display_name?.toLowerCase() ?? "";

        const first = u.first_name?.toLowerCase() ?? "";

        const last = u.last_name?.toLowerCase() ?? "";

        return (
          display.includes(search) ||
          first.includes(search) ||
          last.includes(search)
        );
      });
    }

    return filtered;
  }, [users, filterPending, selectedStatus, selectedClass, searchTerm]);

  const pendingUsersCount = users.filter((u) => u.status === "pending").length;

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
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  status: newStatus,
                }
              : u,
          ),
        );
      } else {
        alert("Errore durante l'aggiornamento dello stato: " + result.error);
      }
    });
  };

  const handleClassesSave = (userId: string) => {
    startTransition(async () => {
      const result = await updateUserClasses(userId, selectedClasses);

      if (result.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  classes: selectedClasses,
                }
              : u,
          ),
        );

        setEditingClassesUserId(null);
      } else {
        alert("Errore durante l'assegnazione delle classi: " + result.error);
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

  // Bulk Logic
  const handleBulkActivate = () => {
    if (!selectedBulkClass) return;

    startTransition(async () => {
      const targets = users.filter(
        (u) => u.classes.includes(selectedBulkClass) && u.status !== "active",
      );

      await Promise.all(targets.map((u) => updateUserStatus(u.id, "active")));

      setUsers((prev) =>
        prev.map((u) =>
          u.classes.includes(selectedBulkClass)
            ? { ...u, status: "active" }
            : u,
        ),
      );
    });
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="w-full">
      <AdminUsersHeader totalUsers={users.length} />

      <AdminUsersToolbar
        selectedStatus={selectedStatus}
        selectedClass={selectedClass}
        searchTerm={searchTerm}
        availableClasses={availableClasses}
        totalUsers={users.length}
        displayedUsers={displayedUsers.length}
        isPending={isPending}
        onStatusChange={setSelectedStatus}
        onClassChange={setSelectedClass}
        onSearchChange={setSearchTerm}
        
        // NEW BULK
        selectedBulkClass={selectedBulkClass}
        onBulkClassChange={setSelectedBulkClass}
        onBulkActivate={handleBulkActivate}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-100 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">Studente / Nome Completo</th>
              <th className="px-6 py-4">Ruolo</th>
              <th className="px-6 py-4">Stato</th>
              <th className="px-6 py-4">Classi Assegnate</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {displayedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center italic text-gray-400"
                >
                  Nessun utente trovato corrispondente ai criteri di ricerca.
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
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
    </div>
  );
}
