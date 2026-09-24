"use server";

import { Quiz } from "../domain/Quiz";
import { QuizQuestion } from "../domain/Question";
import { getQuizRepository } from "../repositories/QuizRepositoryFactory";
import { getSupabaseAdmin } from "@/lib/supabase";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { logger } from "@/lib/logger";

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

interface UserSession {
  id: string;
  email: string;
  role: "admin" | "student";
}

interface StudentProfileClass {
  class_id: string | null;
}

interface QuizClassAssignment {
  class_id: string | null;
  school_track: string | null;
  school_section: string | null;
}

/**
 * Recupera e valida la sessione corrente dal cookie HttpOnly.
 */
async function getAuthenticatedSession(): Promise<UserSession> {
  const token = await cookieService.getSession();

  if (!token) {
    throw new Error("Non autorizzato: sessione mancante.");
  }

  const payload = (await tokenService.verify(token)) as UserSession | null;

  if (!payload?.id || !payload?.role) {
    throw new Error("Non autorizzato: token non valido.");
  }

  return payload;
}

/**
 * Verifica l'accesso diretto al quiz secondo il nuovo modello:
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
 *   consentito agli studenti scolastici soltanto se appartenenti
 *   ad almeno una delle classi assegnate al quiz.
 *
 * Un quiz scolastico senza assegnazioni di classe non è accessibile
 * agli studenti scolastici.
 *
 * Gli amministratori mantengono sempre l'accesso.
 *
 * I campi legacy classId, schoolTrack e schoolSection sono mantenuti
 * nel dominio per compatibilità e rollback, ma non costituiscono
 * più la regola primaria di autorizzazione.
 */
async function assertQuizAccess(
  quiz: Quiz,
  session: UserSession,
): Promise<void> {
  // 1. Gli amministratori mantengono il bypass esistente.
  if (session.role === "admin") {
    return;
  }

  if (session.role !== "student") {
    throw new Error("Accesso negato.");
  }

  const targetUserType = quiz.targetUserType ?? "ALL";
  const supabase = getSupabaseAdmin();

  // 2. Recupero del tipo di utente e dell'identità scolastica
  //    dal profilo.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("user_type, school_track, school_section")
    .eq("id", session.id)
    .maybeSingle();

  if (profileError) {
    logger.error(
      `Errore Supabase recupero profilo per utente ${session.id}:`,
      profileError.message,
    );

    throw new Error(
      `Impossibile verificare il profilo dello studente: ${profileError.message}`,
    );
  }

  if (!profile) {
    throw new Error(`Profilo utente non trovato per l'ID: ${session.id}`);
  }

  const userType = String(profile.user_type ?? "").toUpperCase();
  const studentSchoolTrack = String(profile.school_track ?? "")
    .trim()
    .toUpperCase();
  const studentSchoolSection = String(profile.school_section ?? "")
    .trim()
    .toUpperCase();

  // 3. Gli studenti esterni possono accedere soltanto ai quiz
  //    EXTERNAL_STUDENT oppure ALL.
  if (userType === "EXTERNAL_STUDENT") {
    if (
      targetUserType === "EXTERNAL_STUDENT" ||
      targetUserType === "ALL"
    ) {
      return;
    }

    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti scolastici.",
    );
  }

  // 4. Gli studenti scolastici non possono accedere ai quiz
  //    EXTERNAL_STUDENT.
  if (userType !== "SCHOOL_STUDENT") {
    throw new Error("Accesso negato.");
  }

  if (targetUserType === "EXTERNAL_STUDENT") {
    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti esterni.",
    );
  }

  // 5. Recupero delle classi appartenenti allo studente.
  //
  //    class_id identifica soltanto il livello macro (es. QUARTA).
  //    L'identità completa della classe è:
  //
  //      class_id + school_track + school_section
  //
  //    school_track e school_section vengono quindi recuperati
  //    dal profilo e confrontati con l'assegnazione del quiz.
  const { data: profileClasses, error: profileClassesError } =
    await supabase
      .from("profile_classes")
      .select("class_id")
      .eq("profile_id", session.id);

  if (profileClassesError) {
    logger.error(
      `Errore recupero classi dello studente ${session.id}:`,
      profileClassesError.message,
    );

    throw new Error(
      `Impossibile verificare le classi dello studente: ${profileClassesError.message}`,
    );
  }

  const studentClassIds = (profileClasses ?? [])
    .map((item: StudentProfileClass) => item.class_id)
    .filter(
      (classId): classId is string =>
        typeof classId === "string" && classId.length > 0,
    );

  // 6. Recupero delle assegnazioni complete del quiz.
  //
  //    Non è sufficiente confrontare soltanto class_id perché,
  //    ad esempio, QUARTA LSA B e QUARTA INF A possono condividere
  //    lo stesso academy_classes.id.
  const { data: quizClassAssignments, error: assignmentsError } =
    await supabase
      .from("quiz_class_assignments")
      .select("class_id, school_track, school_section")
      .eq("quiz_id", quiz.id);

  if (assignmentsError) {
    logger.error(
      `Errore recupero assegnazioni di classe per il quiz ${quiz.id}:`,
      assignmentsError.message,
    );

    throw new Error(
      `Impossibile verificare le assegnazioni del quiz: ${assignmentsError.message}`,
    );
  }

  const assignedClassAssignments = (
    quizClassAssignments ?? []
  )
    .map((item: QuizClassAssignment) => ({
      classId: item.class_id,
      schoolTrack: String(item.school_track ?? "")
        .trim()
        .toUpperCase(),
      schoolSection: String(item.school_section ?? "")
        .trim()
        .toUpperCase(),
    }))
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

  // 7. Per SCHOOL_ONLY e ALL, uno studente scolastico deve
  //    appartenere ad almeno una classe completa assegnata al quiz.
  //
  //    Nessuna assegnazione => accesso negato.
  if (assignedClassAssignments.length === 0) {
    throw new Error(
      "Accesso negato: questo quiz non è assegnato a nessuna delle tue classi.",
    );
  }

  const hasMatchingClass = assignedClassAssignments.some(
    (assignment) =>
      studentClassIds.includes(assignment.classId) &&
      assignment.schoolTrack === studentSchoolTrack &&
      assignment.schoolSection === studentSchoolSection,
  );

  if (!hasMatchingClass) {
    throw new Error(
      "Accesso negato: questo quiz è riservato a un'altra classe.",
    );
  }
}

export async function getQuizForStudent(quizId: string) {
  const repository = getQuizRepository();

  const session = await getAuthenticatedSession();

  const result = await repository.findFullQuizStructure(quizId);

  await assertQuizAccess(result.quiz, session);

  const questions: QuizQuestion[] = result.questions.map((question) => ({
    ...question,
    options: question.options ?? [],
  }));

  return {
    quiz: result.quiz,
    questions,
  };
}