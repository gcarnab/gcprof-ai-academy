"use server";

import { getSupabaseAdmin } from "@/lib/supabase";

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

  const { data: existingProgress } = await supabase
    .from("profile_lessons_progress")
    .select("is_completed")
    .eq("profile_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (existingProgress?.is_completed) {
    return {
      success: true,
      xpGained: 0,
      newBadge: null,
    };
  }

  await supabase.from("profile_lessons_progress").upsert({
    profile_id: userId,
    lesson_id: lessonId,
    course_id: courseId,
    is_completed: true,
    completed_at: new Date().toISOString(),
    last_accessed_at: new Date().toISOString(),
  });

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp,current_level")
    .eq("id", userId)
    .single();

  const currentXp = profile?.total_xp ?? 0;
  const xpGained = 50;
  const newXp = currentXp + xpGained;
  const newLevel = calculateLevel(newXp);

  await supabase
    .from("profiles")
    .update({
      total_xp: newXp,
      current_level: newLevel,
    })
    .eq("id", userId);

  const { count: completedCount } = await supabase
    .from("profile_lessons_progress")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("profile_id", userId)
    .eq("is_completed", true);

  let unlockedBadge = null;

  if (completedCount === 1) {
    await supabase.from("user_badges").insert({
      profile_id: userId,
      badge_id: "first_lesson",
      unlocked_at: new Date().toISOString(),
    });

    unlockedBadge = "Primo Passo nell'AI";
  }

  return {
    success: true,
    xpGained,
    newTotalXp: newXp,
    newLevel,
    unlockedBadge,
  };
}

// ======================================================
// COMPLETAMENTO QUIZ
// Viene chiamata SOLO quando il docente conclude
// definitivamente la correzione.
// ======================================================

interface QuizCompletedPayload {
  userId: string;
  quizId: string;
  finalScore: number;
}

export async function onQuizCompletedAction(payload: QuizCompletedPayload) {
  const { userId, quizId, finalScore } = payload;
  const supabase = getSupabaseAdmin();

  // Evita doppia assegnazione XP
  const { data: reward } = await supabase
    .from("profile_quiz_rewards")
    .select("id")
    .eq("profile_id", userId)
    .eq("quiz_id", quizId)
    .maybeSingle();

  if (reward) {
    return {
      success: true,
      alreadyRewarded: true,
      xpGained: 0,
    };
  }

  let xpGained = 20;

  if (finalScore >= 9) {
    xpGained = 100;
  } else if (finalScore >= 8) {
    xpGained = 80;
  } else if (finalScore >= 7) {
    xpGained = 60;
  } else if (finalScore >= 6) {
    xpGained = 40;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp,current_level")
    .eq("id", userId)
    .single();

  const currentXp = profile?.total_xp ?? 0;
  const newTotalXp = currentXp + xpGained;
  const newLevel = calculateLevel(newTotalXp);

  await supabase
    .from("profiles")
    .update({
      total_xp: newTotalXp,
      current_level: newLevel,
    })
    .eq("id", userId);

  await supabase.from("profile_quiz_rewards").insert({
    profile_id: userId,
    quiz_id: quizId,
    xp_awarded: xpGained,
    final_score: finalScore,
    created_at: new Date().toISOString(),
  });

  return {
    success: true,
    xpGained,
    newTotalXp,
    newLevel,
    alreadyRewarded: false,
  };
}