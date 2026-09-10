"use client";

import { useState } from "react";
import { MaintenanceSettings } from "../types/SystemConfiguration";
import { updateMaintenanceAction } from "../actions/updateMaintenanceAction";

interface MaintenanceAdminFormProps {
  initialSettings: MaintenanceSettings;
}

export default function MaintenanceAdminForm({
  initialSettings,
}: MaintenanceAdminFormProps) {
  const [formData, setFormData] =
    useState<MaintenanceSettings>(initialSettings);

  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setFeedback(null);

    const result = await updateMaintenanceAction(formData);

    if (result.success) {
      setFeedback({
        type: "success",
        message:
          "Impostazioni modalità manutenzione salvate con successo!",
      });
    } else {
      setFeedback({
        type: "error",
        message:
          result.error || "Errore durante il salvataggio.",
      });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Modalità manutenzione
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Blocca temporaneamente l'accesso agli utenti durante
            manutenzioni, migrazioni o interventi sul database.
          </p>
        </div>

        <label className="relative inline-flex cursor-pointer items-center self-start sm:self-auto">
          <input
            type="checkbox"
            checked={formData.enabled}
            onChange={(e) =>
              setFormData({
                ...formData,
                enabled: e.target.checked,
              })
            }
            className="peer sr-only"
          />

          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700" />

          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {formData.enabled ? "Attiva" : "Disattivata"}
          </span>
        </label>
      </div>

      {/* AVVISO STATO */}
      {formData.enabled && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          <p className="font-semibold">
            ⚠️ Modalità manutenzione ATTIVA
          </p>

          <p className="mt-1">
            Gli utenti non amministratori non potranno accedere
            alla piattaforma. Il login rimane disponibile per
            consentire agli amministratori di autenticarsi.
          </p>
        </div>
      )}

      {/* FEEDBACK */}
      {feedback && (
        <div
          className={`rounded-lg p-4 text-sm ${
            feedback.type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* TITOLO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Titolo pagina manutenzione
        </label>

        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Sito temporaneamente in manutenzione"
        />
      </div>

      {/* MESSAGGIO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Messaggio
        </label>

        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Il sito è temporaneamente non disponibile..."
        />

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Puoi utilizzare più righe per fornire agli utenti
          informazioni dettagliate sull'intervento.
        </p>
      </div>

      {/* SALVA */}
      <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Salvataggio in corso..."
            : "Salva Configurazione"}
        </button>
      </div>
    </form>
  );
}