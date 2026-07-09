"use server";

import { TrackingService } from "../services/trackingService";
import { logger } from "@/lib/logger";

export async function trackPageViewAction(
  profileId: string,
  path: string,
) {
  try {
    if (!profileId || !path) {
      logger.warn(
        "trackPageViewAction: profileId o path mancanti.",
      );
      return;
    }

    await TrackingService.trackPageView(profileId, path);
  } catch (error) {
    logger.error(
      `trackPageViewAction exception: ${String(error)}`,
    );
  }
}