export interface SystemSetting {
  key: string;
  value: string;
  description?: string | null;
  updatedAt?: string | null;
}

export interface HomeBannerSettings {
  enabled: boolean;

  title: string;
  message: string;

  type: "info" | "success" | "warning" | "danger";

  startAt: Date | null;
  endAt: Date | null;

  dismissible: boolean;

  buttonText: string;
  buttonUrl: string;

  version: string;
}

export interface SystemConfiguration {
  homeBanner: HomeBannerSettings;
}