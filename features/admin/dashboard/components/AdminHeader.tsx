"use client";

export default function AdminHeader() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        Pannello Amministratore
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Gestisci la struttura dei corsi, gli utenti e tutte le funzionalità
        amministrative della piattaforma.
      </p>
    </div>
  );
}