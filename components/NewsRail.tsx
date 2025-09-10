import { getRailNewsDE } from "@/lib/rail-news";

export default async function NewsRail() {
  const items = await getRailNewsDE(6);
  if (!items || items.length === 0) return null;

  return (
    <section className="section fade-in">
      <div className="container">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Aktuelle Bahn-News (DE)</h2>
          <span className="badge">Auto-Update ~15 Min.</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((n, i) => (
            <a
              key={i}
              href={n.link}
              className="card p-4 block hover:bg-neutral-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-xs text-neutral-400 flex gap-2">
                <span className="badge">{n.source}</span>
                {n.date ? (
                  <time>{new Date(n.date).toLocaleDateString("de-DE")}</time>
                ) : null}
              </div>
              <div className="mt-2 font-medium">{n.title}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
