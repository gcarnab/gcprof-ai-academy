"use server";

import { revalidatePath } from "next/cache";
import { SupabaseQuizRepository } from "../repositories/SupabaseQuizRepository";
import { parseQuizMarkdown } from "../markdown/parser/quizParser";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { sendQuizSubmittedMail } from "./quizMailActions";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

// Gamification, Badge e Certificati
import { onQuizCompletedAction } from "@/features/gamification/actions/awardXpAction";
import { unlockQuizBadge } from "@/features/gamification/actions/badgeActions";
import { CertificateAutoIssueService } from "@/features/certificates/services/CertificateAutoIssueService";

const quizRepository = new SupabaseQuizRepository();
const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();
const autoIssueService = new CertificateAutoIssueService();

interface UserSession {
  id: string;
  email: string;
  role: "admin" | "student";
}

async function getAuthenticatedSession(
  requiredRole?: "admin" | "student",
): Promise<UserSession> {
  const token = await cookieService.getSession();

  if (!token) {
    throw new Error("Non autorizzato: Sessione mancante.");
  }

  const payload = (await tokenService.verify(token)) as UserSession | null;

  if (!payload) {
    throw new Error("Non autorizzato: Token non valido.");
  }

  if (
    requiredRole &&
    payload.role !== requiredRole &&
    payload.role !== "admin"
  ) {
    throw new Error(`Accesso negato: Richiesto ruolo ${requiredRole}.`);
  }

  return payload;
}

/**
 * Verifica server-side l'accesso di uno studente ad un quiz
 * secondo il nuovo modello di targeting:
 *
 * - EXTERNAL_STUDENT:
 *   consentito soltanto agli studenti esterni;
 *
 * - SCHOOL_ONLY:
 *   consentito soltanto agli studenti scolastici appartenenti
 *   ad almeno una delle classi assegnate al quiz;
 *
 * - ALL:
 *   consentito agli studenti esterni;
 *   consentito agli studenti scolastici appartenenti
 *   ad almeno una delle classi assegnate al quiz.
 *
 * Per gli studenti scolastici:
 * - zero assegnazioni -> accesso negato;
 * - almeno una assegnazione corrispondente -> accesso consentito;
 * - nessuna assegnazione corrispondente -> accesso negato.
 *
 * L'identità completa della classe è:
 * - class_id
 * - school_track
 * - school_section
 *
 * I campi legacy class_id / school_track / school_section
 * non vengono più utilizzati come regola primaria di accesso
 * dal record quizzes: la regola primaria è quiz_class_assignments.
 *
 * Nessun dato proveniente dal client viene considerato attendibile.
 */
async function assertStudentCanAccessQuiz(
  quiz: any,
  studentId: string,
): Promise<void> {
  const targetUserType =
    quiz?.targetUserType ?? quiz?.target_user_type ?? "ALL";

  const supabase = getSupabaseAdmin();

  // 1. Recupera dal profilo:
  //    - tipo di utente
  //    - indirizzo scolastico
  //    - sezione scolastica
  //
  //    school_track e school_section sono parte integrante
  //    dell'identità della classe.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("user_type, school_track, school_section")
    .eq("id", studentId)
    .maybeSingle();

  if (profileError) {
    logger.error(
      `Errore verifica profilo per lo studente ${studentId}`,
      profileError,
    );

    throw new Error("Impossibile verificare il profilo dello studente.");
  }

  if (!profile) {
    throw new Error("Profilo dello studente non trovato.");
  }

  const userType = String(profile.user_type ?? "").toUpperCase();

  const studentSchoolTrack = String(profile.school_track ?? "")
    .trim()
    .toUpperCase();

  const studentSchoolSection = String(profile.school_section ?? "")
    .trim()
    .toUpperCase();

  // 2. Studente esterno:
  //    EXTERNAL_STUDENT e ALL sono consentiti.
  //    SCHOOL_ONLY è negato.
  if (userType === "EXTERNAL_STUDENT") {
    if (targetUserType === "EXTERNAL_STUDENT" || targetUserType === "ALL") {
      return;
    }

    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti scolastici.",
    );
  }

  // 3. Qualsiasi tipo diverso da SCHOOL_STUDENT viene negato.
  if (userType !== "SCHOOL_STUDENT") {
    throw new Error("Accesso negato.");
  }

  // 4. Un quiz EXTERNAL_STUDENT non è accessibile agli studenti scolastici.
  if (targetUserType === "EXTERNAL_STUDENT") {
    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti esterni.",
    );
  }

  // 5. Recupera tutte le classi dello studente.
  //
  //    profile_classes contiene class_id.
  //    school_track e school_section vengono dal profilo perché
  //    completano l'identità della classe scolastica.
  const { data: profileClasses, error: profileClassesError } = await supabase
    .from("profile_classes")
    .select("class_id")
    .eq("profile_id", studentId);

  if (profileClassesError) {
    logger.error(
      `Errore verifica classi per lo studente ${studentId}`,
      profileClassesError,
    );

    throw new Error("Impossibile verificare le classi dello studente.");
  }

  const studentClassIds = (profileClasses ?? [])
    .map((item: { class_id: string | null }) => item.class_id)
    .filter(
      (classId): classId is string =>
        typeof classId === "string" && classId.length > 0,
    );

  // 6. Recupera le assegnazioni complete del quiz.
  //
  //    NON è sufficiente class_id:
  //
  //    QUARTA LSA B
  //    QUARTA LSA A
  //    QUARTA INF A
  //
  //    possono condividere lo stesso academy_classes.id.
  //
  //    L'assegnazione viene quindi verificata usando:
  //    class_id + school_track + school_section.
  const { data: quizClassAssignments, error: assignmentsError } = await supabase
    .from("quiz_class_assignments")
    .select("class_id, school_track, school_section")
    .eq("quiz_id", quiz.id);

  if (assignmentsError) {
    logger.error(
      `Errore verifica assegnazioni di classe per il quiz ${quiz.id}`,
      assignmentsError,
    );

    throw new Error(
      "Impossibile verificare le assegnazioni di classe del quiz.",
    );
  }

  const assignedClassAssignments = (quizClassAssignments ?? [])
    .map(
      (item: {
        class_id: string | null;
        school_track: string | null;
        school_section: string | null;
      }) => ({
        classId: item.class_id,
        schoolTrack: String(item.school_track ?? "")
          .trim()
          .toUpperCase(),
        schoolSection: String(item.school_section ?? "")
          .trim()
          .toUpperCase(),
      }),
    )
    .filter(
      (
        assignment,
      ): assignment is {
        classId: string;
        schoolTrack: string;
        schoolSection: string;
      } =>
        typeof assignment.classId === "string" &&
        assignment.classId.length > 0 &&
        assignment.schoolTrack.length > 0 &&
        assignment.schoolSection.length > 0,
    );

  // 7. Per SCHOOL_ONLY e ALL, nessuna assegnazione significa
  //    esplicitamente accesso negato agli studenti scolastici.
  if (assignedClassAssignments.length === 0) {
    throw new Error(
      "Accesso negato: questo quiz non è assegnato a nessuna delle tue classi.",
    );
  }

  // 8. N:M con identità completa della classe:
  //
  //    class_id
  //    +
  //    school_track
  //    +
  //    school_section
  //
  //    Deve esistere almeno una assegnazione del quiz che
  //    corrisponda esattamente alla classe dello studente.
  const hasMatchingClass = assignedClassAssignments.some(
    (assignment) =>
      studentClassIds.includes(assignment.classId) &&
      assignment.schoolTrack === studentSchoolTrack &&
      assignment.schoolSection === studentSchoolSection,
  );

  if (!hasMatchingClass) {
    throw new Error(
      "Accesso negato: questo quiz è riservato ad un'altra classe.",
    );
  }
}

// ======================================================
// HELPER PER EMISSIONE AUTOMATICA CERTIFICATO & GAMIFICATION
// ======================================================

async function processGamificationAndCertificates(
  userId: string,
  quizId: string,
  quiz: any,
  finalScore: number,
): Promise<{ success: boolean; certificate?: any; error?: string }> {
  try {
    await onQuizCompletedAction({
      userId,
      quizId,
      finalScore,
    });

    let courseId = quiz?.courseId || quiz?.course_id;
    let moduleId = quiz?.moduleId || quiz?.module_id;
    const lessonId = quiz?.lessonId || quiz?.lesson_id;

    // Sblocco del badge passando direttamente quizId e courseId
    await unlockQuizBadge(userId, quizId, courseId);

    // Fallback difensivo centralizzato: usa la risoluzione del repository
    if (!moduleId && courseId) {
      moduleId =
        (await quizRepository.resolveMainCourseModule(courseId)) ?? undefined;
    }

    if (!courseId || !moduleId) {
      logger.warn(
        "⚠️ Impossibile emettere certificato: courseId o moduleId mancanti nel record del quiz",
        { quizId, courseId, moduleId },
      );

      return {
        success: false,
        error: "Dati corso/modulo mancanti nel quiz. Controllare le relazioni.",
      };
    }

    const maxScore = Number(quiz?.maxScore ?? 10);
    const scorePercentage = (finalScore / maxScore) * 100;

    const certResult = await autoIssueService.processAndIssue({
      userId,
      courseId,
      moduleId,
      lessonId,
      title: quiz?.title
        ? `Attestato: ${quiz.title}`
        : "Certificato di Completamento Modulo",
      subtitle: `Modulo superato con esito positivo (Voto: ${finalScore.toFixed(
        2,
      )} / ${maxScore})`,
      score: scorePercentage,
      completionPercentage: 100,
    });

    return {
      success: true,
      certificate: certResult?.certificate,
    };
  } catch (error: any) {
    logger.error(
      "❌ Errore durante l'elaborazione di Gamification/Certificati:",
      error,
    );

    return {
      success: false,
      error: error.message || "Errore sconosciuto.",
    };
  }
}

// ======================================================
// ADMIN ACTIONS
// ======================================================

export async function importQuizFromMarkdownAction(
  rawMarkdown: string,
  context?: {
    courseId?: string;
    moduleId?: string;
    lessonId?: string;
  },
) {
  try {
    const adminSession = await getAuthenticatedSession("admin");
    const parsedQuiz = await parseQuizMarkdown(rawMarkdown);

    // Trasmette il contesto esterno per disaccoppiare gli ID dal file .md
    const newQuiz = await quizRepository.createFromParsed(
      parsedQuiz,
      adminSession.id,
      context,
    );

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
      quizId: newQuiz.id,
    };
  } catch (error: any) {
    logger.error("Errore durante l'importazione del quiz da Markdown", error);

    return {
      success: false,
      error: error.message || "Errore sconosciuto durante l'importazione.",
    };
  }
}

export async function updateQuizStatusAction(
  quizId: string,
  status: "draft" | "active",
) {
  try {
    await getAuthenticatedSession("admin");

    await quizRepository.updateStatus(quizId, status);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
    };
  } catch (error: any) {
    logger.error(`Errore aggiornamento stato quiz ${quizId}`, error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function assignQuizToCourseAction(
  quizId: string,
  courseId: string,
  moduleId?: string,
  lessonId?: string,
) {
  try {
    await getAuthenticatedSession("admin");

    await quizRepository.assignToCourse(quizId, courseId, moduleId, lessonId);

    revalidatePath("/admin/quiz", "layout");
    revalidatePath("/admin/dashboard", "layout");

    return {
      success: true,
    };
  } catch (error: any) {
    logger.error(
      `Errore assegnazione quiz ${quizId} al corso ${courseId}`,
      error,
    );

    return {
      success: false,
      error: error.message,
    };
  }
}

// ======================================================
// STUDENT ACTIONS
// ======================================================

interface StudentAnswerInput {
  questionId: string;
  selectedOptionId?: string;
  openAnswerText?: string;
}

export async function submitStudentAttemptAction(
  quizId: string,
  userAnswers: StudentAnswerInput[],
) {
  try {
    const studentSession = await getAuthenticatedSession("student");

    /**
     * Il quiz viene recuperato PRIMA del controllo del tentativo
     * per poter verificare l'eventuale restrizione di classe.
     *
     * Questo controllo è server-side e non dipende dalla UI.
     */
    const { quiz, questions } =
      await quizRepository.findFullQuizStructure(quizId);

    /**
     * Controllo obbligatorio dell'accesso alla classe e tripletta.
     *
     * Deve avvenire prima di:
     * - hasStudentAttempted()
     * - calcolo del punteggio
     * - createAttempt()
     */
    await assertStudentCanAccessQuiz(quiz, studentSession.id);

    const alreadyAttempted = await quizRepository.hasStudentAttempted(
      quizId,
      studentSession.id,
    );

    if (alreadyAttempted) {
      throw new Error("Hai già sottomesso un tentativo per questo quiz.");
    }

    let calculatedAutoScore = 0.0;
    let wrongClosedAnswers = 0;
    let hasOpenQuestions = false;

    const finalAnswersPayload: any[] = [];

    for (const q of questions) {
      const studentAns = userAnswers.find((ua) => ua.questionId === q.id);

      if (q.type === "multiple_choice") {
        const correctOption = q.options?.find((o) => o.isCorrect);

        const isCorrect = correctOption?.id === studentAns?.selectedOptionId;

        let scoreForQuestion = 0;

        if (isCorrect) {
          scoreForQuestion = Number(q.points);
          calculatedAutoScore += scoreForQuestion;
        } else if (studentAns?.selectedOptionId) {
          wrongClosedAnswers++;
        }

        finalAnswersPayload.push({
          questionId: q.id,
          selectedOptionId: studentAns?.selectedOptionId,
          isCorrect,
          score: scoreForQuestion,
        });
      } else {
        hasOpenQuestions = true;

        finalAnswersPayload.push({
          questionId: q.id,
          openAnswerText: studentAns?.openAnswerText || "",
          isCorrect: null,
          score: 0,
        });
      }
    }

    if (quiz.penaltyEnabled) {
      const penaltyPerWrong = Math.abs(Number(quiz.negativeMark));

      calculatedAutoScore -= wrongClosedAnswers * penaltyPerWrong;
    }

    calculatedAutoScore = Math.max(0, calculatedAutoScore);

    const attempt = await quizRepository.createAttempt(
      quizId,
      studentSession.id,
    );

    await quizRepository.saveAttemptSubmission(
      attempt.id,
      finalAnswersPayload,
      calculatedAutoScore,
    );

    const { data: studentProfile } = await getSupabaseAdmin()
      .from("profiles")
      .select("first_name,last_name,display_name")
      .eq("id", studentSession.id)
      .single();

    await sendQuizSubmittedMail(studentSession.email, {
      first_name: studentProfile?.first_name ?? "",
      last_name: studentProfile?.last_name ?? "",
      display_name: studentProfile?.display_name ?? "",
      quiz_title: quiz.title,
      auto_score: calculatedAutoScore.toFixed(2),
      quiz_status: hasOpenQuestions
        ? "In attesa della correzione della domanda aperta"
        : "Completato",
    });

    let certResult = null;

    if (!hasOpenQuestions) {
      certResult = await processGamificationAndCertificates(
        studentSession.id,
        quizId,
        quiz,
        calculatedAutoScore,
      );
    }

    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/courses", "layout");

    return {
      success: true,
      attemptId: attempt.id,
      autoScore: calculatedAutoScore,
      hasOpenQuestions,
      certificate: certResult?.certificate || null,
    };
  } catch (error: any) {
    logger.error(
      "Errore durante la sottomissione del tentativo dello studente",
      error,
    );

    return {
      success: false,
      error: error.message || "Errore durante il salvataggio delle risposte.",
    };
  }
}