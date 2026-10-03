# Xygarathma — portfolio home page

Static home page: `index.html` + `styles.css` + `script.js` + `images/`. No build step; open `index.html` in a browser.
`xygarathma-home.html` is the same page bundled into one self-contained file (CSS, JS and images inlined) for sharing.

## Customising
- **Colours** — CSS variables at the top of `styles.css` (`--bg`, `--orange`, `--yellow`, `--ink`…).
- **Rotating headline** — the `phrases` list in `script.js`.
- **3D gallery** — the `.ring__card` images in the hero of `index.html`.
- **Project images** — in `images/`. Replace a file (same name) or point the `<img>` at a new one.
- **Links** — nav/footer point at `about.html`, `playground.html`, `contact.html` (pages still to be built). Behance/LinkedIn URLs are `#` (marked TODO).

## Motion
Rotating "You can find my work…" line, slowly turning curved 3D gallery (nudged by scrolling, slows on hover), scroll reveals, floating orange dots, "View" cursor on projects, breathing ellipses in the footer. All animation is turned off for `prefers-reduced-motion`.
