"use client";

import { useMemo, useEffect, useState } from "react";
import { JOBS, BUNDESLAENDER } from "../../lib/jobs";

function inputCls() { return "w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"; }

type Params = { q: string; land: string; ort: string };

function useQueryParams(): Params {
  const [p, setP] = useState<Params>({ q: "", land: "Alle", ort: "" });

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setP({
      q: (sp.get("q") || "").trim(),
      land: sp.get("land") || "Alle",
      ort: (sp.get("ort") || "").trim(),
    });
  }, []);

  return p;
}

function JobCard({ j }: { j: typeof JOBS[number] }) {
  return (
    <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">
          {j.title} <span className="text-neutral-400 font-normal">  {j.company}</span>
        </h3>
        {j.featured && (
          <span className="px-2 py-1 text-xs rounded bg-amber-500/20 text-amber-300 border border-amber-700">
            FEATURED
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-300 mt-1">
        {j.place} ({j.bundesland})  {j.salary ?? "Gehalt n/a"}
      </p>
      {j.description && (
        <p className="text-sm text-neutral-400 mt-2">{j.description}</p>
      )}
    </div>
  );
}

export default function JobsPage() {
  const { q, land, ort } = useQueryParams();

  const filtered = useMemo(() => {
    const qLower = q.toLowerCase();
    const ortLower = ort.toLowerCase();

    return JOBS.filter(j => {
      const matchesText =
        !qLower ||
        j.title.toLowerCase().includes(qLower) ||
        j.company.toLowerCase().includes(qLower);

      const matchesLand = land === "Alle" || j.bundesland === land;
      const matchesOrt  = !ortLower || j.place.toLowerCase().includes(ortLower);

      return matchesText && matchesLand && matchesOrt;
    });
  }, [q, land, ort]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-extrabold">Jobs finden</h1>

      <form action="/jobs" method="GET" className="grid md:grid-cols-4 gap-3 items-end">
        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm">Suche (Titel oder Unternehmen)</span>
          <input name="q" defaultValue={q} placeholder="z. B. Lokführer, DB, Mechatroniker" className={inputCls()} />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Bundesland</span>
          <select name="land" defaultValue={land} className={inputCls()}>
            {BUNDESLAENDER.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Ort (optional)</span>
          <input name="ort" defaultValue={ort} placeholder="z. B. Bremen, München" className={inputCls()} />
        </label>

        <div className="md:col-span-4">
          <button className="px-4 py-2 rounded-md bg-emerald-500 text-neutral-900 font-semibold">
            Filtern
          </button>
        </div>
      </form>

      <p className="text-sm text-neutral-400">Ergebnisse: {filtered.length}</p>

      <section className="grid gap-4">
        {filtered.map(j => <JobCard key={j.id} j={j} />)}
        {filtered.length === 0 && (
          <div className="text-neutral-400">Keine Treffer. Bitte Filter anpassen.</div>
        )}
      </section>
    </main>
  );
}
