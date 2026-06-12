# Onboarding wizard (for Dennis)

Cold-start installer that takes Mateusz from a clean Windows machine to a working
Codex + repo setup, then hands off to the in-repo onboarding skill.

## Files

- `Onboard-Soundhealing.cmd` — the double-click file Mateusz runs. Downloads the
  pinned `onboard.ps1` (by tag) and runs it.
- `onboard.ps1` — installs Git, Node LTS, the Codex app, and the Codex CLI; clones the
  public repo; runs `npm install` + `npm run check` + `npm run build`; opens Codex and
  tells him to type `onboard me`.

## Trust model — why the executed script is pinned to a tag

The `.cmd` downloads and runs PowerShell from the internet with
`-ExecutionPolicy Bypass`, and Mateusz is told to click past SmartScreen. That is a
lot of trust, so the script that actually RUNS is pinned to an **immutable git tag**
(`ONBOARD_TAG`, default `v1`), not a moving branch. This means the code that executes
on his machine cannot change underneath him between when you test it and when he runs
it. The working copy he edits afterwards still clones `main` (the live source).

### Cut / refresh the onboarding tag (do this before sending)

```sh
git tag -fa v1 -m "onboard v1" && git push -f origin v1
```

When you ship a changed `onboard.ps1`, bump `ONBOARD_TAG` in the `.cmd` (e.g. `v2`)
and tag that commit. Re-send the `.cmd` (or its link) so Mateusz gets the new pin.

## Before sending to Mateusz — checklist

1. `ONBOARD_TAG` / `ONBOARD_URL` / `REPO_URL` / `BRANCH` in `Onboard-Soundhealing.cmd`
   point at the real public repo and tag (already set to
   `dennisdyallo/soundhealingfestival`, tag `v1`, branch `main`).
2. The tag exists and contains the intended `onboard/onboard.ps1` (see above).
3. The repo is **public** so the clone and the raw `onboard.ps1` download work without
   a GitHub account.

## How Mateusz receives it

Send him `Onboard-Soundhealing.cmd` (or a link to it). He double-clicks, clicks
"More info → Run anyway" past SmartScreen, waits, then types `onboard me`.

## Manual test before first send (do once)

Run on a clean Windows machine or VM:

1. Double-click `Onboard-Soundhealing.cmd`.
2. Confirm Git, Node, Codex app, and Codex CLI install; repo lands in
   `%USERPROFILE%\soundhealing-site`; `npm install` + `npm run build` complete.
3. Confirm Codex opens and `onboard me` triggers the onboarding skill.
4. Re-run the `.cmd` to confirm it is safe and idempotent (updates instead of
   re-installing / re-cloning).

## Collaboration model (consultant + owner)

- **One shared repo**, both as collaborators. Not a fork, not separate repos.
- **Ownership:** stays on Dennis's account for now
  (`dennisdyallo/soundhealingfestival`); transfer to an org or to Mateusz later
  (GitHub keeps redirects, so the wizard URLs stay valid).
- **Trunk-based:** approved change → commit to `main` → push → host auto-deploys.
  Review is **after-the-fact** via GitHub history (no PR gate), so keep changes small
  and rely on the pre-approval checks.
- **Mateusz's access:** he gets a free GitHub account during the deploy wizard
  (Model B), then you add him as a collaborator:

  ```sh
  gh api -X PUT repos/dennisdyallo/soundhealingfestival/collaborators/<his-username> \
    -f permission=push
  ```

  (or the GitHub web UI: Settings → Collaborators → Add people).
- **His push auth:** Git Credential Manager (bundled with Git). First push opens a
  browser sign-in; no PATs or SSH keys. `gh` is your admin tool only.

## Notes

- Going live + push access + rollback are handled by the deploy wizard
  (`.codex/skills/soundhealing-deploy/SKILL.md`), which also writes `docs/DEPLOY.md`
  with the actual host choices.
- Rollback for a bad live change: fast path is the host's "restore previous deploy"
  button; source-of-truth fix is reverting the commit on `main`.
