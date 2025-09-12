"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  date: string;  // ISO
};

export default function HomeNews({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/railnews", { next: { revalidate: 900 } });
        if (!res.ok) throw new Error("news fetch failed");
        const data = await res.json();
        if (!alive) return;
        const arr: NewsItem[] = (Array.isArray(data?.items) ? data.items : []).slice(0, limit);
        setItems(arr);
      } catch {
        setItems([]);
      }
    })();
    return () => { alive = false; };
  }, [limit]);

  return (
    <section className="section" style={{padding:"18px"}}>
      <div className="flex items-center justify-between" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <h3 className="text-lg font-semibold" style={{margin:0}}>Aktuelle Bahn-News</h3>
        <Link href="/news" className="btn btn-secondary">Alle News</Link>
      </div>

      <div className="news-grid" style={{marginTop:"12px"}}>
        {items === null ? (
          Array.from({length: limit}).map((_,i)=>(
            <article key={i} className="news-card skeleton" />
          ))
        ) : items.length === 0 ? (
          <div className="muted">Zur Zeit sind keine Meldungen verfügbar.</div>
        ) : (
          items.map(n => (
            <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" className="news-card">
              <div className="news-meta">
                <span className="news-source">{n.source}</span>
                <span className="news-dot"></span>
                <time dateTime={n.date}>{new Date(n.date).toLocaleDateString("de-DE", { day:"2-digit", month:"short"})}</time>
              </div>
              <h4 className="news-title">{n.title}</h4>
            </a>
          ))
        )}
      </div>
    </section>
  );
}