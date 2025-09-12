import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900;

function build(items: any[]) {
  return {
    status: "ok",
    items,
    news: items,
    data: items,
    entries: items,
    articles: items,
    generatedAt: new Date().toISOString(),
  };
}

export async function GET(_req: Request, { params }: { params: { slug?: string[] } }) {
  const slug = (params?.slug ?? []);
  const key = (slug[0] || "").toLowerCase();

  // Alle gängigen Pfadnamen, die eine Startseite typischerweise nutzt
  const aliases = new Set([
    "news", "railnews", "latest", "home", "updates", "headlines", "articles", "posts", "blog"
  ]);

  if (aliases.has(key)) {
    const items = [
      { id: "n1", title: "Neue RE-Linie testet modernisierte Dosto-Garnituren", date: "2025-09-10", link: "/news" },
      { id: "n2", title: "SWEG startet weitere TfZ-Ausbildungsklassen",        date: "2025-09-08", link: "/news" },
      { id: "n3", title: "metronom erweitert Quereinstieg",                     date: "2025-09-05", link: "/news" },
    ];
    return NextResponse.json(build(items));
  }

  // Für alles andere 404, damit echte APIs (z.B. /api/checkout) nicht gestört werden.
  return NextResponse.json({ ok: false, reason: "no handler for slug", slug }, { status: 404 });
}