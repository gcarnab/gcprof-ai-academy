"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  deleteModule,
  deleteLesson,
  upsertModule,
  upsertLesson,
} from "@/features/courses/services/courseActions";

import {
  addLesson,
  addModule,
  getCourseStructureAction,
  ExtendedLessonContentType,
} from "../actions/structureActions";

export default function CourseContentEditor({ courses }: { courses: any[] }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseStructure, setCourseStructure] = useState<any>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const [dbStatus, setDbStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    msg: string;
  }>({
    status: "idle",
    msg: "Pronto. Seleziona un corso per iniziare.",
  });

  // Stati per la modifica in-line (Rename / Update)
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState("");
  const [editingLessonContent, setEditingLessonContent] = useState(""); // 📝 Nuovo stato per edit Markdown
  const [editingLessonExternalUrl, setEditingLessonExternalUrl] = useState(""); // 🔗 Nuovo stato per edit URL

  const [activeModuleIdForLesson, setActiveModuleIdForLesson] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  
  // 🎯 AGGIORNATO: Esteso il tipo dello stato usando l'enum centralizzato delle Server Actions
  const [contentType, setContentType] = useState<ExtendedLessonContentType>("video");
  const [externalUrl, setExternalUrl] = useState("");
  const [lessonContent, setLessonContent] = useState(""); // Nuovo stato per il testo Markdown/Teoria

  const [isPending, startTransition] = useTransition();

  const loadCourseStructureFromDB = async (courseId: string) => {
    if (!courseId) return;
    setDbStatus({ status: "loading", msg: "Recupero struttura dal DB..." });
    const res = await getCourseStructureAction(courseId);
    if (res.success && res.data) {
      setCourseStructure(res.data);
      setDbStatus({ status: "success", msg: "Sincronizzato col Server!" });
    } else {
      setDbStatus({ status: "error", msg: res.error || "Errore sconosciuto." });
    }
  };

  useEffect(() => {
    if (selectedCourseId) loadCourseStructureFromDB(selectedCourseId);
    else setCourseStructure(null);
  }, [selectedCourseId]);

  const handleAddModule = () => {
    if (!selectedCourseId || !newModuleTitle.trim()) return;
    startTransition(async () => {
      const nextOrder = (courseStructure?.course_modules?.length || 0) + 1;
      const res = await addModule(selectedCourseId, newModuleTitle, nextOrder);
      if (res.success) {
        setNewModuleTitle("");
        await loadCourseStructureFromDB(selectedCourseId);
      }
    });
  };

  const handleAddLesson = (moduleId: string) => {
    if (!lessonTitle.trim()) return;
    // Validazione condizionale: se non è markdown, l'URL esterno è obbligatorio
    if (contentType !== "markdown" && !externalUrl.trim()) return;
    // Se è markdown, il contenuto testuale è obbligatorio
    if (contentType === "markdown" && !lessonContent.trim()) return;

    startTransition(async () => {
      const targetModule = courseStructure?.course_modules?.find(
        (m: any) => m.id === moduleId,
      );
      const nextOrder = (targetModule?.course_lessons?.length || 0) + 1;

      const res = await addLesson(moduleId, {
        title: lessonTitle,
        content_type: contentType,
        external_url: contentType === "markdown" ? "" : externalUrl.trim(),
        content: contentType === "markdown" ? lessonContent : "",
        order_index: nextOrder,
      });

      if (res.success) {
        setLessonTitle("");
        setExternalUrl("");
        setLessonContent("");
        setActiveModuleIdForLesson(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore durante il salvataggio sul DB: " + res.error);
      }
    });
  };

  // ✏️ SALVA MODIFICA MODULO
  const handleRenameModule = (moduleId: string, orderIndex: number) => {
    if (!editingModuleTitle.trim()) return;
    startTransition(async () => {
      try {
        await upsertModule(selectedCourseId, {
          id: moduleId,
          title: editingModuleTitle,
          orderIndex,
        });
        setEditingModuleId(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  // ✏️ SALVA MODIFICA LEZIONE (Titolo + Contenuto/URL)
  const handleRenameLesson = (
    moduleId: string,
    lessonId: string,
    currentLesson: any,
  ) => {
    if (!editingLessonTitle.trim()) return;
    
    // Validazioni in fase di modifica
    if (currentLesson.content_type === "markdown" && !editingLessonContent.trim()) {
      alert("Il contenuto in Markdown non può essere vuoto.");
      return;
    }
    if (currentLesson.content_type !== "markdown" && !editingLessonExternalUrl.trim()) {
      alert("L'URL della lezione è obbligatorio.");
      return;
    }

    startTransition(async () => {
      try {
        await upsertLesson(moduleId, {
          id: lessonId,
          title: editingLessonTitle,
          contentType: currentLesson.content_type,
          externalUrl: currentLesson.content_type === "markdown" ? "" : editingLessonExternalUrl.trim(),
          content: currentLesson.content_type === "markdown" ? editingLessonContent : "",
          orderIndex: currentLesson.order_index || 1,
        });
        setEditingLessonId(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  const handleDeleteModule = (moduleId: string, title: string) => {
    if (!window.confirm(`Eliminare il modulo "${title}" e tutte le sue lezioni?`)) return;
    startTransition(async () => {
      try {
        await deleteModule(moduleId);
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  const handleDeleteLesson = (lessonId: string, title: string) => {
    if (!window.confirm(`Eliminare la lezione "${title}"?`)) return;
    startTransition(async () => {
      try {
        await deleteLesson(lessonId);
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  // Helper per ricavare il corretto placeholder dell'input URL
  const getUrlPlaceholder = (type: string) => {
    if (type === "video") return "URL YouTube o Vimeo (es: https://www.youtube.com/watch?v=...)";
    if (type === "colab") return "URL Google Colab (es: https://colab.research.google.com/drive/...)";
    if (type === "document") return "URL Google Drive o link diretto al PDF";
    if (type === "sandbox") return "URL Embed CodeSandbox / Replit / StackBlitz";
    return "URL Esterno";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Intestazione */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Costruttore Struttura Corsi
        </h2>
        <p className="text-sm text-muted-foreground">
          Gestisci, rinomina ed elimina moduli e lezioni.
        </p>
      </div>

      <div
        className={`p-2.5 text-xs rounded-lg border ${dbStatus.status === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-muted text-muted-foreground"}`}
      >
        <strong>Stato Connessione:</strong> {dbStatus.msg}
      </div>

      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="w-full rounded-lg border border-border p-2 text-sm bg-background text-foreground"
      >
        <option value="">-- Seleziona un corso dal DB --</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {selectedCourseId && courseStructure && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nome nuovo modulo (es: Modulo 1)..."
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="flex-1 rounded-md border border-border p-2 text-sm bg-background text-foreground"
            />
            <Button
              onClick={handleAddModule}
              disabled={isPending}
              className="bg-blue-600 text-white"
            >
              + Modulo
            </Button>
          </div>

          <div className="space-y-4">
            {courseStructure.course_modules?.map((mod: any, mIdx: number) => (
              <div
                key={mod.id}
                className="bg-background border rounded-xl p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2 gap-4">
                  {editingModuleId === mod.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editingModuleTitle}
                        onChange={(e) => setEditingModuleTitle(e.target.value)}
                        className="border rounded p-1 text-sm flex-1 text-foreground bg-background"
                      />
                      <button
                        onClick={() =>
                          handleRenameModule(
                            mod.id,
                            mod.order_index || mIdx + 1,
                          )
                        }
                        className="text-xs text-green-600 font-bold"
                      >
                        Salva
                      </button>
                      <button
                        onClick={() => setEditingModuleId(null)}
                        className="text-xs text-muted-foreground"
                      >
                        Annulla
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {mod.title}
                      </span>
                      <button
                        onClick={() => {
                          setEditingModuleId(mod.id);
                          setEditingModuleTitle(mod.title);
                        }}
                        className="text-xs text-muted-foreground hover:text-muted-foreground"
                      >
                        ✏️
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setActiveModuleIdForLesson(
                          activeModuleIdForLesson === mod.id ? null : mod.id,
                        );
                        // Reset form lezione al cambio modulo
                        setLessonTitle("");
                        setExternalUrl("");
                        setLessonContent("");
                      }}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      {activeModuleIdForLesson === mod.id
                        ? "Annulla"
                        : "+ Lezione"}
                    </button>
                    <button
                      onClick={() => handleDeleteModule(mod.id, mod.title)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </div>

                {activeModuleIdForLesson === mod.id && (
                  <div className="bg-muted p-3 rounded-lg border space-y-2 text-sm">
                    <input
                      type="text"
                      placeholder="Titolo Lezione"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full rounded border p-1.5 bg-background text-foreground"
                    />

                    {/* Radio Buttons estesi con Markdown e Sandbox */}
                    <div className="flex gap-4 my-2 text-muted-foreground flex-wrap">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="contentType"
                          checked={contentType === "video"}
                          onChange={() => setContentType("video")}
                        />
                        🎥 Video
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="contentType"
                          checked={contentType === "document"}
                          onChange={() => setContentType("document")}
                        />
                        📄 Documento
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-blue-600 font-medium">
                        <input
                          type="radio"
                          name="contentType"
                          checked={contentType === "colab"}
                          onChange={() => setContentType("colab")}
                        />
                        🚀 Colab
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-emerald-600 font-medium">
                        <input
                          type="radio"
                          name="contentType"
                          checked={contentType === "markdown"}
                          onChange={() => setContentType("markdown")}
                        />
                        📝 Markdown
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-purple-600 font-medium">
                        <input
                          type="radio"
                          name="contentType"
                          checked={contentType === "sandbox"}
                          onChange={() => setContentType("sandbox")}
                        />
                        💻 Sandbox Live
                      </label>
                    </div>

                    {contentType === "markdown" ? (
                      <textarea
                        placeholder="Scrivi qui la tua lezione in Markdown. Puoi inserire blocchi di codice usando ```python ... ```"
                        value={lessonContent}
                        onChange={(e) => setLessonContent(e.target.value)}
                        rows={5}
                        className="w-full rounded border p-1.5 bg-background text-foreground font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={getUrlPlaceholder(contentType)}
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full rounded border p-1.5 bg-background text-foreground focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    )}

                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleAddLesson(mod.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Salva Lezione
                      </Button>
                    </div>
                  </div>
                )}

                <ul className="space-y-1.5 pl-4">
                  {mod.course_lessons?.map((les: any) => (
                    <li
                      key={les.id}
                      className="text-sm text-muted-foreground flex flex-col bg-muted p-2 rounded border border-border"
                    >
                      {editingLessonId === les.id ? (
                        <div className="flex flex-col gap-2 w-full bg-background p-2 rounded border border-border">
                          {/* Modifica Titolo */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground shrink-0">Titolo:</span>
                            <input
                              type="text"
                              value={editingLessonTitle}
                              onChange={(e) => setEditingLessonTitle(e.target.value)}
                              className="border rounded p-1 text-xs flex-1 text-foreground bg-background"
                            />
                          </div>

                          {/* Modifica Contenuto Condizionale (Markdown o URL) */}
                          {les.content_type === "markdown" ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-muted-foreground">Contenuto Markdown:</span>
                              <textarea
                                value={editingLessonContent}
                                onChange={(e) => setEditingLessonContent(e.target.value)}
                                rows={6}
                                className="w-full rounded border p-1.5 bg-background text-foreground font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-muted-foreground shrink-0">URL:</span>
                              <input
                                type="text"
                                placeholder={getUrlPlaceholder(les.content_type)}
                                value={editingLessonExternalUrl}
                                onChange={(e) => setEditingLessonExternalUrl(e.target.value)}
                                className="border rounded p-1 text-xs flex-1 text-foreground bg-background font-mono"
                              />
                            </div>
                          )}

                          {/* Pulsanti di Azione sotto */}
                          <div className="flex justify-end gap-2 text-xs pt-1.5 border-t">
                            <button
                              onClick={() => handleRenameLesson(mod.id, les.id, les)}
                              className="text-green-600 font-bold hover:underline"
                            >
                              Salva
                            </button>
                            <button
                              onClick={() => setEditingLessonId(null)}
                              className="text-muted-foreground hover:underline"
                            >
                              Annulla
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-base select-none shrink-0">
                              {les.content_type === "video" && "🎥"}
                              {les.content_type === "document" && "📄"}
                              {les.content_type === "colab" && "🚀"}
                              {les.content_type === "markdown" && "📝"}
                              {les.content_type === "sandbox" && "💻"}
                            </span>
                            <span className="font-medium text-foreground truncate">
                              {les.title}
                            </span>
                            <button
                              onClick={() => {
                                setEditingLessonId(les.id);
                                setEditingLessonTitle(les.title);
                                setEditingLessonContent(les.content || ""); // Pre-popola il markdown esistente
                                setEditingLessonExternalUrl(les.external_url || ""); // Pre-popola l'URL esistente
                              }}
                              className="text-[11px] text-muted-foreground hover:text-muted-foreground"
                            >
                              ✏️
                            </button>
                          </div>
                          <button
                            onClick={() => handleDeleteLesson(les.id, les.title)}
                            className="text-xs text-red-400 hover:text-red-600 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}