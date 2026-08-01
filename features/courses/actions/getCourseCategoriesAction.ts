"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { SupabaseCourseCategoryRepository } from "../repositories/SupabaseCourseCategoryRepository";
import { CourseCategory } from "../types/CourseCategory";

export async function getCourseCategoriesAction(): Promise<CourseCategory[]> {
  logger.info("[getCourseCategoriesAction] Loading categories...");

  try {
    const repository = new SupabaseCourseCategoryRepository(
      getSupabaseAdmin(),
    );

    return await repository.findVisibleHome();
  } catch (error) {
    logger.error(
      "[getCourseCategoriesAction] Error loading categories:",
      error,
    );
    return [];
  }
}