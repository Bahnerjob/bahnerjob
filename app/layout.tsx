import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor – schnell finden, einfach bewerben."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <SiteHeader />
        <main className="container section fade-in">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

/* --- Header & Footer --- */
function SiteHeader() {
  return (
    <header className="border-b" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container header-row">
        <Link href="/" className="brand" aria-label="Zur Startseite">
          <Image
            src="/logo-bahnerjob.svg"
            alt="Bahnerjob.de"
            width={170}
            height={28}
            priority
            className="brand-img"
          />
        </Link>

        <nav className="site-nav">
          <Link className="hover:text-white" href="/jobs">Jobs</Link>
          <Link className="hover:text-white" href="/pricing">Preise</Link>
          <Link className="hover:text-white" href="/legal/impressum">Impressum</Link>
          <Link className="btn btn-accent" href="/pricing">Anzeige schalten</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container footer-row text-sm text-neutral-400">
        <div>© {new Date().getFullYear()} Bahnerjob – Made for rail people</div>
        <div className="footer-links">
          <Link className="hover:text-white" href="/legal/impressum">Impressum</Link>
          <Link className="hover:text-white" href="/legal/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
