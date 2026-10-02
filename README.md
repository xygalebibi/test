# Portfolio — home page

Static home page: `index.html` + `styles.css` + `script.js`. No build step; open `index.html` in a browser.

## Customising
- **Colours** — CSS variables at the top of `styles.css` (`--deep`, `--yellow`, `--coral`, `--peri`…).
- **Project images** — in `images/`, pulled from xygarathma.com. Replace a file (same name) or point the `<img>` at a new one. The about-me portrait is still a placeholder (`.art--portrait`).
- **Copy, recognition strip, email, socials** — all in `index.html`. Behance/LinkedIn URLs are still `#` (marked TODO).

## Motion
Drifting gradient hero, letter-by-letter name reveal, scroll reveals, sticker mouse-parallax, client marquee, "View" cursor on projects, hover states on services. All animation is turned off for `prefers-reduced-motion`.
