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

  // Stati per la modifica in-line (Rename)
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState("");

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

  // ✏️ SALVA MODIFICA LEZIONE
  const handleRenameLesson = (
    moduleId: string,
    lessonId: string,
    currentLesson: any,
  ) => {
    if (!editingLessonTitle.trim()) return;
    startTransition(async () => {
      try {
        await upsertLesson(moduleId, {
          id: lessonId,
          title: editingLessonTitle,
          contentType: currentLesson.content_type,
          externalUrl: currentLesson.external_url,
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
  const getUrlPlaceholder = () => {
    if (contentType === "video") return "URL YouTube o Vimeo (es: https://www.youtube.com/watch?v=...)";
    if (contentType === "colab") return "URL Google Colab (es: https://colab.research.google.com/drive/...)";
    if (contentType === "document") return "URL Google Drive o link diretto al PDF";
    if (contentType === "sandbox") return "URL Embed CodeSandbox / Replit / StackBlitz";
    return "URL Esterno";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Intestazione */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Costruttore Struttura Corsi
        </h2>
        <p className="text-sm text-gray-500">
          Gestisci, rinomina ed elimina moduli e lezioni.
        </p>
      </div>

      <div
        className={`p-2.5 text-xs rounded-lg border ${dbStatus.status === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-gray-50 text-gray-500"}`}
      >
        <strong>Stato Connessione:</strong> {dbStatus.msg}
      </div>

      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-white text-gray-900"
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
              className="flex-1 rounded-md border border-gray-300 p-2 text-sm bg-white text-gray-900"
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
                className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2 gap-4">
                  {editingModuleId === mod.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editingModuleTitle}
                        onChange={(e) => setEditingModuleTitle(e.target.value)}
                        className="border rounded p-1 text-sm flex-1 text-gray-900 bg-white"
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
                        className="text-xs text-gray-400"
                      >
                        Annulla
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">
                        {mod.title}
                      </span>
                      <button
                        onClick={() => {
                          setEditingModuleId(mod.id);
                          setEditingModuleTitle(mod.title);
                        }}
                        className="text-xs text-gray-400 hover:text-gray-600"
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
                  <div className="bg-gray-50 p-3 rounded-lg border space-y-2 text-sm">
                    <input
                      type="text"
                      placeholder="Titolo Lezione"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full rounded border p-1.5 bg-white text-gray-900"
                    />

                    {/* 🎯 AGGIORNATO: Radio Buttons estesi con Markdown e Sandbox */}
                    <div className="flex gap-4 my-2 text-gray-700 flex-wrap">
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

                    {/* 🎯 AGGIORNATO: Input condizionale basato sul tipo selezionato */}
                    {contentType === "markdown" ? (
                      <textarea
                        placeholder="Scrivi qui la tua lezione in Markdown. Puoi inserire blocchi di codice usando ```python ... ```"
                        value={lessonContent}
                        onChange={(e) => setLessonContent(e.target.value)}
                        rows={5}
                        className="w-full rounded border p-1.5 bg-white text-gray-900 font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={getUrlPlaceholder()}
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full rounded border p-1.5 bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 outline-none"
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
                      className="text-sm text-gray-600 flex items-center justify-between bg-gray-50 p-1.5 rounded border border-gray-100"
                    >
                      {editingLessonId === les.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={editingLessonTitle}
                            onChange={(e) => setEditingLessonTitle(e.target.value)}
                            className="border rounded p-0.5 text-xs flex-1 text-gray-900 bg-white"
                          />
                          <button
                            onClick={() => handleRenameLesson(mod.id, les.id, les)}
                            className="text-xs text-green-600 font-bold"
                          >
                            Ok
                          </button>
                          <button
                            onClick={() => setEditingLessonId(null)}
                            className="text-xs text-gray-400"
                          >
                            Annulla
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {/* 🎯 AGGIORNATO: Iconografia estesa per mappare visivamente i 5 formati */}
                            <span className="text-base select-none shrink-0">
                              {les.content_type === "video" && "🎥"}
                              {les.content_type === "document" && "📄"}
                              {les.content_type === "colab" && "🚀"}
                              {les.content_type === "markdown" && "📝"}
                              {les.content_type === "sandbox" && "💻"}
                            </span>
                            <span className="font-medium text-gray-800 truncate">
                              {les.title}
                            </span>
                            <button
                              onClick={() => {
                                setEditingLessonId(les.id);
                                setEditingLessonTitle(les.title);
                              }}
                              className="text-[11px] text-gray-400 hover:text-gray-600"
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
                        </>
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