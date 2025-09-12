"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Item = { id: string; title: string; url: string; source?: string; published?: string };

export default function HomeNews({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/railnews", { next: { revalidate: 900 } });
        if (!res.ok) throw new Error(String(res.status));
        const data: Item[] = await res.json();
        if (alive) setItems(data.slice(0, limit));
      } catch (e) {
        if (alive) setError("no-news");
      }
    })();
    return () => { alive = false; };
  }, [limit]);

  return (
    <section className="section" aria-labelledby="home-news-title">
      <div className="section-head">
        <h3 id="home-news-title">News</h3>
        <Link href="/news" className="btn btn-ghost" aria-label="Alle News ansehen">Alle News</Link>
      </div>

      {!items && !error && (
        <ul className="news-list" aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }).map((_, i) => (
            <li className="news-item" key={i}>
              <div className="news-link" style={{opacity:.5}}>
                <span className="news-title">Lade News </span>
                <span className="news-meta"> </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-neutral-400">Aktuell keine Meldungen verfügbar.</p>
      )}

      {items && (
        <ul className="news-list">
          {items.map((n) => (
            <li className="news-item" key={n.id}>
              <a className="news-link" href={n.url} target="_blank" rel="noopener noreferrer">
                <span className="news-title">{n.title}</span>
                <span className="news-meta">
                  {n.source ?? "Quelle"}{n.published ? "  " + new Date(n.published).toLocaleDateString("de-DE") : ""}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}