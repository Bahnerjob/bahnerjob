param(
  [ValidateSet("none","git","cli")]
  [string]$Deploy = "none",
  [string]$Branch = "main"
)

$root   = Get-Location
$appDir = Join-Path $root "app"
$pageTsx = Join-Path $appDir "page.tsx"
if (!(Test-Path $appDir)) { New-Item -ItemType Directory -Force -Path $appDir | Out-Null }

if (Test-Path $pageTsx) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Copy-Item $pageTsx (Join-Path $appDir "page.backup.$stamp.tsx")
  Write-Host "Backup: app/page.backup.$stamp.tsx"
}

$content = @"
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
    <div className="space-y-12 mx-auto max-w-5xl px-4 py-12">
      {/* HERO (ohne zusätzliches Logo; Header-Logo kommt aus layout.tsx) */}
      <header className="text-center">
        <div className="badge mb-3">Bahnerjob</div>
        <h1 className="text-3xl font-bold tracking-tight">Stellen finden. Anzeigen schalten.</h1>
        <p className="section-desc text-neutral-300 mt-2">Die Jobboerse fuer den Bahnsektor - modern, schnell, fokussiert.</p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </header>

      {/* Vorteile */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="card p-5">
          <div className="badge">Branchenspezifisch</div>
          <h2 className="mt-2 font-semibold">Reichweite ohne Streuverlust</h2>
          <p className="section-desc text-neutral-400">Zielgruppe Bahn - vom Stellwerk bis zum Triebfahrzeug.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Schnell & modern</div>
          <h2 className="mt-2 font-semibold">Live-Vorschau & Stripe</h2>
          <p className="section-desc text-neutral-400">Anzeige erstellen, pruefen, bezahlen - in Minuten live.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Faire Pakete</div>
          <h2 className="mt-2 font-semibold">Basic, Featured, Boost</h2>
          <p className="section-desc text-neutral-400">Transparent und effektiv fuer jedes Budget.</p>
        </article>
      </section>

      {/* Einstieg Jobs */}
      <section className="card p-6">
        <div className="badge">Fuer Bewerber:innen</div>
        <h2 className="mt-2 font-semibold">Finde deinen naechsten Halt</h2>
        <p className="section-desc text-neutral-400">Filter nach Ort & Bundesland. Bewirb dich direkt beim Arbeitgeber.</p>
        <div className="mt-4">
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
        </div>
      </section>

      {/* News (bestehende Komponente) */}
      <NewsRail />
    </div>
  );
}
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $script, $utf8NoBom)
Write-Host "Saved: $path" -ForegroundColor Green

# === 2) Jetzt ausführen (eine der folgenden Varianten) ===
# Nur Datei schreiben:
& $path

# Oder direkt committen & pushen (wenn Repo mit Vercel verknüpft ist):
# & $path -Deploy git

# Oder direkt mit Vercel-CLI deployen (Cache-Bypass):
# & $path -Deploy cli
.\apply-home.ps1 -Deploy git   # commit + push
# oder
.\apply-home.ps1 -Deploy cli   # Vercel-CLI Deploy (Cache-Bypass)
# apply-home.ps1 erzeugen
$script = @'
param(
  [ValidateSet("none","git","cli")]
  [string]$Deploy = "none",
  [string]$Branch = "main"
)

$root   = Get-Location
$appDir = Join-Path $root "app"
$pageTsx = Join-Path $appDir "page.tsx"
if (!(Test-Path $appDir)) { New-Item -ItemType Directory -Force -Path $appDir | Out-Null }

# Backup
if (Test-Path $pageTsx) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Copy-Item $pageTsx (Join-Path $appDir "page.backup.$stamp.tsx")
  Write-Host "Backup: app/page.backup.$stamp.tsx"
}

# Inhalt schreiben (UTF-8 ohne BOM)
$tsx = @"
import Link from "next/link";
import NewsRail from "@/components/NewsRail";

// Server component (no client hooks)
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Bahnerjob: Die spezialisierte Jobbörse für den Bahnsektor. Unternehmen schalten moderne Anzeigen mit hoher Sichtbarkeit. Bewerber:innen finden schnell passende Stellen."
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-14">
      <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-300">Die Jobbörse für den Bahnsektor</div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Stellen finden. <span className="text-neutral-200">Talente erreichen.</span></h1>
          <p className="mt-4 text-neutral-300">Bahnerjob verbindet Eisenbahner:innen mit den passenden Arbeitgebern  vom Stellwerk bis zum Triebfahrzeug. Schlanke Prozesse, klare Pakete, moderne Darstellung.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card p-6 border border-neutral-800 bg-neutral-900/40 rounded-2xl">
          <div className="badge">Für Unternehmen</div>
          <h2 className="mt-2 text-xl font-semibold">Sichtbar in der Bahn-Community</h2>
          <p className="mt-2 text-neutral-300">Erreiche gezielt Fachkräfte ohne Streuverlust. Mit wenigen Klicks eine professionelle Anzeige erstellen, Vorschau prüfen und per Stripe sicher veröffentlichen. Optional: <em>Featured</em> und <em>Boost</em> für maximale Reichweite.</p>
          <ul className="mt-4 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Branchenspezifische Reichweite &amp; relevante Bewerbungen</li>
            <li>Klare Pakete &amp; transparente Laufzeiten</li>
            <li>Aktualisierbare Inhalte &amp; saubere Formatierung</li>
          </ul>
          <div className="mt-5"><Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link></div>
          <p className="mt-3 text-sm text-neutral-400">Tipp: Mit <strong>Featured</strong> hebt sich eure Anzeige im Listing visuell ab. <a href="/pricing" className="underline">Zu den Paketen</a></p>
        </article>

        <article className="card p-6 border border-neutral-800 bg-neutral-900/40 rounded-2xl">
          <div className="badge">Für Bewerber:innen</div>
          <h2 className="mt-2 text-xl font-semibold">Finde deinen nächsten Halt</h2>
          <p className="mt-2 text-neutral-300">Durchsuche aktuelle Stellen im Bahnsektor. Filtere nach Ort, Bundesland oder Arbeitgeber und bewirb dich direkt beim Unternehmen  ohne Umwege.</p>
          <ul className="mt-4 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Klar strukturierte Anzeigen mit relevanten Details</li>
            <li>Filter für Ort, Bundesland &amp; Vertragsart (sofern angegeben)</li>
            <li>Direktbewerbung beim jeweiligen Arbeitgeber</li>
          </ul>
          <div className="mt-5"><Link href="/jobs" className="btn">Jobs durchsuchen</Link></div>
          <p className="mt-3 text-sm text-neutral-400">Hinweis: Neue Jobs kommen regelmäßig rein  schau öfter vorbei.</p>
        </article>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Warum Bahnerjob?</h3>
          <a href="/pricing" className="text-sm text-neutral-400 hover:text-neutral-200">Pakete ansehen </a>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Branchenspezifisch</div>
            <div className="mt-2 font-semibold">Reichweite ohne Streuverlust</div>
            <p className="mt-1 text-neutral-400 text-sm">Gezielt Bahn-Profile erreichen  vom Stellwerk bis Tfz.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Schnell & modern</div>
            <div className="mt-2 font-semibold">Live-Vorschau & Stripe</div>
            <p className="mt-1 text-neutral-400 text-sm">Anzeige erstellen, prüfen, bezahlen  in Minuten live.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Faire Pakete</div>
            <div className="mt-2 font-semibold">Basic, Featured, Boost</div>
            <p className="mt-1 text-neutral-400 text-sm">Transparente Laufzeiten &amp; klare Vorteile.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="badge">Qualität</div>
            <div className="mt-2 font-semibold">Saubere Darstellung</div>
            <p className="mt-1 text-neutral-400 text-sm">Strukturiertes Layout, gute Lesbarkeit, mobile-ready.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
        <h3 className="text-lg font-semibold">Moderation & Inhalt</h3>
        <p className="mt-2 text-neutral-300">Bahnerjob achtet auf fachlich passende Inhalte, klare Angaben und einheitliche Formate  so finden Kandidat:innen schnell, was wirklich zählt, und Unternehmen sparen Zeit bei der Vorauswahl.</p>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-center">
        <h3 className="text-xl font-semibold">Bereit für den nächsten Schritt?</h3>
        <p className="mt-2 text-neutral-300">Finde jetzt passende Stellen oder bring deine Stellenanzeige live.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">News</h3>
          <a href="/news" className="text-sm text-neutral-400 hover:text-neutral-200">Alle News </a>
        </div>
        <NewsRail />
      </section>
    </main>
}
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($pageTsx, $tsx, $utf8NoBom)
Write-Host "Written: app/page.tsx" -ForegroundColor Green

switch ($Deploy) {
  "git" {
    if (!(Test-Path ".git" -PathType Container)) { Write-Warning "No .git found, skipping git deploy."; break }
    git add -- "app/page.tsx"
    git commit -m "feat(home): komplette Startseite neu (Zielgruppen, Features, CTA, News; server; revalidate=0)" 2>$null
    git push origin $Branch
    Write-Host "Git push (only app/page.tsx) done (branch: $Branch)." -ForegroundColor Cyan
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
