"use client";

import { useState, useEffect } from "react";
import { CourseCategory } from "../types/CourseCategory";
import { getCourseCategoriesAction } from "../actions/getCourseCategoriesAction";
import { logger } from "@/lib/logger";

export function useCourseCategories() {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategories() {
      setIsLoading(true);
      try {
        const data = await getCourseCategoriesAction();
        setCategories(data || []);

        logger.debug(
          `[HOOK] Caricate dal service: ${(data || []).length} categorie`,
        );
      } catch (error) {
        logger.error(
          "❌ Errore durante il caricamento delle categorie nell'hook useCourseCategories:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  return {
    categories,
    isLoading,
  };
}
