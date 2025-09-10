type NewsItem = {
  id: string;
  title: string;
  url: string;
  source?: string;
  date?: string; // ISO
};

export default function NewsRail({ items = [] as NewsItem[] }) {
  if (!items?.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-xl font-semibold">Branchen-News</h2>
        <div className="text-xs text-neutral-500">automatisch aktualisiert</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((n) => (
          <a
            key={n.id}
            href={n.url}
            className="card elevate block p-3 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-700 rounded-lg"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-xs text-neutral-400 mb-1 line-clamp-1">{n.source}</div>
            <div className="text-sm font-medium line-clamp-3 leading-5">{n.title}</div>
            {n.date && (
              <div className="text-xs text-neutral-500 mt-2">
                {new Date(n.date).toLocaleDateString("de-DE")}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
