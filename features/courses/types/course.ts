/**
 * ============================================================================
 * MODELLO DATI: Course
 * ----------------------------------------------------------------------------
 * Definisce la struttura di un corso.
 *
 * In futuro verrà utilizzato da:
 * - Supabase
 * - API
 * - Dashboard
 * - Catalogo corsi
 * ============================================================================
 */

export interface Course {
  id: number
  title: string
  description: string
  level: string
}