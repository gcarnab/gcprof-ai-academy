"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLiveClasses, upsertSchoolClass, getClassDetails } from "@/features/courses/services/courseActions";

export default function CreateClassForm() {
  const [classesList, setClassesList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Stati del Form (Crea / Modifica)
  const [editingClassName, setEditingClassName] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const refreshClasses = async () => {
    try {
      const res = await getLiveClasses();
      setClassesList(res);
    } catch (err) {
      console.error("Errore nel recupero delle classi:", err);
    }
  };

  useEffect(() => {
    refreshClasses();
  }, []);

  // Popola il form recuperando i dettagli tramite Server Action sicura
  const handleEditSelect = async (className: string) => {
    setEditingClassName(className);
    setName(className);
    setMessage(null);
    
    // Usiamo la nuova Server Action per evitare import di client Supabase nella UI
    const details = await getClassDetails(className);
    setDescription(details.description);
  };

  // Annulla la modalità modifica e resetta il form
  const handleReset = () => {
    setEditingClassName(null);
    setName("");
    setDescription("");
    setMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setMessage(null);

    startTransition(async () => {
      try {
        await upsertSchoolClass(null, name.trim(), description);
        
        setMessage({ 
          type: "success", 
          text: editingClassName 
            ? `Classe "${name}" modificata con successo!` 
            : `Classe "${name}" creata con successo!` 
        });

        setName("");
        setDescription("");
        setEditingClassName(null);
        await refreshClasses();
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Si è verificato un errore durante il salvataggio." });
      }
    });
  };

  return (
    <div className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            {editingClassName ? "📝 Modifica Classe" : "Configura Nuova Classe"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {editingClassName 
              ? `Stai modificando la classe accademica "${editingClassName}".` 
              : "Aggiungi una coorte di studenti (es. \"Sistemi 3°\") a cui assegnare corsi e iscritti."}
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-muted-foreground">Nome Classe</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es: Informatica 3°"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background text-foreground"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-muted-foreground">Descrizione Breve (Opzionale)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Es: Classe terza indirizzo informatico"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background text-foreground"
          />
        </div>

        <div className="flex gap-2 w-full">
          {editingClassName && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="font-semibold px-4 py-2 text-sm rounded-lg flex-1"
            >
              Annulla
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 text-sm rounded-lg flex-1"
          >
            {isPending ? "Salvataggio..." : editingClassName ? "Salva Modifiche" : "Aggiungi Classe"}
          </Button>
        </div>
      </form>

      {/* Sezione Visiva delle classi caricate in tempo reale dal database con Delete */}
      <div className="border-t pt-3">
        <label className="block font-semibold text-muted-foreground mb-2 text-xs">Classi attualmente censite nel DB:</label>
        <div className="border rounded-lg divide-y bg-muted max-h-36 overflow-y-auto">
          {classesList.length === 0 ? (
            <p className="p-2 text-xs text-muted-foreground italic text-center">Nessuna classe presente nel database.</p>
          ) : (
            classesList.map((className) => (
              <div key={className} className="p-2 flex justify-between items-center bg-background text-xs text-muted-foreground">
                <span className="font-bold text-purple-700">{className}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleEditSelect(className)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    ✏️ Modifica
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm(`Sei sicuro di voler eliminare la classe "${className}"?`)) {
                        try {
                          const { deleteSchoolClass } = await import("@/features/courses/services/courseActions");
                          await deleteSchoolClass(className);
                          refreshClasses();
                          setMessage({ type: "success", text: `Classe "${className}" rimossa dal database.` });
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    🗑️ Elimina
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}