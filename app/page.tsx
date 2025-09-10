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
      {/* HERO ohne Bild/Logo (Logo ist global im Header) */}
      <section className="py-10 md:py-14">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-center">
            Jobs für die Bahnbranche  <span className="text-amber-400">einfach finden oder inserieren</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-3 text-center">
            Bahnerjob ist das Jobboard speziell für Eisenbahn-Profis. Erstelle in wenigen Minuten eine Anzeige
            oder finde deinen nächsten Schritt im Schienenverkehr.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center text-center">
            <a href="/jobs/new" className="btn btn-accent h-11 px-5 rounded-xl font-semibold">Anzeige schalten</a>
            <a href="/pricing" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Preise ansehen</a>
            <a href="/" className="btn h-11 px-5 rounded-xl border border-neutral-800 hover:bg-neutral-900">Jobs durchsuchen</a>
          </div>
        </div>
      </section>

      {/* FÜR WEN?  zwei Karten */}
      <section className="py-8">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-sm text-neutral-400">Für Unternehmen</div>
            <h2 className="text-lg font-semibold mt-1">Schnell qualifizierte Bewerbungen erhalten</h2>
            <ul className="mt-3 text-sm text-neutral-300 space-y-2">
              <li> Anzeige in wenigen Minuten veröffentlichen  klar strukturiert und ohne Schnickschnack.</li>
              <li> Gezielte Reichweite in der Bahnbranche: passende Fach- und Führungskräfte.</li>
              <li> Direkter Bewerbungslink  Kandidaten kommen ohne Umwege bei Ihnen an.</li>
            </ul>
            <div className="mt-4">
              <a href="/jobs/new" className="btn btn-accent px-4 py-2 rounded-lg font-semibold">Anzeige schalten</a>
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-neutral-400">Für Fachkräfte</div>
            <h2 className="text-lg font-semibold mt-1">Stellen im Schienenverkehr gezielt finden</h2>
            <ul className="mt-3 text-sm text-neutral-300 space-y-2">
              <li> Aktuelle Jobs bei Infrastruktur-, Verkehrs- und Instandhaltungsunternehmen.</li>
              <li> Übersichtliche Anzeigen mit klaren Anforderungen und Kontaktweg.</li>
              <li> Direkte Bewerbung beim Arbeitgeber  ohne Registrierung.</li>
            </ul>
            <div className="mt-4">
              <a href="/" className="btn px-4 py-2 rounded-lg border border-neutral-800 hover:bg-neutral-900">Jobs durchsuchen</a>
            </div>
          </div>
        </div>
      </section>

      {/* sanfte Trennung */}
      <section className="section-divider" aria-hidden="true">
        <div className="container"><div className="divider-line"></div></div>
      </section>

      {/* NEWS (DACH Eisenbahn)  nur wenn vorhanden */}
      {news.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-semibold">Branchen-News (DACH, Eisenbahn)</h2>
              <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
            </div>
            <NewsRail items={news} />
          </div>
        </section>
      )}
    </div>
  );
}

