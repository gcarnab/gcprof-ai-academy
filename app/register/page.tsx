"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { registerAction } from "@/features/auth/core/actions/registerAction";
import { getClassesAction } from "@/features/auth/core/actions/getClassesAction"; // 🎯 Nuova Action
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AcademyClass {
  id: string;
  name: string;
}

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<AcademyClass[]>([]);
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🎯 Caricamento sicuro tramite Server Action
  useEffect(() => {
    async function loadClasses() {
      const result = await getClassesAction();
      if (result.success && result.data) {
        setClasses(result.data);
      }
    }
    loadClasses();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    if (!classId) {
      setError("Seleziona una classe di appartenenza.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("classId", classId);

    startTransition(async () => {
      const result = await registerAction(null, formData);

      if (result && result.success) {
        setSuccessMessage(result.message || "Registrazione avvenuta con successo!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setClassId("");
      } else {
        setError(result?.error || "Errore durante la registrazione.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crea un account</CardTitle>
          <CardDescription className="text-center">
            Scegli la tua classe e registrati nell'Academy
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
              <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md border border-emerald-200">
                {successMessage}
                <div className="mt-2">
                  <Link href="/login" className="text-sm font-medium underline hover:text-emerald-700">
                    Vai alla pagina di login &rarr;
                  </Link>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending || !!successMessage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classId">Classe dell'Academy</Label>
              <select
                id="classId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
                disabled={isPending || !!successMessage}
              >
                <option value="">-- Seleziona la tua classe --</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending || !!successMessage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Conferma Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isPending || !!successMessage}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || !!successMessage}>
              {isPending ? "Registrazione in corso..." : "Registrati"}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-2">
              Hai già un account?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Accedi
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}