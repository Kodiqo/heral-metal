# Heral Metal

[![Deploy](https://github.com/Kodiqo/heral-metal/actions/workflows/deploy.yml/badge.svg)](https://github.com/Kodiqo/heral-metal/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

Bilingual (Macedonian / English) landing site for Heral Metal: metal structures, machine maintenance and gas pipelines. Built by [Kodiqo](https://github.com/Kodiqo).

The current UI consistency rules and verification record are documented in [docs/consistency-audit.md](docs/consistency-audit.md). Shared layout and typography tokens live in `src/styles/global.css`; equivalent page introductions use `PageHeading.astro`. Page navigation uses normal browser links and history without transitions.

To capture every route for visual review, run `BROWSER_EXECUTABLE=/opt/brave-bin/brave node scripts/audit-capture.mjs after` after building. Captures include 375, 768 and 1440px layouts, measurements and contact sheets in `test-results/consistency/after/`. The browser suite checks all 21 HTML routes at ten widths, shared header/footer geometry, grid overlaps, card alignment, accessibility and existing interactions.

Static Astro website implemented from the supplied Figma design, with Macedonian and English content, responsive layouts and GitHub Pages deployment.

Repository: https://github.com/Kodiqo/heral-metal

Production URL: https://bojan-ivanovski.github.io/heral-metal/ (deployment verification is recorded in `docs/verification.md`).

## Development

Requires Node.js 24 or newer. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
npm run dev
npm run verify
```

The development URL includes `/heral-metal/`. `astro.config.mjs` derives owner and repository name from `GITHUB_REPOSITORY`, with the verified repository as its local default. `SITE_URL` and `BASE_PATH` can override hosting configuration. All links and metadata use centralized route helpers.

## Routes

`/`, `/services/`, `/services/metal-structures/`, `/services/machine-maintenance/`, `/services/gas-pipelines/`, `/projects/`, `/about/`, `/contact/`, `/quote/`, `/privacy/`.

Every content route is also available under `/en/`. `404.html`, `sitemap.xml`, `robots.txt` and `llms.txt` are generated at build time. Paths above are relative to the repository hosting base.

## Architecture

- Astro static generation with strict TypeScript; no hydrated client framework.
- Tailwind CSS 4 provides the theme and reset; shared component CSS handles precise Figma geometry and responsive layouts.
- Original Figma assets remain local; `astro:assets` generates responsive WebP sources.
- Arimo and Roboto Condensed fonts are locally hosted, compressed and subset for Latin and Cyrillic. Original font licenses are included.
- Shared header, footer, layout, buttons and photographs. Repeated content and translations live in `src/data/`.
- Small TypeScript scripts handle mobile menu state, native gallery dialogs and asynchronous quote submission.
- Semantic HTML, visible keyboard focus, native disclosures and dialogs, reduced-motion support, central SEO metadata, language alternates and structured data.

## Quote form

The form sends requests to FormSubmit at `doriko6256@goldvester.com`. Set `PUBLIC_FORMSUBMIT_RECIPIENT` at build time to override the recipient with another email or an activated FormSubmit token. This is public browser configuration. FormSubmit requires one-time activation from the recipient inbox before it delivers submissions.

Required fields are name, email, service, description and contact consent. Attachments are optional; allowed types are PDF, JPG, PNG and DWG, maximum 5 MB. Text requests use the FormSubmit AJAX endpoint and keep inline feedback. Requests with attachments use the documented native multipart endpoint and continue to FormSubmit for CAPTCHA and confirmation. Native submission also works without JavaScript. No visitor details are stored in browser local storage.

Inline success requires a successful HTTP response and an explicit `success: true` or `success: "true"`. Rejections, malformed responses and network failures preserve the input. The honeypot uses FormSubmit's `_honey` field. Tests intercept submissions and send no real email; activation and inbox delivery remain a manual deployment check.

## Content editor

The Pages CMS setup matches LiftGo, with a branded `/admin/` start page and five editors for gallery media, homepage, services, About Us and contact. Text fields include Macedonian and English. See [CMS.md](CMS.md) for uploads, local validation and the one-time owner setup needed to connect the GitHub App and invite editors.

## Verification

```sh
npm run verify
npx playwright install --with-deps chromium
npm run test:browser
npm run test:performance
```

To use an installed compatible Chromium browser, set `BROWSER_EXECUTABLE`, e.g. `/opt/brave-bin/brave`. Browser tests check all 20 routes at 320, 375, 430, 768, 1024, 1280, 1440, 1920, 2560 and 3440px, run axe accessibility checks at 375 and 1440px, verify menu/gallery/form/FAQ/404 behavior and save screenshots. Submission tests mock the external API and send no real email. Performance checks save Lighthouse JSON and HTML reports for Home, About, Quote and English Services. Results go to ignored `test-results/` and are uploaded as CI artifacts.

## Deployment

From a normal terminal with GitHub CLI authentication and a compatible browser, run:

```sh
BROWSER_EXECUTABLE=/opt/brave-bin/brave bash scripts/publish.sh
```

This verifies the production build, records browser and Lighthouse results, commits and pushes to the public repository, configures Pages through `gh`, waits for the matching workflow run and checks the deployed routes. It stops if verification or deployment fails. Reports and the final commit hash are saved in `test-results/`.

Enable **Settings → Pages → Source → GitHub Actions**. The workflow in `.github/workflows/deploy.yml` runs on `main` pushes, pull requests and manual dispatch. It installs from the lockfile, checks types, builds, tests links/assets/form validation, runs browser and accessibility checks, collects Lighthouse reports, uploads the static Pages artifact and deploys using official GitHub actions. Pull requests verify without deploying. Deployment uses `pages: write` and `id-token: write`, with read-only repository contents permission.

See `docs/design-system.md` for the extracted specification, original asset mapping and documented visual corrections. See `docs/verification.md` for actual verification results and external prerequisites.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).
