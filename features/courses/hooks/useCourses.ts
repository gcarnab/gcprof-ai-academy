"use client";

import { useMemo, useState } from "react";
import { getAllCourses } from "../services/courseService";
import { useAuth } from "@/features/auth/core/context/AuthContext";

export function useCourses() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Tutti");

  /**
   * 🎯 ADAPTER DI RETROCOMPATIBILITÀ (V2 ──► V1)
   * Mappa il nuovo oggetto utente V2 nel vecchio formato 'SessionUser' richiesto 
   * dal servizio dei corsi, così i filtri su ruoli e classi continueranno a funzionare.
   */
  const legacySessionUser = useMemo(() => {
    if (!user) return null;

    return {
      ...user,
      // Risolve la proprietà mancante usando il displayName o l'email come fallback
      username: (user as any).username || user.displayName || user.email,
      // Garantisce che i filtri interni sulle classi leggano correttamente l'array v2 o v1
      allowedClasses: user.classes || (user as any).allowedClasses || [],
    };
  }, [user]);

  // Recupera i corsi filtrati a monte in base ai permessi dell'utente loggato
  const allowedCourses = useMemo(() => {
    // Passiamo l'utente adattato forzando il tipo per aggirare il blocco di TypeScript v1
    return getAllCourses(legacySessionUser as any);
  }, [legacySessionUser]);

  // Applica i filtri di ricerca e categoria della UI
  const filteredCourses = useMemo(() => {
    return allowedCourses.filter((course) => {
      const matchCategory = category === "Tutti" || course.category === category;
      const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allowedCourses, search, category]);

  return {
    courses: filteredCourses,
    search,
    setSearch,
    category,
    setCategory,
    allCourses: allowedCourses,
  };
}