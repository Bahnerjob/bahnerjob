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
    <div className="news-grid grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map((n) => (
        <a
          key={n.id}
          href={n.url}
          className="news-card block rounded-2xl border border-neutral-700 bg-neutral-900/60 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-neutral-700"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="news-source text-xs text-neutral-400 truncate">{n.source}</div>
            {n.date && (
              <div className="news-date text-xs text-neutral-500 shrink-0">
                {new Date(n.date).toLocaleDateString("de-DE")}
              </div>
            )}
          </div>
          <div className="news-sep" aria-hidden="true"></div>
          <div className="news-title text-sm font-medium leading-5 line-clamp-3">{n.title}</div>
        </a>
      ))}
    </div>
  );
}
