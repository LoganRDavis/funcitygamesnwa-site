# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for Fun City Games — an arcade game route operator partnering with Northwest Arkansas businesses. No build step, no framework, no package manager. Plain HTML/CSS/JS served as files.

## Commands

- `make serve` — Local dev server at http://localhost:8000 (Python's built-in `http.server`).
- Pushing to `main` deploys automatically via Cloudflare Pages.

## Architecture

Each page is a fully self-contained HTML file — there is no template engine. To add a page, copy an existing page (e.g. `about.html`) and update:

1. `<title>`, `<meta name="description">`, OG/Twitter tags, and `<link rel="canonical">`.
2. Add the page to `sitemap.xml`.
3. Add extensionless + trailing-slash aliases to `_redirects` (matches the canonical pattern used for every other page — the `.html` URL is the canonical, and `/foo` / `/foo/` 301 to it).
4. If the page should appear in primary nav, add it to `NAV_LINKS` in `js/components.js`.

`LocalBusiness` JSON-LD lives only on pages where it's contextually appropriate (currently `index.html` and `locations.html`) — not every page. If you add it to a new page, keep the core fields (name, URL, telephone, address, areaServed) consistent with those two.

`404.html` is standalone — it uses `/css/404.css`, not `main.css`, and does not include `<site-header>`/`<site-footer>`. Edit it directly without touching shared chrome.

**Shared chrome via web components.** Header and footer are custom elements defined in `js/components.js` (`<site-header>`, `<site-footer>`). Pages must include `<script src="/js/components.js" defer>` and drop the elements into the body. Active nav state is derived from `window.location.pathname`, so nav links use absolute paths from root.

**Asset paths are absolute** (`/css/main.css`, `/images/...`, `/fonts/...`) — relative paths will break because the dev server and Cloudflare Pages both serve from root.

**Design tokens.** CSS custom properties in `:root` at the top of `css/main.css` are the source of truth for colors, shadows, and the brand palette (magenta `--magenta`, yellow `--yellow`, cyan `--cyan`, navy `--navy`, plus orange/purple/mint accents). The `<meta name="theme-color">` value in each page's `<head>` is a separate, hardcoded hex and may drift — update it deliberately if the brand palette changes.

**Fonts are self-hosted.** Both Open Sans (body) and Fredoka (display) live in `fonts/` as WOFF2, with `@font-face` declarations at the top of `css/main.css` and the Latin subsets preloaded in each page head. Keep the preload links in sync with the actual filenames if fonts are renamed — a mismatch silently wastes the preload.

**CSS is cache-busted, JS is not.** `css/main.css` is included as `/css/main.css?v=YYYYMMDDx` on every page, so bumping the query string forces a refresh alongside a long immutable cache in `_headers`. `js/components.js` has no version query and runs on a 1-day cache with stale-while-revalidate — if you make a breaking JS change that must go live immediately, either rename the file or temporarily shorten the cache in `_headers`.

## Deploy

`.cfignore` controls what Cloudflare Pages excludes from the deploy (currently `.git`, `.vscode`, `.claude`, `README.md`, `CLAUDE.md`, `Makefile`). New tooling/config directories that shouldn't ship to prod must be added there.

`_headers` and `_redirects` are Cloudflare Pages configuration files (path-based, no build step). `_headers` sets a strict CSP (`script-src 'self'` — **no inline scripts or inline event handlers**, so any new JS must be an external file referenced from `/js/`) plus per-path cache policies. `_redirects` is path-only, so the apex→www redirect is configured as a zone-level Redirect Rule in the Cloudflare dashboard, not here.

## Contact constants (used across pages)

- Phone: `(877) 62-GAMES` for display, `+18776242637` for `tel:` links
- Email: `info@funcitygamesnwa.com`
- Production domain: https://www.funcitygamesnwa.com
