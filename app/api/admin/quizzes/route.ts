import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      passingScore = 60,
      courseId,
      moduleId,
      lessonId,
      questions = [],
      status = "active",
      penaltyEnabled = false,
      negativeMark = 0.25,
    } = body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Dati incompleti: titolo e domande sono obbligatori." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 1. Inserimento Quiz principale
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        title,
        description: description || null,
        passing_score: passingScore,
        status,
        penalty_enabled: penaltyEnabled,
        negative_mark: negativeMark,
        course_id: courseId || null,
        module_id: moduleId || null,
        lesson_id: lessonId || null,
      })
      .select("id")
      .single();

    if (quizError || !quizData) {
      return NextResponse.json(
        { success: false, error: `Errore inserimento quiz: ${quizError?.message}` },
        { status: 500 }
      );
    }

    const quizId = quizData.id;

    // 2. Inserimento Domande e Opzioni
    for (let index = 0; index < questions.length; index++) {
      const q = questions[index];
      const questionText = q.text || q.question_text || "";
      const points = q.points ?? 10;
      const questionType = q.type || (q.options ? "multiple_choice" : "open");

      const { data: questionData, error: questionError } = await supabase
        .from("quiz_questions")
        .insert({
          quiz_id: quizId,
          text: questionText,
          type: questionType,
          order_index: q.order_index ?? index + 1,
          points,
        })
        .select("id")
        .single();

      if (questionError || !questionData) {
        return NextResponse.json(
          { success: false, error: `Errore inserimento domanda ${index + 1}: ${questionError?.message}` },
          { status: 500 }
        );
      }

      // Gestione opzioni risposta multipla
      if (Array.isArray(q.options) && q.options.length > 0) {
        const optionsPayload = q.options
          .filter((opt: any) => (typeof opt === "string" ? opt.trim() !== "" : true))
          .map((opt: any, optIdx: number) => {
            if (typeof opt === "string") {
              return {
                question_id: questionData.id,
                text: opt,
                is_correct: q.correct_option_index === optIdx,
              };
            }
            return {
              question_id: questionData.id,
              text: opt.text,
              is_correct: opt.is_correct ?? opt.isCorrect ?? false,
            };
          });

        if (optionsPayload.length > 0) {
          const { error: optionsError } = await supabase
            .from("quiz_options")
            .insert(optionsPayload);

          if (optionsError) {
            return NextResponse.json(
              { success: false, error: `Errore inserimento opzioni per domanda ${index + 1}: ${optionsError.message}` },
              { status: 500 }
            );
          }
        }
      }
    }

    // 3. Associazione bidirezionale alla lezione (se fornito lessonId)
    if (lessonId) {
      const { error: lessonError } = await supabase
        .from("course_lessons")
        .update({ quiz_id: quizId })
        .eq("id", lessonId);

      if (lessonError) {
        await supabase
          .from("lessons")
          .update({ quiz_id: quizId })
          .eq("id", lessonId);
      }
    }

    return NextResponse.json({ success: true, quizId });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Errore interno del server" },
      { status: 500 }
    );
  }
}