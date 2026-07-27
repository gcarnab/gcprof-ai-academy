"use client";

import { useState, useTransition } from "react";
import { testAddXpAction } from "@/features/courses/actions/courseActions"; // adatta il percorso d'importazione
import { Button } from "@/components/ui/button";

export function GamificationTestButton() {
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAddXp = () => {
    setStatusMsg(null);
    startTransition(async () => {
      const res = await testAddXpAction(50);
      if (res.success) {
        setStatusMsg(
          `+${res.addedXp} XP! Totale: ${res.totalXp} XP | Livello: ${res.currentLevel}${
            res.leveledUp ? " 🎉 LEVEL UP!" : ""
          }`
        );
      } else {
        setStatusMsg(`Errore: ${res.error}`);
      }
    });
  };

  return (
    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <h4 className="font-semibold text-sm">🧪 Pannello Test Gamification</h4>
      <div className="flex gap-2">
        <Button onClick={handleAddXp} disabled={isPending} size="sm">
          {isPending ? "Aggiunta..." : "Simula +50 XP"}
        </Button>
      </div>
      {statusMsg && <p className="text-xs font-mono mt-2 text-muted-foreground">{statusMsg}</p>}
    </div>
  );
}