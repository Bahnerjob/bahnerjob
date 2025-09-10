import { getRailNewsDE } from "@/lib/rail-news";

/**
 * Magazin-Widget: Deutsche Bahn-News (RSS)
 * - größere Titel
 * - schlanke Meta-Zeile mit Quelle & Datum
 * - kleines Icon
 */
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

        <div className="news-grid">
          {items.map((n, i) => (
            <a
              key={i}
              href={n.link}
              className="card news-item p-4 block news-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${n.title} — ${n.source}`}
            >
              <div className="news-meta">
                <NewsIcon />
                <span className="badge">{n.source}</span>
                {n.date ? (
                  <>
                    <span className="news-dot" />
                    <time>{formatDateDE(n.date)}</time>
                  </>
                ) : null}
              </div>

              <div className="news-title clamp-2">{n.title}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDateDE(d: string) {
  const t = Date.parse(d);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
  });
}

function NewsIcon() {
  return (
    <svg
      className="news-icon"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {/* kleine Zeitung */}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="15" x2="13" y2="15" />
    </svg>
  );
}
