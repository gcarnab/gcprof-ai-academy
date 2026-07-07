import PageContainer from "@/shared/ui/PageContainer";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-background transition-colors duration-300">

      <PageContainer className="flex flex-col items-center py-24 text-center">

        {/* Titolo */}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Disegna il tuo futuro digitale.{" "}
          <span className="block text-blue-600 md:inline">
            Un bit alla volta.
          </span>
        </h1>


        {/* Sottotitolo */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          La piattaforma del{" "}
          <span className="font-semibold text-blue-600">
            Prof. Giuseppe Carnabuci
          </span>{" "}
          pensata per gli studenti delle superiori. Scopri l'informatica in modo
          semplice e impara a dominare l'
          <strong className="font-bold text-foreground">
            Intelligenza Artificiale
          </strong>{" "}
          con strumenti interattivi e su misura per te.
        </p>


        {/* Pulsanti */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/courses"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Esplora i corsi
          </Link>


          <Link
            href="/contacts"
            className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Scopri di più
          </Link>

        </div>

      </PageContainer>

    </section>
  );
}