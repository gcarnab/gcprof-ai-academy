"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminUsersToolbarProps {
  selectedStatus: string;
  selectedClass: string;
  searchTerm: string;

  availableClasses: string[];

  totalUsers: number;
  displayedUsers: number;

  isPending: boolean;

  onStatusChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onSearchChange: (value: string) => void;

  // NEW BULK
  selectedBulkClass: string;
  onBulkClassChange: (value: string) => void;
  onBulkActivate: () => void;
}

export default function AdminUsersToolbar({
  selectedStatus,
  selectedClass,
  searchTerm,
  availableClasses,
  totalUsers,
  displayedUsers,
  isPending,
  onStatusChange,
  onClassChange,
  onSearchChange,

  // NEW
  selectedBulkClass,
  onBulkClassChange,
  onBulkActivate,
}: AdminUsersToolbarProps) {
  return (
    <div className="border-b bg-gray-50 px-6 py-5 space-y-6">

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        {/* Stato */}
        <div className="space-y-2">
          <Label>Stato</Label>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tutti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              <SelectItem value="active">Attivi</SelectItem>
              <SelectItem value="pending">In attesa</SelectItem>
              <SelectItem value="blocked">Bloccati</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Classe */}
        <div className="space-y-2">
          <Label>Classe</Label>

          <Select value={selectedClass} onValueChange={onClassChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tutte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>

              {availableClasses.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ricerca */}
        <div className="space-y-2">
          <Label>Cerca Studente</Label>

          <Input
            value={searchTerm}
            placeholder="Nome, cognome..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="flex flex-col justify-end">
          <div className="rounded-lg border bg-white px-4 py-3">
            <div className="text-xs uppercase text-gray-500">
              Visualizzati
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {displayedUsers} / {totalUsers}
            </div>

            {isPending && (
              <div className="text-xs text-gray-500 animate-pulse mt-2">
                Aggiornamento in corso...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= BULK ACTIONS ================= */}
      <div className="border-t pt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-700">
            Azioni rapide
          </div>

          <div className="flex gap-3 items-center">
            <Select
              value={selectedBulkClass}
              onValueChange={onBulkClassChange}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Seleziona classe" />
              </SelectTrigger>

              <SelectContent>
                {availableClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={onBulkActivate}
              disabled={!selectedBulkClass || isPending}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Attiva utenti bloccati
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}