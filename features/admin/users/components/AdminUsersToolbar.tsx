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

  selectedUserType?: string;
  selectedSchoolTrack?: string;
  selectedSchoolSection?: string;
  onUserTypeChange?: (value: string) => void;
  onSchoolTrackChange?: (value: string) => void;
  onSchoolSectionChange?: (value: string) => void;
}

const SCHOOL_TRACKS = process.env.NEXT_PUBLIC_SCHOOL_TRACKS
  ? process.env.NEXT_PUBLIC_SCHOOL_TRACKS.split(",")
  : ["INF", "RIM", "AFM", "LSA", "MMC", "CHI"];

const SCHOOL_SECTIONS = process.env.NEXT_PUBLIC_SCHOOL_SECTIONS
  ? process.env.NEXT_PUBLIC_SCHOOL_SECTIONS.split(",")
  : ["A", "B", "C", "D", "E"];

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

  selectedBulkClass,
  onBulkClassChange,
  onBulkActivate,

  selectedUserType = "all",
  selectedSchoolTrack = "all",
  selectedSchoolSection = "all",
  onUserTypeChange,
  onSchoolTrackChange,
  onSchoolSectionChange,
}: AdminUsersToolbarProps) {
  return (
    <div className="border-b bg-muted px-6 py-5 space-y-6">
      {/* ================= FILTERS ================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Tipologia Utente */}
        <div className="space-y-2">
          <Label>Tipologia Utente</Label>
          <Select
            value={selectedUserType}
            onValueChange={(val) => onUserTypeChange?.(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              <SelectItem value="SCHOOL_STUDENT">Studente Scuola</SelectItem>
              <SelectItem value="EXTERNAL_STUDENT">
                Esterno / Commerciale
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Indirizzo di Studi */}
        <div className="space-y-2">
          <Label>Indirizzo</Label>
          <Select
            value={selectedSchoolTrack}
            onValueChange={(val) => onSchoolTrackChange?.(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              {SCHOOL_TRACKS.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sezione */}
        <div className="space-y-2">
          <Label>Sezione</Label>
          <Select
            value={selectedSchoolSection}
            onValueChange={(val) => onSchoolSectionChange?.(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              {SCHOOL_SECTIONS.map((section) => (
                <SelectItem key={section} value={section}>
                  Sezione {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          <div className="rounded-lg border bg-background px-4 py-3">
            <div className="text-xs uppercase text-muted-foreground">
              Visualizzati
            </div>
            <div className="text-lg font-semibold text-foreground">
              {displayedUsers} / {totalUsers}
            </div>

            {isPending && (
              <div className="text-xs text-muted-foreground animate-pulse mt-2">
                Aggiornamento in corso...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= BULK ACTIONS ================= */}
      <div className="border-t pt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">
            Azioni rapide
          </div>

          <div className="flex gap-3 items-center">
            <Select value={selectedBulkClass} onValueChange={onBulkClassChange}>
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
