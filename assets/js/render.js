/* ============================================================================
 * Renders the team + product grids from assets/js/data.js.
 *
 * Everything user-supplied (names, bios, taglines, tags) goes in via
 * textContent, never innerHTML — so an apostrophe, an ampersand, or a stray
 * `<script>` in data.js is rendered as literal text and can never become
 * markup. innerHTML is used in exactly one place: the static icon paths that
 * are authored right here in this file.
 * ==========================================================================*/

import { founders, productCategories, products, LIST_PRICE } from "./data.js";

const PRODUCT_FALLBACK_IMAGE = "assets/images/products/67-enterprises-fallback.png";

/* ---------- Inline icons (static, authored here — safe for innerHTML) ------ */

const ICONS = {
  github: `<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3.6 5.6H.9V15h2.7V5.6ZM2.25 1A1.56 1.56 0 0 0 .7 2.56c0 .86.68 1.56 1.52 1.56h.02a1.56 1.56 0 0 0 .01-3.12ZM15.3 9.6c0-2.5-1.34-3.66-3.12-3.66-1.44 0-2.08.79-2.44 1.34V5.6H7.05c.04.76 0 9.4 0 9.4h2.69V9.75c0-.24.02-.48.09-.65.19-.48.63-.98 1.37-.98.97 0 1.36.74 1.36 1.81V15h2.7V9.6Z"/></svg>`,
};

/**
 * Small DOM helper. `text` is always set via textContent, never parsed as HTML.
 */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = String(text);
  return node;
}

/** External link that can't be used for reverse-tabnabbing. */
function externalLink(href, className, label) {
  const a = el("a", className);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  if (label) a.setAttribute("aria-label", label);
  return a;
}

/* ---------- Team ---------- */

function teamCard(person) {
  const li = el("li", "card team-card");

  const img = el("img", "team-card__avatar");
  img.src = `https://github.com/${encodeURIComponent(person.github)}.png?size=200`;
  // Intrinsic size reserves the box before the image lands → no layout shift.
  img.width = 96;
  img.height = 96;
  img.loading = "lazy";
  img.decoding = "async";
  // Decorative: the name sits right next to it, so alt text would just be
  // an echo for a screen-reader user.
  img.alt = "";

  li.append(
    img,
    el("h3", "team-card__name", person.name),
    el("p", "team-card__role", person.role),
    el("p", "team-card__bio", person.bio)
  );

  const links = el("ul", "card__foot icon-links");

  const ghItem = document.createElement("li");
  const gh = externalLink(
    `https://github.com/${encodeURIComponent(person.github)}`,
    "icon-link",
    `${person.name} on GitHub`
  );
  gh.innerHTML = ICONS.github; // static markup, authored above
  ghItem.append(gh);
  links.append(ghItem);

  if (person.linkedin) {
    const liItem = document.createElement("li");
    const ln = externalLink(person.linkedin, "icon-link", `${person.name} on LinkedIn`);
    ln.innerHTML = ICONS.linkedin; // static markup, authored above
    liItem.append(ln);
    links.append(liItem);
  }

  li.append(links);
  return li;
}

/* ---------- Products ---------- */

function productCard(product) {
  const li = el("li", "card product-card");

  const media = el("div", "product-card__media");
  const image = el("img", "product-card__image");
  image.src = product.image || PRODUCT_FALLBACK_IMAGE;
  image.alt = product.image ? (product.imageAlt || product.name) : "";
  image.width = 1600;
  image.height = 900;
  image.loading = "lazy";
  image.decoding = "async";
  const mark = el("span", "product-card__mark", "67");
  mark.setAttribute("aria-hidden", "true");
  media.append(image, mark);

  li.append(
    media,
    el("h3", "product-card__name", product.name),
    el("p", "product-card__tagline", product.tagline)
  );

  if (Array.isArray(product.tags) && product.tags.length) {
    const tags = el("ul", "tags");
    for (const tag of product.tags) tags.append(el("li", "tag", tag));
    li.append(tags);
  }

  const foot = el("div", "card__foot");

  /* Price row. The struck $67 is a gag, not a price: it's aria-hidden so no
     screen reader ever announces "sixty-seven dollars", and the row exposes a
     single sr-only "Free" instead. */
  const price = el("p", "price");
  price.append(el("span", "sr-only", "Free"));

  const was = el("s", "price__was", `$${LIST_PRICE}`);
  was.setAttribute("aria-hidden", "true");

  const free = el("span", "price__free", "Free");
  free.setAttribute("aria-hidden", "true");

  price.append(was, free);
  foot.append(price);

  const links = el("div", "card__links");
  const repo = externalLink(product.repo, "btn btn--ghost btn--sm");
  repo.textContent = "GitHub";
  repo.setAttribute("aria-label", `${product.name} on GitHub`);
  links.append(repo);

  // No demo → no button at all. A disabled/dead link would be worse than none.
  if (product.demo) {
    const demo = externalLink(product.demo, "btn btn--primary btn--sm");
    demo.textContent = "Try it out!";
    demo.setAttribute("aria-label", `Try ${product.name}`);
    links.append(demo);
  }

  foot.append(links);
  li.append(foot);
  return li;
}

/* ---------- Mount ---------- */

/** Renders `items` into `#id`, or does nothing if the container isn't there. */
function mount(id, items, build) {
  const container = document.getElementById(id);
  if (!container) return;

  const frag = document.createDocumentFragment();
  for (const item of items) frag.append(build(item));

  container.replaceChildren(frag);
}

function mountProductGroups() {
  const container = document.getElementById("product-groups");
  if (!container) return;

  const frag = document.createDocumentFragment();

  for (const category of productCategories) {
    const categoryProducts = products.filter((product) => product.category === category.id);
    if (!categoryProducts.length) continue;

    const group = el("section", "product-group");
    const titleId = `product-group-${category.id}`;
    group.setAttribute("aria-labelledby", titleId);

    const heading = el("h3", "product-group__title", category.name);
    heading.id = titleId;
    const intro = el("p", "product-group__intro", category.intro);
    const grid = el("ul", "product-grid");

    for (const product of categoryProducts) grid.append(productCard(product));

    group.append(heading, intro, grid);
    frag.append(group);
  }

  container.replaceChildren(frag);
}

mount("team-grid", founders, teamCard);
mountProductGroups();

const productCount = document.getElementById("product-count");
if (productCount) productCount.textContent = String(products.length);

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
