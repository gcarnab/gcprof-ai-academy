import Image from "next/image";
import type { Metadata } from "next";

import { getMaintenanceSettings } from "@/features/system/guards/maintenanceGuard";

export const metadata: Metadata = {
  title: "Manutenzione",
  description: "GCPROF AI ACADEMY è temporaneamente in manutenzione.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  const settings = await getMaintenanceSettings();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-6">
      <section className="w-full max-w-2xl rounded-2xl border bg-background p-8 text-center shadow-sm md:p-12">
        <div className="mb-8 flex justify-center">
          <Image
            src="/gcprof-ai-academy_logo_horizontal.png"
            alt="GCPROF AI ACADEMY"
            width={420}
            height={120}
            priority
            className="h-auto w-full max-w-[420px] object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {settings.title}
        </h1>

        <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-muted-foreground">
          {settings.message}
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          Riprova tra qualche minuto.
        </p>
      </section>
    </main>
  );
}

