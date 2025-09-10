// lib/rail-news.ts
import { XMLParser } from "fast-xml-parser";

type NewsItem = {
  title: string;
  link: string;
  date?: string;
  source: string;
};

const FEEDS: string[] = [
  // Zughalt.de (DE)
  "https://www.zughalt.de/feed/",
  // Bahnblogstelle (DE) – Standard-WordPress-Feed
  "https://bahnblogstelle.com/feed/",
  // LOK-Report (DE) – Deutschland-Ressort, Joomla-Feed
  "https://www.lok-report.de/news/deutschland.html?format=feed&type=rss",
];

/**
 * Holt die Bahn-News (de) aus den obigen RSS-Feeds.
 * Fehlerhafte/unerreichbare Feeds werden einfach übersprungen.
 */
export async function getRailNewsDE(limitPerFeed = 6): Promise<NewsItem[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  const all: NewsItem[] = [];

  await Promise.all(
    FEEDS.map(async (url) => {
      try {
        const res = await fetch(url, { // SSR-Server-Fetch (Next.js)
          headers: { "User-Agent": "bahnerjob-newsbot/1.0 (+https://bahnerjob.de)" },
          // Lasse Next das Ergebnis kurz cachen, damit Vercel nicht dauernd neu zieht
          next: { revalidate: 60 * 10 }, // 10 Minuten
        });
        if (!res.ok) return;

        const xml = await res.text();
        const j = parser.parse(xml);

        // RSS 2.0 oder Atom abdecken
        const ch = j.rss?.channel ?? j.feed;
        const items: any[] = ch?.item ?? ch?.entry ?? [];

        const sourceName =
          ch?.title?.toString?.() ??
          new URL(url).hostname.replace(/^www\./, "");

        for (const it of items.slice(0, limitPerFeed)) {
          const title = it.title?._cdata || it.title || it["title#text"] || "";
          const link =
            it.link?.href || it.link?._text || it.link || it.guid || "";
          const date = it.pubDate || it.published || it.updated || undefined;

          // Manche Joomla/WordPress-Feeds liefern Link-Objekte – absichern
          const safeLink =
            typeof link === "string"
              ? link
              : (Array.isArray(it.link)
                  ? it.link.find((l: any) => l?.["@_rel"] !== "self")?.["@_href"]
                  : it.link?.["@_href"]) || "";

          if (title && safeLink) {
            all.push({
              title: String(title).trim(),
              link: String(safeLink).trim(),
              date: date ? String(date) : undefined,
              source: sourceName,
            });
          }
        }
      } catch {
        // Feed überspringen
      }
    })
  );

  // Neueste nach oben: auf Datum sortieren, unbekannte ans Ende
  return all.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });
}
