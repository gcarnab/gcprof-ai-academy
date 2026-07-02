"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Importiamo la nuova azione di lettura remota
import { addModule, addLesson, getCourseStructureAction } from "../core/actions/structureActions";

const MOCK_COURSE_STRUCTURE = {
  id: "id-corso-finto-di-test",
  title: "Informatica 1° (MODALITÀ TEST LOCALE)",
  course_modules: [
    {
      id: "mock-mod-1",
      title: "Modulo 1: Introduzione al Pensiero Computazionale",
      order_index: 1,
      course_lessons: [
        { id: "mock-les-1", title: "Cos'è un algoritmo?", content_type: "video", external_url: "https://youtube.com/..." },
        { id: "mock-les-2", title: "Dispensa sul codice binario", content_type: "document", external_url: "https://drive.google.com/..." }
      ]
    }
  ]
};

export default function CourseContentEditor({ courses }: { courses: any[] }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseStructure, setCourseStructure] = useState<any>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  
  const [dbStatus, setDbStatus] = useState<{ status: "idle" | "loading" | "success" | "error"; msg: string }>({ 
    status: "idle", 
    msg: "Pronto. Seleziona un corso dal menu a tendina per iniziare." 
  });

  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const [activeModuleIdForLesson, setActiveModuleIdForLesson] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [contentType, setContentType] = useState<"video" | "document">("video");
  const [externalUrl, setExternalUrl] = useState("");

  const [isPending, startTransition] = useTransition();

  // 🔄 AGGIORNATO: Ora interroga la Server Action sicura e protetta
  const loadCourseStructureFromDB = async (courseId: string) => {
    if (!courseId) return;
    setDbStatus({ status: "loading", msg: "Recupero struttura tramite Server Action sicura..." });

    const res = await getCourseStructureAction(courseId);

    if (!res.success) {
      setDbStatus({ status: "error", msg: `Errore Server: ${res.error}` });
      return;
    }

    if (res.data) {
      setCourseStructure(res.data);
      setDbStatus({ 
        status: "success", 
        msg: `Sincronizzato col Server! Moduli trovati nel DB: ${res.data.course_modules?.length || 0}` 
      });
    } else {
      setCourseStructure(null);
      setDbStatus({ status: "error", msg: "Nessun dato restituito dal server." });
    }
  };

  const handleForceMockData = () => {
    setIsMockMode(true);
    setSelectedCourseId(MOCK_COURSE_STRUCTURE.id);
    setCourseStructure(MOCK_COURSE_STRUCTURE);
    setDbStatus({ status: "success", msg: "Modalità Diagnostica: Visualizzazione Isolata (Dati Locali)" });
  };

  useEffect(() => {
    if (selectedCourseId) {
      if (selectedCourseId === MOCK_COURSE_STRUCTURE.id) return;
      setIsMockMode(false);
      loadCourseStructureFromDB(selectedCourseId);
    } else {
      setCourseStructure(null);
      setIsMockMode(false);
      setDbStatus({ status: "idle", msg: "Pronto. Seleziona un corso dal menu a tendina per iniziare." });
    }
  }, [selectedCourseId]);

  const handleAddModule = () => {
    if (!selectedCourseId || !newModuleTitle.trim()) return;

    startTransition(async () => {
      if (isMockMode) {
        const newMockMod = {
          id: "mock-mod-" + Date.now(),
          title: newModuleTitle,
          order_index: (courseStructure?.course_modules?.length || 0) + 1,
          course_lessons: []
        };
        setCourseStructure({
          ...courseStructure,
          course_modules: [...(courseStructure.course_modules || []), newMockMod]
        });
        setNewModuleTitle("");
        return;
      }

      const nextOrder = (courseStructure?.course_modules?.length || 0) + 1;
      const res = await addModule(selectedCourseId, newModuleTitle, nextOrder);

      if (res.success) {
        setNewModuleTitle("");
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore Server Action: " + res.error);
      }
    });
  };

  const handleAddLesson = (moduleId: string) => {
    if (!lessonTitle.trim() || !externalUrl.trim()) return;

    startTransition(async () => {
      if (isMockMode) {
        const updatedModules = courseStructure.course_modules.map((m: any) => {
          if (m.id !== moduleId) return m;
          return {
            ...m,
            course_lessons: [
              ...(m.course_lessons || []),
              { id: "mock-les-" + Date.now(), title: lessonTitle, content_type: contentType, external_url: externalUrl }
            ]
          };
        });
        setCourseStructure({ ...courseStructure, course_modules: updatedModules });
        setLessonTitle("");
        setExternalUrl("");
        setActiveModuleIdForLesson(null);
        return;
      }

      const targetModule = courseStructure?.course_modules?.find((m: any) => m.id === moduleId);
      const nextOrder = (targetModule?.course_lessons?.length || 0) + 1;

      const res = await addLesson(moduleId, {
        title: lessonTitle,
        content_type: contentType,
        external_url: externalUrl,
        order_index: nextOrder,
      });

      if (res.success) {
        setLessonTitle("");
        setExternalUrl("");
        setActiveModuleIdForLesson(null);
        await loadCourseStructureFromDB(selectedCourseId);
      } else {
        alert("Errore Server Action lezione: " + res.error);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Intestazione */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Costruttore Struttura Corsi</h2>
          <p className="text-sm text-gray-500">Gestisci i moduli e inserisci le lezioni.</p>
        </div>
        <Button onClick={handleForceMockData} variant="outline" className="text-xs border-amber-500 text-amber-700 hover:bg-amber-50">
          ⚙️ Forza Test UI (Isolamento Totale)
        </Button>
      </div>

      {/* BOX DIAGNOSTICA */}
      <div className={`p-3 text-xs rounded-lg border ${
        dbStatus.status === "loading" ? "bg-blue-50 border-blue-200 text-blue-700 animate-pulse" :
        dbStatus.status === "error" ? "bg-red-50 border-red-200 text-red-700 font-bold" :
        dbStatus.status === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
        "bg-gray-50 border-gray-200 text-gray-500"
      }`}>
        <strong>Stato Connessione:</strong> {dbStatus.msg}
      </div>

      {/* Selettore Corso */}
      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none bg-white text-gray-900"
      >
        <option value="">-- Seleziona un corso dal DB --</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>{c.title}</option>
        ))}
      </select>

      {/* BLOCCO STRUTTURA VISIVA */}
      {selectedCourseId && courseStructure && (
        <div className="space-y-6">
          {/* Form Inserimento Modulo */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex gap-2 items-center">
            <input
              type="text"
              placeholder={isMockMode ? "Aggiungi modulo finto alla UI..." : "Nome nuovo modulo reale (es: Modulo 1)..."}
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 p-2 text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <Button onClick={handleAddModule} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
              + Modulo
            </Button>
          </div>

          {/* Elenco ad albero */}
          <div className="space-y-4">
            {courseStructure.course_modules?.length === 0 ? (
              <p className="text-sm text-gray-400 italic bg-gray-50 p-6 rounded-lg border border-dashed text-center">
                Nessun modulo presente nel database per questo corso. Usa il form sopra per crearne uno.
              </p>
            ) : (
              courseStructure.course_modules.map((mod: any) => (
                <div key={mod.id} className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-800">{mod.title}</span>
                    <button
                      onClick={() => setActiveModuleIdForLesson(activeModuleIdForLesson === mod.id ? null : mod.id)}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      {activeModuleIdForLesson === mod.id ? "Annulla" : "+ Aggiungi Lezione"}
                    </button>
                  </div>

                  {/* Form Sotto-Lezione */}
                  {activeModuleIdForLesson === mod.id && (
                    <div className="bg-gray-50 p-3 rounded-lg border space-y-2 text-sm">
                      <input
                        type="text"
                        placeholder="Titolo Lezione"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        className="w-full rounded border p-1.5 bg-white text-gray-900"
                      />
                      <div className="flex gap-4 my-2 text-gray-700">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="contentType" checked={contentType === "video"} onChange={() => setContentType("video")} />
                          🎥 Video
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="contentType" checked={contentType === "document"} onChange={() => setContentType("document")} />
                          📄 Documento
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder={contentType === "video" ? "URL Video YouTube" : "URL Documento Google Drive"}
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full rounded border p-1.5 bg-white text-gray-900"
                      />
                      <div className="flex justify-end">
                        <Button size="sm" onClick={() => handleAddLesson(mod.id)} disabled={isPending} className="bg-green-600 hover:bg-green-700 text-white">
                          Salva Lezione
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Lezioni del modulo */}
                  <ul className="space-y-1.5 pl-4">
                    {mod.course_lessons?.length === 0 ? (
                      <li className="text-xs text-gray-400 italic">Nessuna lezione presente.</li>
                    ) : (
                      mod.course_lessons.map((les: any) => (
                        <li key={les.id} className="text-sm text-gray-600 flex items-center gap-2 bg-gray-50 p-1.5 rounded border border-gray-100">
                          <span>{les.content_type === "video" ? "🎥" : "📄"}</span>
                          <span className="font-medium flex-1 text-gray-800">{les.title}</span>
                          <span className="text-[11px] text-gray-400 max-w-[200px] truncate">{les.external_url}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}