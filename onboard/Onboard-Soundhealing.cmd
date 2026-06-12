@echo off
setlocal

REM ============================================================================
REM  Sound Healing Festival Stockholm - one-click onboarding (Windows)
REM
REM  Mateusz: just double-click this file. If Windows shows a blue
REM  "Windows protected your PC" box, click "More info" then "Run anyway".
REM
REM  DENNIS: set the three values below to the PUBLIC GitHub repo before sending.
REM    ONBOARD_URL = raw URL to onboard/onboard.ps1 (always-latest)
REM    REPO_URL    = the public repo to clone
REM    BRANCH      = branch to clone (e.g. main)
REM ============================================================================

set "ONBOARD_URL=https://raw.githubusercontent.com/dennisdyallo/soundhealingfestival/main/onboard/onboard.ps1"
set "REPO_URL=https://github.com/dennisdyallo/soundhealingfestival"
set "BRANCH=main"

echo.
echo  Downloading the latest onboarding helper...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$dst = Join-Path $env:TEMP 'soundhealing-onboard.ps1';" ^
  "try { Invoke-RestMethod '%ONBOARD_URL%' -OutFile $dst } catch { Write-Host 'Could not download the onboarding file. Check your internet connection, then try again. If it keeps failing, send this screenshot to Dennis.' -ForegroundColor Red; Read-Host 'Press Enter to close'; exit 1 };" ^
  "& $dst -RepoUrl '%REPO_URL%' -Branch '%BRANCH%'"

endlocal
