import Link from "next/link";
import { fetchRailNews } from "../../lib/railnews";

export const revalidate = 900;

export const metadata = {
  title: "Eisenbahn-News  Bahnerjob",
  description: "Aktuelle Nachrichten aus dem deutschsprachigen Bahnsektor."
};

export default async function NewsPage(){
  const items = await fetchRailNews(40);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Eisenbahn-News</h1>
        <p className="text-neutral-400 mt-1">Aktuelle Meldungen aus Deutschland, Österreich und der Schweiz.</p>
      </header>

      <section className="grid gap-3">
        {items.map(n => (
          <a key={n.id} href={n.link} target="_blank" rel="noreferrer"
             className="section p-4 hover:border-neutral-600">
            <div className="text-xs text-neutral-400">{n.source}</div>
            <div className="mt-1 font-semibold">{n.title}</div>
          </a>
        ))}
        {!items.length && (
          <div className="section p-6 text-neutral-400">
            Gerade keine News verfügbar. Bitte später erneut versuchen.
          </div>
        )}
      </section>

      <div className="text-sm text-neutral-500">
        Quellen verwaltest du in <code>lib/railnews.ts</code> (Array <code>FEEDS</code>).
      </div>
    </main>
  );
}