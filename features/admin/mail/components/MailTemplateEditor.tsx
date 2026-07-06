"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailTemplate } from "../types/mail";
import { useEffect, useState } from "react";
import { updateMailTemplateAction, createMailTemplateAction } from "../actions/mailTemplateActions";

interface Props {
  template: MailTemplate | null; // Se null, siamo in modalità CREAZIONE
  onTemplateUpdated: (template: MailTemplate) => void;
}

export default function MailTemplateEditor({
  template,
  onTemplateUpdated,
}: Props) {
  // Campi specifici per la creazione del nuovo template
  const [templateKey, setTemplateKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  // Campi condivisi (modifica e creazione)
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [enabled, setEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  
  const isCreating = !template;

  useEffect(() => {
    if (template) {
      setSubject(template.subject);
      setTitle(template.title_override ?? "");
      setBody(template.body_text_override ?? "");
      setEnabled(template.enabled);
    } else {
      // Reset completo dei campi per il nuovo template quando si clicca su "Nuovo"
      setTemplateKey("");
      setName("");
      setDescription("");
      setSubject("");
      setTitle("");
      setBody("");
      setEnabled(true);
    }
  }, [template]);

  async function handleSave() {
    try {
      setSaving(true);

      if (isCreating) {
        // Validazione per la creazione
        if (!templateKey.trim() || !name.trim() || !subject.trim()) {
          alert("Chiave, Nome e Oggetto sono campi obbligatori per il nuovo template.");
          return;
        }

        const newTemplate = await createMailTemplateAction({
          template_key: templateKey.toUpperCase().trim(),
          name: name.trim(),
          description: description.trim(),
          subject: subject.trim(),
          title_override: title.trim() || null,
          body_text_override: body || null,
          enabled,
        });

        onTemplateUpdated(newTemplate);
        alert("Template creato con successo!");
      } else {
        // Modalità Modifica Esistente
        const updatedTemplate = await updateMailTemplateAction(
          template.template_key,
          {
            subject,
            title_override: title || null,
            body_text_override: body || null,
            enabled,
          }
        );

        onTemplateUpdated(updatedTemplate);
      }
    } catch (error: any) {
      console.error("Errore durante il salvataggio del template:", error);
      alert("Errore durante il salvataggio: " + (error.message || error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 shadow">
      <div>
        <h3 className="text-md font-bold text-gray-900 border-b pb-2">
          {isCreating ? "📝 Crea Nuovo Modello Email" : `⚙️ Modifica Modello: ${template.name}`}
        </h3>
      </div>

      {/* Campi visibili solo in modalità Creazione */}
      {isCreating && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-dashed">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-600">Chiave Unica (ID in maiuscolo)</label>
            <Input
              value={templateKey}
              onChange={(e) => setTemplateKey(e.target.value.replace(/\s+/g, "_"))}
              placeholder="Es: AVVISO_SCADENZA"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-600">Nome del Template</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es: Promemoria Scadenza Corso"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase text-gray-600">Descrizione interna</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Spiega quando o a chi viene inviato questo modello..."
            />
          </div>
        </div>
      )}

      {/* Campi Comuni ad entrambe le modalità */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Oggetto dell'email <span className="text-xs text-gray-400">(Supporta {"{{first_name}}"}, {"{{academy_name}}"})</span>
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Oggetto visualizzato nella casella del destinatario"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Titolo del messaggio <span className="text-xs text-gray-400">(Opzionale)</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo d'intestazione interno al corpo mail"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Corpo del messaggio
          </label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="font-sans text-sm p-3 border rounded-lg"
            placeholder="Usa {{first_name}} per personalizzare il nome dello studente..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          {isCreating ? (
            <span className="text-emerald-600 font-medium">✨ Nuovo Record</span>
          ) : (
            <>Versione: <strong>{template?.version}</strong></>
          )}
        </div>

        <Button onClick={handleSave} disabled={saving} className={isCreating ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}>
          {saving ? "Salvataggio..." : isCreating ? "Inserisci Template" : "Salva modifiche"}
        </Button>
      </div>
    </div>
  );
}