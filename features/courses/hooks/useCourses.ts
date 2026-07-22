"use client";

import { useMemo, useState, useEffect } from "react";
import { getLiveCourses, getLiveCategories } from "../services/courseActions";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Course } from "../types/course";
import { logger } from "@/lib/logger";

export function useCourses() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Tutti");

  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [dbCategories, setDbCategories] = useState<string[]>(["Tutti"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getLiveCourses(),
          getLiveCategories(),
        ]);

        setDbCourses(coursesData || []);

        logger.debug(
          `[HOOK] Caricati dal service: ${(coursesData || []).length} corsi`,
        );

        if (categoriesData && categoriesData.length > 0) {
          setDbCategories(categoriesData);
        }
      } catch (error) {
        logger.error(
          "❌ Errore durante il caricamento dei dati iniziali nell'hook useCourses:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const legacySessionUser = useMemo(() => {
    if (!user) return null;

    return {
      ...user,
      username: (user as any).username || user.displayName || user.email,
      allowedClasses: user.classes || (user as any).allowedClasses || [],
    };
  }, [user]);

  const allowedCourses = useMemo(() => {
    const currentUser = legacySessionUser as any;
    if (!currentUser) return dbCourses;

    // Type assertion sicura per evitare TS2367
    const rawUserType = String(currentUser.userType || currentUser.user_type || "").toUpperCase();
    const rawRole = String(currentUser.role || "").toUpperCase();

    const isExternalStudent =
      rawUserType === "EXTERNAL_STUDENT" || rawRole === "EXTERNAL_STUDENT";

    const isAdmin = currentUser.role === "admin";

    // 1. Se admin o studente esterno -> Mostra tutti i corsi
    if (isAdmin || isExternalStudent) {
      return dbCourses;
    }

    // 2. Se in attesa o bloccato
    if (currentUser.status === "pending" || currentUser.status === "blocked") {
      return [];
    }

    // 3. Studenti scolastici
    const userClasses: string[] =
      currentUser.allowedClasses || currentUser.classes || [];

    return dbCourses.filter((course) => {
      const courseClasses = course.allowedClasses || [];

      if (!courseClasses || courseClasses.length === 0) {
        return true;
      }

      return courseClasses.some((allowedClass: string) =>
        userClasses.includes(allowedClass),
      );
    });
  }, [dbCourses, legacySessionUser]);

  const filteredCourses = useMemo(() => {
    return allowedCourses.filter((course) => {
      const matchCategory =
        category === "Tutti" || course.category === category;

      const matchSearch = (course.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [allowedCourses, search, category]);

  return {
    courses: filteredCourses,
    search,
    setSearch,
    category,
    setCategory,
    categories: dbCategories,
    allCourses: allowedCourses,
    isLoading,
  };
}