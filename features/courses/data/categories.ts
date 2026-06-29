/**
 * ============================================================================
 * DATA: Categories
 * ----------------------------------------------------------------------------
 * Questo file contiene l'elenco delle categorie disponibili
 * nel catalogo corsi.
 *
 * RESPONSABILITÀ:
 * ----------------------------------------------------------------------------
 * - definire le categorie del dominio "Courses"
 * - essere utilizzato dai filtri UI
 *
 * NOTA ARCHITETTURALE:
 * ----------------------------------------------------------------------------
 * Questo dato è separato dalla logica e dai componenti per:
 *
 * ✔ evitare duplicazioni
 * ✔ facilitare futura integrazione con Supabase
 * ✔ permettere espansione dinamica (admin panel futuro)
 * ============================================================================
 */

/**
 * Lista categorie disponibili nel catalogo corsi.
 *
 * "Tutti" è una categoria speciale usata solo lato UI
 * per disattivare il filtro.
 */
export const categories: string[] = [
  "Tutti",
  "Programmazione",
  "Web",
  "Database",
  "AI",
];