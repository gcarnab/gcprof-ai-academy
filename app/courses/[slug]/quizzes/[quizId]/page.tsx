import { notFound } from "next/navigation";
import Link from "next/link";

import { getQuizForStudent } from "@/features/quiz/actions/getQuizAction";
import { QuizViewer } from "@/features/quiz/components/QuizViewer";

interface CourseQuizPageProps {
  params: Promise<{
    slug: string;
    quizId: string;
  }>;
}

export default async function CourseQuizPage({ params }: CourseQuizPageProps) {
  const { slug: courseSlug, quizId } = await params;

  const data = await getQuizForStudent(quizId);

  if (!data.quiz) {
    return notFound();
  }

  return (
    <main
      className="
        container 
        max-w-5xl 
        mx-auto 
        py-8 
        px-4
      "
    >
      <div className="mb-6">
        <Link
          href={`/courses/${courseSlug}`}
          className="
            text-sm 
            font-medium
            text-muted-foreground
            hover:text-primary
            transition-colors
          "
        >
          ← Torna al corso
        </Link>
      </div>

      <QuizViewer quiz={data.quiz} questions={data.questions} />
    </main>
  );
}
