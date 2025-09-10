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
      {/* HERO: 2-Spalten, großes Logo (200px Desktop / 120px mobil) */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8 items-start">
            <div className="shrink-0 flex md:block items-start justify-center md:justify-start">
              <Image
                src="/logo-bahnerjob.svg"
                alt="Bahnerjob"
                width={200}
                height={200}
                priority
                className="home-logo"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Jobs für die Bahnbranche  <span className="text-amber-400">einfach finden oder inserieren</span>
              </h1>
              <p className="text-neutral-400 max-w-2xl mt-3">
                Bahnerjob ist das Jobboard speziell für Eisenbahn-Profis. Erstelle in wenigen Minuten eine Anzeige
                oder finde deinen nächsten Schritt im Schienenverkehr.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/jobs/new" className="btn btn-accent h-11 px-5 rounded-xl font-semibold">Anzeige schalten</a>
                <a href="/pricing" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Preise ansehen</a>
                <a href="/" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Jobs durchsuchen</a>
              </div>
            </div>
          </div>

          {/* Vorteile: 3 saubere Kacheln */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="home-tile">
              <div className="home-tile-kicker">Schnell & einfach</div>
              <div className="home-tile-title">Anzeige in Minuten online</div>
            </div>
            <div className="home-tile">
              <div className="home-tile-kicker">Gezielte Reichweite</div>
              <div className="home-tile-title">Für Bahn-Fachkräfte gemacht</div>
            </div>
            <div className="home-tile">
              <div className="home-tile-kicker">Transparent</div>
              <div className="home-tile-title">Klare Pakete & Laufzeiten</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS: wird angezeigt, wenn es Treffer gibt */}
      {news.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-semibold">Branchen-News</h2>
              <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
            </div>
            <NewsRail items={news} />
          </div>
        </section>
      )}
    </div>
  );
}
