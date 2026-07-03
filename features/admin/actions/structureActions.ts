"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🆕 NUOVA AZIONE: Recupera la struttura bypassando i blocchi RLS
export async function getCourseStructureAction(courseId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select(`
        id, title,
        course_modules (
          id, title, order_index,
          course_lessons (
            id, title, content_type, external_url, order_index
          )
        )
      `)
      .eq("id", courseId)
      .single();

    if (error) return { success: false, error: error.message, data: null };

    // Ordinamento sicuro lato server
    const sortedModules = (data.course_modules || []).sort((a: any, b: any) => a.order_index - b.order_index);
    sortedModules.forEach((mod: any) => {
      mod.course_lessons = (mod.course_lessons || []).sort((a: any, b: any) => a.order_index - b.order_index);
    });

    return { success: true, data: { ...data, course_modules: sortedModules }, error: null };
  } catch (err: any) {
    return { success: false, error: err.message, data: null };
  }
}

export async function addModule(courseId: string, title: string, orderIndex: number) {
  const { error } = await supabaseAdmin
    .from("course_modules")
    .insert({ course_id: courseId, title, order_index: orderIndex });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function addLesson(
  moduleId: string, 
  data: { title: string, content_type: "video" | "document", external_url: string, order_index: number }
) {
  const slug = data.title.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  const { error } = await supabaseAdmin
    .from("course_lessons")
    .insert({
      module_id: moduleId,
      title: data.title,
      slug: slug,
      content_type: data.content_type,
      external_url: data.external_url,
      order_index: data.order_index,
      content: ""
    });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/dashboard");
  return { success: true };
}