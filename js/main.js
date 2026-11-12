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

  // ----- Screen reader announcements ("Copied!") -----
  var liveRegion = document.getElementById('live-region');
  function announce(message) {
    if (!liveRegion) return;
    liveRegion.textContent = '';
    setTimeout(function () { liveRegion.textContent = message; }, 50);
  }

  // ----- Copy buttons -----
  // A button with data-copy="text" copies that text.
  // A button with data-copy-from="#id" copies that link's email address (or its text).
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    // Older way, still needed when the page is opened straight from a file.
    var active = document.activeElement;
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    area.remove();
    if (active && active.focus) active.focus();
    return ok;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy], [data-copy-from]');
    if (!btn) return;

    var text = btn.getAttribute('data-copy') || '';
    var from = btn.getAttribute('data-copy-from');
    if (from) {
      var source = document.querySelector(from);
      if (source) {
        text = (source.getAttribute('href') || '').replace(/^mailto:/, '') || source.textContent.trim();
      }
    }
    if (!text) return;

    var label = btn.querySelector('.copy-btn__label');
    if (label && !btn.hasAttribute('data-label')) btn.setAttribute('data-label', label.textContent);

    copyText(text).then(function (ok) {
      var message = ok ? 'Copied!' : 'Could not copy. Please select the text and copy it.';
      if (label) label.textContent = ok ? 'Copied!' : 'Copy failed';
      btn.classList.toggle('is-copied', ok);
      announce(message);
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(function () {
        if (label) label.textContent = btn.getAttribute('data-label');
        btn.classList.remove('is-copied');
      }, 2000);
    });
  });

  // ----- Video pop-up -----
  var modal = document.getElementById('video-modal');
  var frame = modal && modal.querySelector('.video-modal__frame');
  var modalTitle = document.getElementById('video-modal-title');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var lastTrigger = null;

  function youTubeId(url) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  function openVideo(btn) {
    var src = btn.getAttribute('data-video');
    if (!src || !modal || !frame || typeof modal.showModal !== 'function') return;
    var title = btn.getAttribute('data-title') || 'Demo video';
    var autoplay = !reduceMotion.matches; // with reduced motion, the visitor presses play
    var id = youTubeId(src);
    var player;

    if (id) {
      player = document.createElement('iframe');
      player.src = 'https://www.youtube-nocookie.com/embed/' + id +
        '?mute=1&loop=1&playlist=' + id + '&rel=0' + (autoplay ? '&autoplay=1' : '');
      player.title = title;
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.allowFullscreen = true;
    } else {
      // The video file only starts downloading now, when the pop-up opens.
      player = document.createElement('video');
      player.src = src;
      player.muted = true;
      player.loop = true;
      player.playsInline = true;
      player.controls = true;
      player.autoplay = autoplay;
      var poster = btn.getAttribute('data-poster');
      if (poster) player.poster = poster;
      player.setAttribute('aria-label', title);
    }

    if (modalTitle) modalTitle.textContent = title;
    frame.replaceChildren(player);
    lastTrigger = btn;
    modal.showModal(); // the browser keeps focus inside and closes it with Esc
  }

  if (modal && frame) {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.video-btn');
      if (btn) openVideo(btn);
    });
    var closeBtn = modal.querySelector('.video-modal__close');
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });
    // Clicking the dark area around the video closes it.
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
    // However it was closed: stop the video and return focus to the button.
    modal.addEventListener('close', function () {
      frame.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });
  }
})();
