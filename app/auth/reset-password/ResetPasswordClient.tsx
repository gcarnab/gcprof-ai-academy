"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmPasswordResetAction } from "@/features/auth/actions/confirmPasswordResetAction";
import { validateResetTokenAction } from "@/features/auth/actions/validateResetTokenAction";

// Assumendo che questi componenti esistano nel tuo path standard (Shadcn UI o simili)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Validazione REALE lato server al caricamento
  useEffect(() => {
    async function checkToken() {
      if (!token) {
        setStatus("invalid");
        return;
      }

      const isValid = await validateResetTokenAction(token);
      setStatus(isValid ? "valid" : "invalid");
    }

    checkToken();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    if (password.length < 8) {
      setMessage({ text: "La password deve contenere almeno 8 caratteri.", type: "error" });
      return;
    }

    if (password !== confirm) {
      setMessage({ text: "Le password non coincidono.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("token", token);
    formData.append("password", password);

    const res = await confirmPasswordResetAction(null, formData);

    if (res.success) {
      setMessage({ text: "Password aggiornata! Reindirizzamento in corso...", type: "success" });
      // 2. UX Enterprise: Redirect automatico post-successo
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } else {
      setMessage({ text: res.error || "Errore durante il reset.", type: "error" });
      setLoading(false);
    }
  }

  // 3. Gestione degli stati di caricamento e invalidità
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Verifica del link in corso...</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold text-destructive">Link Scaduto o Non Valido</h2>
        <p className="text-muted-foreground">
          Il link di ripristino potrebbe essere già stato utilizzato o è scaduto (validità 15 minuti).<br />
          Ti preghiamo di richiedere un nuovo link dalla pagina di accesso.
        </p>
        <Button onClick={() => router.push("/login")} variant="outline" className="mt-4">
          Torna al Login
        </Button>
      </div>
    );
  }

  // 4. Form UI aggiornata
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-card rounded-xl border shadow-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Imposta nuova password</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Inserisci la tua nuova password per accedere all'Academy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nuova password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimo 8 caratteri"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Conferma password</Label>
          <Input
            id="confirm"
            type="password"
            placeholder="Riscrivi la password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm ${message.type === "error" ? "bg-destructive/15 text-destructive" : "bg-green-500/15 text-green-600"}`}>
            {message.text}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Aggiornamento in corso..." : "Salva nuova password"}
        </Button>
      </form>
    </div>
  );
}