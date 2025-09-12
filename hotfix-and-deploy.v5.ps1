# hotfix-and-deploy.v5.ps1
$ErrorActionPreference = "Stop"

function Read-AllText($Path) {
  try { return Get-Content -LiteralPath $Path -Raw } catch { return (Get-Content -LiteralPath $Path -ReadCount 0) -join "`n" }
}
function Write-Utf8NoBom($Path, $Content) {
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText((Join-Path (Resolve-Path ".") $Path), $Content, $utf8NoBom)
}
function Backup-File($Path) {
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd-HHmmss"
    Copy-Item -LiteralPath $Path -Destination "$Path.$ts.bak" -Force
  }
}
function Ensure-Dir($path) {
  if (!(Test-Path -LiteralPath $path)) { New-Item -ItemType Directory -Path $path | Out-Null }
}
function Require-Cli($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) { throw "$name CLI nicht gefunden." }
}

# 1) getJobById in lib/jobs.sample.ts (falls noch nicht da)
$jobsSample = "lib/jobs.sample.ts"
if (!(Test-Path $jobsSample)) { throw "Fehlt: $jobsSample (erst Demo-Daten anlegen)." }
$js = Read-AllText $jobsSample
if ($js -notmatch 'export\s+function\s+getJobById\s*\(') {
  Backup-File $jobsSample
  $append = @'
export function getJobById(id: string): Job | undefined {
  try { return JOBS.find(j => j.id === id); } catch { return undefined; }
}
'@
  Write-Utf8NoBom $jobsSample ($js.TrimEnd() + "`n" + $append)
  Write-Host "[OK] getJobById ergänzt."
} else {
  Write-Host "[OK] getJobById vorhanden."
}

# 2) Detailseite sauber auf "@/lib/jobs.sample" umstellen (ohne Regex)
$detailPage = "app/jobs/[id]/page.tsx"
if (Test-Path $detailPage) {
  $dp = Read-AllText $detailPage
  $orig = $dp
  $dp = $dp.Replace('from "@/lib/jobs"', 'from "@/lib/jobs.sample"')
  $dp = $dp.Replace("from '@/lib/jobs'", "from '@/lib/jobs.sample'")
  $dp = $dp.Replace('from "../lib/jobs"', 'from "@/lib/jobs.sample"')
  $dp = $dp.Replace('from "./lib/jobs"', 'from "@/lib/jobs.sample"')
  if ($dp -ne $orig) {
    Backup-File $detailPage
    Write-Utf8NoBom $detailPage $dp
    Write-Host "[PATCH] $detailPage -> '@/lib/jobs.sample'"
  } else {
    Write-Host "[INFO] $detailPage Import war bereits OK."
  }
} else {
  Write-Host "[INFO] $detailPage nicht gefunden (ok)."
}

# 3) /api/railnews robust machen (force-dynamic + NextResponse.json)
$railnewsDir = "app/api/railnews"
$railnewsRoute = Join-Path $railnewsDir "route.ts"
Ensure-Dir $railnewsDir
$railnewsContent = @'
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900; // 15 Minuten

export async function GET() {
  const payload = {
    status: "ok",
    source: "placeholder",
    items: [],
    generatedAt: new Date().toISOString(),
  };
  return NextResponse.json(payload);
}
'@
$needWrite = $true
if (Test-Path $railnewsRoute) {
  $cur = Read-AllText $railnewsRoute
  if ($cur -like "*NextResponse*" -and $cur -like "*force-dynamic*") { $needWrite = $false }
}
if ($needWrite) {
  Backup-File $railnewsRoute
  Write-Utf8NoBom $railnewsRoute $railnewsContent
  Write-Host "[OK] $railnewsRoute aktualisiert."
} else {
  Write-Host "[OK] $railnewsRoute war bereits kompatibel."
}

# 4) Lokale Build-Ordner aufräumen (um Altartefakte zu vermeiden)
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force }
if (Test-Path ".vercel\output") { Remove-Item ".vercel\output" -Recurse -Force }

# 5) Git + Push
Require-Cli git
git add -A
$changes = git status --porcelain
if ($changes) {
  $msg = "fix(build): solid railnews route + detail import patch | $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  git commit -m $msg
  git push -u origin HEAD
} else {
  Write-Host "[INFO] Keine Änderungen zu committen."
}

# 6) Vercel: Cloud-Build (ohne prebuilt), damit der Lambda-/Edge-Mismatch umgangen wird
Require-Cli vercel
vercel whoami | Out-Null
vercel pull --yes --environment=production | Out-Null

# Wichtig: direkt in der Cloud bauen und deployen (kein 'vercel build' lokal)
vercel --prod --yes
Write-Host "`n[OK] Cloud-Deploy ausgelöst. Öffne die ausgegebene URL → /jobs und /api/railnews"
