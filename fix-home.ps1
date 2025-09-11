# fix-home.ps1
param(
  [ValidateSet("none","git","cli")]
  [string]$Deploy = "none",
  [string]$Branch = "main"
)

if (!(Test-Path "app" -PathType Container)) { throw "Folder 'app' not found. Run in repo root." }

# Backup
if (Test-Path "app\page.tsx") {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Copy-Item "app\page.tsx" "app\page.backup.$stamp.tsx"
  Write-Host "Backup: app/page.backup.$stamp.tsx"
}

# ASCII-only TSX (no umlauts), Server component, no extra logo, keep NewsRail
$content = @'
import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component
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

# Schreibe UTF-8 ohne BOM, damit Next/TSX happy ist
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("app\page.tsx", $content, $utf8NoBom)
Write-Host "Written: app/page.tsx" -ForegroundColor Green

# Optional deploy
switch ($Deploy) {
  "git" {
    if (!(Test-Path ".git" -PathType Container)) { Write-Warning "No .git found, skipping git deploy."; break }
    git add app/page.tsx 2>$null
    git commit -m "feat(home): server component revalidate=0, no duplicate logo, keep NewsRail"
    git push origin $Branch
    Write-Host "Git push done. Vercel should deploy via Git integration." -ForegroundColor Cyan
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
