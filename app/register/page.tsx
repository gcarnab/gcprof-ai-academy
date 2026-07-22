"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { registerAction } from "@/features/auth/actions/registerAction";
import { getClassesAction } from "@/features/auth/actions/getClassesAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const [userType, setUserType] = useState<
    "SCHOOL_STUDENT" | "EXTERNAL_STUDENT"
  >("SCHOOL_STUDENT");

  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<AcademyClass[]>([]);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [schoolTrack, setSchoolTrack] = useState("");
  const [schoolSection, setSchoolSection] = useState("");

  // Configurazione da .env
  const schoolTracks =
    process.env.NEXT_PUBLIC_SCHOOL_TRACKS?.split(",").map((v) => v.trim()) ??
    [];

  const schoolSections =
    process.env.NEXT_PUBLIC_SCHOOL_SECTIONS?.split(",").map((v) => v.trim()) ??
    [];

  useEffect(() => {
    async function loadData() {
      if (userType === "SCHOOL_STUDENT") {
        const result = await getClassesAction();

        if (result.success && result.data) {
          setClasses(result.data);
        }
      }
    }
    loadData();
  }, [userType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    if (userType === "SCHOOL_STUDENT" && !classId) {
      setError("Seleziona una classe di appartenenza.");
      return;
    }

    if (userType === "SCHOOL_STUDENT" && !schoolTrack) {
      setError("Seleziona l'indirizzo di studi.");
      return;
    }

    if (userType === "SCHOOL_STUDENT" && !schoolSection) {
      setError("Seleziona la sezione.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("userType", userType);

    if (userType === "SCHOOL_STUDENT") {
      formData.append("classId", classId);
      formData.append("schoolTrack", schoolTrack);
      formData.append("schoolSection", schoolSection);
    }

    startTransition(async () => {
      const result = await registerAction(null, formData);

      if (result && result.success) {
        setSuccessMessage(
          result.message || "Registrazione avvenuta con successo!",
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setClassId("");
        setUserType("SCHOOL_STUDENT");
        setSchoolTrack("");
        setSchoolSection("");
      } else {
        setError(result?.error || "Errore durante la registrazione.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-muted/50">
      <Card className="w-full max-w-md bg-background border border-border shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground text-center">
            Crea un account
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Registrati ed entra nell'Academy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-sm text-red-600 dark:text-red-400 font-medium border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/20 p-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-900/50">
                {successMessage}
                <div className="mt-2">
                  <Link
                    href="/login"
                    className="text-sm font-semibold underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    Vai alla pagina di login &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Selettore Tipo Account */}
            <div className="space-y-2">
              <Label className="text-muted-foreground font-medium">
                Tipo di Account
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("SCHOOL_STUDENT");
                    setSchoolTrack("");
                    setSchoolSection("");
                    setError("");
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                    userType === "SCHOOL_STUDENT"
                      ? "border-blue-600 bg-blue-50/50 text-blue-950 font-semibold dark:border-violet-500 dark:bg-violet-950/20 dark:text-violet-200"
                      : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                  }`}
                  disabled={isPending || !!successMessage}
                >
                  <span className="text-xl mb-1">🎓</span>
                  <span className="text-xs">Studente Scuola</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserType("EXTERNAL_STUDENT");
                    setSchoolTrack("");
                    setSchoolSection("");
                    setClassId("");
                    setError("");
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                    userType === "EXTERNAL_STUDENT"
                      ? "border-blue-600 bg-blue-50/50 text-blue-950 font-semibold dark:border-violet-500 dark:bg-violet-950/20 dark:text-violet-200"
                      : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                  }`}
                  disabled={isPending || !!successMessage}
                >
                  <span className="text-xl mb-1">💻</span>
                  <span className="text-xs">Utente Esterno</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-muted-foreground font-medium"
                >
                  Nome
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Mario"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                  className="border-border focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-muted-foreground font-medium"
                >
                  Cognome
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Rossi"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                  className="border-border focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-muted-foreground font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="es: utente@dominio.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending || !!successMessage}
                className="border-border focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500"
              />
            </div>

            {/* Selettore Classe (Studente Scuola) */}
            {userType === "SCHOOL_STUDENT" && (
              <div className="space-y-2 transition-all duration-300 ease-in-out">
                <Label
                  htmlFor="classId"
                  className="text-muted-foreground font-medium"
                >
                  Classe dell'Academy
                </Label>
                <select
                  id="classId"
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  required
                  disabled={isPending || !!successMessage}
                >
                  <option value="" disabled className="text-muted-foreground">
                    -- Seleziona la tua classe --
                  </option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {userType === "SCHOOL_STUDENT" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="schoolTrack"
                    className="text-muted-foreground font-medium"
                  >
                    Indirizzo
                  </Label>

                  <select
                    id="schoolTrack"
                    value={schoolTrack}
                    onChange={(e) => setSchoolTrack(e.target.value)}
                    disabled={isPending || !!successMessage}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  >
                    <option value="">-- Seleziona --</option>

                    {schoolTracks.map((track) => (
                      <option key={track} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="schoolSection"
                    className="text-muted-foreground font-medium"
                  >
                    Sezione
                  </Label>

                  <select
                    id="schoolSection"
                    value={schoolSection}
                    onChange={(e) => setSchoolSection(e.target.value)}
                    disabled={isPending || !!successMessage}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  >
                    <option value="">-- Seleziona --</option>

                    {schoolSections.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Campo Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-muted-foreground font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-border focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500 pr-10"
                  disabled={isPending || !!successMessage}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isPending || !!successMessage}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Campo Conferma Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-muted-foreground font-medium"
              >
                Conferma Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-border focus-visible:ring-blue-500 dark:focus-visible:ring-violet-500 pr-10"
                  disabled={isPending || !!successMessage}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isPending || !!successMessage}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !!successMessage}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold shadow-sm transition-all disabled:opacity-50 mt-4"
            >
              {isPending ? "Registrazione in corso..." : "Registrati"}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
              Hai già un account?{" "}
              <Link
                href="/login"
                className="underline text-blue-600 dark:text-violet-400 hover:text-blue-700 dark:hover:text-violet-300 font-medium transition-colors"
              >
                Accedi
              </Link>
            </div>

            <p className="text-center text-[11px] text-muted-foreground pt-4 font-mono uppercase tracking-wider">
              GCPROF-ACADEMY.COM
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}