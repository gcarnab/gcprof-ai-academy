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
 * Verifica l'accesso diretto al quiz basato sulla tripletta:
 * class_id + school_track + school_section
 *
 * Regole:
 * - Nessun vincolo impostato sul quiz -> accesso libero agli utenti autenticati;
 * - Admin -> accesso sempre consentito;
 * - Quiz vincolato -> consentito solo agli SCHOOL_STUDENT che soddisfano i vincoli.
 */
async function assertQuizAccess(
  quiz: Quiz,
  session: UserSession,
): Promise<void> {
  const classId = quiz.classId ?? null;
  const schoolTrack = quiz.schoolTrack ?? null;
  const schoolSection = quiz.schoolSection ?? null;

  // 1. Nessun vincolo sulla tripletta: accesso consentito
  if (!classId && !schoolTrack && !schoolSection) {
    return;
  }

  // 2. Amministratori: accesso sempre consentito
  if (session.role === "admin") {
    return;
  }

  if (session.role !== "student") {
    throw new Error("Accesso negato.");
  }

  const supabase = getSupabaseAdmin();

  // Recupera il profilo dello studente (senza selezionare class_id direttamente da profiles)
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

  const userType = String(profile.user_type || "").toUpperCase();

  if (userType !== "SCHOOL_STUDENT") {
    throw new Error(
      "Accesso negato: questo quiz è riservato agli studenti scolastici.",
    );
  }

  // 3. Controllo Classe (class_id) tramite la tabella associativa profile_classes
  if (classId) {
    const { data: membership, error: classError } = await supabase
      .from("profile_classes")
      .select("profile_id")
      .eq("profile_id", session.id)
      .eq("class_id", classId)
      .maybeSingle();

    if (classError) {
      logger.error(
        `Errore verifica appartenenza classe ${classId} per utente ${session.id}:`,
        classError.message,
      );
    }

    if (!membership) {
      throw new Error(
        "Accesso negato: questo quiz è riservato a un'altra classe.",
      );
    }
  }

  // 4. Controllo Indirizzo Scolastico (school_track)
  if (schoolTrack && profile.school_track !== schoolTrack) {
    throw new Error(
      "Accesso negato: questo quiz è riservato a un altro indirizzo scolastico.",
    );
  }

  // 5. Controllo Sezione (school_section)
  if (schoolSection && profile.school_section !== schoolSection) {
    throw new Error(
      "Accesso negato: questo quiz è riservato a un'altra sezione.",
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