"use client";

import { useEffect, useId, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useTheme } from "@/features/theme/context/ThemeContext";

interface MarkdownPreviewProps {
  content: string;
}

/**
 * 🎨 Converte qualsiasi stringa di colore CSS (compresi lab(...), oklch(...), hsl(...), ecc.)
 * nel formato rgb(r, g, b) o rgba(...) accettato e parsabile da Mermaid.js.
 */
function toStandardRgb(cssColor: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallback;

    ctx.fillStyle = cssColor;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

    // Se a === 0 e il valore non era espressamente "transparent", significa che il colore era non valido
    if (a === 0 && cssColor !== "transparent") return fallback;

    return a === 255
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`;
  } catch {
    return fallback;
  }
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) return null;

  // Pulizia profonda per evitare che i caratteri invisibili del DB rompano la prima riga
  const cleanedContent = content
    .replace(/^\uFEFF/, "") // Rimuove il BOM invisibile
    .trim()                  // Rimuove spazi/invii iniziali e finali
    .replace(/\\n/g, "\n"); // Converte eventuali stringhe "\n" in veri a capo

  // Forza lo spazio dopo i cancelletti (#TITOLO -> # TITOLO)
  const sanitizedContent = cleanedContent.replace(/^(#{1,6})([^\s#])/gm, "$1 $2");

  return (
    <div className="prose prose-slate max-w-none dark:prose-invert 
                    prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-base prose-li:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, href, children, ...props }) => {
            // Gestione ancore interne (es: #m0)
            if (href?.startsWith("#")) {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault(); // Blocca il router di Next.js
                    const targetId = href.substring(1);
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            // Gestione link esterni (apertura in nuova scheda)
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },

          // 🧩 Gestione code-block: Se il linguaggio è "mermaid" renderizza via MermaidBlock
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1];
            const isBlock = /\n/.test(String(children)) || !!match;

            if (language === "mermaid") {
              return <MermaidBlock chart={String(children).replace(/\n$/, "")} />;
            }

            if (!isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}

/**
 * 🧩 MermaidBlock
 * Renderizza un diagramma Mermaid.js sincronizzato con il tema chiaro/scuro della piattaforma.
 */
function MermaidBlock({ chart }: { chart: string }) {
  const containerId = `mermaid-${useId().replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        const probe = document.createElement("span");
        probe.style.display = "none";
        document.body.appendChild(probe);

        const cssVar = (name: string, fallback: string) => {
          probe.style.color = `var(${name})`;
          const resolved = getComputedStyle(probe).color;
          return toStandardRgb(resolved || `var(${name})`, fallback);
        };

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "strict",
          themeVariables: {
            background: cssVar("--background", "#ffffff"),
            primaryColor: cssVar("--secondary", "#f1f5f9"),
            primaryTextColor: cssVar("--foreground", "#0f172a"),
            primaryBorderColor: cssVar("--border", "#e2e8f0"),
            lineColor: cssVar("--muted-foreground", "#64748b"),
            textColor: cssVar("--foreground", "#0f172a"),
            fontFamily: "inherit",
          },
        });

        document.body.removeChild(probe);

        const { svg: renderedSvg } = await mermaid.render(containerId, chart);

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Errore di rendering Mermaid");
          setSvg(null);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4">
        <p className="text-xs font-semibold text-destructive mb-2">
          ⚠️ Errore nel rendering del diagramma Mermaid: {error}
        </p>
        <pre className="text-xs overflow-x-auto">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  // 1. Stato di caricamento (solo children, niente dangerouslySetInnerHTML)
  if (!svg) {
    return (
      <div className="my-4 flex justify-center overflow-x-auto rounded-lg border border-border bg-background p-4">
        <span className="text-xs text-muted-foreground animate-pulse">
          Rendering diagramma…
        </span>
      </div>
    );
  }

  // 2. Rendering SVG completato (solo dangerouslySetInnerHTML, zero children)
  return (
    <div
      ref={containerRef}
      className="my-4 flex justify-center overflow-x-auto rounded-lg border border-border bg-background p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}