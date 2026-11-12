// main.js — small scripts for the portfolio.
// Every part checks that its elements exist first, so removing a section never breaks the page.
(function () {
  'use strict';

  var root = document.documentElement;
  // CSS only hides things for the scroll animation once this class is set,
  // so if this file fails to load, all content stays visible.
  root.classList.add('js-ready');
})();
