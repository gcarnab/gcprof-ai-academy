"use client";

import React, { useState } from "react";
import { Certificate } from "../types";
import { registerCertificateDownloadAction } from "../actions/certificateActions";

interface StudentCertificatesDashboardProps {
  certificates: Certificate[];
}

export default function StudentCertificatesDashboard({
  certificates = [],
}: StudentCertificatesDashboardProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (cert: Certificate) => {
    setDownloadingId(cert.id);
    try {
      // 1. Traccia il download/incrementa il contatore a DB
      await registerCertificateDownloadAction(cert);

      // 2. Apre direttamente il PDF dallo Storage Supabase o fa il fallback alla pagina di verifica
      const targetUrl = cert.pdfUrl || `/verify/${cert.verificationToken}`;
      window.open(targetUrl, "_blank");
    } catch (err) {
      console.error("Errore durante il download del certificato:", err);
      window.open(`/verify/${cert.verificationToken}`, "_blank");
    } finally {
      setDownloadingId(null);
    }
  };

  if (certificates.length === 0) {
    return (
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 shadow-xl transition-colors">
        <div className="text-4xl mb-3">📜</div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          Nessun certificato disponibile
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-md mx-auto">
          Completa i corsi e supera le verifiche di modulo con esito positivo per sbloccare ed emettere i tuoi certificati ufficiali.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            I Miei Certificati Ufficiali
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizza, scarica in PDF o condividi la verifica dei tuoi attestati di competenza.
          </p>
        </div>
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
          {certificates.length} {certificates.length === 1 ? "Attestato" : "Attestati"} Conseguiti
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const isRevoked = cert.status === "REVOKED";
          const formattedDate = cert.issuedAt
            ? new Date(cert.issuedAt).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Data N/D";

          return (
            <div
              key={cert.id}
              className={`bg-white dark:bg-[#0f172a] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-md group ${
                isRevoked
                  ? "border-red-300 dark:border-red-900/50 opacity-60"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {/* Card Header & Badge Status */}
              <div className="p-5 flex-1 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/40 uppercase tracking-wider">
                    {cert.certificateNumber || "CERT-ACADEMY"}
                  </span>
                  {isRevoked ? (
                    <span className="text-[10px] font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 px-2 py-0.5 rounded-full">
                      Revocato
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 rounded-full">
                      Valido
                    </span>
                  )}
                </div>

                {/* Titolo e Sottotitolo */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {cert.title}
                </h3>
                {cert.subtitle && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {cert.subtitle}
                  </p>
                )}

                {/* Metriche e Data Emissione */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400">Emesso il</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedDate}</span>
                  </div>
                  {cert.score !== undefined && cert.score !== null && (
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400">Voto Conseguito</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{cert.score} / 10</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/40 flex items-center gap-2">
                <button
                  disabled={isRevoked || downloadingId === cert.id}
                  onClick={() => handleDownload(cert)}
                  className="flex-1 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-all tracking-wide shadow-sm gap-1.5"
                >
                  {downloadingId === cert.id ? "Apertura..." : "Scarica PDF 📥"}
                </button>

                <a
                  href={`/verify/${cert.verificationToken}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-xs transition-all shrink-0 inline-flex items-center"
                  title="Verifica Attestato Online"
                >
                  🔗
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}