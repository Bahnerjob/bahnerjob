import Link from "next/link";
import NewsRail from "@/components/NewsRail";

export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Moderner, mittiger Auftritt: zwei klare Aktionen, ruhige Panels, keine bunten Ablenkungen.",
};

export default function HomePage() {
  return (
    <div className="section">
      {/* HERO: mittig, klar, 2 deutliche Buttons */}
      <section className="centered">
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 className="h1-bj mt-5">Klar. Modern. Fokussiert.</h1>
        <p className="lead mx-auto mt-4 max-w-2xl">
          Gute Lesbarkeit, klare Wege  und Buttons, die wirklich wie Buttons aussehen.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn btn-secondary">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
        </div>
      </section>

      <div className="divider mt-16" />

      {/* ZIELGRUPPEN: zwei ruhige Panels */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="panel-soft">
          <div className="text-xs text-neutral-400">Für Unternehmen</div>
          <h2 className="h2-bj mt-2">Sichtbarkeit ohne Streuverlust</h2>
          <p className="lead mt-3">
            Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen. Optional <em>Featured</em> &amp; <em>Boost</em>.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Klare Pakete & transparente Laufzeiten</li>
            <li> Einheitliche Darstellung & gute Lesbarkeit</li>
            <li> Direkte Bewerbungen beim Unternehmen</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
            <Link href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete & Leistungen </Link>
          </div>
        </article>

        <article className="panel-soft">
          <div className="text-xs text-neutral-400">Für Bewerber:innen</div>
          <h2 className="h2-bj mt-2">Finde deinen nächsten Halt</h2>
          <p className="lead mt-3">
            Suche gezielt nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Filter für Ort, Bundesland &amp; Vertragsart</li>
            <li> Aufgaben, Anforderungen, Benefits auf einen Blick</li>
            <li> Bewerbung direkt beim Unternehmen</li>
          </ul>
          <div className="mt-6">
            <Link href="/jobs" className="btn btn-secondary">Jobs durchsuchen</Link>
          </div>
        </article>
      </section>

      <div className="divider mt-16" />

      {/* FEATURES: reduziert & mittig */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <Link href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete & Leistungen </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="panel-soft">
            <div className="text-sm font-medium">Branchenspezifisch</div>
            <p className="mt-1 text-sm text-neutral-400">Community statt Streuverlust.</p>
          </div>
          <div className="panel-soft">
            <div className="text-sm font-medium">Schnell & modern</div>
            <p className="mt-1 text-sm text-neutral-400">Live-Vorschau, Stripe, in Minuten online.</p>
          </div>
          <div className="panel-soft">
            <div className="text-sm font-medium">Klare Pakete</div>
            <p className="mt-1 text-sm text-neutral-400">Basic, Featured, Boost  transparent.</p>
          </div>
          <div className="panel-soft">
            <div className="text-sm font-medium">Lesbarkeit</div>
            <p className="mt-1 text-sm text-neutral-400">Ruhige Typo, klare Struktur.</p>
          </div>
        </div>
      </section>

      <div className="divider mt-16" />

      {/* NEWS */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <Link href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">Alle News </Link>
        </div>
        <div className="mt-6">
          <NewsRail />
        </div>
      </section>
    </div>
  );
}