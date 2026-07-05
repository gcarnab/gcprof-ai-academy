"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { loginAction } from "@/features/auth/actions/loginAction";
import { requestPasswordResetAction } from "@/features/auth/actions/requestPasswordResetAction"; // 🎯 NUOVO
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false); // 🎯 Switch di stato per il recupero password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      try {
        if (isResetMode) {
          // --- FLUSSO RECUPERO PASSWORD ---
          const result = await requestPasswordResetAction(null, formData);
          if (result && result.success) {
            setSuccessMessage(result.message || "Richiesta inoltrata con successo.");
            setEmail("");
          } else {
            setError(result?.error || "Si è verificato un errore.");
          }
        } else {
          // --- FLUSSO ACCESSO STANDARD ---
          formData.append("password", password);
          const result = await loginAction(null, formData);

          if (result && result.success && result.user) {
            login(result.user);
            if (result.user.role === "admin") {
              router.push("/admin/dashboard");
            } else {
              router.push("/"); //TO_DO
            }
          } else {
            setError(result?.error || "Credenziali non valide.");
          }
        }
      } catch (err) {
        setError("Si è verificato un errore. Riprova più tardi.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isResetMode ? "Ripristina Password" : "Accedi all'Academy"}
          </CardTitle>
          <CardDescription className="text-center">
            {isResetMode
              ? "Inserisci la tua email per ricevere il link di ripristino"
              : "Inserisci le tue credenziali per accedere ai corsi"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="p-3 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            {!isResetMode && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className="text-xs text-blue-600 hover:underline"
                    disabled={isPending}
                  >
                    Password dimenticata?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required={!isResetMode}
                  disabled={isPending}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending 
                ? "Elaborazione in corso..." 
                : isResetMode 
                  ? "Invia link di ripristino" 
                  : "Accedi"}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(!isResetMode);
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-sm text-gray-500 hover:text-black transition-colors"
                disabled={isPending}
              >
                {isResetMode ? "Torna al modulo di login" : "Hai bisogno di assistenza?"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}