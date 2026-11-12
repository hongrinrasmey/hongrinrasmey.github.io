// main.js: one function per feature (delete its call at the bottom to turn it off).
// Each checks its elements exist, so removing a section never breaks the page.
(function () {
  'use strict';

  var root = document.documentElement;
  // Reveal blocks hide only once this is set, so content shows if JS fails
  root.classList.add('js-ready');

  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  var hasIO = 'IntersectionObserver' in window;

  // Khmer font: load Noto Sans Khmer only if the page has Khmer letters
  function initKhmerFont() {
    if (!/[ក-៿᧠-᧿]/.test(document.body.textContent)) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // Footer year
  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  // Dark / light theme (the choice is saved in localStorage)
  var themeBtn = document.querySelector('.theme-toggle');

  function currentTheme() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
  }

  // The new theme grows as a circle from the toggle (View Transitions), or just switches.
  function toggleTheme() {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: not saved */ }
    if (!document.startViewTransition || reduceMotion.matches || !themeBtn) return setTheme(next);

    var box = themeBtn.getBoundingClientRect();
    var x = box.left + box.width / 2, y = box.top + box.height / 2;
    var at = 'px at ' + x + 'px ' + y + 'px)';
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(function () { setTheme(next); }).ready.then(function () {
      root.animate({ clipPath: ['circle(0' + at, 'circle(' + radius + at] },
        { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(function () { /* the plain switch already happened */ });
  }

  function initTheme() {
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    setTheme(currentTheme());
    // No saved choice: follow the system setting when it changes
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      try { if (localStorage.getItem('theme')) return; } catch (err) { /* ignore */ }
      setTheme(e.matches ? 'light' : 'dark');
    });
  }

  // Header background after 20px scroll; progress bar fallback
  function initScroll() {
    var header = document.querySelector('.site-header');
    var bar = document.querySelector('.scroll-progress');
    var needsBar = bar && !CSS.supports('animation-timeline: scroll()');
    var ticking = false;

    function update() {
      ticking = false;
      if (header) header.classList.toggle('is-scrolled', scrollY > 20);
      if (needsBar) {
        var max = root.scrollHeight - innerHeight;
        bar.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
      }
    }
    requestAnimationFrame(update);
    addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  // Mobile menu
  function initMenu() {
    var menuBtn = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!menuBtn || !nav) return;

    function isOpen() { return root.classList.contains('menu-open'); }
    function setMenu(open) {
      root.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      // While open, the rest of the page can't be clicked or tabbed to
      document.querySelectorAll('.skip-link, main, .site-footer').forEach(function (el) { el.inert = open; });
    }

    menuBtn.addEventListener('click', function () { setMenu(!isOpen()); });
    // Close on a link, or a click on the empty space around the links
    nav.addEventListener('click', function (e) {
      if (isOpen() && (e.target === nav || e.target.closest('a'))) setMenu(false);
    });
    // Esc closes and puts focus back on the menu button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setMenu(false); menuBtn.focus(); }
    });
    matchMedia('(min-width: 768px)').addEventListener('change', function () { setMenu(false); });
  }

  // Highlight the nav link of the section on screen
  function initActiveNav() {
    var links = document.querySelectorAll('.site-nav__link[href^="#"]');
    var sections = document.querySelectorAll('main section[id]');
    if (!links.length || !hasIO) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) links.forEach(function (link) {
          var on = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', on);
          link.setAttribute('aria-current', on);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Scroll reveal: blocks fade and slide up once, when 15% is on screen
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = hasIO && new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) {
      if (observer) observer.observe(el);
      else el.classList.add('is-visible');
    });
  }

  // Hero name: each word rises from behind a mask
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
      outer.innerHTML = '<span class="word__inner" style="--i:' + i + '"></span>';
      outer.firstChild.textContent = word;
      title.append(outer, ' ');
    });
    title.classList.add('is-split');
  }

  // Project cards (mouse only): tilt toward the cursor + spotlight
  function initTilt() {
    if (!finePointer.matches || reduceMotion.matches) return;
    document.querySelectorAll('.project-card').forEach(function (card) {
      var frameId = null, box = null, px = 0, py = 0;
      function draw() {
        frameId = null;
        var x = Math.min(1, Math.max(0, (px - box.left) / box.width)); // clamped: max ±4°
        var y = Math.min(1, Math.max(0, (py - box.top) / box.height));
        card.style.transform = 'perspective(1000px) rotateX(' + ((0.5 - y) * 8).toFixed(2) +
          'deg) rotateY(' + ((x - 0.5) * 8).toFixed(2) + 'deg) translateY(-4px)';
        card.style.setProperty('--x', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--y', (y * 100).toFixed(1) + '%');
      }
      // Measure once per hover
      card.addEventListener('mouseenter', function () { box = card.getBoundingClientRect(); });
      card.addEventListener('mousemove', function (e) {
        px = e.clientX; py = e.clientY;
        if (!box) box = card.getBoundingClientRect();
        card.classList.add('is-tilting');
        if (!frameId) frameId = requestAnimationFrame(draw);
      });
      card.addEventListener('mouseleave', function () {
        cancelAnimationFrame(frameId);
        frameId = box = null;
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
  }

  // Quick stats count up once over 1s (if you add stats)
  function initCountUp() {
    var items = document.querySelectorAll('[data-count]');
    if (!items.length || reduceMotion.matches || !hasIO) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        var end = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.textContent.replace(/[\d.,\s]/g, ''); // keeps a "+" or "%" you wrote
        var start = performance.now();
        (function frame(now) {
          var p = Math.min((now - start) / 1000, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(frame);
        })(start);
      });
    }, { threshold: 0.5 });
    items.forEach(function (el) { observer.observe(el); });
  }

  // Screen reader announcements ("Copied!")
  var live = document.getElementById('live-region');
  function announce(message) {
    if (live) { live.textContent = ''; setTimeout(function () { live.textContent = message; }, 50); }
  }

  // Copy buttons: data-copy="text" or data-copy-from="#id" (link email or text)
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  // Older way, needed when the page is opened from a file
  function fallbackCopy(text) {
    var active = document.activeElement;
    var area = document.createElement('textarea');
    var ok = false;
    area.value = text;
    area.readOnly = true;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    try { ok = document.execCommand('copy'); } catch (e) { /* not allowed */ }
    area.remove();
    if (active && active.focus) active.focus();
    return ok;
  }

  function initCopy() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy], [data-copy-from]');
      if (!btn) return;
      var text = btn.getAttribute('data-copy') || '';
      var source = btn.hasAttribute('data-copy-from') && document.querySelector(btn.getAttribute('data-copy-from'));
      if (source) text = (source.getAttribute('href') || '').replace(/^mailto:/, '') || source.textContent.trim();
      if (!text) return;

      var label = btn.querySelector('.copy-btn__label');
      if (label && !btn.hasAttribute('data-label')) btn.setAttribute('data-label', label.textContent);

      copyText(text).then(function (ok) {
        if (label) label.textContent = ok ? 'Copied!' : 'Copy failed';
        btn.classList.toggle('is-copied', ok);
        announce(ok ? 'Copied!' : 'Could not copy. Select the text and copy it.');
        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(function () {
          if (label) label.textContent = btn.getAttribute('data-label');
          btn.classList.remove('is-copied');
        }, 2000);
      });
    });
  }

  // Video pop-up: an MP4 or YouTube link in data-video
  function initVideo() {
    var modal = document.getElementById('video-modal');
    var frame = modal && modal.querySelector('.video-modal__frame');
    var modalTitle = document.getElementById('video-modal-title');
    var lastTrigger = null;
    if (!frame || !modal.showModal) return;

    function openVideo(btn) {
      var src = btn.getAttribute('data-video');
      if (!src) return;
      var title = btn.getAttribute('data-title') || 'Demo video';
      var autoplay = !reduceMotion.matches; // reduced motion: visitor presses play
      var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
      var player;
      if (yt) {
        player = document.createElement('iframe');
        player.src = 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?mute=1&loop=1&playlist=' + yt[1] +
          '&rel=0' + (autoplay ? '&autoplay=1' : '');
        player.title = title;
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      } else {
        // The file only starts downloading now, when the pop-up opens
        player = document.createElement('video');
        Object.assign(player, { src: src, muted: true, loop: true, playsInline: true, controls: true, preload: 'none', autoplay: autoplay });
        if (btn.getAttribute('data-poster')) player.poster = btn.getAttribute('data-poster');
        player.setAttribute('aria-label', title);
      }
      if (modalTitle) modalTitle.textContent = title;
      // Phone apps get a narrow pop-up (420px), web apps a wide one (900px)
      var tag = btn.closest('.project-card');
      tag = tag && tag.querySelector('.platform-tag');
      modal.classList.toggle('video-modal--phone', !!tag && /android|ios/i.test(tag.textContent));
      frame.replaceChildren(player);
      lastTrigger = btn;
      modal.showModal(); // the browser keeps focus inside and closes it with Esc
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.video-btn');
      if (btn) openVideo(btn);
    });
    modal.querySelector('.video-modal__close').addEventListener('click', function () { modal.close(); });
    // Click outside the video, or Esc ("cancel" stops it at once)
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
    modal.addEventListener('cancel', function () { frame.replaceChildren(); });
    // Closed: stop the video, focus back on the button
    modal.addEventListener('close', function () {
      frame.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });
  }

  // T switches the theme (not while typing in a field)
  function initShortcuts() {
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      if (e.ctrlKey || e.metaKey || e.altKey || document.querySelector('dialog[open]')) return;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 't' || e.key === 'T') toggleTheme();
    });
  }

  // Start everything (delete a line to switch that part off)
  initYear();
  initKhmerFont();
  initTheme();
  initScroll();
  initMenu();
  initActiveNav();
  initSplitText();
  initReveal();
  initTilt();
  initCountUp();
  initCopy();
  initVideo();
  initShortcuts();
})();
