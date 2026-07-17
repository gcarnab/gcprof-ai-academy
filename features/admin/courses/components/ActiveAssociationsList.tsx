"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { dissociateCourseFromClass } from "@/features/courses/services/courseActions";
import { bulkDissociateAction } from "../actions/bulkDissociateAction";

interface Association {
  course_id: string;
  course_title: string;
  class_id: string;
  class_name: string;
}

interface ActiveAssociationsListProps {
  associations: Association[];
  onRefresh: () => void;
  allClasses?: string[]; // 🆕 Lista completa anagrafica classi (opzionale per retrocompatibilità)
  allCourses?: string[]; // 🆕 Lista completa anagrafica corsi (opzionale per retrocompatibilità)
}

export function ActiveAssociationsList({ 
  associations, 
  onRefresh,
  allClasses, // 🆕 NEW
  allCourses, // 🆕 NEW
}: ActiveAssociationsListProps) {
  const [isPending, startTransition] = useTransition();
  const [isRemovingSingle, setIsRemovingSingle] = useState<string | null>(null);

  // 🎛️ State: Filtri e Ricerca
  const [filterClass, setFilterClass] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 State: Paginazione
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // 🟦 State: Checkbox
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 🧬 MODIFICATO: Popola il dropdown usando l'anagrafica reale globale se disponibile
  const uniqueClasses = useMemo(() => {
    if (allClasses && allClasses.length > 0) {
      return Array.from(new Set(allClasses)).sort();
    }
    return Array.from(new Set(associations.map((a) => a.class_name))).sort();
  }, [associations, allClasses]);

  // 🧬 MODIFICATO: Popola il dropdown usando l'anagrafica reale globale se disponibile
  const uniqueCourses = useMemo(() => {
    if (allCourses && allCourses.length > 0) {
      return Array.from(new Set(allCourses)).sort();
    }
    return Array.from(new Set(associations.map((a) => a.course_title))).sort();
  }, [associations, allCourses]);

  // 🛡️ Reset di sicurezza pagina e selezioni al variare dei parametri di ricerca
  useEffect(() => {
    setPage(1);
    setSelectedKeys([]);
  }, [filterClass, filterCourse, searchTerm, pageSize]);

  // 🔍 Logica di Filtraggio Combinata
  const filteredAssociations = useMemo(() => {
    return associations.filter((assoc) => {
      const matchesClass = filterClass === "all" || assoc.class_name === filterClass;
      const matchesCourse = filterCourse === "all" || assoc.course_title === filterCourse;
      
      const cleanSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        cleanSearch === "" ||
        assoc.class_name.toLowerCase().includes(cleanSearch) ||
        assoc.course_title.toLowerCase().includes(cleanSearch);

      return matchesClass && matchesCourse && matchesSearch;
    });
  }, [associations, filterClass, filterCourse, searchTerm]);

  // 🔢 Calcolo Paginazione
  const totalItems = filteredAssociations.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedAssociations = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAssociations.slice(start, start + pageSize);
  }, [filteredAssociations, page, pageSize]);

  // 🗳️ Logica Checkbox Master (Pagina corrente)
  const currentPageKeys = paginatedAssociations.map((a) => `${a.course_id}-${a.class_id}`);
  const isAllPageSelected = currentPageKeys.length > 0 && currentPageKeys.every((k) => selectedKeys.includes(k));

  const handleMasterCheckboxToggle = () => {
    if (isAllPageSelected) {
      setSelectedKeys((prev) => prev.filter((k) => !currentPageKeys.includes(k)));
    } else {
      setSelectedKeys((prev) => Array.from(new Set([...prev, ...currentPageKeys])));
    }
  };

  const handleRowCheckboxToggle = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // 🗑️ Handler Azione Singola
  const handleDissociate = async (courseId: string, classId: string) => {
    const currentKey = `${courseId}-${classId}`;
    if (!confirm("Sei sicuro di voler dissociare questo corso da questa classe? Gli studenti perderanno l'accesso.")) return;

    setIsRemovingSingle(currentKey);
    const result = await dissociateCourseFromClass(courseId, classId);
    if (result.success) {
      onRefresh();
    } else {
      alert(result.error);
    }
    setIsRemovingSingle(null);
  };

  // 🗑️⚡ Handler Azione Massiva (Bulk)
  const handleBulkDissociate = () => {
    if (selectedKeys.length === 0) return;
    if (!confirm(`ATTENZIONE! Stai per dissociare ${selectedKeys.length} corsi dalle rispettive classi in blocco.\nGli studenti coinvolti perderanno immediatamente l'accesso ai contenuti.\nVuoi procedere?`)) return;

    startTransition(async () => {
      const pairsToDissociate = selectedKeys.map((key) => {
        const [courseId, classId] = key.split("-");
        return { courseId, classId };
      });

      const result = await bulkDissociateAction(pairsToDissociate);
      if (result.success) {
        alert("🎉 Associazioni rimosse con successo.");
        setSelectedKeys([]);
        onRefresh();
      } else {
        alert(`❌ Errore durante la rimozione massiva: ${result.error}`);
      }
    });
  };

  if (associations.length === 0) {
    return <p className="text-sm text-muted-foreground italic mt-2">Nessun corso attualmente associato alle classi.</p>;
  }

  return (
    <div className="space-y-4 mt-2">
      
      {/* ================= BARRA FILTRI & STRUMENTI ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 bg-muted/60 p-4 rounded-xl border border-border">
        {/* Filtro Classe */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase">Filtra per Classe</label>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="w-full text-sm border rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">Tutte le classi ({uniqueClasses.length})</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Filtro Corso */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase">Filtra per Corso</label>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full text-sm border rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">Tutti i corsi ({uniqueCourses.length})</option>
            {uniqueCourses.map((crs) => (
              <option key={crs} value={crs}>{crs}</option>
            ))}
          </select>
        </div>

        {/* Ricerca Testuale Libera */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase">Cerca Testo</label>
          <input
            type="text"
            value={searchTerm}
            placeholder="Nome classe o titolo corso..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm border rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* ================= BANNER FLOATING AZIONE MASSIVA ================= */}
      {selectedKeys.length > 0 && (
        <div className="flex items-center justify-between bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-3 rounded-lg animate-in fade-in zoom-in-95 duration-150">
          <span className="text-sm font-medium text-red-800 dark:text-red-400">
            ⚠️ <strong>{selectedKeys.length}</strong> associazioni selezionate
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBulkDissociate}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Rimozione in corso..." : "Dissocia in Massa"}
            </button>
            <button
              onClick={() => setSelectedKeys([])}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* ================= GRID TABELLARE DATA GRID ================= */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <table className="min-w-full divide-y divide-border text-sm text-left">
          <thead className="bg-muted text-xs uppercase font-semibold text-muted-foreground">
            <tr>
              <th className="px-6 py-3.5 text-center w-[50px]">
                <input
                  type="checkbox"
                  checked={isAllPageSelected}
                  onChange={handleMasterCheckboxToggle}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3.5">Classe</th>
              <th className="px-6 py-3.5">Corso Assegnato</th>
              <th className="px-6 py-3.5 text-right">Azione</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            {paginatedAssociations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center italic text-muted-foreground bg-background">
                  Nessuna associazione corrisponde ai filtri impostati.
                </td>
              </tr>
            ) : (
              paginatedAssociations.map((assoc) => {
                const currentKey = `${assoc.course_id}-${assoc.class_id}`;
                const isRowChecked = selectedKeys.includes(currentKey);

                return (
                  <tr
                    key={currentKey}
                    className={`hover:bg-muted/50 transition-colors ${
                      isRowChecked ? "bg-red-50/30 dark:bg-red-950/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isRowChecked}
                        onChange={() => handleRowCheckboxToggle(currentKey)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{assoc.class_name}</td>
                    <td className="px-6 py-4 text-foreground/80">{assoc.course_title}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDissociate(assoc.course_id, assoc.class_id)}
                        disabled={isRemovingSingle === currentKey || isPending}
                        className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-950/50 px-2.5 py-1.5 text-xs font-semibold text-red-700 dark:text-red-400 shadow-sm ring-1 ring-inset ring-red-600/10 hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 transition-all cursor-pointer"
                      >
                        {isRemovingSingle === currentKey ? "Rimozione..." : "Dissocia"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CONTROLLI DI PAGINAZIONE (FOOTER) ================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Mostra</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-lg border bg-background p-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>associazioni su un totale filtrato di <strong>{totalItems}</strong> (totali attive: {associations.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isPending}
            className="px-3 py-1.5 rounded-lg border bg-background font-medium hover:bg-muted disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
          >
            Precedente
          </button>
          <span className="font-medium">Pagina {page} di {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isPending}
            className="px-3 py-1.5 rounded-lg border bg-background font-medium hover:bg-muted disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
          >
            Successivo
          </button>
        </div>
      </div>

    </div>
  );
}