// main.js — small scripts for the portfolio.
// Every part checks that its elements exist first, so removing a section never breaks the page.
(function () {
  'use strict';

  var root = document.documentElement;
  // CSS only hides things for the scroll animation once this class is set,
  // so if this file fails to load, all content stays visible.
  root.classList.add('js-ready');

  // ----- Dark / light theme (the choice is saved in localStorage) -----
  var themeBtn = document.querySelector('.theme-toggle');
  var systemLight = window.matchMedia('(prefers-color-scheme: light)');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }
  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  if (themeBtn) {
    setTheme(currentTheme());
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      setTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode: not saved */ }
    });
  }
  // If the visitor never picked a theme, follow their system setting when it changes.
  systemLight.addEventListener('change', function (e) {
    if (!savedTheme()) setTheme(e.matches ? 'light' : 'dark');
  });

  // ----- Header becomes solid after scrolling 20px -----
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Mobile menu -----
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function isMenuOpen() {
    return root.classList.contains('menu-open');
  }
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // While the menu is open, the rest of the page cannot be clicked or tabbed to.
    document.querySelectorAll('.skip-link, main, .site-footer').forEach(function (el) {
      el.inert = open;
    });
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });
    // Close after choosing a link, or when clicking the empty space around the links.
    nav.addEventListener('click', function (e) {
      if (isMenuOpen() && (e.target === nav || e.target.closest('a'))) setMenu(false);
    });
    // Close with the Escape key and put focus back on the menu button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // Close if the window grows to desktop size.
    window.matchMedia('(min-width: 768px)').addEventListener('change', function () {
      if (isMenuOpen()) setMenu(false);
    });
  }

  // ----- Highlight the menu link of the section on screen -----
  var navLinks = document.querySelectorAll('.site-nav__link[href^="#"]');
  var sections = document.querySelectorAll('main section[id]');
  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var on = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', on);
          if (on) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' }); // a thin line across the middle of the screen
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();
