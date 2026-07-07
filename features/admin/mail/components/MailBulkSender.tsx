"use client";

import { useEffect, useState, useTransition } from "react";
import { getMailTemplatesAction } from "../actions/mailTemplateActions";
import { sendBulkMailAction } from "../actions/mailBulkActions";
import type { MailTemplate } from "../types/mail";

interface Props {
  availableClasses: string[];
}

export default function MailBulkSender({ availableClasses }: Props) {
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getMailTemplatesAction();
      setTemplates(data);
    }
    loadData();
  }, []);

  const handleBroadcast = () => {

    if (!selectedTemplate || !selectedClass || isPending) return; // 👈 Blocca se già in corso

    const confirmSend = confirm(
      `Sei sicuro di voler inviare questo template a TUTTI gli studenti attivi della classe "${selectedClass}"?`
    );
    if (!confirmSend) return;

    setStatusMessage(null);

    startTransition(async () => {
      const res = await sendBulkMailAction(selectedTemplate, selectedClass);
      if (res.success) {
        if (res.processedCount === 0) {
          setStatusMessage(`⚠️ ${res.error}`);
        } else {
          setStatusMessage(`🎉 Successo! Spedite correttamente ${res.processedCount} email.`);
        }
      } else {
        setStatusMessage(`❌ Errore: ${res.error}`);
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">📧 Broadcast Email di Massa</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Invia comunicazioni massive a intere classi compilando automaticamente i tag <code className="bg-muted px-1 rounded text-red-600">{"{{display_name}}"}</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selezione Classe */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Classe Destinataria</label>
          <select
            className="w-full border p-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Scegli una classe...</option>
            {availableClasses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Selezione Template */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Template da Inviare</label>
          <select
            className="w-full border p-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Scegli un modello...</option>
            {templates.map((t) => (
              <option key={t.id} value={t.template_key}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between gap-4">
        <button
          onClick={handleBroadcast}
          disabled={isPending || !selectedTemplate || !selectedClass}
          className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending ? "⏳ Spedizione in corso..." : "🚀 Avvia Invio Massivo"}
        </button>

        {statusMessage && (
          <p className="text-sm font-medium text-muted-foreground animate-fade-in">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}