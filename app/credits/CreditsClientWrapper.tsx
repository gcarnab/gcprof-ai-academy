"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { MarkdownPreview } from "@/features/courses/components/MarkdownPreview";

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

  const isAdmin = user?.role === "admin";

  const [tabs, setTabs] = useState<DocConfig[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("markdown");
  const [markdownContent, setMarkdownContent] = useState(initialMarkdown);
  const [htmlSlides, setHtmlSlides] = useState("<h1>Caricamento slide...</h1>");

  const [editingConfig, setEditingConfig] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // OPTIMIZATION 1: Centralizzazione del fetch slegata dalla reattività di 'saveSuccess' (Evita il Double Fetch)
  const loadConfig = useCallback(() => {
    fetch("/api/docs/config")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossibile recuperare i canali di configurazione");
        }
        return res.json();
      })
      .then((data: DocConfig[]) => {
        setTabs(data);
        const formState: Record<string, string> = {};
        data.forEach((item) => {
          formState[item.id] = item.file_path;
        });
        setEditingConfig(formState);
      })
      .catch((err) => setFetchError(err.message));
  }, []);

  // Caricamento iniziale dei canali
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  // Se il file markdown visualizzato cambia o viene aggiornato dall'URL caricato
  useEffect(() => {
    if (activeTabId === "markdown" && tabs.length > 0) {
      const mdTab = tabs.find(t => t.id === "markdown");
      if (mdTab && mdTab.file_path.startsWith("http")) {
        fetch(mdTab.file_path, { cache: "no-store" })
          .then(res => res.ok ? res.text() : initialMarkdown)
          .then(text => setMarkdownContent(text))
          .catch(() => setMarkdownContent(initialMarkdown));
      }
    }
  }, [activeTabId, tabs, initialMarkdown]);

  // OPTIMIZATION 3: Caching del template HTML delle slide per prevenire chiamate di rete al cambio ripetuto di tab
  useEffect(() => {
    if (activeTabId === "html" && htmlSlides === "<h1>Caricamento slide...</h1>") {
      fetch("/showcase/index.html")
        .then((res) => res.text())
        .then((text) => setHtmlSlides(text))
        .catch(() =>
          setHtmlSlides(
            "<h1>Errore nel caricamento del template delle slide</h1>",
          ),
        );
    }
  }, [activeTabId, htmlSlides]);

  // Gestione dinamica dell'upload sul Bucket di Supabase Storage
  const handleFileBrowse = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vincolo dimensione file: 1MB massimo per motivi di sicurezza
    if (file.size > 1048576) {
      alert("Il file supera la dimensione massima consentita di 1MB.");
      return;
    }

    setUploadingId(id);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("channelId", id);

    try {
      const response = await fetch("/api/docs/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'upload.");
      }

      const data = await response.json();
      
      // Assegna l'URL pubblico restituito da Supabase Storage all'input
      setEditingConfig((prev) => ({
        ...prev,
        [id]: data.publicUrl,
      }));
    } catch (err: any) {
      alert(`Impossibile caricare il file: ${err.message}`);
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = (id: string) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/docs/config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            file_path: editingConfig[id],
          }),
        });

        if (res.ok) {
          setSaveSuccess(true);
          loadConfig();
          setTimeout(() => setSaveSuccess(false), 2500);
        } else {
          const errData = await res.json();
          alert(`Errore lato server: ${errData.error}`);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Errore di rete";
        alert(errorMessage);
      }
    });
  };

  if (authLoading) {
    return (
      <div className="text-center p-12 text-muted-foreground font-medium animate-pulse">
        Inizializzazione Workspace...
      </div>
    );
  }

  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div className="space-y-6 transition-colors duration-200">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            Document Workspace
          </h1>
          <p className="text-sm text-muted-foreground">
            Hub centralizzato multimediale della piattaforma.
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl border border-border bg-muted text-muted-foreground">
          {user ? (
            <span>
              👤 Utente:{" "}
              <span className="text-primary">{user.displayName}</span> (
              {isAdmin ? "Amministratore" : "Sola Lettura"})
            </span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400">
              🌐 Visualizzazione Pubblica (Sola Lettura)
            </span>
          )}
        </div>
      </div>

      {fetchError && (
        <div className="p-4 bg-destructive/10 text-destructive text-xs rounded-xl">
          {fetchError}
        </div>
      )}

      {/* ADMIN */}
      {isAdmin && (
        <div className="p-6 bg-card text-card-foreground rounded-2xl space-y-4 shadow-lg border border-border">
          <div className="flex justify-between items-center border-b border-border pb-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-primary">
              Pannello Gestione Canali Dashboard
            </h3>

            {saveSuccess && (
              <span className="text-xs text-emerald-500 font-bold">
                ✓ Modifiche salvate nel Database!
              </span>
            )}

            {isPending && (
              <span className="text-xs text-primary animate-pulse font-bold">
                Salvataggio in corso...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="p-3 bg-muted/50 rounded-xl border border-border space-y-1.5 flex flex-col justify-between"
              >
                <span className="font-bold text-muted-foreground capitalize">
                  {tab.label}
                </span>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingConfig[tab.id] || ""}
                    onChange={(e) =>
                      setEditingConfig((prev) => ({
                        ...prev,
                        [tab.id]: e.target.value,
                      }))
                    }
                    className="flex-1 p-2 bg-background border border-border rounded-lg text-foreground font-mono text-[11px] outline-none focus:border-primary transition-colors"
                    disabled={isPending || uploadingId === tab.id}
                    placeholder="URL o percorso locale del file"
                  />

                  <label className={`px-3 py-2 rounded-lg cursor-pointer flex items-center font-bold text-center transition ${
                    uploadingId === tab.id 
                      ? "bg-muted text-muted-foreground cursor-not-allowed animate-pulse" 
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}>
                    {uploadingId === tab.id ? "..." : "Sfoglia"}
                    <input
                      type="file"
                      accept={tab.id === "pdf" ? ".pdf" : tab.id === "html" ? ".html" : ".md"}
                      onChange={(e) => handleFileBrowse(e, tab.id)}
                      className="hidden"
                      disabled={isPending || uploadingId === tab.id}
                    />
                  </label>

                  <button
                    onClick={() => handleSave(tab.id)}
                    className="bg-primary text-primary-foreground hover:opacity-90 font-bold px-3 rounded-lg transition disabled:opacity-50"
                    disabled={isPending || uploadingId === tab.id}
                  >
                    Salva
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEWER */}
      <div className="bg-background rounded-3xl shadow-xl border border-border overflow-hidden flex flex-col">
        <div className="bg-card p-4 flex flex-wrap gap-2 justify-end border-b border-border">
          {!tabs.some((t) => t.id === "markdown") && (
            <button
              onClick={() => setActiveTabId("markdown")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTabId === "markdown"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Documentazione (.md)
            </button>
          )}

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTabId === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={
            activeTabId === "markdown"
              ? "relative w-full min-h-[700px] bg-background"
              : "relative w-full aspect-video min-h-[550px] bg-muted"
          }
        >
          {/* 🎯 SOSTITUZIONE EFFETTUATA: Qui ora usiamo il componente MarkdownPreview unificato */}
          {activeTabId === "markdown" && (
            <div className="absolute inset-0 w-full h-full overflow-y-auto p-6 md:p-8">
              <MarkdownPreview content={markdownContent} />
            </div>
          )}

          {activeTabId === "html" && (
            <iframe
              srcDoc={htmlSlides}
              className="absolute inset-0 w-full h-full border-none bg-background"
              title="HTML Viewer"
            />
          )}

          {activeTabId !== "markdown" &&
            activeTabId !== "html" &&
            activeTab &&
            (activeTabId === "pdf" ? (
              <embed
                src={activeTab.file_path}
                type="application/pdf"
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <iframe
                src={activeTab.file_path}
                className="absolute inset-0 w-full h-full border-none"
                allowFullScreen
                title="Cloud Document"
              />
            ))}
        </div>
      </div>
    </div>
  );
}