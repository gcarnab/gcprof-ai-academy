"use server";


import { QuizQuestion } from "../domain/Question";
import { getQuizRepository } from "../repositories/QuizRepositoryFactory";


export async function getQuizForStudent(quizId: string) {

  const repository = getQuizRepository();

  const result = await repository.findFullQuizStructure(
    quizId
  );


  const questions: QuizQuestion[] =
    result.questions.map((question) => ({
      ...question,
      options: question.options ?? [],
    }));


  return {
    quiz: result.quiz,
    questions,
  };
}