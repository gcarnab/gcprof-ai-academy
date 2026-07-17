"use client";

import { Button } from "@/components/ui/button";
import { AdminUserRow } from "../services/adminService";
import AdminUsersClassesEditor from "./AdminUsersClassesEditor";

interface AdminUsersRowProps {
  user: AdminUserRow;
  availableClasses: string[];
  editingClassesUserId: string | null;
  selectedClasses: string[];
  isPending: boolean;
  onStartEditingClasses: (user: AdminUserRow) => void;
  onToggleClass: (className: string) => void;
  onCancelEditing: () => void;
  onSaveClasses: (userId: string) => void;
  onStatusChange: (
    userId: string,
    newStatus: "active" | "blocked" | "pending",
  ) => void;
  
  // 🆕 PROPS AGGIUNTE PER LA SELEZIONE MASSIVA
  isChecked: boolean;
  onToggleSelect: () => void;
}

export default function AdminUsersRow({
  user,
  availableClasses,
  editingClassesUserId,
  selectedClasses,
  isPending,
  onStartEditingClasses,
  onToggleClass,
  onCancelEditing,
  onSaveClasses,
  onStatusChange,
  // 🆕 NEW
  isChecked,
  onToggleSelect,
}: AdminUsersRowProps) {
  const isExternalStudent = (user as any).user_type === "EXTERNAL_STUDENT";

  return (
    <tr className={`transition-colors hover:bg-muted ${isChecked ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
      
      {/* 🆕 Cella Checkbox */}
      <td className="px-6 py-4 text-center w-[50px]">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggleSelect}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>

      {/* Nome */}
      <td className="px-6 py-4 font-medium text-foreground">
        <div className="font-semibold">
          {user.display_name || "Utente Senza Nome"}
        </div>
        <div className="mt-0.5 font-mono text-xs text-muted-foreground">{user.id}</div>
      </td>

      {/* Ruolo */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            user.role === "admin"
              ? "border border-purple-200 bg-purple-50 text-purple-700"
              : isExternalStudent
                ? "border border-cyan-200 bg-cyan-50 text-cyan-700"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {user.role === "admin" 
            ? "👨‍🏫 Admin" 
            : isExternalStudent 
              ? "🌍 Esterno" 
              : "🎓 Studente"}
        </span>
      </td>

      {/* Stato */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${
            user.status === "active"
              ? "border-green-200 bg-green-50 text-green-700"
              : user.status === "blocked"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {user.status === "active" && "● Attivo"}
          {user.status === "blocked" && "● Bloccato"}
          {user.status === "pending" && "⏳ In Attesa"}
        </span>
      </td>

      {/* Classi */}
      <td className="px-6 py-4">
        {isExternalStudent ? (
          <span className="text-xs italic text-muted-foreground font-medium">
            Non applicabile (Studente Esterno)
          </span>
        ) : editingClassesUserId === user.id ? (
          <AdminUsersClassesEditor
            availableClasses={availableClasses}
            selectedClasses={selectedClasses}
            onToggleClass={onToggleClass}
            onCancel={onCancelEditing}
            onSave={() => onSaveClasses(user.id)}
          />
        ) : (
          <div className="flex max-w-xs flex-wrap items-center gap-1">
            {user.classes.length > 0 ? (
              user.classes.map((cls) => (
                <span
                  key={cls}
                  className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                >
                  {cls}
                </span>
              ))
            ) : (
              <span className="text-xs italic text-muted-foreground">
                Nessuna classe
              </span>
            )}
            <button
              onClick={() => onStartEditingClasses(user)}
              className="ml-1 text-xs font-medium text-blue-500 underline hover:text-blue-700"
            >
              Modifica
            </button>
          </div>
        )}
      </td>

      {/* Azioni */}
      <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right">
        {user.status !== "active" && (
          <Button
            size="sm"
            disabled={isPending}
            className="h-8 bg-green-600 text-xs text-white hover:bg-green-700"
            onClick={() => onStatusChange(user.id, "active")}
          >
            Abilita
          </Button>
        )}
        {user.status !== "blocked" && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            className="h-8 border-red-200 text-xs text-red-600 hover:bg-red-50"
            onClick={() => onStatusChange(user.id, "blocked")}
          >
            Blocca
          </Button>
        )}
      </td>
    </tr>
  );
}