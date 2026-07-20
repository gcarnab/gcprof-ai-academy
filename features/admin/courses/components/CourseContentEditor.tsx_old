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
    if (contentType !== "markdown" && !externalUrl.trim()) return;
    if (contentType === "markdown" && !lessonContent.trim()) return;

    startTransition(async () => {
      const targetModule = courseStructure?.course_modules?.find(
        (m: any) => m.id === moduleId,
      );
      const nextOrder = (targetModule?.course_lessons?.length || 0) + 1;

      const res = await addLesson(moduleId, {
        title: lessonTitle.trim(),
        content_type: contentType,
        external_url: contentType === "markdown" ? "" : externalUrl.trim(),
        content: contentType === "markdown" ? lessonContent.trim() : "",
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

  const handleRenameModule = (moduleId: string, orderIndex: number) => {
    if (!editingModuleTitle.trim()) return;
    startTransition(async () => {
      try {
        await upsertModule(selectedCourseId, {
          id: moduleId,
          title: editingModuleTitle.trim(),
          orderIndex,
        });
        setEditingModuleId(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  const handleRenameLesson = (
    moduleId: string,
    lessonId: string,
    currentLesson: any,
  ) => {
    if (!editingLessonTitle.trim()) return;
    if (
      currentLesson.content_type === "markdown" &&
      !editingLessonContent.trim()
    ) {
      alert("Il contenuto in Markdown non può essere vuoto.");
      return;
    }
    if (
      currentLesson.content_type !== "markdown" &&
      !editingLessonExternalUrl.trim()
    ) {
      alert("L'URL della lezione è obbligatorio.");
      return;
    }

    startTransition(async () => {
      try {
        await upsertLesson(moduleId, {
          id: lessonId,
          title: editingLessonTitle.trim(),
          contentType: currentLesson.content_type,
          externalUrl:
            currentLesson.content_type === "markdown"
              ? ""
              : editingLessonExternalUrl.trim(),
          content:
            currentLesson.content_type === "markdown"
              ? editingLessonContent.trim()
              : "",
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
    if (type === "video")
      return "URL YouTube o Vimeo (es: https://www.youtube.com/watch?v=...)";
    if (type === "colab")
      return "URL Google Colab (es: https://colab.research.google.com/drive/...)";
    if (type === "document") return "URL Google Drive o link diretto al PDF";
    if (type === "sandbox")
      return "URL Embed CodeSandbox / Replit / StackBlitz";
    return "URL Esterno";
  };

  return (
    <div className="p-6 space-y-6 relative">
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
                        className="text-xs text-muted-foreground"
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
                        "colab",
                        "markdown",
                        "sandbox",
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

                    {contentType === "markdown" ? (
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
                          {les.content_type === "markdown" ? (
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

                            <button
                              onClick={() => {
                                setEditingLessonId(les.id);
                                setEditingLessonTitle(les.title ?? "");
                                setEditingLessonContent(les.content ?? "");
                                setEditingLessonExternalUrl(
                                  les.external_url ?? les.video_url ?? "",
                                );
                              }}
                              className="text-[11px] text-muted-foreground ml-1"
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
