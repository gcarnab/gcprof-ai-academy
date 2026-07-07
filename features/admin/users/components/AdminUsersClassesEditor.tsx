"use client";

import { Button } from "@/components/ui/button";

interface AdminUsersClassesEditorProps {
  availableClasses: string[];
  selectedClasses: string[];
  onToggleClass: (className: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function AdminUsersClassesEditor({
  availableClasses,
  selectedClasses,
  onToggleClass,
  onCancel,
  onSave,
}: AdminUsersClassesEditorProps) {
  return (
    <div className="max-w-xs space-y-2 rounded-lg border bg-muted p-2">
      <div className="text-xs font-bold text-muted-foreground">
        Seleziona Classi:
      </div>

      <div className="flex max-h-32 flex-col gap-1 overflow-y-auto">
        {availableClasses.map((cls) => (
          <label
            key={cls}
            className="flex cursor-pointer items-center gap-2 rounded p-1 text-xs text-muted-foreground hover:bg-muted"
          >
            <input
              type="checkbox"
              checked={selectedClasses.includes(cls)}
              onChange={() => onToggleClass(cls)}
              className="rounded text-blue-600"
            />

            {cls}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={onCancel}
        >
          Annulla
        </Button>

        <Button
          size="sm"
          className="h-7 bg-blue-600 text-xs text-white"
          onClick={onSave}
        >
          Salva
        </Button>
      </div>
    </div>
  );
}