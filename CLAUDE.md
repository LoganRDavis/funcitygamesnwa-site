# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Overview

Static HTML/CSS/JS site for Fun City Games — an arcade game route operator partnering with Northwest Arkansas businesses. No build system, no framework, no package manager.

## Commands

- `make serve` — Local dev server at http://localhost:8000
- Pushing to `master` deploys automatically via Cloudflare Pages

## Structure

- Pages: `index.html`, `how-it-works.html`, `games.html`, `venues.html`, `locations.html`, `about.html`, `contact.html`, `404.html`
- `js/components.js` — Web components for shared header/footer (`<site-header>`, `<site-footer>`)
- `fonts/` — Self-hosted Fredoka (display) and Open Sans (body) WOFF2 files
- `css/main.css` — Main stylesheet
- `css/404.css` — 404 page styles
- `images/` — Logos, game photos, icons. Drop logo at `images/logo.png` and `images/logo-horizontal.svg`

## Key Patterns

- Absolute asset paths from root (`/css/main.css`, `/images/...`)
- Each page has OG/Twitter meta, canonical, and the shared `LocalBusiness` JSON-LD block
- Deploy excludes listed in `.cfignore`
- Brand palette: magenta `#E6007E`, yellow `#FFD21F`, cyan `#1EC8E6`, navy `#1B2A49`
- Phone: `(877) 62-GAMES` display, `+18776242637` tel link
- Email: `info@funcitygamesnwa.com`

## Domain

- https://www.funcitygamesnwa.com
