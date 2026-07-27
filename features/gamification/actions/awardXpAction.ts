"use server";

import { getSupabaseAdmin } from "@/lib/supabase";

// Esempio soglie livello: Livello 1 = 0-99 XP, Livello 2 = 100-249 XP, Livello 3 = 250+ XP
function calculateLevel(xp: number): number {
  if (xp >= 1000) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;
  return 1;
}

export async function onLessonCompletedAction(userId: string, lessonId: string, courseId: string) {
  const supabase = getSupabaseAdmin();

  // 1. Verifichiamo se la lezione era già stata completata in precedenza
  const { data: existingProgress } = await supabase
    .from("profile_lessons_progress")
    .select("is_completed")
    .eq("profile_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  // Se era già completata, non riassegniamo XP
  if (existingProgress?.is_completed) {
    return { success: true, xpGained: 0, newBadge: null };
  }

  // 2. Segnamo la lezione come completata
  await supabase
    .from("profile_lessons_progress")
    .upsert({
      profile_id: userId,
      lesson_id: lessonId,
      course_id: courseId,
      is_completed: true,
      completed_at: new Date().toISOString(),
      last_accessed_at: new Date().toISOString(),
    });

  // 3. Leggiamo gli XP attuali dell'utente
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp, current_level")
    .eq("id", userId)
    .single();

  const currentXp = profile?.total_xp || 0;
  const xpGained = 50; // 50 XP per ogni lezione completata
  const newXp = currentXp + xpGained;
  const newLevel = calculateLevel(newXp);

  // 4. Aggiorniamo il profilo con i nuovi XP e Livello
  await supabase
    .from("profiles")
    .update({
      total_xp: newXp,
      current_level: newLevel,
    })
    .eq("id", userId);

  // 5. Controllo ed eventuale sblocco Badge (Es. "Prima Lezione Completata")
  const { count: completedCount } = await supabase
    .from("profile_lessons_progress")
    .select("id", { count: "exact", head: true })
    .eq("profile_id", userId)
    .eq("is_completed", true);

  let unlockedBadge = null;

  // Se è la prima lezione in assoluto sblocchiamo il Badge con ID "first_lesson"
  if (completedCount === 1) {
    const { data: badgeData } = await supabase
      .from("user_badges")
      .insert({ profile_id: userId, badge_id: "first_lesson", unlocked_at: new Date().toISOString() })
      .select()
      .single();
    
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