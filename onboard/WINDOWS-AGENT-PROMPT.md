# Windows troubleshooting prompt (for Dennis to paste into Codex on Windows)

Use this when running Codex **on the Windows machine** to debug and improve
`onboard/onboard.ps1` in a real Windows environment (the author cannot run
Windows/winget/PowerShell, so this work has to happen on-device).

Paste everything below the line into Codex, running in this repo on Windows.

---

You are working on a Windows machine, inside the `soundhealingfestival` repo. Your job
is to **test, troubleshoot, and improve `onboard/onboard.ps1`** — the one-time
onboarding installer for a **non-technical** website owner named Mateusz. Treat this as
a careful, owner-safe engineering task, not a quick hack.

## Context you must respect

- The script is launched by `onboard/Onboard-Soundhealing.cmd`, which downloads the
  script **pinned to the git tag `v1`** (not `main`) and runs it with
  `powershell -ExecutionPolicy Bypass`. Integrity depends on that tag pin — do not
  change the script to fetch from a moving branch.
- Target audience is non-technical. Every user-facing message must be plain language,
  reassuring, and tell them what to do next. No stack traces in the face.
- The script must be **idempotent** (safe to run repeatedly) and **self-healing**
  (an interrupted/cancelled run must not block the next run).
- Auth model for later Git pushes is **Git Credential Manager** only (bundled with
  Git for Windows). Never introduce Personal Access Tokens or SSH keys.
- It installs: Git (`Git.Git`), Node LTS (`OpenJS.NodeJS.LTS`), the Codex desktop app
  (winget `--source msstore --id 9PLM9XGG6VKS`), and the Codex CLI
  (`irm https://chatgpt.com/codex/install.ps1 | iex` with `CODEX_NON_INTERACTIVE=1`).
- It clones the public repo to `%USERPROFILE%\soundhealing-site`, runs
  `npm install` + `npm run check` + `npm run build`, then opens Codex and tells the
  user to type `onboard me`.
- A full transcript is written to `Documents\soundhealing-onboard-log.txt`.

## Known issues already addressed (verify they actually hold on Windows)

1. A cancelled run used to leave a partial `soundhealing-site` folder that blocked the
   next `git clone`. The script now clones into a temp folder and moves it into place,
   and auto-cleans an incomplete (non-git) target. Confirm this works after you
   deliberately Ctrl-C mid-clone.
2. winget "already installed / no upgrade" was reported as a scary failure. The script
   now treats those as success. Confirm the Codex app and re-runs report green.
3. The Microsoft Store install looks frozen (no output). The script now warns it is
   slow. Confirm the messaging appears and the step completes.

## What to do

1. **Read** `onboard/onboard.ps1` end to end and summarize its flow back to me.
2. **Static check:** run `powershell -NoProfile -Command "$null=[System.Management.Automation.Language.Parser]::ParseFile('onboard/onboard.ps1',[ref]$null,[ref]$errs);$errs"`
   and fix any parse errors.
3. **Dry/real run safely.** Prefer a throwaway location: run with a custom target, e.g.
   `powershell -ExecutionPolicy Bypass -File onboard/onboard.ps1 -TargetDir "$env:TEMP\sh-onboard-test"`.
   This avoids touching the real `soundhealing-site` folder. Capture the console output
   and `Documents\soundhealing-onboard-log.txt`.
4. **Adversarial tests** (the important part). Reproduce and confirm graceful behavior:
   - Run it twice back-to-back (idempotency).
   - Cancel (Ctrl-C) during the clone, then run again (self-healing).
   - Run when Git/Node/Codex are already installed (benign winget states → green).
   - Run with no network briefly (clear, friendly failure + retry).
   - Run when the target folder exists but is empty / partial / a valid repo.
5. **Verify the winget IDs and behaviors are current** on this Windows build:
   - `winget show Git.Git`, `winget show OpenJS.NodeJS.LTS`,
     `winget show --source msstore --id 9PLM9XGG6VKS`.
   - Confirm the msstore Codex app id still resolves; if Microsoft changed it, report
     the new id — do not silently swap it.
   - Confirm `git config --get credential.helper` ends up containing `manager`.
6. **Confirm PATH handling.** After installing Node/Git/Codex in one session, confirm
   the script's PATH refresh actually finds `git`, `node`, `npm`, `codex` without a new
   window — and if not, improve it.
7. **Confirm the handoff** actually opens Codex in `%USERPROFILE%\soundhealing-site`
   and that typing `onboard me` triggers the `soundhealing-onboarding` skill.

## Constraints on your changes

- Keep edits **minimal and scoped**; preserve the structure, the tag-pin model, and the
  plain-language tone.
- Do not weaken safety (no PATs/SSH, no fetching from a branch, no destructive deletes
  outside the managed `soundhealing-site` / `*.tmp-clone` folders).
- Every new failure path must use the existing `Fail-Friendly` helper (plain language +
  log tail).

## Deliverables (report back to me)

1. A short findings list: what worked, what broke, exact error text + log excerpts.
2. The corrected `onboard/onboard.ps1` (show me the diff).
3. Any winget id / URL / behavior changes you discovered.
4. The exact commands you ran and their results for the adversarial tests above.
5. A note on anything that still needs Dennis (e.g. signing, SmartScreen, registrar).

**Do not** commit, push, or move the `v1` tag yourself. After I review your diff, I will
commit and re-pin `v1` so the launcher picks up the fix.
