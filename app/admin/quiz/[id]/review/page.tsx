import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { getSupabaseAdmin } from "@/lib/supabase";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import { TeacherQuizDashboard } from "@/features/quiz/components/TeacherQuizDashboard";

import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizReviewPage({ params }: Props) {
  const { id: quizId } = await params;

  const supabase = getSupabaseAdmin();

  /**
   * ============================================================
   * Quiz
   * ============================================================
   */

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", quizId)
    .single();

  if (!quiz) {
    notFound();
  }

  /**
   * ============================================================
   * Domanda aperta
   * (il progetto prevede UNA SOLA domanda aperta)
   * ============================================================
   */

  const { data: openQuestion } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId)
    .eq("type", "open_ended")
    .single();

  if (!openQuestion) {
    notFound();
  }

  /**
   * ============================================================
   * Tentativi
   * ============================================================
   */

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select(
      `
      *,
      profiles(
        email
      )
      `,
    )
    .eq("quiz_id", quizId)
    .order("completed_at", {
      ascending: false,
    });

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-6">

        {/* =======================================================
            Breadcrumb
        ======================================================== */}

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

          <Link
            href={`/admin/quiz/${quiz.id}/analytics`}
            className="hover:text-primary transition-colors"
          >
            {quiz.title}
          </Link>

          <ChevronRight className="h-4 w-4" />

          <span className="font-medium text-foreground">
            Correzione
          </span>

        </nav>

        {/* =======================================================
            Header
        ======================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b pb-5">

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Admin Correzione Quiz
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              {quiz.title}
            </h1>

            {quiz.description && (
              <p className="text-muted-foreground mt-2 max-w-3xl">
                {quiz.description}
              </p>
            )}

          </div>

          <div className="flex items-center gap-2">

            <Button
              asChild
              variant="outline"
            >
              <Link href={`/admin/quiz/${quiz.id}/analytics`}>
                ← Torna ad Analytics
              </Link>
            </Button>

          </div>

        </div>

        {/* =======================================================
            Dashboard Correzione
        ======================================================== */}

        <TeacherQuizDashboard
          quiz={{
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            status: quiz.status,
            penaltyEnabled: quiz.penalty_enabled,
            negativeMark: Number(quiz.negative_mark),
            maxScore: Number(quiz.max_score),
            passingScore: Number(quiz.passing_score ?? 60),
            createdBy: quiz.created_by,
            createdAt: new Date(quiz.created_at),
            updatedAt: new Date(quiz.updated_at),
          }}
          openQuestion={{
            id: openQuestion.id,
            quizId: openQuestion.quiz_id,
            type: openQuestion.type,
            orderIndex: openQuestion.order_index,
            text: openQuestion.text,
            points: Number(openQuestion.points),
            createdAt: new Date(openQuestion.created_at),
          }}
          attempts={(attempts ?? []).map((attempt: any) => ({
            id: attempt.id,
            quizId: attempt.quiz_id,
            studentId: attempt.student_id,
            startedAt: new Date(attempt.started_at),
            completedAt: attempt.completed_at
              ? new Date(attempt.completed_at)
              : undefined,
            autoScore: Number(attempt.auto_score),
            teacherScore: Number(attempt.teacher_score),
            finalScore: Number(attempt.final_score),
            status: attempt.status,
            createdAt: new Date(attempt.created_at),
            studentEmail: attempt.profiles?.email ?? "Studente",
          }))}
        />
      </main>

      <Footer />
    </>
  );
}