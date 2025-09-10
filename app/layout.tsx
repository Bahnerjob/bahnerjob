import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor – schnell finden, einfach bewerben."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <SiteHeader />
        <main className="container section fade-in">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

/* --- Inline-Komponenten --- */
function SiteHeader() {
  return (
    <header className="border-b" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container header-row">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          Bahnerjob
        </Link>

        <nav className="site-nav">
          <Link href="/jobs">Jobs</Link>
          <Link href="/pricing">Preise</Link>
          <Link href="/legal/impressum">Impressum</Link>
          <Link href="/jobs/new" className="btn btn-accent">Anzeige schalten</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container footer-row">
        <div>© Bahnerjob – Made for rail people</div>
        <div className="footer-links">
          <Link href="/legal/impressum">Impressum</Link>
          <Link href="/legal/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
