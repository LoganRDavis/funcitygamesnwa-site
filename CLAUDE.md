# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for Fun City Games — an arcade game route operator partnering with Northwest Arkansas businesses. No build step, no framework, no package manager. Plain HTML/CSS/JS served as files.

## Commands

- `make serve` — Local dev server at http://localhost:8000. Runs `serve.py`, a thin wrapper around Python's `http.server` that mimics Cloudflare Pages' `.html` behavior: serves `/foo` from `/foo.html` and 308-redirects `/foo.html` → `/foo`. Keep that parity if you touch `serve.py` — the whole site relies on extensionless canonicals and local dev must match prod.
- Pushing to `main` deploys automatically via Cloudflare Pages.

## Architecture

Each page is a fully self-contained HTML file — there is no template engine. To add a page, copy an existing page (e.g. `about.html`) and update:

1. `<title>`, `<meta name="description">`, OG/Twitter tags, and `<link rel="canonical">`. **Canonicals and all internal `href`s are extensionless** (`/about`, not `/about.html`) — Cloudflare Pages serves `/foo.html` under `/foo` and 308-redirects the `.html` form, so using `.html` URLs in canonicals creates a redirect loop with any reverse rule.
2. Add the page to `sitemap.xml` with its extensionless URL. **Do not add `<lastmod>`** unless you have a real per-page edit-tracking workflow — static or generation-time dates get ignored by Google and waste the signal.
3. Add a trailing-slash alias to `_redirects` (`/foo/ → /foo 301`). The extensionless URL is served natively by Pages; do **not** add `/foo → /foo.html` rules (they loop against Pages' built-in `.html` stripping).
4. If the page should appear in primary nav, add it to `NAV_LINKS` in `js/components.js` using the extensionless href.

**OG/Twitter `image` URLs must point to the `.png` variant of the share card, not `.webp`.** LinkedIn's scraper and several link-unfurl pipelines (older Slack, some iMessage edge cases, WhatsApp) reject WebP and fall back to a no-image card. Set `og:image:type` to `image/png` to match. Each page also needs an `og:image:alt` and `twitter:image:alt`. (The Organization JSON-LD `logo` property may stay WebP — Google's structured-data spec explicitly accepts it there.)

`Organization` JSON-LD (with `@id: https://www.funcitygamesnwa.com/#organization` and `areaServed` listing every served city — currently the 8 NWA cities, 3 Fort Smith / River Valley cities, and 4 Eastern Oklahoma cities shown as `city-badge` pills on `locations.html`) lives on `index.html`, `locations.html`, `about.html`, `contact.html`, and `venues.html` (count: 15 cities each, grep `"@type": "City"` to verify). When the service area changes, update `areaServed` in all five files plus the visible `city-badge` pills on `locations.html` and the footer "Service Areas" list in `js/components.js`. Fun City Games is a service-area business with no public storefront, so we intentionally avoid `LocalBusiness` schema — that type requires a full `address` to qualify for Google rich results. Other pages use page-specific schema (`AboutPage`, `ContactPage`, `ItemList`, `FAQPage`, `Service`) that references the shared Organization via its `@id`. If you add schema to a new page, keep `name`, `url`, `telephone` (`+18776242637`), and `email` consistent.

`404.html` is standalone — it uses `/css/404.css`, not `main.css`, and does not include `<site-header>`/`<site-footer>`. Edit it directly without touching shared chrome. Pages auto-serves `404.html` as the fallback for any non-existent path with a real 404 status; the `_redirects` rule `/404 /404.html 404` exists so a direct visit to `/404` also returns a 404 status (otherwise Pages' `.html`-stripping would serve the page as a 200, making it look like a "real" page).

**Shared chrome via web components.** Header and footer are custom elements defined in `js/components.js` (`<site-header>`, `<site-footer>`). Pages must include `<script src="/js/components.js" defer>` and drop the elements into the body. Active nav state is derived from `window.location.pathname`, so nav links use absolute paths from root.

**Asset paths are absolute** (`/css/main.css`, `/images/...`, `/fonts/...`) — relative paths will break because the dev server and Cloudflare Pages both serve from root.

**Design tokens.** CSS custom properties in `:root` at the top of `css/main.css` are the source of truth for colors, shadows, and the brand palette (magenta `--magenta`, yellow `--yellow`, cyan `--cyan`, navy `--navy`, plus orange/purple/mint accents). The `<meta name="theme-color">` value in each page's `<head>` is a separate, hardcoded hex and may drift — update it deliberately if the brand palette changes.

**Fonts are self-hosted.** Both Open Sans (body) and Fredoka (display) live in `fonts/` as WOFF2, with `@font-face` declarations at the top of `css/main.css` and the Latin subsets preloaded in each page head. Keep the preload links in sync with the actual filenames if fonts are renamed — a mismatch silently wastes the preload.

**CSS is cache-busted, JS is not.** `css/main.css` is included as `/css/main.css?v=YYYYMMDDx` on every page, so bumping the query string forces a refresh alongside a long immutable cache in `_headers`. `js/components.js` has no version query and runs on a 1-day cache with stale-while-revalidate — if you make a breaking JS change that must go live immediately, either rename the file or temporarily shorten the cache in `_headers`.

**Don't add `Cache-Control` to the `/*` block in `_headers`.** Pages *concatenates* per-path header values with `/*` rather than overriding them, so a global `Cache-Control` gets merged into the per-path rules below it (immutable CSS, long-cache fonts/images) and the strictest directive wins — defeating the entire cache strategy. HTML already gets a sensible `public, max-age=0, must-revalidate` from Pages by default when nothing is set, so leave it off.

## Deploy

**`.cfignore` is NOT honored by the Git Integration deploy** — only by `wrangler pages deploy` direct uploads. Since this site deploys via `git push → main`, the entire repo bundle ships, and tooling files have to be blocked at the request layer instead. `_redirects` does that by rewriting tooling paths (`CLAUDE.md`, `serve.py`, `Makefile`, dotfile dirs, `images/README.md`, etc.) to `/404.html` with a 404 status. Anything new that you don't want publicly fetchable on `*.pages.dev` (or on prod once DNS cuts over) must be added to that list in `_redirects`. `.cfignore` is kept in the repo as a reference list of "things that aren't part of the site," so the `_redirects` block is in sync with it. (If you ever want true bundle-level filtering, switch the deploy to a GitHub Action running `wrangler pages deploy .` — `.cfignore` then takes effect as documented.) Image source masters listed at the bottom of `.cfignore` are also still shipped — see `images/README.md` for context.

`_headers` and `_redirects` are Cloudflare Pages configuration files (path-based, no build step). `_headers` sets a strict CSP (`script-src 'self'` — **no inline scripts or inline event handlers**, so any new JS must be an external file referenced from `/js/`) plus per-path cache policies. `_redirects` is path-only, so the apex→www redirect is configured as a zone-level Redirect Rule in the Cloudflare dashboard, not here.

## Contact constants (used across pages)

- Phone: `(877) 62-GAMES` for display, `+18776242637` for `tel:` links
- Email: `info@funcitygamesnwa.com`
- Production domain: https://www.funcitygamesnwa.com
