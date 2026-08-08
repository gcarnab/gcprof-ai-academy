"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Bot, Loader2, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateAiSettingsAction } from "../actions/aiActions";

interface AiSettingsFormProps {
  initialSettings?: any;
}

export default function AiSettingsForm({ initialSettings }: AiSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const formKey = initialSettings?.updated_at || initialSettings?.id || "ai-settings-form";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const tempVal = formData.get("temperature");
    const tokensVal = formData.get("max_tokens");

    const res = await updateAiSettingsAction({
      id: (formData.get("id") as string) || initialSettings?.id || undefined,
      provider: (formData.get("provider") as string) || initialSettings?.provider || "google",
      model: (formData.get("model") as string) || "gemini-3.1-flash-lite",
      master_model: (formData.get("master_model") as string) || "gemini-3.1-flash-lite",
      grading_model: (formData.get("grading_model") as string) || "gemini-3.1-flash-lite",
      temperature: tempVal !== null && tempVal !== "" ? Number(tempVal) : 0.2,
      max_tokens: tokensVal !== null && tokensVal !== "" ? Number(tokensVal) : 2048,
      system_prompt: (formData.get("system_prompt") as string) || "",
      master_prompt: (formData.get("master_prompt") as string) || "",
      grading_prompt: (formData.get("grading_prompt") as string) || "",
      enabled: true,
    });

    setLoading(false);

    if (res.success) {
      setMessage({ type: "success", text: "Impostazioni IA salvate nel database!" });
      router.refresh();
    } else {
      setMessage({ type: "error", text: res.error || "Errore durante il salvataggio." });
    }
  }

  return (
    <form key={formKey} action={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={initialSettings?.id ?? ""} />

      {message && (
        <div
          className={`p-4 rounded-md text-sm font-medium ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Provider & Modelli LLM
          </CardTitle>
          <CardDescription>
            Definisci il provider attivo e i modelli per le risposte generali, le soluzioni master e la correzione dei quiz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider IA</Label>
              <Input
                id="provider"
                name="provider"
                defaultValue={initialSettings?.provider ?? "google"}
                placeholder="es. google"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modello Generico</Label>
              <Input
                id="model"
                name="model"
                defaultValue={initialSettings?.model ?? "gemini-3.1-flash-lite"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="master_model">Modello Risposta Master</Label>
              <Input
                id="master_model"
                name="master_model"
                defaultValue={initialSettings?.master_model ?? "gemini-3.1-flash-lite"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grading_model">Modello Correzione / Grading</Label>
              <Input
                id="grading_model"
                name="grading_model"
                defaultValue={initialSettings?.grading_model ?? "gemini-3.1-flash-lite"}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parametri Generazione</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperatura (0.0 - 1.0)</Label>
            <Input
              id="temperature"
              name="temperature"
              type="number"
              step="0.05"
              min="0"
              max="1"
              defaultValue={initialSettings?.temperature ?? 0.2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_tokens">Max Tokens</Label>
            <Input
              id="max_tokens"
              name="max_tokens"
              type="number"
              defaultValue={initialSettings?.max_tokens ?? 2048}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prompt di Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system_prompt">System Prompt Generale</Label>
            <Textarea
              id="system_prompt"
              name="system_prompt"
              rows={3}
              defaultValue={
                initialSettings?.system_prompt ??
                "Sei un docente esperto e obiettivo incaricato di valutare e fornire feedback rigorosi e formativi."
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="master_prompt">System Prompt Risposta Master</Label>
            <Textarea
              id="master_prompt"
              name="master_prompt"
              rows={3}
              defaultValue={
                initialSettings?.master_prompt ??
                "Sei un docente esperto nella creazione e revisione di risposte di riferimento per i quiz."
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grading_prompt">System Prompt per il Grading</Label>
            <Textarea
              id="grading_prompt"
              name="grading_prompt"
              rows={4}
              defaultValue={
                initialSettings?.grading_prompt ??
                "Confronta la risposta dello studente con la risposta master fornita. Assegna un punteggio numerico da 0 al punteggio massimo della domanda e fornisci una motivazione chiara ed esaustiva."
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Salva Configurazione IA
        </Button>
      </div>
    </form>
  );
}