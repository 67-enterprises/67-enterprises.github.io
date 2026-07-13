/* Theme toggle.
 *
 * The initial theme is resolved by the inline script in <head> so there is no
 * flash of the wrong theme; this file only handles the toggle and persistence.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function sync() {
    var isDark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  function set(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {
        /* private mode: the toggle still works, it just won't be remembered */
      }
    }
    sync();
  }

  toggle.addEventListener("click", function () {
    set(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  // Follow the OS only until the user has expressed a preference of their own.
  media.addEventListener("change", function (e) {
    var saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch (err) {
      /* ignore */
    }
    if (!saved) set(e.matches ? "dark" : "light", false);
  });

  sync();
})();
