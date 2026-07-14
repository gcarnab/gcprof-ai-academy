// gcprof-ai-academy\app\admin\quiz\[id]\analytics\page.tsx
import { getSupabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import QuizAnalyticsDashboard from "@/features/admin/dashboard/components/QuizAnalyticsDashboard";
import Link from "next/link";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import AssignQuizButton from "@/features/quiz/components/AssignQuizButton";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface AdminQuizAnalyticsPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminQuizAnalyticsPage({
  params,
}: AdminQuizAnalyticsPageProps) {
  const { id: quizId } = await params;
  const supabase = getSupabaseAdmin();

  // 1. Dettagli Quiz
  const { data: quizData, error: quizError } = await supabase
    .from("quizzes")
    .select(
      "id, title, description, status, penalty_enabled, negative_mark, max_score",
    )
    .eq("id", quizId)
    .single();

  if (quizError || !quizData) {
    console.error("Errore dettagli quiz:", quizError?.message);
    return notFound();
  }

  // 2. Recupero dei Corsi Reali dal Database per popolare il dropdown
  const { data: coursesData, error: coursesError } = await supabase
    .from("courses") // Assicurati che la tabella si chiami 'courses' o adatta il nome
    .select("id, title")
    .order("title", { ascending: true });

  if (coursesError) {
    console.error("Errore nel recupero dei corsi:", coursesError.message);
  }

  const courses = coursesData || [];
  const maxScore = Number(quizData.max_score) || 10.0;
  const passingScore = maxScore * 0.6;

  const quiz = {
    id: quizData.id,
    title: quizData.title,
    description: quizData.description,
    status: quizData.status,
    penalty_enabled: quizData.penalty_enabled,
    negative_mark: Number(quizData.negative_mark),
    max_score: maxScore,
    passing_score: passingScore,
  };

  // 3. Tentativi Studenti
  const { data: rawAttempts, error: attemptsError } = await supabase
    .from("quiz_attempts")
    .select(
      `
      id, 
      started_at, 
      completed_at, 
      final_score, 
      status,
        profiles (
        id, 
        display_name, 
        first_name, 
        last_name, 
        email,     
        profile_classes (
          academy_classes (
            id,
            name
          )
        )
      )
    `,
    )
    .eq("quiz_id", quizId)
    .order("completed_at", { ascending: false });

  if (attemptsError) {
    console.error("Errore tentativi studenti:", attemptsError.message);
  }

  const { data: assignment } = await supabase
    .from("quiz_assignments")
    .select(
      `
      course_id,
      courses(
        id,
        title
      )
  `,
    )
    .eq("quiz_id", quizId)
    .limit(1)
    .maybeSingle();

  const normalizedAttempts = (rawAttempts || []).map((attempt: any) => {
    const profileData = Array.isArray(attempt.profiles) ? attempt.profiles[0] : attempt.profiles;
    const computedFullName =
      profileData?.display_name ||
      (profileData?.first_name && profileData?.last_name ? `${profileData.first_name} ${profileData.last_name}`: "") ||
      (profileData?.email ? profileData.email.split("@")[0] : "Studente");

    return {
      id: attempt.id,
      score: Number(attempt.final_score) || 0,
      passed: (Number(attempt.final_score) || 0) >= passingScore,
      started_at: attempt.started_at,
      completed_at: attempt.completed_at,
      status: attempt.status,
      profiles: profileData
        ? {
            id: profileData.id,
            full_name: computedFullName,
            email: profileData.email || "",
            class_name: profileData.profile_classes?.[0]?.academy_classes?.name || "",
          }
        : null,
    };
  });

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <Navbar />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-3">
        <Link
          href="/admin/dashboard"
          className="hover:text-primary transition-colors"
        >
          Dashboard Admin
        </Link>

        <ChevronRight className="h-4 w-4" />

        <Link
          href="/admin/dashboard?tab=quizzes"
          className="hover:text-primary transition-colors"
        >
          Quiz
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-foreground">Analytics</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Admin Analytics
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {quiz.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <AssignQuizButton
            quizId={quiz.id}
            quizTitle={quiz.title}
            courses={courses}
          />

          <Button asChild>
            <Link href={`/admin/quiz/${quiz.id}/review`}>Correggi Quiz</Link>
          </Button>
        </div>
      </div>

      <QuizAnalyticsDashboard
        quiz={quiz as any}
        attempts={normalizedAttempts}
      />

      <Footer />
    </div>
  );
}
