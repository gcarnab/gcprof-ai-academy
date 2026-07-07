import PageContainer from "@/shared/ui/PageContainer";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "GCPROF";
  const appSubtitle = process.env.NEXT_PUBLIC_APP_SUBTITLE || "ACADEMY";
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "V 1.0";

  return (
    <footer className="border-t border-border bg-background transition-colors duration-300">
      <PageContainer className="flex flex-col items-center justify-between gap-6 py-8 text-sm text-muted-foreground md:flex-row">

        {/* LOGO */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 transition-all"
        >
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt={`Logo ${appName} ${appSubtitle}`}
            width={46}
            height={46}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />

          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-foreground group-hover:text-blue-600">
              {appName}
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              {appSubtitle} ({appVersion})
            </span>
          </div>
        </Link>


        {/* Menu Footer */}
        <nav>
          <ul className="flex gap-6">
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


        {/* Copyright */}
        <p>
          © {currentYear} {appName} {appSubtitle} ({appVersion})
        </p>

      </PageContainer>
    </footer>
  );
}