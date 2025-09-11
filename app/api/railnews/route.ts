import type { NextRequest } from "next/server";

/** Sehr einfache RSS-Parser-Funktion (item/title/link/pubDate) */
function parseRss(xml: string) {
  const items: { title: string; link: string; date?: string }[] = [];
  const reItem = /<item[\s\S]*?<\/item>/gi;
  const reTitle = /<title>([\s\S]*?)<\/title>/i;
  const reLink = /<link>([\s\S]*?)<\/link>/i;
  const reDate = /<pubDate>([\s\S]*?)<\/pubDate>/i;

  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = reItem.exec(xml))) {
    const block = m[0];
    const t = reTitle.exec(block)?.[1]?.trim() ?? "";
    const l = reLink.exec(block)?.[1]?.trim() ?? "";
    const d = reDate.exec(block)?.[1]?.trim();
    if (!t || !l) continue;
    const key = t + "|" + l;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ title: t.replace(/<!\[CDATA\[|\]\]>/g, ""), link: l, date: d });
  }
  return items;
}

async function fetchFeed(url: string, timeoutMs = 8000): Promise<string|null> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "bahnerjob-news/1.0" }});
    if (!res.ok) return null;
    const txt = await res.text();
    return txt;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

/** Quellen: deutschsprachige Bahn-News (RSS) */
const SOURCES = [
  { name: "Bahnblogstelle", url: "https://bahnblogstelle.net/feed/" },
  { name: "ÖBB Newsroom",   url: "https://www.oebb.at/de/rss" },               // hat verschiedene Feeds, liefert dennoch RSS
  { name: "SBB Medien",     url: "https://company.sbb.ch/de/medien.html/rss" } // SBB News RSS
];

export const revalidate = 900; // 15 Min

export async function GET(req: NextRequest) {
  const all: { source: string; title: string; link: string; date?: string }[] = [];

  for (const s of SOURCES) {
    const xml = await fetchFeed(s.url);
    if (!xml) continue;
    const items = parseRss(xml).slice(0, 10).map(i => ({ source: s.name, ...i }));
    all.push(...items);
  }

  // leicht sortieren: neuere zuerst (falls Datum vorhanden)
  all.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  return new Response(JSON.stringify({ items: all.slice(0, 18) }), {
    headers: { "content-type": "application/json", "cache-control": "s-maxage=900, stale-while-revalidate=600" }
  });
}