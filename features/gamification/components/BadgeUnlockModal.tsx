"use client";

import { useEffect, useState } from "react";

interface BadgeUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeTitle: string;
  badgeIcon: string;
  xpGained: number;
  newLevel?: number;
}

export default function BadgeUnlockModal({
  isOpen,
  onClose,
  badgeTitle,
  badgeIcon,
  xpGained,
  newLevel,
}: BadgeUnlockModalProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300">
      <div
        className={`relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center transform transition-all duration-500 ${
          animate ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-4"
        }`}
      >
        {/* Glow effect di sfondo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Intestazione */}
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
          🎉 Badge Sbloccato!
        </div>

        {/* Icona Badge con rimbalzo */}
        <div className="my-3 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-b from-amber-400/20 to-yellow-600/10 border border-amber-400/40 flex items-center justify-center text-5xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            {badgeIcon || "🏆"}
          </div>
        </div>

        {/* Titolo e Dettagli */}
        <h3 className="text-xl font-black text-white mb-2">{badgeTitle}</h3>

        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-xl font-bold text-sm mb-4 border border-amber-500/30">
          <span>⚡ +{xpGained} XP Guadagnati</span>
        </div>

        {newLevel && (
          <div className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-semibold">
            🚀 Nuovamente Promosso! Ora sei al **Livello {newLevel}**
          </div>
        )}

        {/* Tasto Azione */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black rounded-xl shadow-lg transition-all transform active:scale-95"
        >
          Continua
        </button>
      </div>
    </div>
  );
}