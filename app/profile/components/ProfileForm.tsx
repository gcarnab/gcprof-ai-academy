"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Layers,
  Lock,
  User as UserIcon,
  Mail,
  Check,
  Loader2,
} from "lucide-react";

export default function ProfileForm() {
  const { user, isLoading } = useAuth();

  // Stati per i campi modificabili
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Caricamento dati profilo...</span>
      </div>
    );
  }

  // Estrazione sicura dei dati in sola lettura (supporta camelCase e snake_case)
  const currentClass =
    user?.classes?.join(", ") ||
    user?.className ||
    user?.class_name ||
    "Non assegnata";

  const schoolTrack =
    user?.schoolTrack || user?.school_track || "Non specificato";

  const schoolSection =
    user?.schoolSection || user?.school_section || "Non specificata";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      // Esegui la logica di aggiornamento qui
      setSuccessMessage("Profilo aggiornato con successo!");
    } catch (error) {
      console.error("Errore aggiornamento profilo:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 🔒 DATI ISTITUZIONALI IN SOLA LETTURA */}
      <Card className="border-border/80 shadow-sm bg-card">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-bold">
                Inquadramento Scolastico
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="gap-1 text-xs font-normal text-muted-foreground border-muted-foreground/30"
            >
              <Lock className="h-3 w-3" /> Sola Lettura
            </Badge>
          </div>
          <CardDescription>
            Informazioni istituzionali gestite direttamente dall'Academy.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. CLASSE */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-primary" /> Classe
            </Label>
            <div className="relative">
              <Input
                value={currentClass}
                readOnly
                disabled
                className="bg-muted/50 font-medium text-foreground cursor-not-allowed border-muted-foreground/20 pr-8"
              />
              <Lock className="h-3.5 w-3.5 text-muted-foreground absolute right-3 top-3 opacity-60" />
            </div>
          </div>

          {/* 2. INDIRIZZO / TRACK */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" /> Indirizzo di
              Studio
            </Label>
            <div className="relative">
              <Input
                value={schoolTrack}
                readOnly
                disabled
                className="bg-muted/50 font-medium text-foreground cursor-not-allowed border-muted-foreground/20 pr-8 uppercase"
              />
              <Lock className="h-3.5 w-3.5 text-muted-foreground absolute right-3 top-3 opacity-60" />
            </div>
          </div>

          {/* 3. SEZIONE */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" /> Sezione
            </Label>
            <div className="relative">
              <Input
                value={
                  schoolSection !== "Non specificata"
                    ? `Sezione ${schoolSection}`
                    : schoolSection
                }
                readOnly
                disabled
                className="bg-muted/50 font-medium text-foreground cursor-not-allowed border-muted-foreground/20 pr-8"
              />
              <Lock className="h-3.5 w-3.5 text-muted-foreground absolute right-3 top-3 opacity-60" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✏️ ANAGRAFICA PERSONALE MODIFICABILE */}
      <Card className="border-border/80 shadow-sm bg-card">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">
              Dati Personali Account
            </CardTitle>
          </div>
          <CardDescription>
            Personalizza il tuo nome visualizzato nella piattaforma.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          {successMessage && (
            <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Inserisci il tuo nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Inserisci il tuo cognome"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">
              Nome Visualizzato (Display Name)
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Come vuoi apparire nei corsi e attestati"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email di
              Registrazione
            </Label>
            <Input
              id="email"
              value={user?.email || ""}
              readOnly
              disabled
              className="bg-muted/50 cursor-not-allowed border-muted-foreground/20"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="px-6 font-semibold"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvataggio in corso...
            </>
          ) : (
            "Salva Modifiche"
          )}
        </Button>
      </div>
    </form>
  );
}
