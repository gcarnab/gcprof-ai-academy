"use server";

import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { PasswordResetService } from "../services/PasswordResetService";
import { BcryptPasswordService } from "../infrastructure/BcryptPasswordService";

export async function confirmPasswordResetAction(
  prevState: any,
  formData: FormData,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  
  if (!token || !password) {
    return {
      success: false,
      error: "Token o password mancanti.",
    };
  }

  try {
    const resetService = new PasswordResetService();
    const repo = getUserRepository();
    // 💡 1. Istanziamo l'Adapter corretto invece di usare bcrypt direttamente
    const passwordService = new BcryptPasswordService();

    // 2. Validazione token
    const userId = await resetService.validateToken(token);

    if (!userId) {
      return {
        success: false,
        error: "Token non valido o scaduto.",
      };
    }

    // 3. Hash password tramite la porta architetturale
    const hashedPassword = await passwordService.hash(password);

    // 💡 4. FAIL-SAFE: Invalidiamo il token PRIMA dell'aggiornamento.
    // Se il server va in crash qui, la password non cambia ma il token brucia.
    // Nessun rischio di Replay Attack.
    await resetService.markAsUsed(token);

    // 5. Aggiornamento utente
    const user = await repo.findById(userId);

    if (!user) {
      return {
        success: false,
        error: "Utente non trovato.",
      };
    }

    await repo.update(userId, {
      passwordHash: hashedPassword,
    });

    return {
      success: true,
      message: "Password aggiornata con successo.",
    };
  } catch (error: any) {
    console.error("❌ Errore confirmPasswordResetAction:", error);

    return {
      success: false,
      error: "Errore durante l'aggiornamento della password.",
    };
  }
}