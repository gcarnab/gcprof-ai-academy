"use client";

import { useState, useTransition } from "react";
import { AdminUserRow } from "../services/adminService";
import { updateUserStatus, updateUserClasses } from "../core/actions/adminActions";
import { Button } from "@/components/ui/button";

interface AdminUsersTableProps {
  initialUsers: AdminUserRow[];
  availableClasses: string[];
}

export default function AdminUsersTable({ initialUsers, availableClasses }: AdminUsersTableProps) {
  const [users, setUsers] = useState<AdminUserRow[]>(initialUsers);
  const [filterPending, setFilterPending] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingClassesUserId, setEditingClassesUserId] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // Filtra gli utenti in base allo switch "In attesa"
  const displayedUsers = filterPending 
    ? users.filter(u => u.status === "pending") 
    : users;

  // Gestione del cambio stato (Approvazione / Blocco)
  const handleStatusChange = (userId: string, newStatus: "active" | "blocked" | "pending") => {
    startTransition(async () => {
      const result = await updateUserStatus(userId, newStatus);
      if (result.success) {
        setUsers(prev => 
          prev.map(u => u.id === userId ? { ...u, status: newStatus } : u)
        );
      } else {
        alert("Errore durante l'aggiornamento dello stato: " + result.error);
      }
    });
  };

  // Gestione dell'assegnazione classi
  const handleClassesSave = (userId: string) => {
    startTransition(async () => {
      const result = await updateUserClasses(userId, selectedClasses);
      if (result.success) {
        setUsers(prev => 
          prev.map(u => u.id === userId ? { ...u, classes: selectedClasses } : u)
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
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className) 
        : [...prev, className]
    );
  };

  return (
    <div className="w-full">
      {/* BARRA DEI FILTRI */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="filterPending"
            checked={filterPending}
            onChange={(e) => setFilterPending(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="filterPending" className="text-sm font-medium text-gray-700 select-none">
            Mostra solo account in attesa di attivazione ({users.filter(u => u.status === "pending").length})
          </label>
        </div>
        {isPending && <span className="text-xs text-gray-500 animate-pulse">Aggiornamento in corso...</span>}
      </div>

      {/* TABELLA UTENTI */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 font-semibold border-b">
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
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">
                  Nessun utente trovato corrispondente ai criteri di ricerca.
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* Nome Completo */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="font-semibold">{user.display_name || "Utente Senza Nome"}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{user.id}</div>
                  </td>

                  {/* Ruolo */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === "admin" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.role === "admin" ? "👨‍🏫 Admin" : "🎓 Studente"}
                    </span>
                  </td>

                  {/* Stato Account */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${
                      user.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                      user.status === "blocked" ? "bg-red-50 text-red-700 border-red-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {user.status === "active" && "● Attivo"}
                      {user.status === "blocked" && "● Bloccato"}
                      {user.status === "pending" && "⏳ In Attesa"}
                    </span>
                  </td>

                  {/* Classi Relazionali */}
                  <td className="px-6 py-4">
                    {editingClassesUserId === user.id ? (
                      <div className="p-2 border rounded-lg bg-gray-50 space-y-2 max-w-xs">
                        <div className="text-xs font-bold text-gray-700">Seleziona Classi:</div>
                        <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                          {availableClasses.map((cls) => (
                            <label key={cls} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer p-1 hover:bg-gray-200 rounded">
                              <input
                                type="checkbox"
                                checked={selectedClasses.includes(cls)}
                                onChange={() => toggleClassSelection(cls)}
                                className="rounded text-blue-600"
                              />
                              {cls}
                            </label>
                          ))}
                        </div>
                        <div className="flex gap-2 justify-end pt-1">
                          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingClassesUserId(null)}>Annulla</Button>
                          <Button size="sm" className="h-7 text-xs bg-blue-600 text-white" onClick={() => handleClassesSave(user.id)}>Salva</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 items-center max-w-xs">
                        {user.classes.length > 0 ? (
                          user.classes.map((cls) => (
                            <span key={cls} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded border border-blue-100 font-medium">
                              {cls}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">Nessuna classe</span>
                        )}
                        <button 
                          onClick={() => startEditingClasses(user)}
                          className="text-blue-500 hover:text-blue-700 text-xs ml-1 font-medium underline"
                        >
                          Modifica
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Azioni Rapide */}
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    {user.status !== "active" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                        disabled={isPending}
                        onClick={() => handleStatusChange(user.id, "active")}
                      >
                        Abilita
                      </Button>
                    )}
                    {user.status !== "blocked" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 border-red-200 text-xs h-8"
                        disabled={isPending}
                        onClick={() => handleStatusChange(user.id, "blocked")}
                      >
                        Blocca
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}