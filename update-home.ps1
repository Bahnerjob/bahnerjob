param(
  [ValidateSet("none","git","cli")]
  [string]$Deploy = "none",
  [string]$Branch = "main"
)

# --- 0) Sicherheits-Hinweise / Umfeld ---
Write-Host "== Bahnerjob: Startseite aktualisieren ==" -ForegroundColor Cyan
if (!(Test-Path "app" -PathType Container)) { throw "Ordner 'app' nicht gefunden. Bitte im Repo-Root ausführen." }

# --- 1) Backup der bisherigen Startseite ---
if (Test-Path "app\page.tsx") {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Copy-Item "app\page.tsx" "app\page.backup.$stamp.tsx"
  Write-Host "Backup erstellt: app/page.backup.$stamp.tsx"
}

# --- 2) Prüfen, ob NewsRail existiert (nur Info) ---
$hasNewsRail = Test-Path "components\NewsRail.tsx"
if ($hasNewsRail) { Write-Host "NewsRail gefunden: components/NewsRail.tsx" -ForegroundColor Green }
else { Write-Host "Hinweis: NewsRail nicht gefunden – die Seite rendert dann ohne News." -ForegroundColor Yellow }

# --- 3) Neue app/page.tsx schreiben (kein weiteres Logo, Server-Komponente, revalidate=0) ---
$tsx = @'
import Link from "next/link";
import dynamic from "next/dynamic";

// Server: kein "use client"
export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob – Jobs & Stellenanzeigen im Bahnsektor",
  description: "Bahnerjob: Stellen finden oder Anzeigen schalten. Klare Pakete, schnelle Veröffentlichung, faire Reichweite.",
};

const NewsRail = dynamic(() => import("@/components/NewsRail").then(m => m.default).catch(() => () => null), { ssr: true });

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* HERO (ohne zusätzliches Logo; Header-Logo kommt aus layout.tsx) */}
      <header className="text-center">
        <div className="badge mb-3">Bahnerjob</div>
        <h1 className="font-bold tracking-tight">Stellen finden. Anzeigen schalten.</h1>
        <p className="section-desc">Die Jobbörse für den Bahnsektor – modern, schnell, fokussiert.</p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
        </div>
      </header>

      {/* Vorteile */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="card p-5">
          <div className="badge">Branchenspezifisch</div>
          <h2 className="mt-2">Reichweite ohne Streuverlust</h2>
          <p className="section-desc">Zielgruppe Bahn – vom Stellwerk bis zum Triebfahrzeug.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Schnell & modern</div>
          <h2 className="mt-2">Live-Vorschau & Stripe</h2>
          <p className="section-desc">Anzeige erstellen, prüfen, bezahlen – in Minuten live.</p>
        </article>
        <article className="card p-5">
          <div className="badge">Faire Pakete</div>
          <h2 className="mt-2">Basic, Featured, Boost</h2>
          <p className="section-desc">Transparent und effektiv für jedes Budget.</p>
        </article>
      </section>

      {/* Einstieg Jobs */}
      <section className="card p-6">
        <div className="badge">Für Bewerber:innen</div>
        <h2 className="mt-2">Finde deinen nächsten Halt</h2>
        <p className="section-desc">Filter nach Ort & Bundesland. Bewirb dich direkt beim Arbeitgeber.</p>
        <div className="mt-4">
          <Link className="btn" href="/jobs">Jobs durchsuchen</Link>
        </div>
      </section>

      {/* News (fehlerresistent) */}
      <NewsRail />
    </div>
  );
}
'@

Set-Content -Path "app\page.tsx" -Value $tsx -Encoding UTF8
Write-Host "app/page.tsx aktualisiert." -ForegroundColor Green

# --- 4) Optional deploy ---
switch ($Deploy) {
  "git" {
    if (!(Test-Path ".git" -PathType Container)) {
      Write-Warning "Kein .git-Ordner gefunden – Git-Deploy wird übersprungen."
      break
    }
    git add app/page.tsx 2>$null
    git commit -m "feat(home): Startseite aktualisiert (server, revalidate=0, kein doppeltes Logo)"
    git push origin $Branch
    Write-Host "Git-Push → Vercel baut (Git-Integration vorausgesetzt: Prod-Branch = $Branch)." -ForegroundColor Cyan
  }
  "cli" {
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
      Write-Warning "Vercel CLI nicht gefunden. Installiere per: npm i -g vercel  (und 'vercel login')."
      break
    }
    # Build-Cache umgehen (sauberer Rebuild)
    $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
    vercel --prod --force | Out-Host
    Write-Host "Vercel-CLI Deploy mit --force angestoßen." -ForegroundColor Cyan
  }
  default { }
}

Write-Host "Fertig." -ForegroundColor Green
