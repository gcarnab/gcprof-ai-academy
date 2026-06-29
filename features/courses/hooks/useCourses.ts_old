/**
 * ============================================================================
 * HOOK: useCourses
 * ----------------------------------------------------------------------------
 * Questo hook rappresenta il cuore logico del catalogo corsi.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - fornire la lista dei corsi
 * - gestire ricerca testuale
 * - gestire filtro per categoria
 * - restituire i dati già filtrati alla UI
 *
 * VANTAGGI ARCHITETTURALI:
 * ----------------------------------------------------------------------------
 * ✔ la UI NON contiene logica
 * ✔ la logica è riutilizzabile
 * ✔ pronto per Supabase (Sprint 1)
 * ✔ separazione totale delle responsabilità
 * ============================================================================
 */

"use client";

import { useMemo, useState } from "react";

import { courses as mockCourses } from "../data/courses";

/**
 * Hook principale del catalogo corsi
 */
export function useCourses() {

  /**
   * ============================================================
   * STATO: ricerca testuale
   * ============================================================
   */
  const [search, setSearch] = useState<string>("");

  /**
   * ============================================================
   * STATO: categoria selezionata
   * ============================================================
   */
  const [category, setCategory] = useState<string>("Tutti");

  /**
   * ============================================================
   * LISTA FILTRATA
   * ------------------------------------------------------------
   * useMemo evita ricalcoli inutili ad ogni render
   * ============================================================
   */
  const filteredCourses = useMemo(() => {

    return mockCourses.filter((course) => {

      /**
       * Filtro per categoria
       */
      const matchCategory =
        category === "Tutti" || course.category === category;

      /**
       * Filtro per ricerca testuale
       */
      const matchSearch =
        course.title.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;

    });

  }, [search, category]);

  /**
   * ============================================================
   * OUTPUT DELL'HOOK
   * ============================================================
   */
  return {

    /**
     * lista corsi filtrata pronta per la UI
     */
    courses: filteredCourses,

    /**
     * stato ricerca
     */
    search,
    setSearch,

    /**
     * stato categoria
     */
    category,
    setCategory,

    /**
     * lista completa (utile per debug o future feature)
     */
    allCourses: mockCourses,
  };
}