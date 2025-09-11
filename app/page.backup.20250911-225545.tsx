import Image from "next/image";
import Link from "next/link";

// Server-Komponente, kein "use client"
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Eisenbahner-Jobs finden & Anzeigen schalten",
  description:
    "Bahnerjob ist das Jobboard für Eisenbahner:innen. Finde passende Stellen oder schalte deine Anzeige in Minuten.",
  icons: { icon: "/icon.svg" },
};

type NewsItem = {
  id: string;
  title: string;
  date: string;
  href: string;
};

function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {items.map((n) => (
        <Link
          key={n.id}
          href={n.href}
          className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 hover:bg-neutral-900 transition-colors"
        >
          <div className="text-xs text-neutral-400">{n.date}</div>
          <div className="mt-1 text-base font-semibold leading-snug group-hover:underline">
            {n.title}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function Page() {
  const news: NewsItem[] = [
    { id: "1", title: "Neue Features: Schnellere Anzeigenerstellung & bessere Vorschau", date: "11.09.2025", href: "/news/neue-features" },
    { id: "2", title: "Tipps für Arbeitgeber: So wird eure Anzeige zum Bewerbermagnet", date: "09.09.2025", href: "/news/anzeige-optimieren" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12">
        <div className="flex items-center gap-4">
          <Image src="/icon.svg" alt="Bahnerjob Logo" width={56} height={56} priority />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Bahnerjob</h1>
            <p className="text-neutral-400 text-sm sm:text-base">
              Das Jobboard für Eisenbahner:innen  vom Stellwerk bis zum Triebfahrzeug.
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Finde deinen nächsten Halt  oder erreiche die passenden Talente.
          </h2>
          <p className="mt-3 text-neutral-300">
            Durchsuche aktuelle Stellenangebote oder schalte in wenigen Minuten eine professionelle Anzeige mit hoher Sichtbarkeit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/jobs" className="rounded-xl px-5 py-3 bg-white text-black font-medium hover:opacity-90 transition">
              Jobs durchsuchen
            </Link>
            <Link href="/jobs/new?pkg=basic" className="rounded-xl px-5 py-3 border border-neutral-700 hover:border-neutral-500 text-white transition">
              Anzeige schalten
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Branchenspezifisch</div>
          <div className="mt-1 text-neutral-400 text-sm">Zielgruppe Bahn: Reichweite ohne Streuverlust.</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Schnell & modern</div>
          <div className="mt-1 text-neutral-400 text-sm">Anzeige erstellen, live Vorschau sehen, Stripe Checkout.</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Faire Pakete</div>
          <div className="mt-1 text-neutral-400 text-sm">Basic, Featured oder Boost  transparent & effektiv.</div>
        </div>
      </section>

      {/* News */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <Link href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">Alle News </Link>
        </div>
        <NewsList items={news} />
      </section>
    </main>
  );
}
