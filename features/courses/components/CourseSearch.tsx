/**
 * ============================================================================
 * COMPONENTE: CourseSearch
 * ----------------------------------------------------------------------------
 * Questo componente rappresenta la barra di ricerca del catalogo corsi.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - raccogliere input dell'utente
 * - notificare il valore al componente padre
 *
 * NON deve:
 * - filtrare direttamente i corsi
 * - conoscere la lista dei corsi
 * - gestire logica di business
 *
 * Questo segue il principio:
 * "Controlled Component Pattern"
 * ============================================================================
 */

"use client";

import { useState } from "react";

/**
 * Props del componente
 */
interface CourseSearchProps {

  /**
   * Callback chiamata quando cambia il valore di ricerca
   */
  onSearch: (value: string) => void;

}

/**
 * ============================================================================
 * COMPONENTE
 * ============================================================================
 */
export default function CourseSearch({ onSearch }: CourseSearchProps) {

  /**
   * Stato locale dell'input
   */
  const [value, setValue] = useState<string>("");

  /**
   * Gestione cambio input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newValue = e.target.value;

    setValue(newValue);

    // Notifica il parent component
    onSearch(newValue);

  };

  return (
    <div className="w-full">
      
      {/* ============================================================
          INPUT DI RICERCA
      ============================================================ */}

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Cerca un corso..."
        className="
          w-full
          rounded-lg
          border
          border-border
          px-4
          py-3
          text-muted-foreground
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  );
}