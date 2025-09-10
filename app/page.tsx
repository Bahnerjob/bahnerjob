import Image from "next/image";

// Typ für News-Items (passt zu deinem NewsRail)
type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

// News dynamisch laden, aber niemals einen Fehler nach außen werfen.
// Wenn du bereits eine eigene Quelle hast (z. B. lib/news), wird sie verwendet.
// Sonst bleibt es einfach leer und der News-Block blendet sich aus.
async function loadNews(): Promise<NewsItem[]> {
  try {
    // Versuche optionales Modul zu laden (falls vorhanden)
    // z.B. export async function getNews(): Promise<NewsItem[]>
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
      {/* HERO */}
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <div className="inline-flex items-center justify-center mb-5">
            {/* Dein Logo aus /public */}
            <Image
              src="/logo-bahnerjob.svg"
              alt="Bahnerjob"
              width={64}
              height={64}
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Jobs für die <span className="text-amber-400">Bahnbranche</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-3">
            Anzeige erstellen, sicher veröffentlichen und passende Bewerbungen erhalten 
            oder den nächsten Karriereschritt finden.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
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
      </section>

      {/* FEATURE STRIP (kleiner, sauberer Divider-Bereich) */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="card">
              <div className="text-sm text-neutral-400">Schnell & einfach</div>
              <div className="mt-1 font-medium">Anzeige in wenigen Minuten</div>
            </div>
            <div className="card">
              <div className="text-sm text-neutral-400">Gezielte Reichweite</div>
              <div className="mt-1 font-medium">Für Bahn-Profis gemacht</div>
            </div>
            <div className="card">
              <div className="text-sm text-neutral-400">Sicher & transparent</div>
              <div className="mt-1 font-medium">Klare Pakete, klare Kosten</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS  nur anzeigen, wenn Items vorhanden sind */}
      {news.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-xl font-semibold">Branchen-News</h2>
              <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
            </div>

            {/* Wenn du components/NewsRail bereits hast, verwende es direkt */}
            {/* @ts-expect-error - optional existierende Komponente ohne harte Typabhängigkeit */}
            {(() => {
              try {
                // dynamic require ist in RSC nicht erlaubt  daher JSX-Level Fallback:
                // Wir binden die Komponente über require zur Laufzeit im Serverkontext.
                // Falls sie nicht existiert, rendern wir unten den Fallback-Grid.
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const NewsRail = require("@/components/NewsRail").default;
                return <NewsRail items={news} />;
              } catch {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {news.map((n) => (
                      <a
                        key={n.id}
                        href={n.url}
                        className="card block p-3 hover:bg-neutral-900 rounded-lg"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="text-xs text-neutral-400 mb-1 line-clamp-1">{n.source}</div>
                        <div className="text-sm font-medium line-clamp-3 leading-5">{n.title}</div>
                        {n.date && (
                          <div className="text-xs text-neutral-500 mt-2">
                            {new Date(n.date).toLocaleDateString("de-DE")}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                );
              }
            })()}
          </div>
        </section>
      )}
    </div>
  );
}
