import { IQuizRepository } from "../ports/IQuizRepository";
import { Quiz, QuizStatus } from "../domain/Quiz";
import { QuizQuestion } from "../domain/Question";
import { QuizAttempt } from "../domain/QuizAttempt";
import { QuizAnswer } from "../domain/QuizAnswer";
import { QuizReview } from "../domain/QuizReview";
import { ParsedQuiz } from "../validators/quizValidators";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const supabase = getSupabaseAdmin();

export class SupabaseQuizRepository implements IQuizRepository {
  // ======================================================
  // HELPER AUTOMATICO RISOLUZIONE MODULO
  // ======================================================

  async resolveMainCourseModule(courseId: string): Promise<string | null> {
    const { data: mainModule } = await supabase
      .from("course_modules")
      .select("id, title")
      .eq("course_id", courseId)
      .eq("order_index", 2)
      .maybeSingle();

    if (mainModule?.id) {
      return mainModule.id;
    }

    const { data: modules } = await supabase
      .from("course_modules")
      .select("id, title")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true });

    if (modules && modules.length > 0) {
      const mainByTitle = modules.find(
        (m: any) =>
          !m.title.toLowerCase().includes("preview") &&
          !m.title.toLowerCase().includes("resources"),
      );

      return mainByTitle?.id || modules[0].id;
    }

    return null;
  }

  // ======================================================
  // QUIZ CRUD & MANAGEMENT
  // ======================================================

  async createFromParsed(
    parsedQuiz: ParsedQuiz,
    adminId: string,
    context?: {
      courseId?: string;
      moduleId?: string;
      lessonId?: string;
    },
  ): Promise<Quiz> {
    const courseId =
      context?.courseId || parsedQuiz.metadata.courseId || null;

    let moduleId =
      context?.moduleId || parsedQuiz.metadata.moduleId || null;

    const lessonId =
      context?.lessonId || parsedQuiz.metadata.lessonId || null;

    if (courseId && !moduleId) {
      moduleId = await this.resolveMainCourseModule(courseId);
    }

    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        title: parsedQuiz.metadata.title,
        description: parsedQuiz.metadata.description,
        status: parsedQuiz.metadata.status,
        penalty_enabled: parsedQuiz.metadata.penalty_enabled,
        negative_mark: parsedQuiz.metadata.negative_mark,
        created_by: adminId,
        course_id: courseId,
        module_id: moduleId,
        lesson_id: lessonId,
      })
      .select("*")
      .single();

    if (quizError) {
      throw new Error(`Errore inserimento quiz: ${quizError.message}`);
    }

    for (const q of parsedQuiz.questions) {
      const { data: questionData, error: questionError } = await supabase
        .from("quiz_questions")
        .insert({
          quiz_id: quizData.id,
          type: q.type,
          order_index: q.order_index,
          text: q.text,
          points: q.points,
        })
        .select("*")
        .single();

      if (questionError) {
        throw new Error(
          `Errore inserimento domanda: ${questionError.message}`,
        );
      }

      if (q.type === "multiple_choice" && q.options) {
        const optionsPayload = q.options.map((opt) => ({
          question_id: questionData.id,
          text: opt.text,
          is_correct: opt.is_correct,
        }));

        const { error: optionsError } = await supabase
          .from("quiz_options")
          .insert(optionsPayload);

        if (optionsError) {
          throw new Error(
            `Errore inserimento opzioni: ${optionsError.message}`,
          );
        }
      }
    }

    return this.mapToQuizEntity(quizData);
  }

  async findById(id: string): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? this.mapToQuizEntity(data) : null;
  }

  async findFullQuizStructure(
    quizId: string,
  ): Promise<{ quiz: Quiz; questions: QuizQuestion[] }> {
    const quiz = await this.findById(quizId);

    if (!quiz) {
      throw new Error("Quiz non trovato");
    }

    const { data: questionsData, error } = await supabase
      .from("quiz_questions")
      .select(
        `
        *,
        options:quiz_options(*)
      `,
      )
      .eq("quiz_id", quizId)
      .order("order_index", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const questions: QuizQuestion[] = (questionsData ?? []).map(
      (q: any) => ({
        id: q.id,
        quizId: q.quiz_id,
        type: q.type,
        orderIndex: q.order_index,
        text: q.text,
        points: Number(q.points),
        createdAt: new Date(q.created_at),
        options: q.options?.map((o: any) => ({
          id: o.id,
          questionId: o.question_id,
          text: o.text,
          isCorrect: o.is_correct,
        })),
      }),
    );

    return {
      quiz,
      questions,
    };
  }

  async findAll(): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((q: any) => this.mapToQuizEntity(q));
  }

  async updateStatus(id: string, status: QuizStatus): Promise<void> {
    const { error } = await supabase
      .from("quizzes")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async assignToCourse(
    quizId: string,
    courseId: string,
    moduleId?: string,
    lessonId?: string,
  ): Promise<void> {
    let resolvedModuleId = moduleId;

    if (!resolvedModuleId) {
      resolvedModuleId =
        (await this.resolveMainCourseModule(courseId)) ?? undefined;
    }

    const { error } = await getSupabaseAdmin()
      .from("quizzes")
      .update({
        course_id: courseId,
        module_id: resolvedModuleId ?? null,
        lesson_id: lessonId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", quizId);

    if (error) {
      logger.error(
        `Errore durante l'assegnazione del quiz ${quizId} al corso ${courseId}:`,
        error,
      );

      throw new Error(`Impossibile associare il quiz: ${error.message}`);
    }
  }

  async removeFromCourse(
    quizId: string,
    courseId: string,
  ): Promise<void> {
    const { error: updateError } = await supabase
      .from("quizzes")
      .update({
        course_id: null,
        module_id: null,
        lesson_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", quizId);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  async findActiveQuizzesByCourse(courseId: string): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("course_id", courseId)
      .eq("status", "active")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((item: any) =>
      this.mapToQuizEntity(item),
    );
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("quizzes")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // ======================================================
  // STUDENT ATTEMPTS
  // ======================================================

  async createAttempt(
    quizId: string,
    studentId: string,
  ): Promise<QuizAttempt> {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .insert({
        quiz_id: quizId,
        student_id: studentId,
        status: "submitted",
        auto_score: 0.0,
        teacher_score: 0.0,
        final_score: 0.0,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapToAttemptEntity(data);
  }

  async saveAttemptSubmission(
    attemptId: string,
    answers: Omit<QuizAnswer, "id" | "createdAt">[],
    autoScore: number,
  ): Promise<QuizAttempt> {
    const answersPayload = answers.map((ans) => ({
      attempt_id: attemptId,
      question_id: ans.questionId,
      selected_option_id: ans.selectedOptionId,
      open_answer_text: ans.openAnswerText,
      is_correct: ans.isCorrect,
      score: ans.score,
    }));

    const { error: answersError } = await supabase
      .from("quiz_answers")
      .insert(answersPayload);

    if (answersError) {
      throw new Error(answersError.message);
    }

    const { data: attemptData, error: attemptError } = await supabase
      .from("quiz_attempts")
      .update({
        auto_score: autoScore,
        final_score: autoScore,
        completed_at: new Date().toISOString(),
      })
      .eq("id", attemptId)
      .select("*")
      .single();

    if (attemptError) {
      throw new Error(attemptError.message);
    }

    return this.mapToAttemptEntity(attemptData);
  }

  async hasStudentAttempted(
    quizId: string,
    studentId: string,
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("id")
      .eq("quiz_id", quizId)
      .eq("student_id", studentId)
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).length > 0;
  }

  async findAttemptById(
    attemptId: string,
  ): Promise<QuizAttempt | null> {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("id", attemptId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? this.mapToAttemptEntity(data) : null;
  }

  async findAnswersByAttemptId(
    attemptId: string,
  ): Promise<QuizAnswer[]> {
    const { data, error } = await supabase
      .from("quiz_answers")
      .select(
        `
        id,
        attempt_id,
        question_id,
        selected_option_id,
        open_answer_text,
        is_correct,
        score,
        created_at
      `,
      )
      .eq("attempt_id", attemptId);

    if (error) {
      throw new Error(
        "Errore recupero risposte tentativo: " + error.message,
      );
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      attemptId: row.attempt_id,
      questionId: row.question_id,
      selectedOptionId: row.selected_option_id ?? undefined,
      openAnswerText: row.open_answer_text ?? undefined,
      isCorrect: row.is_correct ?? undefined,
      score: Number(row.score),
      createdAt: new Date(row.created_at),
    }));
  }

  async findAttemptsByQuizId(
    quizId: string,
  ): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("quiz_id", quizId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((a: any) =>
      this.mapToAttemptEntity(a),
    );
  }

  // ======================================================
  // TEACHER REVIEW
  // ======================================================

  async submitReviewAndGrade(
    review: Omit<QuizReview, "id" | "reviewedAt">,
    finalScore: number,
  ): Promise<QuizAttempt> {
    const { error: reviewError } = await supabase
      .from("quiz_reviews")
      .insert({
        attempt_id: review.attemptId,
        teacher_id: review.teacherId,
        question_id: review.questionId,
        score: review.score,
        comment: review.comment,
      });

    if (reviewError) {
      throw new Error(reviewError.message);
    }

    const { error: answerError } = await supabase
      .from("quiz_answers")
      .update({
        score: review.score,
        is_correct: review.score > 0,
      })
      .eq("attempt_id", review.attemptId)
      .eq("question_id", review.questionId);

    if (answerError) {
      throw new Error(answerError.message);
    }

    const { data: attemptData, error: attemptError } = await supabase
      .from("quiz_attempts")
      .update({
        teacher_score: review.score,
        final_score: finalScore,
        status: "graded",
      })
      .eq("id", review.attemptId)
      .select("*")
      .single();

    if (attemptError) {
      throw new Error(attemptError.message);
    }

    return this.mapToAttemptEntity(attemptData);
  }

  async findReviewByAttemptAndQuestion(
    attemptId: string,
    questionId: string,
  ): Promise<QuizReview | null> {
    const { data, error } = await supabase
      .from("quiz_reviews")
      .select("*")
      .eq("attempt_id", attemptId)
      .eq("question_id", questionId)
      .maybeSingle();

    if (error) {
      throw new Error(
        "Errore recupero valutazione manuale: " + error.message,
      );
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      attemptId: data.attempt_id,
      teacherId: data.teacher_id,
      questionId: data.question_id,
      score: Number(data.score),
      comment: data.comment ?? undefined,
      reviewedAt: new Date(data.reviewed_at),
    };
  }

  async findReviewsByAttemptId(
    attemptId: string,
  ): Promise<QuizReview[]> {
    const { data, error } = await supabase
      .from("quiz_reviews")
      .select("*")
      .eq("attempt_id", attemptId)
      .order("reviewed_at", { ascending: false });

    if (error) {
      throw new Error(
        "Errore recupero storico valutazioni: " + error.message,
      );
    }

    return (data ?? []).map((review) => ({
      id: review.id,
      attemptId: review.attempt_id,
      teacherId: review.teacher_id,
      questionId: review.question_id,
      score: Number(review.score),
      comment: review.comment ?? undefined,
      reviewedAt: new Date(review.reviewed_at),
    }));
  }

  async updateReviewAndGrade(
    reviewId: string,
    review: Omit<QuizReview, "id" | "reviewedAt">,
    finalScore: number,
  ): Promise<QuizAttempt> {
    const { error: reviewError } = await supabase
      .from("quiz_reviews")
      .update({
        score: review.score,
        comment: review.comment,
      })
      .eq("id", reviewId);

    if (reviewError) {
      throw new Error(reviewError.message);
    }

    const { error: answerError } = await supabase
      .from("quiz_answers")
      .update({
        score: review.score,
        is_correct: review.score > 0,
      })
      .eq("attempt_id", review.attemptId)
      .eq("question_id", review.questionId);

    if (answerError) {
      throw new Error(answerError.message);
    }

    const { data: attemptData, error: attemptError } = await supabase
      .from("quiz_attempts")
      .update({
        teacher_score: review.score,
        final_score: finalScore,
        status: "graded",
      })
      .eq("id", review.attemptId)
      .select("*")
      .single();

    if (attemptError) {
      throw new Error(attemptError.message);
    }

    return this.mapToAttemptEntity(attemptData);
  }

  // ======================================================
  // ANALYTICS & STATS
  // ======================================================

  async getGlobalQuizStats(): Promise<{
    totalCreated: number;
    totalPublished: number;
    totalCompleted: number;
    pendingReviewsCount: number;
    averageScore: number;
  }> {
    const { data, error } = await supabase
      .rpc("get_quiz_global_stats")
      .single();

    if (error) {
      throw new Error(
        "Errore recupero statistiche globali quiz: " + error.message,
      );
    }

    const stats = data as {
      total_created?: number | string;
      total_published?: number | string;
      total_completed?: number | string;
      pending_reviews_count?: number | string;
      average_score?: number | string;
    } | null;

    return {
      totalCreated: Number(stats?.total_created ?? 0),
      totalPublished: Number(stats?.total_published ?? 0),
      totalCompleted: Number(stats?.total_completed ?? 0),
      pendingReviewsCount: Number(
        stats?.pending_reviews_count ?? 0,
      ),
      averageScore: Number(stats?.average_score ?? 0.0),
    };
  }

  async getVotesDistribution(): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("final_score");

    if (error) {
      throw new Error(error.message);
    }

    const distribution = {
      "0-3": 0,
      "4-6": 0,
      "7-8": 0,
      "9-10": 0,
    };

    (data ?? []).forEach((item: any) => {
      const score = Number(item.final_score);

      if (score <= 3) {
        distribution["0-3"]++;
      } else if (score <= 6) {
        distribution["4-6"]++;
      } else if (score <= 8) {
        distribution["7-8"]++;
      } else {
        distribution["9-10"]++;
      }
    });

    return distribution;
  }

  async getMostFailedQuestions(
    limit = 5,
  ): Promise<
    {
      questionId: string;
      questionText: string;
      errorCount: number;
    }[]
  > {
    const { data, error } = await supabase.rpc(
      "get_most_failed_questions",
      {
        limit_count: limit,
      },
    );

    if (error) {
      throw new Error(
        "Errore recupero domande con piu errori: " + error.message,
      );
    }

    const rows =
      (data as
        | {
            question_id: string;
            question_text: string;
            error_count: number | string;
          }[]
        | null) ?? [];

    return rows.map((row) => ({
      questionId: row.question_id,
      questionText:
        row.question_text || "Domanda sconosciuta",
      errorCount: Number(row.error_count),
    }));
  }

  // ======================================================
  // QUIZ ATTIVI PER CORSO E CLASSE
  //
  // NOTA:
  // La vecchia implementazione utilizzava
  // quiz_assignments.target_class.
  //
  // target_class è stato identificato come campo legacy/errato
  // e viene quindi completamente eliminato.
  //
  // L'autorizzazione precisa per:
  //   class_id + school_track + school_section
  //
  // viene gestita dal livello applicativo che conosce
  // l'identità e il profilo dello studente.
  //
  // Questo metodo mantiene la firma esistente per evitare
  // regressioni nell'IQuizRepository e nei chiamanti esistenti.
  // ======================================================

  async findActiveQuizzesByCourseAndClass(
    courseId: string,
    studentClass?: string | string[],
  ): Promise<Quiz[]> {
    let query = supabase
      .from("quizzes")
      .select(
        `
        *,
        quiz_assignments!inner(
          is_visible
        )
      `,
      )
      .eq("course_id", courseId)
      .eq("status", "active")
      .eq("quiz_assignments.is_visible", true);

    /*
     * Quiz senza restrizione di classe:
     *
     * class_id IS NULL
     * school_track IS NULL
     * school_section IS NULL
     *
     * Quiz con restrizione:
     * la verifica completa della tripletta
     *
     *   class_id + school_track + school_section
     *
     * viene eseguita dal service che dispone del profilo
     * dello studente.
     *
     * Qui filtriamo esclusivamente per class_id quando
     * studentClass è stato fornito, preservando la firma
     * e la compatibilità con i chiamanti esistenti.
     */

    if (Array.isArray(studentClass)) {
      const classIds = studentClass
        .map((value) => value.trim())
        .filter(Boolean);

      if (classIds.length > 0) {
        query = query.or(
          `class_id.is.null,class_id.in.(${classIds.join(",")})`,
        );
      } else {
        query = query.is("class_id", null);
      }
    } else if (
      typeof studentClass === "string" &&
      studentClass.trim() !== ""
    ) {
      query = query.or(
        `class_id.is.null,class_id.eq.${studentClass.trim()}`,
      );
    } else {
      query = query.is("class_id", null);
    }

    const { data, error } = await query.order("created_at", {
      ascending: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((item: any) =>
      this.mapToQuizEntity(item),
    );
  }

  // ======================================================
  // PRIVATE MAPPERS
  // ======================================================

  private mapToQuizEntity(q: any): Quiz {
    return {
      id: q.id,
      title: q.title,
      description: q.description ?? undefined,
      status: q.status,
      penaltyEnabled: q.penalty_enabled ?? false,
      negativeMark: Number(q.negative_mark ?? 0.25),
      maxScore: Number(q.max_score ?? 10),
      passingScore: Number(q.passing_score ?? 60),
      courseId: q.course_id ?? undefined,
      moduleId: q.module_id ?? undefined,
      lessonId: q.lesson_id ?? undefined,
      classId: q.class_id ?? undefined,
      schoolTrack: q.school_track ?? undefined,   
      schoolSection: q.school_section ?? undefined,   
      createdBy: q.created_by ?? undefined,
      createdAt: new Date(q.created_at),
      updatedAt: new Date(q.updated_at),
    };
  }

  private mapToAttemptEntity(a: any): QuizAttempt {
    return {
      id: a.id,
      quizId: a.quiz_id,
      studentId: a.student_id,
      startedAt: new Date(a.started_at),
      completedAt: a.completed_at
        ? new Date(a.completed_at)
        : undefined,
      autoScore: Number(a.auto_score),
      teacherScore: Number(a.teacher_score),
      finalScore: Number(a.final_score),
      status: a.status,
      xpAwarded: a.xp_awarded ?? false,
      createdAt: new Date(a.created_at),
    };
  }
}
