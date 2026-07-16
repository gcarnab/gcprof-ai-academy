import { NavigationItem } from "./NavigationItem";

/**
 * ============================================================================
 * Navigazione Pubblica (Marketing Oriented)
 * ----------------------------------------------------------------------------
 * Utilizzata dagli utenti non autenticati per guidarli nel funnel di conversione.
 * Le ancore puntano alle sezioni strategiche della Landing Page.
 * ============================================================================
 */
export const publicNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Corsi",
    href: "/courses",
  },
  {
    label: "Perché sceglierci",
    href: "/#why-choose", // Punta alla sezione del brand e della doppia anima docente/dev
  },
  {
    label: "Come funziona",
    href: "/#how-it-works", // Punta alla sezione metodologica (Colab, progetti pratici)
  },
  {
    label: "Contatti",
    href: "/contacts",
  },
];