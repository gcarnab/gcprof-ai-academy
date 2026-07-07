import React, { useState } from "react";

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
  content_type?: string; // Supporto DB nativo
  title?: string;
  url?: string;
  external_url?: string; // Supporto DB nativo
  content?: string;
}

interface Props {
  contents: LessonContent[];
}

export default function LessonRenderer({ contents }: Props) {
  if (!contents || !Array.isArray(contents)) return null;

  return (
    <div className="space-y-8">
      {contents.map((item, index) => {
        // 🛡️ Estrazione sicura: supporta sia l'oggetto normalizzato sia la riga nativa di Supabase
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
              <div key={index} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-black">
                <iframe
                  className="aspect-video w-full"
                  src={embedUrl}
                  title={title || "Lezione Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {title && (
                  <div className="p-3 bg-white border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
                  </div>
                )}
              </div>
            );
          }

          /**
           * 2. DOCUMENT PREVIEWER INTERNO (Google Docs, Sheets, Slides & Drive)
           */
          case "document":
          case "file": {
            if (!url) return null;
            let previewUrl = url;
            
            // 🛡️ RILEVAMENTO ED EMBEDDING SILENZIOSO DI GOOGLE DOCS / DRIVE
            const isGoogleResource = 
              previewUrl.includes("drive.google.com") || 
              previewUrl.includes("docs.google.com");

            if (isGoogleResource) {
              if (previewUrl.includes("/edit")) {
                previewUrl = previewUrl.split("/edit")[0] + "/preview";
              } else if (previewUrl.includes("/view")) {
                previewUrl = previewUrl.split("/view")[0] + "/preview";
              } else if (!previewUrl.endsWith("/preview") && !previewUrl.includes("/preview")) {
                // Rimuove eventuali query parameters residui agganciando correttamente la preview
                if (previewUrl.includes("?")) {
                  const base = previewUrl.split("?")[0];
                  previewUrl = base.endsWith("/") ? `${base}preview` : `${base}/preview`;
                } else {
                  previewUrl = previewUrl.endsWith("/") ? `${previewUrl}preview` : `${previewUrl}/preview`;
                }
              }
            }

            return (
              <div key={index} className="space-y-2">
                {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
                {isGoogleResource ? (
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner h-[700px] bg-gray-50">
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      allow="autoplay"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border bg-white p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <span className="font-medium text-gray-700">{title || "Visualizza Documento Risorsa"}</span>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Apri Risorsa
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
              <div key={index} className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚀</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Google Colab Notebook</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{title || "Notebook di Esercitazione"}</h3>
                  <p className="text-sm text-gray-600">
                    Questo modulo contiene un ambiente interattivo di programmazione. Clicca sul pulsante a destra per aprire il foglio di lavoro protetto direttamente nel tuo account Google Drive ed eseguire il codice Python.
                  </p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-200 transition-all transform hover:-translate-y-0.5"
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
            const rawText = contentBody || contentBody === "" ? contentBody : url || "";
            if (!rawText.trim()) return null;

            return (
              <div key={index} className="space-y-4">
                {title && <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{title}</h3>}
                <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed space-y-4">
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
                {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
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
          const header = block.substring(3, firstLineBreak).trim().toLowerCase();
          const code = block.substring(firstLineBreak + 1, block.length - 3).trim();
          const language = header || "code";

          return <CodeBlock key={bIdx} code={code} language={language} />;
        }

        return (
          <div key={bIdx} className="space-y-2 font-normal">
            {block.split("\n").map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} className="h-2" />;
              
              if (trimmed.startsWith("### ")) {
                return <h4 key={lIdx} className="text-md font-bold text-gray-800 mt-4 mb-1">{trimmed.replace("### ", "")}</h4>;
              }
              if (trimmed.startsWith("## ")) {
                return <h3 key={lIdx} className="text-lg font-bold text-gray-900 mt-5 mb-2">{trimmed.replace("## ", "")}</h3>;
              }
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                return (
                  <ul key={lIdx} className="list-disc pl-5 my-1 space-y-0.5">
                    <li className="text-gray-700">{parseInlineStyles(trimmed.substring(2))}</li>
                  </ul>
                );
              }

              return <p key={lIdx} className="text-gray-700 my-1">{parseInlineStyles(line)}</p>;
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
    <div className="relative my-4 group rounded-xl overflow-hidden shadow-sm border border-gray-800">
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-900 text-gray-400 font-mono text-xs border-b border-gray-800 select-none">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-0.5 text-[11px] bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-700 transition-colors focus:outline-none"
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
      return <strong key={index} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}