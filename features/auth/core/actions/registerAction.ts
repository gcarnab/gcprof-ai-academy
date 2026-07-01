"use server";

import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "../infrastructure/BcryptPasswordService";
import { JoseTokenService } from "../infrastructure/JoseTokenService";
import { AuthService } from "../services/AuthService";
import { AuthError } from "../errors/AuthError";
import { registerStudentSchema } from "../validators/AuthValidators";

export async function registerAction(prevState: any, formData: FormData) {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    passwordRaw: formData.get("password") as string,
    studentClass: formData.get("studentClass") as string,
  };

  // Validazione Zod stringente
  const validationResult = registerStudentSchema.safeParse(rawData);

  if (!validationResult.success) {
    // 🎯 FIX: Sostituito .errors con .issues per la conformità formale a Zod
    return { success: false, error: validationResult.error.issues[0].message };
  }

  try {
    const authService = new AuthService(
      getUserRepository(),
      new BcryptPasswordService(),
      new JoseTokenService()
    );

    await authService.register(validationResult.data);
    return { success: true, message: "Registrazione completata! Adesso puoi effettuare il login." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Impossibile completare la registrazione." };
  }
}