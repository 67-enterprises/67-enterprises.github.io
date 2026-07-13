/* Mobile menu, anchor-focus a11y, and scroll-spy.
   Plain IIFE — loaded with <script defer>, so no modules and the DOM is ready. */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("nav-toggle");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll(".nav__link")) : [];

  /* Must match the `max-width: 640px` breakpoint in base.css: above it the nav is
     always visible, so any leftover [data-open] state has to be cleared. */
  var MOBILE_MAX = 640;

  /* ---------- Mobile menu ---------- */

  var iconOpen = toggle ? toggle.querySelector(".icon-open") : null;
  var iconClose = toggle ? toggle.querySelector(".icon-close") : null;

  // base.css styles the two glyphs but never swaps them, so JS owns their display.
  function setIcons(open) {
    if (iconOpen) iconOpen.style.display = open ? "none" : "block";
    if (iconClose) iconClose.style.display = open ? "block" : "none";
  }

  function isOpen() {
    return !!nav && nav.getAttribute("data-open") === "true";
  }

  function setMenu(open) {
    if (!nav || !toggle) return;
    if (open) nav.setAttribute("data-open", "true");
    else nav.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    setIcons(open);
  }

  if (nav && toggle) {
    setMenu(false); // normalize markup + icons on load

    toggle.addEventListener("click", function () {
      setMenu(!isOpen());
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Rotating/resizing past the breakpoint while open would otherwise leave the
    // panel stuck open (and aria-expanded lying) on the desktop layout.
    window.addEventListener("resize", function () {
      if (window.innerWidth > MOBILE_MAX && isOpen()) setMenu(false);
    });
  }

  /* ---------- Anchor focus (CSS already does the smooth scrolling) ---------- */

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;

    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    var target = document.getElementById(hash.slice(1));
    if (!target) return;

    // Let the browser do the (possibly reduced-motion-suppressed) scroll; we only
    // move the tab order into the section so keyboard users land inside it.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  /* ---------- Scroll-spy ---------- */

  if (!("IntersectionObserver" in window) || !links.length) return;

  var watched = []; // [{ link, section }] — driven by the nav's own hrefs
  links.forEach(function (link) {
    var hash = link.getAttribute("href") || "";
    if (hash.charAt(0) !== "#" || hash.length < 2) return;
    var section = document.getElementById(hash.slice(1));
    if (section) watched.push({ link: link, section: section });
  });

  if (!watched.length) return;

  var current = null;
  var visible = new Map(); // section element -> latest IntersectionObserverEntry

  function setActive(link) {
    if (link === current) return;
    current = link;
    watched.forEach(function (item) {
      if (item.link === link) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  setActive(watched[0].link); // seed, so a link is active before the first callback

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.set(entry.target, entry);
        else visible.delete(entry.target);
      });

      // Several sections can sit in the band at once; pick the most visible, and
      // on a tie the one nearest the top of the viewport. If none intersect (we're
      // between bands) we keep the last active link so exactly one is always set.
      var best = null;
      visible.forEach(function (entry) {
        if (
          !best ||
          entry.intersectionRatio > best.intersectionRatio ||
          (entry.intersectionRatio === best.intersectionRatio &&
            entry.boundingClientRect.top < best.boundingClientRect.top)
        ) {
          best = entry;
        }
      });

      if (!best) return;
      for (var i = 0; i < watched.length; i++) {
        if (watched[i].section === best.target) {
          setActive(watched[i].link);
          break;
        }
      }
    },
    // Thin band across the middle of the viewport: whatever crosses it is "current".
    // The offsets swallow the ~68px sticky header, so no extra top compensation.
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  watched.forEach(function (item) {
    observer.observe(item.section);
  });
})();
