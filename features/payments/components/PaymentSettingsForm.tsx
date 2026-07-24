"use client";

/**
 * GCPROF AI ACADEMY
 * File: features/payments/components/PaymentSettingsForm.tsx
 *
 * Form di configurazione della sezione Payments.
 */

import { useState, useTransition } from "react";

import { PaymentSettings } from "../types/paymentTypes";
import { updatePaymentSettingsAction } from "../actions/paymentSettingsActions";

interface Props {
  initialSettings: PaymentSettings;
}

export function PaymentSettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState<PaymentSettings>(initialSettings);

  const [message, setMessage] = useState<string>();

  const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof PaymentSettings>(
    field: K,
    value: PaymentSettings[K],
  ) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit() {
    setMessage(undefined);
    setError(undefined);

    startTransition(async () => {
      const response = await updatePaymentSettingsAction(settings);

      if (!response.success) {
        setError(response.error ?? "Errore durante il salvataggio.");
        return;
      }
      
      if (!response.data) {
        setError("Configurazione non disponibile.");
        return;
      }

      setSettings(response.data);

      setMessage("Configurazione salvata con successo.");
    });
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Impostazioni Pagamenti</h2>

        <p className="text-sm text-muted-foreground mt-1">
          Configura provider, valuta, aliquota IVA e comportamento del checkout.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Provider</label>

          <select
            className="w-full rounded-lg border bg-background px-3 py-2"
            value={settings.provider}
            onChange={(e) =>
              updateField(
                "provider",
                e.target.value as PaymentSettings["provider"],
              )
            }
          >
            <option value="STRIPE">Stripe</option>

            <option value="PAYPAL">PayPal</option>

            <option value="MOLLIE">Mollie</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Valuta</label>

          <select
            className="w-full rounded-lg border bg-background px-3 py-2"
            value={settings.default_currency}
            onChange={(e) =>
              updateField(
                "default_currency",
                e.target.value as PaymentSettings["default_currency"],
              )
            }
          >
            <option value="EUR">EUR</option>

            <option value="USD">USD</option>

            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">IVA (%)</label>

          <input
            type="number"
            className="w-full rounded-lg border bg-background px-3 py-2"
            value={settings.vat_percentage}
            onChange={(e) =>
              updateField("vat_percentage", Number(e.target.value))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Paese Academy</label>

          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2"
            value={settings.academy_country}
            onChange={(e) => updateField("academy_country", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Scadenza Checkout (minuti)
          </label>

          <input
            type="number"
            className="w-full rounded-lg border bg-background px-3 py-2"
            value={settings.checkout_session_expire_minutes}
            onChange={(e) =>
              updateField(
                "checkout_session_expire_minutes",
                Number(e.target.value),
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.sandbox_enabled}
            onChange={(e) => updateField("sandbox_enabled", e.target.checked)}
          />

          <span>Modalità Sandbox</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.allow_coupons}
            onChange={(e) => updateField("allow_coupons", e.target.checked)}
          />

          <span>Abilita Coupon</span>
        </label>
      </div>

      {message && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Salvataggio..." : "Salva configurazione"}
        </button>
      </div>
    </div>
  );
}
