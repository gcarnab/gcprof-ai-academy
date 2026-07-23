import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { ITokenPayload } from "@/features/auth/ports/ITokenService";

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

type GuardResult =
  | { success: true; user: ITokenPayload }
  | { success: false; error: string };

/**
 * Recupera e verifica il payload dell'utente dalla sessione nei cookie.
 */
export async function getAuthenticatedUser(): Promise<ITokenPayload | null> {
  try {
    const token = await cookieService.getSession();
    if (!token) return null;
    return await tokenService.verify(token);
  } catch {
    return null;
  }
}

/**
 * Guard per Server Actions riservate agli AMMINISTRATORI.
 */
export async function requireAdminGuard(): Promise<GuardResult> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      success: false,
      error: "Non autorizzato. Effettua il login per proseguire.",
    };
  }

  if (user.role !== "admin") {
    return {
      success: false,
      error: "Accesso negato. Permessi di amministratore richiesti.",
    };
  }

  return { success: true, user };
}

/**
 * Guard per Server Actions accessibili a QUALSIASI utente autenticato (studente o admin).
 */
export async function requireAuthGuard(): Promise<GuardResult> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      success: false,
      error: "Non autorizzato. Effettua il login per proseguire.",
    };
  }

  return { success: true, user };
}