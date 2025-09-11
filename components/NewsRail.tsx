"use client";
import React from "react";

type Item = { source: string; title: string; link: string; date?: string };

export default function NewsRailClient() {
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

  if (err) return <div className="muted">{err}</div>;
  if (!items) return <div className="muted">Lade News </div>;
  if (items.length === 0) return <div className="muted">Aktuell keine Meldungen.</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
      {items.slice(0, 6).map((n, i) => (
        <a key={i} href={n.link} target="_blank" rel="noopener noreferrer"
           className="card-link">
          <div className="muted" style={{ fontSize: 12 }}>{n.source}{n.date ? "  " + new Date(n.date).toLocaleDateString("de-DE") : ""}</div>
          <div style={{ marginTop: 4, fontWeight: 700, lineHeight: 1.25 }}>{n.title}</div>
        </a>
      ))}
    </div>
  );
}