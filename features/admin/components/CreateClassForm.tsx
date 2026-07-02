"use client";

import { useState, useTransition } from "react";
import { createAcademyClass } from "../core/actions/classActions";
import { Button } from "@/components/ui/button";

export default function CreateClassForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await createAcademyClass(name, description);
      if (result.success) {
        setMessage({ type: "success", text: `Classe "${name}" creata con successo!` });
        setName("");
        setDescription("");
      } else {
        setMessage({ type: "error", text: result.error || "Si è verificato un errore imprevisto." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Configura Nuova Classe</h2>
        <p className="text-sm text-gray-500">Aggiungi una coorte di studenti (es. "Sistemi 3°") a cui assegnare corsi e iscritti.</p>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700">Nome Classe</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Es: Informatica 3°"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700">Descrizione Breve</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Es: Classe terza indirizzo informatico"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 text-sm rounded-lg w-full"
      >
        {isPending ? "Salvataggio..." : "Aggiungi Classe"}
      </Button>
    </form>
  );
}