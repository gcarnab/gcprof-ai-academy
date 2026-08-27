"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { logger } from "@/lib/logger";
import {
  incrementStudentMinutes,
  touchLessonAccess,
} from "../actions/activityActions";

interface ActivityTrackerProps {
  courseId?: string;
  lessonId?: string;
}

const HEARTBEAT_INTERVAL_MS = (() => {
  const raw = Number(process.env.NEXT_PUBLIC_TRACKING_HEARTBEAT_MS ?? 10000);
  return Number.isFinite(raw) && raw > 0 ? raw : 10000;
})();

const TRACKING_BATCH_MINUTES = (() => {
  const raw = Number(process.env.NEXT_PUBLIC_TRACKING_BATCH_MINUTES ?? 1);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
})();

export default function ActivityTracker({
  courseId,
  lessonId,
}: ActivityTrackerProps) {
  const { user } = useAuth();

  const accumulatedSecondsRef = useRef(0);
  const isSendingRef = useRef(false);

  useEffect(() => {
    //logger.warn("====================================");
    //logger.warn("TRACKER MOUNT");
    //logger.warn("lessonId:", lessonId);
    //logger.warn("courseId:", courseId);
    //logger.warn("====================================");

    if (!user) {
      logger.debug("ActivityTracker: utente non ancora disponibile.");
      return;
    }

    // 🚀 Registrazione immediata dell'accesso alla lezione (minuti = 0)
    if (courseId && lessonId) {
      touchLessonAccess(user.id, courseId, lessonId);
    }

    const intervalSeconds = HEARTBEAT_INTERVAL_MS / 1000;

    const interval = setInterval(async () => {
      // 🎯 FIX: Verifichiamo solo che la scheda del browser sia visibile.
      // Rimosso document.hasFocus() che si disattivava cliccando sugli iframe (YouTube / PDF Drive).
      const isVisible = typeof document !== "undefined" && document.visibilityState === "visible";

      //logger.warn(`⏱️ Controllo visibilità (${intervalSeconds}s) - Visibile: ${isVisible}`,);

      if (isVisible) {
        accumulatedSecondsRef.current += intervalSeconds;

        const pendingMinutes = Math.floor(accumulatedSecondsRef.current / 60);

        //logger.warn("⏱️ Tempo accumulato lato client:", {accumulatedSeconds: accumulatedSecondsRef.current,pendingMinutes,batchThresholdMinutes: TRACKING_BATCH_MINUTES,});

        if (pendingMinutes >= TRACKING_BATCH_MINUTES && !isSendingRef.current) {
          isSendingRef.current = true;

          try {
            //logger.warn("🚀 Invio batch al server...", { minutesToAdd: pendingMinutes, courseId, lessonId });
            const res = await incrementStudentMinutes(
              user.id,
              courseId,
              lessonId,
              pendingMinutes,
            );

            if (res.success) {
              // Sottraiamo solo i minuti effettivamente inviati
              accumulatedSecondsRef.current -= pendingMinutes * 60;
              //logger.warn("✅ Batch inviato e confermato dal DB", res);

              // 🔔 Notifica Evento Globale per aggiornare al volo i widget
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("gamification:updated", {
                    detail: {
                      courseId,
                      lessonId,
                      minutesAdded: pendingMinutes,
                      result: res.data,
                      badge: res.badge,
                    },
                  })
                );
              }
            }
          } catch (err) {
            logger.error("💥 Errore durante la chiamata server:", err);
          } finally {
            isSendingRef.current = false;
          }
        }
      } else {
        //logger.warn("⏳ Battito saltato: scheda in background non visibile.");
      }
    }, HEARTBEAT_INTERVAL_MS);

    // 🧹 Cleanup / Flush quando l'utente cambia lezione, corso o smonta il componente
    return () => {
      clearInterval(interval);

      // 🎯 FIX: Se sono stati accumulati almeno 30 secondi, arrotondiamo a 1 minuto per evitare perdita di tempo
      const accumulated = accumulatedSecondsRef.current;
      const remainingMinutes = Math.floor(accumulated / 60) || (accumulated >= 30 ? 1 : 0);

      if (remainingMinutes > 0 && user?.id && courseId && lessonId) {
        //logger.warn("🧹 Flush finale al cambio lezione/corso", { remainingMinutes, accumulated, courseId, lessonId });
        incrementStudentMinutes(user.id, courseId, lessonId, remainingMinutes).then((res) => {
          if (res?.success && typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("gamification:updated", {
                detail: {
                  courseId,
                  lessonId,
                  minutesAdded: remainingMinutes,
                  result: res.data,
                  badge: res.badge,
                },
              })
            );
          }
        });
      }

      // Azzeriamo i secondi accumulati per evitare sovrapposizioni al prossimo mount
      accumulatedSecondsRef.current = 0;
    };
  }, [user, courseId, lessonId]);

  return null;
}