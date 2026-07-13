# 67-enterprises.github.io

The website for **67 Enterprises** — an independent developer collective building rapid
prototypes and open-source tools.

Live at **https://67-enterprises.github.io**

## Editing the content

Almost everything you'll want to change lives in one file: **`assets/js/data.js`**.

- **Co-founders** — edit the `founders` array. The `github` handle drives the avatar
  automatically (`https://github.com/<handle>.png`), so there is no image to upload.
- **Products** — edit the `products` array. Set `demo: null` and the card renders with just
  the GitHub link, no dead button.
- Adding or removing an entry is a one-line change; the grids reflow on their own.

Everything currently marked `TODO:` is placeholder copy waiting on real content.

## Deploying

This is a plain static site — **no build step, no dependencies, no npm**. GitHub Pages serves
the repository root, so any push to `main` is live within a minute.

To preview locally:

```sh
python -m http.server 8067
# → http://127.0.0.1:8067
```

Note that `assets/js/render.js` is an ES module, so you do need to serve over HTTP —
opening `index.html` straight off the filesystem will trip CORS and the cards won't render.

## How it fits together

| File | Role |
| --- | --- |
| `index.html` | All markup: intro overlay, header, hero, about, team, products, footer |
| `assets/css/tokens.css` | Design tokens. Every color resolves through these, which is what makes light/dark work |
| `assets/css/base.css` | Reset, layout primitives, nav, footer |
| `assets/css/intro.css` | Hand animation + hero |
| `assets/css/sections.css` | Cards, grids, price badge |
| `assets/css/fonts.css` | Self-hosted Inter / Space Grotesk / JetBrains Mono — no CDN call |
| `assets/js/data.js` | **Content lives here** |
| `assets/js/theme.js` | Light/dark toggle (initial theme is resolved inline in `<head>` to avoid a flash) |
| `assets/js/intro.js` | Intro timing, skip, reduced-motion bypass |
| `assets/js/nav.js` | Mobile menu, scroll-spy |
| `assets/js/render.js` | Builds the team + product cards from `data.js` |

The theme follows the visitor's OS preference on first visit, then remembers their toggle
choice in `localStorage`. The intro animation is skippable and is not shown at all to visitors
who have "reduce motion" enabled.

## License

[MIT](LICENSE). Fork it, strip it, ship your own.
