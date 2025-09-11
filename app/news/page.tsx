"use client";
import React from "react";
import Link from "next/link";

type Item = { source: string; title: string; link: string; date?: string };

export default function NewsPage() {
  const [items, setItems] = React.useState<Item[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    fetch("/api/railnews", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(j => { if (alive) setItems(j.items as Item[]); })
      .catch(e => { if (alive) setErr("News konnten nicht geladen werden."); });
    return () => { alive = false; };
  }, []);

  return (
    <main className="page-wrap">
      <header style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <h1 className="h1">Eisenbahn-News</h1>
        <Link className="btn" href="/">Zur Startseite</Link>
      </header>

      {err && <div className="muted" style={{marginTop:12}}>{err}</div>}
      {!items && !err && <div className="muted" style={{marginTop:12}}>Lade News </div>}

      {items && (
        <div style={{display:"grid", gap:"12px", marginTop:"16px"}}>
          {items.map((n, i) => (
            <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="card-link">
              <div className="muted" style={{ fontSize: 12 }}>{n.source}{n.date ? "  " + new Date(n.date).toLocaleDateString("de-DE") : ""}</div>
              <div style={{ marginTop: 4, fontWeight: 700, lineHeight: 1.25 }}>{n.title}</div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}