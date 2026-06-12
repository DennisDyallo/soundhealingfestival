<#
  Sound Healing Festival Stockholm - one-time onboarding for Mateusz (Windows).

  What this does, in plain terms:
    1. Checks your Windows has the installer tool it needs.
    2. Installs Git and Node (the tools the website needs to run).
    3. Installs the Codex app and the Codex command-line tool.
    4. Downloads the website to your Documents-area folder.
    5. Gets it ready and opens Codex so you can say "onboard me".

  It is safe to run more than once. It never deletes your work.
  A full log is saved to: Documents\soundhealing-onboard-log.txt

  ----------------------------------------------------------------------
  DENNIS: set these two values to the PUBLIC GitHub repo before sending.
  ----------------------------------------------------------------------
#>

[CmdletBinding()]
param(
    # PUBLIC GitHub repo, e.g. https://github.com/your-org/soundhealingfestivalstockholm.com
    [string]$RepoUrl = "https://github.com/dennisdyallo/soundhealingfestival",
    # Branch to clone, e.g. main
    [string]$Branch = "main",
    # Where the site is cloned on Mateusz's machine
    [string]$TargetDir = (Join-Path $env:USERPROFILE "soundhealing-site")
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$logPath = Join-Path ([Environment]::GetFolderPath("MyDocuments")) "soundhealing-onboard-log.txt"

# ---- friendly output helpers -------------------------------------------------

function Write-Log {
    param([string]$Message)
    $stamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    Add-Content -Path $logPath -Value "[$stamp] $Message"
}

function Say {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
    Write-Log $Message
}

function Step {
    param([string]$Message)
    Write-Host ""
    Write-Host ">> $Message" -ForegroundColor Cyan
    Write-Log "STEP: $Message"
}

function Fail-Friendly {
    param([string]$What, [string]$Detail)
    Write-Host ""
    Say "Something stopped during: $What" "Red"
    if ($Detail) { Say "Technical detail (for Dennis): $Detail" "DarkYellow" }
    # Show the last few log lines so the screenshot is actionable for Dennis.
    if (Test-Path $logPath) {
        $tail = Get-Content -Path $logPath -Tail 15 -ErrorAction SilentlyContinue
        if ($tail) {
            Write-Host ""
            Write-Host "Last few log lines (for Dennis):" -ForegroundColor DarkYellow
            $tail | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray }
        }
    }
    Write-Host ""
    Say "What to do: take a screenshot of this window and send it to Dennis." "Yellow"
    Say "Nothing on your computer was harmed. You can safely run this again - it picks up where it left off." "Yellow"
    Say "Full log saved at: $logPath" "Yellow"
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

function Test-Command {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

# True only when $dir is a real, usable git working tree (not a half-cloned folder).
function Test-GitRepo {
    param([string]$Dir)
    if (-not (Test-Path (Join-Path $Dir ".git"))) { return $false }
    & git -C $Dir rev-parse --is-inside-work-tree 2>$null | Out-Null
    return ($LASTEXITCODE -eq 0)
}

# Refresh PATH inside this session so freshly-installed tools are found.
function Update-SessionPath {
    $machine = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $user = [Environment]::GetEnvironmentVariable("Path", "User")
    $env:Path = @($machine, $user | Where-Object { $_ }) -join ";"
}

# Install one app via winget if a probe command is missing.
function Install-WingetApp {
    param(
        [string]$Label,       # human name, e.g. "Git"
        [string]$ProbeCmd,    # command that proves it's installed, e.g. "git"
        [string]$WingetId,    # winget package id
        [string]$Source = "winget"
    )

    Update-SessionPath
    if ($ProbeCmd -and (Test-Command $ProbeCmd)) {
        Say "$Label is already installed - skipping." "Green"
        return
    }

    Say "Installing $Label ..."
    $wingetArgs = @(
        "install", "--id", $WingetId, "--source", $Source,
        "--exact", "--silent",
        "--accept-package-agreements", "--accept-source-agreements"
    )
    # Capture output so we can recognize benign "already installed" states, and log it.
    $output = & winget @wingetArgs 2>&1 | ForEach-Object { Write-Log "winget: $_"; $_ }
    $code = $LASTEXITCODE
    $outText = ($output | Out-String)

    # winget returns non-zero for several harmless states. Treat these as success.
    $benign = $false
    foreach ($marker in @(
            "already installed",
            "No available upgrade",
            "No newer package versions",
            "No applicable upgrade",
            "found an existing package")) {
        if ($outText -match [regex]::Escape($marker)) { $benign = $true; break }
    }

    Update-SessionPath

    # Best signal: the command now exists.
    if ($ProbeCmd -and (Test-Command $ProbeCmd)) {
        Say "$Label is ready." "Green"
        return
    }

    if ($code -ne 0) { Write-Log "$Label winget exit code: $code" }

    # No CLI probe (e.g. the Codex desktop app): rely on exit code / benign markers.
    if (-not $ProbeCmd) {
        if ($code -eq 0 -or $benign) {
            Say "$Label is installed and up to date." "Green"
        }
        else {
            Say "$Label could not be installed automatically right now (code $code)." "Yellow"
            Say "No problem - you can install '$Label' later from the Microsoft Store. The Codex command-line tool (next step) is enough to continue." "Yellow"
        }
        return
    }

    # Has a probe but still not found. If winget reported a benign state, the tool may
    # just need a new window for PATH; don't hard-fail on that.
    if ($benign) {
        Say "$Label is installed (it will be ready next time a window opens)." "Yellow"
        return
    }
    Fail-Friendly "installing $Label" "winget exit $code; '$ProbeCmd' still not found"
}

# ---- start -------------------------------------------------------------------

Set-Content -Path $logPath -Value "Sound Healing onboarding started $(Get-Date)" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "   Sound Healing Festival Stockholm - website onboarding" -ForegroundColor Magenta
Write-Host "==========================================================" -ForegroundColor Magenta
Say "Hi Mateusz! This sets up everything you need. Sit back - it takes a few minutes." "White"
Write-Host ""
Say "Two things to know:" "White"
Say "  1. This is SAFE to run as many times as you like - it skips whatever is already done." "White"
Say "  2. Some steps are quiet for up to a minute. If it looks frozen, it is still working -" "White"
Say "     please do NOT close this window." "White"
Say "Log file: $logPath" "DarkGray"

# 1) Preflight: Windows + winget
Step "Checking your computer"

if ($PSVersionTable.PSVersion.Major -lt 5) {
    Fail-Friendly "checking PowerShell" "PowerShell $($PSVersionTable.PSVersion) is too old"
}

Update-SessionPath
if (-not (Test-Command "winget")) {
    Say "The Windows installer tool (winget) was not found." "Red"
    Say "This usually means Windows needs an update, or 'App Installer' from the Microsoft Store." "Yellow"
    Fail-Friendly "checking winget" "winget not on PATH"
}
Say "Your computer is ready." "Green"

# 2) Toolchain
Step "Installing the website tools (Git and Node)"
Install-WingetApp -Label "Git" -ProbeCmd "git" -WingetId "Git.Git"
Install-WingetApp -Label "Node.js (LTS)" -ProbeCmd "node" -WingetId "OpenJS.NodeJS.LTS"

# 3) Codex surfaces
Step "Installing Codex (your AI assistant)"
# Codex desktop app from the Microsoft Store (no CLI probe available -> trust winget).
Say "Installing the Codex app from the Microsoft Store." "White"
Say "This is the slowest step and can be quiet for up to a minute - please wait, it is working." "Yellow"
Install-WingetApp -Label "Codex app" -ProbeCmd "" -WingetId "9PLM9XGG6VKS" -Source "msstore"

# Codex command-line tool (official installer).
Update-SessionPath
if (Test-Command "codex") {
    Say "Codex command-line tool already installed - skipping." "Green"
}
else {
    Say "Installing Codex command-line tool ..."
    try {
        $env:CODEX_NON_INTERACTIVE = "1"
        Invoke-RestMethod "https://chatgpt.com/codex/install.ps1" | Invoke-Expression
        Update-SessionPath
        if (Test-Command "codex") {
            Say "Codex command-line tool installed." "Green"
        }
        else {
            Say "Codex command-line tool installed (will be on PATH next time a window opens)." "Yellow"
        }
    }
    catch {
        Fail-Friendly "installing the Codex command-line tool" $_.Exception.Message
    }
}

# 4) Download the website
Step "Downloading the website files"
Update-SessionPath
if (-not (Test-Command "git")) {
    Fail-Friendly "downloading the website" "git not found after install"
}

if ($RepoUrl -match "OWNER/REPO") {
    Fail-Friendly "downloading the website" "RepoUrl placeholder not set (DENNIS: set -RepoUrl)"
}

# Clone fresh into a temp folder, then move it into place. This way an interrupted
# clone can never leave a broken folder that blocks the next run.
function Invoke-FreshClone {
    param([string]$Dest)

    $tmp = "$Dest.tmp-clone"
    if (Test-Path $tmp) {
        Write-Log "Removing stale temp clone: $tmp"
        Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    }

    $attempts = 0
    while ($attempts -lt 2) {
        $attempts++
        Say "Downloading the website... (this is usually quick; please wait)" "White"
        & git clone --progress --branch $Branch --single-branch $RepoUrl $tmp 2>&1 |
            ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray; Write-Log "git: $_" }
        $cloneCode = $LASTEXITCODE

        if ($cloneCode -eq 0 -and (Test-Path (Join-Path $tmp ".git"))) {
            Move-Item -Path $tmp -Destination $Dest
            return
        }

        Write-Log "clone attempt $attempts failed (exit $cloneCode)"
        if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue }
        if ($attempts -lt 2) {
            Say "That download did not complete - trying once more..." "Yellow"
            Start-Sleep -Seconds 3
        }
    }
    Fail-Friendly "downloading the website" "git clone failed after 2 attempts (last exit $cloneCode)"
}

if (Test-GitRepo $TargetDir) {
    # Valid existing copy -> update it. Never delete; he may have local work.
    Say "Website folder already exists - updating it instead." "Green"
    & git -C $TargetDir pull --ff-only 2>&1 | ForEach-Object { Write-Log "git: $_" }
    if ($LASTEXITCODE -ne 0) {
        Say "Could not auto-update (that's OK - your local copy is kept as-is)." "Yellow"
        Write-Log "git pull non-zero exit: $LASTEXITCODE"
    }
    else {
        Say "Website is up to date." "Green"
    }
}
else {
    if (Test-Path $TargetDir) {
        # Folder exists but is not a valid repo (e.g. a cancelled earlier run).
        # It holds no real work yet, so clean it and start fresh.
        Say "Found an incomplete earlier copy - cleaning it up and starting fresh." "Yellow"
        Write-Log "Removing incomplete target: $TargetDir"
        Remove-Item -Recurse -Force $TargetDir -ErrorAction SilentlyContinue
        if (Test-Path $TargetDir) {
            Fail-Friendly "downloading the website" "could not remove incomplete folder $TargetDir (is a window or editor open in it?)"
        }
    }
    Say "Saving the website to: $TargetDir"
    Invoke-FreshClone -Dest $TargetDir
    Say "Website downloaded." "Green"
}

# 5) Install dependencies + quick sanity check
Step "Getting the website ready (this is the longest step)"
Update-SessionPath
if (-not (Test-Command "npm")) {
    Fail-Friendly "preparing the website" "npm not found after Node install"
}

Push-Location $TargetDir
try {
    Say "Installing components ..."
    & npm install 2>&1 | ForEach-Object { Write-Log "npm: $_" }
    if ($LASTEXITCODE -ne 0) {
        Fail-Friendly "installing components" "npm install exit $LASTEXITCODE"
    }

    Say "Running a quick health check ..."
    & npm run check 2>&1 | ForEach-Object { Write-Log "check: $_" }
    if ($LASTEXITCODE -ne 0) {
        # Non-fatal: onboarding can still proceed; just inform.
        Say "Health check reported issues - the onboarding assistant will help sort these out." "Yellow"
    }
    else {
        Say "Health check passed." "Green"
    }

    # Packaging check: 'check' can pass while a static build fails (prerender /
    # adapter / asset issues). Surface that here, not later at deploy time.
    Say "Packaging the website (final check) ..."
    & npm run build 2>&1 | ForEach-Object { Write-Log "build: $_" }
    if ($LASTEXITCODE -ne 0) {
        Say "The packaging step reported issues - the onboarding assistant will help sort these out." "Yellow"
    }
    else {
        Say "Packaging check passed." "Green"
    }
}
finally {
    Pop-Location
}

# 6) Handoff
Step "All set!"
Say "Everything is installed and the website is on your computer." "Green"
Write-Host ""
Write-Host "  NEXT STEP - this is the only thing you need to do:" -ForegroundColor Magenta
Write-Host ""
Write-Host "     In the window that opens, type:  onboard me" -ForegroundColor White
Write-Host "     then press Enter." -ForegroundColor White
Write-Host ""
Say "If a Codex window does not open, open the 'Codex' app from your Start menu," "Yellow"
Say "choose the folder '$TargetDir', make sure 'Local' is selected, and type: onboard me" "Yellow"
Write-Host ""

# Launch the Codex CLI in the repo so he lands ready to type "onboard me".
Update-SessionPath
if (Test-Command "codex") {
    try {
        Start-Process -FilePath "cmd.exe" `
            -ArgumentList "/k", "cd /d `"$TargetDir`" && echo Type:  onboard me   then press Enter && codex" `
            | Out-Null
        Say "Opening Codex for you ..." "Green"
    }
    catch {
        Say "Could not auto-open Codex - please open the Codex app yourself (see above)." "Yellow"
        Write-Log "codex launch failed: $($_.Exception.Message)"
    }
}
else {
    Say "Open the Codex app from your Start menu to continue (see the steps above)." "Yellow"
}

Write-Host ""
Read-Host "Onboarding finished. Press Enter to close this window"
