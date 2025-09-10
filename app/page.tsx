import NewsRail from "@/components/NewsRail";
import Link from "next/link";

export const metadata = {
  title: "Bahnerjob – Jobs & Stellenanzeigen im Bahnsektor",
  description:
    "Bahnerjob: Stellen finden oder Anzeigen schalten. Klare Pakete, schnelle Veröffentlichung, faire Reichweite.",
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <header className="text-center">
        <div className="badge mb-3">Bahnerjob</div>
        <h1 className="font-bold tracking-tight">Stellen finden. Anzeigen schalten.</h1>
        <p className="lead mt-3 max-w-2xl mx-auto">
          Für Unternehmen und Jobsuchende im Bahnsektor – klar, schnell, ohne Umwege.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link className="btn btn-accent" href="/jobs/new">Anzeige entwerfen</Link>
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
          <Link className="btn" href="/pricing">Preise ansehen</Link>
        </div>
      </header>

      {/* TEASER-ZWEI-SPALTIG */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <div className="badge mb-2">Für Unternehmen</div>
          <h2 className="text-xl font-semibold">Schnell zur passenden Anzeige</h2>
          <p className="text-neutral-300 mt-2">
            Vorlage ausfüllen, Paket wählen, bezahlen – fertig. Deine Anzeige ist im Handumdrehen live.
          </p>
          <div className="mt-4">
            <Link className="btn btn-accent" href="/jobs/new">Anzeige entwerfen</Link>
          </div>
        </div>

        <div className="card p-6">
          <div className="badge mb-2">Für Jobsuchende</div>
          <h2 className="text-xl font-semibold">Gezielt suchen & direkt bewerben</h2>
          <p className="text-neutral-300 mt-2">
            Filter nach Ort & Bundesland. Bewirb dich über den angegebenen Link oder per E-Mail.
          </p>
          <div className="mt-4">
            <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
          </div>
        </div>
      </section>

      {/* NEWS (fehlerresistent – rendert einfach nichts, wenn leer) */}
      <NewsRail />
    </div>
  );
}
