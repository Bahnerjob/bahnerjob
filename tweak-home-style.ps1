param(
  [ValidateSet("git","cli","none")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root    = Get-Location
$enc     = New-Object System.Text.UTF8Encoding($false)
$stamp   = Get-Date -Format "yyyyMMdd-HHmmss"
$globals = Join-Path $root "app\globals.css"
$page    = Join-Path $root "app\page.tsx"

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

if (!(Test-Path $globals)) { throw "app/globals.css fehlt" }

Backup $globals
if (Test-Path $page) { Backup $page }

# --- CSS: HOME STYLE TWEAKS (nur anhängen, idempotent) ---
$css = [IO.File]::ReadAllText($globals, $enc)
if ($css -notmatch "HOME STYLE TWEAKS") {
  $css += @"

/* === HOME STYLE TWEAKS ===================================================== */
/* mehr Luft zwischen Sektionen, klarere Headlines, Buttons deutlicher */
:root {
  --fg: rgba(235,235,240,.95);
  --fg-muted: rgba(235,235,240,.75);
  --bg: rgb(15,15,16);
  --panel: rgb(19,19,20);
  --panel-2: rgb(23,23,24);
  --border: rgb(48,48,52);
  --accent: #dc2626;
}

/* globale Abstände */
main { padding-bottom: 28px; }
.section { padding: 20px 18px; border-radius: 16px; }
.section + .section { margin-top: 18px; }

/* Headlines */
main h1 { font-weight: 800; letter-spacing:-0.01em; line-height:1.15; }
@media (min-width:640px){ main h1 { font-size: 2.1rem; } }
main h2 { font-weight: 800; letter-spacing:-0.01em; font-size: 1.35rem; }
main h3 { font-weight: 700; letter-spacing:-0.01em; }

/* Klarere CTAs */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  padding:.65rem 1rem; border-radius:.75rem;
  border:1px solid var(--border); background:var(--panel-2); color:var(--fg);
  font-weight:600; text-decoration:none;
  transition:transform .06s ease, border-color .15s ease, background-color .15s ease, box-shadow .15s ease;
}
.btn:hover { transform: translateY(-1px); border-color: rgb(72,72,78); }
.btn:focus { outline:none; box-shadow:0 0 0 2px rgba(220,38,38,.25); }

.btn-primary {
  background: linear-gradient(180deg, rgb(35,35,36), rgb(26,26,27));
  border-color: rgb(82,82,88);
  box-shadow: 0 6px 16px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04);
}
.btn-secondary { background: transparent; border-color: var(--border); color: var(--fg); }
.btn-ghost { background: transparent; border-color: transparent; color: var(--fg-muted); }
.btn-ghost:hover { color: var(--fg); }

/* Inputs & Selects konsistenter und etwas größer */
.input, select, .select, .select-dark, input[list]{
  background-color: var(--panel-2);
  border:1px solid var(--border);
  color:var(--fg);
  border-radius:10px;
  padding:11px 12px;
  font-size:14px; line-height:1.25;
  color-scheme: dark;
}
.input:focus, select:focus, .select-dark:focus, input[list]:focus {
  outline:none; border-color: rgb(72,72,78);
  box-shadow:0 0 0 2px rgba(120,120,128,.15);
}

/* News-Teaser (Startseite) in Listenform: luftiger */
.news-list { border-top:1px solid var(--border); }
.news-item { border-bottom:1px solid var(--border); }
.news-link { padding:12px 2px; }
.news-title { -webkit-line-clamp:2; }

/* etwas mehr Luft unter dem Hero-Block, falls vorhanden */
.hero + .section { margin-top: 22px; }
/* ========================================================================== */
"@

  [IO.File]::WriteAllText($globals, $css, $enc)
}

# --- lokaler Build ---
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci" | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# --- Deploy ---
switch ($Deploy) {
  "git" {
    if (Test-Path ".git") {
      git add -- app/globals.css
      if (Test-Path $page) { git add -- app/page.tsx }
      git commit -m "style(home): spacing, modern headlines & clearer CTAs via CSS (HOME STYLE TWEAKS)"
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
  default { Write-Host "Nur lokal angewendet (Deploy=none)." -ForegroundColor Yellow }
}
