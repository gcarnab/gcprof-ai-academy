"use client";

import { useState, useEffect } from "react";
import {
  getMergedCourses,
  saveCmsCourse,
  deleteCmsCourse,
} from "@/features/courses/services/courseService";
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

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Stati del Form Principale
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Informatica");
  const [difficulty, setDifficulty] = useState("Facile");
  const [teacher, setTeacher] = useState("Prof. G. Carnabuci");
  const [estimatedHours, setEstimatedHours] = useState(20);
  const [coverImage, setCoverImage] = useState("📚");
  const [allowedClassesInput, setAllowedClassesInput] = useState("");
  const [modules, setModules] = useState<Module[]>([]);

  // Stati per la creazione rapida di Moduli/Lezioni all'interno del form
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState<"video" | "document">(
    "video",
  );
  const [newLessonYt, setNewLessonYt] = useState("");
  const [newLessonDrive, setNewLessonDrive] = useState("");

  useEffect(() => {
    refreshCourses();
  }, []);

  const refreshCourses = () => {
    setCourses(getMergedCourses());
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

  // Apre il modal in modalità "Crea"
  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("Informatica");
    setDifficulty("Facile");
    setTeacher("Prof. G. Carnabuci");
    setEstimatedHours(20);
    setCoverImage("📚");
    setAllowedClassesInput("");
    setModules([]);
    setIsDialogOpen(true);
  };

  // Apre il modal in modalità "Modifica" (READ per l'UPDATE)
  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setSlug(course.slug);
    setDescription(course.description);
    setCategory(course.category);
    setDifficulty(course.difficulty);
    setTeacher(course.teacher);
    setEstimatedHours(course.estimatedHours);
    setCoverImage(course.coverImage || "📚");
    setAllowedClassesInput(course.allowedClasses?.join(", ") || "");
    setModules(course.modules || []);
    setIsDialogOpen(true);
  };

  // Eliminazione Corso (DELETE)
  const handleDelete = (courseId: number, courseTitle: string) => {
    if (
      confirm(
        `Sei sicuro di voler eliminare definitivamente il corso "${courseTitle}"? Questa azione non è reversibile.`,
      )
    ) {
      deleteCmsCourse(courseId);
      refreshCourses();
    }
  };

  // Gestione Moduli nel Form
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

  // Salvataggio Finale (CREATE o UPDATE)
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;

    const allowedClasses = allowedClassesInput
      ? allowedClassesInput
          .split(",")
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean)
      : [];

    const finalCourse: Course = {
      id: editingCourse ? editingCourse.id : Date.now(), // Mantiene l'ID se modifica
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
      modules, // Include l'intera struttura di video e documenti inseriti!
    };

    saveCmsCourse(finalCourse);
    refreshCourses();
    setIsDialogOpen(false);
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Pannello Amministrazione (CRUD)
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestisci i corsi, esporta il codice completo e assegna contenuti
              multimediali.
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

        {/* Tabella con azioni di Modifica ed Eliminazione */}
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Logo</th>
                <th className="px-6 py-3.5">Corso / Slug</th>
                <th className="px-6 py-3.5">Classi</th>
                <th className="px-6 py-3.5">Contenuti</th>
                <th className="px-6 py-3.5 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {/* Tabella Corsi - Riga del Logo aggiornata */}
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* 🎯 NUOVA LOGICA: Gestione intelligente del logo anche nell'Admin */}
                  <td className="px-6 py-4 w-16">
                    <div className="h-10 w-10 overflow-hidden rounded-md border bg-white flex items-center justify-center text-2xl shadow-sm">
                      {course.coverImage ? (
                        course.coverImage.startsWith("http") ||
                        course.coverImage.startsWith("/") ? (
                          <img
                            src={course.coverImage}
                            alt={course.title}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          /* Se è un'emoji */
                          <span>{course.coverImage}</span>
                        )
                      ) : (
                        /* Fallback */
                        <span>📚</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      {course.title}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      /courses/{course.slug}
                    </div>
                  </td>

                  {/* ... il resto dei campi <td> della tabella rimane invariato ... */}
                  <td className="px-6 py-4">
                    {course.allowedClasses?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {course.allowedClasses.map((cls) => (
                          <span
                            key={cls}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-bold border"
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
                  <td className="px-6 py-4 font-medium text-gray-500">
                    {course.modules?.length || 0} Moduli (
                    {course.modules?.reduce(
                      (acc, m) => acc + m.lessons.length,
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
            </tbody>
          </table>
        </div>

        {/* Dialog Unico per Creazione e Modifica */}
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
                <Label>Classi Abilitate (es: 1A, 1B)</Label>
                <Input
                  value={allowedClassesInput}
                  onChange={(e) => setAllowedClassesInput(e.target.value)}
                />
              </div>

              {/* 🎯 SEZIONE COSTRUZIONE CONTENUTI (VIDEO & DOCUMENTI) */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2">
                  📚 Struttura Moduli e Lezioni
                </h3>

                {/* Aggiungi Modulo */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome nuovo modulo (es: Modulo 1: Basi)"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                  />
                  <Button type="button" onClick={addModule} variant="secondary">
                    Aggiungi Modulo
                  </Button>
                </div>

                {/* Elenco dei moduli correnti con form inserimento lezioni */}
                <div className="space-y-3 pt-2">
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="bg-white p-3 rounded-md border border-gray-200 shadow-sm"
                    >
                      <h4 className="font-semibold text-sm text-gray-800">
                        📂 {mod.title}
                      </h4>

                      {/* Elenco lezioni già inserite nel modulo */}
                      <ul className="text-xs text-gray-500 my-2 space-y-1 ml-4 list-disc">
                        {mod.lessons.map((l) => (
                          <li key={l.id}>
                            <span className="font-medium text-gray-700">
                              {l.title}
                            </span>{" "}
                            (
                            {l.contentType === "video"
                              ? "📺 Video YouTube"
                              : "📄 Google Drive Document"}
                            )
                          </li>
                        ))}
                      </ul>

                      {/* Mini-Form per aggiungere Lezione al Modulo specifico */}
                      <div className="mt-3 p-2 bg-gray-50 rounded border space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            className="h-8 text-xs"
                            placeholder="Titolo Lezione"
                            value={newLessonTitle}
                            onChange={(e) => setNewLessonTitle(e.target.value)}
                          />
                          <select
                            className="h-8 rounded-md border text-xs px-2 bg-white"
                            value={newLessonType}
                            onChange={(e) =>
                              setNewLessonType(e.target.value as any)
                            }
                          >
                            <option value="video">📺 Video (YouTube)</option>
                            <option value="document">
                              📄 Documento (Google Drive)
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
                            placeholder="Incolla URL Condivisione Documento Google Drive"
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
                          + Collega Risorsa a questo Modulo
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
