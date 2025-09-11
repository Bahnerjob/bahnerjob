"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  bundesland?: string;
  type?: string;
  applyUrl: string;
  logoUrl?: string;
  featured?: boolean;
};

function normalize(s: string) { return (s || "").toLowerCase().normalize("NFKD"); }

export default function JobsListClient({ initial }: { initial: Job[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  const data = useMemo(() => {
    let list = Array.isArray(initial) ? initial : [];
    if (q.trim()) {
      const n = normalize(q);
      list = list.filter(j =>
        normalize(j.title).includes(n) ||
        normalize(j.company).includes(n) ||
        normalize(j.location).includes(n) ||
        normalize(j.bundesland || "").includes(n)
      );
    }
    if (region) list = list.filter(j => (j.bundesland || "").toLowerCase() === region.toLowerCase());
    if (type)   list = list.filter(j => (j.type || "").toLowerCase() === type.toLowerCase());
    return list;
  }, [initial, q, region, type]);

  return (
    <section>
      {/* Filter */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr",
          gap:"10px",
          margin:"18px 0 14px"
        }}
      >
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Suche nach Titel, Unternehmen, Ort "
          style={{
            backgroundColor:"rgb(23,23,24)",
            border:"1px solid rgb(48,48,52)",
            color:"rgba(235,235,240,.95)",
            borderRadius:"10px",
            padding:"10px 12px",
            fontSize:"14px"
          }}
        />
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
          <select
            className="select-dark"
            value={region}
            onChange={e => setRegion(e.target.value)}
            aria-label="Bundesland"
          >
            <option value="">Alle Bundesländer</option>
            <option>Baden-Württemberg</option>
            <option>Bayern</option>
            <option>Berlin</option>
            <option>Brandenburg</option>
            <option>Bremen</option>
            <option>Hamburg</option>
            <option>Hessen</option>
            <option>Mecklenburg-Vorpommern</option>
            <option>Niedersachsen</option>
            <option>Nordrhein-Westfalen</option>
            <option>Rheinland-Pfalz</option>
            <option>Saarland</option>
            <option>Sachsen</option>
            <option>Sachsen-Anhalt</option>
            <option>Schleswig-Holstein</option>
            <option>Thüringen</option>
          </select>

          <select
            className="select-dark"
            value={type}
            onChange={e => setType(e.target.value)}
            aria-label="Beschäftigungsart"
          >
            <option value="">Alle Arten</option>
            <option value="vollzeit">Vollzeit</option>
            <option value="teilzeit">Teilzeit</option>
            <option value="ausbildung">Ausbildung</option>
            <option value="werkstudent">Werkstudent</option>
            <option value="befristet">Befristet</option>
          </select>
        </div>
      </div>

      {/* Ergebnisinfo */}
      <div className="muted" style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"8px 0 16px"}}>
        <span>{data.length} Stelle{data.length===1?"":"n"} gefunden</span>
        <Link href="/jobs/new?pkg=basic" className="btn btn-secondary">Anzeige schalten</Link>
      </div>

      {/* Liste */}
      <div style={{display:"grid", gap:"10px"}}>
        {data.map(job => (
          <article key={job.id}
            style={{
              border:"1px solid rgb(42,42,46)",
              background:"rgb(18,18,20)",
              borderRadius:"16px",
              padding:"14px"
            }}
          >
            <div style={{display:"flex", justifyContent:"space-between", gap:"12px", flexWrap:"wrap"}}>
              <div>
                <div style={{display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap"}}>
                  {job.featured && <span className="chip">Featured</span>}
                  <h3 style={{margin:0, fontWeight:800, letterSpacing:"-0.01em"}}>{job.title}</h3>
                </div>
                <div className="muted" style={{marginTop:"4px"}}>
                  {job.company}  {job.location}{job.bundesland ? `, ${job.bundesland}` : ""}
                  {job.type ? `  ${job.type}` : ""}
                </div>
              </div>
              <div style={{display:"flex", gap:"8px"}}>
                <Link href={job.applyUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Jetzt bewerben
                </Link>
              </div>
            </div>
          </article>
        ))}
        {data.length === 0 && (
          <div className="muted" style={{textAlign:"center", padding:"20px 0"}}>Keine Treffer  Filter anpassen.</div>
        )}
      </div>
    </section>
  );
}