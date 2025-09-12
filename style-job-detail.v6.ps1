param(
  [ValidateSet("git","cli")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

# --- Helpers -----------------------------------------------------------------
$root  = Get-Location
$enc   = New-Object System.Text.UTF8Encoding($false)
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function Say($msg, $color="Gray"){ Write-Host $msg -ForegroundColor $color }
function BackupLiteral($p){ if (Test-Path -LiteralPath $p) { Copy-Item -LiteralPath $p -Destination ($p + ".bak.$stamp") -Force } }
function ReadText([string]$p){ [IO.File]::ReadAllText((Get-Item -LiteralPath $p).FullName, $enc) }
function WriteText([string]$p, [string]$text){ [IO.File]::WriteAllText((Resolve-Path -LiteralPath $p), $text, $enc) }

# --- Paths -------------------------------------------------------------------
$globals = Join-Path $root 'app\globals.css'
$layout  = Join-Path $root 'app\layout.tsx'
$detail1 = Join-Path $root 'app\jobs\[id]\page.tsx'   # Literal []!
$detail2 = Join-Path $root 'app\jobs\page.tsx'

$pagePath = $null
try { if (Test-Path -LiteralPath $detail1) { $pagePath = $detail1 } } catch { }
if (-not $pagePath -and (Test-Path -LiteralPath $detail2)) { $pagePath = $detail2 }

if (-not $pagePath) { throw "Job-Detail nicht gefunden (weder app/jobs/[id]/page.tsx noch app/jobs/page.tsx)." }
if (!(Test-Path -LiteralPath $globals)) { throw "globals.css fehlt: app/globals.css" }
if (!(Test-Path -LiteralPath $layout))  { throw "layout.tsx fehlt: app/layout.tsx"  }

# --- 1) CSS ergaenzen ---------------------------------------------------------
BackupLiteral $globals
$css = ReadText $globals

if ($css -notmatch 'JOB DETAIL STYLES') {
$cssBlock = @'
/* === JOB DETAIL STYLES ===================================================== */
.job-detail { background: var(--panel); border:1px solid var(--border); border-radius: 16px; }
.job-detail .title {
  font-weight: 900; letter-spacing:-0.01em; line-height:1.1;
  font-size: clamp(22px, 2.5vw, 28px);
}
.job-detail .meta {
  display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; color: var(--fg-muted);
  font-size: 13px;
}
.job-detail .meta .pill {
  padding: 4px 8px; border-radius: 999px;
  border:1px solid var(--border); background: var(--panel-2);
}
.job-detail .content { margin-top:14px; line-height:1.6; color: var(--fg); }
.job-detail .content h3 { font-weight:800; margin-top:14px; margin-bottom:6px; }
.job-detail .content ul { margin: 8px 0 0; padding-left: 18px; color: var(--fg); }
.job-detail .cta-row { margin-top:16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.job-detail .aside {
  background: var(--panel-2); border:1px solid var(--border);
  border-radius: 12px; padding: 12px;
}
.job-detail .grid { display:grid; gap:14px; }
@media (min-width: 900px){ .job-detail .grid { grid-template-columns: 2fr 1fr; } }
.job-detail .aside .line { display:flex; justify-content:space-between; gap:10px; margin:6px 0; color:var(--fg-muted); }
.job-detail .aside .line strong { color: var(--fg); }
/* ========================================================================== */
'@
  $css = $css + "`r`n" + $cssBlock + "`r`n"
  WriteText $globals $css
  Say "[OK] CSS-Block 'JOB DETAIL STYLES' ergaenzt" "Green"
} else {
  Say "[i] CSS-Block bereits vorhanden (uebersprungen)" "DarkGray"
}

# --- 2) Seite patchen ---------------------------------------------------------
BackupLiteral $pagePath
$txt  = ReadText $pagePath
$orig = $txt

# a) Link-Import sicherstellen
$reLink = [regex]::new('from\s+["'']next\/link["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
if (-not $reLink.IsMatch($txt)) {
  $txt = 'import Link from "next/link";' + "`r`n" + $txt
}

# b) Wrapper in <main> einfuegen (einmalig)
$addedWrapper = $false
if ($txt -notmatch 'className="section p-6 sm:p-8 job-detail"') {
  $reMainOpen  = [regex]::new('(<main\b[^>]*>)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $openInject = @'
      <section className="section p-6 sm:p-8 job-detail">
        <div className="mb-3"><Link href="/jobs" className="link-like">&larr; Alle Jobs</Link></div>
'@
  $txt = $reMainOpen.Replace($txt, '$1' + "`r`n" + $openInject, 1)
  $addedWrapper = $true
}

# c) Schliessenden Wrapper vor </main> nur einfuegen, wenn offen ergaenzt wurde
if ($addedWrapper) {
  $reMainClose = [regex]::new('</main>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $closeInject = @'
        </section>
    </main>
'@
  # Ersetzt das erste vorkommende </main> durch </section> + </main>
  $txt = $reMainClose.Replace($txt, $closeInject, 1)
}

# d) CTAs sichtbar machen (apply/mail)
$reApplyBtn = [regex]::new('(<a\s+[^>]*href="[^"]*apply[^"]*"[^>]*className=")([^"]*)(")', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$txt = $reApplyBtn.Replace($txt, '$1btn btn-primary$3', 1)

$reMailBtn  = [regex]::new('(<a\s+[^>]*href="mailto:[^"]*"[^>]*className=")([^"]*)(")', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$txt = $reMailBtn.Replace($txt, '$1btn btn-secondary$3', 1)

if ($txt -ne $orig) {
  WriteText $pagePath $txt
  Say ("[OK] Job-Detail-Seite gestylt: {0}" -f ($pagePath.Replace($root.Path+'\',''))) "Green"
} else {
  Say "[i] Seite unveraendert (bereits im Zielzustand oder anderes Markup)" "DarkGray"
}

# --- 3) Build -----------------------------------------------------------------
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci"  | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# --- 4) Deploy ----------------------------------------------------------------
switch ($Deploy) {
  "git" {
    try { git rev-parse --is-inside-work-tree *>$null } catch { throw "Kein Git-Repo im aktuellen Ordner." }
    git add -- app/globals.css "$pagePath"
    git commit -m "style(job-detail): ruhiges Panel-Layout, sichtbare CTAs, Back-Link"
    git push origin $Branch
    Say "[OK] Git push -> Vercel baut automatisch." "Green"
  }
  "cli" {
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) { throw "Vercel CLI fehlt. Installiere: npm i -g vercel && vercel login" }
    $env:VERCEL_FORCE_NO_BUILD_CACHE = "1"
    vercel pull --yes --environment=production | Out-Null
    vercel --prod --force | Out-Host
    Say "[OK] Vercel CLI Deploy ausgeloest." "Green"
  }
}
