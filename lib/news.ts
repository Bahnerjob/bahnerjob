export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

/** D-A-CH Eisenbahn-Feeds (bahn-spezifisch). Quellen, die nicht antworten, werden still ignoriert. */
const FEEDS = [
  "https://www.deutschebahn.com/de/presse/rss",         // DB Presse
  "https://www.bahnblogstelle.net/feed/",               // Bahnblogstelle (DE)
  "https://www.zughalt.de/feed/",                       // Zughalt (DE)
  "https://company.sbb.ch/de/medien/rss.xml",           // SBB Medien (CH)
  "https://www.oebb.at/de/rss",                         // ÖBB (AT)  falls verfügbar
  // Bei Bedarf hier weitere bahn-spezifische D-A-CH Feeds ergänzen
];

/** Bahn-Keywords (de)  harte Filterung nur auf Eisenbahn */
const KEYWORDS = [
  "bahn","eisenbahn","zug","züge","schiene","schienenverkehr",
  "deutsche bahn","db","s-bahn","u-bahn","regionalbahn","ice","bahnstrecke","bahnhof","fahrplan"
];

/** Nur D-A-CH Domains zulassen */
const ALLOWED_TLDS = [".de",".at",".ch"];

function timeout<T>(p: Promise<T>, ms=8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    p.then(v => { clearTimeout(t); resolve(v); })
     .catch(e => { clearTimeout(t); reject(e); });
  });
}

async function fetchFeed(url: string): Promise<string | null> {
  try {
    const res = await timeout(fetch(url, { next: { revalidate: 1800 } }), 9000);
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}

/** Minimaler RSS-Parser: <item><title/><link/><pubDate/></item> */
function parseRss(xml: string, sourceHost: string): NewsItem[] {
  const out: NewsItem[] = [];
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const block of items) {
    const title = (block.match(/<title>\s*<!\[CDATA\[(.*?)\]\]>\s*<\/title>|<title>(.*?)<\/title>/i)?.[1]
               ??  block.match(/<title>\s*<!\[CDATA\[(.*?)\]\]>\s*<\/title>|<title>(.*?)<\/title>/i)?.[2]
               ?? "").trim();
    const url = (block.match(/<link>(.*?)<\/link>/i)?.[1] ?? "").trim();
    const pub = block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1];
    if (!title || !url) continue;
    out.push({
      id: url,
      title,
      url,
      source: sourceHost,
      date: pub ? new Date(pub).toISOString() : undefined,
    });
  }
  return out;
}

function isDACH(url: string): boolean {
  try { const h = new URL(url).host.toLowerCase(); return ALLOWED_TLDS.some(tld => h.endsWith(tld)); }
  catch { return false; }
}
function isRail(title: string): boolean {
  const low = title.toLowerCase();
  return KEYWORDS.some(k => low.includes(k));
}

export async function getNews(limit = 9): Promise<NewsItem[]> {
  const collected: NewsItem[] = [];
  const lists = await Promise.all(FEEDS.map(async (u) => {
    const xml = await fetchFeed(u);
    if (!xml) return [];
    const host = (() => { try { return new URL(u).host.replace(/^www\./,""); } catch { return u; }})();
    return parseRss(xml, host);
  }));
  for (const arr of lists) collected.push(...arr);

  // Nur Bahn-Themen, nur D-A-CH, deduplizieren
  const seen = new Set<string>();
  const filtered = collected.filter(it => {
    if (!isRail(it.title)) return false;
    if (!isDACH(it.url)) return false;
    if (seen.has(it.id)) return false;
    seen.add(it.id);
    return true;
  });

  // Neueste zuerst
  filtered.sort((a,b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad;
  });

  return filtered.slice(0, limit);
}
