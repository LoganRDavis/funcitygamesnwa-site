# Image assets

Catalog of what lives in this folder. Most raster images are shipped as a `.png` + `.webp` pair so `<picture>` can serve WebP with a PNG fallback; sized variants use a `-256` / `-512` / `-1024` suffix for `srcset`.

## In use

| File(s) | Used on |
|---|---|
| `logo-horizontal-256/512.{png,webp}` | Header + footer (`<site-header>`, `<site-footer>` in `js/components.js`) |
| `logo-512/1024.{png,webp}` | Hero mascot on `index.html` and `about.html` |
| `og-card.{png,webp}` | OG / Twitter card on every page |
| `claw-product-cut.{png,webp}` | `how-it-works.html` hero, game cards on `index.html` + `games.html` |
| `arcade-product-cut.{png,webp}` | `games.html` hero, game cards on `index.html` + `games.html` |
| `jukebox-product-cut.{png,webp}` | Game cards on `index.html` + `games.html` |
| `redemption-product-cut.{png,webp}` | Game card on `games.html` |
| `pool-product-cut.{png,webp}` | Game card on `games.html` |
| `vending-product-cut.{png,webp}` | Game card on `games.html` |
| `venues-hero-512/1024.{png,webp}` | `venues.html` hero |
| `contact-hero-512/1024.{png,webp}` | `contact.html` hero |
| `nwa-map-512/1024.{png,webp}` | `locations.html` hero |
| `lrd-tag.svg` | Footer (built-by-LRD tag) |

PWA icons and favicon live at the repo root (`/favicon.ico`, `/icon-192.png`, `/icon-512.png`), not here.

## Source / archive

Kept in the repo as masters but excluded from the Cloudflare deploy via `.cfignore`. Source of truth in case crops or sized variants ever need to be regenerated.

- `logo.{png,webp}`, `logo-128.{png,webp}`, `logo-256.{png,webp}` — full-size logo + smaller mascot variants
- `arcade-product.{png,webp}` — uncropped arcade cabinet
- `claw-product.{png,webp}` — uncropped claw machine
- `vending-product.{png,webp}` — uncropped vending tower

## Conventions

- Use WebP for photos; keep PNG as the fallback.
- Keep individual files under ~200KB where possible.
- When adding a new hero or card image, follow the existing pattern: export `-512` and `-1024` WebP + PNG variants and wire them up with `<picture>` + `srcset`.
