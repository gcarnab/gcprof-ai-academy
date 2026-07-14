"use client";

import React, { useState, useTransition } from "react";
import { importQuizFromMarkdownAction } from "../actions/quizActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export function AdminQuizPanel() {
  const [markdown, setMarkdown] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleImport = () => {
    if (!markdown.trim()) return;

    setResult(null);
    startTransition(async () => {
      const response = await importQuizFromMarkdownAction(markdown);

      if (response.success) {
        setResult({
          success: true,
          message: `Quiz importato con successo! ID Generato: ${response.quizId}`,
        });
        setMarkdown("");
      } else {
        setResult({
          success: false,
          message: response.error || "Errore sconosciuto durante l'importazione del template.",
        });
      }
    });
  };

  const inserisciTemplateEsempio = () => {
    const template = `---
title: "Sviluppo Componenti Avanzati Next.js"
description: "Verifica delle competenze su Server Actions, Caching e Rendering Parziale."
status: "draft"
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale direttiva abilita l'esecuzione lato server di una funzione in Next.js?
- [ ] 'use server-side'
- [x] 'use server'
- [ ] 'use client'
- [ ] 'server compile'

# Q2
Testo della seconda domanda chiusa...
- [x] Opzione esatta
- [ ] Opzione errata
- [ ] Opzione errata
- [ ] Opzione errata

# Q3
Testo domanda...
- [ ] Opzione errata
- [x] Opzione esatta
- [ ] Opzione errata
- [ ] Opzione errata

# Q4
Testo domanda...
- [ ] Opzione errata
- [ ] Opzione errata
- [x] Opzione esatta
- [ ] Opzione errata

# Q5
Testo domanda...
- [ ] Opzione errata
- [ ] Opzione errata
- [ ] Opzione errata
- [x] Opzione esatta

# Q6
Testo domanda...
- [x] Opzione esatta
- [ ] Opzione errata
- [ ] Opzione errata
- [ ] Opzione errata

# Q7
Testo domanda...
- [ ] Opzione errata
- [x] Opzione esatta
- [ ] Opzione errata
- [ ] Opzione errata

# Q8
Testo domanda...
- [ ] Opzione errata
- [ ] Opzione errata
- [x] Opzione esatta
- [ ] Opzione errata

# OPEN
Spiega nel dettaglio come funziona la revalidation del data-cache tramite la funzione revalidatePath nelle Server Actions.`;
    setMarkdown(template);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Importazione Motore Quiz (.md)
              </CardTitle>
              <CardDescription>
                Incolla il codice Markdown strutturato o caricalo direttamente per generare le domande relazionali e i vincoli di business.
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={inserisciTemplateEsempio}
              disabled={isPending}
            >
              Carica Template Esempio
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Incolla qui il tuo Markdown con FrontMatter YAML..."
            className="font-mono min-h-[450px] resize-y p-4 border-input focus-visible:ring-primary"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            disabled={isPending}
          />

          {result && (
            <div className={`p-4 rounded-lg border flex gap-3 ${
              result.success 
                ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" 
                : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}>
              {result.success ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              <div>
                <h5 className="font-semibold leading-none tracking-tight mb-1">
                  {result.success ? "Successo" : "Errore di Validazione"}
                </h5>
                <p className="text-sm opacity-90 font-medium">
                  {result.message}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={handleImport}
              disabled={isPending || !markdown.trim()}
              className="px-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analisi AST e Validazione Zod...
                </>
              ) : (
                "Elabora e Pubblica Quiz"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}