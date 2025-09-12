# apply-pricing-amounts.ps1
param(
  [ValidateSet("git","cli")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root  = Get-Location
$enc   = New-Object System.Text.UTF8Encoding($false)
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

# Stripe-Preise (sichtbare Anzeige)
[decimal]$PriceBasic    = 59.00
[decimal]$PriceFeatured = 149.00
[decimal]$PriceBoost    = 39.00

# Formatieren (de-DE mit Komma)
$BasicStr    = ([string]::Format("{0:0.00}", $PriceBasic)).Replace('.', ',')
$FeaturedStr = ([string]::Format("{0:0.00}", $PriceFeatured)).Replace('.', ',')
$BoostStr    = ([string]::Format("{0:0.00}", $PriceBoost)).Replace('.', ',')

# Pfade
$pricing = Join-Path $root 'app\pricing\page.tsx'
$globals = Join-Path $root 'app\globals.css'

# 1) CSS-Block für Pricing-Karten anhängen (falls nicht vorhanden)
if (Test-Path $globals) {
  $css = [IO.File]::ReadAllText($globals, $enc)
  if ($css -notmatch 'PRICING CARDS') {
    $css += @"
    
/* === PRICING CARDS ===================================================== */
.pricing-grid{ display:grid; gap:12px; }
@media (min-width:640px){ .pricing-grid{ grid-template-columns:repeat(3,1fr); } }
.pricing-card{
  background: var(--panel);
  border:1px solid var(--border);
  border-radius:16px;
  padding:16px;
}
.pricing-title{ font-weight:800; letter-spacing:-0.01em; }
.price{
  display:flex; align-items:baseline; gap:6px;
  margin-top:6px; font-weight:800; letter-spacing:-0.01em;
}
.price .amount{ font-size:28px; line-height:1; }
.price .per{ font-size:12px; color:var(--fg-muted); }
ul.benefits{ margin:10px 0 0; padding-left:18px; color:var(--fg-muted); }
ul.benefits li{ margin-bottom:6px; }
.badge-accent{
  display:inline-block; font-size:11px; padding:3px 8px;
  border-radius:999px; border:1px solid var(--border);
  background: var(--panel-2); color:var(--fg-muted);
}
/* ====================================================================== */
"@
    Backup $globals
    [IO.File]::WriteAllText($globals, $css, $enc)
  }
}

# 2) Pricing-Seite schreiben
$tsx = @"
import Link from "next/link";

export const revalidate = 0;
export const metadata = {
  title: "Pakete & Preise · Bahnerjob",
  description: "Transparente Pakete für Stellenanzeigen im Bahnsektor."
};

export default function PricingPage() {
  return (
    <main className="mx-auto container py-10 space-y-8">
      <section className="section p-6 sm:p-8">
        <div className="section-head">
          <h1 className="text-2xl font-extrabold tracking-tight">Pakete & Preise</h1>
          <span className="badge-accent">ohne Abo · klare Laufzeit</span>
        </div>

        <div className="pricing-grid mt-4">
          {/* BASIC */}
          <article className="pricing-card">
            <div className="pricing-title">Basic Listing</div>
            <div className="price"><span className="amount">$BasicStr €</span><span className="per">/ Anzeige</span></div>
            <ul className="benefits">
              <li>Standardreichweite im Bahn-Umfeld</li>
              <li>Saubere Darstellung (mobil & Desktop)</li>
              <li>Änderungen während der Laufzeit möglich</li>
            </ul>
            <div className="mt-4 flex gap-8 items-center">
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Basic buchen</Link>
              <Link href="/jobs" className="link-like">Beispiele ansehen</Link>
            </div>
          </article>

          {/* FEATURED */}
          <article className="pricing-card" style={{borderColor:"rgb(82,82,88)"}}>
            <div className="pricing-title">Featured Listing</div>
            <div className="price"><span className="amount">$FeaturedStr €</span><span className="per">/ Anzeige</span></div>
            <ul className="benefits">
              <li>Hervorgehobene Kachel im Listing</li>
              <li>Mehr Sichtbarkeit auf der Startseite</li>
              <li>Alle Vorteile von Basic inklusive</li>
            </ul>
            <div className="mt-4 flex gap-8 items-center">
              <Link href="/jobs/new?pkg=featured" className="btn btn-primary">Featured buchen</Link>
              <Link href="/jobs" className="link-like">Beispiele ansehen</Link>
            </div>
          </article>

          {/* BOOST */}
          <article className="pricing-card">
            <div className="pricing-title">Boost (Upgrade)</div>
            <div className="price"><span className="amount">$BoostStr €</span><span className="per">/ Add-on</span></div>
            <ul className="benefits">
              <li>Zusätzliche Platzierung/Push</li>
              <li>Stärkere Aufmerksamkeit im Zeitraum</li>
              <li>In Kombination mit Basic/Featured</li>
            </ul>
            <div className="mt-4">
              <Link href="/jobs/new?pkg=boost" className="btn btn-secondary">Boost hinzufügen</Link>
            </div>
          </article>
        </div>

        <p className="mt-6 text-sm text-[color:var(--fg-muted)]">
          Preise inkl. USt., Abrechnung · sicher über Stripe.
        </p>
      </section>
    </main>
  );
}
"@

$tsx = $tsx.Replace('$BasicStr', $BasicStr).Replace('$FeaturedStr', $FeaturedStr).Replace('$BoostStr', $BoostStr)
Backup $pricing
[IO.File]::WriteAllText($pricing, $tsx, $enc)

# 3) Build
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci" | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# 4) Deploy
if ($Deploy -eq "git") {
  git add -- app/pricing/page.tsx app/globals.css
  git commit -m "feat(pricing): sync visible amounts with Stripe (Basic ${BasicStr}€, Featured ${FeaturedStr}€, Boost ${BoostStr}€) and unify style"
  git push origin $Branch
  Write-Host " Git push done ($Branch). Vercel baut automatisch." -ForegroundColor Green
} else {
  if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host " Vercel CLI fehlt. Installiere: npm i -g vercel && vercel login" -ForegroundColor Yellow
  } else {
    vercel pull --yes --environment=production | Out-Null
    $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
    vercel --prod --force | Out-Host
    Write-Host " Vercel CLI Deploy ausgelöst." -ForegroundColor Green
  }
}
