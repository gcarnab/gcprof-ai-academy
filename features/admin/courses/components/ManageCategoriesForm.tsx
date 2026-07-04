"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { getLiveCategories, createCategory, deleteCategory } from "@/features/courses/services/courseActions";

export default function ManageCategoriesForm() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [isPending, startTransition] = useTransition();

  const refreshCategories = async () => {
    const data = await getLiveCategories();
    // Filtriamo la voce "Tutti" per la gestione di configurazione pura
    setCategories(data.filter(c => c !== "Tutti"));
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const handleCreate = () => {
    if (!newCatName.trim()) return;
    startTransition(async () => {
      try {
        await createCategory(newCatName.trim());
        setNewCatName("");
        await refreshCategories();
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  const handleDelete = (name: string) => {
    if (!window.confirm(`Vuoi davvero eliminare la categoria "${name}"?`)) return;
    startTransition(async () => {
      try {
        // Avendo creato l'anagrafica basata sul match testuale per retrocompatibilità, 
        // cancelliamo passando l'id o identificativo se modificato, altrimenti intercettiamo tramite il servizio
        await deleteCategory(name); 
        await refreshCategories();
      } catch (err: any) {
        alert("Nota: Assicurati che nessun corso attivo stia usando questa categoria prima di eliminarla.");
      }
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Anagrafica Categorie Corsi</h2>
        <p className="text-sm text-gray-500">Aggiungi o rimuovi le categorie merceologiche del DB.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nuova Categoria (es: Cyber Security)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 p-2 text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-500"
        />
        <Button onClick={handleCreate} disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          + Aggiungi
        </Button>
      </div>

      <div className="border rounded-lg divide-y bg-gray-50 max-h-60 overflow-y-auto">
        {categories.length === 0 ? (
          <p className="p-3 text-xs text-gray-400 italic text-center">Nessuna categoria personalizzata nel DB.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="p-2.5 flex justify-between items-center bg-white text-sm text-gray-700">
              <span className="font-medium">{cat}</span>
              <button 
                onClick={() => handleDelete(cat)} 
                disabled={isPending} 
                className="text-xs text-red-500 hover:underline"
              >
                Elimina
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}