/**
 * Questa Action riceverà i dati del form, creerà il record del corso generando 
 * lo slug in automatico (se non fornito), e popolerà la tabella pivot course_classes 
 * con le classi selezionate.
 */

"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface CreateCourseInput {
  title: string;
  description: string;
  classIds: string[]; // ID delle classi associate
}

/**
 * Crea un nuovo corso e lo assegna alle coorti di studenti selezionate
 */
export async function createCourseWithClasses(input: CreateCourseInput) {
  const { title, description, classIds } = input;

  if (!title.trim()) {
    return { success: false, error: "Il titolo del corso è obbligatorio." };
  }

  // Generazione automatica dello slug (es: "Informatica 1°" -> "informatica-1")
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // 1. Inserimento del corso nella tabella 'courses'
  const { data: newCourse, error: courseError } = await supabaseAdmin
    .from("courses")
    .insert({
      title,
      slug,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (courseError) {
    return { success: false, error: `Errore creazione corso: ${courseError.message}` };
  }

  // 2. Se ci sono classi selezionate, creiamo i record di giunzione nella tabella pivot
  if (classIds && classIds.length > 0) {
    const pivotInserts = classIds.map((classId) => ({
      course_id: newCourse.id,
      class_id: classId,
    }));

    const { error: pivotError } = await supabaseAdmin
      .from("course_classes")
      .insert(pivotInserts);

    if (pivotError) {
      return { success: false, error: `Corso creato, ma errore assegnazione classi: ${pivotError.message}` };
    }
  }

  // Forza il rinfresco delle rotte della dashboard e dei corsi
  revalidatePath("/admin/dashboard");
  revalidatePath("/courses");
  
  return { success: true };
}