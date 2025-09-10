import Link from "next/link";
import NewsRail from "@/components/NewsRail";

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-20">
      {/* Hero */}
      <section className="text-center fade-in">
        <div className="badge mb-4">Bahn-Jobs · Für Unternehmen & Fachkräfte</div>

        <h1 className="font-bold tracking-tight">
          Bahnerjob – Jobs & Anzeigen im Bahnsektor
        </h1>

        <p className="mt-4 lead max-w-2xl mx-auto">
          Schnell sichtbar für Unternehmen. Schnell fündig für Fachkräfte. Klar, fair, ohne Umwege.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {/* WICHTIG: direkt zum Entwurf */}
          <Link className="btn btn-accent" href="/jobs/new">Anzeige schalten</Link>
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
        </div>
      </section>

      {/* Zwei Wege */}
      <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 fade-in-delayed">
        {/* Für Unternehmen */}
        <div className="card no-lift p-6 flex flex-col">
          <div className="badge mb-3">Für Unternehmen</div>
          <h2 className="text-2xl font-bold tracking-tight">In Minuten zur sichtbaren Anzeige</h2>
          <ul className="mt-3 text-neutral-300 text-[0.98rem] space-y-2">
            <li>• Veröffentlichung ohne Agentur & ohne Umwege</li>
            <li>• Pakete: Basic, Featured & Boost – jederzeit erweiterbar</li>
            <li>• Transparente Preise & Rechnung für die Buchhaltung</li>
          </ul>

          <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
            {/* WICHTIG: hier ebenfalls zum Entwurf */}
            <Link href="/jobs/new" className="btn btn-accent">Anzeige schalten</Link>
            <Link href="/pricing" className="btn">Preise ansehen</Link>
          </div>
        </div>

        {/* Für Jobsuchende */}
        <div className="card no-lift p-6 flex flex-col">
          <div className="badge mb-3">Für Jobsuchende</div>
          <h2 className="text-2xl font-bold tracking-tight">Finde deinen nächsten Bahnerjob</h2>
          <ul className="mt-3 text-neutral-300 text-[0.98rem] space-y-2">
            <li>• Echte Bahn-Rollen – keine generischen Sammelstellen</li>
            <li>• Schnelle Suche nach Titel, Ort & Bundesland</li>
            <li>• Kein Account nötig – direkt informieren & bewerben</li>
          </ul>

          <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
            <Link href="/jobs" className="btn btn-accent">Jobs durchsuchen</Link>
            <Link href="/jobs" className="btn">Alle Jobs ansehen</Link>
          </div>
        </div>
      </section>

      {/* Vertrauensleisten */}
      <section className="text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <span className="badge">In ~5 Min. live</span>
          <span className="badge">Faire, klare Pakete</span>
          <span className="badge">Made for rail people</span>
        </div>
      </section>

      {/* Bahn-News */}
      <NewsRail />
    </div>
  );
}
