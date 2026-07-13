/* Intro overlay controller.
   Plays the "67" hand animation, then gets out of the way — always. */

(function () {
  "use strict";

  var intro = document.getElementById("intro");
  if (!intro) return;

  var skip = document.getElementById("intro-skip");
  var HOLD_MS = 2000; // how long the animation plays before auto-exit
  var EXIT_FALLBACK_MS = 1200; // must exceed --dur-slow (600ms) with headroom

  /* Reduced motion: no overlay at all, and never lock the page. */
  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    remove();
    return;
  }

  var dismissed = false;
  var removed = false;

  function remove() {
    if (removed) return;
    removed = true;
    intro.classList.add("is-gone");
    intro.hidden = true;
    document.body.classList.remove("intro-open");
  }

  function dismiss() {
    if (dismissed) return; // idempotent: any trigger may fire more than once
    dismissed = true;

    intro.classList.add("is-leaving");
    document.body.classList.remove("intro-open");

    /* transitionend is the happy path, but it silently never fires if the
       transition is interrupted, the tab is backgrounded, or the property
       doesn't actually change. A full-screen overlay that never leaves would
       lock the user out of the site, so a timeout force-removes it regardless. */
    intro.addEventListener("transitionend", remove, { once: true });
    window.setTimeout(remove, EXIT_FALLBACK_MS);

    teardown();
  }

  function teardown() {
    if (skip) skip.removeEventListener("click", onSkip);
    intro.removeEventListener("click", dismiss);
    document.removeEventListener("keydown", dismiss);
    window.removeEventListener("scroll", dismiss);
    window.removeEventListener("wheel", dismiss);
    window.removeEventListener("touchmove", dismiss);
  }

  function onSkip(e) {
    e.stopPropagation();
    dismiss();
  }

  document.body.classList.add("intro-open");

  if (skip) skip.addEventListener("click", onSkip);
  intro.addEventListener("click", dismiss);
  document.addEventListener("keydown", dismiss);
  window.addEventListener("scroll", dismiss, { passive: true });
  window.addEventListener("wheel", dismiss, { passive: true });
  window.addEventListener("touchmove", dismiss, { passive: true });

  window.setTimeout(dismiss, HOLD_MS);

  /* Back/forward cache can restore the page mid-intro with stale state; make
     sure we never come back to a live overlay. */
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) remove();
  });
})();
