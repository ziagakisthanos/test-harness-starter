# Missing parts / next steps

Working list of what this project still lacks, based on our review session. Scope stays
educational/demo-only — no Danaos code or confirmed stack is involved.

## 1. Personal write-up (blocks the interview notes, not the code)

In `README.md` → "Σημειώσεις για τη συνέντευξη":
- **AI usage and review**: fill in which `AI_PROMPTS.md` prompts you used when the six tests
  were first written, what the AI proposed, and what you corrected before accepting it
  (locator choice, an assertion you tightened, etc.). This has to come from your own memory
  of that session — it can't be reconstructed afterward.
- **CI run**: drop in the actual GitHub Actions run URL now that it's green and pushed.

## 2. Harness-building with AI, not just test-writing with AI

The exercise materials (`AI_PROMPTS.md`, `guidelines.pdf`) scope AI usage narrowly to writing
test scenarios, diagnosing failures, and explaining code. The Dockerfile, `compose.yaml`,
`playwright.config.js`, npm scripts, and CI workflow were handed to us pre-built — we only ran
and verified them, never used AI to draft or modify them.

The real job scope ("organizing tests and their associated data, developing a test harness,
integrating into CI/CD") is bigger than that. Still to practice, with AI drafting and you
reviewing before commit — the same review discipline as AI-written tests:
- Split tests into `@smoke` / `@regression` tags and add an npm script that runs just the
  smoke subset (fast signal on every push vs. full suite on merge to main).
- Organize test data: move hardcoded strings like `'Prepare interview demo'` into named
  fixtures/builders so the same scenario can run with different inputs.
- Propose a change to the CI workflow or Dockerfile yourself (e.g. caching Playwright
  browsers between CI runs) and have it reviewed before accepting.

## 3. Production-readiness gaps (already named in the README, repeated here as a checklist)

- [ ] Controlled test environment instead of the public TodoMVC demo (e.g. a seeded test
      database via docker-compose, not shared/production data).
- [ ] Data separated from test logic (test data builders / factories).
- [ ] Secrets handled via CI secrets store, never hardcoded.
- [ ] Additional test types beyond UI E2E: API/contract tests, possibly visual regression.
- [ ] Flaky-test tracking: move from `retries: 0` (diagnosis mode) to `retries: 2` +
      reporting on pass-after-retry, instead of silently trusting green.

## 4. Minor, low-priority

- Local Node is v20.20.0; README/guidelines recommend 22 LTS. CI pins Node 22 explicitly via
  `setup-node`, so this doesn't affect CI — only worth a note if asked about environment drift
  between local dev and CI.

## 5. Interview-prep (process, not code)

- [ ] Rehearse the 5-minute demo: plan → one test → fixture → report → failure/trace → CI run.
- [ ] Rehearse the 90-second personal contribution pitch, in English.
- [ ] Go through the six practice questions from `guidelines.pdf` (harness/runner, test
      independence, AI-review checklist, test-vs-app-vs-environment diagnosis, what
      Docker/CI buys a team, what changes with login/controlled data) out loud, not just
      silently reviewed.
