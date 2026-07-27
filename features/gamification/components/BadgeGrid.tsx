"use client";

import { UserBadgeItem } from "../actions/badgeActions";

interface BadgeGridProps {
  badges: UserBadgeItem[];
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  if (!badges || badges.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        Nessun badge disponibile al momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`relative flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
            badge.isUnlocked
              ? "bg-slate-900/90 border-amber-500/40 shadow-md shadow-amber-500/5"
              : "bg-slate-900/30 border-slate-800/80 opacity-50 grayscale"
          }`}
        >
          <div className="text-3xl mb-1.5">{badge.icon}</div>
          <div className="text-xs font-bold text-white line-clamp-1">
            {badge.title}
          </div>
          <div className="text-[10px] text-amber-400 font-semibold mt-0.5">
            +{badge.xpReward} XP
          </div>

          {!badge.isUnlocked && (
            <div className="absolute top-2 right-2 text-xs">🔒</div>
          )}
        </div>
      ))}
    </div>
  );
}