"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  upsertCourse,
  getLiveCourses,
} from "@/features/courses/services/courseActions";
import { getLiveCategories } from "@/features/courses/services/courseActions";

export default function CreateCourseForm({ classes }: { classes: any[] }) {
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // Stato del Form (valido sia per Crea che per Modifica)
  const [courseId, setCourseId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Facile");
  const [description, setDescription] = useState("");

  // Carica i corsi e le categorie all'avvio per la gestione locale
  const refreshData = async () => {
    const [c, cat] = await Promise.all([getLiveCourses(), getLiveCategories()]);
    setCoursesList(c);
    setCategories(cat.filter((item) => item !== "Tutti"));
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Avvia la modalità modifica popolando il form
  const handleEditSelect = (course: any) => {
    setCourseId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setDifficulty(course.difficulty);
    setDescription(course.description || "");
  };

  // Resetta il form per tornare in modalità "Nuovo Corso"
  const handleReset = () => {
    setCourseId(null);
    setTitle("");
    setCategory("");
    setDifficulty("Facile");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      try {
        const slug = title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-");

        const numericId = courseId ? Number(courseId) : undefined;

        await upsertCourse({
          id: numericId, // 👈 Ora è un number | undefined, coerente con lo schema del DB
          title: title.trim(),
          slug,
          category,
          difficulty,
          description,
        });

        handleReset();
        await refreshData();
        // Forza un reload leggero della pagina per allineare gli altri componenti della dashboard
        window.location.reload();
      } catch (err: any) {
        alert("Errore durante il salvataggio: " + err.message);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {courseId ? "📝 Modifica Corso" : "✨ Crea Nuovo Corso"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {courseId
            ? "Stai modificando un corso esistente nel database."
            : "Inserisci un nuovo corso formativo nell'Academy."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block font-medium text-muted-foreground mb-1">
            Titolo Corso
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-border p-2 text-foreground bg-background"
            placeholder="Es: Corso Avanzato Python"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-muted-foreground mb-1">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-border p-2 text-foreground bg-background"
              required
            >
              <option value="">-- Seleziona --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-muted-foreground mb-1">
              Difficoltà
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-md border border-border p-2 text-foreground bg-background"
            >
              <option value="Facile">Facile</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzato">Avanzato</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-muted-foreground mb-1">
            Descrizione Breve
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-border p-2 text-foreground bg-background"
            placeholder="Descrizione sintetica del corso..."
          />
        </div>

        <div className="flex gap-2 justify-end">
          {courseId && (
            <Button type="button" variant="outline" onClick={handleReset}>
              Annulla Modifica
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white"
          >
            {courseId ? "Salva Modifiche" : "Crea Corso"}
          </Button>
        </div>
      </form>

      {/* Elenco Corsi per attivare la Modifica 
      <div className="border-t pt-4">
        <label className="block font-medium text-muted-foreground mb-2 text-sm">Seleziona un corso da modificare:</label>
        <div className="border rounded-lg divide-y bg-muted max-h-40 overflow-y-auto">
          {coursesList.map((c) => (
            <div key={c.id} className="p-2 flex justify-between items-center bg-background text-xs text-muted-foreground">
              <span className="font-medium truncate max-w-[250px]">{c.title} <span className="text-muted-foreground">({c.category})</span></span>
              <button
                onClick={() => handleEditSelect(c)}
                className="text-blue-600 hover:underline font-semibold"
              >
                ✏️ Modifica
              </button>
            </div>
          ))}
        </div>
      </div>
*/}
      {/* Elenco Corsi per attivare la Modifica o l'Eliminazione */}
      <div className="border-t pt-4">
        <label className="block font-medium text-muted-foreground mb-2 text-sm">
          Corsi censiti nel DB:
        </label>
        <div className="border rounded-lg divide-y bg-muted max-h-40 overflow-y-auto">
          {coursesList.map((c) => (
            <div
              key={c.id}
              className="p-2 flex justify-between items-center bg-background text-xs text-muted-foreground"
            >
              <span className="font-medium truncate max-w-[200px] md:max-w-[250px]">
                {c.title} <span className="text-muted-foreground">({c.category})</span>
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleEditSelect(c)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  ✏️ Modifica
                </button>
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Vuoi davvero eliminare definitivamente il corso "${c.title}"?`,
                      )
                    ) {
                      try {
                        const { deleteCourse } =
                          await import("@/features/courses/services/courseActions");
                        await deleteCourse(c.id);
                        refreshData();
                        window.location.reload();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
                  }}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  🗑️ Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
