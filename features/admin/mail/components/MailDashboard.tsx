"use client";

import { useEffect, useState } from "react";
import { getMailTemplatesAction } from "../actions/mailTemplateActions";
import type { MailTemplate } from "../types/mail";

import MailSettingsCard from "./MailSettingsCard";
import MailTemplateList from "./MailTemplateList";
import MailTemplateEditor from "./MailTemplateEditor";
import MailTestSender from "./MailTestSender";
import MailBulkSender from "./MailBulkSender";

interface Props {
  availableClasses: string[];
}

export default function MailDashboard({ availableClasses }: Props) {
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  
  // 🎯 STATO CRUCIAL: undefined significa "caricamento in corso", 
  // null significa "Modalità Nuovo Template", l'oggetto significa "Modifica esistente"
  const [selectedTemplate, setSelectedTemplate] = useState<MailTemplate | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await getMailTemplatesAction();
      setTemplates(data);
      
      // All'avvio seleziona il primo template se esiste, altrimenti si mette in modalità Nuovo (null)
      if (data.length > 0) {
        setSelectedTemplate(data[0]);
      } else {
        setSelectedTemplate(null);
      }
    } finally {
      setLoading(false);
    }
  }

  // Funzione invocata sia dopo una modifica che dopo una creazione
  async function handleTemplateUpdated(updatedTemplate: MailTemplate) {
    // 1. Ricarica la lista aggiornata dal DB
    const data = await getMailTemplatesAction();
    setTemplates(data);
    
    // 2. Seleziona immediatamente il template appena salvato/creato per non perdere il focus
    const current = data.find(t => t.template_key === updatedTemplate.template_key);
    setSelectedTemplate(current || data[0] || null);
  }

  return (
    <div className="space-y-8">
      <MailSettingsCard />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <MailTemplateList
          templates={templates}
          selectedTemplate={selectedTemplate ?? null} // Passa null se siamo in creazione
          loading={loading}
          onSelect={(template) => setSelectedTemplate(template)} // Imposta l'oggetto o null (Nuovo)
        />

        <div className="xl:col-span-2">
          {selectedTemplate === undefined ? (
            <div className="rounded-xl border bg-background p-6 shadow text-muted-foreground text-sm">
              Caricamento editor...
            </div>
          ) : (
            <MailTemplateEditor
              template={selectedTemplate} // Passa correttamente l'oggetto o null
              onTemplateUpdated={handleTemplateUpdated}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MailTestSender />
        <MailBulkSender availableClasses={availableClasses} />
      </div>
    </div>
  );
}