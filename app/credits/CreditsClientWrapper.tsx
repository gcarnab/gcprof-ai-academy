"use client";

import { useState, useEffect } from "react";

interface DocConfig {
  id: string;
  label: string;
  file_path: string;
}

interface Props {
  initialMarkdown: string;
}

export default function CreditsClientWrapper({ initialMarkdown }: Props) {
  // 🔐 CONTROLLO AUTENTICAZIONE REALE: In produzione collegalo a supabase.auth.getUser()
  // Se è false, un utente comune non vedrà MAI i campi di input o il tasto "Sfoglia/Salva"
  const [isAdmin, setIsAdmin] = useState(true); 

  const [tabs, setTabs] = useState<DocConfig[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("markdown");
  const [markdownContent, setMarkdownContent] = useState(initialMarkdown);
  const [htmlSlides, setHtmlSlides] = useState("<h1>Caricamento slide...</h1>");
  
  // Stati per il form dell'admin
  const [editingConfig, setEditingConfig] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. Carica le configurazioni dinamiche dal Database
  useEffect(() => {
    fetch("/api/docs/config")
      .then(res => res.json())
      .then((data: DocConfig[]) => {
        setTabs(data);
        // Prepopola lo stato del form di modifica dell'admin
        const formState: Record<string, string> = {};
        data.forEach(item => { formState[item.id] = item.file_path; });
        setEditingConfig(formState);
      });
  }, [saveSuccess]);

  // 2. Carica il file TXT delle slide HTML quando si seleziona il tab interno
  useEffect(() => {
    if (activeTabId === "html") {
      fetch("/showcase/index.txt")
        .then(res => res.text())
        .then(text => setHtmlSlides(text))
        .catch(() => setHtmlSlides("<h1>Errore nel caricamento del template delle slide</h1>"));
    }
  }, [activeTabId]);

  // Gestione della selezione dei file locali (Browse)
  const handleFileBrowse = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const folder = id === "html" ? "/showcase/" : "/docs/";
    setEditingConfig(prev => ({ ...prev, [id]: `${folder}${file.name}` }));
  };

  // Salvataggio sul Database tramite API
  const handleSave = async (id: string) => {
    const res = await fetch("/api/docs/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, file_path: editingConfig[id] })
    });
    if (res.ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="space-y-6">
      {/* Intestazione */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Document Workspace</h1>
          <p className="text-sm text-slate-500">Hub centralizzato multimediale della piattaforma.</p>
        </div>
        
        {/* Simulatore di Ruolo per i tuoi test locali */}
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${isAdmin ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"}`}
        >
          {isAdmin ? "👨‍💻 Vista Admin Actived" : "👁️ Vista Utente Comune"}
        </button>
      </div>

      {/* DASHBOARD ADMIN: Visibile SOLO se isAdmin è true */}
      {isAdmin && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg border border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-purple-400">Pannello Gestione Canali Dashboard</h3>
            {saveSuccess && <span className="text-xs text-emerald-400 font-bold">✓ Modifiche salvate nel Database!</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {tabs.map((tab) => (
              <div key={tab.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 capitalize">{tab.label}</span>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingConfig[tab.id] || ""} 
                    onChange={(e) => setEditingConfig(prev => ({ ...prev, [tab.id]: e.target.value }))}
                    className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-[11px]"
                  />
                  {/* Se è un file locale diamo il tasto sfoglia, altrimenti solo salvataggio */}
                  {(tab.id === "pdf" || tab.id === "html") && (
                    <label className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg cursor-pointer flex items-center font-bold">
                      Sfoglia
                      <input type="file" accept={tab.id === "pdf" ? ".pdf" : ".txt,.html"} onChange={(e) => handleFileBrowse(e, tab.id)} className="hidden" />
                    </label>
                  )}
                  <button 
                    onClick={() => handleSave(tab.id)}
                    className="bg-purple-600 hover:bg-purple-700 font-bold px-3 rounded-lg transition-colors"
                  >
                    Salva
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISUALIZZATORE UNIFICATO (Per tutti gli utenti) */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Barra dei Tab Dinamica alimentata dal DB */}
        <div className="bg-slate-900 p-4 flex flex-wrap gap-2 justify-end border-b border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTabId === tab.id ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schermo di Rendering Intelligente per Formato */}
        <div className="relative w-full aspect-video bg-slate-100 min-h-[550px]">
          {activeTabId === "markdown" && (
            <div className="absolute inset-0 w-full h-full p-8 md:p-12 overflow-y-auto bg-white prose text-slate-800">
              {markdownContent.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("# ")) return <h1 key={i} className="text-3xl font-black border-b pb-2 mb-4">{trimmed.replace("# ", "")}</h1>;
                if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold border-l-4 border-purple-500 pl-3 my-4">{trimmed.replace("## ", "")}</h2>;
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) return <li key={i} className="list-disc ml-6 text-slate-700" dangerouslySetInnerHTML={{ __html: trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                if (!trimmed) return <div key={i} className="h-2" />;
                return <p key={i} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="bg-slate-100 text-purple-600 px-1 py-0.5 rounded border font-mono text-xs">$1</code>') }} />;
              })}
            </div>
          )}

          {activeTabId === "html" && (
            <iframe srcDoc={htmlSlides} className="absolute inset-0 w-full h-full border-none bg-[#0c0c0c]" title="HTML Viewer" />
          )}

          {/* Renderizzatore polimorfico universale per PDF, Docs, Sheets e Slides Cloud */}
          {activeTabId !== "markdown" && activeTabId !== "html" && activeTab && (
            activeTabId === "pdf" ? (
              <embed src={activeTab.file_path} type="application/pdf" className="absolute inset-0 w-full h-full" />
            ) : (
              <iframe src={activeTab.file_path} className="absolute inset-0 w-full h-full border-none" allowFullScreen />
            )
          )}
        </div>
      </div>
    </div>
  );
}