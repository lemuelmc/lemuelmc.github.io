(function () {
  'use strict';

  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var query = window.matchMedia('(prefers-color-scheme: dark)');

  function storedTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return storedTheme() || (query.matches ? 'dark' : 'light');
  }

  /** @param {string} theme */
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      var label = 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    }
  }

  apply(currentTheme());

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) { /* storage unavailable — theme still applies for this visit */ }
      apply(next);
    });
  }

  // Follow live system changes while the user has not made an explicit choice.
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', function (event) {
      if (!storedTheme()) {
        apply(event.matches ? 'dark' : 'light');
      }
    });
  }
})();
