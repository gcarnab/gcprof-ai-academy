"use server";

import { logger } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export interface AssignQuizPayload {
  quizId: string;
  courseId: string;
  moduleId?: string | null;
  lessonId?: string | null;
  dueDate: string | null;
  isVisible: boolean;

  /**
   * academy_classes.id
   *
   * Rappresenta il macro-anno scolastico:
   * PRIME, SECONDE, TERZE, QUARTE, QUINTE.
   */
  classId?: string | null;

  /**
   * Indirizzo di studio.
   *
   * Esempio: LSA, INF, RIM...
   */
  schoolTrack?: string | null;

  /**
   * Sezione della classe.
   *
   * Esempio: A, B, C...
   */
  schoolSection?: string | null;
}

/**
 * Rappresenta una combinazione reale anno + indirizzo + sezione
 * ricavata dai dati degli studenti presenti in profiles.
 */
export interface AvailableClassTarget {
  classId: string;
  className: string;
  schoolTrack: string;
  schoolSection: string;
}

/**
 * Normalizza un valore testuale proveniente dal client.
 *
 * Gli indirizzi e le sezioni vengono memorizzati in forma normalizzata
 * per evitare differenze accidentali dovute a spazi o maiuscole/minuscole.
 */
function normalizeOptionalText(value?: string | null): string | null {
  const normalized = value?.trim().toUpperCase();

  return normalized || null;
}

/**
 * Verifica la coerenza della restrizione di classe.
 *
 * Una restrizione completa richiede SEMPRE:
 * - classId       -> anno
 * - schoolTrack   -> indirizzo
 * - schoolSection -> sezione
 *
 * Sono invece tutti null quando il quiz non è limitato ad una classe.
 */
function validateClassRestriction(
  classId: string | null,
  schoolTrack: string | null,
  schoolSection: string | null,
): string | null {
  const hasClassId = Boolean(classId);
  const hasTrack = Boolean(schoolTrack);
  const hasSection = Boolean(schoolSection);

  const hasAnyRestriction = hasClassId || hasTrack || hasSection;
  const hasCompleteRestriction = hasClassId && hasTrack && hasSection;

  if (hasAnyRestriction && !hasCompleteRestriction) {
    return (
      "La restrizione del quiz deve specificare anno, " +
      "indirizzo e sezione."
    );
  }

  return null;
}

/**
 * Assegna un quiz a un corso, modulo/lezione e opzionalmente
 * limita l'accesso ad una specifica classe scolastica.
 *
 * La restrizione è composta da:
 *
 * - classId       -> macro-anno (es. QUARTE)
 * - schoolTrack   -> indirizzo (es. LSA)
 * - schoolSection -> sezione (es. B)
 *
 * Esempio:
 *
 * QUARTE + LSA + B
 *
 * La restrizione viene salvata direttamente nella tabella quizzes.
 *
 * quiz_assignments contiene esclusivamente i metadati
 * dell'assegnazione (corso, scadenza, visibilità).
 *
 * NON viene più utilizzato target_class.
 */
export async function assignQuizAction(payload: AssignQuizPayload) {
  const supabase = getSupabaseAdmin();

  logger.info("Dati ricevuti dalla Server Action di assegnazione quiz:", {
    quizId: payload.quizId,
    courseId: payload.courseId,
    moduleId: payload.moduleId,
    lessonId: payload.lessonId,
    dueDate: payload.dueDate,
    isVisible: payload.isVisible,
    classId: payload.classId,
    schoolTrack: payload.schoolTrack,
    schoolSection: payload.schoolSection,
  });

  const classId = payload.classId?.trim() || null;
  const schoolTrack = normalizeOptionalText(payload.schoolTrack);
  const schoolSection = normalizeOptionalText(payload.schoolSection);

  /*
   * 1. Verifica coerenza della restrizione.
   *
   * Non è consentito specificare soltanto anno, indirizzo
   * oppure sezione.
   */
  const restrictionError = validateClassRestriction(
    classId,
    schoolTrack,
    schoolSection,
  );

  if (restrictionError) {
    return {
      success: false,
      error: restrictionError,
    };
  }

  /*
   * 2. Se è stata specificata una classe, verifichiamo che
   *    academy_classes.id esista.
   */
  if (classId) {
    const { data: academyClass, error: classError } = await supabase
      .from("academy_classes")
      .select("id")
      .eq("id", classId)
      .maybeSingle();

    if (classError) {
      logger.error(
        "Errore durante la verifica della classe target:",
        classError.message,
      );

      return {
        success: false,
        error: "Impossibile verificare la classe selezionata.",
      };
    }

    if (!academyClass) {
      return {
        success: false,
        error: "La classe selezionata non esiste.",
      };
    }
  }

  /*
   * 3. Se è stata specificata una restrizione completa, verifichiamo
   *    che esista realmente almeno uno studente con quella
   *    combinazione anno + indirizzo + sezione.
   *
   *    Questo evita di salvare accidentalmente combinazioni inesistenti.
   */
  if (classId && schoolTrack && schoolSection) {
    const { data: matchingStudents, error: studentError } = await supabase
      .from("profiles")
      .select(
        `
          id,
          school_track,
          school_section,
          profile_classes!inner (
            class_id
          )
        `,
      )
      .eq("school_track", schoolTrack)
      .eq("school_section", schoolSection)
      .eq("profile_classes.class_id", classId)
      .limit(1);

    if (studentError) {
      logger.error(
        "Errore durante la verifica della combinazione " +
          "anno/indirizzo/sezione:",
        studentError.message,
      );

      return {
        success: false,
        error:
          "Impossibile verificare la combinazione di classe selezionata.",
      };
    }

    if (!matchingStudents || matchingStudents.length === 0) {
      return {
        success: false,
        error:
          "La combinazione anno, indirizzo e sezione selezionata " +
          "non corrisponde ad alcuna classe presente nel sistema.",
      };
    }
  }

  /*
   * 4. Aggiorna il quiz.
   *
   * class_id + school_track + school_section costituiscono
   * la fonte unica della restrizione di accesso.
   *
   * Se il quiz non è ristretto, tutti e tre i valori vengono
   * impostati a NULL.
   */
  const { error: quizError } = await supabase
    .from("quizzes")
    .update({
      course_id: payload.courseId,
      module_id: payload.moduleId || null,
      lesson_id: payload.lessonId || null,
      class_id: classId,
      school_track: schoolTrack,
      school_section: schoolSection,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.quizId);

  if (quizError) {
    logger.error(
      "Errore DB durante l'aggiornamento del quiz:",
      quizError.message,
    );

    return {
      success: false,
      error: quizError.message,
    };
  }

  /*
   * 5. Mantiene i metadati dell'assegnazione.
   *
   * La restrizione di classe NON viene salvata in
   * quiz_assignments.
   *
   * quiz_assignments contiene:
   * - quiz_id
   * - course_id
   * - due_at
   * - is_visible
   */
  const { error: assignmentError } = await supabase
    .from("quiz_assignments")
    .upsert(
      {
        quiz_id: payload.quizId,
        course_id: payload.courseId,
        due_at: payload.dueDate
          ? new Date(payload.dueDate).toISOString()
          : null,
        is_visible: payload.isVisible,
      },
      {
        onConflict: "quiz_id,course_id",
      },
    );

  if (assignmentError) {
    logger.error(
      "Errore DB durante l'aggiornamento di quiz_assignments:",
      assignmentError.message,
    );

    return {
      success: false,
      error: assignmentError.message,
    };
  }

  /*
   * 6. Revalidation.
   */
  revalidatePath(`/admin/quiz/${payload.quizId}/analytics`);
  revalidatePath("/admin/quiz", "layout");
  revalidatePath("/admin/dashboard", "layout");

  return {
    success: true,
  };
}

/**
 * Recupera le classi macro disponibili.
 *
 * Manteniamo questa Server Action per compatibilità con
 * il codice amministrativo esistente.
 *
 * academy_classes rappresenta esclusivamente il macro-anno:
 * PRIME, SECONDE, TERZE, QUARTE, QUINTE.
 */
export async function getAvailableClassesAction() {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .from("academy_classes")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      logger.error(
        "Errore durante il recupero delle classi:",
        error.message,
      );

      return {
        success: false,
        classes: [],
      };
    }

    return {
      success: true,
      classes: data ?? [],
    };
  } catch (error) {
    logger.error(
      "Errore imprevisto durante il recupero delle classi:",
      error,
    );

    return {
      success: false,
      classes: [],
    };
  }
}

/**
 * Recupera le combinazioni reali:
 *
 * anno + indirizzo + sezione
 *
 * presenti nei profili degli studenti.
 *
 * Questa funzione evita di costruire artificialmente le classi
 * concatenando stringhe e permette al pannello amministrativo
 * di mostrare esclusivamente combinazioni realmente presenti
 * nel database.
 */
export async function getAvailableClassTargetsAction() {
  const supabase = getSupabaseAdmin();

  try {
    const { data: classes, error: classesError } = await supabase
      .from("academy_classes")
      .select("id, name")
      .order("name", { ascending: true });

    if (classesError) {
      logger.error(
        "Errore durante il recupero delle macro-classi:",
        classesError.message,
      );

      return {
        success: false,
        targets: [],
      };
    }

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select(
        `
          school_track,
          school_section,
          profile_classes!inner (
            class_id
          )
        `,
      )
      .eq("role", "student")
      .not("school_track", "is", null)
      .not("school_section", "is", null);

    if (profilesError) {
      logger.error(
        "Errore durante il recupero delle combinazioni scolastiche:",
        profilesError.message,
      );

      return {
        success: false,
        targets: [],
      };
    }

    const classNameById = new Map(
      (classes ?? []).map((academyClass) => [
        academyClass.id,
        academyClass.name,
      ]),
    );

    const uniqueTargets = new Map<string, AvailableClassTarget>();

    for (const profile of profiles ?? []) {
      const schoolTrack = normalizeOptionalText(profile.school_track);
      const schoolSection = normalizeOptionalText(profile.school_section);

      if (!schoolTrack || !schoolSection) {
        continue;
      }

      const profileClasses = Array.isArray(profile.profile_classes)
        ? profile.profile_classes
        : [];

      for (const profileClass of profileClasses) {
        const classId = profileClass.class_id;

        if (!classId) {
          continue;
        }

        const className = classNameById.get(classId);

        if (!className) {
          continue;
        }

        const key = `${classId}|${schoolTrack}|${schoolSection}`;

        uniqueTargets.set(key, {
          classId,
          className,
          schoolTrack,
          schoolSection,
        });
      }
    }

    const targets = Array.from(uniqueTargets.values()).sort((a, b) => {
      const classComparison = a.className.localeCompare(
        b.className,
        "it",
        { sensitivity: "base" },
      );

      if (classComparison !== 0) {
        return classComparison;
      }

      const trackComparison = a.schoolTrack.localeCompare(
        b.schoolTrack,
        "it",
        { sensitivity: "base" },
      );

      if (trackComparison !== 0) {
        return trackComparison;
      }

      return a.schoolSection.localeCompare(
        b.schoolSection,
        "it",
        { sensitivity: "base" },
      );
    });

    return {
      success: true,
      targets,
    };
  } catch (error) {
    logger.error(
      "Errore imprevisto durante il recupero delle combinazioni " +
        "anno/indirizzo/sezione:",
      error,
    );

    return {
      success: false,
      targets: [],
    };
  }
}

/**
 * Recupera i moduli e le relative lezioni di un corso.
 */
export async function getCourseModulesAction(courseId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("course_modules")
    .select(
      `
      id,
      title,
      course_lessons (
        id,
        title
      )
    `,
    )
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (error) {
    logger.error(
      `Errore caricamento moduli/lezioni per corso ${courseId}:`,
      error.message,
    );

    const { data: modulesOnly } = await supabase
      .from("course_modules")
      .select("id, title")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true });

    return {
      success: true,
      modules: modulesOnly ?? [],
    };
  }

  const formattedModules = (data ?? []).map((module: any) => ({
    id: module.id,
    title: module.title,
    lessons: module.course_lessons ?? [],
  }));

  return {
    success: true,
    modules: formattedModules,
  };
}
