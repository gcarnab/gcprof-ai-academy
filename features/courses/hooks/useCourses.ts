"use client";

import { useMemo, useState, useEffect } from "react";
import { getLiveCourses, getLiveCategories } from "../services/courseActions"; // 🆕 Importazione delle Server Actions per corsi e categorie
import { useAuth } from "@/features/auth/core/context/AuthContext";
import { Course } from "../types/course";

export function useCourses() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Tutti");
  
  // Stato locale per ospitare i corsi e le categorie estratti in tempo reale da Supabase
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [dbCategories, setDbCategories] = useState<string[]>(["Tutti"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Caricamento asincrono parallelo dal database all'avvio del componente
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getLiveCourses(),
          getLiveCategories(),
        ]);
        
        setDbCourses(coursesData);
        if (categoriesData && categoriesData.length > 0) {
          setDbCategories(categoriesData);
        }
      } catch (error) {
        console.error("❌ Errore durante il caricamento dei dati iniziali nell'hook:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  /**
   * 🎯 IL TUO ADAPTER DI RETROCOMPATIBILITÀ (V2 ──► V1)
   */
  const legacySessionUser = useMemo(() => {
    if (!user) return null;

    return {
      ...user,
      username: (user as any).username || user.displayName || user.email,
      allowedClasses: user.classes || (user as any).allowedClasses || [],
    };
  }, [user]);

  /**
   * 🛡️ IL TUO STRATO DI SICUREZZA APPLICATO AI DATI DEL DB
   * Filtra i corsi in tempo reale basandosi sul ruolo e le classi dell'utente loggato
   */
  const allowedCourses = useMemo(() => {
    const currentUser = legacySessionUser as any;

    // Se l'utente non è loggato o non è attivo/admin, vede solo i corsi pubblici (senza restrizioni di classe)
    if (!currentUser || (currentUser.status !== "active" && currentUser.role !== "admin")) {
      return dbCourses.filter(
        (course) => !course.allowedClasses || course.allowedClasses.length === 0
      );
    }

    // Se è un amministratore, vede tutti i corsi presenti nel database
    if (currentUser.role === "admin") {
      return dbCourses;
    }

    // Studente attivo: effettua l'intersezione tra le classi dell'utente e quelle del corso
    const userClasses = currentUser.classes || [];
    return dbCourses.filter((course) => {
      if (!course.allowedClasses || course.allowedClasses.length === 0) {
        return true;
      }
      return course.allowedClasses.some((allowedClass: string) =>
        userClasses.includes(allowedClass)
      );
    });
  }, [dbCourses, legacySessionUser]);

  /**
   * 🔍 I TUOI FILTRI DI RICERCA E CATEGORIA DELLA UI
   * Sistemato il controllo sul valore speciale "Tutti"
   */
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
    categories: dbCategories, // 🏷️ Array dinamico aggiornato in tempo reale dal database
    allCourses: allowedCourses,
    isLoading,
  };
}