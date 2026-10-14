# test-harness-starter

Playwright test harness πάνω στο δημόσιο [TodoMVC demo](https://demo.playwright.dev/todomvc/), φτιαγμένο ως πρακτικό παράδειγμα AI-assisted testing: έξι end-to-end tests, Docker image, και CI pipeline σε GitHub Actions. Εκπαιδευτικό project — δεν περιέχει κώδικα ή confirmed stack της Danaos.

## Stack

- [Playwright](https://playwright.dev/) 1.63.0 (JavaScript)
- Docker + Compose, βασισμένο στο επίσημο `mcr.microsoft.com/playwright` image
- GitHub Actions CI, Node.js 22

## Setup

```sh
npm ci
npx playwright install chromium   # σε Linux: --with-deps chromium αν λείπουν system deps
```

## Εκτέλεση

```sh
npm test                 # όλα τα tests
npm run test:smoke       # μόνο το γρήγορο happy-path subset
npm run test:regression  # τα υπόλοιπα, πιο λεπτομερή σενάρια
npm run report           # ανοίγει το τελευταίο HTML report
```

```sh
npm run test:broken      # σκόπιμο, ελεγχόμενο failure — δες "Failure diagnosis" παρακάτω
npm run report:broken
```

```sh
docker compose build
docker compose run --rm tests
```

## Δομή

- `tests/todo.spec.js` — τα έξι tests
- `tests/testData.js` — `uniqueTodo(label)`, builder για unique test data ανά run
- `fixtures.js` — custom `todo` fixture (navigation, locators, `add()`)
- `playwright.config.js` — baseURL, reporter, retries, trace/screenshot policy
- `.github/workflows/tests.yml` — CI: install, test, upload `playwright-report` artifact
- `Dockerfile`, `compose.yaml` — containerized run, ίδια pinned Playwright version με το `package.json`

## Test scenarios

Όλα πάνω στο κοινό `todo` fixture, καθένα δημιουργεί τα δικά του δεδομένα μέσω `uniqueTodo()`:

| Test | Tag | Τι ελέγχει |
| --- | --- | --- |
| `adds a todo and clears the input` | `@smoke` | σωστό text, checkbox ξεκινά unchecked, input αδειάζει |
| `marks a todo as completed` | `@smoke` | `toBeChecked()` + κλάση `completed` |
| `deletes a todo and leaves the other one` | `@regression` | hover + delete button, μένει μόνο το άλλο item |
| `filters active and completed and all todos` | `@regression` | σωστές λίστες στα links Active / Completed / All |
| `rejects whitespace only todo` | `@regression` | whitespace-only submission δεν προσθέτει item, δεν πειράζει υπάρχον |
| `persists todo state after reload` | `@regression` | text + completed state επιβιώνουν `page.reload()` |

## Failure diagnosis

`npm run test:broken` ενεργοποιεί μέσω `BROKEN_SELECTOR` env var έναν σκόπιμα λάθος locator (`getByPlaceholder('INTENTIONALLY WRONG PLACEHOLDER')`) χωρίς να αλλάξει αρχεία. Αποτέλεσμα: `locator.fill: Test timeout of 10000ms exceeded` στο `fixtures.js:11`. Η αιτία είναι στο **test fixture**, όχι στην εφαρμογή — το demo δουλεύει κανονικά με `npm test`. Trace/screenshot αποθηκεύονται ξεχωριστά στο `test-results-broken/`.

## AI usage

Τα `AI_PROMPTS.md` prompts (Σχεδιασμός, Υλοποίηση) χρησιμοποιήθηκαν ένα σενάριο τη φορά, με ground-truth DOM/behavior checks πριν από κάθε πρόταση αντί για εικασία locators. Δύο συγκεκριμένα review moments:

- **delete test**: το αρχικό `getByRole('button', { name: 'Delete' })` βρέθηκε σωστό από το DOM, αλλά το πρώτο run απέτυχε με actionability timeout — το κουμπί είναι hidden μέχρι hover, κάτι που δεν φαίνεται από static DOM. Διορθώθηκε με `row.hover()` πριν το click, επαληθεύτηκε με re-run.
- **reject-whitespace test**: το AI πρότεινε `toHaveCount(0)` σε άδεια λίστα· η τελική υλοποίηση είναι αυστηρότερη — προσθέτει πρώτα ένα πραγματικό todo και ελέγχει ότι το whitespace submission δεν το πειράζει, πιάνοντας έτσι bug που το αρχικό assertion θα προσπερνούσε.

## Πραγματικές εκτελέσεις

- `npm test` → 6 passed (chromium)
- `npm run test:broken` → 1 failed όπως αναμενόταν
- Docker (`docker compose run --rm tests`) → 6 passed, 1 worker (`CI=1`), ίδιο αποτέλεσμα με το local run
- CI: [run #38273173664](https://github.com/ziagakisthanos/test-harness-starter/actions/runs/38273173664) → πράσινο, 6/6, `playwright-report` artifact διαθέσιμο στο run

## Τι θα άλλαζα για production

- Ελεγχόμενο test environment (seeded app/DB μέσω docker-compose) αντί για δημόσιο demo
- Auth fixture με αποθηκευμένο `storageState` αν η εφαρμογή απαιτούσε login, όχι UI login ανά test
- Secrets μέσω CI secrets store, ποτέ hardcoded
- API/contract tests πέρα από UI E2E, πιθανά visual regression
- `retries: 2` + flaky-test tracking σε production CI (εδώ σκόπιμα `retries: 0` για diagnosis)
