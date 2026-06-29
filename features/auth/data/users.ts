/**
 * ============================================================================
 * FILE-BASED USERS DATABASE
 * ============================================================================
 */

export type UserRole = "admin" | "student";

export interface User {
  id: string;
  username: string;
  password: string; // ⚠️ solo demo (NON sicuro)
  role: UserRole;
  class?: string; // es: "3A", "4B"
}

export const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: "2",
    username: "user1",
    password: "user1",
    role: "student",
    class: "1A,1B", 
  },
  {
    id: "3",
    username: "user2",
    password: "user2",
    role: "student",
    class: "2A,2B",
  },
];