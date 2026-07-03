"use client";

import { useState, useEffect, useTransition } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";

interface DocConfig {
  id: string;
  label: string;
  file_path: string;
}

interface Props {
  initialMarkdown: string;
}

export default function CreditsClientWrapper({ initialMarkdown }: Props) {
  const { user, isLoading: authLoading } = useAuth();
  const [isPending, startTransition] = useTransition();

  // Ruolo Amministratore reale
  const isAdmin = user?.role === "admin";

  const [tabs, setTabs] = useState<DocConfig[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("markdown");
  const [markdownContent] = useState(initialMarkdown);
  const [htmlSlides, setHtmlSlides] = useState("<h1>Caricamento slide...</h1>");
  
  const [editingConfig, setEditingConfig] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 1. Carica le configurazioni dinamiche (Sempre accessibile in lettura)
  useEffect(() => {
    fetch("/api/docs/config")
      .then((res) => {
        if (!res.ok) throw new Error("Impossibile recuperare i canali di configurazione");
        return res.json();
      })
      .then((data: DocConfig[]) => {
        setTabs(data);
        const formState: Record<string, string> = {};
        data.forEach((item) => { formState[item.id] = item.file_path; });
        setEditingConfig(formState);
      })
      .catch((err) => setFetchError(err.message));
  }, [saveSuccess]);

  // 2. Carica le slide HTML (Sempre accessibile in lettura)
  useEffect(() => {
    if (activeTabId === "html") {
      fetch("/showcase/index.txt")
        .then((res) => res.text())
        .then((text) => setHtmlSlides(text))
        .catch(() => setHtmlSlides("<h1>Errore nel caricamento del template delle slide</h1>"));
    }
  }, [activeTabId]);

  const handleFileBrowse = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const folder = id === "html" ? "/showcase/" : "/docs/";
    setEditingConfig((prev) => ({ ...prev, [id]: `${folder}${file.name}` }));
  };

  const handleSave = (id: string) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/docs/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, file_path: editingConfig[id] })
        });
        
        if (res.ok) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2500);
        } else {
          const errData = await res.json();
          alert(`Errore lato server: ${errData.error}`);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Errore di rete";
        alert(errorMessage);
      }
    });
  };

  const renderSafeText = (text: string) => {
    const cleanText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const withBold = cleanText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const withCode = withBold.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-purple-600 px-1 py-0.5 rounded border font-mono text-xs">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: withCode }} />;
  };

  if (authLoading) {
    return <div className="text-center p-12 text-slate-500 font-medium">Inizializzazione Workspace...</div>;
  }

  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div className="space-y-6">
      {/* HEADER DINAMICO IN BASE ALLO STATO DI AUTENTICAZIONE */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Document Workspace</h1>
          <p className="text-sm text-slate-500">Hub centralizzato multimediale della piattaforma.</p>
        </div>
        
        <div className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-slate-100 text-slate-700">
          {user ? (
            <span>👤 Utente: <span className="text-purple-600">{user.displayName}</span> ({isAdmin ? "Amministratore" : "Sola Lettura"})</span>
          ) : (
            <span className="text-amber-600">🌐 Visualizzazione Pubblica (Sola Lettura)</span>
          )}
        </div>
      </div>

      {fetchError && <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl">{fetchError}</div>}

      {/* PANNELLO DI MODIFICA DEI PERCORSI: COMPARIRE SOLO SE LOGGATO COME ADMIN */}
      {isAdmin && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg border border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-purple-400">Pannello Gestione Canali Dashboard</h3>
            {saveSuccess && <span className="text-xs text-emerald-400 font-bold">✓ Modifiche salvate nel Database!</span>}
            {isPending && <span className="text-xs text-purple-400 animate-pulse font-bold">Salvataggio in corso...</span>}
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
                    disabled={isPending}
                  />
                  {(tab.id === "pdf" || tab.id === "html") && (
                    <label className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg cursor-pointer flex items-center font-bold">
                      Sfoglia
                      <input type="file" accept={tab.id === "pdf" ? ".pdf" : ".txt,.html"} onChange={(e) => handleFileBrowse(e, tab.id)} className="hidden" disabled={isPending} />
                    </label>
                  )}
                  <button 
                    onClick={() => handleSave(tab.id)}
                    className="bg-purple-600 hover:bg-purple-700 font-bold px-3 rounded-lg transition-colors"
                    disabled={isPending}
                  >
                    Salva
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISUALIZZATORE UNIFICATO IN SOLA LETTURA (Sempre Visibile a Tutti) */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="bg-slate-900 p-4 flex flex-wrap gap-2 justify-end border-b border-slate-800">
          {!tabs.some(t => t.id === "markdown") && (
            <button
              onClick={() => setActiveTabId("markdown")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTabId === "markdown" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Documentazione (.md)
            </button>
          )}
          
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

        <div className="relative w-full aspect-video bg-slate-100 min-h-[550px]">
          {activeTabId === "markdown" && (
            <div className="absolute inset-0 w-full h-full p-8 md:p-12 overflow-y-auto bg-white prose text-slate-800">
              {markdownContent.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("# ")) return <h1 key={i} className="text-3xl font-black border-b pb-2 mb-4">{trimmed.replace("# ", "")}</h1>;
                if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold border-l-4 border-purple-500 pl-3 my-4">{trimmed.replace("## ", "")}</h2>;
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                  return <li key={i} className="list-disc ml-6 text-slate-700">{renderSafeText(trimmed.substring(2))}</li>;
                }
                if (!trimmed) return <div key={i} className="h-2" />;
                return <p key={i}>{renderSafeText(trimmed)}</p>;
              })}
            </div>
          )}

          {activeTabId === "html" && (
            <iframe srcDoc={htmlSlides} className="absolute inset-0 w-full h-full border-none bg-[#0c0c0c]" title="HTML Viewer" />
          )}

          {activeTabId !== "markdown" && activeTabId !== "html" && activeTab && (
            activeTabId === "pdf" ? (
              <embed src={activeTab.file_path} type="application/pdf" className="absolute inset-0 w-full h-full" />
            ) : (
              <iframe src={activeTab.file_path} className="absolute inset-0 w-full h-full border-none" allowFullScreen title="Cloud Document" />
            )
          )}
        </div>
      </div>
    </div>
  );
}