import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lessonId, moduleId, title, description, passingScore, questions } = body;

    if (!lessonId || !title || !questions || questions.length === 0) {
      return NextResponse.json({ success: false, error: "Dati incompleti" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Inserisci il quiz principale
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        title,
        description: description || null,
        passing_score: passingScore || 80
      })
      .select("id")
      .single();

    if (quizError || !quizData) {
      return NextResponse.json({ success: false, error: "Errore inserimento quiz: " + quizError?.message }, { status: 500 });
    }

    const quizId = quizData.id;

    // 2. Prepara e inserisci le domande legate al quiz appena creato
    const formattedQuestions = questions.map((q: any) => ({
      quiz_id: quizId,
      question_text: q.question_text,
      options: q.options.filter((opt: string) => opt.trim() !== ""), // Rimuove opzioni vuote accidentali
      correct_option_index: q.correct_option_index,
      points: q.points || 10
    }));

    const { error: questionsError } = await supabase
      .from("quiz_questions")
      .insert(formattedQuestions);

    if (questionsError) {
      return NextResponse.json({ success: false, error: "Errore inserimento domande: " + questionsError.message }, { status: 500 });
    }

    // 3. Collega in automatico il quizId generato all'interno della riga della lezione corrente
    const { error: lessonError } = await supabase
      .from("course_lessons") // Assicurati che il nome tabella combaci con la Server Action (es: course_lessons o lessons)
      .update({ quiz_id: quizId })
      .eq("id", lessonId);

    if (lessonError) {
      // Fallback se la tabella si chiama 'lessons' invece di 'course_lessons'
      await supabase.from("lessons").update({ quiz_id: quizId }).eq("id", lessonId);
    }

    return NextResponse.json({ success: true, quizId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}