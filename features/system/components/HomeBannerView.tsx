"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { HomeBannerSettings } from "../types/SystemConfiguration";

interface HomeBannerViewProps {
  banner: HomeBannerSettings;
}

export default function HomeBannerView({ banner }: HomeBannerViewProps) {
  const storageKey = `home-banner-dismissed-${banner.version}`;

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!banner.dismissible) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }
    const isDismissed = sessionStorage.getItem(storageKey) === "true";

    setDismissed(isDismissed);
  }, [banner.dismissible, storageKey]);

  const config = useMemo(() => {
    switch (banner.type) {
      case "success":
        return {
          icon: CheckCircle2,
          container:
            "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/40 dark:text-green-100",
          button: "bg-green-700 hover:bg-green-800 text-white",
        };

      case "warning":
        return {
          icon: AlertTriangle,
          container:
            "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-100",
          button: "bg-yellow-600 hover:bg-yellow-700 text-white",
        };

      case "danger":
        return {
          icon: AlertCircle,
          container:
            "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100",
          button: "bg-red-700 hover:bg-red-800 text-white",
        };

      default:
        return {
          icon: Info,
          container:
            "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100",
          button: "bg-blue-700 hover:bg-blue-800 text-white",
        };
    }
  }, [banner.type]);

  if (banner.dismissible && dismissed) {
    return null;
  }

  const Icon = config.icon;

  return (
    <section className={`border-b ${config.container}`}>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <Icon className="h-6 w-6 shrink-0" />

        <div className="flex-1">
          {banner.title && <h3 className="font-semibold">{banner.title}</h3>}

          {banner.message && (
            <p className="text-sm opacity-90">{banner.message}</p>
          )}
        </div>

        {banner.buttonText && banner.buttonUrl && (
          <Link
            href={banner.buttonUrl}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${config.button}`}
          >
            {banner.buttonText}
          </Link>
        )}

        {banner.dismissible && (
          <button
            type="button"
            aria-label="Chiudi banner"
            onClick={() => {
              sessionStorage.setItem(storageKey, "true");
              setDismissed(true);
            }}
            className="rounded-md p-1 opacity-70 transition hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  );
}
