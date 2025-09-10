import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css?v=2025-09-10-03";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bahnerjob",
  description: "Jobs aus der Bahnbranche  Anzeigen schalten & finden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} bg-[var(--color-bg)] text-[var(--color-fg)] antialiased`}>
        {/* Header inline  KEINE externe Header-Datei nötig */}
        <header className="sticky top-0 z-40 border-b border-neutral-800 bg-[#0d0d0d]">
          <div className="container flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo-bahnerjob.svg" alt="Bahnerjob" width={28} height={28} />
              <span className="text-base font-semibold tracking-tight">Bahnerjob</span>
            </a>
            <nav className="flex items-center gap-2">
              <a href="/" className="btn h-9 px-3 border border-neutral-800 hover:bg-neutral-900 rounded-lg">
                Jobs durchsuchen
              </a>
              <a href="/pricing" className="btn h-9 px-3 border border-neutral-800 hover:bg-neutral-900 rounded-lg">
                Preise
              </a>
              <a href="/jobs/new" className="btn btn-accent h-9 px-3 rounded-lg font-semibold">
                Anzeige schalten
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100dvh-64px)]">{children}</main>

        <footer className="mt-10 border-t border-neutral-800 bg-[#0d0d0d] text-neutral-400">
          <div className="container py-8 text-sm"> {new Date().getFullYear()} Bahnerjob</div>
        </footer>
      </body>
    </html>
  );
}
