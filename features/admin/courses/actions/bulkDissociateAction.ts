"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

const supabaseAdmin = getSupabaseAdmin();

interface DissociationPair {
  courseId: string;
  classId: string;
}

/**
 * Server Action per eliminare in un singolo blocco atomico più associazioni corso-classe
 */
export async function bulkDissociateAction(pairs: DissociationPair[]) {
  if (!pairs || pairs.length === 0) {
    return { success: false, error: "Nessuna associazione selezionata per la rimozione." };
  }

  try {
    // Per gestire le chiavi composte massivamente su PostgREST compiliamo una stringa condizionale .or()
    // Struttura generata: and(course_id.eq.XXX,class_id.eq.YYY),and(course_id.eq.ZZZ,class_id.eq.KKK)
    const orFilterString = pairs
      .map((p) => `and(course_id.eq.${p.courseId},class_id.eq.${p.classId})`)
      .join(",");

    const { error } = await supabaseAdmin
      .from("course_classes")
      .delete()
      .or(orFilterString);

    if (error) {
      logger.error("Errore query Supabase bulk delete associazioni:", error.message);
      throw error;
    }

    // Forza la rigenerazione delle rotte coinvolte
    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/courses");

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Impossibile rimuovere le associazioni selezionate.",
    };
  }
}