"use client";

import { useEffect, useState } from "react";
import { sendTestMailAction } from "../actions/mailTestActions";
import { getMailTemplatesAction } from "../actions/mailTemplateActions";
import type { MailTemplate } from "../types/mail";

export default function MailTestSender() {
  const [email, setEmail] = useState("");
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const data = await getMailTemplatesAction();
    setTemplates(data);
  }

  async function handleSend() {
    setLoading(true);
    setResult(null);

    try {
      const res = await sendTestMailAction(selectedTemplate, email);

      if (res.success) {
        setResult("Email inviata con successo");
      } else {
        setResult(res.error || "Errore invio email");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow space-y-4">
      <h2 className="text-lg font-semibold">Invio Email di Test</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Email destinatario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="">Seleziona template</option>
        {templates.map((t) => (
          <option key={t.id} value={t.template_key}>
            {t.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSend}
        disabled={loading || !email || !selectedTemplate}
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Invio..." : "Invia email test"}
      </button>

      {result && (
        <p className="text-sm text-muted-foreground pt-2">{result}</p>
      )}
    </div>
  );
}