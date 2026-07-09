"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { logger } from "@/lib/logger";
import { useAuth } from "@/features/auth/context/AuthContext";

import { trackPageViewAction } from "../actions/trackPageViewAction";

export function PageTracker() {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const lastTracked = useRef<{
    path: string;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    logger.info("[PageTracker] mounted");
  }, []);

  useEffect(() => {
    async function recordPageView() {
      try {
        logger.info(`[PageTracker] pathname=${pathname}`);

        if (isLoading) {
          logger.info("[PageTracker] attendo caricamento sessione...");
          return;
        }

        if (!user) {
          logger.warn("[PageTracker] nessun utente autenticato.");
          return;
        }

        if (!pathname) {
          return;
        }

        const now = Date.now();

        // Evita doppie registrazioni della stessa pagina
        if (
          lastTracked.current &&
          lastTracked.current.path === pathname &&
          now - lastTracked.current.timestamp < 2000
        ) {
          logger.info("[PageTracker] duplicate page ignored.");
          return;
        }

        lastTracked.current = {
          path: pathname,
          timestamp: now,
        };

        // L'ID dell'utente proviene dall'AuthContext
        const profileId = user.id;

        // Parsing intelligente dell'URL (solo a scopo di log)
        const segments = pathname.split("/").filter(Boolean);

        let courseSlug: string | null = null;
        let lessonSlug: string | null = null;

        const courseIndex = segments.indexOf("courses");
        if (courseIndex !== -1) {
          courseSlug = segments[courseIndex + 1] ?? null;
        }

        const lessonIndex = segments.indexOf("lessons");
        if (lessonIndex !== -1) {
          lessonSlug = segments[lessonIndex + 1] ?? null;
        }

        logger.info(
          `[PageTracker] user=${user.email} role=${user.role} profileId=${profileId}`,
        );

        logger.info(
          `[PageTracker] path=${pathname} course=${courseSlug ?? "-"} lesson=${lessonSlug ?? "-"}`,
        );

        // Tutto il salvataggio avviene lato server
        await trackPageViewAction(profileId, pathname);

        logger.info("[PageTracker] page view inviata al server.");
      } catch (error) {
        logger.error(`[PageTracker] exception: ${String(error)}`);
      }
    }

    recordPageView();
  }, [pathname, user, isLoading]);

  return null;
}