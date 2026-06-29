import { users } from "../data/users";

export interface SessionUser {
  id: string;
  username: string;
  role: "admin" | "student";
  class?: string;
}

/**
 * LOGIN FILE-BASED
 */
export function login(username: string, password: string) {
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) return null;

  const sessionUser: SessionUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    class: user.class,
  };

  localStorage.setItem("session", JSON.stringify(sessionUser));

  return sessionUser;
}

/**
 * GET SESSION
 */
export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("session");

  if (!data) return null;

  return JSON.parse(data);
}

/**
 * LOGOUT
 */
export function logout() {
  localStorage.removeItem("session");
}
