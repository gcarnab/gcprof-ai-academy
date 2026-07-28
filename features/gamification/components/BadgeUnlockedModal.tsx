"use client";

import { useEffect, useState } from "react";

export interface BadgeUnlockData {
  id: string;
  title: string;
  description: string;
  icon?: string; // Emoji o URL immagine
  xpReward?: number;
}

interface Props {
  badge: BadgeUnlockData | null;
  onClose: () => void;
  autoCloseDuration?: number; // In millisecondi (default: 5000ms)
}

export default function BadgeUnlockedModal({
  badge,
  onClose,
  autoCloseDuration = 5000,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [badge, autoCloseDuration]);

  if (!badge || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Sincronizzato con l'animazione di chiusura
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* CARD PRINCIPALE CON ANIMAZIONE DI INGRESSO (POP-IN) */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-card to-card p-6 shadow-2xl text-center animate-in zoom-in-75 duration-300">
        
        {/* EFFETTO LUMINOSO DI SFONDO (GLOW) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* CONTENUTO */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          
          {/* BADGE ICON / AVATAR CON ANIMAZIONE RIMBALZO */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400/50 shadow-inner animate-bounce">
            <span className="text-5xl">{badge.icon || "🏆"}</span>
          </div>

          {/* TITOLI */}
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase text-amber-500 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              🎉 Nuovo Badge Sbloccato!
            </span>
            <h3 className="text-xl font-extrabold text-foreground tracking-tight pt-1">
              {badge.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed px-2">
              {badge.description}
            </p>
          </div>

          {/* RICOMPENSA XP (SE PRESENTE) */}
          {badge.xpReward && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 font-bold text-sm shadow-sm">
              <span>⚡ +{badge.xpReward} XP Guadagnati</span>
            </div>
          )}

          {/* PULSANTE DI CHIUSURA */}
          <button
            onClick={handleClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs tracking-wide hover:opacity-90 active:scale-95 transition-all"
          >
            Continua la Lezione
          </button>
        </div>
      </div>
    </div>
  );
}