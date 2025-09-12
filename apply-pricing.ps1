param(
  [ValidateSet("git","cli","none")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root   = Get-Location
$enc    = New-Object System.Text.UTF8Encoding($false)
$stamp  = Get-Date -Format "yyyyMMdd-HHmmss"

$appDir   = Join-Path $root "app"
$globals  = Join-Path $root "app\globals.css"
$pricingD = Join-Path $root "app\pricing"
$pricingP = Join-Path $pricingD "page.tsx"

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

if (!(Test-Path $pricingD)) { New-Item -ItemType Directory -Force -Path $pricingD | Out-Null }
if (!(Test-Path $globals))  { throw "app/globals.css fehlt" }

# --- 1) Pricing page schreiben (Server Component, kein Client) ---
Backup $pricingP
$tsx = @"
import Link from "next/link";

export const revalidate = 300;

export const metadata = {
  title: "Pakete & Leistungen  Bahnerjob",
  description: "Transparente Pakete für Stellenanzeigen im Bahnsektor: Basic, Featured, Boost."
};

export default function PricingPage() {
  return (
    <main style={{maxWidth:"56rem", margin:"0 auto", padding:"24px 16px"}}>
      <section className="section" style={{padding:"22px"}}>
        <header style={{textAlign:"center", marginBottom:"14px"}}>
          <h1 style={{fontWeight:800, letterSpacing:"-0.01em"}}>Pakete & Leistungen</h1>
          <p className="muted" style={{marginTop:"8px"}}>
            Wähle das passende Paket. Klare Laufzeiten, klare Sichtbarkeit  ohne Streuverlust.
          </p>
        </header>

        <div className="pricing-grid">
          {/* BASIC */}
          <article className="pricing-card">
            <div className="badge">Basic</div>
            <h2 className="pricing-title">Standard-Reichweite</h2>
            <div className="price">49&nbsp;€ <span className="price-meta">/ 30 Tage</span></div>
            <ul className="features">
              <li><span className="dot" /> Sichtbar im Job-Listing</li>
              <li><span className="dot" /> Direktverlinkung zur Bewerbung</li>
              <li><span className="dot" /> Bearbeitbar während der Laufzeit</li>
            </ul>
            <div className="plan-cta">
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
            </div>
          </article>

          {/* FEATURED */}
          <article className="pricing-card highlight">
            <div className="badge">Featured</div>
            <h2 className="pricing-title">Mehr Aufmerksamkeit</h2>
            <div className="price">99&nbsp;€ <span className="price-meta">/ 30 Tage</span></div>
            <ul className="features">
              <li><span className="dot" /> Hervorgehobene Darstellung im Listing</li>
              <li><span className="dot" /> Priorisierte Platzierung</li>
              <li><span className="dot" /> Inklusive Basic-Leistungen</li>
            </ul>
            <div className="plan-cta">
              <Link href="/jobs/new?pkg=featured" className="btn btn-primary">Anzeige schalten</Link>
              <Link href="/jobs" className="btn btn-secondary">Jobs ansehen</Link>
            </div>
          </article>

          {/* BOOST */}
          <article className="pricing-card">
            <div className="badge">Boost</div>
            <h2 className="pricing-title">Maximale Sichtbarkeit</h2>
            <div className="price">149&nbsp;€ <span className="price-meta">/ 30 Tage</span></div>
            <ul className="features">
              <li><span className="dot" /> Top-Platzierung & zusätzliche Hinweise</li>
              <li><span className="dot" /> Extra-Reichweite innerhalb der Zielgruppe</li>
              <li><span className="dot" /> Inklusive Featured-Leistungen</li>
            </ul>
            <div className="plan-cta">
              <Link href="/jobs/new?pkg=boost" className="btn btn-primary">Anzeige schalten</Link>
            </div>
          </article>
        </div>

        <p className="muted" style={{marginTop:"12px", textAlign:"center"}}>Alle Preise zzgl. USt.</p>
      </section>

      <section className="section" style={{padding:"22px"}}>
        <h3 style={{fontWeight:700, letterSpacing:"-0.01em"}}>Fragen & Antworten</h3>
        <div className="faq">
          <details>
            <summary>Wie schnell ist die Anzeige online?</summary>
            <p>In der Regel in Minuten nach Abschluss. Änderungen sind während der Laufzeit möglich.</p>
          </details>
          <details>
            <summary>Kann ich eine Anzeige upgraden?</summary>
            <p>Ja  ein Wechsel auf Featured/Boost ist möglich, die Laufzeit bleibt übersichtlich.</p>
          </details>
          <details>
            <summary>Wie bewerbe ich mich als Kandidat:in?</summary>
            <p>Direkt beim Unternehmen über den angegebenen Link/Kontakt in der Anzeige.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
"@

[IO.File]::WriteAllText($pricingP, $tsx, $enc)

# --- 2) CSS-Block für Pricing in globals.css anhängen (idempotent) ---
Backup $globals
$css = [IO.File]::ReadAllText($globals, $enc)
if ($css -notmatch "PRICING STYLES") {
  $css += @"

/* === PRICING STYLES ======================================================== */
.pricing-grid {
  display:grid; grid-template-columns:1fr; gap:12px;
}
@media (min-width: 900px){
  .pricing-grid { grid-template-columns:1fr 1fr 1fr; }
}
.pricing-card{
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  display:flex; flex-direction:column; gap:10px;
}
.pricing-card.highlight{
  background: linear-gradient(180deg, rgba(28,28,29,1), rgba(22,22,23,1));
  border-color: rgb(82,82,88);
  box-shadow: 0 8px 28px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04);
}
.pricing-title { font-weight:800; letter-spacing:-0.01em; }
.price { font-weight:800; font-size: 1.75rem; letter-spacing:-0.01em; }
.price-meta { font-weight:600; font-size:.9rem; color: var(--fg-muted); }
.features { list-style:none; margin:8px 0 0; padding:0; }
.features li { display:flex; gap:10px; align-items:flex-start; color: var(--fg-muted); line-height:1.35; }
.features .dot { width:6px; height:6px; border-radius:9999px; background: var(--accent); margin-top:.55rem; }
.plan-cta { margin-top:auto; display:flex; gap:8px; flex-wrap:wrap; }

.faq details{
  background: var(--panel-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
}
.faq details + details { margin-top: 8px; }
.faq summary { cursor: pointer; font-weight:600; }
.faq p { color: var(--fg-muted); margin-top:6px; }
/* ========================================================================== */
"
  [IO.File]::WriteAllText($globals, $css, $enc)
}

# --- 3) Build lokal ---
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci" | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# --- 4) Deploy ---
switch ($Deploy) {
  "git" {
    if (Test-Path ".git") {
      git add -- app/pricing/page.tsx app/globals.css
      git commit -m "feat(pricing): modern dark layout (Basic/Featured/Boost), klare CTAs & FAQ"
      git push origin $Branch
      Write-Host "Git push done ($Branch). Vercel baut automatisch." -ForegroundColor Cyan
    } else {
      Write-Host "Kein Git-Repo  Deploy übersprungen." -ForegroundColor Yellow
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
  default { Write-Host "Nur lokal geschrieben (Deploy=none)." -ForegroundColor Yellow }
}
