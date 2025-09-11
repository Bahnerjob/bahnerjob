import Link from "next/link";
import NewsRail from "../components/NewsRail";

// Server component  kein "use client"
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Klares, augenfreundliches Layout: Unternehmen schalten Anzeigen, Bewerber:innen finden schnell passende Stellen.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO  luftig, ohne Box-Rahmen */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300">
          Die JobbÃ¶rse fÃ¼r den Bahnsektor
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
          Klar. Augenfreundlich. Bahnerjob.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          Deutlich getrennte Bereiche, gute Lesbarkeit und moderne Darstellung  ohne harte Rahmen.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      {/* Subtiler Trenner (kein weiÃŸ, kein Border-Outline) */}
      <div className="mt-16 h-px bg-neutral-800/40" />

      {/* Zielgruppen  weiche, getÃ¶nte FlÃ¤chen ohne Rahmen */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Unternehmen */}
        <article className="rounded-2xl bg-neutral-900/20 p-6">
          <div className="text-xs text-neutral-400">FÃ¼r Unternehmen</div>
          <h2 className="mt-2 text-xl font-semibold">Sichtbarkeit ohne Streuverlust</h2>
          <p className="mt-3 text-neutral-300">
            Anzeige schnell erstellen, Vorschau prÃ¼fen und sicher verÃ¶ffentlichen.
            Optional <em>Featured</em> & <em>Boost</em> fÃ¼r mehr Reichweite.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Klare Pakete & transparente Laufzeiten</li>
            <li> Einheitliche Darstellung & gute Lesbarkeit</li>
            <li> Direkte Bewerbungen ohne Umwege</li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
            <Link href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete ansehen </Link>
          </div>
        </article>

        {/* Bewerber:innen */}
        <article className="rounded-2xl bg-neutral-900/20 p-6">
          <div className="text-xs text-neutral-400">FÃ¼r Bewerber:innen</div>
          <h2 className="mt-2 text-xl font-semibold">Finde deinen nÃ¤chsten Halt</h2>
          <p className="mt-3 text-neutral-300">
            Suche nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Filter fÃ¼r Ort, Bundesland & Vertragsart</li>
            <li> Aufgaben, Anforderungen, Benefits auf einen Blick</li>
            <li> Bewerbung direkt beim Unternehmen</li>
          </ul>
          <div className="mt-6">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          </div>
        </article>
      </section>

      {/* Trenner */}
      <div className="mt-16 h-px bg-neutral-800/40" />

      {/* Features  ganz reduziert, ohne Box-Rahmen */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <Link href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">
            Pakete & Leistungen 
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-neutral-900/20 p-5">
            <div className="text-sm font-medium">Branchenspezifisch</div>
            <p className="mt-1 text-sm text-neutral-400">Bahn-Community statt Streuverlust.</p>
          </div>
          <div className="rounded-2xl bg-neutral-900/20 p-5">
            <div className="text-sm font-medium">Schnell & modern</div>
            <p className="mt-1 text-sm text-neutral-400">Live-Vorschau, Stripe, in Minuten online.</p>
          </div>
          <div className="rounded-2xl bg-neutral-900/20 p-5">
            <div className="text-sm font-medium">Klare Pakete</div>
            <p className="mt-1 text-sm text-neutral-400">Basic, Featured, Boost  transparent.</p>
          </div>
          <div className="rounded-2xl bg-neutral-900/20 p-5">
            <div className="text-sm font-medium">Lesbarkeit</div>
            <p className="mt-1 text-sm text-neutral-400">Ruhige Typografie, klare Struktur.</p>
          </div>
        </div>
      </section>

      {/* Trenner */}
      <div className="mt-16 h-px bg-neutral-800/40" />

      {/* Info/Trust  kurzer Textblock, frei stehend */}
      <section className="mt-10">
        <h3 className="text-lg font-semibold">Moderation & Inhalt</h3>
        <p className="mt-3 max-w-3xl text-neutral-300">
          Klare Angaben (Position, Aufgaben, Anforderungen, Benefits) und einheitliche Formate helfen
          Kandidat:innen bei der schnellen EinschÃ¤tzung und sparen Unternehmen Zeit.
        </p>
      </section>

      {/* Trenner */}
      <div className="mt-16 h-px bg-neutral-800/40" />

      {/* CTA  weiche FlÃ¤che ohne Rahmen */}
      <section className="mt-10 rounded-2xl bg-neutral-900/25 p-8 text-center">
        <h3 className="text-xl font-semibold">Bereit fÃ¼r den nÃ¤chsten Schritt?</h3>
        <p className="mt-2 text-neutral-300">Finde passende Stellen oder starte mit deiner ersten Anzeige.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      {/* Trenner */}
      <div className="mt-16 h-px bg-neutral-800/40" />

      {/* News  klar abgesetzt, ohne Rahmen */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <Link href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">
            Alle News 
          </Link>
        </div>
        <div className="mt-6">
          <NewsRail />
        </div>
      </section>
    </main>
  );
}