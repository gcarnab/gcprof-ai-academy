/**
 * ============================================================================
 * COMPONENTE: CategoryFilter
 * ----------------------------------------------------------------------------
 * Questo componente rappresenta il sistema di filtro per categorie
 * all'interno del catalogo corsi.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - mostrare le categorie disponibili
 * - gestire la selezione dell'utente
 * - comunicare la selezione al parent component
 *
 * NON deve:
 * - filtrare i corsi
 * - conoscere i dati dei corsi
 * - contenere logica di business
 *
 * Questo segue il principio:
 * "Presentational + Controlled Component"
 * ============================================================================
 */

"use client";

import { useState } from "react";

/**
 * Props del componente
 */
interface CategoryFilterProps {
  /**
   * Lista delle categorie disponibili
   */
  categories: string[];

  /**
   * Categoria attualmente selezionata
   */
  selected: string;

  /**
   * Callback quando cambia la selezione
   */
  onChange: (category: string) => void;
}

/**
 * ============================================================================
 * COMPONENTE
 * ============================================================================
 */
export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  /**
   * Gestione click su categoria
   */
  const handleSelect = (category: string) => {
    onChange(category);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* ============================================================
          LISTA CATEGORIE
      ============================================================ */}

      {categories.map((category) => {
        const isActive = selected === category;

        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              transition-all
              border

              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
