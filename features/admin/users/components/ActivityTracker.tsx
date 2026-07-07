"use client";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { incrementStudentMinutes } from "../actions/activityActions";

interface ActivityTrackerProps {
  courseId?: string;
  lessonId?: string;
}

export default function ActivityTracker({ courseId, lessonId }: ActivityTrackerProps) {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "⚡ Tracker avviato. Utente:", user?.email, 
      "| Corso:", courseId, 
      "| Lezione:", lessonId
    );

    if (!user) {
      console.log("❌ Tracker stop: Nessun utente loggato");
      return;
    }

    if (user.role !== "student") {
      console.log("❌ Tracker stop: L'utente non è uno 'student'. Ruolo:", user.role);
      return;
    }

    console.log("🟩 Tracker ATTIVO. Monitoraggio focus ogni 60 secondi...");

    const interval = setInterval(async () => {
      const isVisible = document.visibilityState === "visible";
      const hasFocus = document.hasFocus();

      console.log(`⏱️ Controllo minuto - Visibile: ${isVisible}, Ha Focus: ${hasFocus}`);

      if (isVisible && hasFocus) {
        console.log("🚀 Invio battito cardiaco al database...");
        try {
          // 🎯 PASSO 2: Inoltriamo gli ID del corso e della lezione alla Server Action
          const res = await incrementStudentMinutes(user.id, courseId, lessonId);
          console.log("💾 Risposta dal database:", res);
        } catch (err) {
          console.error("💥 Errore durante la chiamata server:", err);
        }
      } else {
        console.log("⏳ Battito saltato: finestra in background o senza focus.");
      }
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [user, courseId, lessonId]); // Re-innesca se cambiano i parametri di navigazione

  return null; 
}