import Link from "next/link";

export const metadata = {
  title: "Preise – Bahnerjob",
  description: "Klare Pakete für Stellenanzeigen im Bahnsektor."
};

type Pkg = {
  key: "basic" | "featured" | "boost";
  title: string;
  // hier optional: price?: string;  // wenn du später Preise textlich anzeigen willst
  bullets: string[];
  note?: string;
};

const PACKAGES: Pkg[] = [
  {
    key: "basic",
    title: "Basic",
    bullets: [
      "Laufzeit: 30 Tage",
      "Sichtbar in Jobliste & Suche",
      "Inklusive: Logo, Titel, Ort, Bundesland, Bewerbungslink",
      "1 Kategorie/Schwerpunkt wählbar",
      "Rechnung per E-Mail, Support per E-Mail"
    ]
  },
  {
    key: "featured",
    title: "Featured",
    bullets: [
      "Alles aus „Basic“",
      "Sichtbarkeits-Boost durch priorisierte Platzierung in der Liste",
      "Kennzeichnung als „Featured“ in der Jobliste",
      "Bis zu 2 Kategorien/Schwerpunkte",
      "Erhöhte Aufmerksamkeit in Suchergebnissen"
    ],
    note: "Empfohlen für wichtige oder zeitkritische Positionen"
  },
  {
    key: "boost",
    title: "Boost",
    bullets: [
      "Alles aus „Featured“",
      "Maximale Reichweite durch verstärkte Prominenz in Listings",
      "Bis zu 3 Kategorien/Schwerpunkte",
      "Verlängerte Laufzeit: 45 Tage",
      "Bestens geeignet für schwer zu besetzende Rollen"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <header className="text-center">
        <div className="badge mb-3">Pakete & Leistungen</div>
        <h1 className="font-bold tracking-tight">Preise für Stellenanzeigen</h1>
        <p className="lead mt-3 max-w-2xl mx-auto">
          Wähle das Paket, das zu deiner Rolle passt. Du entwirfst die Anzeige zuerst
          und gehst dann in den Bezahlprozess – transparent und ohne Umwege.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {PACKAGES.map((p) => (
          <article key={p.key} className="card p-6 flex flex-col">
            <div className="badge mb-2">{p.title}</div>

            <ul className="text-neutral-300 text-[0.98rem] space-y-2">
              {p.bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>

            {p.note && (
              <div className="mt-3 text-xs text-neutral-400">{p.note}</div>
            )}

            <div className="mt-auto pt-5">
              {/* Nicht direkt kaufen -> in den Entwurf mit vorbelegtem Paket */}
              <Link href={`/jobs/new?pkg=${p.key}`} className="btn btn-accent w-full text-center">
                Anzeige entwerfen
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <span className="badge">Rechnung & Support per E-Mail</span>
          <span className="badge">Keine Agentur notwendig</span>
          <span className="badge">Klar & transparent</span>
        </div>
      </section>
    </div>
  );
}
