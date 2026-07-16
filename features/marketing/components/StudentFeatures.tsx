import { GraduationCap, Target, Trophy, Clock3 } from "lucide-react";
import PageContainer from "@/shared/ui/PageContainer";

const studentBenefits = [
  {
    title: "Percorso personalizzato",
    description:
      "La tua dashboard ti mostra esattamente cosa studiare oggi, eliminando ogni incertezza.",
    icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Obiettivi chiari",
    description:
      "Visualizza i tuoi traguardi e le competenze acquisite lezione dopo lezione.",
    icon: <Target className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Gamification & Badge",
    description:
      "Accumula punti esperienza e sblocca badge completando quiz e sfide.",
    icon: <Trophy className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Ritmo flessibile",
    description:
      "Impara quando vuoi, da dove vuoi, monitorando sempre il tuo tempo di studio.",
    icon: <Clock3 className="h-6 w-6 text-blue-600" />,
  },
];

export default function StudentFeatures() {
  return (
    <section className="py-24 bg-background">
      <PageContainer>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Contenuto Sinistra */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Impara, migliora e costruisci le tue competenze digitali.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              GCPROF AI Academy trasforma lo studio in un'esperienza
              interattiva. Supera lo studio passivo e costruisci competenze
              attraverso esercizi, progetti e feedback continui.
            </p>

            <div className="mt-8">
              <button className="inline-flex items-center text-blue-600 font-semibold hover:underline">
                Scopri le funzionalità per studenti →
              </button>
            </div>
          </div>

          {/* Grid Destra */}
          <div className="grid gap-6 sm:grid-cols-2">
            {studentBenefits.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
                <div className="mb-4 rounded-xl bg-blue-50 p-4 transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
