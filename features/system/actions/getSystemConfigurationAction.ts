"use server";

import { logger } from "@/lib/logger";

import { SystemConfiguration } from "../types/SystemConfiguration";
import { SupabaseSystemSettingsRepository } from "../repositories/SupabaseSystemSettingsRepository";
import { SystemSettingsService } from "../services/SystemSettingsService";

export async function getSystemConfigurationAction(): Promise<SystemConfiguration> {
  logger.info(
    "[SystemConfigurationAction] Loading system configuration...",
  );

  try {
    const repository = new SupabaseSystemSettingsRepository();

    const service = new SystemSettingsService(repository);

    const configuration =
      await service.getConfiguration();

    logger.info(
      "[SystemConfigurationAction] Configuration loaded successfully.",
    );

    return configuration;
  } catch (error) {
    logger.error(
      "[SystemConfigurationAction] Unable to load configuration.",
      error,
    );

    throw error;
  }
}