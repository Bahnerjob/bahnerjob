import { XMLParser } from "fast-xml-parser";

export type NewsItem = {
  title: string;
  link: string;
  date?: string;
  source: string;
};

const FEEDS = [
  { url: "https://www.zughalt.de/feed/", source: "Zughalt.de" },
  { url: "https://www.lok-report.de/news.rss", source: "LOK-Report" },
  { url: "https://bahnblogstelle.net/feed/", source: "Bahnblogstelle" },
];

// Hilfsfunktionen
async function safeFetch(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      // Build soll nicht hängen – bei Fehler später einfach leer rendern
      next: { revalidate: 1800 },
      headers: { "user-agent": "bahnerjob-news-fetcher" },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseXmlToItems(xml: string | null, source: string): NewsItem[] {
  if (!xml) return [];
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseTagValue: true,
      trimValues: true,
    });
    const data = parser.parse(xml);

    // RSS 2.0: rss.channel.item[]
    if (data?.rss?.channel?.item) {
      const items = Array.isArray(data.rss.channel.item)
        ? data.rss.channel.item
        : [data.rss.channel.item];
      return items.slice(0, 8).map((it: any) => ({
        title: it.title ?? "(ohne Titel)",
        link: it.link ?? "#",
        date: it.pubDate ?? it.date ?? undefined,
        source,
      }));
    }

    // Atom: feed.entry[]
    if (data?.feed?.entry) {
      const entries = Array.isArray(data.feed.entry)
        ? data.feed.entry
        : [data.feed.entry];
      return entries.slice(0, 8).map((e: any) => ({
        title: e.title ?? "(ohne Titel)",
        link:
          (Array.isArray(e.link) ? e.link.find((l: any) => l.rel !== "self")?.href : e.link?.href) ??
          e.id ??
          "#",
        date: e.updated ?? e.published ?? undefined,
        source,
      }));
    }

    return [];
  } catch {
    return [];
  }
}

export async function getRailNewsDE(): Promise<NewsItem[]> {
  try {
    const pages = await Promise.all(
      FEEDS.map(async (f) => parseXmlToItems(await safeFetch(f.url), f.source))
    );
    // flatten + sort (neuste oben)
    const all = pages.flat();
    all.sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0;
      const db = b.date ? Date.parse(b.date) : 0;
      return db - da;
    });
    // maximal 12 anzeigen
    return all.slice(0, 12);
  } catch {
    // niemals throwen -> Build/Runtime darf nicht scheitern
    return [];
  }
}
