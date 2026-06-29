"use client";

import { useState } from "react";
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

import { useAuth } from "@/features/auth/context/AuthContext";
import { login as loginService } from "@/features/auth/services/authService";

export default function LoginDialog() {
  const { login } = useAuth();
  
  // Cambiamo da email a username per allinearci a users.ts ("admin", "student1", etc.)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Per chiudere il dialog a login avvenuto

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Chiamata al servizio file-based
    const sessionUser = loginService(username, password);

    if (sessionUser) {
      // Aggiorna il contesto globale di React
      login(sessionUser);
      // Resetta i campi e chiude il modal
      setUsername("");
      setPassword("");
      setOpen(false);
    } else {
      setError("Credenziali non valide. Riprova.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Accedi</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Accedi alla piattaforma</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 py-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="es: student1, admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Entra
          </Button>
          
          <p className="text-center text-xs text-gray-400 pt-2">
            Demo LMS File-Based Architecture
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}