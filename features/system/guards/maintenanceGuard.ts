import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { COOKIE_CONSTANTS } from "@/features/auth/constants/CookieConstants";
import { TOKEN_CONSTANTS } from "@/features/auth/constants/TokenConstants";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { logger } from "@/lib/logger";

import { SupabaseSystemSettingsRepository } from "../repositories/SupabaseSystemSettingsRepository";
import { SystemSettingsService } from "../services/SystemSettingsService";

export class MaintenanceModeError extends Error {
  constructor() {
    super("Il sito è temporaneamente in manutenzione.");
    this.name = "MaintenanceModeError";
  }
}

async function getSystemSettingsService(): Promise<SystemSettingsService> {
  const repository = new SupabaseSystemSettingsRepository();

  return new SystemSettingsService(repository);
}

export async function isMaintenanceModeEnabled(): Promise<boolean> {
  try {
    const service = await getSystemSettingsService();
    const settings = await service.getMaintenanceSettings();

    return settings.enabled;
  } catch (error) {
    logger.error(
      "[MaintenanceGuard] Impossibile leggere la modalità manutenzione.",
      error,
    );

    // Fail-open: un problema di lettura della configurazione
    // non deve rendere indisponibile l'intero sito.
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_CONSTANTS.SESSION_NAME)?.value;

    if (!token) {
      return false;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      logger.error(
        "[MaintenanceGuard] JWT_SECRET non configurato.",
      );
      return false;
    }

    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey, {
      issuer: TOKEN_CONSTANTS.ISSUER,
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Blocca le operazioni server-side degli utenti non amministratori
 * quando la modalità manutenzione è attiva.
 *
 * Utilizzabile nelle Server Actions/API che modificano dati.
 */
export async function assertMaintenanceAccess(): Promise<void> {
  const maintenanceEnabled = await isMaintenanceModeEnabled();

  if (!maintenanceEnabled) {
    return;
  }

  const isAdmin = await isAuthenticatedAdmin();

  if (!isAdmin) {
    throw new MaintenanceModeError();
  }
}

/**
 * Restituisce le impostazioni complete della modalità manutenzione.
 */
export async function getMaintenanceSettings() {
  const service = await getSystemSettingsService();

  return service.getMaintenanceSettings();
}