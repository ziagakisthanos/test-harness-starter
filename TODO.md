# TODO

educational/demo-only, no danaos code or confirmed stack involved. finalizing today.

## 1. personal write-up (README interview notes)

- [x] CI run link — https://github.com/ziagakisthanos/test-harness-starter/actions/runs/38273173664 (6/6 passed)
- [x] AI usage paragraph — filled in README using actual session history (delete hover fix, whitespace-reject assertion upgrade)

## 2. harness-building practice (done today)

- [x] @smoke / @regression tags on all six tests + `npm run test:smoke` / `npm run test:regression`
- [x] test data builders — tests/testData.js, uniqueTodo(label), all six tests refactored
- [x] cache playwright browsers in CI (actions/cache@v4, keyed on playwright version) — committed, unverified until pushed + a run completes

## 3. production-readiness gaps (checklist, already named in README)

- [ ] controlled test environment instead of public TodoMVC demo
- [ ] data separated from test logic (builders/factories)
- [ ] secrets via CI secrets store, never hardcoded
- [ ] test types beyond UI E2E: API/contract, maybe visual regression
- [ ] flaky-test tracking: retries 0 (diagnosis) vs retries 2 + reporting on pass-after-retry

## 4. minor

- local node v20.20.0 vs recommended 22 LTS. CI pins node 22 via setup-node, no CI impact, note only if asked.

## 5. interview-prep

- [ ] rehearse 5-min demo: plan → one test → fixture → report → failure/trace → CI run
- [ ] rehearse 90-sec personal contribution pitch, in english
- [ ] go through the six guidelines.pdf practice questions out loud
