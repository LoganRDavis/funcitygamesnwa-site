# Image assets to drop in

The HTML templates reference these paths. Drop matching files here and the site will pick them up.

## Required

| Path | Used on | Notes |
|---|---|---|
| `/favicon.ico` | All pages | Favicon. Generate from the logo. Place at repo root, not `images/`. |
| `/icon-192.png` | PWA manifest | 192×192 PNG. Place at repo root. |
| `/icon-512.png` | PWA manifest | 512×512 PNG. Place at repo root. |
| `images/logo.svg` | `<site-header>`, `<site-footer>` | Current file is a placeholder wordmark. Replace with the real "FUN CITY GAMES" kid-with-claw-machine logo (SVG preferred, or swap the `src` in `js/components.js` to `logo.png`). ~260×70 display size. Transparent background. |
| `images/og-card.png` | All pages (OG/Twitter) | 1200×630 social share card. Logo + tagline + brand colors. |
| `images/claw-machine.webp` | Home, Games | Photo of a claw machine (ideally one of ours on location). |
| `images/video-games.webp` | Home, Games | Photo of arcade cabinets. |
| `images/bulk-vending.webp` | Home, Games | Photo of bulk vending machines. |
| `images/lrd-tag.svg` | Footer | Built-by-LRD tag — copy from `ssnwa-site/images/lrd-tag.svg`. |

## Nice-to-have (not yet referenced)

- `images/hero-bg.webp` — Colorful arcade floor shot for the hero section
- `images/venue-*.webp` — Photos of actual partner venues for the Venues page
- `images/map-nwa.svg` — NWA service area map illustration for the Locations page

## Notes

- Use WebP for photos (smaller than JPG, broad support)
- Use SVG for logos and icons when possible
- Keep file sizes under 200KB where possible — this site is fast, let's keep it that way
