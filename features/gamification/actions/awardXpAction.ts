"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { unlockQuizBadge } from "./badgeActions";

// ======================================================
// CALCOLO LIVELLO
// ======================================================

function calculateLevel(xp: number): number {
  if (xp >= 1000) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;
  return 1;
}

// ======================================================
// COMPLETAMENTO LEZIONE
// ======================================================

interface LessonCompletedPayload {
  userId: string;
  lessonId: string;
  courseId: string;
}

export async function onLessonCompletedAction(payload: LessonCompletedPayload) {
  const { userId, lessonId, courseId } = payload;
  const supabase = getSupabaseAdmin();

  // Evita doppia assegnazione XP
  const { data: existingProgress } = await supabase
    .from("profile_lessons_progress")
    .select("is_completed")
    .eq("profile_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existingProgress?.is_completed) {
    return {
      success: true,
      xpGained: 0,
      newTotalXp: null,
      newLevel: null,
    };
  }

  // Salvataggio completamento lezione
  await supabase.from("profile_lessons_progress").upsert({
    profile_id: userId,
    lesson_id: lessonId,
    course_id: courseId,
    is_completed: true,
    completed_at: new Date().toISOString(),
    last_accessed_at: new Date().toISOString(),
  });

  // Recupero XP correnti
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp,current_level")
    .eq("id", userId)
    .single();

  const currentXp = profile?.total_xp ?? 0;

  // ======================================================
  // XP LEZIONE
  // ======================================================

  const xpGained = 50;

  const newTotalXp = currentXp + xpGained;
  const newLevel = calculateLevel(newTotalXp);

  await supabase
    .from("profiles")
    .update({
      total_xp: newTotalXp,
      current_level: newLevel,
    })
    .eq("id", userId);
 
  return {
    success: true,
    xpGained,
    newTotalXp,
    newLevel,
  };
}

// ======================================================
// COMPLETAMENTO QUIZ
// ======================================================

interface QuizCompletedPayload {
  userId: string;
  quizId: string;
  finalScore: number;
}

export async function onQuizCompletedAction(payload: QuizCompletedPayload) {
  const { userId, quizId, finalScore } = payload;
  const supabase = getSupabaseAdmin();

  // ======================================================
  // EVITA DOPPIA ASSEGNAZIONE XP
  // ======================================================

  const { data: rewardedAttempt } = await supabase
    .from("quiz_attempts")
    .select("id")
    .eq("student_id", userId)
    .eq("quiz_id", quizId)
    .eq("xp_awarded", true)
    .maybeSingle();

  if (rewardedAttempt) {
    return {
      success: true,
      alreadyRewarded: true,
      xpGained: 0,
      newTotalXp: null,
      newLevel: null,
    };
  }

  // ======================================================
  // CALCOLO XP IN BASE AL VOTO FINALE
  // ======================================================

  let xpGained = 20;

  if (finalScore >= 9) {
    xpGained = 20;
  } else if (finalScore >= 8) {
    xpGained = 15;
  } else if (finalScore >= 7) {
    xpGained = 10;
  } else if (finalScore >= 6) {
    xpGained = 5;
  }

  // ======================================================
  // RECUPERO PROFILO
  // ======================================================

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp,current_level")
    .eq("id", userId)
    .single();

  const currentXp = profile?.total_xp ?? 0;

  const newTotalXp = currentXp + xpGained;
  const newLevel = calculateLevel(newTotalXp);

  // ======================================================
  // AGGIORNAMENTO PROFILO
  // ======================================================

  await supabase
    .from("profiles")
    .update({
      total_xp: newTotalXp,
      current_level: newLevel,
    })
    .eq("id", userId);

  // ======================================================
  // REGISTRAZIONE PREMIO QUIZ
  // Imposta il flag xp_awarded sul tentativo del quiz
  // ======================================================

  await supabase
    .from("quiz_attempts")
    .update({ xp_awarded: true })
    .eq("quiz_id", quizId)
    .eq("student_id", userId);

  // ======================================================
  // SBLOCCO BADGE QUIZ
  // ======================================================

  const badgeResult = await unlockQuizBadge(userId, quizId);

  // ======================================================
  // NOTA IMPORTANTE
  // ======================================================
  //
  // Questo metodo assegna ESCLUSIVAMENTE gli XP.
  //
  // Il badge del quiz NON viene assegnato qui.
  //
  // L'assegnazione del badge deve essere effettuata
  // tramite:
  //
  //    unlockQuizBadge(...)
  //
  // definita in:
  //
  // features/gamification/actions/badgeActions.ts
  //
  // che utilizzerà una RPC SQL dedicata
  // (es. award_quiz_badge) mantenendo tutta la
  // logica dei badge centralizzata in un unico punto.
  // ======================================================

  return {
    success: true,
    alreadyRewarded: false,

    xpGained,
    newTotalXp,
    newLevel,

    badgeUnlocked: badgeResult.success && !badgeResult.alreadyUnlocked,

    badge: badgeResult.success
      ? {
          title: badgeResult.badgeTitle,
          icon: badgeResult.badgeIcon,
          xpGained: badgeResult.xpGained,
        }
      : null,
  };
}
