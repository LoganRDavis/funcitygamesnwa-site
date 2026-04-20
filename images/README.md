# Image assets

Catalog of what lives in this folder. Most raster images are shipped as a `.png` + `.webp` pair so `<picture>` can serve WebP with a PNG fallback; sized variants use a `-256` / `-512` / `-1024` suffix for `srcset`.

## In use

| File(s) | Used on |
|---|---|
| `logo-horizontal-256/512/768.{png,webp}` | Header + footer (`<site-header>`, `<site-footer>` in `js/components.js`) |
| `logo-512/1024.{png,webp}` | Hero mascot on `index.html` and `about.html` |
| `logo-128/256.{png,webp}`, `logo.{png,webp}` | Source masters / smaller variants (kept for future use) |
| `og-card.{png,webp}` | OG / Twitter card on every page |
| `claw-product-cut.{png,webp}` | `how-it-works.html` hero, game cards on `index.html` + `games.html` |
| `arcade-product-cut.{png,webp}` | `games.html` hero, game cards on `index.html` + `games.html` |
| `vending-product-cut.{png,webp}` | `venues.html` hero, game cards on `index.html` + `games.html` |
| `contact-hero-512/1024.{png,webp}` | `contact.html` hero |
| `nwa-map-512/1024.{png,webp}` | `locations.html` hero |
| `lrd-tag.svg` | Footer (built-by-LRD tag) |

PWA icons and favicon live at the repo root (`/favicon.ico`, `/icon-192.png`, `/icon-512.png`), not here.

## Source / archive

Uncropped originals of the product cut-outs — keep as the source of truth in case the crops ever need to be redone.

- `arcade-product.{png,webp}`
- `claw-product.{png,webp}`
- `vending-product.{png,webp}`

## Conventions

- Use WebP for photos; keep PNG as the fallback.
- Keep individual files under ~200KB where possible.
- When adding a new hero or card image, follow the existing pattern: export `-512` and `-1024` WebP + PNG variants and wire them up with `<picture>` + `srcset`.
