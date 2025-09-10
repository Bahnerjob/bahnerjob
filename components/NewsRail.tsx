type NewsItem = { id: string; title: string; url: string; source?: string; date?: string };

export default function NewsRail({ items = [] as NewsItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="news-rail mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Branchen-News</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((n) => (
          <a
            key={n.id}
            href={n.url}
            className="block rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 hover:bg-neutral-900"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-xs text-neutral-400 mb-1">{n.source}</div>
            <div className="text-sm font-medium line-clamp-2">{n.title}</div>
            {n.date && (
              <div className="text-xs text-neutral-500 mt-2">
                {new Date(n.date).toLocaleDateString("de-DE")}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
