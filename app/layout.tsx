import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { siteConfig } from "@/shared/config/site";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { PageTracker } from "@/features/admin/tracking/components/PageTracker";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ============================================================================
// Metadata Globali
// ============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),

  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.siteName,

  authors: [
    {
      name: siteConfig.author,
    },
  ],

  creator: siteConfig.author,

  publisher: siteConfig.author,

  category: "Education",

  keywords: [
    "LMS",
    "E-learning",
    "Academy",
    "Scuola",
    "Informatica",
    "Database",
    "Programmazione",
    "AI",
    "Intelligenza Artificiale",
    "Networking",
    "Cybersecurity",
    "Docente",
    "Giuseppe Carnabuci",
  ],

  alternates: {
    canonical: siteConfig.canonical,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.description,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <PageTracker />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
