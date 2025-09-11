"use client";
import React from "react";
import Link from "next/link";

export type Job = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  region?: string;
  type?: string;
  featured?: boolean;
};

function norm(s: string) { return (s || "").toLowerCase().trim(); }

export default function JobsListClient({ initial }: { initial: Job[] }) {
  const [q, setQ] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [type, setType] = React.useState("");
  const [onlyFeatured, setOnlyFeatured] = React.useState(false);

  const jobs = React.useMemo(() => {
    const nq = norm(q);
    return (initial || []).filter(j => {
      if (onlyFeatured && !j.featured) return false;
      if (nq && !(
        norm(j.title).includes(nq) ||
        norm(j.company || "").includes(nq) ||
        norm(j.location || "").includes(nq) ||
        norm(j.region || "").includes(nq)
      )) return false;
      if (location && norm(j.location || "") !== norm(location)) return false;
      if (region && norm(j.region || "") !== norm(region)) return false;
      if (type && norm(j.type || "") !== norm(type)) return false;
      return true;
    });
  }, [q, location, region, type, onlyFeatured, initial]);

  // Optionen aus Daten ableiten
  const locations = Array.from(new Set((initial || []).map(j => j.location).filter(Boolean))).sort();
  const regions   = Array.from(new Set((initial || []).map(j => j.region).filter(Boolean))).sort();
  const types     = Array.from(new Set((initial || []).map(j => j.type).filter(Boolean))).sort();

  return (
    <section className="container" style={{display:"grid", gap:"14px"}}>
      {/* Filter */}
      <div className="panel" style={{display:"grid", gap:"10px"}}>
        <div className="field-grid two">
          <div>
            <label className="muted" htmlFor="q">Suche</label>
            <input id="q" className="input" placeholder="Titel, Unternehmen, Ort" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div>
            <label className="muted" htmlFor="type">Art</label>
            <select id="type" className="select select-dark" value={type} onChange={e => setType(e.target.value)}>
              <option value="">Alle</option>
              {types.map(t => <option key={t} value={t as string}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="field-grid two">
          <div>
            <label className="muted" htmlFor="location">Ort</label>
            <select id="location" className="select select-dark" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">Alle</option>
              {locations.map(l => <option key={l as string} value={l as string}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="muted" htmlFor="region">Bundesland / Region</label>
            <select id="region" className="select select-dark" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Alle</option>
              {regions.map(r => <option key={r as string} value={r as string}>{r}</option>)}
            </select>
          </div>
        </div>

        <div style={{display:"flex", gap:"12px", alignItems:"center", flexWrap:"wrap"}}>
          <label className="muted" style={{display:"inline-flex", gap:"8px", alignItems:"center"}}>
            <input type="checkbox" checked={onlyFeatured} onChange={e => setOnlyFeatured(e.target.checked)} />
            Nur Featured
          </label>
          <button type="button" className="btn btn-secondary" onClick={() => { setQ(""); setLocation(""); setRegion(""); setType(""); setOnlyFeatured(false); }}>
            Zurücksetzen
          </button>
        </div>
      </div>

      {/* Ergebnisinfo */}
      <div className="muted">{jobs.length} {jobs.length === 1 ? "Treffer" : "Treffer"}</div>

      {/* Liste */}
      <div style={{display:"grid", gap:"12px"}}>
        {jobs.map(j => (
          <article key={j.id} className="panel" style={{display:"grid", gap:"6px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", gap:"12px", flexWrap:"wrap"}}>
              <h2 style={{fontWeight:800, letterSpacing:"-0.01em", fontSize:"18px", margin:0, lineHeight:1.2}}>
                <Link href={`/jobs/${encodeURIComponent(j.id)}`} className="card-link">{j.title}</Link>
              </h2>
              {j.featured && <span className="chip">Featured</span>}
            </div>
            <div className="muted">
              {j.company || "Unternehmen"}  {j.location || "Ort"}{j.region ? ` (${j.region})` : ""}{j.type ? `  ${j.type}` : ""}
            </div>
            <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"4px"}}>
              <Link href={`/jobs/${encodeURIComponent(j.id)}`} className="btn">Details</Link>
              <Link href="/jobs/new?pkg=basic" className="btn btn-secondary">Anzeige schalten</Link>
            </div>
          </article>
        ))}
        {jobs.length === 0 && (
          <div className="panel" style={{textAlign:"center", padding:"24px"}}>
            <div className="muted">Keine Treffer mit den aktuellen Filtern.</div>
          </div>
        )}
      </div>
    </section>
  );
}