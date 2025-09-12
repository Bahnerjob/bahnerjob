# restyle-home-news-list.ps1
param(
  [ValidateSet("git","cli","none")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root    = Get-Location
$enc     = New-Object System.Text.UTF8Encoding($false)
$stamp   = Get-Date -Format 'yyyyMMdd-HHmmss'
$app     = Join-Path $root 'app'
$cmp     = Join-Path $root 'components'
$globals = Join-Path $app  'globals.css'
$homeNs  = Join-Path $cmp  'HomeNews.client.tsx'

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

if (!(Test-Path $cmp))     { New-Item -ItemType Directory -Force -Path $cmp | Out-Null }
if (!(Test-Path $globals)) { throw "CSS fehlt: app/globals.css" }

# 1) HomeNews in Listenansicht (keine Kartenboxen)
Backup $homeNs
$tsx = @'
"use client";

import React, { useEffect, useState } from "react";

type Item = { id: string; title: string; url: string; source?: string; published?: string };

export default function HomeNews({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/railnews", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Item[]) => { if (alive) setItems((data || []).slice(0, limit)); })
      .catch(() => {});
    return () => { alive = false; };
  }, [limit]);

  if (items.length === 0) return null;

  return (
    <section className="section" aria-labelledby="home-news-h">
      <div className="section-head">
        <h3 id="home-news-h">News</h3>
        <a href="/news" className="btn btn-ghost" aria-label="Alle News">Alle News →</a>
      </div>

      <ul className="news-list">
        {items.map((it) => (
          <li key={it.id} className="news-item">
            <a className="news-link" href={it.url} target="_blank" rel="noopener noreferrer">
              <span className="news-title">{it.title}</span>
              {it.source ? <span className="news-meta">{it.source}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
'@
[IO.File]::WriteAllText($homeNs, $tsx, $enc)

# 2) Ruhiges CSS für Listenoptik ergänzen (nur einmal)
Backup $globals
$css = [IO.File]::ReadAllText($globals, $enc)
if ($css -notmatch 'NEWS LIST \(home\)') {
  $css += @'

/* === NEWS LIST (home) ===================================================== */
.section { padding: 16px; }
.section-head {
  display:flex; align-items:center; justify-content:space-between;
  gap:10px; margin-bottom: 8px;
}
.section-head h3 { font-weight:700; letter-spacing:-0.01em; }

.news-list {
  list-style: none; margin: 0; padding: 0;
  border-top: 1px solid var(--border);
}
.news-item { border-bottom: 1px solid var(--border); }

.news-link {
  display:flex; align-items:baseline; gap: 10px;
  padding: 10px 2px; text-decoration: none; color: var(--fg);
}
.news-title {
  flex: 1 1 auto;
  line-height: 1.35;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-meta {
  flex: 0 0 auto;
  font-size: 12px; color: var(--fg-muted); white-space: nowrap;
}
.news-link:hover .news-title { text-decoration: underline; }

/* Mobile: Quelle ausblenden, damit nix kollidiert */
@media (max-width: 420px){
  .news-meta { display:none; }
}
/* ========================================================================= */
'
  [IO.File]::WriteAllText($globals, $css, $enc)
}

Write-Host "HomeNews auf Listenansicht gestellt und CSS ergänzt." -ForegroundColor Green

# 3) Build
if (Test-Path (Join-Path $root "package-lock.json")) { npm ci | Out-Null } else { npm install | Out-Null }
cmd /c "npm run build"

# 4) Deploy
switch ($Deploy) {
  "git" {
    if (Test-Path ".git") {
      git add -- components/HomeNews.client.tsx app/globals.css
      git commit -m "style(home news): switch to simple list view (clean rows, separators, no cards)"
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
