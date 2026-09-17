> **Prepared by:** Luftballon (AI assistant), at QP's direction.
> **Date:** 2026-09-17

# Website Pipeline

This is the local build-and-publish pipeline for Quang-Phuc Phung's existing website. It preserves the current Gatsby site and removes the manual copy from `public/` into `temp-public/`.

## Working copy

The pipeline uses:

```text
/Users/luftballon/Desktop/prj/quangphucphung.github.io-pipeline
```

The older working copy remains preserved at:

```text
/Users/luftballon/Desktop/prj/quangphucphung.github.io
```

The older copy is dirty and is on a local `public` branch. It is not the pipeline working copy. No cleanup or reset was run against it.

The pipeline copy is on local `main`. It contains the current live site's source content, plus the pipeline files in this directory. It was built from the source repository and overlaid from the preserved current copy so that the live site's current profile, research, and teaching text is not replaced by older remote source content.

## Commands

From the pipeline directory:

```bash
cd /Users/luftballon/Desktop/prj/quangphucphung.github.io-pipeline

# Use the supported Gatsby runtime on this Mac mini.
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node --version  # v22.23.2

# Install the locked dependency graph in a fresh checkout.
npm ci

# Audit the complete dependency tree; high and critical findings fail.
npm run security

# Validate and build without publishing.
npm run pipeline

# Serve the compiled production build locally.
npm run serve

# Build, verify, and explicitly publish to GitHub Pages.
npm run deploy
```

`npm run pipeline` runs the type checker and linter, builds the Gatsby site from the committed data snapshot, and verifies the compiled artifact. It does not publish anything or call the GitHub API for star updates.

`npm run fetch-stars` is an explicit data-refresh command. It updates the committed star snapshot only when the star counts change. It is not part of the normal build, so a normal build remains network-independent and does not dirty the source checkout.

`npm run deploy` runs the same checks and build, verifies `public/index.html`, `public/404.html`, `public/CNAME`, and Gatsby page data, then publishes `public/` to the `public` branch with `gh-pages`. It refuses to run unless:

- the checkout is on `main`;
- the working tree is clean;
- `origin` is `https://github.com/quangphucqp/quangphucphung.github.io`;
- the build contains the expected domain and HTML files;
- the output does not contain an accidental nested `public/public/` directory.

After publishing, the script reads the remote `public` branch and GitHub Pages configuration back through `gh` and checks that Pages still serves `public:/` with `quangphucphung.com`.

## Deployment topology

```text
source files on local main
        |
        | npm run pipeline / npm run deploy
        v
Gatsby build in local public/
        |
        | gh-pages publish
        v
GitHub public branch
        |
        v
GitHub Pages -> quangphucphung.com
```

`public/` is generated output and remains ignored by the source repository. `temp-public/` is no longer part of the normal workflow.

## Dependency policy

The lockfile is refreshed with non-breaking updates and installed with `npm ci`. The package manifest pins known vulnerable transitive build dependencies through `overrides` while retaining Gatsby 5 compatibility. `npm run security` audits the complete dependency tree and fails on high or critical advisories. The current audit has no high or critical findings; moderate findings remain in Gatsby's older transitive development/build tooling. `npm audit fix --force` was not used because npm proposes breaking Gatsby downgrades rather than a tested upgrade path.

## GitHub Actions

`.github/workflows/CI.yml` now validates pushes and pull requests to `main` with the pinned `.nvmrc` Node version, `npm ci`, a full dependency audit, type checking, linting, and a production build. The audit blocks high and critical advisories. It does not deploy automatically. Publishing remains an explicit local command so a source edit cannot silently change the public site.

## Current boundary

The local pipeline is set up and is intended to reproduce the current site. The source changes that make the pipeline copy match the current live site have not been pushed to GitHub in this setup pass. A later explicit publish can update the deployment branch; a separate explicit source push is needed if the remote `main` branch should become the permanent source of those current content changes.
