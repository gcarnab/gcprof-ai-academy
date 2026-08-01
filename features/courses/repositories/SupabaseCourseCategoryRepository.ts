import { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { CourseCategory } from "../types/CourseCategory";

export class SupabaseCourseCategoryRepository {
  constructor(
    private readonly supabase: SupabaseClient,
  ) {}

  /**
   * Restituisce tutte le categorie visibili nella Home,
   * ordinate secondo il display_order configurato dall'Admin.
   */
  async findVisibleHome(): Promise<CourseCategory[]> {
    logger.info(
      "[SupabaseCourseCategoryRepository] Loading Home categories...",
    );

    const { data, error } = await this.supabase
      .from("course_categories")
      .select("*")
      .eq("visible_home", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      logger.error(
        "[SupabaseCourseCategoryRepository] Error loading Home categories",
        error,
      );
      return [];
    }

    logger.info(
      "[SupabaseCourseCategoryRepository] Home categories loaded",
      {
        count: data?.length ?? 0,
      },
    );

    return (data ?? []).map((row) => this.mapRow(row));
  }

  /**
   * Restituisce tutte le categorie.
   */
  async findAll(): Promise<CourseCategory[]> {
    logger.info(
      "[SupabaseCourseCategoryRepository] Loading all categories...",
    );

    const { data, error } = await this.supabase
      .from("course_categories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      logger.error(
        "[SupabaseCourseCategoryRepository] Error loading categories",
        error,
      );
      return [];
    }

    logger.info(
      "[SupabaseCourseCategoryRepository] Categories loaded",
      {
        count: data?.length ?? 0,
      },
    );

    return (data ?? []).map((row) => this.mapRow(row));
  }

  /**
   * Ricerca una categoria tramite slug.
   */
  async findBySlug(
    slug: string,
  ): Promise<CourseCategory | null> {
    logger.info(
      "[SupabaseCourseCategoryRepository] Loading category",
      {
        slug,
      },
    );

    const { data, error } = await this.supabase
      .from("course_categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      logger.error(
        "[SupabaseCourseCategoryRepository] Error loading category",
        error,
      );
      return null;
    }

    if (!data) {
      logger.warn(
        "[SupabaseCourseCategoryRepository] Category not found",
        {
          slug,
        },
      );

      return null;
    }

    return this.mapRow(data);
  }

  // --------------------------------------------------------
  // PRIVATE
  // --------------------------------------------------------

  private mapRow(row: any): CourseCategory {
    return {
      id: row.id,

      name: row.name,

      slug: row.slug,

      description: row.description ?? undefined,

      iconName: row.icon_name ?? undefined,

      colorTheme: row.color_theme,

      displayOrder: row.display_order,

      visibleHome: row.visible_home,

      isFeatured: row.is_featured,

      createdAt: row.created_at,

      updatedAt: row.updated_at,
    };
  }
}