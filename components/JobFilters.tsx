"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [country, setCountry] = useState(sp.get("country") ?? "");
  const [pkg, setPkg] = useState(sp.get("pkg") ?? "");

  useEffect(() => {
    setQ(sp.get("q") ?? "");
    setCountry(sp.get("country") ?? "");
    setPkg(sp.get("pkg") ?? "");
  }, [sp]);

  function apply() {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (country) p.set("country", country);
    if (pkg) p.set("pkg", pkg);
    router.push(`/jobs?${p.toString()}`);
  }

  function reset() {
    setQ(""); setCountry(""); setPkg("");
    router.push("/jobs");
  }

  return (
    <div className="job-filters grid gap-3 md:grid-cols-[1fr_auto_auto_auto] items-center">
      <input
        className="input"
        placeholder="Suche: Titel, Unternehmen, Ort "
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=>{ if(e.key==="Enter") apply(); }}
        aria-label="Job-Suche"
      />
      <select className="select select-dark" value={country} onChange={(e)=>setCountry(e.target.value)} aria-label="Land">
        <option value="">Alle Länder</option>
        <option value="DE">Deutschland</option>
        <option value="AT">Österreich</option>
        <option value="CH">Schweiz</option>
        <option value="INTL">Ausland</option>
      </select>
      <select className="select select-dark" value={pkg} onChange={(e)=>setPkg(e.target.value)} aria-label="Paket">
        <option value="">Alle Pakete</option>
        <option value="boost">Boost</option>
        <option value="featured">Featured</option>
        <option value="basic">Basic</option>
      </select>
      <div className="flex gap-2">
        <button onClick={apply} className="btn btn-accent rounded-lg px-3 py-2 font-semibold">Filtern</button>
        <button onClick={reset} className="btn rounded-lg px-3 py-2 border border-neutral-800">Zurücksetzen</button>
      </div>
    </div>
  );
}
