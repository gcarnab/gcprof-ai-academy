import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getFullCourseStructure(courseId: string) {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select(`
      id, title, slug,
      course_modules (
        id, title, order_index,
        course_lessons (
          id, title, slug, video_url, order_index
        )
      )
    `)
    .eq("id", courseId)
    .single();

  if (error) throw new Error(error.message);
  
  // Ordiniamo moduli e lezioni per order_index
  const sortedModules = (data.course_modules || []).sort((a: any, b: any) => a.order_index - b.order_index);
  sortedModules.forEach((mod: any) => {
    mod.course_lessons.sort((a: any, b: any) => a.order_index - b.order_index);
  });

  return { ...data, course_modules: sortedModules };
}

export async function getAllCoursesList() {
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("id, title, slug, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
}