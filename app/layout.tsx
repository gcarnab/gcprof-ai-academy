import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GCPROF AI Academy",
  description: "Piattaforma LMS per scuole superiori",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}