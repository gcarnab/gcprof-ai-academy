"use server";

import { logger } from "@/lib/logger";
import { PasswordResetService } from "../services/PasswordResetService";

export async function validateResetTokenAction(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const resetService = new PasswordResetService();
    const userId = await resetService.validateToken(token);
    
    // Ritorna true se il token è valido e associato a un utente, altrimenti false
    return !!userId;
  } catch (error) {
    logger.error("❌ Errore durante la validazione del token:", error);
    return false;
  }
}