// lib/rail-news.ts
import { XMLParser } from "fast-xml-parser";

export type RailNewsItem = {
  title: string;
  url: string;
  date?: string;
  source: string;
};

const DEFAULT_FEEDS: { url: string; source: string }[] = [
  { url: "https://www.railwaygazette.com/23672.rss", source: "Railway Gazette" },
  { url: "https://www.railwaygazette.com/metro-report/489.rss", source: "Metro Report" },
  { url: "https://www.rhb.ch/de/medien/medienmitteilungen/rss.xml", source: "Rhätische Bahn" },
];

// Optional: per ENV überschreiben (Komma getrennt, "Name|URL")
function getFeeds() {
  const raw = process.env.RAIL_NEWS_FEEDS;
  if (!raw) return DEFAULT_FEEDS;
  return raw.split(",").map((part) => {
    const [name, url] = part.split("|");
    return { source: name?.trim() || "News", url: url?.trim() || "" };
  }).filter(f => f.url);
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => name === "item",
});

async function fetchOne(feedUrl: string) {
  const res = await fetch(feedUrl, { next: { revalidate: 900 } }); // 15 Min Cache
  if (!res.ok) throw new Error(`Feed fetch failed: ${feedUrl}`);
  const xml = await res.text();
  return parser.parse(xml);
}

export async function getRailNews(limit = 8): Promise<RailNewsItem[]> {
  const feeds = getFeeds();
  const results: RailNewsItem[] = [];

  const settled = await Promise.allSettled(
    feeds.map(async (f) => {
      const data = await fetchOne(f.url);
      const items = data?.rss?.channel?.item ?? [];
      for (const it of items) {
        results.push({
          title: (it.title ?? "").toString().trim(),
          url: (it.link ?? "").toString().trim(),
          date: (it.pubDate ?? it.date ?? "").toString().trim(),
          source: f.source,
        });
      }
    })
  );

  // Falls alles schiefging, leise fallback (keine Crashs im Build)
  if (results.length === 0) {
    console.warn("No rail news fetched", settled);
    return [];
  }

  // Sortieren nach Datum (falls vorhanden), sonst so lassen
  results.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  // Doppelte Links raus
  const seen = new Set<string>();
  const unique = results.filter((r) => {
    if (!r.url || seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  return unique.slice(0, limit);
}
