import SelectDark from "../../components/SelectDark";
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  bundesland?: string;
  applyUrl: string;
  logoUrl?: string;
  featured?: boolean;
};

// Beispiel-Daten (ersetzbar durch echte Quelle/API)
const JOBS: Job[] = [
  {
    id: "1",
    title: "Triebfahrzeugführer (m/w/d)",
    company: "DB Regio",
    location: "München",
    bundesland: "Bayern",
    applyUrl: "https://www.example.com/apply/1",
    featured: true
  },
  {
    id: "2",
    title: "Fahrdienstleiter (m/w/d)",
    company: "S-Bahn Berlin",
    location: "Berlin",
    bundesland: "Berlin",
    applyUrl: "https://www.example.com/apply/2"
  },
  {
    id: "3",
    title: "Elektroniker Instandhaltung (m/w/d)",
    company: "Netz Instand GmbH",
    location: "Nürnberg",
    bundesland: "Bayern",
    applyUrl: "mailto:bewerbung@netz-instand.de"
  }
];

const BUNDESLAENDER = [
  "Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen",
  "Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz",
  "Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"
];

export default function JobsView() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase().trim();
  const bl = sp.get("bl") || "";

  const filtered = useMemo(() => {
    let rows = JOBS.slice();
    if (q) {
      rows = rows.filter(j =>
        [j.title, j.company, j.location, j.bundesland ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (bl) {
      rows = rows.filter(j => (j.bundesland || "").toLowerCase() === bl.toLowerCase());
    }
    // leichte Priorisierung: featured nach oben
    rows.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return rows;
  }, [q, bl]);

  return (
    <div className="space-y-6">
      <header className="section-head">
        <div className="badge">Jobangebote</div>
        <h1>Aktuelle Stellen</h1>
        <p className="section-desc">Finde Jobs im Bahnsektor – suche nach Titel, Firma oder Ort.</p>
      </header>

      {/* Filter-UI (Client-side, liest URL-Parameter) */}
      <div className="card p-4">
        <form className="form-grid" action="/jobs" method="GET">
          <div className="field">
            <label htmlFor="q" className="label">Suche</label>
            <input
              id="q"
              name="q"
              className="input"
              placeholder="z. B. Fahrdienstleiter, DB, München…"
              defaultValue={q}
            />
          </div>
          <div className="row-2">
            <div className="field">
              <label htmlFor="bl" className="label">Bundesland</label>
              <SelectDark id="bl" name="bl" className="input select-dark" defaultValue={bl}>
                <option value="">Alle</option>
                {BUNDESLAENDER.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </SelectDark>
            </div>
            <div className="field" style={{alignSelf:"end"}}>
              <button className="btn btn-accent" type="submit">Filtern</button>
            </div>
          </div>
        </form>
      </div>

      {/* Ergebnis-Info */}
      <div className="text-sm text-neutral-400">
        {filtered.length} {filtered.length === 1 ? "Treffer" : "Treffer"}
      </div>

      {/* Liste */}
      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="card p-6 text-neutral-300">Keine Treffer. Bitte Filter anpassen.</div>
        ) : (
          filtered.map(j => <JobCard key={j.id} j={j} />)
        )}
      </div>
    </div>
  );
}

function JobCard({ j }: { j: Job }) {
  return (
    <article className="card p-5">
      <div className="flex items-start gap-3">
        {/* Logo/Platzhalter */}
        {j.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={j.logoUrl} alt="" className="w-12 h-12 rounded-lg object-cover border" />
        ) : (
          <div className="w-12 h-12 rounded-lg border bg-neutral-900/40" />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {j.featured && <span className="badge">Featured</span>}
            <h3 className="text-lg font-bold">{j.title}</h3>
          </div>
          <div className="text-neutral-400">
            {j.company} · {j.location}{j.bundesland ? ` (${j.bundesland})` : ""}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={j.applyUrl} className="btn btn-accent" target={j.applyUrl.startsWith("http") ? "_blank" : undefined}>
            Jetzt bewerben
          </Link>
        </div>
      </div>
    </article>
  );
}
