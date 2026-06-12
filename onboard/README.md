# Onboarding wizard (for Dennis)

Cold-start installer that takes Mateusz from a clean Windows machine to a working
Codex + repo setup, then hands off to the in-repo onboarding skill.

## Files

- `Onboard-Soundhealing.cmd` — the double-click file Mateusz runs. Downloads the
  latest `onboard.ps1` and runs it.
- `onboard.ps1` — installs Git, Node LTS, the Codex app, and the Codex CLI; clones the
  public repo; runs `npm install` + `npm run check`; opens Codex and tells him to type
  `onboard me`.

## Before sending to Mateusz — set these placeholders

Replace `OWNER/REPO` (and the branch if not `main`) in BOTH files:

- `Onboard-Soundhealing.cmd`:
  - `ONBOARD_URL` → `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/onboard/onboard.ps1`
  - `REPO_URL`    → `https://github.com/<owner>/<repo>`
  - `BRANCH`      → e.g. `main`
- `onboard.ps1` default params `-RepoUrl` / `-Branch` (the `.cmd` passes these in, but
  keep the defaults sane in case the script is run directly).

The repo must be **public** so the clone and the raw `onboard.ps1` download work
without a GitHub account.

## How Mateusz receives it

Send him `Onboard-Soundhealing.cmd` (or a link to it). He double-clicks, clicks
"More info → Run anyway" past SmartScreen, waits, then types `onboard me`.

## Manual test before first send (do once)

Run on a clean Windows machine or VM:

1. Double-click `Onboard-Soundhealing.cmd`.
2. Confirm Git, Node, Codex app, and Codex CLI install; repo lands in
   `%USERPROFILE%\soundhealing-site`; `npm install` completes.
3. Confirm Codex opens and `onboard me` triggers the onboarding skill.
4. Re-run the `.cmd` to confirm it is safe and idempotent (updates instead of
   re-installing / re-cloning).

## Notes

- Going live uses GitHub-backed push-to-deploy (Model B). Mateusz creates a free
  GitHub account during the deploy wizard, not during onboarding. Add him as a
  collaborator with write access when he reaches that step.
- The deploy wizard writes `docs/DEPLOY.md` with the actual host choices.
