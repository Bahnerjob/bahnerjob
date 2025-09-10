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
    <div className="news-grid grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((n) => (
        <a
          key={n.id}
          href={n.url}
          className="news-card block rounded-xl bg-neutral-900/60 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:translate-y-[-1px] transition"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="news-source text-xs text-neutral-400 truncate">{n.source}</div>
            {n.date && (
              <div className="news-date text-xs text-neutral-500 shrink-0">
                {new Date(n.date).toLocaleDateString("de-DE")}
              </div>
            )}
          </div>
          <div className="news-title text-sm font-medium leading-5 line-clamp-3">{n.title}</div>
        </a>
      ))}
    </div>
  );
}
