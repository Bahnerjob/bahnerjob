"use client";
import { useEffect, useState } from "react";
type Item = { id: string; title: string; date?: string; link?: string };
export default function NewsClient() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/railnews", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d.items) ? d.items : []))
      .catch(e => setErr(String(e)));
  }, []);
  if (err) return <div className="text-red-400">News-Fehler: {err}</div>;
  if (items === null) return <div className="text-neutral-400">Lade News</div>;
  if (items.length === 0) return <div className="text-neutral-400">Aktuell keine News.</div>;
  return (
    <div className="grid gap-3">
      {items.map(n => (
        <a key={n.id} href={n.link || "#"} className="block rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 hover:bg-neutral-900 transition">
          <div className="text-sm text-neutral-500">{n.date || ""}</div>
          <div className="font-medium">{n.title}</div>
        </a>
      ))}
    </div>
  );
}