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
  {
    label: "Profilo",
    href: "/profile",
  },
];