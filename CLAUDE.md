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
3. If the page should appear in primary nav, add it to `NAV_LINKS` in `js/components.js`.

`LocalBusiness` JSON-LD lives only on pages where it's contextually appropriate (currently `index.html` and `locations.html`) — not every page. If you add it to a new page, keep the core fields (name, URL, telephone, address, areaServed) consistent with those two.

`404.html` is standalone — it uses `/css/404.css`, not `main.css`, and does not include `<site-header>`/`<site-footer>`. Edit it directly without touching shared chrome.

**Shared chrome via web components.** Header and footer are custom elements defined in `js/components.js` (`<site-header>`, `<site-footer>`). Pages must include `<script src="/js/components.js" defer>` and drop the elements into the body. Active nav state is derived from `window.location.pathname`, so nav links use absolute paths from root.

**Asset paths are absolute** (`/css/main.css`, `/images/...`, `/fonts/...`) — relative paths will break because the dev server and Cloudflare Pages both serve from root.

**Design tokens.** CSS custom properties in `:root` at the top of `css/main.css` are the source of truth for colors, shadows, and the brand palette (magenta `--magenta`, yellow `--yellow`, cyan `--cyan`, navy `--navy`, plus orange/purple/mint accents). The `<meta name="theme-color">` value in each page's `<head>` is a separate, hardcoded hex and may drift — update it deliberately if the brand palette changes.

**Font loading is split.** Open Sans (body) is self-hosted in `fonts/` as WOFF2 and the Latin subset is preloaded via `<link rel="preload">` in each page head — keep that link in sync with the actual filename if fonts are renamed. Fredoka (display) is loaded from Google Fonts via `<link href="https://fonts.googleapis.com/css2?family=Fredoka:...">` in each page head. If Fredoka is ever brought in-house, drop the Google Fonts link and add a preload + `@font-face` block alongside Open Sans.

## Deploy

`.cfignore` controls what Cloudflare Pages excludes from the deploy (currently `.git`, `.vscode`, `.claude`, `README.md`, `CLAUDE.md`, `Makefile`). New tooling/config directories that shouldn't ship to prod must be added there.

## Contact constants (used across pages)

- Phone: `(877) 62-GAMES` for display, `+18776242637` for `tel:` links
- Email: `info@funcitygamesnwa.com`
- Production domain: https://www.funcitygamesnwa.com
