import Link from "next/link";
import { fetchRailNews } from "../../lib/railnews";

export const revalidate = 900;

export const metadata = {
  title: "Eisenbahn-News  Bahnerjob",
  description: "Aktuelle Meldungen aus dem deutschsprachigen Bahnsektor."
};

function fmt(d?: string) {
  try {
    if (!d) return "";
    const dd = new Date(d);
    if (isNaN(dd.getTime())) return "";
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(dd);
  } catch { return ""; }
}

export default async function NewsPage() {
  const items = await fetchRailNews(40);

  return (
    <main className="container" style={{paddingTop:"2.5rem", paddingBottom:"2rem"}}>
      {/* Header */}
      <header className="section" style={{padding:"18px 16px"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px", flexWrap:"wrap"}}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Eisenbahn-News</h1>
            <p className="text-neutral-400" style={{marginTop:"6px"}}>
              Aktuelle Meldungen aus Deutschland, Österreich und der Schweiz.
            </p>
          </div>
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
            <Link href="/" className="btn btn-secondary">Zur Startseite</Link>
          </div>
        </div>
      </header>

      {/* Liste */}
      <section style={{marginTop:"12px"}} className="grid gap-3">
        {items.length > 0 ? (
          items.map(item => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="section"
              style={{padding:"14px 14px"}}
            >
              <div className="text-xs text-neutral-400" style={{display:"flex", gap:"8px", alignItems:"center"}}>
                <span>{item.source}</span>
                {item.isoDate && <span style={{opacity:.85}}> {fmt(item.isoDate)}</span>}
              </div>
              <div className="font-semibold" style={{marginTop:"6px", lineHeight:1.35}}>
                {item.title}
              </div>
            </a>
          ))
        ) : (
          <div className="section" style={{padding:"20px"}}>
            <div className="text-neutral-400">Gerade keine News verfügbar. Bitte später erneut versuchen.</div>
          </div>
        )}
      </section>

      {/* Fußnote */}
      <div className="text-sm text-neutral-500" style={{marginTop:"10px"}}>
        Quellen verwaltest du in <code>lib/railnews.ts</code> (Array <code>FEEDS</code>).
      </div>
    </main>
  );
}