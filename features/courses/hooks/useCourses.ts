"use client";

import { useMemo, useState } from "react";
import { getAllCourses } from "../services/courseService";
import { useAuth } from "@/features/auth/context/AuthContext";

export function useCourses() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Tutti");

  // Recupera i corsi filtrati a monte in base ai permessi dell'utente loggato
  const allowedCourses = useMemo(() => {
    return getAllCourses(user);
  }, [user]);

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