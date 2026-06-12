---
name: soundhealing-deploy
description: Go-live wizard for Mateusz, the non-technical product owner. Use when the user says "deploy my site", "put it online", "go live", "publish the website", "connect a host", or asks how to make the site public. Interviews him about domain and any existing hosting accounts, guides creating a free GitHub account and connecting a static host (push-to-deploy), writes a repeatable docs/DEPLOY.md, logs the request, and clearly flags steps that need Dennis.
---

# Sound Healing Deploy (Go-Live Wizard)

## Purpose

Get the site from Mateusz's laptop onto the public internet, safely, with as little
technical burden on him as possible. This is a static SvelteKit site
(`@sveltejs/adapter-static`): `npm run build` produces a `build/` folder of plain
files that any static host can serve.

The chosen model is **GitHub-backed push-to-deploy** so that:

- His changes are backed up off his laptop.
- Every change is versioned and visible to Dennis.
- Future deploys happen automatically when changes are saved.

Mateusz has an OpenAI/ChatGPT subscription but (at first run) **no GitHub account**.
Creating one is part of this wizard, done only when he is ready to go live.

Run this as a calm, one-step-at-a-time conversation. Translate everything into plain
language. Flag clearly whenever a step needs Dennis (DNS, domain registrar, paid
plans, anything irreversible).

## Step 1 - Understand what he already has

Ask these as simple questions, one or two at a time. Record answers to reuse later:

1. "Do you already own a web address (domain) for this, like
   soundhealingfestivalstockholm.com? If yes, where did you buy it?"
2. "Is the site currently live anywhere today? If so, where is it hosted?"
3. "Do you already have an account with any website host - Netlify, Cloudflare,
   Vercel, or similar?"
4. "Do you have a GitHub account?" (Most likely no.)

Based on answers, pick the simplest path. If he already has a host account, prefer
connecting that. Otherwise recommend a free, beginner-friendly static host
(Cloudflare Pages or Netlify) with Git push-to-deploy.

## Step 2 - Confirm the plan in plain language

Before doing anything, tell him the plan in 3-4 sentences, for example:

> "Here's the plan: we'll create a free GitHub account (a safe place that stores your
> website), connect it to a free hosting service, and from then on your approved
> changes go live automatically. I'll guide each step. Anything risky, I'll flag for
> Dennis."

Get a yes before proceeding.

## Step 3 - Create the GitHub account (one-time)

Guide him through, in his browser:

1. Go to github.com and sign up (free). Use his work email.
2. Pick a username (suggest something simple and professional).
3. Verify the email.
4. Tell Dennis the username so Dennis can add him as a collaborator on the repo.

> FLAG FOR DENNIS: add Mateusz as a collaborator with write access on the shared
> repo (`dennisdyallo/soundhealingfestival`).

Do not block forever waiting; if collaborator access is not ready, pause here and
tell Mateusz you'll continue once Dennis confirms.

### Set up push access (so his work syncs to the shared repo)

Once Dennis confirms collaborator access:

1. Confirm the working copy points at the shared repo:
   `git -C <repo> remote -v` should show `origin` = the shared repo.
2. Confirm Git Credential Manager is the credential helper:
   `git config --get credential.helper` should contain `manager`. (It ships with
   the Git we installed and needs no setup.)
3. Trigger the one-time browser sign-in by making the first authenticated push for
   him: a tiny no-op or the first real change. GCM opens a browser; he clicks
   "Authorize" on GitHub once, and the credential is stored securely after that.
4. Verify the push landed (the commit appears on GitHub). If the push is rejected
   for auth reasons, re-run the GCM sign-in; if it is rejected for access reasons,
   flag Dennis (collaborator invite may be pending).

Do NOT use Personal Access Tokens or SSH keys - GCM's browser sign-in is the only
auth path for Mateusz.

## Step 4 - Make sure the site builds

Before connecting a host, confirm the production build works:

1. Run `npm run build`.
2. If it succeeds, explain: "Your website was packaged successfully."
3. If it fails, translate the issue, try the obvious safe fix if clearly in scope,
   otherwise flag for Dennis. Do not push a broken build live.

## Step 5 - Connect the host (push-to-deploy)

Pick the path from Step 1. For a fresh setup, recommend Cloudflare Pages or Netlify.
Guide him through their website (no command line needed for him):

Settings both hosts need for this repo:

- **Framework preset:** SvelteKit (or "None"/static if asked).
- **Build command:** `npm run build`
- **Build output / publish directory:** `build`
- **Node version:** current LTS (set via an env var if the host asks).

Steps (generic):

1. Sign in to the host with his new GitHub account.
2. "Add a new site / project" -> "Import from GitHub" -> pick this repo.
3. Enter the build command and output directory above.
4. Start the first deploy and wait for the green "published" state.
5. Open the temporary host URL together and confirm the site looks right.

## Step 6 - Custom domain (only if he wants it now)

If he owns a domain and wants to use it:

1. In the host, add the custom domain.
2. The host will show DNS records to set at his domain registrar.

> FLAG FOR DENNIS: DNS changes and registrar access are best handled or double-checked
> by Dennis. Summarize the exact records the host asked for and hand off.

Do not guess registrar settings. If unsure, stop and flag.

## Step 7 - Write it down and log it

1. Create or update `docs/DEPLOY.md` capturing the ACTUAL choices made:
   - Host name and account used.
   - Build command and output dir.
   - Repo + branch that auto-deploys.
   - Custom domain + DNS records (if any).
   - How to trigger a redeploy (normally: just save/commit a change).
   - What still needs Dennis.
2. Create a request-log entry (`REQ-YYYYMMDD-###`) per `AGENTS.md`, status
   `completed` or `blocked`.
3. If the live/public surface or metadata changed, update `COMPARISON.md`.

## Step 8 - Teach the new normal (trunk-based daily loop)

Explain the day-to-day flow in plain language:

1. Mateusz asks for a change; you make it with `$soundhealing-owner-ops`, run the
   safety checks, and show him the result.
2. When he approves, you commit to `main` and push.
3. The host rebuilds and the change is live in about a minute or two.
4. Every change is backed up on GitHub, and Dennis can review the history any time
   (review is after-the-fact, not a gate - so keep changes small and checked).

### Rollback (two paths - prefer the fast one)

If a live change looks wrong:

- **Fast path (recommended): roll back in the host dashboard.** Cloudflare Pages and
  Netlify keep previous deploys; one click restores the last good version
  immediately, while you fix the source. Tell Mateusz this is the "undo live" button.
- **Source fix: revert the commit.** Revert the offending commit on `main` and push;
  the host redeploys the corrected version. This keeps GitHub and the live site in
  sync. Requires working authenticated Git (see Step 3 push access).

Always record a rollback in the request log (status `reverted`) with the reason.

## Guardrails

- Never push a failing `npm run build` to a live host.
- Never change DNS or registrar settings without flagging Dennis.
- Confirm event facts, ticket links, dates, and prices are correct BEFORE going
  public; if any conflict, stop and ask for the exact truth.
- Keep all `AGENTS.md` safety, request-log, and protected-file rules in force.
- Costs: keep to free tiers unless Mateusz explicitly approves a paid plan.
- If Mateusz writes `/DevMode`, switch to technical language for Dennis but keep all
  safety rules active.

## References

- `README.md` - build output and adapter-static notes.
- `docs/RELEASE_CHECKLIST.md` - release, parity, deploy, rollback gates.
- `AGENTS.md` - safety and request-log rules.
- `.codex/skills/soundhealing-owner-ops/SKILL.md` - how scoped changes are made.
