@echo off
setlocal

REM ============================================================================
REM  Sound Healing Festival Stockholm - one-click onboarding (Windows)
REM
REM  Mateusz: just double-click this file. If Windows shows a blue
REM  "Windows protected your PC" box, click "More info" then "Run anyway".
REM
REM  DENNIS: set the values below before sending. The executed script is pinned to
REM  an immutable git TAG (not a moving branch) so the code that runs on Mateusz's
REM  machine cannot change underneath him. Cut/refresh the tag before sending:
REM      git tag -fa v1 -m "onboard v1" && git push -f origin v1
REM  and bump ONBOARD_TAG here when you ship a new onboarding script.
REM    ONBOARD_TAG = immutable tag that holds the onboard/onboard.ps1 to RUN
REM    REPO_URL    = the public repo to clone (the live site source)
REM    BRANCH      = branch to clone for the working copy (e.g. main)
REM ============================================================================

set "ONBOARD_TAG=v1"
set "ONBOARD_URL=https://raw.githubusercontent.com/dennisdyallo/soundhealingfestival/%ONBOARD_TAG%/onboard/onboard.ps1"
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
