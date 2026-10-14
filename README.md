# Zone01 AI assisted testing starter

Μικρή εκπαιδευτική άσκηση για test harness, AI review, Docker και CI. Η εφαρμογή είναι το δημόσιο TodoMVC demo του Playwright. Χρειάζεται πρόσβαση στο internet σε κάθε test run. Δεν είναι κώδικας ή επιβεβαιωμένο stack της Danaos.

## Γρήγορη εκκίνηση

Αποσυμπιέστε το ZIP και ανοίξτε τον φάκελο που περιέχει package.json στο VS Code. Χρειάζεστε Node.js 22 LTS ή νεότερη υποστηριζόμενη LTS έκδοση και npm.

```sh
npm ci
npx playwright install chromium
npm test
npm run report
```

Σε Linux, αν λείπουν system dependencies: `npx playwright install --with-deps chromium` (ενδέχεται να ζητηθούν δικαιώματα εγκατάστασης). Το πρώτο κατέβασμα browser μπορεί να πάρει λίγα λεπτά.

Υπάρχουν δύο αρχικά tests. Υλοποιήστε τα υπόλοιπα τέσσερα από το TEST_PLAN.md. Μετά τη δική σας προσπάθεια μπορείτε να συγκρίνετε με reference/additional-tests.js. Για να εκτελέσετε την αναφορά, αντιγράψτε την ως tests/additional.spec.js. Μην κρατήσετε διπλά tests όταν έχετε ήδη δικές σας υλοποιήσεις.

## Σκόπιμο failure και trace

```sh
npm run test:broken
npm run report:broken
```

Το πρώτο command ΠΡΕΠΕΙ να αποτύχει: χρησιμοποιεί εσκεμμένα λάθος placeholder μέσω environment variable, χωρίς να αλλάζει αρχεία. Ανοίξτε το αποτυχημένο test και το trace από το HTML report. Εντοπίστε τη διαφορά από το πραγματικό input και εξηγήστε την. Με `npm test` επιστρέφετε στο κανονικό run. Τα broken reports αποθηκεύονται χωριστά.

## Docker

Ξεκινήστε Docker Desktop ή υπάρχον Docker Engine με Compose.

```sh
docker compose build
docker compose run --rm tests
```

Τα reports βρίσκονται στον τοπικό φάκελο playwright-report. Το image και το npm package είναι κλειδωμένα στην ίδια έκδοση 1.63.0. Το build εγκαθιστά το package με npm ci· το επίσημο image δίνει browsers και system dependencies. Δεν έχουν εκτελεστεί Docker ή hosted CI runs κατά την προετοιμασία του πακέτου· επαληθεύστε τα στο δικό σας περιβάλλον.

## GitHub Actions

Δημιουργήστε ξεχωριστό repository για αυτό το εκπαιδευτικό demo. Στο VS Code κάντε Source Control → Initialize Repository → commit → Publish to GitHub. Επιλέξτε public μόνο αν είναι αποκλειστικά το παρόν δημόσιο demo χωρίς προσωπικά/εταιρικά στοιχεία. Τα standard GitHub-hosted runners είναι δωρεάν για public repositories. Για private repo ελέγξτε τη διαθέσιμη δωρεάν ποσόστωση πριν το run.

Βεβαιωθείτε ότι ανέβηκαν το package-lock.json και το .github/workflows/tests.yml. Το workflow εκτελείται στο push. Ανοίξτε Actions, το run και το playwright-report artifact. Χρησιμοποιούμε hosted runner, όχι δικό σας server. Δεν καλείται AI model μέσα στο CI.

## AI προαιρετικά

Χρησιμοποιήστε Copilot Free στο VS Code ή ήδη διαθέσιμο coding assistant. Τα δωρεάν AI όρια είναι περιορισμένα. Αν εξαντληθούν, συνεχίστε χειροκίνητα με τα παραδείγματα και την τεκμηρίωση, χωρίς αγορά ή API key. Τα prompts βρίσκονται στο AI_PROMPTS.md.

Για συμβατό VS Code με Copilot agent mode μπορείτε προαιρετικά να τρέξετε `npx playwright init-agents --loop=vscode`. Ακολουθήστε τις τρέχουσες οδηγίες Playwright και ζητήστε planner, generator και διάγνωση βήμα βήμα. Ελέγχετε κάθε αλλαγή και κάθε εντολή. Αν η ρύθμιση πάρει πάνω από 10 λεπτά, συνεχίστε με τα prompts χωρίς ειδικούς agents.

## Τι θα προσθέσετε στο README για τη συνέντευξη

- Ποια σενάρια υλοποιήσατε εσείς και τι ελέγχει κάθε test.
- Πού χρησιμοποιήσατε AI και τι διορθώσατε μετά το review.
- Ποιο failure διαγνώσατε και με ποιο στοιχείο του trace.
- Ποιες εντολές τρέξατε πραγματικά, πού και με τι αποτέλεσμα.
- Τι θα βελτιώνατε για πραγματική εφαρμογή: ελεγχόμενο test environment, δεδομένα, secrets, περισσότερα είδη tests.

Οι οδηγίες και ο αρχικός κώδικας παρέχονται για μελέτη. Οι όροι χρήσης του Playwright και των υπόλοιπων εργαλείων ισχύουν ξεχωριστά.

## Σημειώσεις για τη συνέντευξη

**Σενάρια και tests.** Και τα έξι σενάρια του TEST_PLAN.md υλοποιημένα στο `tests/todo.spec.js`, πάνω στο κοινό `todo` fixture:
- `adds a todo and clears the input` — στέλνει κείμενο, ελέγχει το text του item, ότι το checkbox ξεκινά unchecked και ότι το input αδειάζει.
- `marks a todo as completed` — check στο checkbox, ελέγχει `toBeChecked()` και την κλάση `completed` στο item.
- `deletes a todo and leaves the other one` — προσθέτει δύο items, διαγράφει το ένα μέσω hover + delete button, ελέγχει ότι μένει μόνο το άλλο.
- `filters active and completed and all todos` — ένα completed, ένα active, ελέγχει τις τρεις λίστες μέσω των links Active/Completed/All.
- `rejects whitespace only todo` — Enter με μόνο κενά, ελέγχει ότι δεν προστέθηκε δεύτερο item.
- `persists todo state after reload` — προσθήκη + completion + `page.reload()`, ελέγχει ότι διατηρούνται κείμενο και κατάσταση.

**AI usage και review.** Χρησιμοποιήθηκαν τα prompts Σχεδιασμός και Υλοποίηση από το AI_PROMPTS.md, ένα σενάριο τη φορά. Σε αρκετά σενάρια (filter, reject-whitespace, persist-reload) το AI έλεγχε πρώτα το πραγματικό DOM ή behavior του TodoMVC (μέσω αυτόνομου script) πριν προτείνει πλάνο, αντί να μαντέψει locators.

Στο delete test το AI έλεγξε πρώτα το πραγματικό DOM (outerHTML ενός todo item) ώστε ο locator να βασίζεται σε στοιχεία και όχι σε υπόθεση — βρέθηκε `aria-label="Delete"`. Αυτό όμως δεν αποκάλυψε ότι το κουμπί είναι hidden μέχρι hover (css, όχι DOM structure): το πρώτο run απέτυχε με timeout. Η αιτία εντοπίστηκε από το πραγματικό error log (actionability timeout, όχι "element not found"), η διόρθωση (`row.hover()` πριν το click) επαληθεύτηκε με re-run πριν γίνει αποδεκτή.

Στο whitespace-reject test το AI πρότεινε απλό `toHaveCount(0)` σε άδεια λίστα· η δική μου υλοποίηση ήταν πιο αυστηρή — προσθέτει πρώτα ένα πραγματικό todo και μετά ελέγχει ότι το whitespace submission δεν το επηρεάζει (`toHaveText(['task'])`), πιάνοντας έτσι ένα επιπλέον πιθανό bug (καταστροφή υπάρχοντος state) που το αρχικό AI assertion δεν θα έπιανε.

Μετά την υλοποίηση, η λύση συγκρίθηκε με `reference/additional-tests.js` χωρίς να κρατηθούν διπλά tests.

**Failure diagnosis.** Το `npm run test:broken` αποτυγχάνει σκόπιμα το test `adds a todo and clears the input`: μέσω του `BROKEN_SELECTOR` env var, το fixture ψάχνει `getByPlaceholder('INTENTIONALLY WRONG PLACEHOLDER')` αντί για `'What needs to be done?'`. Αποτέλεσμα: `locator.fill: Test timeout of 10000ms exceeded` στο `fixtures.js:11`, με trace/screenshot στο `test-results-broken/`. Η αιτία είναι στο **test fixture** (λάθος locator), όχι στην εφαρμογή — το ίδιο demo δουλεύει κανονικά με το σωστό placeholder, όπως αποδεικνύει το `npm test`.

**Πραγματικές εκτελέσεις.**
- `npm test` → 6 passed (chromium, κανονικός locator).
- `npm run test:broken` → 1 failed όπως αναμενόταν (timeout στο λάθος locator), exit code non-zero.
- `git push` στο `origin/main` (`ziagakisthanos/test-harness-starter`) — GitHub Actions run πράσινο (6/6 passed): https://github.com/ziagakisthanos/test-harness-starter/actions/runs/38273173664 , το `playwright-report` artifact είναι διαθέσιμο στη σελίδα του run.
- Docker (`docker build . -t danaos-testing-starter` + `docker run --rm --init --ipc=host danaos-testing-starter`) → 6 passed, 1 worker (λόγω `CI=1` στο Dockerfile), χωρίς αλλαγές στα tests· ίδιο αποτέλεσμα με το τοπικό run.

**Τι θα βελτίωνα για πραγματική εφαρμογή.** Σταθερό, ελεγχόμενο test environment αντί για δημόσιο demo (π.χ. docker-compose με seeded test database, όχι production/shared δεδομένα). Δεδομένα και fixtures ξεχωριστά από τη λογική του test (test data builders / factories), ώστε το ίδιο σενάριο να τρέχει με διαφορετικά inputs. Διαχείριση secrets μέσω CI secrets store, ποτέ hardcoded. Περισσότερα είδη ελέγχων πέρα από UI E2E: API/contract tests στο επίπεδο του backend, πιθανά visual regression tests, και ένα tagging σύστημα (`@smoke`, `@regression`) ώστε το CI να τρέχει γρήγορα smoke tests σε κάθε PR και πλήρες suite σε merge στο main. Παρακολούθηση flaky tests με retries + reporting αντί να αγνοούνται.
