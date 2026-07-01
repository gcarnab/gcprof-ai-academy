/**
 * ============================================================================
 * COMPONENTE: Footer
 * ----------------------------------------------------------------------------
 * Footer globale della piattaforma.
 *
 * RUOLO:
 * - Informazioni di base e navigazione secondaria
 *
 * ATTUALMENTE:
 * - Nome piattaforma
 * - Link principali
 * - Copyright dinamico
 *
 * FUTURO:
 * - Link legali (privacy, cookie policy)
 * - Social media
 * - Contatti scuola / docente
 *
 * NOTA:
 * Deve restare minimale e non invasivo.
 * ============================================================================
 */

import PageContainer from "@/shared/ui/PageContainer";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-gray-600 md:flex-row">*/}
      <PageContainer className="flex flex-col items-center justify-between gap-6 py-8 text-sm text-gray-600 md:flex-row">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 transition-all">
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt="Logo GCPROF AI Academy"
            width={46}
            height={46}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-blue-600">
              GCPROF
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              AI ACADEMY
            </span>
          </div>
        </Link>

        {/* Menu Footer */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-600">
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

        {/* Copyright */}
        <p>© {currentYear} GCPROF AI Academy</p>
      </PageContainer>
      {/*</div>*/}
    </footer>
  );
}
