> **Historical reference:** This document records the old mixed-source/manual-copy workflow and is retained for provenance. It is not the current operating procedure. Use `WEBSITE_PIPELINE.md` for the current local pipeline.
> **Prepared by:** Luftballon (AI assistant), at QP's direction.
> **Date:** 2026-07-12

# Quang Phuc Phung Website: Deployment Setup and Operating Manual

## 1. Purpose of this document

This document records how the website is currently assembled, how it is deployed, what I verified on 2026-07-12, and what the safer/cleaner target setup should be.

The aim is not to teach web development in the abstract. The aim is to leave a precise map for the next time the website needs to be edited, built, previewed, published, or recovered after something goes wrong.

This is an operational document, not a claim that the current local working copies are clean. The local repositories currently contain substantial pre-existing changes. Do not run destructive Git cleanup commands merely because the status output is noisy.

---

## 2. The short version

The website is a Gatsby static site.

```text
Gatsby source code
        |
        |  npm run build
        v
Compiled static files in public/
        |
        |  publish compiled files to the public branch
        v
GitHub Pages
        |
        v
quangphucphung.com
```

There are two GitHub branches with different jobs:

```text
main      = Gatsby source project
public    = compiled deployment artifact served by GitHub Pages
```

There are also two local folders:

```text
~/Desktop/prj/quangphucphung.github.io/
    The Gatsby source project. Gatsby writes its build output to ./public/.

~/Desktop/prj/temp-public/
    A separate local clone containing the deployment branch and compiled files.
```

The historical manual workflow was:

```text
1. Edit the Gatsby source.
2. Run gatsby build.
3. Manually copy the contents of source-project/public/ into temp-public/.
4. Open temp-public.
5. Check out the public branch.
6. git add .
7. git commit.
8. git push origin public --force.
9. GitHub Pages serves the public branch.
```

That workflow is valid, but the manual copy and force-push steps make it easy to deploy the wrong build or lose track of which copy is authoritative.

---

## 3. Verified locations

### 3.1 Gatsby source project

```text
/Users/luftballon/Desktop/prj/quangphucphung.github.io
```

Important contents:

```text
src/                  React/TypeScript pages, components, data, posts, images
static/               Files copied directly into the build output
package.json          npm scripts and dependencies
package-lock.json     Locked npm dependency graph
gatsby-config.js      JavaScript loader for the TypeScript Gatsby config
gatsby-config.ts      Gatsby plugins and site configuration
gatsby-node.ts        Dynamic page creation and slug generation
gatsby-browser.tsx    Browser-side Gatsby hooks
public/               Local compiled output; normally ignored on main
CNAME                 Custom-domain declaration
.github/workflows/    Existing, inherited CI/deployment workflow
```

The source project is a Gatsby 5 project using React, TypeScript, MDX, Tailwind/PostCSS, Gatsby Image/Sharp, RSS generation, and several Gatsby remark plugins.

### 3.2 Deployment staging clone

```text
/Users/luftballon/Desktop/prj/temp-public
```

This folder is a separate Git repository whose checked-out branch is `public`. It contains compiled HTML, JavaScript, CSS, images, `page-data`, `CNAME`, and other Gatsby output. It does not contain the Gatsby source tree.

Its remote is also:

```text
https://github.com/quangphucqp/quangphucphung.github.io
```

### 3.3 Command notes

The old command notes are at:

```text
/Users/luftballon/Desktop/prj/COMMANDS.txt
```

They contain:

```text
gatsby build
cd ""C:\prj\temp-public"
git checkout public
git add .
git commit -m "Update new abstract"
git push origin public --force
```

The path is a Windows path from the older workflow. The manual copy from `quangphucphung.github.io/public/` to `temp-public/` was not written into the command file; it was presumably done through Finder or another manual copy operation.

---

## 4. What is on GitHub now

The live repository is:

```text
https://github.com/quangphucqp/quangphucphung.github.io
```

The GitHub CLI is authenticated as the account `quangphucqp`, with write/admin access to this repository. Authentication details and tokens must not be written into this document.

### 4.1 `main` branch

The remote `main` branch currently contains the Gatsby source project. A direct GitHub tree inspection found:

- `src/`
- `static/`
- `package.json`
- `package-lock.json`
- `gatsby-config.js`
- `gatsby-config.ts`
- `gatsby-node.ts`
- TypeScript, React, MDX, and project data files

The remote `main` branch does **not** contain a tracked `public/` directory in the inspected tree. This is correct for a source branch because `.gitignore` contains:

```text
public
```

The source branch snapshot inspected on 2026-07-12 was:

```text
origin/main = 2741a17680444f48d3bb196100b2b86b42c82031
```

### 4.2 `public` branch

The remote `public` branch contains the compiled deployment artifact:

- `index.html`
- `404.html`
- JavaScript bundles
- CSS bundles
- `page-data/`
- generated route directories
- image and static assets
- `CNAME`

It does **not** contain `src/` or `package.json` in the inspected tree. That is also correct.

The remote `public` branch snapshot inspected on 2026-07-12 was:

```text
origin/public = e42839b76a3085e6916db43c9291710cf3f9eb9f
```

GitHub Pages is configured to serve from:

```text
branch: public
path: /
```

The GitHub Pages API reported the deployment as built and associated it with:

```text
http://quangphucphung.com/
```

The custom domain is represented by `CNAME` in the compiled deployment output.

### 4.3 Important correction to earlier notes

The Gatsby source **is already uploaded to GitHub** on `main`. It is not served directly by GitHub Pages, which is why looking only at the `public` branch gives the impression that the source is absent.

The correct interpretation is:

```text
main   = source of truth for editing
public = generated output for hosting
```

---

## 5. How Gatsby builds this site

### 5.1 The npm scripts

The relevant `package.json` scripts are:

```json
{
  "fetch-stars": "node ./src/scripts/fetchGitHubStars.js",
  "lint": "eslint 'src/**/*.{js,ts,tsx}'",
  "type": "tsc --noEmit",
  "develop": "gatsby develop",
  "develop-secure": "gatsby develop --https",
  "develop-mobile": "gatsby develop --host 0.0.0.0",
  "develop-mobile-secure": "gatsby develop --host 0.0.0.0 --https",
  "prebuild": "npm run fetch-stars",
  "build": "gatsby build",
  "serve": "gatsby serve",
  "clean": "gatsby clean",
  "predeploy": "npm run build",
  "deploy": "gh-pages --dist ./public --branch public"
}
```

The important dependency chain is:

```text
npm run deploy
    |
    +-- predeploy: npm run build
                         |
                         +-- prebuild: npm run fetch-stars
                         |
                         +-- gatsby build
```

Therefore `npm run deploy` is not merely a Git command. It first performs a build and a GitHub API data refresh, then publishes the resulting `public/` directory to the `public` branch.

### 5.2 Build output

Gatsby writes the production build into:

```text
/Users/luftballon/Desktop/prj/quangphucphung.github.io/public/
```

The output includes:

- rendered HTML pages;
- JavaScript bundles for hydration and client-side behavior;
- CSS bundles;
- Gatsby `page-data` JSON;
- image derivatives and copied assets;
- RSS output;
- `CNAME` and static files.

`public/` is a generated artifact. It should not be hand-edited. Any manual edits there will be overwritten by the next build.

### 5.3 Gatsby page generation

`gatsby-node.ts` does two main things:

1. It creates a `slug` field for MDX posts using the file path.
2. It creates pages dynamically for:
   - MDX posts, using `src/templates/Post.tsx`;
   - projects/research entries, using `src/templates/Project.tsx`.

The current route mapping in `src/constants/routes.ts` is:

```text
/          About
/research  Research
/teaching  Teaching
```

This means changing a page or post in `src/` is not enough to understand the final site. The page may be assembled through Gatsby data queries, MDX, a template, a route constant, and generated `page-data`.

### 5.4 The GitHub-stars prebuild step

Before every build, `src/scripts/fetchGitHubStars.ts`:

1. reads the projects defined in `src/data/projects`;
2. determines which projects have GitHub repositories;
3. queries the public GitHub REST API;
4. checks the unauthenticated API rate limit;
5. fetches repository star counts sequentially;
6. writes the result to:

```text
src/data/__generated__/projectStars.json
```

This has several operational consequences:

- a build needs network access to `api.github.com`;
- the build can modify a source data file before Gatsby runs;
- a build may skip or fail if the unauthenticated API rate limit is insufficient;
- the generated stars file may produce a diff after a build even if no page content was intentionally changed;
- a completely offline build is not guaranteed by the current scripts.

The script currently uses unauthenticated requests even though Hermes has GitHub authentication available. A future improvement would be to support an optional `GITHUB_TOKEN` in the script, without ever committing that token.

---

## 6. Project version and reproducibility requirements

The source project declares:

```text
.nvmrc:             v18.15.0
package engines:    node >=18.15.0, npm >=9.5.0
.npmrc:             engine-strict=true
Gatsby:             ^5.10.0
package-lock:       lockfileVersion 3
```

During the audit, the current shell reported:

```text
node: v26.4.0
npm:  11.17.0
```

The pinned project version should be treated as the reproducible reference environment:

```bash
nvm install 18.15.0
nvm use 18.15.0
node --version
npm --version
```

Do not use a random Node version as the canonical deployment environment merely because the build happens to start. Gatsby, native image dependencies, Sharp, TypeScript, and older transitive packages can behave differently across Node versions.

For a fresh source checkout, the preferred dependency installation is:

```bash
npm ci
```

`npm ci` uses `package-lock.json` and is more reproducible than `npm i`.

---

## 7. The current manual deployment workflow

This is the workflow that appears to have been used historically.

### Step 0: Identify the source checkout

```bash
cd /Users/luftballon/Desktop/prj/quangphucphung.github.io
```

Before editing or building, inspect the branch and status:

```bash
git status --short --branch
git branch -avv
git remote -v
```

The source checkout should normally be on `main`, not `public`.

### Step 1: Edit source files

Likely edit locations include:

```text
src/pages/
src/components/
src/data/
src/constants/
src/posts/
src/images/
src/styles/
static/
```

Do not edit generated files inside `public/`.

### Step 2: Build

The explicit npm form is preferable to the bare command in the old notes:

```bash
npm run build
```

The old command:

```bash
gatsby build
```

is functionally equivalent when the local Gatsby binary is available, but `npm run build` documents the project-defined script and reliably uses the local dependency.

### Step 3: Preview the compiled site

After a successful build:

```bash
npm run serve
```

Then inspect the local production build, normally at:

```text
http://localhost:9000
```

This is preferable to relying only on `gatsby develop`, because `gatsby develop` is a development server while `gatsby serve` serves the actual compiled output that will be deployed.

At minimum, check:

- `/`;
- `/research`;
- `/teaching`;
- a representative post;
- a representative research/project page;
- the CV or other static assets;
- navigation links;
- images;
- the custom domain/CNAME behavior after deployment.

### Step 4: Copy the generated output

The manual copy is:

```text
source-project/public/*  →  temp-public/*
```

It is important to copy the **contents** of `public/` into the root of `temp-public/`, not create a nested directory such as:

```text
temp-public/public/index.html  # wrong
```

The desired result is:

```text
temp-public/index.html        # correct
temp-public/page-data/...      # correct
temp-public/assets/...         # correct
```

A safer command-line replacement for an opaque Finder copy would be an `rsync` operation, but it should first be run in dry-run mode and pointed at the exact two verified directories. Do not run `rsync --delete` against an uncertain path.

### Step 5: Publish from the deployment clone

```bash
cd /Users/luftballon/Desktop/prj/temp-public
git switch public
git status --short --branch
git add -A
git commit -m "Deploy website update"
git push origin public --force
```

The historical command uses `--force`. That works for a deployment artifact branch, but it rewrites the remote branch without checking whether somebody else has pushed since the local clone last fetched.

A safer manual equivalent is:

```bash
git fetch origin public
git push origin public --force-with-lease
```

`--force-with-lease` still permits an artifact deployment branch to be rewritten, but refuses to overwrite a remote update that the local clone has not seen.

### Step 6: Verify the deployment

After pushing:

```bash
gh api repos/quangphucqp/quangphucphung.github.io/pages
```

Inspect the Pages status and then check the live site in a browser. A successful Git push is not the same thing as a successful Pages build.

---

## 8. What is fragile in the current arrangement

### 8.1 The source checkout is currently on the wrong branch

During the audit, the source checkout reported:

```text
current branch: public
```

The source repository also has a large dirty working tree and a local stash. This may reflect the process by which the old repository was copied or rebuilt. It must be preserved until the changes are classified.

Do **not** run any of the following on the current checkout without first deciding what the local changes mean:

```bash
git reset --hard
git clean -fd
git checkout .
git restore .
```

Those commands can destroy source edits, generated files, or the only local copy of work that has not reached GitHub.

### 8.2 The local deployment clone is stale relative to the remote

The local `temp-public` checkout and its remote-tracking reference do not currently represent the same state as the live remote `public` branch. The remote `public` branch had a different current commit during the audit.

Before using `temp-public` for a future deployment, fetch first and inspect the diff. Do not assume that its local `origin/public` reference is current.

### 8.3 The manual copy can deploy the wrong artifact

The copy step is not recorded in the command file and has no automatic verification. It is possible to:

- copy the wrong direction;
- copy an old `public/` directory;
- leave stale files in `temp-public`;
- accidentally create `temp-public/public/`;
- deploy an incomplete build;
- deploy files that are not the result of the build just inspected.

If a copy-based workflow must remain, it should use a dry-run comparison and a post-copy sanity check.

### 8.4 Force-pushing without fetching can overwrite a newer deployment

The deployment branch is not protected. `git push --force` can overwrite a remote deployment made from another machine or another clone. `--force-with-lease` is safer.

### 8.5 The existing CI workflow is inherited and not aligned cleanly

`.github/workflows/CI.yml` currently contains inherited assumptions that should be reviewed:

- it triggers on `master`, while the source branch is `main`;
- it uses older `actions/checkout` and `actions/setup-node` major versions;
- it installs with `npm i` rather than `npm ci`;
- it deploys through the existing `npm run deploy` script;
- it assumes a deployment credential configuration that should be audited before relying on it.

This workflow should not be treated as the authoritative deployment process until it has been tested against the current `main` branch and the current GitHub Pages configuration.

### 8.6 The project still contains inherited template metadata

At least some project metadata remains from the original Gatsby/Trekhleb template:

```text
package name:      trekhleb.github.io
package author:    Oleksii Trekhleb
package homepage:  https://trekhleb.dev
RSS title:         Trekhleb.dev RSS Feed
```

The route structure and content have been adapted, but these metadata fields should eventually be reviewed so that package metadata, SEO, RSS, and site identity consistently describe Quang Phuc Phung's website.

This is separate from the deployment mechanics, but it is easy to mistake it for a deployment problem when it appears in generated metadata.

---

## 9. The minimum safe improvement

The least disruptive improvement is to keep the existing architecture but stop using the manual copy and separate deployment clone as the primary workflow.

The source project's `package.json` already contains:

```json
"predeploy": "npm run build",
"deploy": "gh-pages --dist ./public --branch public"
```

Once the source checkout has been made clean and placed on `main`, the intended one-command deployment is:

```bash
npm run deploy
```

Conceptually this does:

```text
main working tree
    |
    +-- npm run fetch-stars
    +-- gatsby build
    +-- publish ./public to branch public
```

This removes:

- the manual copy;
- the separate `temp-public` repository;
- the need to manually check out `public` in the staging clone;
- the need to manually force-push the staging clone.

However, `npm run deploy` is still a live publishing command. It should only be used after:

1. the source branch is confirmed to be `main`;
2. local edits are backed up or committed;
3. the Node version is pinned;
4. linting and type checking pass;
5. the production build passes;
6. `gatsby serve` has been inspected;
7. the deployment target and remote are confirmed.

There is no reason to run this command during the initial documentation/audit pass. It should be tested only after the local state is reconciled.

---

## 10. Recommended local workflow

This is the preferred transitional workflow before migrating to GitHub Actions.

### 10.1 Establish a clean source checkout

Do this only after preserving the current local source directory.

Recommended principle:

```text
Never repair the existing dirty checkout by deleting files first.
Make a separate clean checkout of origin/main and compare it to the old copy.
```

A safe future arrangement would be:

```text
~/Desktop/prj/quangphucphung.github.io/       existing, preserved copy
~/Desktop/prj/quangphucphung.github.io-clean/ clean source checkout of main
```

The clean checkout can be used to determine which local changes are intentional before anything is committed or pushed.

### 10.2 Use the pinned Node version

```bash
cd /Users/luftballon/Desktop/prj/quangphucphung.github.io-clean
nvm install 18.15.0
nvm use 18.15.0
npm ci
```

### 10.3 Run quality checks before building

```bash
npm run lint
npm run type
```

These do not prove that the final visual site is correct, but they catch a useful class of source errors before deployment.

### 10.4 Build and preview

```bash
npm run clean
npm run build
npm run serve
```

Inspect the actual compiled output locally. Do not skip this step when changing navigation, page routes, images, MDX, static files, or site metadata.

### 10.5 Publish

After the local preview is acceptable:

```bash
npm run deploy
```

### 10.6 Verify remotely

Use both the GitHub API and the live domain:

```bash
gh api repos/quangphucqp/quangphucphung.github.io/pages
curl -I https://quangphucphung.com/
```

Then inspect representative pages in a browser. Pages may be temporarily in a build/queued state even after the Git push has succeeded.

---

## 11. The optimal long-term setup

The cleanest target is to stop committing or manually copying build output at all.

### 11.1 Recommended architecture

```text
GitHub main branch
        |
        | push
        v
GitHub Actions
        |
        +-- checkout main
        +-- install Node 18.15.0
        +-- npm ci
        +-- lint
        +-- type check
        +-- npm run build
        +-- upload public/ as a Pages artifact
        +-- deploy artifact to GitHub Pages
        v
GitHub Pages
```

In this model:

- `main` is the only source branch that needs manual editing;
- `public` is no longer manually maintained as a Git branch;
- `temp-public` can be archived and removed from the workflow;
- every deployment has a GitHub Actions run attached to the source commit;
- the deployment is reproducible on a clean Ubuntu runner;
- the deployed artifact is produced from the exact source commit that triggered the workflow;
- there is no local force-push of generated files.

### 11.2 Pages deployment modes

The current site uses the older branch-based Pages mode:

```text
Pages source: branch public, root /
```

The optimal setup would migrate Pages to GitHub Actions/artifact deployment. That is a one-time configuration change and should be done deliberately because it changes the Pages source mode.

The migration should be staged:

1. confirm `main` builds successfully in a clean environment;
2. add a new Actions workflow without changing the live Pages source;
3. run it on a branch or manual dispatch and inspect the artifact;
4. confirm the generated site has the same domain/CNAME behavior;
5. switch Pages source to GitHub Actions;
6. deploy once from `main`;
7. keep the old `public` branch as a rollback reference until the new path is trusted;
8. archive `temp-public` only after a successful rollback test.

### 11.3 What a future workflow should enforce

The future workflow should fail before publishing if:

- the branch is not `main`;
- the Node version is wrong;
- `npm ci` fails;
- linting fails;
- type checking fails;
- Gatsby build fails;
- `public/index.html` is absent;
- `public/CNAME` is absent when the custom domain is expected;
- the build contains obvious placeholder/error output;
- required static assets are missing.

The workflow should retain:

- the source commit SHA;
- the build log;
- the Pages deployment URL/status;
- the generated artifact for debugging;
- a concurrency rule that prevents overlapping deployments from racing.

---

## 12. Suggested deployment command design

If local deployment remains necessary, the project should eventually have a guarded script rather than a bare `gh-pages` call.

Conceptual stages:

```text
website-deploy
    |
    +-- verify repository path
    +-- verify origin URL
    +-- verify current branch is main
    +-- verify no unexpected uncommitted changes
    +-- verify Node/npm versions
    +-- npm ci or verify lockfile install
    +-- npm run lint
    +-- npm run type
    +-- npm run clean
    +-- npm run build
    +-- verify required output files
    +-- optionally serve or open preview
    +-- publish public/
    +-- poll GitHub Pages status
    +-- verify the live URL
```

The important design principle is that **publication should be the last step, not the step that reveals whether the build worked**.

A script should never silently:

- switch branches in a dirty checkout;
- delete an arbitrary directory;
- copy from an unverified source path;
- force-push without fetching;
- publish if the build produced no `index.html`;
- publish when lint or type checking failed.

---

## 13. Recovery and rollback

### 13.1 Before changing the current local copies

Preserve both directories as-is. Do not start by deleting `public/`, `temp-public/`, `.cache/`, or `.git`.

Useful read-only inspection:

```bash
git -C /Users/luftballon/Desktop/prj/quangphucphung.github.io status --short --branch
git -C /Users/luftballon/Desktop/prj/quangphucphung.github.io log --oneline --decorate -10
git -C /Users/luftballon/Desktop/prj/temp-public status --short --branch
git -C /Users/luftballon/Desktop/prj/temp-public log --oneline --decorate -10
```

Make a filesystem backup before any cleanup or branch reconciliation. The backup should be outside both Git working trees and should not overwrite the existing copies.

### 13.2 If a local build is bad

A bad local build is harmless until it is published. Remove/rebuild only the generated output in the clean source checkout, not the original dirty source copy:

```bash
npm run clean
npm run build
```

Then inspect with:

```bash
npm run serve
```

### 13.3 If the live deployment is bad

Do not immediately rebuild from an uncertain local directory.

First identify the last known-good commit on the remote `public` branch. Preserve the current remote reference, inspect the deployment history, and restore the known-good artifact through a controlled Git operation. Prefer `--force-with-lease` over unqualified `--force` when rewriting an artifact branch.

A rollback is a deployment operation, not a source-code reset. Do not use `git reset --hard` on the source checkout as a way to roll back the live website.

### 13.4 Keep the old deployment clone temporarily

Even after moving to `npm run deploy` or GitHub Actions, keep `temp-public` untouched until:

- the new workflow has published successfully;
- the live domain has been checked;
- a rollback path has been tested or at least identified;
- no important local-only deployment artifact remains there.

---

## 14. Security and privacy notes

- The website repository is public in at least the deployment branch. Do not put API keys, passwords, personal access tokens, or private credentials in `src/`, `static/`, `public/`, commit messages, or this document.
- The Google Places key belongs in Hermes's private `.env`, not in this website repository.
- GitHub authentication is handled through the local `gh` keychain integration. Do not copy the token into Git remotes, shell scripts, or Markdown.
- A public website can contain public professional information, but private addresses, private calendar information, and credentials must not be included accidentally in generated pages.
- Gatsby source and generated output should be checked for accidental secrets before publication.

A useful pre-publication search should inspect source files while excluding dependency/build directories, for example:

```text
src/
static/
package.json
gatsby-config.*
gatsby-node.*
```

Do not scan or publish `.env` files.

---

## 15. Working glossary

### Gatsby
The static-site generator used by this project. It reads React/TypeScript/MDX source and produces deployable HTML, CSS, JavaScript, JSON, and assets.

### Source tree
The editable project: `src/`, `static/`, Gatsby configuration, package files, and related code.

### `public/`
Gatsby's generated production output directory. It is not the public GitHub branch by itself; it is the local directory whose contents are published.

### `public` branch
The Git branch containing compiled files that GitHub Pages serves.

### `temp-public`
The separate local clone historically used to stage the contents of the compiled `public/` directory before pushing the deployment branch.

### GitHub Pages
The hosting service that serves the compiled files from the configured source branch or Pages artifact.

### `gh-pages`
The npm package used by the existing `npm run deploy` script to publish a local directory to a branch. Here it is configured to publish `./public` to the `public` branch.

### `CNAME`
The file that tells GitHub Pages which custom domain is associated with the deployment.

### `gatsby develop`
Development server for editing and fast feedback. It is not the same as serving the production build.

### `gatsby serve`
Local server for the already-built production output. This is the closer preview of what will be deployed.

---

## 16. Current audit conclusion

The setup is not nonsense. It is a normal static-site architecture that accumulated a manual deployment layer:

```text
Gatsby source on main
    -> Gatsby compiles to public/
    -> public/ is copied into a separate deployment clone
    -> deployment clone force-pushes the public branch
    -> GitHub Pages serves public
```

The most important immediate facts are:

1. The source is already on GitHub's `main` branch.
2. The live deployment is on the separate `public` branch.
3. The source project already contains an `npm run deploy` shortcut that can replace the manual copy workflow.
4. The current local source checkout is dirty and on `public`, so it must be preserved and reconciled before automation is trusted.
5. The project expects Node 18.15.0, while the current shell is using Node 26.4.0.
6. The inherited CI workflow still refers to `master` and needs review.
7. The long-term optimal setup is GitHub Actions artifact deployment from `main`, with GitHub Pages no longer served from a manually force-pushed branch.

No files were committed or pushed while this document was being prepared.
