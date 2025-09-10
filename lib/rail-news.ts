import { XMLParser } from "fast-xml-parser";

type NewsItem = {
  title: string;
  link: string;
  date?: string;
  source: string;
};

const FEEDS: string[] = [
  "https://www.zughalt.de/feed/",
  "https://bahnblogstelle.com/feed/",
  "https://www.lok-report.de/news/deutschland.html?format=feed&type=rss",
];

export async function getRailNewsDE(limitPerFeed = 6): Promise<NewsItem[]> {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const all: NewsItem[] = [];

  await Promise.all(
    FEEDS.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "bahnerjob-newsbot/1.0 (+https://bahnerjob.de)" },
          next: { revalidate: 600 }, // 10 Minuten Cache
        });
        if (!res.ok) return;

        const xml = await res.text();
        const j = parser.parse(xml);

        const ch = j.rss?.channel ?? j.feed;
        const items: any[] = ch?.item ?? ch?.entry ?? [];
        const sourceName = ch?.title?.toString?.() ?? new URL(url).hostname.replace(/^www\./, "");

        for (const it of items.slice(0, limitPerFeed)) {
          const title = it.title?._cdata || it.title || it["title#text"] || "";
          const rawLink = it.link?.href || it.link?._text || it.link || it.guid || "";
          const date = it.pubDate || it.published || it.updated || undefined;

          const safeLink =
            typeof rawLink === "string"
              ? rawLink
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

  return all.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });
}
