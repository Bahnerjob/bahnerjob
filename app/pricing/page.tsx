// app/pricing/page.tsx  (Server Component, Next 15, ohne useSearchParams)

import Link from "next/link";

type PkgKey = "basic" | "featured" | "boost";

type Pkg = {
  key: PkgKey;
  title: string;
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
      "Logo, Titel, Ort, Bundesland, Bewerbungslink",
      "1 Kategorie/Schwerpunkt",
      "Rechnung per E-Mail, Support per E-Mail"
    ]
  },
  {
    key: "featured",
    title: "Featured",
    bullets: [
      "Alles aus „Basic“",
      "Priorisierte Platzierung in der Liste",
      "Kennzeichnung als „Featured“",
      "Bis zu 2 Kategorien/Schwerpunkte",
      "Bessere Sichtbarkeit in Suchergebnissen"
    ],
    note: "Empfohlen für wichtige oder zeitkritische Positionen"
  },
  {
    key: "boost",
    title: "Boost",
    bullets: [
      "Alles aus „Featured“",
      "Maximale Reichweite in Listings",
      "Bis zu 3 Kategorien/Schwerpunkte",
      "Verlängerte Laufzeit: 45 Tage",
      "Ideal für schwer zu besetzende Rollen"
    ]
  }
];

export const metadata = {
  title: "Preise – Bahnerjob",
  description: "Klare Pakete für Stellenanzeigen im Bahnsektor."
};

// WICHTIG (Next 15): searchParams ist ein Promise!
export default async function PricingPage(props: {
  searchParams: Promise<{ pkg?: string }>;
}) {
  const { pkg } = await props.searchParams;
  const highlight: PkgKey =
    pkg === "basic" || pkg === "featured" || pkg === "boost" ? (pkg as PkgKey) : "featured";

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
        {PACKAGES.map((p) => {
          const emphasized = p.key === highlight;
          return (
            <article
              key={p.key}
              className={`card p-6 flex flex-col ${emphasized ? "ring-1" : ""}`}
              style={emphasized ? { boxShadow: "0 0 0 1px rgba(220,38,38,0.35) inset" } : undefined}
            >
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
                {/* Nicht direkt kaufen → in den Entwurfs-Flow mit vorbelegtem Paket */}
                <Link href={`/jobs/new?pkg=${p.key}`} className="btn btn-accent w-full text-center">
                  Anzeige entwerfen
                </Link>
              </div>
            </article>
          );
        })}
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
