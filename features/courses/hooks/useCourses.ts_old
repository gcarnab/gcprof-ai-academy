"use client";

import { useMemo, useState, useEffect } from "react";
import { getLiveCourses, getLiveCategories } from "../services/courseActions";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Course } from "../types/course";

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

        setDbCourses(coursesData);
        if (categoriesData && categoriesData.length > 0) {
          setDbCategories(categoriesData);
        }
      } catch (error) {
        console.error(
          "❌ Errore durante il caricamento dei dati iniziali nell'hook:",
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

  /**
   * 🛡️ STRATO DI SICUREZZA RIGIDO APPLICATO AI DATI DEL DB
   */
  const allowedCourses = useMemo(() => {
    const currentUser = legacySessionUser as any;

    if (currentUser?.role === "admin") {
      return dbCourses;
    }

    if (
      !currentUser ||
      currentUser.status === "pending" ||
      currentUser.status === "blocked"
    ) {
      return [];
    }

    // 🎯 MODIFICATO: Lo studente vede i corsi solo se appartengono esplicitamente alla sua classe
    const userClasses = currentUser.classes || [];
    return dbCourses.filter((course) => {
      return course.allowedClasses.some((allowedClass: string) =>
        userClasses.includes(allowedClass),
      );
    });
  }, [dbCourses, legacySessionUser]);

  const filteredCourses = useMemo(() => {
    return allowedCourses.filter((course) => {
      const matchCategory =
        category === "Tutti" || course.category === category;
      const matchSearch = course.title
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