# enable-home-news.ps1
param(
  [ValidateSet("git","cli","none")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

# Pfade / Setup
$root      = Get-Location
$enc       = New-Object System.Text.UTF8Encoding($false)
$stamp     = Get-Date -Format 'yyyyMMdd-HHmmss'

$appDir    = Join-Path $root 'app'
$cmpDir    = Join-Path $root 'components'
$pageFile  = Join-Path $appDir 'page.tsx'
$globals   = Join-Path $appDir 'globals.css'
$apiDir    = Join-Path $appDir 'api\railnews'
$apiFile   = Join-Path $apiDir 'route.ts'
$homeNews  = Join-Path $cmpDir 'HomeNews.client.tsx'

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

if (!(Test-Path $cmpDir)) { New-Item -ItemType Directory -Force -Path $cmpDir | Out-Null }
if (!(Test-Path $apiDir)) { New-Item -ItemType Directory -Force -Path $apiDir | Out-Null }
if (!(Test-Path $globals)) { throw "globals.css nicht gefunden: app/globals.css" }
if (!(Test-Path $pageFile)) { throw "Startseite nicht gefunden: app/page.tsx" }

# --- 1) /api/railnews: robuste Aggregation + Fallback ---
$apiTs = @"
import { NextResponse } from "next/server";

export const revalidate = 900; // 15 Min

type Item = { id: string; title: string; url: string; source?: string; published?: string };

const SOURCES = [
  { url: "https://www.bahnblogstelle.net/feed/", source: "Bahnblogstelle" },
  { url: "https://www.eurailpress.de/rss.xml", source: "Eurailpress" },
  { url: "https://www.tagesschau.de/index~rss2.xml", source: "tagesschau (Bahn-Suche)", query: "bahn" }
];

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, ms = 6000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(input, { ...init, signal: ctrl.signal, next: { revalidate: 900 } });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// simpler RSS/Atom-Parser (Titel/Link/Datum)
function parseRSS(xml: string, fallbackSource?: string): Item[] {
  const items: Item[] = [];
  const rItem = /<item\b[\s\S]*?<\/item>/gi;
  const rTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
  const rLink  = /<link\b[^>]*>([\s\S]*?)<\/link>/i;
  const rDate  = /<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i;

  const rEntry = /<entry\b[\s\S]*?<\/entry>/gi;
  const rATitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
  const rALink  = /<link\b[^>]*href="([^"]+)"/i;
  const rADate  = /<updated\b[^>]*>([\s\S]*?)<\/updated>/i;

  let m: RegExpExecArray | null;
  while ((m = rItem.exec(xml))) {
    const block = m[0];
    const t = rTitle.exec(block)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const u = rLink.exec(block)?.[1]?.trim();
    const d = rDate.exec(block)?.[1]?.trim();
    if (t && u) items.push({ id: u, title: t, url: u, source: fallbackSource, published: d });
  }
  if (items.length === 0) {
    while ((m = rEntry.exec(xml))) {
      const block = m[0];
      const t = rATitle.exec(block)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const u = rALink.exec(block)?.[1]?.trim();
      const d = rADate.exec(block)?.[1]?.trim();
      if (t && u) items.push({ id: u, title: t, url: u, source: fallbackSource, published: d });
    }
  }
  return items;
}

async function tryFetchAll(): Promise<Item[]> {
  const results: Item[] = [];
  for (const src of SOURCES) {
    try {
      const res = await fetchWithTimeout(src.url, { headers: { accept: "application/rss+xml, application/xml, text/xml, */*;q=0.1" } }, 6000);
      if (!res.ok) continue;
      const text = await res.text();
      let items = parseRSS(text, src.source);
      if (src.query) {
        const q = src.query.toLowerCase();
        items = items.filter(i => i.title?.toLowerCase().includes(q));
      }
      results.push(...items);
    } catch {}
  }
  const seen = new Set<string>();
  const dedup = results.filter(i => {
    const key = (i.title || "") + "|" + (i.url || "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  dedup.sort((a,b) => (Date.parse(b.published ?? "") || 0) - (Date.parse(a.published ?? "") || 0));
  return dedup.slice(0, 20);
}

const STATIC_FALLBACK: Item[] = [
  { id: "f1", title: "Fahrgast-Info: Bahn-News kompakt", url: "https://www.bahnblogstelle.net/", source: "Fallback" },
  { id: "f2", title: "Branche: Projekte & Infrastruktur", url: "https://www.eurailpress.de/", source: "Fallback" },
  { id: "f3", title: "Politik & Bahn – aktuelle Meldungen", url: "https://www.tagesschau.de/", source: "Fallback" }
];

export async function GET() {
  try {
    const items = await tryFetchAll();
    if (items.length > 0) return NextResponse.json(items);
    return NextResponse.json(STATIC_FALLBACK);
  } catch {
    return NextResponse.json(STATIC_FALLBACK);
  }
}
"@
Backup $apiFile
[IO.File]::WriteAllText($apiFile, $apiTs, $enc)

# --- 2) Komponenten: HomeNews.client.tsx ---
$homeTsx = @"
""use client"";

import React, { useEffect, useState } from "react";

type Item = { id: string; title: string; url: string; source?: string; published?: string };

export default function HomeNews({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<Item[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/railnews", { cache: "no-store" })
      .then(r => r.json())
      .then((data: Item[]) => { if (alive) setItems(Array.isArray(data) ? data.slice(0, limit) : []); })
      .catch(() => { if (alive) setItems([]); });
    return () => { alive = false; };
  }, [limit]);

  return (
    <section className="section p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Aktuelle Bahn-News</h3>
        <a href="/news" className="btn btn-ghost">Alle News</a>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
        {(items ?? Array.from({ length: limit })).map((it, i) => (
          <a
            key={it ? it.id : "s"+i}
            href={it ? it.url : "#"}
            target={it ? "_blank" : undefined}
            rel={it ? "noopener noreferrer" : undefined}
            className="block rounded-xl border border-[var(--border)] bg-[var(--panel-2)] p-4 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 leading-snug overflow-hidden"
          >
            <div className="text-sm text-[var(--fg-muted)]">{it?.source ?? "Lädt..."}</div>
            <div className="mt-1 font-medium">{it?.title ?? "…"}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
"@
Backup $homeNews
[IO.File]::WriteAllText($homeNews, $homeTsx, $enc)

# --- 3) globals.css: kleine Fixes gegen Scroll-Leisten ---
$g = [IO.File]::ReadAllText($globals, $enc)
if ($g -notmatch '\/\* NEWS CARD FIX \*\/') {
  $g += @"
/* NEWS CARD FIX */
.news-rail { overflow: hidden; }
.news-rail .card { overflow: hidden; text-overflow: ellipsis; }
.news-rail a { text-decoration: none; }
.news-rail a:hover { border-color: rgb(82,82,88); }
"
  Backup $globals
  [IO.File]::WriteAllText($globals, $g, $enc)
}

# --- 4) Startseite: HomeNews importieren + rendern ---
$homeTxt = [IO.File]::ReadAllText($pageFile, $enc)
$origHome = $homeTxt

# Import einfügen, falls fehlt
if ($homeTxt -notmatch 'components\/HomeNews\.client') {
  $homeTxt = [regex]::Replace(
    $homeTxt,
    'import\s+Link\s+from\s+"next\/link";\s*',
    'import Link from "next/link";' + "`r`n" + 'import HomeNews from "../components/HomeNews.client";' + "`r`n",
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
}

# Komponente vor </main> einfügen, falls noch nicht vorhanden
if ($homeTxt -notmatch '<HomeNews\b') {
  $homeTxt = [regex]::Replace(
    $homeTxt,
    '\s*</main>\s*$',
    "`r`n      <HomeNews limit={8} />`r`n    </main>",
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
}

if ($homeTxt -ne $origHome) {
  Backup $pageFile
  [IO.File]::WriteAllText($pageFile, $homeTxt, $enc)
}

Write-Host "News-API, Komponente und Startseite aktualisiert." -ForegroundColor Green

# --- 5) Build ---
if (Test-Path (Join-Path $root "package-lock.json")) { npm ci | Out-Null } else { npm install | Out-Null }
cmd /c "npm run build"

# --- 6) Deploy ---
switch ($Deploy) {
  "git" {
    if (Test-Path ".git") {
      git add -- app/api/railnews/route.ts components/HomeNews.client.tsx app/page.tsx app/globals.css
      git commit -m "feat(home news): RSS aggregation + polished HomeNews grid (no horizontal scroll)"
      git push origin $Branch
      Write-Host "Git push done ($Branch). Vercel baut automatisch." -ForegroundColor Cyan
    } else {
      Write-Host "Kein Git-Repo – Git Deploy übersprungen." -ForegroundColor Yellow
    }
  }
  "cli" {
    if (Get-Command vercel -ErrorAction SilentlyContinue) {
      vercel pull --yes --environment=production | Out-Null
      $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
      vercel --prod --force | Out-Host
      Write-Host "Vercel CLI Deploy (forced) ausgelöst." -ForegroundColor Cyan
    } else {
      Write-Host "Vercel CLI fehlt (npm i -g vercel && vercel login)." -ForegroundColor Yellow
    }
  }
  default { }
}
