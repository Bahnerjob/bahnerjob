"use client";

import React, { useEffect, useState } from "react";

type Item = { id: string; title: string; url: string; source?: string; published?: string };

export default function HomeNews({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<Item[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/railnews", { cache: "no-store" })
      .then(r => r.json())
      .then((data: Item[]) => { if (alive) setItems(Array.isArray(data) ? data.slice(0, limit) : []); })
      .catch(() => { if (alive) setItems([]); });
    return () => { alive = false; };
  }, [limit]);

  return (
    <section className="section p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Aktuelle Bahn-News</h3>
        <a href="/news" className="btn btn-ghost">Alle News</a>
      </div>

      <div className="news-grid">
        {(items ?? Array.from({ length: limit })).map((it, i) => (
          <a
            key={it ? it.id : "s"+i}
            href={it ? it.url : "#"}
            target={it ? "_blank" : undefined}
            rel={it ? "noopener noreferrer" : undefined}
            className="news-card"
          >
            <div className="text-sm text-[var(--fg-muted)]">{it?.source ?? "Lädt..."}</div>
            <div className="mt-1 font-medium">{it?.title ?? ""}</div>
          </a>
        ))}
      </div>
    </section>
  );
}