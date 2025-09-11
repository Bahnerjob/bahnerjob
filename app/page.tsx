import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Ruhiges, klares Layout wie Anzeige schalten: Unternehmen schalten Anzeigen, Bewerber:innen finden schnell passende Stellen.",
};

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="section text-center">
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 className="h1-bj mt-5">Klar. Augenfreundlich. Bahnerjob.</h1>
        <p className="lead mx-auto mt-4 max-w-2xl">
          Deutlich getrennte Bereiche, ruhige Typografie und moderne Darstellung  konsistent mit Anzeige schalten.
        </p>
        <div className="cta-row">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      <div className="divider" />

      {/* ZIELGRUPPEN */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Unternehmen */}
          <article className="card-soft">
            <div className="text-xs muted">Für Unternehmen</div>
            <h2 className="h2-bj mt-2">Sichtbarkeit ohne Streuverlust</h2>
            <p className="lead mt-3">
              Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen. Optional <em>Featured</em> &amp; <em>Boost</em>.
            </p>
            <ul className="mt-4 space-y-2 text-neutral-300">
              <li> Klare Pakete & transparente Laufzeiten</li>
              <li> Einheitliche Darstellung & gute Lesbarkeit</li>
              <li> Direkte Bewerbungen ohne Umwege</li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
              <Link href="/pricing" className="text-sm muted hover:text-neutral-200">Pakete ansehen </Link>
            </div>
          </article>

          {/* Bewerber:innen */}
          <article className="card-soft">
            <div className="text-xs muted">Für Bewerber:innen</div>
            <h2 className="h2-bj mt-2">Finde deinen nächsten Halt</h2>
            <p className="lead mt-3">
              Suche nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
            </p>
            <ul className="mt-4 space-y-2 text-neutral-300">
              <li> Filter für Ort, Bundesland & Vertragsart</li>
              <li> Aufgaben, Anforderungen, Benefits auf einen Blick</li>
              <li> Bewerbung direkt beim Unternehmen</li>
            </ul>
            <div className="mt-6">
              <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            </div>
          </article>
        </div>
      </section>

      <div className="divider" />

      {/* FEATURES */}
      <section className="section">
        <div className="container-bj flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <Link href="/pricing" className="text-sm muted hover:text-neutral-200">Pakete & Leistungen </Link>
        </div>
        <div className="container-bj mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-soft">
            <div className="text-sm font-medium">Branchenspezifisch</div>
            <p className="mt-1 text-sm muted">Bahn-Community statt Streuverlust.</p>
          </div>
          <div className="card-soft">
            <div className="text-sm font-medium">Schnell & modern</div>
            <p className="mt-1 text-sm muted">Live-Vorschau, Stripe, in Minuten online.</p>
          </div>
          <div className="card-soft">
            <div className="text-sm font-medium">Klare Pakete</div>
            <p className="mt-1 text-sm muted">Basic, Featured, Boost  transparent.</p>
          </div>
          <div className="card-soft">
            <div className="text-sm font-medium">Lesbarkeit</div>
            <p className="mt-1 text-sm muted">Ruhige Typografie, klare Struktur.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* INFO/TRUST */}
      <section className="section">
        <div className="container-bj">
          <h3 className="text-lg font-semibold">Moderation & Inhalt</h3>
          <p className="lead mt-3 max-w-3xl">
            Klare Angaben (Position, Aufgaben, Anforderungen, Benefits) und einheitliche Formate helfen
            Kandidat:innen bei der schnellen Einschätzung und sparen Unternehmen Zeit.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="section">
        <div className="container-bj text-center">
          <h3 className="text-xl font-semibold">Bereit für den nächsten Schritt?</h3>
          <p className="lead mt-2">Finde passende Stellen oder starte mit deiner ersten Anzeige.</p>
          <div className="cta-row">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* NEWS */}
      <section className="section">
        <div className="container-bj flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <Link href="/news" className="text-sm muted hover:text-neutral-200">Alle News </Link>
        </div>
        <div className="container-bj mt-6">
          <NewsRail />
        </div>
      </section>
    </main>
  );
}