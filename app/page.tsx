import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component  kein "use client"
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Spezialisierte Jobbörse für den Bahnsektor. Klare Pakete für Unternehmen, schnelle Suche für Bewerber:innen.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300">
          Die Jobbörse für den Bahnsektor
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">Klar. Fokussiert. Bahnerjob.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          Stellen finden und Talente erreichen  ohne Ablenkung. Ruhiges Design, klare Informationen,
          deutliche Bereiche und moderne Darstellung.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      <div className="mt-16 border-t border-neutral-800" />

      {/* ZIELGRUPPEN */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="text-xs text-neutral-400">Für Unternehmen</div>
          <h2 className="mt-2 text-xl font-semibold">Sichtbarkeit ohne Streuverlust</h2>
          <p className="mt-3 text-neutral-300">
            Erreiche qualifizierte Bahn-Profile. Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen.
            Optional: <em>Featured</em> & <em>Boost</em>.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Klare Pakete & transparente Laufzeiten</li>
            <li> Einheitliche Darstellung & gute Lesbarkeit</li>
            <li> Direkte Bewerbungen ohne Umwege</li>
          </ul>
          <div className="mt-6">
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
            <Link href="/pricing" className="ml-3 text-sm text-neutral-400 hover:text-neutral-200 align-middle">Pakete ansehen </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="text-xs text-neutral-400">Für Bewerber:innen</div>
          <h2 className="mt-2 text-xl font-semibold">Finde deinen nächsten Halt</h2>
          <p className="mt-3 text-neutral-300">
            Suche gezielt nach Ort oder Arbeitgeber. Klare Anzeigen mit den wichtigen Details,
            damit du schnell entscheiden kannst.
          </p>
          <ul className="mt-4 space-y-2 text-neutral-300">
            <li> Filter für Ort, Bundesland & Vertragsart</li>
            <li> Übersichtliche Infos: Aufgaben, Anforderungen, Benefits</li>
            <li> Bewerbung direkt beim Unternehmen</li>
          </ul>
          <div className="mt-6">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          </div>
        </article>
      </section>

      <div className="mt-16 border-t border-neutral-800" />

      {/* FEATURES */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <a href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete & Leistungen </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium">Branchenspezifisch</div>
            <p className="mt-1 text-sm text-neutral-400">Bahn-Community statt Streuverlust.</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium">Schnell & modern</div>
            <p className="mt-1 text-sm text-neutral-400">Live-Vorschau, Stripe, in Minuten online.</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium">Klare Pakete</div>
            <p className="mt-1 text-sm text-neutral-400">Basic, Featured, Boost  transparent.</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium">Lesbarkeit</div>
            <p className="mt-1 text-sm text-neutral-400">Ruhige Typografie, klare Struktur.</p>
          </div>
        </div>
      </section>

      <div className="mt-16 border-t border-neutral-800" />

      {/* TRUST */}
      <section className="mt-10">
        <h3 className="text-lg font-semibold">Moderation & Inhalt</h3>
        <p className="mt-3 max-w-3xl text-neutral-300">
          Wir achten auf klare Angaben und einheitliche Formate  so finden Kandidat:innen schneller, was wichtig ist,
          und Unternehmen sparen Zeit bei der Vorauswahl.
        </p>
      </section>

      <div className="mt-16 border-t border-neutral-800" />

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
        <h3 className="text-xl font-semibold">Bereit für den nächsten Schritt?</h3>
        <p className="mt-2 text-neutral-300">Finde passende Stellen oder starte mit deiner ersten Anzeige.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      <div className="mt-16 border-t border-neutral-800" />

      {/* NEWS */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <a href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">Alle News </a>
        </div>
        <div className="mt-6"><NewsRail /></div>
      </section>
    </main>
  );
}