import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description:
    "Bahnerjob verbindet Unternehmen und Fachkräfte im Bahnsektor. Klare Pakete für Arbeitgeber, schnelle Suche für Bewerber:innen.",
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="text-center">
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 className="h1-bj mt-5">Klar. Modern. Fokussiert.</h1>
        <p className="lead mx-auto mt-4 max-w-2xl">
          Keine bunten Ablenkungen, keine doppelten Aktionen: ruhiges Design, gute Lesbarkeit und klare Wege.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* PRIMÄRE CTAs: genau zwei */}
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
          {/* KEINE doppelten Varianten wie Anzeige entwerfen, Preise ansehen */}
        </div>
      </section>

      <div className="divider" />

      {/* ZIELGRUPPEN  ruhige Panels, ohne harte Rahmen */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="panel-soft p-6">
          <div className="text-xs muted">Für Unternehmen</div>
          <h2 className="h2-bj mt-2">Sichtbar ohne Streuverlust</h2>
          <p className="lead mt-3">
            Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen. Optional <em>Featured</em> &amp; <em>Boost</em>.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Klare Pakete & transparente Laufzeiten</li>
            <li> Einheitliche Darstellung & gute Lesbarkeit</li>
            <li> Direkte Bewerbungen beim Unternehmen</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
            <Link href="/pricing" className="text-sm muted hover:text-neutral-200">Pakete & Leistungen </Link>
          </div>
        </article>

        <article className="panel-soft p-6">
          <div className="text-xs muted">Für Bewerber:innen</div>
          <h2 className="h2-bj mt-2">Finde deinen nächsten Halt</h2>
          <p className="lead mt-3">
            Suche gezielt nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Filter für Ort, Bundesland &amp; Vertragsart (wenn vorhanden)</li>
            <li> Aufgaben, Anforderungen, Benefits auf einen Blick</li>
            <li> Bewerbung direkt beim Unternehmen</li>
          </ul>
          <div className="mt-6">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          </div>
        </article>
      </section>

      <div className="divider" />

      {/* FEATURES  reduziert */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <Link href="/pricing" className="text-sm muted hover:text-neutral-200">
            Pakete & Leistungen 
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel-soft p-5">
            <div className="text-sm font-medium">Branchenspezifisch</div>
            <p className="mt-1 text-sm muted">Community statt Streuverlust.</p>
          </div>
          <div className="panel-soft p-5">
            <div className="text-sm font-medium">Schnell & modern</div>
            <p className="mt-1 text-sm muted">Live-Vorschau, Stripe, in Minuten online.</p>
          </div>
          <div className="panel-soft p-5">
            <div className="text-sm font-medium">Klare Pakete</div>
            <p className="mt-1 text-sm muted">Basic, Featured, Boost  transparent.</p>
          </div>
          <div className="panel-soft p-5">
            <div className="text-sm font-medium">Lesbarkeit</div>
            <p className="mt-1 text-sm muted">Ruhige Typo, klare Struktur.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* NEWS */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <Link href="/news" className="text-sm muted hover:text-neutral-200">Alle News </Link>
        </div>
        <div className="mt-6">
          <NewsRail />
        </div>
      </section>
    </div>
  );
}