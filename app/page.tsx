import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob - Jobs & Stellenanzeigen im Bahnsektor",
  description: "Bahnerjob: Stellen finden oder Anzeigen schalten. Klare Pakete, schnelle Veroeffentlichung, faire Reichweite."
};

export default function HomePage() {
  return (
    <div className="space-y-12 mx-auto max-w-5xl px-4 py-12">
      {/* HERO (ohne zusätzliches Logo; Header-Logo kommt aus layout.tsx) */}
      <header className="text-center">
        <div className="badge mb-3">Bahnerjob</div>
        <h1 className="text-3xl font-bold tracking-tight">Stellen finden. Anzeigen schalten.</h1>
        <p className="section-desc text-neutral-300 mt-2">Die Jobboerse fuer den Bahnsektor - modern, schnell, fokussiert.</p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </header>

      {/* Vorteile */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="card p-5">
          <div className="badge">Branchenspezifisch</div>
          <h2 className="mt-2 font-semibold">Reichweite ohne Streuverlust</h2>
          <p className="section-desc text-neutral-400">Zielgruppe Bahn - vom Stellwerk bis zum Triebfahrzeug.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Schnell & modern</div>
          <h2 className="mt-2 font-semibold">Live-Vorschau & Stripe</h2>
          <p className="section-desc text-neutral-400">Anzeige erstellen, pruefen, bezahlen - in Minuten live.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Faire Pakete</div>
          <h2 className="mt-2 font-semibold">Basic, Featured, Boost</h2>
          <p className="section-desc text-neutral-400">Transparent und effektiv fuer jedes Budget.</p>
        </article>
      </section>

      {/* Einstieg Jobs */}
      <section className="card p-6">
        <div className="badge">Fuer Bewerber:innen</div>
        <h2 className="mt-2 font-semibold">Finde deinen naechsten Halt</h2>
        <p className="section-desc text-neutral-400">Filter nach Ort & Bundesland. Bewirb dich direkt beim Arbeitgeber.</p>
        <div className="mt-4">
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
        </div>
      </section>

      {/* News (bestehende Komponente) */}
      <NewsRail />
    </div>
  );
}