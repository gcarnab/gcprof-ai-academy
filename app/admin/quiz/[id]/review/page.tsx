import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { TeacherQuizDashboard } from "@/features/quiz/components/TeacherQuizDashboard";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizReviewPage({ params }: Props) {
  const { id: quizId } = await params;

  const supabase = getSupabaseAdmin();

  // Quiz
  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", quizId)
    .single();

  if (!quiz) notFound();

  // Domanda aperta
  const { data: openQuestion } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId)
    .eq("type", "open_ended")
    .single();

  if (!openQuestion) notFound();

  // Tentativi
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
    .order("completed_at", { ascending: false });

  return (
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
      attempts={(attempts ?? []).map((a: any) => ({
        id: a.id,
        quizId: a.quiz_id,
        studentId: a.student_id,
        startedAt: new Date(a.started_at),
        completedAt: a.completed_at ? new Date(a.completed_at) : undefined,
        autoScore: Number(a.auto_score),
        teacherScore: Number(a.teacher_score),
        finalScore: Number(a.final_score),
        status: a.status,
        createdAt: new Date(a.created_at),
        studentEmail: a.profiles?.email ?? "Studente",
      }))}
    />
  );
}
