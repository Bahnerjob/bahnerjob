import Image from "next/image";
import NewsRail from "@/components/NewsRail";

// Typ für News-Items (kompatibel zu deiner NewsRail)
type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

// Optionales Laden externer News-Funktion (falls vorhanden), sonst leer.
async function loadNews(): Promise<NewsItem[]> {
  try {
    const mod: any = await import("@/lib/news").catch(() => null);
    if (mod && typeof mod.getNews === "function") {
      const items = await mod.getNews();
      if (Array.isArray(items)) return items;
    }
  } catch {}
  return [];
}

export const metadata = {
  title: "Bahnerjob  Bahnbranche Jobs",
  description: "Jobs aus der Bahnbranche  Anzeige erstellen oder passende Stelle finden.",
};

export default async function HomePage() {
  const news = await loadNews();

  return (
    <div>
      {/* HERO  Logo groß, Claim linksbündig untereinander, klare CTAs */}
      <section className="py-10 md:py-14 border-b border-neutral-800/60">
        <div className="container">
          <div className="flex items-start gap-6 md:gap-8">
            <div className="shrink-0">
              <Image
                src="/logo-bahnerjob.svg"
                alt="Bahnerjob"
                width={120}
                height={120}
                priority
              />
            </div>
            <div className="grow">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Jobs für die Bahnbranche  <span className="text-amber-400">einfach finden oder inserieren</span>
              </h1>
              <p className="text-neutral-400 max-w-2xl mt-3">
                Bahnerjob ist das Jobboard speziell für Eisenbahn-Profis. Erstelle in wenigen Minuten eine Anzeige
                oder finde deinen nächsten Schritt im Schienenverkehr.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/jobs/new" className="btn btn-accent h-11 px-5 rounded-xl font-semibold">
                  Anzeige schalten
                </a>
                <a href="/pricing" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">
                  Preise ansehen
                </a>
                <a href="/" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">
                  Jobs durchsuchen
                </a>
              </div>
            </div>
          </div>

          {/* Quick-Actions / Vorteile  klare 3er-Übersicht, linksbündig */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="card">
              <div className="text-sm text-neutral-400">Schnell & einfach</div>
              <div className="mt-1 font-medium">Anzeige in Minuten online</div>
            </div>
            <div className="card">
              <div className="text-sm text-neutral-400">Gezielte Reichweite</div>
              <div className="mt-1 font-medium">Für Bahn-Fachkräfte gemacht</div>
            </div>
            <div className="card">
              <div className="text-sm text-neutral-400">Transparent</div>
              <div className="mt-1 font-medium">Klare Pakete & Laufzeiten</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS  sichtbarer Block mit Titelzeile; nutzt deine NewsRail */}
      <section className="py-10">
        <div className="container">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Branchen-News</h2>
            <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
          </div>

          {news.length > 0 ? (
            <NewsRail items={news} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[1,2,3].map((i) => (
                <div key={i} className="card p-3">
                  <div className="text-xs text-neutral-500 mb-1"></div>
                  <div className="text-sm text-neutral-400">Noch keine News verfügbar.</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
