import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bahnerjob",
  description: "Jobs aus der Bahnbranche  Anzeigen schalten & finden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <header className="site-header sticky top-0 z-50 border-b border-neutral-800 bg-[#0d0d0d]">
          <div className="container h-28 md:h-32 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3" aria-label="Zur Startseite">
              {/* Intrinsische Größe groß, Anzeigegröße wird per CSS gesteuert */}
              <Image
                src="/logo-bahnerjob.svg"
                alt="Bahnerjob"
                width={400}
                height={400}
                priority
                className="site-logo"
              />
            </a>
            <nav className="flex items-center gap-2">
              <a href="/" className="btn h-9 px-3 border border-neutral-800 hover:bg-neutral-900 rounded-lg">Jobs durchsuchen</a>
              <a href="/pricing" className="btn h-9 px-3 border border-neutral-800 hover:bg-neutral-900 rounded-lg">Preise</a>
              <a href="/jobs/new" className="btn btn-accent h-9 px-3 rounded-lg font-semibold">Anzeige schalten</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="site-footer border-t border-neutral-800 bg-[#0d0d0d] text-neutral-400">
          <div className="container py-8 text-sm"> {new Date().getFullYear()} Bahnerjob</div>
          <div className="container py-2 text-xs site-legal-links">
            <a href="/impressum" className="underline underline-offset-2 mr-4">Impressum</a>
            <a href="/datenschutz" className="underline underline-offset-2">Datenschutz</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
