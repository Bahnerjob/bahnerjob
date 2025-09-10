export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

/** D-A-CH Feeds  erweiterbar */
const FEEDS = [
  // Unternehmensfeeds
  "https://www.deutschebahn.com/de/presse/rss",     // DB Presse (falls nicht verfügbar, wird still ignoriert)
  "https://www.oebb.at/de/rss",                     // ÖBB (falls vorhanden)
  "https://company.sbb.ch/de/medien/rss.xml",       // SBB Medien (falls vorhanden)

  // Bahn-spezifische Portale (DE)
  "https://www.bahnblogstelle.net/feed/",

  // große DE/AT/CH Medien (filtern wir auf Bahn-Themen)
  "https://www.tagesschau.de/xml/rss2",
  "https://www.spiegel.de/schlagzeilen/index.rss",
  "https://www.derstandard.at/rss/inland",
  "https://www.nzz.ch/reisen/rss"
];

/** Bahn-Keywords (deutsch) */
const KEYWORDS = [
  "bahn","eisenbahn","zug","züge","schienen","schienenverkehr",
  "deutsche bahn","db","s-bahn","u-bahn","regionalbahn","ice","bahnstrecke","bahnhof","fahrplan"
];

/** Nur D-A-CH Hosts zulassen (per TLD-Prüfung) */
const ALLOWED_TLDS = [".de",".at",".ch"];

function timeout<T>(p: Promise<T>, ms=7000): Promise<T> {
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

/** sehr einfacher RSS-Parser (title/link/pubDate) */
function parseRss(xml: string, sourceHost: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const titleRx = /<title>\s*<!\[CDATA\[(.*?)\]\]>\s*<\/title>|<title>(.*?)<\/title>/i;
  const linkRx  = /<link>(.*?)<\/link>/i;
  const dateRx  = /<pubDate>(.*?)<\/pubDate>/i;

  for (const block of xml.match(itemRegex) ?? []) {
    const t = block.match(titleRx);
    const l = block.match(linkRx);
    const d = block.match(dateRx);
    const title = (t?.[1] ?? t?.[2] ?? "").trim();
    const url = (l?.[1] ?? "").trim();
    if (!title || !url) continue;
    items.push({
      id: url,
      title,
      url,
      source: sourceHost,
      date: d?.[1] ? new Date(d[1]).toISOString() : undefined,
    });
  }
  return items;
}

function isDACH(url: string): boolean {
  try {
    const host = new URL(url).host.toLowerCase();
    return ALLOWED_TLDS.some(tld => host.endsWith(tld));
  } catch { return false; }
}

function looksRelevant(title: string): boolean {
  const low = title.toLowerCase();
  return KEYWORDS.some(k => low.includes(k));
}

export async function getNews(limit = 9): Promise<NewsItem[]> {
  const all: NewsItem[] = [];

  const perFeed = await Promise.all(FEEDS.map(async (u) => {
    const xml = await fetchFeed(u);
    if (!xml) return [];
    const host = (() => { try { return new URL(u).host.replace(/^www\./,""); } catch { return u; }})();
    return parseRss(xml, host);
  }));

  for (const arr of perFeed) all.push(...arr);

  // Nur D-A-CH Links, nur Bahn-relevante Titel, de-dupe
  const seen = new Set<string>();
  const filtered = all.filter(it => {
    if (!looksRelevant(it.title)) return false;
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
