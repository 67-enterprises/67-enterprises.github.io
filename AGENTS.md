# 67 Enterprises — site

Public landing site for the 67 Enterprises developer collective. One page, three sections
(Hero/About, Team, Products), light + dark themes, and an intro animation of two hands doing
the "67" motion.

## Architecture

**Vanilla static site. No build step, no npm, no dependencies.** This is a GitHub *org Pages*
repo, so the repository root is served directly at https://67-enterprises.github.io — any push
to `main` is live within a minute. Don't introduce a bundler or a framework without asking;
the zero-build property is deliberate.

| Path | Role |
| --- | --- |
| `index.html` | All markup: intro overlay, header, hero, about, team, products, footer |
| `assets/js/data.js` | **All site content.** Founders + products live here and nowhere else |
| `assets/js/render.js` | ES module; builds team + product cards from `data.js` |
| `assets/js/theme.js` | Light/dark toggle + persistence |
| `assets/js/intro.js` | Intro timing, skip, reduced-motion + deep-link bypass |
| `assets/js/nav.js` | Mobile menu, scroll-spy |
| `assets/css/tokens.css` | Design tokens — **every** color resolves through these |
| `assets/css/base.css` | Reset, layout primitives, nav, footer |
| `assets/css/intro.css` | Hand animation + hero |
| `assets/css/sections.css` | Cards, grids, price badge |

## Conventions that matter

- **Never hardcode a color.** Use `var(--…)` from `tokens.css`. Both themes work for free
  because `theme.js` only flips `data-theme` on `<html>`; no component knows a theme exists.
- **Content changes go in `data.js`, not the HTML.** A founder's `github` handle drives their
  avatar (`https://github.com/<handle>.png`) — no image uploads, no API calls. A product with
  `demo: null` renders without a demo button; don't add a disabled one.
- **User-supplied strings go in via `textContent`, never `innerHTML`.** `innerHTML` is only for
  the static inline SVG icons authored in `render.js`. An apostrophe in a bio must never be
  able to break the page.
- **Responsive grids use `repeat(auto-fit, minmax(min(300px, 100%), 1fr))`.** The `min(…, 100%)`
  is load-bearing: a bare `minmax(300px, 1fr)` can't shrink below its min and overflows at
  320px. Don't "simplify" it away.
- The intro overlay must always be escapable: skip button, click, keypress, a hard timeout, a
  reduced-motion bypass, and a deep-link bypass. It's a full-screen fixed layer — if it ever
  fails to leave, the site is bricked.
- Everything is priced `$67` struck through, next to a FREE badge. The struck price is
  `aria-hidden`; screen readers hear only "Free". It's a joke, not a price.

## Running it

```sh
python -m http.server 8067    # → http://127.0.0.1:8067
```

`render.js` is an ES module, so it **must** be served over HTTP — opening `index.html` from
the filesystem trips CORS and the cards silently don't render.

## Verifying changes in a browser (read this before writing a test harness)

There's no Node here. The working approach is headless Chrome at
`/c/Program Files/Google/Chrome/Application/chrome.exe`, driving the page from a *same-origin
iframe* harness that clicks, scrolls, and resizes it. Three traps cost real time before —
don't rediscover them:

1. **`--virtual-time-budget` silently suppresses IntersectionObserver callbacks.** It made
   scroll-spy look broken when it was fine. If you're testing anything observer-driven, run on
   real time and hold the `load` event open instead (serve a `/slow` endpoint that sleeps, and
   reference it from an `<img>`; Chrome screenshots/`--dump-dom` after `load`).
2. **Windows clamps the headless window to ~500px minimum width.** A `--window-size=390,…`
   screenshot renders at 500px and gets *cropped* to 390 — it looks exactly like a horizontal
   overflow bug but isn't. Measure `documentElement.scrollWidth` inside an iframe set to an
   exact width instead of trusting the picture.
3. **`--dump-dom` beats `--screenshot` for assertions** (no paint-timing flakiness). For a
   real JS-disabled render, use `<iframe sandbox="">` — `--blink-settings=scriptEnabled=false`
   breaks both dump-dom and screenshot.

## Permissions gotcha

`.Codex/settings.local.json` (gitignored) auto-allows edits in this repo. Do **not** add
`Edit(/**)` / `Write(/**)` to the deny list: `/**` matches every absolute path *including this
repo*, deny overrides allow, and it locks up all file editing — including of that file itself.
There is no deny pattern meaning "everywhere except here"; the allow list already scopes
writes to the repo, and anything outside it falls through to a prompt.
