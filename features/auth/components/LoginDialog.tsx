"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

// Sincronizzazione con l'architettura v2 (Server Actions e Context)
import { useAuth } from "@/features/auth/context/AuthContext";
import { loginAction } from "@/features/auth/actions/loginAction";

export default function LoginDialog() {
  const { login } = useAuth(); // 🎯 Estraiamo solo 'login'
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      try {
        const result = await loginAction(null, formData);

        if (result && result.success && result.user) {
          // 🎯 STEP 1: Passiamo l'utente già validato dallo stato della Server Action direttamente al contesto React
          login(result.user);

          // 🎯 STEP 2: Rimosso 'await refreshSession()'. Evita il crash da doppia chiamata concorrente.
          // Il cookie è già sul browser, l'app è sbloccata.

          // Reset e chiusura del modal
          setEmail("");
          setPassword("");
          setOpen(false);
        } else {
          setError(result?.error || "Credenziali non valide. Riprova.");
        }
      } catch (err) {
        setError("Si è verificato un errore di rete. Riprova più tardi.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          Accedi
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white border border-gray-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Accedi alla piattaforma
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 py-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="es: admin@gcprofaiacademy.vercel.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
              className="border-gray-200 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                required
                className="border-gray-200 focus-visible:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {isPending ? "Connessione in corso..." : "Entra"}
          </Button>

          <p className="text-center text-[11px] text-gray-400 pt-2 font-mono uppercase tracking-wider">
            Enterprise Decoupled Architecture v2
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}