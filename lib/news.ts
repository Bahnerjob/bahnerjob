export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

/** Bahn/Eisenbahn bezogene Feeds (anpassbar) */
const FEEDS = [
  "https://www.railjournal.com/feed/",          // International Railway Journal
  "https://www.railwaygazette.com/rss",         // Railway Gazette
  "https://bahnblogstelle.net/feed/",           // Bahnblogstelle (DE)
  "https://www.tagesschau.de/xml/rss2",         // Tagesschau gesamt (wir filtern auf Bahn/Zug)
];

/** Keywords zum Filtern */
const KEYWORDS = [
  "bahn","eisenbahn","zug","züge","deutsche bahn","db",
  "rail","railway","train","ICE","S-Bahn","Regionalbahn"
];

function timeout<T>(p: Promise<T>, ms=6000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    p.then(v => { clearTimeout(t); resolve(v); })
     .catch(e => { clearTimeout(t); reject(e); });
  });
}

async function fetchFeed(url: string): Promise<string | null> {
  try {
    const res = await timeout(fetch(url, { next: { revalidate: 1800 } }), 8000);
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}

/** super-simple XML-Parsing ohne Lib  holt <item> title/link/pubDate */
function parseRss(xml: string, source?: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const titleRx = /<title>\s*<!\[CDATA\[(.*?)\]\]>\s*<\/title>|<title>(.*?)<\/title>/i;
  const linkRx  = /<link>(.*?)<\/link>/i;
  const dateRx  = /<pubDate>(.*?)<\/pubDate>/i;

  const blocks = xml.match(itemRegex) ?? [];
  for (const b of blocks) {
    const t = b.match(titleRx);
    const l = b.match(linkRx);
    const d = b.match(dateRx);
    const title = (t?.[1] ?? t?.[2] ?? "").trim();
    const url = (l?.[1] ?? "").trim();
    if (!title || !url) continue;
    items.push({
      id: url,
      title,
      url,
      source,
      date: d?.[1] ? new Date(d[1]).toISOString() : undefined,
    });
  }
  return items;
}

function looksRelevant(title: string): boolean {
  const low = title.toLowerCase();
  return KEYWORDS.some(k => low.includes(k.toLowerCase()));
}

export async function getNews(limit = 9): Promise<NewsItem[]> {
  const results: NewsItem[] = [];
  const feeds = await Promise.all(FEEDS.map(async (u) => {
    const xml = await fetchFeed(u);
    if (!xml) return [];
    const host = (() => { try { return new URL(u).host.replace("www.",""); } catch { return u; }})();
    return parseRss(xml, host);
  }));

  for (const arr of feeds) results.push(...arr);

  // filtern auf Bahn-Themen + de-dupe per URL
  const dedup = new Map<string,NewsItem>();
  for (const it of results) {
    if (!looksRelevant(it.title)) continue;
    if (!dedup.has(it.id)) dedup.set(it.id, it);
  }

  // nach Datum absteigend, wenn vorhanden
  const sorted = Array.from(dedup.values()).sort((a,b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad;
  });

  return sorted.slice(0, limit);
}
