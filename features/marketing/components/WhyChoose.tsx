import {
  BookOpenCheck,
  BrainCircuit,
  Zap,
  LayoutDashboard,
  Terminal,
  Smartphone,
} from "lucide-react";
import PageContainer from "@/shared/ui/PageContainer";

const features = [
  {
    badge: "Didattica",
    title: "Percorsi Strutturati",
    description:
      "Didattica modulare che accompagna lo studente dalle basi alla logica avanzata.",
    icon: <BookOpenCheck className="h-6 w-6 text-blue-600" />,
  },
  {
    badge: "AI",
    title: "Tecnologia AI Integrata",
    description:
      "L'Intelligenza Artificiale diventa uno strumento di studio e non un semplice chatbot. Impari ad usarla come fanno i professionisti.",
    icon: <BrainCircuit className="h-6 w-6 text-blue-600" />,
  },
  {
    badge: "Feedback",
    title: "Feedback Istantaneo",
    description:
      "Ricevi subito il risultato dei quiz e capisci immediatamente dove migliorare.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
  {
    badge: "Dashboard",
    title: "Dashboard Evoluta",
    description:
      "Controlla i tuoi progressi, i corsi completati e i risultati ottenuti in un'unica area personale.",
    icon: <LayoutDashboard className="h-6 w-6 text-blue-600" />,
  },
  {
    badge: "Engineering",
    title: "Metodologia Ingegneristica",
    description:
      "Ogni argomento viene spiegato con esempi concreti utilizzati realmente nello sviluppo software.",
    icon: <Terminal className="h-6 w-6 text-blue-600" />,
  },
  {
    badge: "Accessibilità",
    title: "Accessibilità Totale",
    description:
      "Studia quando vuoi, dal PC, tablet o smartphone, senza installare nulla.",
    icon: <Smartphone className="h-6 w-6 text-blue-600" />,
  },
];

interface WhyChooseProps {
  id?: string;
}

export default function WhyChoose({ id }: WhyChooseProps) {
  return (
    <section id={id} className="bg-muted/30 py-24">
      <PageContainer>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perché scegliere GCPROF AI Academy
          </h2>
          <p className="mt-4 text-muted-foreground">
            Non una semplice piattaforma di lezioni, ma un ecosistema completo
            per dominare la programmazione e l'informatica moderna.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" group rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="mb-5 flex flex-col items-start gap-3">
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
                  {feature.badge}
                </span>

                <div className="rounded-xl bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
