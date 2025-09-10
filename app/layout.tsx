import Link from "next/link";

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

/* --- Inline-Komponenten (du kannst sie auch in /components auslagern) --- */
function SiteHeader() {
  return (
    <header className="border-b" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span
            className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: "rgb(var(--accent))" }}
          />
          Bahnerjob
        </Link>
        <nav className="flex items-center gap-5 text-sm text-neutral-300">
          <Link className="hover:text-white" href="/jobs">Jobs</Link>
          <Link className="hover:text-white" href="/pricing">Preise</Link>
          <Link className="hover:text-white" href="/legal/impressum">Impressum</Link>
          <Link className="btn btn-accent" href="/jobs/new">Anzeige schalten</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container py-8 text-sm text-neutral-400 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div>© {new Date().getFullYear()} Bahnerjob – Made for rail people</div>
        <div className="flex gap-4">
          <Link className="hover:text-white" href="/legal/impressum">Impressum</Link>
          <Link className="hover:text-white" href="/legal/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
