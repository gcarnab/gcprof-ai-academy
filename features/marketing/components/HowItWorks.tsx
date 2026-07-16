import { UserPlus, BookOpen, BarChart3 } from "lucide-react";
import PageContainer from "@/shared/ui/PageContainer";

const steps = [
  {
    title: "1. Registrati",
    description: "Crea il tuo profilo in pochi secondi e accedi alla tua dashboard personalizzata.",
    icon: <UserPlus className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "2. Esercitati",
    description: "Scegli il tuo corso, segui le lezioni e metti alla prova la logica con i nostri quiz.",
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "3. Monitora",
    description: "Guarda i tuoi progressi in tempo reale e ottieni feedback immediati sull'apprendimento.",
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <PageContainer>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Come funziona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tre passaggi semplici per iniziare il tuo percorso di crescita professionale.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-muted-foreground max-w-xs">{step.description}</p>
              
              {/* Linea di connessione (solo desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 hidden w-full border-t-2 border-dashed border-blue-100 md:block -z-10" />
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}