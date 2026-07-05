"use client";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { incrementStudentMinutes } from "../actions/activityActions";

export default function ActivityTracker() {
  const { user } = useAuth();

  useEffect(() => {
    // Il tracciamento si attiva ESCLUSIVAMENTE per gli studenti loggati
    if (!user || user.role !== "student") return;

    // Intervallo di Heartbeat: 60000 ms = 1 Minuto
    const interval = setInterval(async () => {
      // Registra il minuto solo se la pagina è visibile ed ha il focus dell'utente
      if (document.visibilityState === "visible" && document.hasFocus()) {
        try {
          await incrementStudentMinutes(user.id);
        } catch (err) {
          console.error("Errore tracciamento attività:", err);
        }
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [user]);

  return null; // Resta completamente invisibile nella UI
}