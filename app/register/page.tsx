"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { registerAction } from "@/features/auth/actions/registerAction";
import { getClassesAction } from "@/features/auth/actions/getClassesAction"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface AcademyClass {
  id: string;
  name: string;
}

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<AcademyClass[]>([]);
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Caricamento sicuro tramite Server Action
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
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gray-50/50">
      <Card className="w-full max-w-md bg-white border border-gray-100 shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900 text-center">
            Crea un account
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-500">
            Scegli la tua classe e registrati nell'Academy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-200">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-600 font-medium border border-emerald-200">
                {successMessage}
                <div className="mt-2">
                  <Link href="/" className="text-sm font-semibold underline hover:text-emerald-700 transition-colors">
                    Vai alla pagina di login &rarr;
                  </Link>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium">Nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Mario"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                  className="border-gray-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium">Cognome</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Rossi"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                  className="border-gray-200 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="es: studente@gcprofaiacademy.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending || !!successMessage}
                className="border-gray-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classId" className="text-gray-700 font-medium">Classe dell'Academy</Label>
              <select
                id="classId"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm text-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
                disabled={isPending || !!successMessage}
              >
                <option value="" className="text-gray-400">-- Seleziona la tua classe --</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo Password con Occhietto Allineato */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus-visible:ring-blue-500 pr-10"
                  disabled={isPending || !!successMessage}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isPending || !!successMessage}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Campo Conferma Password con Occhietto Allineato */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Conferma Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-200 focus-visible:ring-blue-500 pr-10"
                  disabled={isPending || !!successMessage}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isPending || !!successMessage}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isPending || !!successMessage}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-all disabled:opacity-50 mt-2"
            >
              {isPending ? "Registrazione in corso..." : "Registrati"}
            </Button>

            <div className="text-center text-sm text-gray-500 pt-2">
              Hai già un account?{" "}
              <Link href="/login" className="underline text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Accedi
              </Link>
            </div>

            <p className="text-center text-[11px] text-gray-400 pt-4 font-mono uppercase tracking-wider">
              Enterprise Decoupled Architecture v2
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}