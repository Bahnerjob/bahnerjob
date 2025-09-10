import Link from "next/link";
import { getRailNewsDE } from "@/lib/rail-news";

export default async function NewsRail() {
  const items = await getRailNewsDE(); // wirft nie
  if (!items || items.length === 0) {
    // Keine News? Seite bleibt sauber – kein Fehler, kein Throw.
    return null;
  }

  return (
    <section className="space-y-4">
      <header className="section-head">
        <div className="badge">Branchen-News</div>
        <h2>Aktuelles aus der Bahnwelt</h2>
        <p className="section-desc">Ausgewählte Quellen: Zughalt, LOK-Report, Bahnblogstelle.</p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((n, i) => (
          <article key={i} className="card p-4 hover:translate-y-[-2px] transition-transform">
            <div className="text-xs text-neutral-400 mb-1">{n.source}</div>
            <Link
              href={n.link || "#"}
              target="_blank"
              className="block font-medium leading-snug hover:underline"
            >
              {n.title}
            </Link>
            {n.date && (
              <div className="mt-2 text-xs text-neutral-500">
                {new Date(n.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

