"use server";

import { logger } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type QuizTargetUserType =
  | "EXTERNAL_STUDENT"
  | "SCHOOL_ONLY"
  | "ALL";

export interface AssignQuizPayload {
  quizId: string;
  courseId: string;
  moduleId?: string | null;
  lessonId?: string | null;
  dueDate: string | null;
  isVisible: boolean;

  /**
   * Nuovo modello di targeting.
   *
   * - EXTERNAL_STUDENT:
   *   accesso agli studenti esterni.
   *
   * - SCHOOL_ONLY:
   *   accesso esclusivamente agli studenti scolastici
   *   appartenenti ad almeno una delle classi assegnate.
   *
   * - ALL:
   *   accesso agli studenti esterni e agli studenti scolastici
   *   appartenenti ad almeno una delle classi assegnate.
   */
  targetUserType?: QuizTargetUserType | null;

  /**
   * Nuovo modello N:M.
   *
   * Contiene gli academy_classes.id associati al quiz.
   */
  classIds?: string[] | null;

  /**
   * LEGACY / COMPATIBILITÀ
   *
   * academy_classes.id
   *
   * Rappresenta il macro-anno scolastico:
   * PRIME, SECONDE, TERZE, QUARTE, QUINTE.
   *
   * Se classIds non è valorizzato, questo valore viene utilizzato
   * come singola assegnazione.
   */
  classId?: string | null;

  /**
   * LEGACY / COMPATIBILITÀ
   *
   * Indirizzo di studio.
   *
   * Esempio: LSA, INF, RIM...
   */
  schoolTrack?: string | null;

  /**
   * LEGACY / COMPATIBILITÀ
   *
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
 * Normalizza e deduplica gli ID delle classi.
 */
function normalizeClassIds(
  classIds?: string[] | null,
  legacyClassId?: string | null,
): string[] {
  const ids = [
    ...(Array.isArray(classIds) ? classIds : []),
    ...(legacyClassId ? [legacyClassId] : []),
  ]
    .map((classId) => classId?.trim())
    .filter(
      (classId): classId is string =>
        typeof classId === "string" && classId.length > 0,
    );

  return Array.from(new Set(ids));
}

/**
 * Normalizza il tipo di targeting.
 *
 * In caso di valore assente o non riconosciuto viene utilizzato ALL,
 * coerentemente con il DEFAULT presente nella tabella quizzes.
 */
function normalizeTargetUserType(
  targetUserType?: string | null,
): QuizTargetUserType {
  if (
    targetUserType === "EXTERNAL_STUDENT" ||
    targetUserType === "SCHOOL_ONLY" ||
    targetUserType === "ALL"
  ) {
    return targetUserType;
  }

  return "ALL";
}

/**
 * Verifica la coerenza della restrizione legacy di classe.
 *
 * Questa funzione viene mantenuta per compatibilità con il precedente
 * pannello amministrativo.
 *
 * Una restrizione completa richiede SEMPRE:
 * - classId       -> anno
 * - schoolTrack   -> indirizzo
 * - schoolSection -> sezione
 *
 * Sono invece tutti null quando il quiz non è limitato ad una classe.
 *
 * NOTA:
 * il nuovo modello di accesso NON utilizza questi tre campi come
 * fonte decisionale. La fonte del nuovo modello è
 * quiz_class_assignments.
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
 * Assegna un quiz a un corso, modulo/lezione e configura il nuovo
 * modello di targeting.
 *
 * Nuovo modello:
 *
 * target_user_type + quiz_class_assignments
 *
 * Esempi:
 *
 * EXTERNAL_STUDENT
 *   -> nessuna classe necessaria
 *
 * SCHOOL_ONLY
 *   -> una o più classi in quiz_class_assignments
 *
 * ALL
 *   -> studenti esterni + studenti scolastici appartenenti
 *      alle classi presenti in quiz_class_assignments
 *
 * quiz_assignments contiene esclusivamente i metadati
 * dell'assegnazione:
 *
 * - quiz_id
 * - course_id
 * - due_at
 * - is_visible
 *
 * I campi legacy class_id/school_track/school_section vengono
 * mantenuti nel record quizzes per compatibilità e rollback,
 * ma NON rappresentano la fonte decisionale del nuovo controllo
 * di accesso.
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
    targetUserType: payload.targetUserType,
    classIds: payload.classIds,
    classId: payload.classId,
    schoolTrack: payload.schoolTrack,
    schoolSection: payload.schoolSection,
  });

  const targetUserType = normalizeTargetUserType(
    payload.targetUserType,
  );

  const classIds = normalizeClassIds(
    payload.classIds,
    payload.classId,
  );

  /*
   * I campi legacy vengono ancora normalizzati e mantenuti.
   *
   * Per evitare regressioni con il vecchio pannello, se è presente
   * classId viene utilizzato insieme a schoolTrack/schoolSection
   * come prima.
   */
  const legacyClassId = payload.classId?.trim() || null;
  const schoolTrack = normalizeOptionalText(payload.schoolTrack);
  const schoolSection = normalizeOptionalText(payload.schoolSection);

  /*
   * 1. Compatibilità con il precedente modello.
   *
   * La validazione legacy viene eseguita solo quando il chiamante
   * sta effettivamente fornendo uno dei campi legacy.
   *
   * Il nuovo modello N:M può invece fornire semplicemente classIds.
   */
  const hasLegacyRestrictionFields = Boolean(
    legacyClassId || schoolTrack || schoolSection,
  );

  if (hasLegacyRestrictionFields) {
    const restrictionError = validateClassRestriction(
      legacyClassId,
      schoolTrack,
      schoolSection,
    );

    if (restrictionError) {
      return {
        success: false,
        error: restrictionError,
      };
    }
  }

  /*
   * 2. Il targeting EXTERNAL_STUDENT non richiede classi.
   *
   * SCHOOL_ONLY e ALL possono invece avere una o più classi.
   *
   * Zero assegnazioni NON viene trasformato in accesso pubblico:
   * il controllo lato lettura stabilisce che uno SCHOOL_STUDENT
   * non può accedere a SCHOOL_ONLY/ALL senza una classe assegnata.
   */
  if (
    (targetUserType === "SCHOOL_ONLY" ||
      targetUserType === "ALL") &&
    classIds.length === 0
  ) {
    logger.info(
      "Quiz configurato senza classi scolastiche:",
      {
        quizId: payload.quizId,
        targetUserType,
      },
    );
  }

  /*
   * 3. Verifica che tutte le academy_classes selezionate esistano.
   *
   * La query viene eseguita in un'unica operazione per evitare
   * N query in caso di assegnazione multipla.
   */
  if (classIds.length > 0) {
    const { data: academyClasses, error: classesError } = await supabase
      .from("academy_classes")
      .select("id")
      .in("id", classIds);

    if (classesError) {
      logger.error(
        "Errore durante la verifica delle classi target:",
        classesError.message,
      );

      return {
        success: false,
        error: "Impossibile verificare le classi selezionate.",
      };
    }

    const existingClassIds = new Set(
      (academyClasses ?? []).map((academyClass) => academyClass.id),
    );

    const missingClassIds = classIds.filter(
      (classId) => !existingClassIds.has(classId),
    );

    if (missingClassIds.length > 0) {
      return {
        success: false,
        error:
          "Una o più classi selezionate non esistono nel sistema.",
      };
    }
  }

  /*
   * 4. Se viene utilizzato il vecchio modello con una restrizione
   *    completa, verifichiamo che esista realmente almeno uno
   *    studente con quella combinazione anno + indirizzo + sezione.
   *
   *    Questa verifica viene mantenuta esclusivamente per
   *    compatibilità con il pannello precedente.
   */
  if (
    legacyClassId &&
    schoolTrack &&
    schoolSection
  ) {
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
      .eq("profile_classes.class_id", legacyClassId)
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
   * 5. Aggiorna il quiz.
   *
   * target_user_type è la nuova fonte del targeting.
   *
   * I campi legacy vengono mantenuti:
   * - class_id
   * - school_track
   * - school_section
   *
   * Non vengono eliminati per garantire compatibilità e rollback.
   *
   * In caso di più classi non è possibile rappresentarle tutte
   * nei vecchi campi; class_id continua quindi a rappresentare
   * esclusivamente il valore legacy eventualmente fornito dal
   * chiamante.
   */
  const { error: quizError } = await supabase
    .from("quizzes")
    .update({
      course_id: payload.courseId,
      module_id: payload.moduleId || null,
      lesson_id: payload.lessonId || null,

      target_user_type: targetUserType,

      class_id: legacyClassId,
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
   * 6. Aggiorna le assegnazioni N:M.
   *
   * Prima rimuoviamo le associazioni precedenti del quiz.
   *
   * Questo permette di modificare in modo atomico dal punto di vista
   * applicativo:
   *
   * Quiz -> A,B,C
   *
   * in:
   *
   * Quiz -> A,D
   *
   * senza lasciare associazioni obsolete.
   */
  const { error: deleteAssignmentsError } = await supabase
    .from("quiz_class_assignments")
    .delete()
    .eq("quiz_id", payload.quizId);

  if (deleteAssignmentsError) {
    logger.error(
      "Errore durante la rimozione delle precedenti assegnazioni " +
        "di classe del quiz:",
      deleteAssignmentsError.message,
    );

    return {
      success: false,
      error:
        "Impossibile aggiornare le classi assegnate al quiz.",
    };
  }

  /*
   * 7. Inserisce le nuove assegnazioni N:M.
   *
   * Nessuna riga viene inserita per EXTERNAL_STUDENT senza classi.
   *
   * Per SCHOOL_ONLY/ALL con zero classi non viene inserita alcuna
   * associazione: lato accesso server-side lo SCHOOL_STUDENT
   * rimane quindi correttamente escluso.
   */
  if (classIds.length > 0) {
    const assignmentRows = classIds.map((classId) => ({
      quiz_id: payload.quizId,
      class_id: classId,
    }));

    const { error: insertAssignmentsError } = await supabase
      .from("quiz_class_assignments")
      .insert(assignmentRows);

    if (insertAssignmentsError) {
      logger.error(
        "Errore durante il salvataggio delle assegnazioni " +
          "N:M del quiz:",
        insertAssignmentsError.message,
      );

      return {
        success: false,
        error:
          "Impossibile salvare le classi assegnate al quiz.",
      };
    }
  }

  /*
   * 8. Mantiene i metadati dell'assegnazione al corso.
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
   * 9. Revalidation.
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