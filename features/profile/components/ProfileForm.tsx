"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  updateProfileText,
  uploadAvatar,
} from "@/features/profile/services/profileActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfileForm() {
  const { user, refreshSession } = useAuth();

  // Stati per la gestione del form testuale
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  // Stati per la gestione dei caricamenti ed errori
  const [isSavingText, setIsSavingText] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincronizzazione campi all'aggiornamento dell'utente
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Nessun utente loggato. Effettua il login per accedere al profilo.
      </div>
    );
  }

  // Estrazione dati scolastici con fallback
  const currentClass =
    user.classes && user.classes.length > 0
      ? user.classes.join(", ")
      : (user as any).className || (user as any).class_name || "Non assegnata";

  const schoolTrack =
    user.schoolTrack || (user as any).school_track || "Non specificato";

  const schoolSection =
    user.schoolSection || (user as any).school_section || "Non specificata";

  // Gestione aggiornamento dati testuali
  const handleSaveText = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingText(true);
    setMessage(null);

    try {
      await updateProfileText({
        userId: user.id,
        firstName,
        lastName,
        displayName,
      });

      await refreshSession();
      setMessage({ type: "success", text: "Profilo aggiornato con successo!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Errore durante il salvataggio.",
      });
    } finally {
      setIsSavingText(false);
    }
  };

  // Gestione upload avatar
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    setIsUploadingAvatar(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const result = await uploadAvatar(user.id, formData);
      if (result.success) {
        await refreshSession();
        setMessage({ type: "success", text: "Foto del profilo aggiornata!" });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Errore durante il caricamento dell'immagine.",
      });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {/* 🔔 Messaggio di Feedback */}
      {message && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 🎓 SEZIONE 1: INQUADRAMENTO SCOLASTICO (SOLA LETTURA) */}
      <Card className="border-primary/20 bg-muted/10">
        <CardHeader>
          <CardTitle className="text-lg">Inquadramento Scolastico</CardTitle>
          <CardDescription>
            Dettagli della tua iscrizione scolastica (gestiti dalla segreteria).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="class">Classe</Label>
            <Input
              id="class"
              type="text"
              disabled
              value={currentClass}
              className="bg-muted text-muted-foreground cursor-not-allowed font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolTrack">Indirizzo</Label>
            <Input
              id="schoolTrack"
              type="text"
              disabled
              value={schoolTrack}
              className="bg-muted text-muted-foreground cursor-not-allowed font-medium uppercase"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolSection">Sezione</Label>
            <Input
              id="schoolSection"
              type="text"
              disabled
              value={
                schoolSection !== "Non specificata" && !schoolSection.startsWith("Sezione")
                  ? `Sezione ${schoolSection}`
                  : schoolSection
              }
              className="bg-muted text-muted-foreground cursor-not-allowed font-medium"
            />
          </div>
        </CardContent>
      </Card>

      {/* 📸 SEZIONE 2: AVATAR */}
      <Card>
        <CardHeader>
          <CardTitle>Foto del Profilo</CardTitle>
          <CardDescription>
            Visualizza o modifica la tua immagine identificativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted border flex items-center justify-center text-2xl font-bold uppercase text-muted-foreground">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              user.displayName?.substring(0, 2) || "U"
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploadingAvatar}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploadingAvatar
                ? "Caricamento in corso..."
                : "Scegli una nuova foto"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Formati supportati: JPG, JPEG, PNG, GIF. Max 1MB.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 📝 SEZIONE 3: DATI PERSONALI */}
      <form onSubmit={handleSaveText}>
        <Card>
          <CardHeader>
            <CardTitle>Informazioni Personali</CardTitle>
            <CardDescription>
              Modifica i dettagli del tuo account. I campi Email e Ruolo sono
              protetti.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Inserisci il tuo nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome</Label>
                <Input
                  id="lastName"
                  type="text"
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
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Es. Mario Rossi"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Indirizzo Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  value={user.email}
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Ruolo Account</Label>
                <Input
                  id="role"
                  type="text"
                  disabled
                  value={
                    user.role === "admin"
                      ? "Amministratore (Admin)"
                      : "Studente (Student)"
                  }
                  className="bg-muted text-muted-foreground cursor-not-allowed uppercase text-xs tracking-wider font-semibold"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSavingText}>
              {isSavingText ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}