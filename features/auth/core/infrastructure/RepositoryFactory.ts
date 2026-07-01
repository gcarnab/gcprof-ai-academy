import { IUserRepository } from "../ports/IUserRepository";
//import { MemoryUserRepository } from "./MemoryUserRepository";
import { SupabaseUserRepository } from "./SupabaseUserRepository";

let cachedRepository: IUserRepository | null = null;

export function getUserRepository(): IUserRepository {
  if (!cachedRepository) {
    // In futuro basterà sostituire MemoryUserRepository con KVUserRepository o PrismaUserRepository
    //cachedRepository = new MemoryUserRepository();
    
    // 🎯 SWITCH REALE V2: Configurato l'adapter definitivo per Supabase PostgreSQL
    cachedRepository = new SupabaseUserRepository();
  }
  return cachedRepository;
}