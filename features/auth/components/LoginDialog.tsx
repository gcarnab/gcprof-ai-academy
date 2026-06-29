/**
 * ============================================================================
 * FILE: LoginDialog.tsx
 * FEATURE: Auth (UI Layer)
 * ----------------------------------------------------------------------------
 * SCOPO
 * Modal di login UI-based (senza backend).
 *
 * NOTE IMPORTANTI
 * - Nessuna autenticazione reale ancora
 * - Solo preparazione UI per Supabase Auth futuro
 * ============================================================================
 */

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

export default function LoginDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("LOGIN MOCK:", { email, password });

    alert("Login UI simulato (backend non ancora collegato)");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Accedi</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accedi alla piattaforma</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="nome@scuola.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleLogin}>
            Entra
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}