"use client";

import React from "react";

type Item = {
  id: string;
  title: string;
  link: string;
  source?: string;
  isoDate?: string;
};

function fmt(d?: string) {
  try {
    if (!d) return "";
    const dd = new Date(d);
    if (isNaN(dd.getTime())) return "";
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(dd);
  } catch { return ""; }
}

export default function NewsRail() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    fetch("/api/railnews?limit=14", { cache: "no-store" })
      .then(r => r.json())
      .then((data: Item[]) => { if (alive) setItems(data || []); })
      .catch(() => { if (alive) setItems([]); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <section aria-labelledby="home-news-head">
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", flexWrap:"wrap"}}>
        <h3 id="home-news-head" className="text-lg font-semibold">Eisenbahn-News</h3>
        <a href="/news" className="btn btn-ghost" aria-label="Alle News ansehen">Alle News</a>
      </div>

      <div className="rail" style={{marginTop:"10px"}}>
        <div className="rail-track">
          {(loading ? Array.from({length:6}).map((_,i)=>({id:"sk"+i, title:"", link:"#"})) : items).map((n, idx) => (
            <a
              key={n.id || String(idx)}
              href={n.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="news-card"
            >
              {n.source || n.isoDate ? (
                <div className="text-xs text-neutral-400" style={{display:"flex", gap:"8px", alignItems:"center"}}>
                  {n.source && <span>{n.source}</span>}
                  {n.isoDate && <span style={{opacity:.85}}> {fmt(n.isoDate)}</span>}
                </div>
              ) : <div className="text-xs text-neutral-500" style={{height:"16px"}} />}

              <div className="news-title">{n.title || " "}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}