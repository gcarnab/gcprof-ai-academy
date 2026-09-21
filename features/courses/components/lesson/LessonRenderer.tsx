"use client";

import React from "react";
import { Download, ExternalLink, FileText, Video } from "lucide-react";

export interface LessonContent {
  type: "video" | "pdf" | "document" | "google_doc" | "file" | "url" | string;
  title?: string;
  url?: string;
  content?: string;
}

interface LessonRendererProps {
  contents: LessonContent[];
}

export default function LessonRenderer({ contents }: LessonRendererProps) {
  if (!contents || contents.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-border bg-card">
        <p className="text-sm text-muted-foreground">
          Nessun contenuto disponibile per questa lezione.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contents.map((item, index) => (
        <SingleContentRenderer key={index} item={item} />
      ))}
    </div>
  );
}

function SingleContentRenderer({ item }: { item: LessonContent }) {
  const { type, title, url, content } = item;
  const cleanUrl = url?.trim() || "";

  // Rilevamento link di esportazione/download diretto da Google Docs/Drive
  const isGoogleExport =
    cleanUrl.includes("export?format=") || cleanUrl.includes("export?");
  const isGoogleDriveOrDocs =
    cleanUrl.includes("drive.google.com") || cleanUrl.includes("docs.google.com");

  // Normalizzazione URL anteprima Google (solo per visualizzazione iframe, NON per download espliciti)
  const getGoogleEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    if (isGoogleExport) return rawUrl;

    if (rawUrl.includes("/view") || rawUrl.includes("/edit")) {
      return rawUrl.replace(/\/(view|edit).*$/, "/preview");
    }
    if (!rawUrl.endsWith("/preview") && rawUrl.includes("/d/")) {
      return `${rawUrl.replace(/\/$/, "")}/preview`;
    }
    return rawUrl;
  };

  // 1. LINK DI DOWNLOAD DIRETTO O ESPORTAZIONE PDF
  if (isGoogleExport || type === "file" || type === "download") {
    return (
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">
              {title || "Risorsa Didattica Scaricabile"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Documento PDF / File allegato
            </p>
          </div>
        </div>

        {content && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        )}

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href={cleanUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Scarica File PDF
          </a>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-sm transition-colors border border-border"
          >
            <ExternalLink className="w-4 h-4" />
            Apri nel Browser
          </a>
        </div>
      </div>
    );
  }

  // 2. PLAYER VIDEO (YouTube / Vimeo / Video diretti)
  if (
    type === "video" ||
    cleanUrl.includes("youtube.com") ||
    cleanUrl.includes("youtu.be") ||
    cleanUrl.includes("vimeo.com")
  ) {
    const getEmbedVideoUrl = (rawUrl: string) => {
      if (rawUrl.includes("youtube.com/watch?v=")) {
        return rawUrl.replace("watch?v=", "embed/");
      }
      if (rawUrl.includes("youtu.be/")) {
        const id = rawUrl.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return rawUrl;
    };

    return (
      <div className="space-y-3">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-black shadow-md">
          <iframe
            src={getEmbedVideoUrl(cleanUrl)}
            title={title || "Video Lezione"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        {content && (
          <p className="text-sm text-muted-foreground px-1">{content}</p>
        )}
      </div>
    );
  }

  // 3. ANTEPRIMA GOOGLE DOCS / DRIVE / PDF VIEWER
  if (isGoogleDriveOrDocs || type === "pdf" || type === "document") {
    const embedUrl = getGoogleEmbedUrl(cleanUrl);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 truncate">
            <FileText className="w-5 h-5 text-blue-500 shrink-0" />
            <span className="font-semibold text-sm text-foreground truncate">
              {title || "Anteprima Documento"}
            </span>
          </div>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 shrink-0"
          >
            Apri in nuova scheda <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="relative w-full h-[650px] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
          <iframe
            src={embedUrl}
            title={title || "Document Viewer"}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
          />
        </div>
      </div>
    );
  }

  // 4. FALLBACK GENERICO
  return (
    <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
      {title && <h3 className="font-bold text-lg text-foreground">{title}</h3>}
      {content && <p className="text-sm text-muted-foreground">{content}</p>}
      {cleanUrl && (
        <a
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
        >
          Apri risorsa esterna <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}