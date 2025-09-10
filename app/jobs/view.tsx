"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { JOBS, BUNDESLAENDER, type Job } from "@/lib/job";

export default function JobsView() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase().trim();
  const bl = (sp.get("bl") || "").toLowerCase().trim();

  const jobs = filterJobs(JOBS, q, bl);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="badge mb-3">Aktuelle Stellen</div>
        <h1 className="font-bold tracking-tight">Jobs im Bahnsektor</h1>
        <p className="mt-3 lead">Suche nach Titel, Firma oder Ort – oder filtere nach Bundesland.</p>
      </header>

      <form className="card p-4" action="/jobs" method="get">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Suche</label>
            <input
              name="q"
              defaultValue={q}
              placeholder="z. B. Triebfahrzeugführer, Hamburg…"
              className="w-full rounded-xl border px-3 py-2 bg-transparent"
              style={{ borderColor: "rgb(var(--border))" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Bundesland</label>
            <select
              name="bl"
              defaultValue={bl}
              className="w-full rounded-xl border px-3 py-2 bg-transparent"
              style={{ borderColor: "rgb(var(--border))" }}
            >
              <option value="">Alle Bundesländer</option>
              {BUNDESLAENDER.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="btn w-full md:w-auto">Filtern</button>
            <Link href="/jobs" className="btn w-full md:w-auto">Zurücksetzen</Link>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {jobs.length === 0 ? (
          <div className="card p-6 text-neutral-300">Keine Treffer. Bitte Filter anpassen.</div>
        ) : (
          jobs.map((j, i) => <JobCard key={`${j.title}-${i}`} j={j} />)
        )}
      </div>
    </div>
  );
}

function filterJobs(all: Job[], q: string, bl: string) {
  return all.filter((j) => {
    const hay = `${j.title} ${j.company} ${j.ort} ${j.bundesland} ${j.beschreibung}`.toLowerCase();
    const okQ = q ? hay.includes(q) : true;
    const okBl = bl ? j.bundesland.toLowerCase() === bl : true;
    return okQ && okBl;
  });
}

function JobCard({ j }: { j: Job }) {
  return (
    <div className="card p-5 hover:shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{j.title}</h3>
          <p className="text-sm text-neutral-400 mt-0.5">
            {j.company} • {j.ort} · {j.bundesland}
          </p>
        </div>
        {j.featured && (
          <span className="badge" style={{ borderColor: "rgba(220,38,38,0.4)", color: "white" }}>
            Featured
          </span>
        )}
      </div>
      <p className="text-neutral-300 mt-3">{j.beschreibung}</p>
    </div>
  );
}
