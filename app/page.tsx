import Image from "next/image";
import NewsRail from "@/components/NewsRail";
import { getNews, type NewsItem } from "@/lib/news";

export const metadata = {
  title: "Bahnerjob  Bahnbranche Jobs",
  description: "Jobs aus der Bahnbranche  Anzeige erstellen oder passende Stelle finden.",
};

export default async function HomePage() {
  const news: NewsItem[] = await getNews().catch(() => []);

  return (
    <div>
      {/* HERO */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8 items-start">
            <div className="shrink-0 flex md:block items-start justify-center md:justify-start">
              <Image src="/logo-bahnerjob.svg" alt="Bahnerjob" width={200} height={200} priority />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Jobs für die Bahnbranche  <span className="text-amber-400">einfach finden oder inserieren</span>
              </h1>
              <p className="text-neutral-400 max-w-2xl mt-3">
                Bahnerjob ist das Jobboard speziell für Eisenbahn-Profis. Erstelle in wenigen Minuten eine Anzeige
                oder finde deinen nächsten Schritt im Schienenverkehr.
              </p>
              {/* CTAs zentriert */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <a href="/jobs/new" className="btn btn-accent h-11 px-5 rounded-xl font-semibold">Anzeige schalten</a>
                <a href="/pricing" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Preise ansehen</a>
                <a href="/" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Jobs durchsuchen</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FÜR WEN? */}
      <section className="py-8">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-sm text-neutral-400">Für Unternehmen</div>
            <h2 className="text-lg font-semibold mt-1">Schnell passende Bewerbungen erhalten</h2>
            <ul className="mt-3 text-sm text-neutral-300 space-y-2">
              <li> Anzeige in wenigen Minuten erstellen  ohne Schnickschnack</li>
              <li> Sichtbar bei Bahn-Profis, nicht im allgemeinen Rauschen</li>
              <li> Klarer Bewerbungslink  direkte Kandidaten statt Leerlauf</li>
            </ul>
            <div className="mt-4">
              <a href="/jobs/new" className="btn btn-accent px-4 py-2 rounded-lg font-semibold">Anzeige schalten</a>
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-neutral-400">Für Fachkräfte</div>
            <h2 className="text-lg font-semibold mt-1">Gezielt Jobs im Schienenverkehr finden</h2>
            <ul className="mt-3 text-sm text-neutral-300 space-y-2">
              <li> Relevante Stellen: Triebfahrzeugführung, Leitstelle, Instandhaltung u. v. m.</li>
              <li> Übersichtliche Anzeigen  alles Wichtige auf einen Blick</li>
              <li> Direkte Bewerbung beim Arbeitgeber, keine Umwege</li>
            </ul>
            <div className="mt-4">
              <a href="/" className="btn px-4 py-2 rounded-lg border border-neutral-800 hover:bg-neutral-900">Jobs durchsuchen</a>
            </div>
          </div>
        </div>
      </section>

      {/* sanfte Trennung zwischen Zielgruppen & News */}
      <section className="section-divider" aria-hidden="true">
        <div className="container"><div className="divider-line"></div></div>
      </section>

      {/* NEWS (D-A-CH)  nur wenn vorhanden */}
      {news.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-semibold">Branchen-News (DACH)</h2>
              <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
            </div>
            <NewsRail items={news} />
          </div>
        </section>
      )}
    </div>
  );
}
