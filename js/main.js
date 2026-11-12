// main.js — small scripts for the portfolio.
// Every part checks that its elements exist first, so removing a section never breaks the page.
// Each effect is its own function (initTilt, initScramble, …): delete the call at the bottom to turn one off.
(function () {
  'use strict';

  var root = document.documentElement;
  // CSS only hides things for the scroll animation once this class is set,
  // so if this file fails to load, all content stays visible.
  root.classList.add('js-ready');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  // ----- Footer year (always the current year) -----
  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  // ----- Dark / light theme (the choice is saved in localStorage) -----
  var themeBtn = document.querySelector('.theme-toggle');

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

  // Switch theme. If the browser supports it, the new theme grows as a circle from the toggle button.
  function toggleTheme() {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: not saved */ }

    if (!document.startViewTransition || reduceMotion.matches || !themeBtn) {
      setTheme(next);
      return;
    }
    var box = themeBtn.getBoundingClientRect();
    var x = box.left + box.width / 2;
    var y = box.top + box.height / 2;
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var transition = document.startViewTransition(function () { setTheme(next); });
    transition.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function () { /* the plain switch already happened */ });
  }

  function initTheme() {
    if (themeBtn) {
      setTheme(currentTheme());
      themeBtn.addEventListener('click', toggleTheme);
    }
    // If the visitor never picked a theme, follow their system setting when it changes.
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      if (!savedTheme()) setTheme(e.matches ? 'light' : 'dark');
    });
  }

  // ----- Header becomes solid after scrolling 20px, and the progress bar fills -----
  function initScroll() {
    var header = document.querySelector('.site-header');
    var bar = document.querySelector('.scroll-progress');
    var needsBar = bar && !(window.CSS && CSS.supports('animation-timeline: scroll()'));
    var ticking = false;

    function update() {
      ticking = false;
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
      if (needsBar) {
        var max = document.documentElement.scrollHeight - innerHeight;
        bar.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      }
    }
    requestAnimationFrame(update);
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  // ----- Mobile menu -----
  function initMenu() {
    var menuBtn = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!menuBtn || !nav) return;

    function isOpen() { return root.classList.contains('menu-open'); }
    function setMenu(open) {
      root.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      // While the menu is open, the rest of the page cannot be clicked or tabbed to.
      document.querySelectorAll('.skip-link, main, .site-footer').forEach(function (el) { el.inert = open; });
    }

    menuBtn.addEventListener('click', function () { setMenu(!isOpen()); });
    // Close after choosing a link, or when clicking the empty space around the links.
    nav.addEventListener('click', function (e) {
      if (isOpen() && (e.target === nav || e.target.closest('a'))) setMenu(false);
    });
    // Close with the Escape key and put focus back on the menu button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setMenu(false); menuBtn.focus(); }
    });
    // Close if the window grows to desktop size.
    window.matchMedia('(min-width: 768px)').addEventListener('change', function () {
      if (isOpen()) setMenu(false);
    });
  }

  // ----- Highlight the menu link of the section on screen -----
  function initActiveNav() {
    var links = document.querySelectorAll('.site-nav__link[href^="#"]');
    var sections = document.querySelectorAll('main section[id]');
    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var on = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', on);
          if (on) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' }); // a thin line across the middle of the screen
    sections.forEach(function (s) { observer.observe(s); });
  }

  // ----- Scroll reveal: blocks fade and slide up once, when 15% is on screen -----
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ----- Effect 1: split-text hero name (each word rises from behind a mask) -----
  function initSplitText() {
    var title = document.querySelector('.hero__title');
    if (!title || reduceMotion.matches) return;
    var text = title.textContent.trim();
    title.setAttribute('aria-label', text); // screen readers read the whole name once
    title.textContent = '';
    text.split(/\s+/).forEach(function (word, i) {
      var outer = document.createElement('span');
      outer.className = 'word';
      outer.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span');
      inner.className = 'word__inner';
      inner.style.setProperty('--i', i);
      inner.textContent = word;
      outer.appendChild(inner);
      title.appendChild(outer);
      title.appendChild(document.createTextNode(' '));
    });
    title.classList.add('is-split');
  }

  // ----- Effect 2: text scramble on hover (nav links and section labels) -----
  function initScramble() {
    if (reduceMotion.matches) return;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    document.querySelectorAll('.scramble').forEach(function (el) {
      var original = el.textContent;
      var running = false;
      function run() {
        if (running) return;
        running = true;
        el.style.minWidth = el.offsetWidth + 'px'; // keep the width still while letters change
        var start = performance.now();
        var duration = 400;
        function frame(now) {
          var progress = Math.min((now - start) / duration, 1);
          var settled = Math.floor(progress * original.length);
          var out = '';
          for (var i = 0; i < original.length; i++) {
            var c = original[i];
            out += (i < settled || c === ' ') ? c : chars[Math.floor(Math.random() * chars.length)];
          }
          el.textContent = out;
          if (progress < 1) requestAnimationFrame(frame);
          else { el.textContent = original; el.style.minWidth = ''; running = false; }
        }
        requestAnimationFrame(frame);
      }
      el.addEventListener('mouseenter', run);
      el.addEventListener('focus', run);
    });
  }

  // ----- Effects 3 + 4: 3D tilt and cursor spotlight on project cards (mouse only) -----
  function initTilt() {
    if (!finePointer.matches || reduceMotion.matches) return;
    document.querySelectorAll('.project-card').forEach(function (card) {
      var frameId = null;
      var px = 0, py = 0;
      function draw() {
        frameId = null;
        var box = card.getBoundingClientRect();
        var x = (px - box.left) / box.width;   // 0 … 1
        var y = (py - box.top) / box.height;   // 0 … 1
        var max = card.classList.contains('project-card--featured') ? 3 : 6; // the wide card tilts less
        card.style.transform = 'perspective(800px) rotateX(' + ((0.5 - y) * max).toFixed(2) +
          'deg) rotateY(' + ((x - 0.5) * max).toFixed(2) + 'deg) translateY(-4px)';
        card.style.setProperty('--x', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--y', (y * 100).toFixed(1) + '%');
      }
      card.addEventListener('mousemove', function (e) {
        px = e.clientX; py = e.clientY;
        card.classList.add('is-tilting');
        if (!frameId) frameId = requestAnimationFrame(draw);
      });
      card.addEventListener('mouseleave', function () {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = null;
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
  }

  // ----- Effect 5: magnetic buttons (drift up to 10px toward the mouse) -----
  function initMagnetic() {
    if (!finePointer.matches || reduceMotion.matches) return;
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var frameId = null, dx = 0, dy = 0;
      function draw() { frameId = null; btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)'; }
      btn.addEventListener('mousemove', function (e) {
        var box = btn.getBoundingClientRect();
        dx = ((e.clientX - box.left) / box.width - 0.5) * 20;
        dy = ((e.clientY - box.top) / box.height - 0.5) * 20;
        dx = Math.max(-10, Math.min(10, dx)).toFixed(1);
        dy = Math.max(-10, Math.min(10, dy)).toFixed(1);
        if (!frameId) frameId = requestAnimationFrame(draw);
      });
      btn.addEventListener('mouseleave', function () {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = null;
        btn.style.transform = '';
      });
    });
  }

  // ----- Quick stats count up from 0 when first seen (only if you add stats) -----
  function initCountUp() {
    var items = document.querySelectorAll('[data-count]');
    if (!items.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var el = entry.target;
        var end = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.textContent.replace(/[\d.,\s]/g, ''); // keeps "+" or "%" you wrote
        var start = performance.now();
        (function frame(now) {
          var p = Math.min((now - start) / 1000, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(frame);
        })(start);
      });
    }, { threshold: 0.5 });
    items.forEach(function (el) { observer.observe(el); });
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

  function initCopy() {
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
        if (label) label.textContent = ok ? 'Copied!' : 'Copy failed';
        btn.classList.toggle('is-copied', ok);
        announce(ok ? 'Copied!' : 'Could not copy. Please select the text and copy it.');
        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(function () {
          if (label) label.textContent = btn.getAttribute('data-label');
          btn.classList.remove('is-copied');
        }, 2000);
      });
    });
  }

  // ----- Video pop-up -----
  function youTubeId(url) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  function initVideo() {
    var modal = document.getElementById('video-modal');
    var frame = modal && modal.querySelector('.video-modal__frame');
    var modalTitle = document.getElementById('video-modal-title');
    var lastTrigger = null;
    if (!modal || !frame || typeof modal.showModal !== 'function') return;

    function openVideo(btn) {
      var src = btn.getAttribute('data-video');
      if (!src) return;
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
      } else {
        // The video file only starts downloading now, when the pop-up opens.
        player = document.createElement('video');
        player.src = src;
        player.muted = true;
        player.loop = true;
        player.playsInline = true;
        player.controls = true;
        player.preload = 'none';
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

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.video-btn');
      if (btn) openVideo(btn);
    });
    var closeBtn = modal.querySelector('.video-modal__close');
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });
    // Clicking the dark area around the video closes it.
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
    // However it was closed: stop the video and return focus to the button.
    modal.addEventListener('close', function () {
      frame.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });
  }

  // ----- Keyboard shortcuts: T = theme, ? = show the tip -----
  function initShortcuts() {
    var tip = document.getElementById('shortcuts');
    var tipBtn = document.querySelector('.footer__keys');

    function setTip(open) {
      if (!tip) return;
      tip.hidden = !open;
      if (tipBtn) tipBtn.setAttribute('aria-expanded', String(open));
    }
    if (tipBtn) tipBtn.addEventListener('click', function () { setTip(tip.hidden); });

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target;
      // never while typing in a field
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.querySelector('dialog[open]')) return;
      if (e.key === 't' || e.key === 'T') toggleTheme();
      else if (e.key === '?') setTip(tip && tip.hidden);
      else if (e.key === 'Escape' && tip && !tip.hidden) setTip(false);
    });
  }

  // ----- Start everything (delete a line to switch that part off) -----
  initYear();
  initTheme();
  initScroll();
  initMenu();
  initActiveNav();
  initSplitText();
  initReveal();
  initScramble();
  initTilt();
  initMagnetic();
  initCountUp();
  initCopy();
  initVideo();
  initShortcuts();
})();
