"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const supabaseAdmin = getSupabaseAdmin();

// Definizione centralizzata dei tipi di contenuto supportati dalla piattaforma
export type ExtendedLessonContentType =
  | "video"
  | "document"
  | "colab"
  | "markdown"
  | "sandbox";

export async function getCourseStructureAction(courseId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select(
        `
        id, title,
        course_modules (
          id, title, order_index,
          course_lessons (
            id, title, slug, content_type, external_url, video_url, content, duration, order_index
          )
        )
      `,
      )
      .eq("id", courseId)
      .single();

    if (error) return { success: false, error: error.message, data: null };

    const sortedModules = (data.course_modules || []).sort(
      (a: any, b: any) => a.order_index - b.order_index,
    );
    sortedModules.forEach((mod: any) => {
      mod.course_lessons = (mod.course_lessons || []).sort(
        (a: any, b: any) => a.order_index - b.order_index,
      );
    });

    return {
      success: true,
      data: { ...data, course_modules: sortedModules },
      error: null,
    };
  } catch (err: any) {
    return { success: false, error: err.message, data: null };
  }
}

export async function addModule(
  courseId: string,
  title: string,
  orderIndex: number,
) {
  const { error } = await supabaseAdmin
    .from("course_modules")
    .insert({ course_id: courseId, title, order_index: orderIndex });

  if (error) return { success: false, error: error.message };
    revalidatePath("/admin");
    revalidatePath("/admin/courses");
    revalidatePath("/admin/dashboard");
    revalidatePath("/courses");
  return { success: true };
}

export async function addLesson(
  moduleId: string,
  data: {
    title: string;
    content_type: ExtendedLessonContentType;
    external_url: string;
    content?: string; // Sbloccato il campo facoltativo per il testo/markdown
    order_index: number;
  },
) {
  try {
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w-]+/g, "");

    const insertData = {
      module_id: moduleId,
      title: data.title.trim(),
      slug: slug,
      content_type: data.content_type,
      external_url: data.external_url || "",
      video_url: data.content_type === "video" ? data.external_url : null,
      content: data.content || "", // Salva il testo reale se presente, altrimenti stringa vuota di fallback
      order_index: data.order_index,
      duration: 15,
    };

    const { error } = await supabaseAdmin
      .from("course_lessons")
      .insert(insertData);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { success: false, error: error.message };
    }
    revalidatePath("/admin");
    revalidatePath("/admin/courses");
    revalidatePath("/admin/dashboard");
    revalidatePath("/courses");
    return { success: true };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: err.message };
  }
}
