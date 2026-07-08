"use client";

import TrackingDashboard from "./TrackingDashboard";

interface Props {
  trackingStats: any;
}

export default function TrackingTab({ trackingStats }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          🛰 Tracking Accessi
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Monitoraggio degli accessi, delle sessioni utente e del tempo di
          utilizzo della piattaforma.
        </p>
      </div>

      <TrackingDashboard stats={trackingStats} />
    </div>
  );
}
