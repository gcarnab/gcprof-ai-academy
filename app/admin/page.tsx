"use client";

import { useState, useEffect } from "react";

import type { Course, Module, Lesson } from "@/features/courses/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { deleteCourse, getLiveCourses, upsertCourse } from "@/features/courses/services/courseActions";

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Stati del Form Principale
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Informatica");
  const [difficulty, setDifficulty] = useState("Facile");
  const [teacher, setTeacher] = useState(process.env.NEXT_PUBLIC_DEFAULT_TEACHER || "Prof. G. Carnabuci");
  const [estimatedHours, setEstimatedHours] = useState(20);
  const [coverImage, setCoverImage] = useState("📚");
  const [allowedClassesInput, setAllowedClassesInput] = useState("");
  const [modules, setModules] = useState<Module[]>([]);

  // Stati per la creazione rapida di Moduli/Lezioni
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState<"video" | "document">(
    "video",
  );
  const [newLessonYt, setNewLessonYt] = useState("");
  const [newLessonDrive, setNewLessonDrive] = useState("");

  // Stati per la MODIFICA in linea di moduli e lezioni esistenti
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState("");
  const [editingLessonType, setEditingLessonType] = useState<
    "video" | "document"
  >("video");
  const [editingLessonYt, setEditingLessonYt] = useState("");
  const [editingLessonDrive, setEditingLessonDrive] = useState("");

  useEffect(() => {
    refreshCourses();
  }, []);

  const refreshCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getLiveCourses();
      setCourses(data || []);
    } catch (error) {
      console.error("Errore nel caricamento dei corsi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCourse) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("Informatica");
    setDifficulty("Facile");
    setTeacher(process.env.NEXT_PUBLIC_DEFAULT_TEACHER || "Prof. G. Carnabuci");
    setEstimatedHours(20);
    setCoverImage("📚");
    setAllowedClassesInput("");
    setModules([]);
    setIsDialogOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setTitle(course.title || "");
    setSlug(course.slug || "");
    setDescription(course.description || "");
    setCategory(course.category || "Informatica");
    setDifficulty(course.difficulty || "Facile");
    setTeacher(course.teacher || "Prof. G. Carnabuci");
    setEstimatedHours(course.estimatedHours || 20);
    setCoverImage(course.coverImage || "📚");
    
    setAllowedClassesInput(Array.isArray(course.allowedClasses) ? course.allowedClasses.join(", ") : "");
    setModules(Array.isArray(course.modules) ? course.modules : []);
    
    setIsDialogOpen(true);
  };

  const handleDelete = async (courseId: number, courseTitle: string) => {
    if (
      confirm(
        `Sei sicuro di voler eliminare definitivamente il corso "${courseTitle}"? Questa azione non è reversibile.`,
      )
    ) {
      try {
        await deleteCourse(courseId);
        await refreshCourses();
      } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        alert("Impossibile eliminare il corso.");
      }
    }
  };

  /* ============================================================================
   * 🛠️ GESTIONE STRUTTURA: MODULI
   * ========================================================================== */
  const addModule = () => {
    if (!newModuleTitle) return;
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: newModuleTitle,
      lessons: [],
    };
    setModules([...modules, newMod]);
    setNewModuleTitle("");
  };

  const startEditModule = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditingModuleTitle(mod.title);
  };

  const saveEditedModule = (moduleId: string) => {
    if (!editingModuleTitle) return;
    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, title: editingModuleTitle } : m,
      ),
    );
    setEditingModuleId(null);
  };

  const deleteModule = (moduleId: string) => {
    if (
      confirm(
        "Sei sicuro di voler eliminare questo modulo e tutte le sue lezioni?",
      )
    ) {
      setModules(modules.filter((m) => m.id !== moduleId));
    }
  };

  /* ============================================================================
   * 🛠️ GESTIONE STRUTTURA: LEZIONI
   * ========================================================================== */
  const addLessonToModule = (moduleId: string) => {
    if (!newLessonTitle) return;
    const newLess: Lesson = {
      id: `les-${Date.now()}`,
      title: newLessonTitle,
      duration: 15,
      contentType: newLessonType,
      youtubeUrl: newLessonType === "video" ? newLessonYt : undefined,
      googleDriveUrl: newLessonType === "document" ? newLessonDrive : undefined,
    };

    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: [...m.lessons, newLess] } : m,
      ),
    );
    setNewLessonTitle("");
    setNewLessonYt("");
    setNewLessonDrive("");
  };

  const startEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditingLessonTitle(lesson.title);
    setEditingLessonType(lesson.contentType as "video" | "document");
    setEditingLessonYt(lesson.youtubeUrl || "");
    setEditingLessonDrive(lesson.googleDriveUrl || "");
  };

  const saveEditedLesson = (moduleId: string, lessonId: string) => {
    if (!editingLessonTitle) return;

    setModules(
      modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) => {
            if (l.id !== lessonId) return l;
            return {
              ...l,
              title: editingLessonTitle,
              contentType: editingLessonType,
              youtubeUrl:
                editingLessonType === "video" ? editingLessonYt : undefined,
              googleDriveUrl:
                editingLessonType === "document"
                  ? editingLessonDrive
                  : undefined,
            };
          }),
        };
      }),
    );

    setEditingLessonId(null);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    if (confirm("Sei sicuro di voler rimuovere questa lezione?")) {
      setModules(
        modules.map((m) => {
          if (m.id !== moduleId) return m;
          return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) };
        }),
      );
    }
  };

  /* ============================================================================
   * SALVATAGGIO FINALE
   * ========================================================================== */
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;

    const allowedClasses = allowedClassesInput
      ? allowedClassesInput
          .split(",")
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean)
      : [];

    const finalCourse: Partial<Course> = {
      ...(editingCourse && { id: editingCourse.id }),
      title,
      slug,
      description,
      category,
      difficulty,
      teacher,
      estimatedHours: Number(estimatedHours),
      coverImage,
      published: true,
      allowedClasses,
      modules,
    };

    try {
      await upsertCourse(finalCourse);
      setIsDialogOpen(false);
      await refreshCourses();
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Impossibile salvare il corso sul database.");
    }
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(courses, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "courses.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Pannello Amministrazione (CRUD)
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gestisci i corsi, modifica la struttura delle lezioni ed esporta i
              dati completi in tempo reale su Supabase.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportJSON}
              className="gap-2"
            >
              📦 Esporta Database Completo (JSON)
            </Button>
            <Button
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Crea Nuovo Corso
            </Button>
          </div>
        </div>

        {/* Tabella Principale dei Corsi */}
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">Caricamento corsi in corso...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-muted text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Logo</th>
                  <th className="px-6 py-3.5">Corso / Slug</th>
                  <th className="px-6 py-3.5">Classi</th>
                  <th className="px-6 py-3.5">Contenuti</th>
                  <th className="px-6 py-3.5 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-background text-muted-foreground">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-muted transition-colors"
                  >
                    <td className="px-6 py-4 w-16">
                      <div className="h-10 w-10 overflow-hidden rounded-md border bg-background flex items-center justify-center text-2xl shadow-sm">
                        {course.coverImage ? (
                          course.coverImage.startsWith("http") ||
                          course.coverImage.startsWith("/") ? (
                            <img
                              src={course.coverImage}
                              alt={course.title}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span>{course.coverImage}</span>
                          )
                        ) : (
                          <span>📚</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">
                        {course.title}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        /courses/{course.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {course.allowedClasses?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {course.allowedClasses.map((cls) => (
                            <span
                              key={cls}
                              className="rounded bg-muted px-1.5 py-0.5 text-xs font-bold border"
                            >
                              {cls}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs italic text-green-600 font-medium">
                          🔓 Tutti
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-muted-foreground">
                      {course.modules?.length || 0} Moduli (
                      {course.modules?.reduce(
                        (acc, m) => acc + (m.lessons?.length || 0),
                        0,
                      ) || 0}{" "}
                      Lezioni)
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(course)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(course.id, course.title)}
                      >
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic">
                      Nessun corso trovato nel database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Form Modale Unico di Configurazione */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {editingCourse
                  ? `Modifica Corso: ${title}`
                  : "Configura Nuovo Corso"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveCourse} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Titolo Corso</Label>
                  <Input
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Slug URL</Label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={!!editingCourse}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Descrizione Breve</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Logo (Emoji o Link)</Label>
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Categoria</Label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Difficoltà</Label>
                  <Input
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Docente</Label>
                  <Input
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Ore Stimate</Label>
                  <Input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Classi Abilitate (es: Informatica 1°, Informatica 2°)</Label>
                <Input
                  value={allowedClassesInput}
                  onChange={(e) => setAllowedClassesInput(e.target.value)}
                />
              </div>

              {/* SECTION: COSTRUZIONE AVANZATA STRUTTURA ALBERO COMPONENTI */}
              <div className="mt-6 rounded-lg border border-border bg-muted p-4 space-y-4">
                <h3 className="font-bold text-foreground border-b pb-2">
                  📚 Struttura Moduli e Lezioni
                </h3>

                {/* Nuovo Modulo Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome nuovo modulo (es: Modulo 1: Fondamenti)"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                  />
                  <Button type="button" onClick={addModule} variant="secondary">
                    Aggiungi Modulo
                  </Button>
                </div>

                {/* Lista dei Moduli */}
                <div className="space-y-4 pt-2">
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="bg-background p-4 rounded-md border border-border shadow-sm space-y-3"
                    >
                      {/* INTESTAZIONE MODULO CON EDIT IN LINEA */}
                      <div className="flex items-center justify-between border-b pb-1.5 bg-muted/50 -m-4 mb-2 p-3 rounded-t-md">
                        {editingModuleId === mod.id ? (
                          <div className="flex items-center gap-2 w-full max-w-md">
                            <Input
                              size={30}
                              className="h-7 text-xs font-semibold"
                              value={editingModuleTitle}
                              onChange={(e) =>
                                setEditingModuleTitle(e.target.value)
                              }
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="h-7 text-[11px] bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => saveEditedModule(mod.id)}
                            >
                              Salva
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-7 text-[11px]"
                              onClick={() => setEditingModuleId(null)}
                            >
                              Annulla
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-foreground">
                              📂 {mod.title}
                            </h4>
                            <button
                              type="button"
                              className="text-xs text-blue-500 hover:underline"
                              onClick={() => startEditModule(mod)}
                            >
                              ✏️ Rinomina
                            </button>
                          </div>
                        )}
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:underline font-medium"
                          onClick={() => deleteModule(mod.id)}
                        >
                          🗑️ Rimuovi Modulo
                        </button>
                      </div>

                      {/* LISTA DELLE LEZIONI DEL MODULO */}
                      <div className="space-y-2 pl-2">
                        {mod.lessons?.map((l) => (
                          <div
                            key={l.id}
                            className="p-2 border rounded-md bg-muted/50 flex flex-col gap-2"
                          >
                            {editingLessonId === l.id ? (
                              <div className="space-y-2 p-1 text-xs">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-0.5">
                                    <Label className="text-[10px]">
                                      Titolo Lezione
                                    </Label>
                                    <Input
                                      className="h-7 text-xs"
                                      value={editingLessonTitle}
                                      onChange={(e) =>
                                        setEditingLessonTitle(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-0.5">
                                    <Label className="text-[10px]">
                                      Tipo Risorsa
                                    </Label>
                                    <select
                                      className="w-full h-7 rounded-md border text-xs px-2 bg-background"
                                      value={editingLessonType}
                                      onChange={(e) =>
                                        setEditingLessonType(
                                          e.target.value as any,
                                        )
                                      }
                                    >
                                      <option value="video">
                                        📺 Video YouTube
                                      </option>
                                      <option value="document">
                                        📄 Google Drive
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-[10px]">
                                    URL di Configurazione
                                  </Label>
                                  {editingLessonType === "video" ? (
                                    <Input
                                      className="h-7 text-xs"
                                      value={editingLessonYt}
                                      onChange={(e) =>
                                        setEditingLessonYt(e.target.value)
                                      }
                                      placeholder="Incolla URL YouTube"
                                    />
                                  ) : (
                                    <Input
                                      className="h-7 text-xs"
                                      value={editingLessonDrive}
                                      onChange={(e) =>
                                        setEditingLessonDrive(e.target.value)
                                      }
                                      placeholder="Incolla URL Google Docs/Drive"
                                    />
                                  )}
                                </div>
                                <div className="flex gap-2 pt-1 justify-end">
                                  <Button
                                    type="button"
                                    size="sm"
                                    className="h-6 text-[10px] bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() =>
                                      saveEditedLesson(mod.id, l.id)
                                    }
                                  >
                                    Aggiorna contenuto
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-[10px]"
                                    onClick={() => setEditingLessonId(null)}
                                  >
                                    Annulla
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span>
                                    {l.contentType === "video" ? "📺" : "📄"}
                                  </span>
                                  <span className="font-semibold text-muted-foreground">
                                    {l.title}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground italic">
                                    (
                                    {l.contentType === "video"
                                      ? "YouTube"
                                      : "Drive"}
                                    )
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => startEditLesson(l)}
                                  >
                                    ✏️ Modifica
                                  </button>
                                  <button
                                    type="button"
                                    className="text-red-500 hover:underline"
                                    onClick={() => deleteLesson(mod.id, l.id)}
                                  >
                                    🗑️ Rimuovi
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* FORM DI AGGIUNTA RAPIDA NUOVA LEZIONE */}
                      <div className="mt-3 p-2 bg-muted rounded border space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            className="h-8 text-xs"
                            placeholder="Titolo Nuova Lezione"
                            value={newLessonTitle}
                            onChange={(e) => setNewLessonTitle(e.target.value)}
                          />
                          <select
                            className="h-8 rounded-md border text-xs px-2 bg-background"
                            value={newLessonType}
                            onChange={(e) =>
                              setNewLessonType(e.target.value as any)
                            }
                          >
                            <option value="video">
                              📺 Aggiungi Video (YouTube)
                            </option>
                            <option value="document">
                              📄 Aggiungi Documento (Google Drive)
                            </option>
                          </select>
                        </div>
                        {newLessonType === "video" ? (
                          <Input
                            className="h-8 text-xs"
                            placeholder="Incolla URL Video YouTube"
                            value={newLessonYt}
                            onChange={(e) => setNewLessonYt(e.target.value)}
                          />
                        ) : (
                          <Input
                            className="h-8 text-xs"
                            placeholder="Incolla URL Condivisione Documento o PDF Drive"
                            value={newLessonDrive}
                            onChange={(e) => setNewLessonDrive(e.target.value)}
                          />
                        )}
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addLessonToModule(mod.id)}
                          className="w-full text-[11px] h-7 bg-gray-800 text-white"
                        >
                          + Salva e collega risorsa a questo modulo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold pt-2"
              >
                Salva Modifiche e Sincronizza Corso
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}