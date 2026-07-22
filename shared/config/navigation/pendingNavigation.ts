import { NavigationItem } from "./NavigationItem";

/**
 * ============================================================================
 * Navigazione Studente Pending
 * ----------------------------------------------------------------------------
 * Lo studente può solamente consultare il proprio profilo
 * in attesa dell'attivazione.
 * ============================================================================
 */

export const pendingNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Corsi", href: "/courses" },
  { label: "Contatti", href: "/contacts" },
  { label: "Profilo", href: "/profile" },
];
