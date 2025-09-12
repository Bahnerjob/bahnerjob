# fix-pricing-encoding.ps1
param(
  [ValidateSet("git","cli")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root  = Get-Location
$enc   = New-Object System.Text.UTF8Encoding($false)  # UTF-8 ohne BOM
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

# Preise (sichtbar) – aus Stripe übernommen
[decimal]$PriceBasic    = 59.00
[decimal]$PriceFeatured = 149.00
[decimal]$PriceBoost    = 39.00

# Format: de-DE (Komma), aber nur ASCII im JSX anzeigen => Zahlen bleiben, € via &euro;
$BasicStr    = ([string]::Format("{0:0.00}", $PriceBasic)).Replace('.', ',')
$FeaturedStr = ([string]::Format("{0:0.00}", $PriceFeatured)).Replace('.', ',')
$BoostStr    = ([string]::Format("{0:0.00}", $PriceBoost)).Replace('.', ',')

# Pfade
$layout  = Join-Path $root 'app\layout.tsx'
$pricing = Join-Path $root 'app\pricing\page.tsx'
$globals = Join-Path $root 'app\globals.css'

# 1) Charset-Sicherheit im Layout erzwingen (meta charset)
if (Test-Path $layout) {
  Backup $layout
  $lay = [IO.File]::ReadAllText($layout, $enc)
  $needsMeta = ($lay -notmatch 'charSet\s*=\s*["'']utf-?8["'']')

  if ($lay -match '<head[^>]*>') {
    if ($needsMeta) {
      $lay = [regex]::Replace($lay,
        '(<head[^>]*>)',
        '$1' + "`r`n" + '      <meta charSet="utf-8" />',
        1, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    }
  } else {
    # Kein <head> in layout: nach <html ...> einspritzen
    $lay = [regex]::Replace($lay,
      '(<html[^>]*>)',
      '$1' + "`r`n" + '    <head><meta charSet="utf-8" /></head>',
      1, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  }
  [IO.File]::WriteAllText($layout, $lay, $enc)
}

# 2) Style-Block (falls nicht vorhanden) – Karten wie auf den anderen Seiten
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
"
    Backup $globals
    [IO.File]::WriteAllText($globals, $css, $enc)
  }
}

# 3) Pricing-Seite ASCII-sicher neu schreiben (Entities für €/·/Umlaute)
$tsx = @'
import Link from "next/link";

export const revalidate = 0;
export const metadata = {
  title: "Pakete & Preise - Bahnerjob",
  description: "Transparente Pakete fuer Stellenanzeigen im Bahnsektor."
};

export default function PricingPage() {
  return (
    <main className="mx-auto container py-10 space-y-8">
      <section className="section p-6 sm:p-8">
        <div className="section-head">
          <h1 className="text-2xl font-extrabold tracking-tight">Pakete & Preise</h1>
          <span className="badge-accent">ohne Abo &middot; klare Laufzeit</span>
        </div>

        <div className="pricing-grid mt-4">
          {/* BASIC */}
          <article className="pricing-card">
            <div className="pricing-title">Basic Listing</div>
            <div className="price"><span className="amount">__BASIC__ &euro;</span><span className="per">/ Anzeige</span></div>
            <ul className="benefits">
              <li>Standardreichweite im Bahn-Umfeld</li>
              <li>Saubere Darstellung (mobil &amp; Desktop)</li>
              <li>&Auml;nderungen w&auml;hrend der Laufzeit m&ouml;glich</li>
            </ul>
            <div className="mt-4 flex gap-8 items-center">
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Basic buchen</Link>
              <Link href="/jobs" className="link-like">Beispiele ansehen</Link>
            </div>
          </article>

          {/* FEATURED */}
          <article className="pricing-card" style={{borderColor:"rgb(82,82,88)"}}>
            <div className="pricing-title">Featured Listing</div>
            <div className="price"><span className="amount">__FEATURED__ &euro;</span><span className="per">/ Anzeige</span></div>
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
            <div className="price"><span className="amount">__BOOST__ &euro;</span><span className="per">/ Add-on</span></div>
            <ul className="benefits">
              <li>Zus&auml;tzliche Platzierung/Push</li>
              <li>St&auml;rkere Aufmerksamkeit im Zeitraum</li>
              <li>In Kombination mit Basic/Featured</li>
            </ul>
            <div className="mt-4">
              <Link href="/jobs/new?pkg=boost" className="btn btn-secondary">Boost hinzuf&uuml;gen</Link>
            </div>
          </article>
        </div>

        <p className="mt-6 text-sm text-[color:var(--fg-muted)]">
          Preise inkl. USt., Abrechnung &middot; sicher &uuml;ber Stripe.
        </p>
      </section>
    </main>
  );
}
'@

$tsx = $tsx.Replace('__BASIC__', $BasicStr).Replace('__FEATURED__', $FeaturedStr).Replace('__BOOST__', $BoostStr)
Backup $pricing
[IO.File]::WriteAllText($pricing, $tsx, $enc)

# 4) Build
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci" | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# 5) Deploy
if ($Deploy -eq "git") {
  git add -- app/layout.tsx app/pricing/page.tsx app/globals.css
  git commit -m "fix(pricing): UTF-8 charset meta + ASCII-safe JSX (entities) + synced amounts (Basic ${BasicStr}€, Featured ${FeaturedStr}€, Boost ${BoostStr}€)"
  git push origin $Branch
  Write-Host "Push nach '$Branch' erfolgt. Vercel startet Build automatisch." -ForegroundColor Green
} else {
  if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    throw "Vercel CLI fehlt. Installiere: npm i -g vercel && vercel login"
  }
  vercel pull --yes --environment=production | Out-Null
  $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
  vercel --prod --force | Out-Host
  Write-Host "Vercel CLI Deploy ausgelöst." -ForegroundColor Green
}
