"use client";

interface GamificationBarProps {
  totalXp: number;
  currentLevel: number;
  compact?: boolean;
}

export default function GamificationBar({
  totalXp = 0,
  currentLevel = 1,
  compact = false,
}: GamificationBarProps) {
  // Calcolo progresso all'interno del livello corrente (500 XP per livello)
  const xpInCurrentLevel = totalXp % 500;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpInCurrentLevel / 500) * 100)),
  );

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1.5 shadow-sm text-sm">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <span>👑</span>
          <span>Lvl {currentLevel}</span>
        </div>
        <div className="h-4 w-px bg-slate-700" />
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-slate-300 font-semibold">
            {totalXp} XP
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-xl shadow-inner border border-amber-300/30">
            👑
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Livello Attuale
            </div>
            <div className="text-lg font-extrabold text-white">
              Livello {currentLevel}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-bold text-amber-400">{totalXp} XP</div>
          <div className="text-xs text-slate-400">
            {500 - xpInCurrentLevel} XP al prossimo lvl
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
          <span>{xpInCurrentLevel} XP</span>
          <span>500 XP</span>
        </div>
      </div>
    </div>
  );
}