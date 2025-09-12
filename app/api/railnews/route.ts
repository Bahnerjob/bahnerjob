import { NextResponse } from "next/server";

export const revalidate = 900; // 15 Min

type Item = { id: string; title: string; url: string; source?: string; published?: string };

const SOURCES = [
  { url: "https://www.bahnblogstelle.net/feed/", source: "Bahnblogstelle" },
  { url: "https://www.eurailpress.de/rss.xml", source: "Eurailpress" },
  { url: "https://www.tagesschau.de/index~rss2.xml", source: "tagesschau (Bahn-Suche)", query: "bahn" }
];

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, ms = 6000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(input, { ...init, signal: ctrl.signal, next: { revalidate: 900 } });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// simpler RSS/Atom-Parser (Titel/Link/Datum)
function parseRSS(xml: string, fallbackSource?: string): Item[] {
  const items: Item[] = [];
  const rItem = /<item\b[\s\S]*?<\/item>/gi;
  const rTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
  const rLink  = /<link\b[^>]*>([\s\S]*?)<\/link>/i;
  const rDate  = /<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i;

  const rEntry = /<entry\b[\s\S]*?<\/entry>/gi;
  const rATitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
  const rALink  = /<link\b[^>]*href="([^"]+)"/i;
  const rADate  = /<updated\b[^>]*>([\s\S]*?)<\/updated>/i;

  let m: RegExpExecArray | null;
  while ((m = rItem.exec(xml))) {
    const block = m[0];
    const t = rTitle.exec(block)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const u = rLink.exec(block)?.[1]?.trim();
    const d = rDate.exec(block)?.[1]?.trim();
    if (t && u) items.push({ id: u, title: t, url: u, source: fallbackSource, published: d });
  }
  if (items.length === 0) {
    while ((m = rEntry.exec(xml))) {
      const block = m[0];
      const t = rATitle.exec(block)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const u = rALink.exec(block)?.[1]?.trim();
      const d = rADate.exec(block)?.[1]?.trim();
      if (t && u) items.push({ id: u, title: t, url: u, source: fallbackSource, published: d });
    }
  }
  return items;
}

async function tryFetchAll(): Promise<Item[]> {
  const results: Item[] = [];
  for (const src of SOURCES) {
    try {
      const res = await fetchWithTimeout(src.url, { headers: { accept: "application/rss+xml, application/xml, text/xml, */*;q=0.1" } }, 6000);
      if (!res.ok) continue;
      const text = await res.text();
      let items = parseRSS(text, src.source);
      if (src.query) {
        const q = src.query.toLowerCase();
        items = items.filter(i => i.title?.toLowerCase().includes(q));
      }
      results.push(...items);
    } catch {}
  }
  const seen = new Set<string>();
  const dedup = results.filter(i => {
    const key = (i.title || "") + "|" + (i.url || "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  dedup.sort((a,b) => (Date.parse(b.published ?? "") || 0) - (Date.parse(a.published ?? "") || 0));
  return dedup.slice(0, 20);
}

const STATIC_FALLBACK: Item[] = [
  { id: "f1", title: "Fahrgast-Info: Bahn-News kompakt", url: "https://www.bahnblogstelle.net/", source: "Fallback" },
  { id: "f2", title: "Branche: Projekte & Infrastruktur", url: "https://www.eurailpress.de/", source: "Fallback" },
  { id: "f3", title: "Politik & Bahn  aktuelle Meldungen", url: "https://www.tagesschau.de/", source: "Fallback" }
];

export async function GET() {
  try {
    const items = await tryFetchAll();
    if (items.length > 0) return NextResponse.json(items);
    return NextResponse.json(STATIC_FALLBACK);
  } catch {
    return NextResponse.json(STATIC_FALLBACK);
  }
}