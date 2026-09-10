"use client";

import { useState } from "react";
import { HomeBannerSettings } from "../types/SystemConfiguration";
import { updateHomeBannerAction } from "../actions/updateHomeBannerAction";

interface HomeBannerAdminFormProps {
  initialSettings: HomeBannerSettings;
}

export default function HomeBannerAdminForm({ initialSettings }: HomeBannerAdminFormProps) {
  const [formData, setFormData] = useState<HomeBannerSettings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const result = await updateHomeBannerAction(formData);

    if (result.success) {
      setFeedback({ type: "success", message: "Impostazioni banner salvate con successo!" });
    } else {
      setFeedback({ type: "error", message: result.error || "Errore durante il salvataggio." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Banner Homepage</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gestisci la visibilità e le comunicazioni del banner in home page.</p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {formData.enabled ? "Attivo" : "Disattivato"}
          </span>
        </label>
      </div>

      {feedback && (
        <div className={`rounded-lg p-4 text-sm ${feedback.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300" : "bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300"}`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Titolo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titolo</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="es. Novità in arrivo!"
          />
        </div>

        {/* Versione */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Versione <span className="text-xs text-gray-400">(Incrementa per mostrare di nuovo agli utenti che l'hanno chiuso)</span>
          </label>
          <input
            type="text"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Tipo Banner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stile / Tipo</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as HomeBannerSettings["type"] })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="info">Info (Blu)</option>
            <option value="success">Success (Verde)</option>
            <option value="warning">Warning (Giallo)</option>
            <option value="danger">Danger (Rosso)</option>
          </select>
        </div>

        {/* Chiudibile */}
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.dismissible}
              onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
            Consenti la chiusura (Dismissible)
          </label>
        </div>
      </div>

      {/* Messaggio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Messaggio</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Testo dettagliato della comunicazione..."
        />
      </div>

      {/* Call To Action */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Testo Pulsante CTA</label>
          <input
            type="text"
            value={formData.buttonText}
            onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="es. Scopri di più"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Pulsante CTA</label>
          <input
            type="text"
            value={formData.buttonUrl}
            onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="es. /courses/nextjs"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvataggio in corso..." : "Salva Configurazione"}
        </button>
      </div>
    </form>
  );
}