/**
 * GCPROF AI ACADEMY
 * File: features/courses/components/lesson/LessonRenderer.tsx
 */

"use client";

import React, { useState } from "react";
import BadgeUnlockedModal, {
  BadgeUnlockData,
} from "@/features/gamification/components/BadgeUnlockedModal";

export type LessonContentType =
  | "video"
  | "document"
  | "colab"
  | "markdown"
  | "sandbox"
  | "text"
  | "file"
  | "link";

export interface LessonContent {
  type?: LessonContentType;
  content_type?: string;
  title?: string;
  url?: string;
  external_url?: string;
  content?: string;
  quiz_id?: string | null;
}

interface Props {
  contents: LessonContent[];
  /** 🏆 Badge opzionale sbloccato dallo studente durante la lezione */
  unlockedBadge?: BadgeUnlockData | null;
  /** Callback per resettare/chiudere il modal del badge */
  onCloseBadge?: () => void;
}

/**
 * Converte qualsiasi URL Google (Docs, Slides, Sheets, Drive) nel rispettivo link di download diretto PDF
 */
function getDownloadUrl(rawUrl: string): string {
  if (!rawUrl) return "";

  // Se è già un link di esportazione PDF
  if (rawUrl.includes("export?format=") || rawUrl.includes("export/pdf")) {
    return rawUrl;
  }

  // Google Docs
  if (rawUrl.includes("docs.google.com/document/d/")) {
    const match = rawUrl.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
      return `https://docs.google.com/document/d/${match[1]}/export?format=pdf`;
    }
  }

  // Google Slides
  if (rawUrl.includes("docs.google.com/presentation/d/")) {
    const match = rawUrl.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
      return `https://docs.google.com/presentation/d/${match[1]}/export/pdf`;
    }
  }

  // Google Spreadsheets
  if (rawUrl.includes("docs.google.com/spreadsheets/d/")) {
    const match = rawUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
      return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=pdf`;
    }
  }

  // Google Drive File
  if (rawUrl.includes("drive.google.com")) {
    const matchFile = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchFile?.[1]) {
      return `https://drive.google.com/uc?export=download&id=${matchFile[1]}`;
    }
    const matchId = rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchId?.[1]) {
      return `https://drive.google.com/uc?export=download&id=${matchId[1]}`;
    }
  }

  return rawUrl;
}

/**
 * Trasforma gli URL Google per garantire che l'iframe mostri correttamente l'anteprima (/preview)
 */
function getPreviewUrl(rawUrl: string): string {
  if (!rawUrl) return "";

  let pUrl = rawUrl;

  if (pUrl.includes("drive.google.com") || pUrl.includes("docs.google.com")) {
    if (pUrl.includes("/export")) {
      pUrl = pUrl.replace(/\/export.*$/, "/preview");
    } else if (pUrl.includes("/edit")) {
      pUrl = pUrl.split("/edit")[0] + "/preview";
    } else if (pUrl.includes("/view")) {
      pUrl = pUrl.split("/view")[0] + "/preview";
    } else if (!pUrl.endsWith("/preview") && !pUrl.includes("/preview")) {
      if (pUrl.includes("?")) {
        const base = pUrl.split("?")[0];
        pUrl = base.endsWith("/") ? `${base}preview` : `${base}/preview`;
      } else {
        pUrl = pUrl.endsWith("/") ? `${pUrl}preview` : `${pUrl}/preview`;
      }
    }
  }

  return pUrl;
}

export default function LessonRenderer({
  contents,
  unlockedBadge,
  onCloseBadge,
}: Props) {
  if (!contents || !Array.isArray(contents)) return null;

  // Estraiamo un eventuale quiz_id associato a questa lezione
  const activeQuizId = contents.find((item) => item.quiz_id)?.quiz_id;

  return (
    <div className="space-y-8 relative">
      {/* 🏆 MODAL NOTIFICA BADGE SBLOCCATO */}
      {unlockedBadge && (
        <BadgeUnlockedModal
          badge={unlockedBadge}
          onClose={onCloseBadge || (() => {})}
        />
      )}

      {contents.map((item, index) => {
        const rawType = item.type || item.content_type;
        const activeType = rawType === "text" ? "markdown" : rawType;
        const url = item.url || item.external_url;
        const title = item.title;
        const contentBody = item.content;

        switch (activeType) {
          /**
           * 1. VIDEO PLAYER
           */
          case "video": {
            if (!url) return null;
            let embedUrl = url;

            if (embedUrl.includes("watch?v=")) {
              embedUrl = embedUrl.replace("watch?v=", "embed/");
            } else if (embedUrl.includes("youtu.be/")) {
              const id = embedUrl.split("youtu.be/")[1]?.split(/[?#]/)[0];
              embedUrl = `https://www.youtube.com/embed/${id}`;
            } else if (embedUrl.includes("vimeo.com/")) {
              const id = embedUrl.split("vimeo.com/")[1]?.split(/[?#]/)[0];
              embedUrl = `https://player.vimeo.com/video/${id}`;
            }

            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-border shadow-sm bg-background"
              >
                <iframe
                  className="aspect-video w-full"
                  src={embedUrl}
                  title={title || "Lezione Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {title && (
                  <div className="p-3 bg-background border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground">
                      {title}
                    </h4>
                  </div>
                )}
              </div>
            );
          }

          /**
           * 2. DOCUMENT PREVIEWER INTERNO / FILE DOWNLOAD / LINK
           */
          case "document":
          case "file":
          case "link": {
            if (!url) return null;

            const previewUrl = getPreviewUrl(url);
            const downloadUrl = getDownloadUrl(url);
            const isGoogleResource =
              url.includes("drive.google.com") ||
              url.includes("docs.google.com");

            return (
              <div key={index} className="space-y-4">
                {/* SCHEDA DOWNLOAD E AZIONI */}
                <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-3xl shrink-0">📄</span>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">
                        {title || "Risorsa Didattica / Documento PDF"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Scarica il file PDF direttamente o consulta l'anteprima.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                    <a
                      href={downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>📥</span> Scarica il file
                    </a>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-lg transition-colors text-center border border-border flex items-center justify-center gap-1.5"
                    >
                      <span>↗️</span> Apri
                    </a>
                  </div>
                </div>

                {contentBody && (
                  <p className="text-sm text-muted-foreground px-1">{contentBody}</p>
                )}

                {/* ANTEPRIMA DOCUMENTO */}
                {isGoogleResource ? (
                  <div className="rounded-xl overflow-hidden border border-border shadow-inner h-[700px] bg-muted">
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      allow="autoplay"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border bg-background p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <span className="font-medium text-muted-foreground text-sm">
                        {title || "Visualizza Documento"}
                      </span>
                    </div>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Scarica / Apri
                    </a>
                  </div>
                )}
              </div>
            );
          }

          /**
           * 3. INTERACTIVE GOOGLE COLAB WRAPPER
           */
          case "colab": {
            if (!url) return null;
            return (
              <div
                key={index}
                className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚀</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                      Google Colab Notebook
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {title || "Notebook di Esercitazione"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Questo modulo contiene un ambiente interattivo di
                    programmazione. Clicca sul pulsante a destra per aprire il
                    foglio di lavoro protetto direttamente nel tuo account
                    Google Drive ed eseguire il codice Python.
                  </p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-200 dark:shadow-none transition-all transform hover:-translate-y-0.5"
                >
                  Esegui Codice su Colab
                  <span>↗️</span>
                </a>
              </div>
            );
          }

          /**
           * 4. NATIVE MARKDOWN RENDERER
           */
          case "markdown": {
            const rawText =
              contentBody || contentBody === "" ? contentBody : url || "";
            if (!rawText.trim()) return null;

            return (
              <div key={index} className="space-y-4">
                {title && (
                  <h3 className="text-xl font-bold text-foreground border-b pb-2">
                    {title}
                  </h3>
                )}
                <div className="prose prose-blue max-w-none text-foreground leading-relaxed space-y-4">
                  <MarkdownComponent text={rawText} />
                </div>
              </div>
            );
          }

          /**
           * 5. LIVE CODE SANDBOX EMBED
           */
          case "sandbox": {
            if (!url) return null;
            return (
              <div key={index} className="space-y-2">
                {title && (
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                )}
                <div className="rounded-xl overflow-hidden border border-purple-200 shadow-sm h-[500px] bg-gray-900">
                  <iframe
                    src={url}
                    className="w-full h-full border-0"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}

      {/* 🎯 Box condizionale per il Quiz in fondo alla lezione */}
      {activeQuizId && (
        <div className="mt-8 p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base text-primary flex items-center justify-center sm:justify-start gap-2">
              📝 Test di Sbarramento Richiesto
            </h4>
            <p className="text-xs text-muted-foreground max-w-xl">
              Per completare questa lezione e sbloccare i contenuti successivi,
              devi superare il quiz di verifica associato a questo modulo.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = `/quiz/${activeQuizId}`)}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95 shrink-0"
          >
            Inizia il Quiz
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Parsing Markdown Interno
 */
function MarkdownComponent({ text }: { text: string }) {
  const blocks = text.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {blocks.map((block, bIdx) => {
        if (block.startsWith("```")) {
          const firstLineBreak = block.indexOf("\n");
          const header = block
            .substring(3, firstLineBreak)
            .trim()
            .toLowerCase();
          const code = block
            .substring(firstLineBreak + 1, block.length - 3)
            .trim();
          const language = header || "code";

          return <CodeBlock code="{code}" key="{bIdx}" language="{language}"/>;
        }

        return (
          <div key={bIdx} className="space-y-2 font-normal">
            {block.split("\n").map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} className="h-2" />;

              if (trimmed.startsWith("### ")) {
                return (
                  <h4
                    key={lIdx}
                    className="text-md font-bold text-foreground mt-4 mb-1"
                  >
                    {trimmed.replace("### ", "")}
                  </h4>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3
                    key={lIdx}
                    className="text-lg font-bold text-foreground mt-5 mb-2"
                  >
                    {trimmed.replace("## ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                return (
                  <ul key={lIdx} className="list-disc pl-5 my-1 space-y-0.5">
                    <li className="text-muted-foreground">
                      {parseInlineStyles(trimmed.substring(2))}
                    </li>
                  </ul>
                );
              }

              return (
                <p key={lIdx} className="text-muted-foreground my-1">
                  {parseInlineStyles(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

/**
 * CodeBlock con bottone di copia
 */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group rounded-xl overflow-hidden shadow-sm border border-border">
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-900 text-muted-foreground font-mono text-xs border-b border-border select-none">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-0.5 text-[11px] bg-gray-800 text-gray-300 hover:text-white rounded border border-border transition-colors focus:outline-none"
        >
          {copied ? "Copiato! ✓" : "Copia"}
        </button>
      </div>
      <pre className="bg-gray-950 text-emerald-400 p-4 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function parseInlineStyles(line: string): React.ReactNode[] {
  const parts = line.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}