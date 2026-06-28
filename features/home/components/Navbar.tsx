/**
 * ============================================================================
 * COMPONENTE: Navbar
 * ----------------------------------------------------------------------------
 * Navbar principale della piattaforma GCPROF AI Academy.
 *
 * RUOLO:
 * - Navigazione globale del sito
 *
 * ATTUALMENTE:
 * - Link Home, Corsi, Contatti
 * - Pulsante "Accedi" statico
 *
 * FUTURO:
 * - Autenticazione utente
 * - Menu dinamico (studente / docente / admin)
 * - Notifiche
 * - Avatar utente
 *
 * NOTA ARCHITETTURALE:
 * Questo componente sarà presente in tutte le pagine pubbliche.
 * ============================================================================
 */

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* ===================== Logo ===================== */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt="GCPROF AI Academy Logo"
            width={42}
            height={42}
            priority
          />

          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              GCPROF
            </h1>

            <p className="text-xs font-medium uppercase tracking-widest text-blue-600">
              AI Academy
            </p>
          </div>
        </Link>

        {/* ===================== Menu ===================== */}
        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/courses"
                className="transition-colors hover:text-blue-600"
              >
                Corsi
              </Link>
            </li>

            <li>
              <Link
                href="/contacts"
                className="transition-colors hover:text-blue-600"
              >
                Contatti
              </Link>
            </li>
          </ul>
        </nav>

        {/* ===================== Bottone ===================== */}
        <button
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Accedi
        </button>

      </div>
    </header>
  );
}