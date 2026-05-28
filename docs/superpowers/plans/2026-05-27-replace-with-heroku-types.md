# Replace `typescript-api-schema` Source With `heroku-types` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wholesale-replace the source/build/distribution layer of `heroku/typescript-api-schema` with the implementation from `heroku/heroku-types`, preserving the published `@heroku-cli/schema` package name as a major (3.0.0) release with no backwards compatibility, while keeping the existing repo's git history *and* merging in `heroku-types`'s git history, and keeping all OSS-compliance files (LICENSE, SECURITY, CONTRIBUTING.md, CODEOWNERS, .github/PULL_REQUEST_TEMPLATE.md, CHANGELOG.md, .github/release-configs/) intact.

**Architecture:** A single-branch (`chore/replace-with-heroku-types`) merge of `heroku-types/main` into `typescript-api-schema/main` using `git merge --allow-unrelated-histories -s ours --no-commit`, followed by an explicit "import" commit that file-tree-copies heroku-types' working tree into the repo using `git read-tree`. After the merge, a series of focused conflict-resolution commits delete deprecated artifacts (`lib/`, `scripts/`, `tslint.json`, `.nycrc`, `.eslintrc`, `yarn.lock`), copy heroku-types' source/dist/tests/docs in, restore OSS-compliance files when conflicts touched them, and rewire `package.json` to keep `@heroku-cli/schema` at version `3.0.0` while using heroku-types' exports map and scripts. The shared-workflows GitHub Actions stay; the package manager moves from yarn to npm to match heroku-types.

**Tech Stack:**
- Git (merge with `--allow-unrelated-histories`, `read-tree`, sparse manipulation of working tree)
- Node 22 (heroku-types target) — replacing Node 18 (`.tool-versions` change)
- npm (package-lock.json) — replacing yarn (yarn.lock removed)
- TypeScript 6.x via `tsx` runner — replacing tsc-emitting TS 4.x
- Vitest — replacing the no-test setup
- GitHub Actions (existing release-please pipeline preserved)

---

## File Plan

### Files **deleted** from `typescript-api-schema`:
- `lib/index.d.ts` (the legacy hand-rolled output target)
- `scripts/github_token.js`
- `scripts/update_platform_api_types`
- `scripts/` (directory empty after above removals)
- `tslint.json`
- `.nycrc`
- `.eslintrc`
- `yarn.lock` (replaced by `package-lock.json`)

### Files **kept verbatim** from `typescript-api-schema` (OSS compliance + release infra):
- `LICENSE`
- `SECURITY`
- `CONTRIBUTING.md`
- `CODEOWNERS`
- `CHANGELOG.md` (extended in a later task with the 3.0.0 entry)
- `release-channels.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/dependabot.yml` (will be edited in a later task to swap yarn → npm package-ecosystem and drop oclif/typescript major-update ignores that no longer apply)
- `.github/release-configs/release-please-config.json`
- `.github/release-configs/release-please-manifest.json`
- `.github/workflows/release.yml` (will be edited to switch `package-manager: yarn` → `package-manager: npm` and to add `test_command: 'npm test'` and `build_command: 'npm run generate'`)
- `.github/workflows/release-on-push.yml` (yarn → npm)
- `.github/workflows/update-release-configs.yml` (no edits needed; doesn't reference yarn)
- `.editorconfig`
- `.gitattributes`

### Files **copied** from `heroku-types` (full overwrite where same path):
- `src/` (entire tree — `cli.ts`, `cli.test.ts`, `gen-data-types.ts`, `gen-data-types.test.ts`, `data/routes.ts`, `gen/*`)
- `tests/` (entire tree — `golden.test.ts`, `__fixtures__/`, `__golden__/`)
- `dist/` (entire tree — `3.sdk/types.d.ts`, `3.sdk/routes.{js,d.ts}`, `data/types.d.ts`, `data/routes.{js,d.ts}`, `types.d.ts`)
- `docs/data-variant-pipeline.md` (substantive engineering doc)
- `package-lock.json`
- `tsconfig.json` (heroku-types' version — ESM/esnext)

### Files **merged** (manual reconciliation):
- `package.json` — keep `name`, `bugs`, `homepage`, `repository`, `keywords`, `license`, `author` from typescript-api-schema; take `type: "module"`, `exports`, `files`, `scripts`, `devDependencies`, `version: "3.0.0"` from heroku-types
- `README.md` — heroku-types content as the body; replace any `@heroku/types` install snippet with `@heroku-cli/schema`; add bottom-of-README links to `CONTRIBUTING.md`, `SECURITY`, `LICENSE`
- `.gitignore` — union of both files; keep `/dist` removed (we **publish** dist now), keep `node_modules`, add heroku-types' `coverage/`, `.DS_Store`, `.claude/`, `.worktrees/`, but **drop** heroku-types' `docs/superpowers/` and `docs/complexity-manager/` ignores (we want our `docs/superpowers/plans/` tracked)
- `.tool-versions` — take heroku-types' `nodejs 22`

### Files **deliberately not copied** from `heroku-types`:
- `heroku-types/CLAUDE.md` (project-specific assistant instructions; not relevant to this repo's contributors)
- `heroku-types/coverage/` (build artifact, gitignored)
- `heroku-types/node_modules/` (gitignored)
- `heroku-types/.claude/`, `heroku-types/.worktrees/` (local tooling; gitignored)
- `heroku-types/docs/superpowers/`, `heroku-types/docs/complexity-manager/` (assistant scratch; gitignored in their repo)
- `heroku-types/dist/types.d.ts` at the top level (only the per-variant `dist/3.sdk/types.d.ts` etc. are referenced by `package.json` exports — but check before deleting; see Task 6)

---

## Task 1: Pre-flight verification — confirm both repos and worktree are clean

**Files:**
- Verify only: `/Users/tlowrimore/Dev/typescript-api-schema` (current branch `chore/replace-with-heroku-types`)
- Verify only: `/Users/tlowrimore/Dev/heroku-types` (must be on `main` and clean)

- [ ] **Step 1: Confirm typescript-api-schema branch and clean tree**

Run from `/Users/tlowrimore/Dev/typescript-api-schema`:

```bash
git status --porcelain && git rev-parse --abbrev-ref HEAD
```

Expected output:
```
chore/replace-with-heroku-types
```
(no porcelain lines means clean)

If the tree is dirty, stop and ask the user how to handle uncommitted changes — do not stash or discard.

- [ ] **Step 2: Confirm heroku-types repo is clean and on main**

```bash
cd /Users/tlowrimore/Dev/heroku-types && git status --porcelain && git rev-parse --abbrev-ref HEAD && git log -1 --format='%H %s'
```

Expected: empty porcelain, branch `main`, latest commit `ab5c431 Merge pull request #13 from heroku/fix/support-strict-properties`.

If anything else, stop and confirm with the user which heroku-types commit to import.

- [ ] **Step 3: Capture pre-merge state for verification later**

```bash
cd /Users/tlowrimore/Dev/typescript-api-schema
git rev-parse HEAD > /tmp/typescript-api-schema-pre.sha
git log --oneline | wc -l > /tmp/typescript-api-schema-pre.count
ls -la lib scripts > /tmp/typescript-api-schema-pre.legacy.txt
```

Expected: a SHA, the integer `93`, and a listing including `lib/index.d.ts`, `scripts/github_token.js`, `scripts/update_platform_api_types`. These are checked in Task 12.

---

## Task 2: Add heroku-types as a remote and fetch its history

**Files:**
- Modify: `.git/config` (via `git remote add`)
- No working-tree changes yet.

- [ ] **Step 1: Add the local heroku-types repo as a remote**

```bash
git remote add heroku-types /Users/tlowrimore/Dev/heroku-types
git remote -v
```

Expected: `heroku-types` remote shown alongside `origin`.

> **Why local path, not GitHub?** Using the local path guarantees the merge sees the exact heroku-types working state the user verified in Task 1. We can re-point at the GitHub remote later (`git remote set-url heroku-types git@github.com:heroku/heroku-types.git`) once we want network-resolvable references; but the merge itself needs the SHA we just confirmed.

- [ ] **Step 2: Fetch heroku-types history**

```bash
git fetch heroku-types
```

Expected: fetch summary showing `* [new branch] main -> heroku-types/main` plus tags. No errors.

- [ ] **Step 3: Verify the imported tip matches what we expect**

```bash
git log heroku-types/main --oneline -1
```

Expected: `ab5c431 Merge pull request #13 from heroku/fix/support-strict-properties`.

If this differs from the SHA captured in Task 1 Step 2, stop and reconcile with the user before proceeding.

---

## Task 3: Merge heroku-types history with `-s ours --no-commit`

**Files:**
- Modify: `.git/MERGE_HEAD`, index (no working-tree file changes — `-s ours` means our tree wins for now)

- [ ] **Step 1: Start the unrelated-histories merge but defer the commit**

```bash
git merge --allow-unrelated-histories -s ours --no-commit heroku-types/main
```

Expected output:
```
Automatic merge went well; stopped before committing as requested
```

> **Why `-s ours --no-commit`?** `-s ours` resolves the merge by keeping *our* working tree exactly as-is and recording heroku-types/main as a parent. `--no-commit` lets us add the heroku-types tree contents in the next task using `git read-tree`, so the eventual merge commit reflects "we adopted heroku-types' source tree" instead of "we kept our old tree."

- [ ] **Step 2: Confirm merge state is staged**

```bash
git status
```

Expected: "All conflicts fixed but you are still merging." with the index reflecting our current tree (no staged file changes yet).

```bash
cat .git/MERGE_HEAD
```

Expected: the SHA `ab5c431bac52b5225c385777391e70d8e23bd5f9`.

If `MERGE_HEAD` is missing, the merge wasn't started — re-run Step 1.

---

## Task 4: Overwrite working tree with heroku-types' tree using `git read-tree`

**Files:**
- Modify: index (replaces our tree with heroku-types' tree)
- Modify: working tree (checkout-index after read-tree)

- [ ] **Step 1: Read heroku-types' tree into the index**

```bash
git read-tree -m -u heroku-types/main
```

Expected: no output (success). The working tree now reflects heroku-types' files; our prior files (lib/, scripts/, tslint.json, etc.) have been **removed from the index** because they don't exist in heroku-types/main.

- [ ] **Step 2: Verify expected file changes**

```bash
git status --porcelain | head -50
```

Expected: a long list including:
- `D  lib/index.d.ts`
- `D  scripts/github_token.js`
- `D  scripts/update_platform_api_types`
- `D  tslint.json`
- `D  .nycrc`
- `D  .eslintrc`
- `D  yarn.lock`
- `M  package.json`
- `M  tsconfig.json`
- `M  README.md`
- `M  .gitignore`
- `M  .tool-versions`
- `A  src/cli.ts`
- `A  src/cli.test.ts`
- `A  src/gen-data-types.ts`
- `A  src/data/routes.ts`
- `A  tests/golden.test.ts`
- `A  dist/3.sdk/types.d.ts`
- (etc., for every src/, tests/, dist/ file from heroku-types)

If `lib/index.d.ts` is **not** marked deleted, the read-tree didn't take — abort the merge (`git merge --abort`) and ask for help.

> **What just happened?** `read-tree -m -u` performed a merge between the current index (ours) and heroku-types' tree, taking heroku-types' content for every file and removing files that don't exist on heroku-types' side. We do *not* yet have OSS-compliance files like LICENSE/CONTRIBUTING.md/SECURITY in this state — they were just deleted by `read-tree`. Task 5 restores them.

---

## Task 5: Restore OSS-compliance and release-infra files

**Files:**
- Restore: `LICENSE`, `SECURITY`, `CONTRIBUTING.md`, `CODEOWNERS`, `CHANGELOG.md`, `release-channels.yml`, `.editorconfig`, `.gitattributes`
- Restore: `.github/PULL_REQUEST_TEMPLATE.md`, `.github/dependabot.yml`, `.github/release-configs/*`, `.github/workflows/*`

- [ ] **Step 1: Restore the kept files from our pre-merge HEAD**

The pre-merge HEAD is the *first parent* of the in-progress merge — i.e. `HEAD` (we haven't committed yet, so HEAD still points at our pre-merge tip).

```bash
git checkout HEAD -- \
  LICENSE \
  SECURITY \
  CONTRIBUTING.md \
  CODEOWNERS \
  CHANGELOG.md \
  release-channels.yml \
  .editorconfig \
  .gitattributes \
  .github/PULL_REQUEST_TEMPLATE.md \
  .github/dependabot.yml \
  .github/release-configs \
  .github/workflows
```

Expected: no output (success). These files now exist in the index/working tree with their pre-merge content.

- [ ] **Step 2: Verify all OSS files are present and tracked**

```bash
ls LICENSE SECURITY CONTRIBUTING.md CODEOWNERS CHANGELOG.md release-channels.yml
ls .github/PULL_REQUEST_TEMPLATE.md .github/dependabot.yml
ls .github/release-configs/release-please-config.json .github/release-configs/release-please-manifest.json
ls .github/workflows/release.yml .github/workflows/release-on-push.yml .github/workflows/update-release-configs.yml
git status --porcelain | grep -E "^(A|M) (LICENSE|SECURITY|CONTRIBUTING|CODEOWNERS|CHANGELOG|release-channels|\.github/)" | wc -l
```

Expected: every `ls` succeeds; the porcelain grep returns at least 11 lines (one per restored file).

If any file is missing from `ls`, re-run the appropriate `git checkout HEAD --` for it before proceeding.

---

## Task 6: Reconcile `package.json` (this is the heart of the change)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Inspect both source `package.json` files**

```bash
cat package.json
git show HEAD:package.json
```

The first shows heroku-types' file (already in working tree). The second shows our pre-merge file.

- [ ] **Step 2: Write the reconciled `package.json`**

Replace the entire contents of `/Users/tlowrimore/Dev/typescript-api-schema/package.json` with:

```json
{
  "name": "@heroku-cli/schema",
  "version": "3.0.0",
  "description": "Generates TypeScript types and a runtime route registry from the Heroku API hyperschema",
  "author": "Heroku",
  "bugs": "https://github.com/heroku/typescript-api-schema/issues",
  "homepage": "https://github.com/heroku/typescript-api-schema",
  "repository": "heroku/typescript-api-schema",
  "license": "MIT",
  "type": "module",
  "exports": {
    "./3.sdk": {
      "types": "./dist/3.sdk/types.d.ts"
    },
    "./3.sdk/routes": {
      "types": "./dist/3.sdk/routes.d.ts",
      "default": "./dist/3.sdk/routes.js"
    },
    "./data": {
      "types": "./dist/data/types.d.ts"
    },
    "./data/routes": {
      "types": "./dist/data/routes.d.ts",
      "default": "./dist/data/routes.js"
    },
    "./types": {
      "types": "./dist/types.d.ts"
    }
  },
  "files": [
    "dist/"
  ],
  "engines": {
    "node": ">=22"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "generate": "tsx src/cli.ts",
    "generate:data": "tsx src/gen-data-types.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "@types/node": "^25.6.0",
    "@vitest/coverage-v8": "^4.1.4",
    "tsx": "^4.22.0",
    "typescript": "^6.0.2",
    "vitest": "^4.1.4"
  }
}
```

> **Diff from heroku-types' package.json:** kept `name`, `bugs`, `homepage`, `repository`, `author`, `license` from typescript-api-schema; removed heroku-types' `"3.sdk/"` from `files` (we don't ship that path); set `version` to `3.0.0`; added `engines.node` to match `.tool-versions`. **Diff from our old package.json:** `lib` → `dist/`, single `types` field → full `exports` map, dropped `oclif`/`http-call`/`json-schema-to-typescript`/`jsonwebtoken`/`eslint*` deps, removed `updateTypes` script (replaced by `generate`).

- [ ] **Step 3: Validate the JSON parses**

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))" && echo OK
```

Expected: `OK`.

If it errors, re-check braces and commas.

---

## Task 7: Reconcile `README.md` to use heroku-types' content with this repo's identity

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the package name in heroku-types' README**

Replace the entire `README.md` (which currently has heroku-types' content) with this content:

```markdown
# @heroku-cli/schema

This package provides TypeScript types and a runtime route registry, generated from the Heroku API Hyperschema. Generated files are organized by API variant. For example, the `3.sdk` variant outputs to `dist/3.sdk/types.d.ts` and `dist/3.sdk/routes.js`.

> NOTE: This package currently provides two variants: `3.sdk` (Heroku Platform API, fully generated from the hyperschema) and `data` (Heroku's data services control plane / Shogun, where types are generated from spec-captured payloads against a hand-curated resource grouping).

## Installation

```sh
npm install @heroku-cli/schema
```

Types are available under the variant subpath:

```ts
import type { Account, Addon } from '@heroku-cli/schema/3.sdk'
```

A runtime route registry is also available, providing method, path, and request-body metadata for each API endpoint:

```ts
import { app, dyno } from '@heroku-cli/schema/3.sdk/routes'

console.log(app.create) // { method: 'POST', path: '/apps', hasRequestBody: true }
console.log(dyno.list)  // { method: 'GET', path: '/apps/{appId}/dynos' }
```

## Generating Type Definitions

The package includes a CLI that fetches the live Heroku API hyperschema and generates type definitions and a route registry. Before writing files to the file system, the type output is verified against the TypeScript type checker to ensure we're only writing valid definitions.

### Run the CLI

```sh
npm run generate
```

This fetches the schema from `https://api.heroku.com/schema` and writes the generated files into `dist/<variant>/` (e.g. `dist/3.sdk/`). It also updates `package.json` exports automatically. The CLI is executed directly from TypeScript via `tsx` — no separate build step is required.

#### CLI Options

```
Usage: heroku-types [options]

Options:
  --variant <variant>   Schema variant (default: 3.sdk)
  --base-url <url>      Schema endpoint (default: https://api.heroku.com/schema)
  --help                Show this help message
```

For example, to generate types for a different schema variant:

```sh
npm run generate -- --variant 3.webhooks
```

## The `data` variant (Shogun)

The `data` variant covers Heroku's data services control plane (Shogun). Unlike `3.sdk`, Shogun does not publish a hyperschema, so the resource grouping in `src/data/routes.ts` is curated by hand. The body of `dist/data/types.d.ts` — every `*Opts` and `*Result` interface, plus the `HerokuClient` method signatures — is generated from request/response payloads captured during Shogun's spec suite. The runtime route registry at `dist/data/routes.{js,d.ts}` is compiled from `src/data/routes.ts` by the same pipeline. Given the Shogun spec artifact, `dist/` is fully reproducible from source.

### Pipeline

1. **Capture payloads in Shogun.** From a Shogun checkout, with the spec DB running:
   ```sh
   bundle exec rspec spec/shogun/endpoints
   bundle exec rake api_schemas:build
   ```
   This writes `tmp/api_schemas.json` (schemas keyed by `"VERB /path"`).

2. **Generate types in this repo.** Point the generator at the artifact:
   ```sh
   SHOGUN_SCHEMA_PATH=/path/to/shogun/tmp/api_schemas.json npm run generate:data
   ```
   This reads `src/data/routes.ts` for the curated resource grouping, emits `dist/data/types.d.ts`, and emits `dist/data/routes.{js,d.ts}` from the same source. Methods with no schema coverage are typed as `Promise<unknown>` and annotated with a `// TODO: no spec coverage` comment.

### What the generator preserves

The grouping in `src/data/routes.ts` is the source of truth. The generator never invents new resources or moves methods between resources — it only fills in `Opts`/`Result` types from the schema artifact. To add or rename a resource, edit `src/data/routes.ts` and re-run the generator. **Do not edit `dist/data/routes.{js,d.ts}` directly** — those files are regenerated on every `npm run generate:data` invocation.

## Running Tests

```sh
npm test
```

This runs the test suite via [Vitest](https://vitest.dev/).

To run tests in watch mode during development:

```sh
npm run test:watch
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues should be reported per [SECURITY](SECURITY).

## License

MIT — see [LICENSE](LICENSE).
```

- [ ] **Step 2: Verify the README parses cleanly**

```bash
head -1 README.md
grep -c '@heroku-cli/schema' README.md
grep -c '@heroku/types' README.md
```

Expected: heading is `# @heroku-cli/schema`, at least 3 mentions of `@heroku-cli/schema`, and **zero** mentions of `@heroku/types`.

If `grep` finds any `@heroku/types`, locate and replace each one before continuing.

---

## Task 8: Reconcile `.gitignore` and `.tool-versions`

**Files:**
- Modify: `.gitignore`
- Verify: `.tool-versions` (already correct from heroku-types tree)

- [ ] **Step 1: Write the merged `.gitignore`**

Replace `/Users/tlowrimore/Dev/typescript-api-schema/.gitignore` with:

```
.DS_Store

.claude/
.worktrees/

*-debug.log
*-error.log
/.nyc_output
/tmp
coverage/
node_modules/
```

> **Why we do NOT add `/dist`:** the package now ships `dist/` (it's the only thing in `package.json` `files`). Generated files are checked in.
>
> **Why we do NOT add heroku-types' `docs/superpowers/` and `docs/complexity-manager/`:** this very plan lives at `docs/superpowers/plans/`, and we want it tracked.

- [ ] **Step 2: Verify `.tool-versions` reads `nodejs 22`**

```bash
cat .tool-versions
```

Expected: `nodejs 22`.

If it reads `nodejs 18.20.3` (our pre-merge version), the read-tree didn't update it — overwrite it explicitly with `printf 'nodejs 22\n' > .tool-versions`.

---

## Task 9: Update GitHub Actions workflows for npm

**Files:**
- Modify: `.github/workflows/release.yml`
- Modify: `.github/workflows/release-on-push.yml`
- Verify only: `.github/workflows/update-release-configs.yml`
- Modify: `.github/dependabot.yml`

- [ ] **Step 1: Switch `release.yml` from yarn to npm and add test/build commands**

In `/Users/tlowrimore/Dev/typescript-api-schema/.github/workflows/release.yml`, change:

```yaml
          package-manager: yarn  # npm | yarn | pnpm
          lint_command: ''  # No lint script found
          test_command: ''  # No test script found
```

to:

```yaml
          package-manager: npm  # npm | yarn | pnpm
          lint_command: ''  # No lint script
          test_command: 'npm test'
```

And change every other occurrence of `package-manager: yarn` in the file to `package-manager: npm` (there are three total: validate, release-please-pr, publish).

In the `publish` job's `release-publish-public` step, change:

```yaml
          build_command: ''  # No build script found
```

to:

```yaml
          build_command: ''  # dist/ is checked in; generation is manual via npm run generate
```

(Leave it empty — we do **not** want `npm run generate` to run during release; it hits `https://api.heroku.com/schema` and would non-deterministically update the published artifact.)

- [ ] **Step 2: Switch `release-on-push.yml` from yarn to npm**

In `/Users/tlowrimore/Dev/typescript-api-schema/.github/workflows/release-on-push.yml`, change:

```yaml
          package-manager: yarn  # npm | yarn | pnpm
```

to:

```yaml
          package-manager: npm  # npm | yarn | pnpm
```

- [ ] **Step 3: Verify `update-release-configs.yml` needs no change**

```bash
grep -c 'package-manager' .github/workflows/update-release-configs.yml
```

Expected: `0` (the workflow generates configs from `release-channels.yml` and doesn't reference a package manager).

- [ ] **Step 4: Update `.github/dependabot.yml` to drop irrelevant ignores**

The current `dependabot.yml` ignores `@oclif/core` and `typescript` major-version updates. We removed `@oclif/core`; we want TypeScript major updates *allowed* now (we're on TS 6 from heroku-types, but consumers of the next TS major shouldn't be silently held back).

Replace `/Users/tlowrimore/Dev/typescript-api-schema/.github/dependabot.yml` with:

```yaml
version: 2
updates:
- package-ecosystem: "github-actions"
  directory: "/"
  open-pull-requests-limit: 5
  schedule:
      interval: "weekly"
      time: "12:00"
      day: "sunday"
      timezone: "America/Los_Angeles"
  commit-message:
      prefix: "deps"
- package-ecosystem: "npm"
  directory: "/"
  open-pull-requests-limit: 5
  schedule:
      interval: "weekly"
      time: "12:00"
      day: "sunday"
      timezone: "America/Los_Angeles"
  commit-message:
      prefix: "fix"
      prefix-development: "chore"
      include: "scope"
  groups:
      dev-patch-minor-dependencies:
        dependency-type: "development"
        update-types:
          - "patch"
          - "minor"
```

- [ ] **Step 5: Verify all workflow YAML still parses**

```bash
python3 -c "import yaml; [yaml.safe_load(open(f)) for f in ['.github/workflows/release.yml','.github/workflows/release-on-push.yml','.github/workflows/update-release-configs.yml','.github/dependabot.yml']]" && echo OK
```

Expected: `OK`.

If a YAML parse error appears, fix the indentation (workflow YAML is whitespace-sensitive).

---

## Task 10: Append the 3.0.0 entry to `CHANGELOG.md`

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Prepend the 3.0.0 entry to the top of the changelog**

In `/Users/tlowrimore/Dev/typescript-api-schema/CHANGELOG.md`, **insert the following block at the very top of the file**, before the existing `## [1.0.23]...` heading:

```markdown
## [3.0.0](https://github.com/heroku/typescript-api-schema/compare/schema-v2.0.1...schema-v3.0.0) (2026-05-27)


### ⚠ BREAKING CHANGES

* Replaces the entire build, source, and distribution layout with the implementation imported from `heroku/heroku-types`. There is no backwards-compatible migration path.
* Removes `lib/index.d.ts` (single-file type bundle). Types now live under per-variant subpaths: import from `@heroku-cli/schema/3.sdk` and `@heroku-cli/schema/data` instead of `@heroku-cli/schema`.
* Adds a runtime route registry at `@heroku-cli/schema/3.sdk/routes` and `@heroku-cli/schema/data/routes`.
* Package is now ESM-only (`"type": "module"`).
* Drops Node 18 support; minimum is now Node 22.
* Removes the `updateTypes` script (`./scripts/update_platform_api_types`). Use `npm run generate` instead.


### Features

* Adopt the `@heroku/types` source pipeline as `@heroku-cli/schema` 3.0.0.
```

> **Note on release-please:** The `[3.0.0]` heading uses release-please's expected format. After this commit, the `release-please-manifest.json` file (currently `".": "2.0.1"`) will need to be bumped to `3.0.0` by the release workflow when a 3.0.0 PR is created. We do **not** edit the manifest manually here — release-please owns that file.

- [ ] **Step 2: Verify the changelog still has the older history below**

```bash
head -25 CHANGELOG.md
grep -c '## \[2.0.1\]' CHANGELOG.md
grep -c '## \[1.0.23\]' CHANGELOG.md
```

Expected: top heading is `## [3.0.0]`; the 2.0.1 and 1.0.23 entries are still present (counts of `1` each).

If the 2.0.1 or 1.0.23 entries are missing, the changelog was over-written instead of prepended — restore from `git show HEAD:CHANGELOG.md` and re-insert.

---

## Task 11: Stage everything and create the merge commit

**Files:**
- Commit: all changes from Tasks 4–10 as a single merge commit (two parents: pre-merge HEAD and `heroku-types/main`).

- [ ] **Step 1: Stage all changes**

```bash
git add -A
git status --short | wc -l
```

Expected: a count > 0 (typically 60+ given the size of the heroku-types tree).

- [ ] **Step 2: Inspect the staged change summary before committing**

```bash
git diff --cached --stat | tail -5
git diff --cached --stat | grep -E "^\s(LICENSE|SECURITY|CONTRIBUTING\.md|CODEOWNERS|CHANGELOG\.md|release-channels\.yml)" || echo "OSS files unchanged in this commit (expected)"
```

Expected:
- A summary line like `XXX files changed, YYYY insertions(+), ZZZZ deletions(-)`.
- The OSS-files grep prints `OSS files unchanged in this commit (expected)` — those files came back from `git checkout HEAD --` so they match HEAD and are not in the diff.

If LICENSE *does* show up as changed in `git diff --cached`, that's a problem — the restore in Task 5 didn't take. Stop and re-run Task 5.

- [ ] **Step 3: Create the merge commit**

```bash
git commit -m "$(cat <<'EOF'
feat!: replace implementation with heroku-types (3.0.0)

BREAKING CHANGE: This is a major-version replacement. The old single-file
type bundle at `lib/index.d.ts` is removed; types and a runtime route
registry are now exported per-variant from `dist/3.sdk/` and `dist/data/`.

Imports the full src/, tests/, dist/, and docs/data-variant-pipeline.md
from heroku/heroku-types and merges its commit history into this repo via
`git merge --allow-unrelated-histories`.

Kept from typescript-api-schema:
  - LICENSE, SECURITY, CONTRIBUTING.md, CODEOWNERS
  - .github/PULL_REQUEST_TEMPLATE.md, dependabot.yml, release-configs/, workflows/
  - CHANGELOG.md (with new 3.0.0 entry prepended)
  - release-channels.yml, .editorconfig, .gitattributes
  - Package name: @heroku-cli/schema (was @heroku/types in source repo)

Removed:
  - lib/, scripts/, tslint.json, .nycrc, .eslintrc, yarn.lock
  - oclif/json-schema-to-typescript/jsonwebtoken/http-call dependencies

Adopted:
  - ESM (`"type": "module"`), Node 22, npm (was yarn)
  - Vitest test suite, tsx-based generator, full route registry
  - Per-variant package.json exports map
EOF
)"
```

Expected: a commit is created. The output ends with something like `[chore/replace-with-heroku-types XXXXXXX] feat!: replace implementation with heroku-types (3.0.0)`.

If pre-commit hooks fail, **do not** add `--no-verify`. Read the failure, fix the underlying issue (e.g., a lint error in a file we copied), and create a *new* commit on top. Do not amend the merge commit — amending a merge can drop the second parent.

- [ ] **Step 4: Verify the commit has two parents**

```bash
git log -1 --format='%H %P %s'
```

Expected: one SHA, then **two** parent SHAs (space-separated), then the subject. The first parent is our pre-merge HEAD (from `/tmp/typescript-api-schema-pre.sha`); the second is `ab5c431...`.

If only one parent appears, the merge state was lost. Reset (`git reset --hard <pre-merge-sha>`) and restart from Task 3.

---

## Task 12: Verify acceptance criteria

**Files:**
- Verify only

- [ ] **Step 1: Verify typescript-api-schema git history is preserved**

```bash
git log --oneline | grep -E "(initial commit from heroku-cli|onboard shared workflows|address high security vulns)" | head -5
git log --oneline | wc -l
```

Expected: pre-existing commits (e.g., the `bae0c15 fix: address high security vulns reported by Dependabot (#71)`) still appear. The total commit count is `93 (pre) + 1 (merge) + 152 (heroku-types) = 246` (give or take a few — exact number depends on how `git log` counts merges).

```bash
git log --first-parent --oneline | wc -l
```

Expected: `94` (our 93 pre-merge commits + 1 merge commit).

- [ ] **Step 2: Verify heroku-types history is reachable**

```bash
git log --all --oneline | grep -E "(adds proper handling of the 'strictProperties'|patch version bump|removed superpowers docs)" | wc -l
```

Expected: `3` (each of the listed heroku-types commit subjects is reachable).

```bash
git merge-base HEAD heroku-types/main
```

Expected: a SHA that is reachable from both HEAD and `heroku-types/main` — though for unrelated histories merged with `--allow-unrelated-histories`, this command may print nothing because the only common point is the merge commit itself. To confirm reachability:

```bash
git log HEAD --oneline | grep -c "$(cd /Users/tlowrimore/Dev/heroku-types && git rev-parse --short HEAD)"
```

Expected: `1` — the heroku-types tip SHA appears in our log.

- [ ] **Step 3: Verify all heroku-types functionality is present**

```bash
ls src/cli.ts src/gen-data-types.ts src/data/routes.ts tests/golden.test.ts dist/3.sdk/types.d.ts dist/3.sdk/routes.js dist/data/types.d.ts dist/data/routes.js
ls src/gen/*.ts | wc -l
```

Expected: every `ls` succeeds; the gen file count is `>= 16` (matches heroku-types' src/gen/).

- [ ] **Step 4: Verify all OSS-compliance files remain intact**

```bash
ls LICENSE SECURITY CONTRIBUTING.md CODEOWNERS CHANGELOG.md
ls .github/PULL_REQUEST_TEMPLATE.md .github/dependabot.yml
ls .github/release-configs/release-please-config.json .github/release-configs/release-please-manifest.json
ls .github/workflows/release.yml .github/workflows/release-on-push.yml .github/workflows/update-release-configs.yml
diff <(git show HEAD:LICENSE) <(git show HEAD~1:LICENSE) && echo "LICENSE unchanged"
diff <(git show HEAD:SECURITY) <(git show HEAD~1:SECURITY) && echo "SECURITY unchanged"
diff <(git show HEAD:CONTRIBUTING.md) <(git show HEAD~1:CONTRIBUTING.md) && echo "CONTRIBUTING.md unchanged"
diff <(git show HEAD:CODEOWNERS) <(git show HEAD~1:CODEOWNERS) && echo "CODEOWNERS unchanged"
```

Expected: every `ls` succeeds; each `diff` reports no diff and prints the "unchanged" line.

> **About `HEAD~1`:** `HEAD~1` follows the *first parent* of the merge — that's our pre-merge HEAD by construction (because we ran `git merge` from the typescript-api-schema branch). So this `diff` checks "did the OSS-compliance files survive the import unchanged from typescript-api-schema's pre-merge state?" — exactly the acceptance criterion.

- [ ] **Step 5: Verify the legacy artifacts are gone**

```bash
test ! -e lib && echo "lib/ removed"
test ! -e scripts && echo "scripts/ removed"
test ! -e tslint.json && echo "tslint.json removed"
test ! -e yarn.lock && echo "yarn.lock removed"
test -f package-lock.json && echo "package-lock.json present"
```

Expected: all five "removed/present" lines printed.

- [ ] **Step 6: Verify the package builds and tests pass**

```bash
npm install
npm run typecheck
npm test
```

Expected: install succeeds; `tsc --noEmit` reports no errors; vitest runs and reports a passing suite (the golden test depends on `tests/__golden__/` which we copied in Task 4).

If `npm install` fails complaining about the lockfile, the heroku-types `package-lock.json` may reference dev deps that aren't compatible with our Node version — re-run with `npm install --no-package-lock` to regenerate, then commit the new `package-lock.json` as a follow-up commit on this branch.

If `npm run typecheck` fails, inspect the error; the most likely cause is `tsconfig.json` referencing files we didn't copy. Compare against `/Users/tlowrimore/Dev/heroku-types/tsconfig.json` and reconcile.

If `npm test` fails, inspect the failures — they usually point to fixture or golden-file paths. The fixtures live under `tests/__fixtures__/` and the goldens under `tests/__golden__/`, both of which we copied.

- [ ] **Step 7: Final summary**

```bash
git log --oneline -3
git log --first-parent --oneline | head -3
git log --all --oneline | wc -l
```

Expected: HEAD is the merge commit; first-parent log shows the merge commit followed by `667c155 deps: bump actions/create-github-app-token from 2 to 3 (#73)`; total reachable commits across all refs is roughly `246`.

---

## Task 13: Push the branch and open the PR

**Files:**
- No file changes; remote-only operations.

> **STOP — confirm with the user before this task.** Pushing makes the merge commit visible to the team and starts CI. Do not proceed without explicit approval.

- [ ] **Step 1: Confirm with the user**

Ask: "Tasks 1–12 are complete locally. Ready to push `chore/replace-with-heroku-types` to `origin` and open a PR? This will trigger CI."

Wait for "yes" before continuing.

- [ ] **Step 2: Push the branch**

```bash
git push -u origin chore/replace-with-heroku-types
```

Expected: the branch is pushed; the output includes a "Create a pull request" URL.

- [ ] **Step 3: Open a draft PR**

```bash
gh pr create --draft --title "feat!: replace implementation with heroku-types (3.0.0)" --body "$(cat <<'EOF'
## Summary

Wholesale replacement of the source/build/distribution layer of `@heroku-cli/schema` with the implementation imported from `heroku/heroku-types`. This is a **breaking** major-version release (3.0.0).

- **Imports** the full `src/`, `tests/`, `dist/`, and `docs/data-variant-pipeline.md` from `heroku/heroku-types` via `git merge --allow-unrelated-histories`.
- **Preserves** all `typescript-api-schema` git history (visible via `git log --first-parent`) and merges in `heroku-types`'s history (visible via `git log --all`).
- **Keeps** all OSS-compliance files (LICENSE, SECURITY, CONTRIBUTING.md, CODEOWNERS, .github/PULL_REQUEST_TEMPLATE.md, CHANGELOG.md, release-configs, workflows).
- **Removes** `lib/`, `scripts/`, `tslint.json`, `.nycrc`, `.eslintrc`, `yarn.lock`, plus the oclif/json-schema-to-typescript/jsonwebtoken/http-call dependencies.
- **Adopts** ESM, Node 22, npm, Vitest, tsx-based generation, and a per-variant `package.json` exports map.

## Breaking changes for consumers

- **Subpath imports required.** Previously: `import { App } from '@heroku-cli/schema'`. Now: `import type { App } from '@heroku-cli/schema/3.sdk'`.
- **ESM-only.** CommonJS consumers must migrate.
- **Node 22 minimum.** Was Node 20.
- **`updateTypes` script removed.** Use `npm run generate`.

## Test plan

- [ ] CI green (`release.yml validate` job passes with `npm test`)
- [ ] `npm install && npm run typecheck && npm test` runs cleanly locally
- [ ] `git log --first-parent` shows pre-existing typescript-api-schema commits
- [ ] `git log --all` shows heroku-types commits (e.g., `ab5c431`, `ac8abff`, `f8e9f5b`)
- [ ] `LICENSE`, `SECURITY`, `CONTRIBUTING.md`, `CODEOWNERS` unchanged from `main`
- [ ] Manually verify `dist/3.sdk/types.d.ts` exports compile against a sample consumer
EOF
)"
```

Expected: a PR URL is printed.

- [ ] **Step 4: Report the PR URL to the user**

Print the PR URL and confirm the branch is ready for review.

---

## Self-review

**Spec coverage:**
- ✅ "git history is preserved for existing `heroku/typescript-api-schema` codebase" — Task 11 creates a true merge commit (two parents); Task 12 Step 1 verifies via `git log --first-parent`.
- ✅ "all functionality in `heroku/typescript-api-schema` is fully replaced by that of `@heroku/types`" — Tasks 4 (read-tree) + 6 (package.json) replace source, build, and dist; Task 12 Step 5 verifies `lib/`, `scripts/`, etc. are gone.
- ✅ "all files necessary for OSS compliance remain intact" — Task 5 explicitly restores them; Task 12 Step 4 byte-equal-diffs them against `HEAD~1`.
- ✅ "git history from `@heroku/types` is merged" — Task 2 fetches the remote; Task 11 Step 4 verifies two parents on the merge commit; Task 12 Step 2 verifies heroku-types subjects are reachable.
- ✅ Major version bump — Task 6 (`version: "3.0.0"`) and Task 10 (CHANGELOG entry).
- ✅ "no attempt for backward compatibility" — explicitly called out in CHANGELOG (Task 10) and PR body (Task 13).

**Placeholder scan:** No "TBD," "TODO," "implement later," or "Add error handling" appear. Every code block contains the exact content to write. Every command shows expected output. The CHANGELOG and PR-body templates are complete strings.

**Type/name consistency:** Package name `@heroku-cli/schema` is used consistently in `package.json` (Task 6), `README.md` (Task 7), CHANGELOG (Task 10), commit message (Task 11), and PR body (Task 13). Branch name `chore/replace-with-heroku-types` is consistent across Task 1, Task 11, Task 13. Heroku-types tip SHA `ab5c431...` is referenced in Task 1, Task 2, Task 3, and Task 13.
