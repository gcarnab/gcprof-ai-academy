"use client";

import { MailTemplate } from "../types/mail";
import { Button } from "@/components/ui/button";

interface Props {
  templates: MailTemplate[];
  selectedTemplate: MailTemplate | null;
  loading: boolean;
  onSelect: (template: MailTemplate | null) => void; // Supporta la selezione di null per il "Nuovo"
}

export default function MailTemplateList({
  templates,
  selectedTemplate,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow">
      {/* Intestazione con pulsante di Creazione */}
      <div className="border-b p-4 flex items-center justify-between gap-2 bg-muted">
        <h2 className="font-semibold text-foreground">Template</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSelect(null)}
          className="text-xs font-medium border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          ➕ Nuovo
        </Button>
      </div>

      {loading && (
        <div className="p-4 text-sm text-muted-foreground">Caricamento...</div>
      )}

      {!loading && templates.length === 0 && (
        <div className="p-4 text-sm text-muted-foreground italic text-center">Nessun template presente.</div>
      )}

      {!loading &&
        templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`block w-full border-b px-4 py-3 text-left transition
              ${
                selectedTemplate?.id === template.id
                  ? "bg-blue-50 font-semibold text-blue-700 border-l-4 border-l-blue-600"
                  : "hover:bg-muted"
              }
            `}
          >
            <div className="text-sm font-medium">{template.name}</div>
            <div className="text-xs text-muted-foreground font-mono mt-0.5">{template.template_key}</div>
          </button>
        ))}
    </div>
  );
}