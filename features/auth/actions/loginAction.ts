"use server";

import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "../infrastructure/BcryptPasswordService";
import { JoseTokenService } from "../infrastructure/JoseTokenService";
import { NextCookieService } from "../infrastructure/NextCookieService";
import { AuthService } from "../services/AuthService";
import { AuthError } from "../errors/AuthError";
import { loginCredentialsSchema } from "../validators/AuthValidators";
import { TrackingService } from "@/features/admin/tracking/services/trackingService";

export async function loginAction(prevState: any, formData: FormData) {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const validationResult = loginCredentialsSchema.safeParse({
    email: rawEmail,
    passwordRaw: rawPassword,
  });

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.issues[0].message };
  }

  try {
    const authService = new AuthService(
      getUserRepository(),
      new BcryptPasswordService(),
      new JoseTokenService(),
    );

    const result = await authService.login(validationResult.data);

    // 🎯 PROTEZIONE LOGIN: Impedisce l'accesso immediato se l'utente è stato bloccato
    if (result.user && result.user.status === "blocked") {
      return {
        success: false,
        error: "Questo account è stato bloccato dall'amministratore.",
      };
    }

    const cookieService = new NextCookieService();
    await cookieService.setSession(result.token);

    // Tracking accesso
    await TrackingService.createSession(result.user.id);

    // 🎯 FIX: Sanificazione per evitare il crash di serializzazione di Next.js
    // Trasforma l'entità di dominio ricca (o istanze Supabase con Date) in un oggetto JSON letterale puro.
    const plainUser = JSON.parse(JSON.stringify(result.user));

    return { success: true, user: plainUser };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "Errore interno del server. Riprova più tardi.",
    };
  }
}
