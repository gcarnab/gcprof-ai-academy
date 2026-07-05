/**
 * Rappresenta una singola voce del menu.
 */
export interface NavigationItem {

  /**
   * Testo mostrato nella Navbar.
   */
  label: string;

  /**
   * Percorso della pagina.
   */
  href: string;

}

/**
 * ============================================================================
 * Menu pubblico della piattaforma.
 *
 * NOTA
 * ----------------------------------------------------------------------------
 * Attualmente tutte le pagine sono pubbliche.
 *
 * Dopo l'introduzione dell'autenticazione verranno creati
 * menu differenti in base al ruolo dell'utente.
 * ============================================================================
 */

export const navigation: NavigationItem[] = [

  {
    label: "Home",
    href: "/",
  },

  {
    label: "Corsi",
    href: "/courses",
  },

  {
    label: "Contatti",
    href: "/contacts",
  },

];