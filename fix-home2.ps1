# fix-home2.ps1
param(
  [ValidateSet("none","git-all","git-page","cli")]
  [string]$Deploy = "none",
  [string]$Branch = "main"
)

# 0) Immer vom Skript-Ordner aus arbeiten
if (-not $PSScriptRoot) { $PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location -Path $PSScriptRoot

# 1) Pfade
$AppDir   = Join-Path $PSScriptRoot "app"
$PageFile = Join-Path $AppDir "page.tsx"

# 2) Ordner sicherstellen
if (!(Test-Path $AppDir -PathType Container)) {
  New-Item -ItemType Directory -Path $AppDir | Out-Null
}

# 3) Backup
if (Test-Path $PageFile) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Copy-Item $PageFile (Join-Path $AppDir "page.backup.$stamp.tsx")
  Write-Host "Backup: app/page.backup.$stamp.tsx"
}

# 4) Inhalt (ASCII only, Server-Komponente, kein zusätzliches Logo; NewsRail direkt importiert)
$content = @'
import Link from "next/link";
import NewsRail from "@/components/NewsRail";

export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob - Jobs & Stellenanzeigen im Bahnsektor",
  description: "Bahnerjob: Stellen finden oder Anzeigen schalten. Klare Pakete, schnelle Veroeffentlichung, faire Reichweite."
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <div className="badge mb-3">Bahnerjob</div>
        <h1 className="font-bold tracking-tight">Stellen finden. Anzeigen schalten.</h1>
        <p className="section-desc">Die Jobboerse fuer den Bahnsektor - modern, schnell, fokussiert.</p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="card p-5">
          <div className="badge">Branchenspezifisch</div>
          <h2 className="mt-2">Reichweite ohne Streuverlust</h2>
          <p className="section-desc">Zielgruppe Bahn - vom Stellwerk bis zum Triebfahrzeug.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Schnell & modern</div>
          <h2 className="mt-2">Live-Vorschau & Stripe</h2>
          <p className="section-desc">Anzeige erstellen, pruefen, bezahlen - in Minuten live.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Faire Pakete</div>
          <h2 className="mt-2">Basic, Featured, Boost</h2>
          <p className="section-desc">Transparent und effektiv fuer jedes Budget.</p>
        </article>
      </section>

      <section className="card p-6">
        <div className="badge">Fuer Bewerber:innen</div>
        <h2 className="mt-2">Finde deinen naechsten Halt</h2>
        <p className="section-desc">Filter nach Ort & Bundesland. Bewirb dich direkt beim Arbeitgeber.</p>
        <div className="mt-4">
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
        </div>
      </section>

      <NewsRail />
    </div>
  );
}
'@

# 5) UTF-8 ohne BOM schreiben (stabil fuer TS/Next)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PageFile, $content, $utf8NoBom)
Write-Host "Written: $($PageFile.Replace($PSScriptRoot + '\',''))" -ForegroundColor Green

# 6) Optional: Deploy
switch ($Deploy) {
  "git-all" {
    if (!(Test-Path ".git" -PathType Container)) { Write-Warning "No .git found, skipping."; break }
    git add -A
    git commit -m "feat(home): rewrite page.tsx (server, revalidate=0) and prepare deploy"
    git push origin $Branch
    Write-Host "Git push (all changes) → Vercel deploys via Git integration." -ForegroundColor Cyan
  }
  "git-page" {
    if (!(Test-Path ".git" -PathType Container)) { Write-Warning "No .git found, skipping."; break }
    git add "app/page.tsx"
    git commit -m "feat(home): update page.tsx (server, revalidate=0)"
    git push origin $Branch
    Write-Host "Git push (page only) → Vercel deploys via Git integration." -ForegroundColor Cyan
  }
  "cli" {
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) { Write-Warning "Install CLI: npm i -g vercel && vercel login"; break }
    $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
    vercel --prod --force | Out-Host
    Write-Host "Vercel CLI deploy (forced) triggered." -ForegroundColor Cyan
  }
  default { }
}
Write-Host "Done." -ForegroundColor Green
