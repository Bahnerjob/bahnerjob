import Link from "next/link";
import NewsRail from "../components/NewsRail";

// Server component (no client hooks)
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description:
    "Bahnerjob: Die spezialisierte JobbÃ¶rse fÃ¼r den Bahnsektor. Unternehmen schalten moderne Anzeigen mit hoher Sichtbarkeit. Bewerber:innen finden schnell passende Stellen.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-14">
      {/* HERO */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-300">
            Die JobbÃ¶rse fÃ¼r den Bahnsektor
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Stellen finden. <span className="text-neutral-200">Talente erreichen.</span>
          </h1>
          <p className="mt-4 text-neutral-300">
            Bahnerjob verbindet Eisenbahner:innen mit den passenden Arbeitgebern  vom Stellwerk bis zum Triebfahrzeug.
            Schlanke Prozesse, klare Pakete, moderne Darstellung.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Unternehmen */}
        <article className="card p-6 border border-neutral-800 bg-neutral-900/40 rounded-2xl">
          <div className="badge">FÃ¼r Unternehmen</div>
          <h2 className="mt-2 text-xl font-semibold">Sichtbar in der Bahn-Community</h2>
          <p className="mt-2 text-neutral-300">
            Erreiche gezielt FachkrÃ¤fte ohne Streuverlust. Mit wenigen Klicks eine professionelle Anzeige erstellen,
            Vorschau prÃ¼fen und per Stripe sicher verÃ¶ffentlichen. Optional: <em>Featured</em> und <em>Boost</em>.
          </p>
          <ul className="mt-4 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Branchenspezifische Reichweite &amp; relevante Bewerbungen</li>
            <li>Klare Pakete &amp; transparente Laufzeiten</li>
            <li>Aktualisierbare Inhalte &amp; saubere Formatierung</li>
          </ul>
          <div className="mt-5"><Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link></div>
          <p className="mt-3 text-sm text-neutral-400">
            Tipp: Mit <strong>Featured</strong> hebt sich eure Anzeige im Listing visuell ab.
            <a href="/pricing" className="underline ml-1">Zu den Paketen</a>
          </p>
        </article>

        {/* Bewerber:innen */}
        <article className="card p-6 border border-neutral-800 bg-neutral-900/40 rounded-2xl">
          <div className="badge">FÃ¼r Bewerber:innen</div>
          <h2 className="mt-2 text-xl font-semibold">Finde deinen nÃ¤chsten Halt</h2>
          <p className="mt-2 text-neutral-300">
            Durchsuche aktuelle Stellen im Bahnsektor. Filtere nach Ort, Bundesland oder Arbeitgeber und bewirb dich
            direkt beim Unternehmen  ohne Umwege.
          </p>
          <ul className="mt-4 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Klar strukturierte Anzeigen mit relevanten Details</li>
            <li>Filter fÃ¼r Ort, Bundesland &amp; Vertragsart (sofern angegeben)</li>
            <li>Direktbewerbung beim jeweiligen Arbeitgeber</li>
          </ul>
          <div className="mt-5"><Link href="/jobs" className="btn">Jobs durchsuchen</Link></div>
          <p className="mt-3 text-sm text-neutral-400">Hinweis: Neue Jobs kommen regelmÃ¤ÃŸig rein  schau Ã¶fter vorbei.</p>
        </article>
      </section>

      {/* FEATURES */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <a href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete ansehen </a>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Branchenspezifisch</div>
            <div className="mt-2 font-semibold">Reichweite ohne Streuverlust</div>
            <p className="mt-1 text-neutral-400 text-sm">Gezielt Bahn-Profile erreichen  vom Stellwerk bis Tfz.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Schnell & modern</div>
            <div className="mt-2 font-semibold">Live-Vorschau & Stripe</div>
            <p className="mt-1 text-neutral-400 text-sm">Anzeige erstellen, prÃ¼fen, bezahlen  in Minuten live.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Faire Pakete</div>
            <div className="mt-2 font-semibold">Basic, Featured, Boost</div>
            <p className="mt-1 text-neutral-400 text-sm">Transparente Laufzeiten &amp; klare Vorteile.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">QualitÃ¤t</div>
            <div className="mt-2 font-semibold">Saubere Darstellung</div>
            <p className="mt-1 text-neutral-400 text-sm">Strukturiertes Layout, gute Lesbarkeit, mobile-ready.</p>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
        <h3 className="text-lg font-semibold">Moderation & Inhalt</h3>
        <p className="mt-2 text-neutral-300">
          Bahnerjob achtet auf fachlich passende Inhalte, klare Angaben und einheitliche Formate  so finden
          Kandidat:innen schnell, was wirklich zÃ¤hlt, und Unternehmen sparen Zeit bei der Vorauswahl.
        </p>
      </section>

      {/* CTA-BANNER */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-center">
        <h3 className="text-xl font-semibold">Bereit fÃ¼r den nÃ¤chsten Schritt?</h3>
        <p className="mt-2 text-neutral-300">Finde jetzt passende Stellen oder bring deine Stellenanzeige live.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      {/* NEWS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <a href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">Alle News </a>
        </div>
        <NewsRail />
      </section>
    </main>
  );
}