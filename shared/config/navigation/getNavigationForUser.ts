import type { AuthUser } from "@/features/auth/context/AuthContext";

import { publicNavigation } from "./publicNavigation";
import { studentNavigation } from "./studentNavigation";
import { pendingNavigation } from "./pendingNavigation";
import { adminNavigation } from "./adminNavigation";

import type { NavigationItem } from "./NavigationItem";

/**
 * ============================================================================
 * Restituisce il menu corretto in base allo stato dell'utente.
 *
 * Questa funzione centralizza completamente la logica della Navbar.
 * ============================================================================
 */
export function getNavigationForUser(
  user: AuthUser | null,
): NavigationItem[] {
  // Utente non autenticato
  if (!user) {
    return publicNavigation;
  }

  // Admin
  if (user.role === "admin") {
    return adminNavigation;
  }

  // Studente non ancora attivato
  if (user.status === "pending") {
    return pendingNavigation;
  }

  // Studente attivo
  return studentNavigation;
}