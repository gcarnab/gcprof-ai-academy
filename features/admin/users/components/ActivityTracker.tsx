"use client";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { incrementStudentMinutes } from "../actions/activityActions";
import { logger } from "@/lib/logger";

interface ActivityTrackerProps {
  courseId?: string;
  lessonId?: string;
}

export default function ActivityTracker({ courseId, lessonId }: ActivityTrackerProps) {
  const { user } = useAuth();

  useEffect(() => {
    logger.warn(
      "⚡ Tracker avviato. Utente:", user?.email, 
      "| Corso:", courseId, 
      "| Lezione:", lessonId
    );

    if (!user) {
      //logger.error("❌ Tracker stop: Nessun utente loggato");
      logger.debug("ActivityTracker: utente non ancora disponibile.");
      return;
    }
    
    {/*
    if (user.role !== "student") {
      logger.warn("❌ Tracker stop: L'utente non è uno 'student'. Ruolo:", user.role);
      return;
    }
    */}

    logger.warn("🟩 Tracker ATTIVO. Monitoraggio focus ogni 60 secondi...");

    const interval = setInterval(async () => {
      const isVisible = document.visibilityState === "visible";
      const hasFocus = document.hasFocus();

      logger.warn(`⏱️ Controllo minuto - Visibile: ${isVisible}, Ha Focus: ${hasFocus}`);

      if (isVisible && hasFocus) {
        logger.warn("🚀 Invio battito cardiaco al database...");
        try {
          // 🎯 PASSO 2: Inoltriamo gli ID del corso e della lezione alla Server Action
          const res = await incrementStudentMinutes(user.id, courseId, lessonId);
          logger.warn("💾 Risposta dal database:", res);
        } catch (err) {
          logger.error("💥 Errore durante la chiamata server:", err);
        }
      } else {
        logger.warn("⏳ Battito saltato: finestra in background o senza focus.");
      }
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [user, courseId, lessonId]); // Re-innesca se cambiano i parametri di navigazione

  return null; 
}