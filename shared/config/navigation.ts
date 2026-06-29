/**
 * ============================================================================
 * CONFIGURAZIONE: Navigation
 * ----------------------------------------------------------------------------
 * Questo file contiene la configurazione centralizzata
 * del menu principale dell'applicazione.
 *
 * PERCHÉ ESISTE?
 * ----------------------------------------------------------------------------
 * Separare la configurazione dalla Navbar offre numerosi vantaggi:
 *
 * • il componente Navbar rimane molto semplice
 * • tutte le voci del menu sono definite in un solo punto
 * • è facile aggiungere nuove pagine
 * • evita duplicazione del codice
 * • prepara l'applicazione ai futuri ruoli utente
 *
 * EVOLUZIONE FUTURA
 * ----------------------------------------------------------------------------
 * Negli Sprint successivi ogni voce potrà includere:
 *
 * • icona
 * • ruolo richiesto
 * • badge
 * • menu a tendina
 * • permessi
 *
 * Esempio:
 *
 * {
 *   label: "Dashboard",
 *   href: "/dashboard",
 *   roles: ["student", "teacher"]
 * }
 * ============================================================================
 */

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