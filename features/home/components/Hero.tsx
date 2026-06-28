/**
 * ============================================================================
 * COMPONENTE: Hero
 * ----------------------------------------------------------------------------
 * Sezione introduttiva principale della homepage.
 *
 * RUOLO:
 * - Presentare la piattaforma agli utenti
 *
 * ATTUALMENTE:
 * - Titolo principale
 * - Descrizione della piattaforma
 * - Call-to-action verso i corsi
 *
 * FUTURO:
 * - Animazioni leggere
 * - Statistiche studenti/corsi
 * - Elementi grafici o illustrazioni
 *
 * NOTA:
 * Deve rimanere semplice e altamente leggibile.
 * ============================================================================
 */

import PageContainer from "@/shared/ui/PageContainer";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      {/* <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center"> */}

      <PageContainer className="flex flex-col items-center py-24 text-center">

        {/* Titolo */}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Costruisci il tuo futuro digitale
          <span className="block text-blue-600">in modo moderno.</span>
        </h1>

        {/* Sottotitolo */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          La piattaforma del <span className="block text-blue-600">Prof. Giuseppe Carnabuci</span> progettata per gli studenti delle scuole superiori,
          con contenuti e strumenti AI per imparare
          l'informatica in modo semplice ed efficace.
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
            href="/about"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
          >
            Scopri di più
          </Link>
        </div>
      </PageContainer>
      {/*</div> */}
    </section>
  );
}
