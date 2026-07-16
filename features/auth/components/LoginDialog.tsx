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
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { loginAction } from "@/features/auth/actions/loginAction";
import { requestPasswordResetAction } from "@/features/auth/actions/requestPasswordResetAction";
import { useRouter } from "next/navigation";

export default function LoginDialog() {
  const { login } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false); // 🎯 Controllo interno per il reset password

  function handleAction(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      try {
        if (isResetMode) {
          // --- FLUSSO DI RESET PASSWORD ---
          const result = await requestPasswordResetAction(null, formData);
          if (result && result.success) {
            setSuccessMessage(result.message || "Controlla la tua posta.");
            setEmail("");
          } else {
            setError(result?.error || "Si è verificato un errore.");
          }
        } else {
          // --- FLUSSO LOGIN ---
          formData.append("password", password);
          const result = await loginAction(null, formData);

          if (result && result.success && result.user) {
            login(result.user);
            setEmail("");
            setPassword("");
            setOpen(false);

            // 3. 🎯 NUOVO: Flusso di redirect in base al ruolo e allo stato
            const { role, status } = result.user;
            if (role === "admin") {
              //router.push("/admin/dashboard"); // L'admin va dritto al pannello di controllo
              window.location.href = "/admin/dashboard";
            } else if (status === "pending") {
              window.location.href = "/"; // Lo studente non ancora abilitato va alla pagina di attesa
            } else {
              window.location.href = "/dashboard";// Lo studente attivo va alla dashboard didattica
            }
          } else {
            setError(result?.error || "Credenziali non valide. Riprova.");
          }
        }
      } catch (err) {
        setError("Si è verificato un errore di rete. Riprova più tardi.");
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setIsResetMode(false);
          setError("");
          setSuccessMessage("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          Accedi
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-background border border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            {isResetMode && (
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(false);
                  setError("");
                  setSuccessMessage("");
                }}
                className="p-1 hover:bg-muted rounded-full text-muted-foreground"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            {isResetMode ? "Ripristina la password" : "Accedi alla piattaforma"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAction} className="space-y-4 py-2">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-200">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 font-medium border border-green-200">
              {successMessage}
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="dialog-email"
              className="text-muted-foreground font-medium"
            >
              Email
            </Label>
            <Input
              id="dialog-email"
              type="email"
              placeholder="es: studente@gcprof-academy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
              className="border-border focus-visible:ring-blue-500"
            />
          </div>

          {!isResetMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="dialog-password"
                  className="text-muted-foreground font-medium"
                >
                  Password
                </Label>
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
                  Dimenticata?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="dialog-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  required={!isResetMode}
                  className="border-border focus-visible:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {isPending
              ? "Elaborazione in corso..."
              : isResetMode
                ? "Invia istruzioni di reset"
                : "Entra"}
          </Button>

          <p className="text-center text-[11px] text-muted-foreground pt-2 font-mono uppercase tracking-wider">
            Enterprise Decoupled Architecture v2
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
