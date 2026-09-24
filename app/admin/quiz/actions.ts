"use server";

import { logger } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type QuizTargetUserType =
  | "EXTERNAL_STUDENT"
  | "SCHOOL_ONLY"
  | "ALL";

export interface QuizClassTarget {
  classId: string;
  schoolTrack: string;
  schoolSection: string;
}

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
   * Ogni elemento identifica una classe scolastica completa:
   *
   * academy_classes.id
   * + school_track
   * + school_section
   *
   * Esempio:
   *
   * {
   *   classId: "...",
   *   schoolTrack: "LSA",
   *   schoolSection: "B"
   * }
   */
  classTargets?: QuizClassTarget[] | null;

  /**
   * Compatibilità con il precedente modello.
   *
   * Contiene esclusivamente academy_classes.id.
   *
   * Viene mantenuto perché può essere ancora inviato da
   * componenti amministrativi precedenti.
   *
   * NON è sufficiente per rappresentare una classe scolastica
   * completa nel nuovo modello.
   */
  classIds?: string[] | null;

  /**
   * LEGACY / COMPATIBILITÀ
   *
   * academy_classes.id
   *
   * Rappresenta il macro-anno scolastico:
   * PRIME, SECONDE, TERZE, QUARTE, QUINTE.
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
 * Rappresenta una combinazione reale:
 *
 * anno + indirizzo + sezione
 *
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
 * Gli indirizzi e le sezioni vengono memorizzati in forma
 * normalizzata per evitare differenze accidentali dovute
 * a spazi o maiuscole/minuscole.
 */
function normalizeOptionalText(
  value?: string | null,
): string | null {
  const normalized = value?.trim().toUpperCase();

  return normalized || null;
}

/**
 * Normalizza e deduplica gli ID delle classi.
 *
 * Mantiene compatibilità con il precedente payload.
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
 * Normalizza, valida e deduplica le classi complete del nuovo
 * modello N:M.
 *
 * La chiave logica è:
 *
 * classId + schoolTrack + schoolSection
 */
function normalizeClassTargets(
  classTargets?: QuizClassTarget[] | null,
): QuizClassTarget[] {
  if (!Array.isArray(classTargets)) {
    return [];
  }

  const uniqueTargets = new Map<string, QuizClassTarget>();

  for (const target of classTargets) {
    if (!target || typeof target !== "object") {
      continue;
    }

    const classId =
      typeof target.classId === "string"
        ? target.classId.trim()
        : "";

    const schoolTrack =
      normalizeOptionalText(target.schoolTrack) ?? "";

    const schoolSection =
      normalizeOptionalText(target.schoolSection) ?? "";

    if (!classId || !schoolTrack || !schoolSection) {
      continue;
    }

    const key =
      `${classId}|${schoolTrack}|${schoolSection}`;

    uniqueTargets.set(key, {
      classId,
      schoolTrack,
      schoolSection,
    });
  }

  return Array.from(uniqueTargets.values());
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
 * Una restrizione completa richiede SEMPRE:
 *
 * - classId
 * - schoolTrack
 * - schoolSection
 *
 * Sono invece tutti null quando il quiz non è limitato ad
 * una classe nel vecchio modello.
 *
 * Il nuovo modello NON utilizza questi tre campi come fonte
 * decisionale: la fonte è quiz_class_assignments.
 */
function validateClassRestriction(
  classId: string | null,
  schoolTrack: string | null,
  schoolSection: string | null,
): string | null {
  const hasClassId = Boolean(classId);
  const hasTrack = Boolean(schoolTrack);
  const hasSection = Boolean(schoolSection);

  const hasAnyRestriction =
    hasClassId || hasTrack || hasSection;

  const hasCompleteRestriction =
    hasClassId && hasTrack && hasSection;

  if (hasAnyRestriction && !hasCompleteRestriction) {
    return (
      "La restrizione del quiz deve specificare anno, " +
      "indirizzo e sezione."
    );
  }

  return null;
}

/**
 * Verifica che tutte le classi contenute nei target esistano.
 *
 * Esegue una sola query indipendentemente dal numero di target.
 */
async function validateClassTargetsExist(
  classTargets: QuizClassTarget[],
): Promise<{
  success: boolean;
  error?: string;
}> {
  if (classTargets.length === 0) {
    return { success: true };
  }

  const supabase = getSupabaseAdmin();

  const classIds = Array.from(
    new Set(
      classTargets.map((target) => target.classId),
    ),
  );

  const { data: academyClasses, error } = await supabase
    .from("academy_classes")
    .select("id")
    .in("id", classIds);

  if (error) {
    logger.error(
      "Errore durante la verifica delle classi target:",
      error.message,
    );

    return {
      success: false,
      error:
        "Impossibile verificare le classi selezionate.",
    };
  }

  const existingClassIds = new Set(
    (academyClasses ?? []).map(
      (academyClass) => academyClass.id,
    ),
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

  return { success: true };
}

/**
 * Verifica che ogni combinazione:
 *
 * classId + schoolTrack + schoolSection
 *
 * corrisponda realmente ad almeno uno studente presente
 * nel database.
 *
 * Questo evita di salvare combinazioni artificiali o non presenti.
 */
async function validateClassTargetCombinations(
  classTargets: QuizClassTarget[],
): Promise<{
  success: boolean;
  error?: string;
}> {
  if (classTargets.length === 0) {
    return { success: true };
  }

  const supabase = getSupabaseAdmin();

  const { data: profiles, error } = await supabase
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

  if (error) {
    logger.error(
      "Errore durante la verifica delle combinazioni " +
        "anno/indirizzo/sezione:",
      error.message,
    );

    return {
      success: false,
      error:
        "Impossibile verificare le combinazioni di classe selezionate.",
    };
  }

  const availableCombinations = new Set<string>();

  for (const profile of profiles ?? []) {
    const schoolTrack = normalizeOptionalText(
      profile.school_track,
    );

    const schoolSection = normalizeOptionalText(
      profile.school_section,
    );

    if (!schoolTrack || !schoolSection) {
      continue;
    }

    const profileClasses = Array.isArray(
      profile.profile_classes,
    )
      ? profile.profile_classes
      : [];

    for (const profileClass of profileClasses) {
      if (!profileClass?.class_id) {
        continue;
      }

      availableCombinations.add(
        `${profileClass.class_id}|${schoolTrack}|${schoolSection}`,
      );
    }
  }

  const invalidTargets = classTargets.filter(
    (target) =>
      !availableCombinations.has(
        `${target.classId}|${target.schoolTrack}|${target.schoolSection}`,
      ),
  );

  if (invalidTargets.length > 0) {
    logger.warn(
      "Sono state richieste combinazioni classe non presenti:",
      {
        invalidTargets,
      },
    );

    return {
      success: false,
      error:
        "Una o più combinazioni anno, indirizzo e sezione " +
        "non corrispondono ad alcuna classe presente nel sistema.",
    };
  }

  return { success: true };
}

/**
 * Assegna un quiz a un corso, modulo/lezione e configura
 * il targeting.
 *
 * Nuovo modello:
 *
 * target_user_type + quiz_class_assignments
 *
 * quiz_class_assignments:
 *
 * quiz_id
 * class_id
 * school_track
 * school_section
 *
 * quiz_assignments contiene esclusivamente:
 *
 * quiz_id
 * course_id
 * due_at
 * is_visible
 *
 * I campi legacy presenti in quizzes vengono mantenuti.
 */
export async function assignQuizAction(
  payload: AssignQuizPayload,
) {
  const supabase = getSupabaseAdmin();

  logger.info(
    "Dati ricevuti dalla Server Action di assegnazione quiz:",
    {
      quizId: payload.quizId,
      courseId: payload.courseId,
      moduleId: payload.moduleId,
      lessonId: payload.lessonId,
      dueDate: payload.dueDate,
      isVisible: payload.isVisible,
      targetUserType: payload.targetUserType,
      classTargets: payload.classTargets,
      classIds: payload.classIds,
      classId: payload.classId,
      schoolTrack: payload.schoolTrack,
      schoolSection: payload.schoolSection,
    },
  );

  const targetUserType = normalizeTargetUserType(
    payload.targetUserType,
  );

  /*
   * Nuovo modello N:M.
   */
  const classTargets = normalizeClassTargets(
    payload.classTargets,
  );

  /*
   * Compatibilità con il precedente modello.
   */
  const legacyClassId =
    payload.classId?.trim() || null;

  const schoolTrack = normalizeOptionalText(
    payload.schoolTrack,
  );

  const schoolSection = normalizeOptionalText(
    payload.schoolSection,
  );

  /*
   * classIds rimane supportato per compatibilità.
   *
   * Se classTargets è presente, rappresenta la fonte completa
   * del nuovo modello.
   *
   * Se classTargets è assente, classIds può ancora rappresentare
   * il precedente modello.
   */
  const classIds = normalizeClassIds(
    payload.classIds,
    payload.classId,
  );

  /*
   * 1. Validazione legacy.
   *
   * Viene eseguita solo quando il chiamante sta utilizzando
   * effettivamente i campi legacy.
   */
  const hasLegacyRestrictionFields = Boolean(
    legacyClassId ||
      schoolTrack ||
      schoolSection,
  );

  if (hasLegacyRestrictionFields) {
    const restrictionError =
      validateClassRestriction(
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
   * 2. Se il nuovo modello è presente, verifica che tutte
   *    le classi macro esistano.
   */
  if (classTargets.length > 0) {
    const classesValidation =
      await validateClassTargetsExist(
        classTargets,
      );

    if (!classesValidation.success) {
      return {
        success: false,
        error:
          classesValidation.error ||
          "Impossibile verificare le classi selezionate.",
      };
    }

    /*
     * Verifica la combinazione completa:
     *
     * classId + track + section
     */
    const combinationsValidation =
      await validateClassTargetCombinations(
        classTargets,
      );

    if (!combinationsValidation.success) {
      return {
        success: false,
        error:
          combinationsValidation.error ||
          "Una o più combinazioni di classe non sono valide.",
      };
    }
  } else if (classIds.length > 0) {
    /*
     * Compatibilità con il vecchio modello classIds.
     *
     * In questo caso verifichiamo almeno l'esistenza delle
     * academy_classes selezionate.
     */
    const classesValidation =
      await validateClassTargetsExist(
        classIds.map((classId) => ({
          classId,
          schoolTrack:
            schoolTrack || "",
          schoolSection:
            schoolSection || "",
        })),
      );

    /*
     * La validazione completa track/section non viene applicata
     * al vecchio payload, perché potrebbe non contenerli.
     */
    if (!classesValidation.success) {
      const { data: academyClasses, error } =
        await supabase
          .from("academy_classes")
          .select("id")
          .in("id", classIds);

      if (error) {
        logger.error(
          "Errore durante la verifica delle classi target:",
          error.message,
        );

        return {
          success: false,
          error:
            "Impossibile verificare le classi selezionate.",
        };
      }

      const existingClassIds = new Set(
        (academyClasses ?? []).map(
          (academyClass) => academyClass.id,
        ),
      );

      const missingClassIds = classIds.filter(
        (classId) =>
          !existingClassIds.has(classId),
      );

      if (missingClassIds.length > 0) {
        return {
          success: false,
          error:
            "Una o più classi selezionate non esistono nel sistema.",
        };
      }
    }
  }

  /*
   * 3. Il nuovo modello richiede che SCHOOL_ONLY e ALL
   *    possano essere associati a zero classi.
   *
   * In tal caso non viene concesso accesso agli SCHOOL_STUDENT.
   *
   * EXTERNAL_STUDENT non richiede classi.
   */
  if (
    (targetUserType === "SCHOOL_ONLY" ||
      targetUserType === "ALL") &&
    classTargets.length === 0 &&
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
   * 4. Verifica legacy.
   *
   * Viene mantenuta esclusivamente per il precedente modello
   * di assegnazione.
   */
  if (
    legacyClassId &&
    schoolTrack &&
    schoolSection &&
    classTargets.length === 0
  ) {
    const { data: matchingStudents, error: studentError } =
      await supabase
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
        .eq(
          "profile_classes.class_id",
          legacyClassId,
        )
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

    if (
      !matchingStudents ||
      matchingStudents.length === 0
    ) {
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
   * target_user_type è la fonte del targeting.
   *
   * I campi legacy vengono mantenuti.
   *
   * Per una nuova assegnazione N:M:
   * - class_id può contenere il valore legacy eventualmente
   *   fornito dal chiamante;
   * - school_track/school_section idem.
   *
   * Non vengono utilizzati per l'autorizzazione del nuovo modello.
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
   * 6. Rimuove tutte le precedenti assegnazioni N:M.
   *
   * Questo permette di trasformare:
   *
   * A + B + C
   *
   * in:
   *
   * A + D
   *
   * senza lasciare B/C nel database.
   */
  const {
    error: deleteAssignmentsError,
  } = await supabase
    .from("quiz_class_assignments")
    .delete()
    .eq("quiz_id", payload.quizId);

  if (deleteAssignmentsError) {
    logger.error(
      "Errore durante la rimozione delle precedenti " +
        "assegnazioni di classe del quiz:",
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
   * IMPORTANTISSIMO:
   *
   * quiz_class_assignments richiede:
   *
   * - quiz_id
   * - class_id
   * - school_track
   * - school_section
   *
   * Non viene più inserito soltanto class_id.
   */
  if (classTargets.length > 0) {
    const assignmentRows =
      classTargets.map((target) => ({
        quiz_id: payload.quizId,
        class_id: target.classId,
        school_track: target.schoolTrack,
        school_section: target.schoolSection,
      }));

    const {
      error: insertAssignmentsError,
    } = await supabase
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
  } else if (
    classIds.length > 0 &&
    legacyClassId &&
    schoolTrack &&
    schoolSection
  ) {
    /*
     * Compatibilità con un chiamante legacy che invia:
     *
     * classIds
     * + classId
     * + schoolTrack
     * + schoolSection
     *
     * In questo caso possiamo ricostruire una sola assegnazione
     * completa in modo sicuro.
     *
     * Non inventiamo track/section per gli altri classIds.
     */
    const assignmentRows = [
      {
        quiz_id: payload.quizId,
        class_id: legacyClassId,
        school_track: schoolTrack,
        school_section: schoolSection,
      },
    ];

    const {
      error: insertLegacyAssignmentError,
    } = await supabase
      .from("quiz_class_assignments")
      .insert(assignmentRows);

    if (insertLegacyAssignmentError) {
      logger.error(
        "Errore durante il salvataggio della compatibilità " +
          "legacy N:M del quiz:",
        insertLegacyAssignmentError.message,
      );

      return {
        success: false,
        error:
          "Impossibile salvare la classe assegnata al quiz.",
      };
    }
  }

  /*
   * 8. Aggiorna i metadati dell'assegnazione al corso.
   *
   * quiz_assignments NON contiene la restrizione di classe.
   *
   * Manteniamo invariati:
   * - quiz_id
   * - course_id
   * - due_at
   * - is_visible
   */
  const {
    error: assignmentError,
  } = await supabase
    .from("quiz_assignments")
    .upsert(
      {
        quiz_id: payload.quizId,
        course_id: payload.courseId,
        due_at: payload.dueDate
          ? new Date(
              payload.dueDate,
            ).toISOString()
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
   *
   * Manteniamo i path già utilizzati.
   */
  revalidatePath(
    `/admin/quiz/${payload.quizId}/analytics`,
  );
  revalidatePath(
    "/admin/quiz",
    "layout",
  );
  revalidatePath(
    "/admin/dashboard",
    "layout",
  );

  return {
    success: true,
  };
}

/**
 * Recupera le classi macro disponibili.
 *
 * academy_classes rappresenta esclusivamente il macro-anno:
 *
 * PRIME, SECONDE, TERZE, QUARTE, QUINTE.
 *
 * Manteniamo questa Server Action per compatibilità con
 * il codice amministrativo esistente.
 */
export async function getAvailableClassesAction() {
  const supabase = getSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .from("academy_classes")
      .select("id, name")
      .order("name", {
        ascending: true,
      });

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
 * La funzione restituisce quindi:
 *
 * {
 *   classId,
 *   className,
 *   schoolTrack,
 *   schoolSection
 * }
 *
 * Ogni combinazione rappresenta una classe scolastica completa.
 */
export async function getAvailableClassTargetsAction() {
  const supabase = getSupabaseAdmin();

  try {
    /*
     * Recuperiamo le macro-classi una sola volta.
     */
    const {
      data: classes,
      error: classesError,
    } = await supabase
      .from("academy_classes")
      .select("id, name")
      .order("name", {
        ascending: true,
      });

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

    /*
     * Recuperiamo le combinazioni effettivamente presenti
     * nei profili scolastici.
     */
    const {
      data: profiles,
      error: profilesError,
    } = await supabase
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
      (classes ?? []).map(
        (academyClass) => [
          academyClass.id,
          academyClass.name,
        ],
      ),
    );

    const uniqueTargets =
      new Map<string, AvailableClassTarget>();

    for (const profile of profiles ?? []) {
      const schoolTrack =
        normalizeOptionalText(
          profile.school_track,
        );

      const schoolSection =
        normalizeOptionalText(
          profile.school_section,
        );

      if (!schoolTrack || !schoolSection) {
        continue;
      }

      const profileClasses =
        Array.isArray(profile.profile_classes)
          ? profile.profile_classes
          : [];

      for (const profileClass of profileClasses) {
        const classId =
          profileClass?.class_id;

        if (!classId) {
          continue;
        }

        const className =
          classNameById.get(classId);

        if (!className) {
          continue;
        }

        const key =
          `${classId}|${schoolTrack}|${schoolSection}`;

        uniqueTargets.set(key, {
          classId,
          className,
          schoolTrack,
          schoolSection,
        });
      }
    }

    const targets =
      Array.from(
        uniqueTargets.values(),
      ).sort((a, b) => {
        const classComparison =
          a.className.localeCompare(
            b.className,
            "it",
            {
              sensitivity: "base",
            },
          );

        if (classComparison !== 0) {
          return classComparison;
        }

        const trackComparison =
          a.schoolTrack.localeCompare(
            b.schoolTrack,
            "it",
            {
              sensitivity: "base",
            },
          );

        if (trackComparison !== 0) {
          return trackComparison;
        }

        return a.schoolSection.localeCompare(
          b.schoolSection,
          "it",
          {
            sensitivity: "base",
          },
        );
      });

    return {
      success: true,
      targets,
    };
  } catch (error) {
    logger.error(
      "Errore imprevisto durante il recupero delle " +
        "combinazioni anno/indirizzo/sezione:",
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
export async function getCourseModulesAction(
  courseId: string,
) {
  const supabase = getSupabaseAdmin();

  const {
    data,
    error,
  } = await supabase
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
    .order("order_index", {
      ascending: true,
    });

  if (error) {
    logger.error(
      `Errore caricamento moduli/lezioni per corso ${courseId}:`,
      error.message,
    );

    /*
     * Manteniamo il fallback già presente.
     */
    const {
      data: modulesOnly,
    } = await supabase
      .from("course_modules")
      .select("id, title")
      .eq("course_id", courseId)
      .order("order_index", {
        ascending: true,
      });

    return {
      success: true,
      modules: modulesOnly ?? [],
    };
  }

  const formattedModules = (
    data ?? []
  ).map((module: any) => ({
    id: module.id,
    title: module.title,
    lessons: module.course_lessons ?? [],
  }));

  return {
    success: true,
    modules: formattedModules,
  };
}