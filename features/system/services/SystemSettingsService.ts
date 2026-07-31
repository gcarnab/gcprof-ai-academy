import { logger } from "@/lib/logger";

import { ISystemSettingsRepository } from "../ports/ISystemSettingsRepository";
import {
  HomeBannerSettings,
  SystemConfiguration,
  SystemSetting,
} from "../types/SystemConfiguration";

export class SystemSettingsService {
  constructor(private readonly repository: ISystemSettingsRepository) {}

  async getConfiguration(): Promise<SystemConfiguration> {
    logger.info("[SystemSettingsService] Building system configuration...");

    const settings = await this.repository.getAll();

    const configuration: SystemConfiguration = {
      homeBanner: this.buildHomeBannerSettings(settings),
    };

    logger.info("[SystemSettingsService] Configuration built successfully.");

    return configuration;
  }

  async getHomeBannerSettings(): Promise<HomeBannerSettings> {
    const settings = await this.repository.getAll();

    return this.buildHomeBannerSettings(settings);
  }

  // --------------------------------------------------------
  // PRIVATE
  // --------------------------------------------------------

  private buildHomeBannerSettings(
    settings: SystemSetting[],
  ): HomeBannerSettings {
    return {
      enabled: this.getBoolean(settings, "HOME_BANNER_ENABLED", false),

      version: this.getString(settings, "HOME_BANNER_VERSION", "1"),

      title: this.getString(settings, "HOME_BANNER_TITLE"),

      message: this.getString(settings, "HOME_BANNER_MESSAGE"),

      type: this.getBannerType(settings),

      startAt: this.getDate(settings, "HOME_BANNER_START_AT"),

      endAt: this.getDate(settings, "HOME_BANNER_END_AT"),

      dismissible: this.getBoolean(settings, "HOME_BANNER_DISMISSIBLE", true),

      buttonText: this.getString(settings, "HOME_BANNER_BUTTON_TEXT"),

      buttonUrl: this.getString(settings, "HOME_BANNER_BUTTON_URL"),
    };
  }

  private getSetting(
    settings: SystemSetting[],
    key: string,
  ): string | undefined {
    return settings.find((s) => s.key === key)?.value;
  }

  private getString(
    settings: SystemSetting[],
    key: string,
    defaultValue = "",
  ): string {
    return this.getSetting(settings, key) ?? defaultValue;
  }

  private getBoolean(
    settings: SystemSetting[],
    key: string,
    defaultValue = false,
  ): boolean {
    const value = this.getSetting(settings, key);

    if (value === undefined) {
      return defaultValue;
    }

    switch (value.trim().toLowerCase()) {
      case "true":
      case "1":
      case "yes":
      case "on":
        return true;

      case "false":
      case "0":
      case "no":
      case "off":
        return false;

      default:
        logger.warn("[SystemSettingsService] Invalid boolean value", {
          key,
          value,
        });

        return defaultValue;
    }
  }

  private getDate(settings: SystemSetting[], key: string): Date | null {
    const value = this.getSetting(settings, key);

    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      logger.warn("[SystemSettingsService] Invalid date", {
        key,
        value,
      });

      return null;
    }

    return date;
  }

  private getBannerType(settings: SystemSetting[]): HomeBannerSettings["type"] {
    const value = this.getString(settings, "HOME_BANNER_TYPE", "info");

    switch (value) {
      case "success":
      case "warning":
      case "danger":
      case "info":
        return value;

      default:
        logger.warn("[SystemSettingsService] Invalid banner type", {
          value,
        });

        return "info";
    }
  }
}
