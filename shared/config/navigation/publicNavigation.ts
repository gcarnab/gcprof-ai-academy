import { NavigationItem } from "./NavigationItem";

/**
 * ============================================================================
 * Navigazione Pubblica
 * ----------------------------------------------------------------------------
 * Utilizzata dagli utenti non autenticati.
 * ============================================================================
 */

export const publicNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Studenti",
    href: "/students",
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