"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  deleteModule,
  deleteLesson,
  upsertLesson,
} from "@/features/courses/services/courseActions";

import {
  addLesson,
  addModule,
  updateModule,
  getCourseStructureAction,
  ExtendedLessonContentType,
} from "../actions/structureActions";

export default function CourseContentEditor({ courses }: { courses: any[] }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseStructure, setCourseStructure] = useState<any>(null);
  
  // Stati Creazione Modulo
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleIsPreview, setNewModuleIsPreview] = useState(false);

  const [dbStatus, setDbStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    msg: string;
  }>({
    status: "idle",
    msg: "Pronto. Seleziona un corso per iniziare.",
  });

  // Stati per la modifica in-line (Rename / Update Modulo)
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [editingModuleIsPreview, setEditingModuleIsPreview] = useState(false);

  // Stati per le Lezioni
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState("");
  const [editingLessonContent, setEditingLessonContent] = useState("");
  const [editingLessonExternalUrl, setEditingLessonExternalUrl] = useState("");

  const [activeModuleIdForLesson, setActiveModuleIdForLesson] = useState<
    string | null
  >(null);
  const [lessonTitle, setLessonTitle] = useState("");

  const [contentType, setContentType] =
    useState<ExtendedLessonContentType>("video");
  const [externalUrl, setExternalUrl] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  const [isPending, startTransition] = useTransition();

  // Helper per capire se il tipo richiede testo (Markdown) o URL
  const isTextBasedContent = (type: string) => type === "markdown";

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
      const res = await addModule(
        selectedCourseId,
        newModuleTitle.trim(),
        nextOrder,
        newModuleIsPreview
      );
      if (res.success) {
        setNewModuleTitle("");
        setNewModuleIsPreview(false);
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore durante la creazione del modulo: " + res.error);
      }
    });
  };

  const handleUpdateModule = (moduleId: string, orderIndex: number) => {
    if (!editingModuleTitle.trim()) return;
    startTransition(async () => {
      const res = await updateModule(moduleId, {
        title: editingModuleTitle.trim(),
        isPreview: editingModuleIsPreview,
        orderIndex,
      });

      if (res.success) {
        setEditingModuleId(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore durante l'aggiornamento del modulo: " + res.error);
      }
    });
  };

  const handleAddLesson = (moduleId: string) => {
    if (!lessonTitle.trim()) return;
    if (!isTextBasedContent(contentType) && !externalUrl.trim()) return;
    if (isTextBasedContent(contentType) && !lessonContent.trim()) return;

    startTransition(async () => {
      const targetModule = courseStructure?.course_modules?.find(
        (m: any) => m.id === moduleId,
      );
      const nextOrder = (targetModule?.course_lessons?.length || 0) + 1;

      const res = await addLesson(moduleId, {
        title: lessonTitle.trim(),
        content_type: contentType,
        external_url: isTextBasedContent(contentType) ? "" : externalUrl.trim(),
        content: isTextBasedContent(contentType) ? lessonContent.trim() : "",
        order_index: nextOrder,
      });

      if (res.success) {
        setLessonTitle("");
        setExternalUrl("");
        setLessonContent("");
        setContentType("video");
        setActiveModuleIdForLesson(null);
        setEditingLessonContent("");
        setEditingLessonExternalUrl("");
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore durante il salvataggio sul DB: " + res.error);
      }
    });
  };

  const handleRenameLesson = (
    moduleId: string,
    lessonId: string,
    currentLesson: any,
  ) => {
    if (!editingLessonTitle.trim()) return;

    const needsText = isTextBasedContent(currentLesson.content_type);

    if (needsText && !editingLessonContent.trim()) {
      alert("Il contenuto in testo/markdown non può essere vuoto.");
      return;
    }
    if (!needsText && !editingLessonExternalUrl.trim()) {
      alert("L'URL della lezione è obbligatorio.");
      return;
    }

    startTransition(async () => {
      try {
        await upsertLesson(moduleId, {
          id: lessonId,
          title: editingLessonTitle.trim(),
          contentType: currentLesson.content_type,
          externalUrl: needsText ? "" : editingLessonExternalUrl.trim(),
          content: needsText ? editingLessonContent.trim() : "",
          orderIndex: currentLesson.order_index || 1,
          duration: currentLesson.duration ?? 15,
        });
        setEditingLessonId(null);
        setEditingLessonTitle("");
        setEditingLessonContent("");
        setEditingLessonExternalUrl("");
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  const handleDeleteModule = (moduleId: string, title: string) => {
    if (
      !window.confirm(`Eliminare il modulo "${title}" e tutte le sue lezioni?`)
    )
      return;
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

  const getUrlPlaceholder = (type: string) => {
    if (type === "video") return "URL YouTube o Vimeo (es: https://www.youtube.com/watch?v=...)";
    if (type === "document") return "URL Google Drive o link diretto al PDF";
    if (type === "link") return "URL risorsa esterna (es: Documentazione ufficiale)";
    return "URL Esterno";
  };

  return (
    <div className="p-6 space-y-6 relative">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Costruttore Struttura Corsi
        </h2>
        <p className="text-sm text-muted-foreground">
          Gestisci, rinomina, imposta anteprime ed elimina moduli e lezioni.
        </p>
      </div>

      <div
        className={`p-2.5 text-xs rounded-lg border ${
          dbStatus.status === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-muted text-muted-foreground"
        }`}
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
          {/* Form Nuovo Modulo */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-900 flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Nome nuovo modulo (es: Modulo 1)..."
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="flex-1 min-w-[200px] rounded-md border border-border p-2 text-sm bg-background text-foreground"
            />
            
            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={newModuleIsPreview}
                onChange={(e) => setNewModuleIsPreview(e.target.checked)}
                className="rounded border-border"
              />
              👁️ Anteprima gratuita
            </label>

            <Button
              onClick={handleAddModule}
              disabled={isPending}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              + Modulo
            </Button>
          </div>

          {/* Lista Moduli */}
          <div className="space-y-4">
            {courseStructure.course_modules?.map((mod: any, mIdx: number) => (
              <div
                key={mod.id}
                className="bg-background border rounded-xl p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2 gap-4 flex-wrap">
                  {editingModuleId === mod.id ? (
                    <div className="flex items-center gap-3 flex-1 flex-wrap">
                      <input
                        type="text"
                        value={editingModuleTitle}
                        onChange={(e) => setEditingModuleTitle(e.target.value)}
                        className="border rounded p-1 text-sm flex-1 text-foreground bg-background min-w-[150px]"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-foreground font-medium cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={editingModuleIsPreview}
                          onChange={(e) => setEditingModuleIsPreview(e.target.checked)}
                          className="rounded border-border"
                        />
                        Anteprima
                      </label>
                      <button
                        onClick={() =>
                          handleUpdateModule(
                            mod.id,
                            mod.order_index || mIdx + 1,
                          )
                        }
                        className="text-xs text-green-600 font-bold hover:underline"
                      >
                        Salva
                      </button>
                      <button
                        onClick={() => setEditingModuleId(null)}
                        className="text-xs text-muted-foreground hover:underline"
                      >
                        Annulla
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {mod.title}
                      </span>
                      {mod.is_preview && (
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-medium border border-amber-200 dark:border-amber-800">
                          👁️ Anteprima
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setEditingModuleId(mod.id);
                          setEditingModuleTitle(mod.title);
                          setEditingModuleIsPreview(Boolean(mod.is_preview));
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                        title="Modifica modulo"
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
                        setLessonTitle("");
                        setExternalUrl("");
                        setLessonContent("");
                        setContentType("video");
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

                {/* Form Aggiunta Lezione */}
                {activeModuleIdForLesson === mod.id && (
                  <div className="bg-muted p-3 rounded-lg border space-y-2 text-sm">
                    <input
                      type="text"
                      placeholder="Titolo Lezione"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full rounded border p-1.5 bg-background text-foreground"
                    />

                    <div className="flex gap-4 my-2 text-muted-foreground flex-wrap">
                      {[
                        "video",
                        "document",
                        "markdown",
                        "link",
                      ].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-1.5 cursor-pointer capitalize font-medium text-xs"
                        >
                          <input
                            type="radio"
                            name="contentType"
                            checked={contentType === type}
                            onChange={() => setContentType(type as any)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>

                    {isTextBasedContent(contentType) ? (
                      <textarea
                        placeholder="Scrivi in Markdown..."
                        value={lessonContent}
                        onChange={(e) => setLessonContent(e.target.value)}
                        rows={5}
                        className="w-full rounded border p-1.5 bg-background text-foreground font-mono text-xs outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={getUrlPlaceholder(contentType)}
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full rounded border p-1.5 bg-background text-foreground outline-none"
                      />
                    )}

                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleAddLesson(mod.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Salva Lezione
                      </Button>
                    </div>
                  </div>
                )}

                {/* Lista Lezioni del Modulo */}
                <ul className="space-y-1.5 pl-4">
                  {mod.course_lessons?.map((les: any) => (
                    <li
                      key={les.id}
                      className="text-sm text-muted-foreground flex flex-col bg-muted p-2 rounded border border-border"
                    >
                      {editingLessonId === les.id ? (
                        <div className="flex flex-col gap-2 w-full bg-background p-2 rounded border border-border">
                          <input
                            type="text"
                            value={editingLessonTitle}
                            onChange={(e) =>
                              setEditingLessonTitle(e.target.value)
                            }
                            className="border rounded p-1 text-xs text-foreground bg-background"
                          />
                          {isTextBasedContent(les.content_type) ? (
                            <textarea
                              value={editingLessonContent}
                              onChange={(e) =>
                                setEditingLessonContent(e.target.value)
                              }
                              rows={4}
                              className="w-full rounded border p-1 bg-background text-foreground font-mono text-xs"
                            />
                          ) : (
                            <input
                              type="text"
                              value={editingLessonExternalUrl}
                              onChange={(e) =>
                                setEditingLessonExternalUrl(e.target.value)
                              }
                              className="border rounded p-1 text-xs text-foreground bg-background font-mono"
                            />
                          )}
                          <div className="flex justify-end gap-2 text-xs pt-1">
                            <button
                              onClick={() =>
                                handleRenameLesson(mod.id, les.id, les)
                              }
                              className="text-green-600 font-bold"
                            >
                              Salva
                            </button>
                            <button
                              onClick={() => setEditingLessonId(null)}
                              className="text-muted-foreground"
                            >
                              Annulla
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="font-medium text-foreground truncate">
                              {les.title}
                            </span>
                            <span className="text-[10px] uppercase bg-gray-200 dark:bg-gray-800 px-1 rounded text-gray-500">
                              {les.content_type}
                            </span>
                            <button
                              onClick={() => {
                                setEditingLessonId(les.id);
                                setEditingLessonTitle(les.title ?? "");
                                setEditingLessonContent(les.content ?? "");
                                setEditingLessonExternalUrl(
                                  les.external_url ?? les.video_url ?? "",
                                );
                              }}
                              className="text-[11px] text-muted-foreground ml-1 hover:text-foreground"
                            >
                              ✏️
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteLesson(les.id, les.title)
                            }
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