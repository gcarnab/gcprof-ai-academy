"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailTemplate } from "../types/mail";
import { useEffect, useState } from "react";

import type { UpdateMailTemplateDto } from "../types/mail";
import { updateMailTemplateAction } from "../actions/mailTemplateActions";

interface Props {
  template: MailTemplate | null;
  onTemplateUpdated: (template: MailTemplate) => void;
}

export default function MailTemplateEditor({
  template,
  onTemplateUpdated,
}: Props) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [enabled, setEnabled] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!template) return;

    setSubject(template.subject);
    setTitle(template.title_override ?? "");
    setBody(template.body_text_override ?? "");
    setEnabled(template.enabled);
  }, [template]);

  async function handleSave() {
    if (!template) return;

    try {
      setSaving(true);

      const payload: UpdateMailTemplateDto = {
        subject,
        title_override: title || null,
        body_text_override: body || null,
        enabled,
      };

      const updatedTemplate = await updateMailTemplateAction(
        template.template_key,
        payload,
      );

      onTemplateUpdated(updatedTemplate);
    } catch (error) {
      console.error("Errore durante il salvataggio del template:", error);

      alert("Errore durante il salvataggio del template.");
    } finally {
      setSaving(false);
    }
  }

  if (!template) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow">
        <p className="text-gray-500">Seleziona un template dalla lista.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 shadow">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Oggetto dell'email
        </label>

        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Oggetto della mail"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Titolo del messaggio
        </label>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titolo visualizzato nella mail"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Corpo del messaggio
        </label>

        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          placeholder="Scrivi il contenuto del messaggio..."
        />
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          Versione: <strong>{template.version}</strong>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Salvataggio..." : "Salva modifiche"}
        </Button>
      </div>
    </div>
  );
}
