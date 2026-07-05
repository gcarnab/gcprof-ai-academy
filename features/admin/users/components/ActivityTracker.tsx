"use client";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { incrementStudentMinutes } from "../actions/activityActions";

export default function ActivityTracker() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "⚡ Tracker avviato. Utente rilevato:",
      user?.email,
      "Ruolo:",
      user?.role,
    );

    // Il tracciamento si attiva ESCLUSIVAMENTE per gli studenti loggati
    //if (!user || user.role !== "student") return;

    if (!user) {
      console.log("❌ Tracker stop: Nessun utente loggato");
      return;
    }

    if (user.role !== "student") {
      console.log(
        "❌ Tracker stop: L'utente non è uno 'student'. Ruolo attuale:",
        user.role,
      );
      return;
    }

    console.log("🟩 Tracker ATTIVO. Il controllo partirà ogni 60 secondi...");

    // Intervallo di Heartbeat: 60000 ms = 1 Minuto
    const interval = setInterval(async () => {
      const isVisible = document.visibilityState === "visible";
      const hasFocus = document.hasFocus();

      console.log(
        `⏱️ Controllo minuto - Visibile: ${isVisible}, Ha Focus: ${hasFocus}`,
      );

      if (isVisible && hasFocus) {
        console.log(
          "🚀 Invio battito cardiaco al server per incrementare il minuto...",
        );
        try {
          const res = await incrementStudentMinutes(user.id);
          console.log("💾 Risposta dal database:", res);
        } catch (err) {
          console.error("💥 Errore durante la chiamata server:", err);
        }
      } else {
        console.log(
          "⏳ Battito saltato: la pagina non è in primo piano o ha perso il focus.",
        );
      }
      /*
      // Registra il minuto solo se la pagina è visibile ed ha il focus dell'utente
      if (document.visibilityState === "visible" && document.hasFocus()) {
        try {
          await incrementStudentMinutes(user.id);
        } catch (err) {
          console.error("Errore tracciamento attività:", err);
        }
      }
      */
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [user]);

  return null; // Resta completamente invisibile nella UI
}
