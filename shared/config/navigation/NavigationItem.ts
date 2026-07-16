/**
 * ============================================================================
 * NavigationItem
 * ----------------------------------------------------------------------------
 * Modello condiviso per una voce di navigazione.
 *
 * Tutte le configurazioni della Navbar (Pubblica, Studente, Admin, Pending)
 * utilizzano questa interfaccia.
 * ============================================================================
 */

export interface NavigationItem {
  /**
   * Testo visualizzato nella Navbar.
   */
  label: string;

  /**
   * Destinazione del link.
   */
  href: string;

  /**
   * Badge opzionale.
   *
   * Esempi:
   *
   * NEW
   * BETA
   * PRO
   */
  badge?: string;

  /**
   * Link esterno.
   */
  external?: boolean;
}