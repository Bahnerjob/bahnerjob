import Parser from "rss-parser";

export type RailItem = {
  id: string;
  title: string;
  link: string;
  isoDate?: string;
  source: string;
};

const FEEDS: string[] = [
  // Du kannst diese Liste jederzeit anpassen/erweitern:
  "https://bahnblogstelle.net/feed/",
  "https://www.lok-report.de/?format=feed&type=rss",         // Lok-Report RSS
  "https://www.probahn.de/aktuelles/rss.xml"                 // PRO BAHN (allg. Nahverkehr)
];

const parser = new Parser();

export async function fetchRailNews(limit = 24): Promise<RailItem[]> {
  const out: RailItem[] = [];
  await Promise.all(FEEDS.map(async (url) => {
    try {
      const feed = await parser.parseURL(url);
      const source = (feed?.title || new URL(url).hostname).toString();
      for (const item of feed.items ?? []) {
        const id = (item.guid as string) || (item.link as string) || (item.title as string) || Math.random().toString(36).slice(2);
        out.push({
          id,
          title: (item.title as string) ?? "Ohne Titel",
          link: (item.link as string) ?? "#",
          isoDate: item.isoDate as string | undefined,
          source,
        });
      }
    } catch {}
  }));
  out.sort((a,b) => new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime());
  return out.slice(0, limit);
}