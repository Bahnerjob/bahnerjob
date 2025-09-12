param(
  [ValidateSet("git","cli")] [string]$Deploy = "git",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root   = Get-Location
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$enc    = New-Object System.Text.UTF8Encoding($false)

function Backup($p){ if (Test-Path $p) { Copy-Item $p "$p.bak.$stamp" -Force } }

$layout   = Join-Path $root 'app\layout.tsx'
$pricing  = Join-Path $root 'app\pricing\page.tsx'
$globals  = Join-Path $root 'app\globals.css'

# 1) Charset sichern
if (Test-Path $layout) {
  $txt = [IO.File]::ReadAllText($layout)
  if ($txt -notmatch '<meta\s+charSet="utf-8"') {
    Backup $layout
    $txt = [regex]::Replace($txt,'(<head>)(\s*)','$1$2    <meta charSet="utf-8" />$2',[Text.RegularExpressions.RegexOptions]::IgnoreCase)
    [IO.File]::WriteAllText($layout,$txt,$enc)
  }
}

# 2) Reparatur-Tabelle für falsche UTF-8-Dekodierung
$fixPairs = @(
  'Â','','â','€','Â €',' €',
  'Ã','Ä','Ã','Ö','Ãœ','Ü','Ã','ä','Ã','ö','Ã','ü','ÃŸ','ß',
  'â€','','â€','','â€œ','','â€','','â€','','â€','','â€',''
)

function FixFile([string]$path){
  if (!(Test-Path $path)) { return $false }
  $orig=[IO.File]::ReadAllText($path)
  $txt=$orig
  for ($i=0;$i -lt $fixPairs.Length;$i+=2){ $txt=$txt.Replace($fixPairs[$i],$fixPairs[$i+1]) }
  if ($txt -ne $orig){
    Backup $path
    [IO.File]::WriteAllText($path,$txt,$enc)
    Write-Host ("fixed: {0}" -f ($path.Replace($root.Path+'\',''))) -ForegroundColor Green
    return $true
  }
  return $false
}

$changed=$false
$changed=(FixFile $pricing) -or $changed
$changed=(FixFile $layout)  -or $changed
if (Test-Path $globals){ $changed=(FixFile $globals) -or $changed }

# 3) Build
if (Test-Path (Join-Path $root "package-lock.json")) { cmd /c "npm ci" | Out-Null } else { cmd /c "npm install" | Out-Null }
cmd /c "npm run build"

# 4) Deploy
if ($Deploy -eq "git") {
  git add .
  git commit -m "fix(pricing): UTF-8 encoding (€, , Umlaute) + meta charset" --allow-empty
  git push origin $Branch
  Write-Host "Push nach '$Branch' erfolgt. Vercel startet Build automatisch." -ForegroundColor Cyan
} else {
  if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI fehlt. Installiere: npm i -g vercel && vercel login" -ForegroundColor Yellow
  } else {
    vercel pull --yes --environment=production | Out-Null
    $env:VERCEL_FORCE_NO_BUILD_CACHE="1"
    vercel --prod --force | Out-Host
    Write-Host "Vercel CLI Deploy ausgelöst." -ForegroundColor Green
  }
}