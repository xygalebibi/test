# Portfolio — home page

Static home page: `index.html` + `styles.css` + `script.js`. No build step; open `index.html` in a browser.

## Customising
- **Colours** — CSS variables at the top of `styles.css` (`--deep`, `--yellow`, `--coral`, `--peri`…).
- **Project images** — each `.art--*` div is a gradient placeholder. Swap it for an `<img>` (with `style="width:100%;height:100%;object-fit:cover"`) or set `background-image`.
- **Copy, clients, email, socials** — all in `index.html`.

## Motion
Drifting gradient hero, letter-by-letter name reveal, scroll reveals, sticker mouse-parallax, client marquee, "View" cursor on projects, hover states on services. All animation is turned off for `prefers-reduced-motion`.
