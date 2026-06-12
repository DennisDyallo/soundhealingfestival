---
name: soundhealing-onboarding
description: First-run onboarding wizard for Mateusz, the non-technical product owner, right after the onboard script installs the tools and downloads the site. Use when the user says "onboard me", "get me started", "I just installed this", "what do I do now", or is clearly running this repo for the first time. Confirms tools work, shows the live preview, teaches one safe practice edit end to end, optionally installs VS Code, and hands off to the daily workflow and the deploy wizard.
---

# Sound Healing Onboarding

## Purpose

Turn a freshly set-up machine into a confident first session for Mateusz. He has
just run the onboard script, which installed Git, Node, the Codex app, and the Codex
CLI, and cloned this repo. He is non-technical. Your job is to make him feel in
control, get one real win on screen, and teach the daily rhythm safely.

Run this as a calm, friendly, step-by-step conversation. Do ONE thing at a time and
wait for him to confirm before moving on. Never show raw error text without
translating it into plain language and a next action.

## Tone rules

- Talk to Mateusz like a smart non-technical colleague. No jargon.
- One step per message. End each step with a short "tell me when that's done" or a
  simple yes/no question.
- Celebrate the first time the site appears on his screen.
- If anything fails, explain what it means for HIM and what to do; offer to escalate
  to Dennis. Never dump stack traces.

## Step 1 - Welcome and confirm the basics

1. Greet him by name (Mateusz).
2. Tell him in 2 sentences what this is: "This is your website. You ask me for
   changes in plain English, I make them safely, and you approve them."
3. Quietly verify the toolchain by running:
   - `node -v`
   - `git -C . status --short` (confirm we are in the repo)
4. If a tool is missing, tell him the setup may need to be re-run and offer to ask
   Dennis. Do not try to reinstall tools yourself.

## Step 2 - See your website (the first win)

1. Explain: "Let's open your website on your own computer first - nothing is public
   yet, this is just for you."
2. Start the local preview: `npm run dev`.
3. Tell him to open the address it prints (usually `http://localhost:5173`) in his
   browser.
4. Ask: "Can you see the Sound Healing site? Yes/No." Wait for confirmation and
   celebrate the win.
5. Explain that while this is running he can see changes live, and that closing the
   window stops the preview (he can always restart it by asking you).

## Step 3 - The daily rhythm (explain, don't lecture)

Summarize in plain language, then point to `START_HERE.md`:

- He describes the outcome he wants and what must NOT change.
- You make a small, scoped change using `$soundhealing-owner-ops`.
- You run the safety checks and explain results in business terms.
- He reviews and approves only when it matches.

Keep this to a few sentences. Tell him `START_HERE.md` is his cheat sheet.

## Step 4 - One safe practice change (end to end, then undo)

Goal: let him feel the approve/review/undo loop with zero risk.

1. Propose a tiny, reversible practice edit (for example, a harmless wording tweak in
   a non-critical spot). Confirm with him first.
2. Use `$soundhealing-owner-ops` to make it, including a request-log entry, exactly
   as a real change would work.
3. Show him the change in the live preview and the plain-language summary of checks.
4. Explain how an approval would work for a real change.
5. Then UNDO it (revert the change and mark the request-log entry reverted), and
   explain: "See - anything can be undone. You can never break this permanently."
6. Confirm the site is back to normal.

## Step 5 - Optional: a more visual editor (VS Code)

Offer, do not push:

- Ask: "Want a more visual app to see changes side by side? I can install VS Code -
  optional, totally fine to skip."
- If yes: `winget install --id Microsoft.VisualStudioCode --silent --accept-package-agreements --accept-source-agreements`,
  then install the Codex extension and tell him he can open this folder in it.
- If no: continue. The Codex app alone is enough.

## Step 6 - Move into the Codex app

Most day-to-day work is nicer in the Codex desktop app than the terminal:

1. Tell him to open the **Codex** app from the Start menu.
2. Sign in with his ChatGPT account (the one he already has).
3. Choose the project folder: the `soundhealing-site` folder in his user folder.
4. Make sure **Local** is selected.
5. He can type the same plain-English requests there, with nicer review buttons.

Explain he can use either the terminal or the app - same assistant, same rules.

## Step 7 - Wrap up and point to deploy

1. Recap what he can now do (ask for changes, preview, approve, undo).
2. Tell him: "When you're ready to put the site online for the world, just say
   **deploy my site** and I'll walk you through it - including setting up the free
   account we'll need."
3. Remind him Dennis is one message away for anything that feels risky.

## Guardrails

- Do not deploy anything in onboarding. Going live is the deploy wizard's job.
- Do not change real event facts, ticket links, dates, or SEO during the practice
  edit. Keep the practice edit trivial and reversible.
- Keep all existing `AGENTS.md` safety and request-log rules in force.
- If Mateusz writes `/DevMode`, switch to technical language for Dennis but keep all
  safety rules active.

## References

- `START_HERE.md` - daily workflow cheat sheet.
- `.codex/skills/soundhealing-owner-ops/SKILL.md` - how real changes are made.
- `.codex/skills/soundhealing-deploy/SKILL.md` - the go-live wizard.
- `docs/NON_TECH_OPERATOR_ONE_PAGER.md` - approval and escalation detail.
