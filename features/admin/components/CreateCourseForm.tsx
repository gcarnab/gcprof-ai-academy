"use client";

import { useState, useTransition } from "react";
import { AdminClassOption } from "../services/adminCourseService";
import { createCourseWithClasses } from "../core/actions/courseActions";
import { Button } from "@/components/ui/button";

interface CreateCourseFormProps {
  classes: AdminClassOption[];
}

export default function CreateCourseForm({ classes }: CreateCourseFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCheckboxChange = (classId: string) => {
    setSelectedClassIds((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await createCourseWithClasses({
        title,
        description,
        classIds: selectedClassIds,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Corso inserito e assegnato con successo!" });
        setTitle("");
        setDescription("");
        setSelectedClassIds([]);
      } else {
        setMessage({ type: "error", text: result.error || "Qualcosa è andato storto." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Crea Nuovo Corso (CMS Admin)</h2>
        <p className="text-sm text-gray-500">Aggiungi un corso al catalogo e assegnalo istantaneamente alle classi relazionali.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Titolo del Corso</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Es: Informatica 1°"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Descrizione</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Fornisci una breve introduzione al programma del corso..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Assegna alle Classi Studenti</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 bg-gray-50 p-4 rounded-xl border">
          {classes.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Nessuna classe configurata nel database.</p>
          ) : (
            classes.map((cls) => (
              <label key={cls.id} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                <input
                  type="checkbox"
                  checked={selectedClassIds.includes(cls.id)}
                  onChange={() => handleCheckboxChange(cls.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">{cls.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm w-full sm:w-auto"
        >
          {isPending ? "Salvataggio in corso..." : "Pubblica Corso"}
        </Button>
      </div>
    </form>
  );
}