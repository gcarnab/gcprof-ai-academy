/**
 * ================================================================
 * GCPROF AI Academy
 * ----------------------------------------------------------------
 * File: course.ts
 * ----------------------------------------------------------------
 * Questo file contiene il modello dati (TypeScript Interface)
 * utilizzato da tutta la Feature Courses.
 *
 * È progettato per essere compatibile con future integrazioni:
 * - Supabase (database)
 * - API REST
 * - sistemi di autenticazione e ruoli
 * ================================================================
 */

/**
 * Modello di un corso.
 *
 * Questa interfaccia rappresenta la struttura minima di un corso.
 */
export interface Course {

    /**
     * Identificatore univoco del corso.
     *
     * Per ora è un numero.
     * In futuro potrebbe diventare uno UUID generato da Supabase.
     */
    id: number;

    /**
     * Slug URL-friendly per routing dinamico
     * Esempio: /courses/python-base
     */
    slug: string;

    /**
     * Titolo del corso.
     */
    title: string;

    /**
     * Breve descrizione mostrata
     * nella Home e nel Catalogo.
     */
    description: string;

    /**
    /**
     * Categoria del corso (usata per filtri)
     */
    category: string;

    /**
     * Livello del corso
     */
    difficulty: "Base" | "Intermedio" | "Avanzato";

    /**
     * Docente del corso
     */
    teacher: string;

    /**
     * Ore stimate di apprendimento
     */
    estimatedHours: number;

    /**
     * Numero di moduli del corso
     */
    modulesCount: number;

    /**
     * Numero di lezioni totali
     */
    lessonsCount: number;

    /**
     * Immagine di copertina
     */
    coverImage: string;

    /**
     * Stato pubblicazione
     */
    published: boolean;
}