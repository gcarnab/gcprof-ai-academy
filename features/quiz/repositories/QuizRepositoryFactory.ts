import { IQuizRepository } from "../ports/IQuizRepository";
import { SupabaseQuizRepository } from "./SupabaseQuizRepository";


let repository: IQuizRepository | null = null;


export function getQuizRepository(): IQuizRepository {

  if (!repository) {
    repository = new SupabaseQuizRepository();
  }


  return repository;
}