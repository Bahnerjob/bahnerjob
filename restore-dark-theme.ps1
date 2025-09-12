param(
  [ValidateSet("git","cli")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root  = Get-Location
$enc   = New-Object System.Text.UTF8Encoding($false)
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function Say($m,$c="Gray"){ Write-Host $m -ForegroundColor $c }
function Backup($p){ if (Test-Path -LiteralPath $p) { Copy-Item -LiteralPath $p -Destination ($p + ".bak.$stamp") -Force } }
function ReadTxt($p){ [IO.File]::ReadAllText((Get-Item -LiteralPath $p).FullName, $enc) }
function WriteTxt($p,$t){ [IO.File]::WriteAllText((Resolve-Path -LiteralPath $p), $t, $enc) }

$globals = Join-Path $root 'app\globals.css'
$layout  = Join-Path $root 'app\layout.tsx'

# 0) Optional: neueste .bak von globals.css wiederherstellen (falls Datei defekt/klein)
if (Test-Path -LiteralPath $globals) {
  $len = (Get-Item -LiteralPath $globals).Length
  if ($len -lt 2000) {
    $baks = Get-ChildItem -LiteralPath (Split-Path $globals -Parent) -Filter 'globals.css.bak.*' |
            Sort-Object LastWriteTime -Descending
    if ($baks -and $baks.Count -gt 0) {
      Say "globals.css wirkt beschaedigt ($len B). Stelle aus neuester .bak wieder her: $($baks[0].Name)" "Yellow"
      Copy-Item -LiteralPath $baks[0].FullName -Destination $globals -Force
    }
  }
}

# 1) Sicherstellen, dass globals.css existiert
if (!(Test-Path -LiteralPath $globals)) {
  New-Item -ItemType File -Path $globals -Force | Out-Null
}

Backup $globals
$css = ReadTxt $globals

# 2) Dark Core – Grunddesign (nur einmal anhängen)
if ($css -notmatch 'DARK RESET CORE') {
$core = @'
/* === DARK RESET CORE ======================================================= */
:root{
  --fg: rgba(235,235,240,.95);
  --fg-muted: rgba(235,235,240,.75);
  --bg: rgb(15,15,16);
  --panel: rgb(19,19,20);
  --panel-2: rgb(23,23,24);
  --border: rgb(48,48,52);
  --accent: #dc2626;
}
html, body { background: var(--bg); color: var(--fg);
  font-family: Inter, Manrope, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
a { color: inherit; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  padding:.6rem .9rem; border-radius:.7rem; border:1px solid var(--border);
  background: var(--panel-2); color:var(--fg); text-decoration:none; font-weight:600;
  transition: transform .06s ease, border-color .15s ease, background-color .15s ease;
}
.btn:hover{ transform: translateY(-1px); border-color: rgb(72,72,78); }
.btn:focus{ outline:none; box-shadow:0 0 0 2px rgba(220,38,38,.25); }
.btn-primary{ background: linear-gradient(180deg, #232324, #1a1a1b); border-color: rgb(82,82,88); }
.btn-secondary{ background: transparent; border-color: var(--border); }
.btn-ghost{ background: transparent; border-color: transparent; color: var(--fg-muted); }
.btn-ghost:hover{ color: var(--fg); }

.input, select, .select, .select-dark, input[list]{
  background-color: var(--panel-2); border:1px solid var(--border); color: var(--fg);
  border-radius:10px; padding:10px 12px; font-size:14px; color-scheme: dark;
}
.input:focus, select:focus, .select-dark:focus, input[list]:focus{
  outline:none; border-color: rgb(72,72,78); box-shadow:0 0 0 2px rgba(120,120,128,.15);
}

.section{ background: var(--panel); border:1px solid var(--border); border-radius:1rem; padding:16px; }
.link-like{ color:var(--fg-muted); text-decoration:none; border-bottom:1px dashed var(--border); }
.link-like:hover{ color:var(--fg); border-bottom-color:rgb(82,82,88); }

.site-header{ position:sticky; top:0; z-index:50; backdrop-filter:saturate(1.2) blur(8px);
  background-color:rgba(15,15,16,.72); border-bottom:1px solid var(--border);
}
.site-header .brand{ display:inline-flex; align-items:center; gap:.6rem; font-weight:800; letter-spacing:-0.01em; font-size:1.05rem; }
.site-header .brand img{ width:22px; height:22px; }
@media (min-width:640px){ .site-header .brand{ font-size:1.15rem; } .site-header .brand img{ width:24px; height:24px; } }
/* ========================================================================== */
'@
  $css += "`r`n$core`r`n"
}

# 3) Dropdowns Dark (falls verloren)
if ($css -notmatch 'DROPDOWNS DARK THEME') {
$dd = @'
/* === DROPDOWNS DARK THEME ================================================== */
:root select:not(.allow-light), :root select.select-dark{
  background-color: rgb(23,23,24) !important; border:1px solid rgb(48,48,52) !important;
  color: rgba(235,235,240,.95) !important; border-radius:10px !important;
  padding:10px 36px 10px 12px !important; font-size:14px !important; line-height:1.25 !important;
  color-scheme: dark; appearance:none; -webkit-appearance:none; -moz-appearance:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'><path d='M5 8l5 5 5-5' stroke='%23bfbfc4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  background-repeat:no-repeat; background-position:right 10px center; background-size:12px 12px;
}
:root select:not(.allow-light):focus, :root select.select-dark:focus{
  outline:none !important; border-color:rgb(72,72,78) !important; box-shadow:0 0 0 2px rgba(120,120,128,.15) !important;
}
:root select option{ background-color: rgb(23,23,24); color: rgba(235,235,240,.95); }
/* ========================================================================== */
'@
  $css += "`r`n$dd`r`n"
}

# 4) Optional: News-List/Preis/Job-Detail Styles erneut sichern (harmlos, idempotent)
if ($css -notmatch 'NEWS LIST \(home\)') {
$news = @'
/* === NEWS LIST (home) ===================================================== */
.section-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px; }
.section-head h3{ font-weight:700; letter-spacing:-0.01em; }
.news-list{ list-style:none; margin:0; padding:0; border-top:1px solid var(--border); }
.news-item{ border-bottom:1px solid var(--border); }
.news-link{ display:flex; align-items:baseline; gap:10px; padding:10px 2px; text-decoration:none; color:var(--fg); }
.news-title{ flex:1 1 auto; line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.news-meta{ flex:0 0 auto; font-size:12px; color:var(--fg-muted); white-space:nowrap; }
.news-link:hover .news-title{ text-decoration:underline; }
@media (max-width:420px){ .news-meta{ display:none; } }
/* ======================================================================== */
'@
  $css += "`r`n$news`r`n"
}

if ($css -notmatch 'PRICING CARDS') {
$pricing = @'
/* === PRICING CARDS ======================================================== */
.pricing-grid{ display:grid; gap:12px; }
@media (min-width:640px){ .pricing-grid{ grid-template-columns:repeat(3,1fr); } }
.pricing-card{ background:var(--panel); border:1px solid var(--border); border-radius:16px; padding:16px; }
.pricing-title{ font-weight:800; letter-spacing:-0.01em; }
.price{ display:flex; align-items:baseline; gap:6px; margin-top:6px; font-weight:800; letter-spacing:-0.01em; }
.price .amount{ font-size:28px; line-height:1; }
.price .per{ font-size:12px; color:var(--fg-muted); }
ul.benefits{ margin:10px 0 0; padding-left:18px; color:var(--fg-muted); }
ul.benefits li{ margin-bottom:6px; }
.badge-accent{ display:inline-block; font-size:11px; padding:3px 8px; border-radius:999px; border:1px solid var(--border); background:var(--panel-2); color:var(--fg-muted); }
/* ======================================================================== */
'@
  $css += "`r`n$pricing`r`n"
}

if ($css -notmatch 'JOB DETAIL STYLES') {
$jobdetail = @'
/* === JOB DETAIL STYLES ==================================================== */
.job-detail{ background:var(--panel); border:1px solid var(--border); border-radius:16px; }
.job-detail .title{ font-weight:900; letter-spacing:-0.01em; line-height:1.1; font-size:clamp(22px,2.5vw,28px); }
.job-detail .meta{ display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; color:var(--fg-muted); font-size:13px; }
.job-detail .meta .pill{ padding:4px 8px; border-radius:999px; border:1px solid var(--border); background:var(--panel-2); }
.job-detail .content{ margin-top:14px; line-height:1.6; color:var(--fg); }
.job-detail .content h3{ font-weight:800; margin-top:14px; margin-bottom:6px; }
.job-detail .content ul{ margin:8px 0 0; padding-left:18px; color:var(--fg); }
.job-detail .cta-row{ margin-top:16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.job-detail .aside{ background:var(--panel-2); border:1px solid var(--border); border-radius:12px; padding:12px; }
.job-detail .grid{ display:grid; gap:14px; }
@media (min-width:900px){ .job-detail .grid{ grid-template-columns:2fr 1fr; } }
.job-detail .aside .line{ display:flex; justify-content:space-between; gap:10px; margin:6px 0; color:var(--fg-muted); }
.job-detail .aside .line strong{ color:var(--fg); }
/* ======================================================================== */
'@
  $css += "`r`n$jobdetail`r`n"
}

WriteTxt $globals $css
Say "[OK] Dark-Theme & UI-Styles in globals.css verankert" "Green"

# 5) layout.tsx: Import sicherstellen
if (Test-Path -LiteralPath $layout) {
  Backup $layout
  $lay = ReadTxt $layout
  if ($lay -notmatch 'import\s+["'']\.\/globals\.css["'']') {
    $lay = 'import "./globals.css";' + "`r`n" + $lay
    WriteTxt $layout $lay
    Say '[OK] import "./globals.css" in app/layout.tsx hinzugefuegt' "Green"
  } else {
    Say "[i] layout.tsx importiert globals.css bereits" "DarkGray"
  }
}

# 6) Build
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci"  | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# 7) Deploy
switch ($Deploy) {
  "git" {
    try { git rev-parse --is-inside-work-tree *>$null } catch { throw "Kein Git-Repo im aktuellen Ordner." }
    git add -- app/globals.css app/layout.tsx
    git commit -m "fix(theme): restore dark core, dropdown styles and UI batch; ensure globals import"
    git push origin $Branch
    Say "[OK] Push -> Vercel baut automatisch." "Green"
  }
  "cli" {
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) { throw "Vercel CLI fehlt. Installiere: npm i -g vercel && vercel login" }
    $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
    vercel pull --yes --environment=production | Out-Null
    vercel --prod --force | Out-Host
    Say "[OK] Vercel CLI Deploy ausgeloest." "Green"
  }
}
