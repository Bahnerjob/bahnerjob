"use client";
import React from "react";
import Link from "next/link";

type Item = { id:string; title:string; link:string; source:string };

export default function NewsRailClient(){
  const [items, setItems] = React.useState<Item[]>([]);
  React.useEffect(()=>{
    fetch("/api/railnews").then(r=>r.json()).then(d=> setItems(d.items || [])).catch(()=>{});
  },[]);
  if (!items.length) return null;

  return (
    <section className="section p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">News</h3>
        <Link href="/news" className="btn btn-ghost">Alle News </Link>
      </div>
      <div className="mt-3 overflow-x-auto no-scrollbar">
        <div style={{display:"grid", gridAutoFlow:"column", gap:"10px", gridAutoColumns:"minmax(260px, 40%)"}}>
          {items.slice(0,10).map(n => (
            <a key={n.id} href={n.link} target="_blank" rel="noreferrer" className="section p-3 hover:border-neutral-600">
              <div className="text-xs text-neutral-400">{n.source}</div>
              <div className="mt-1 font-medium leading-snug">{n.title}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}