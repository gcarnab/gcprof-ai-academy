"use client";

export default function MailTab() {
  return (
    <div className="rounded-xl border bg-white p-10">

      <h2 className="text-2xl font-bold">
        Mail Center
      </h2>

      <p className="mt-4 text-gray-600">
        Questa sezione conterrà la gestione centralizzata di tutte le email
        della piattaforma.
      </p>

      <ul className="mt-6 space-y-2 list-disc pl-6 text-gray-600">
        <li>Configurazione Resend</li>
        <li>Template Email</li>
        <li>Editor HTML</li>
        <li>Preview</li>
        <li>Invio email di test</li>
        <li>Variabili dinamiche</li>
        <li>Log invii</li>
      </ul>

    </div>
  );
}