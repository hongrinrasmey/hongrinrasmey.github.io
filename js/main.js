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
    // Phone browser bar follows the chosen theme, not only the system one
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.content = theme === 'light' ? '#FAFAF9' : '#0C0A09'; });
    if (themeBtn) themeBtn.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
  }

  // New theme grows as a circle from the toggle (View Transitions)
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

  // Header background after 20px scroll
  function initScroll() {
    var header = document.querySelector('.site-header');
    var ticking = false;

    function update() {
      ticking = false;
      if (header) header.classList.toggle('is-scrolled', scrollY > 20);
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
      // While open, the page behind can't be clicked or tabbed to
      document.querySelectorAll('.skip-link, main, .site-footer').forEach(function (el) { el.inert = open; });
    }

    menuBtn.addEventListener('click', function () { setMenu(!isOpen()); });
    // Close on a link or a click beside the links
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
    title.setAttribute('aria-label', text); // read once by screen readers
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

  // Project cards (mouse only): hover class + cursor spotlight.
  // Resting box (offset* ignores transforms): the 4px lift never drops the hover at the edge
  function initSpotlight() {
    if (!finePointer.matches || reduceMotion.matches) return;
    var cards = document.querySelectorAll('.project-card'), frameId, cx, cy, inMain;
    function draw() {
      frameId = null;
      cards.forEach(function (card) {
        var l = scrollX, t = scrollY, el = card;
        for (; el; el = el.offsetParent) { l -= el.offsetLeft; t -= el.offsetTop; }
        var x = (cx + l) / card.offsetWidth, y = (cy + t) / card.offsetHeight;
        var on = inMain && x >= 0 && x <= 1 && y >= 0 && y <= 1;
        card.classList.toggle('is-hover', on);
        if (on) { card.style.setProperty('--x', x * 100 + '%'); card.style.setProperty('--y', y * 100 + '%'); }
      });
    }
    function queue() { if (!frameId) frameId = requestAnimationFrame(draw); }
    addEventListener('mousemove', function (e) { // not over header, menu or pop-up
      inMain = !!e.target.closest('main'); cx = e.clientX; cy = e.clientY; queue();
    }, { passive: true });
    addEventListener('scroll', queue, { passive: true });
    root.addEventListener('mouseleave', function () { inMain = false; queue(); });
  }


  // Phone cards: each phone fades to its data-next screen and back, once, only while on screen.
  // Under 5s in all (WCAG 2.2.2), then stops. Hover or keyboard focus pauses it
  function initPhoneScreens() {
    if (reduceMotion.matches || !hasIO) return;
    document.querySelectorAll('.project-card__media--phones').forEach(function (media) {
      var card = media.closest('.project-card'), step = 0, done = 0, timer, io;
      var pairs = [].slice.call(media.querySelectorAll('.phone > img[data-next]')).map(function (img) {
        var next = img.cloneNode();
        next.src = img.dataset.next; next.alt = img.dataset.nextAlt || ''; next.className = 'phone__alt';
        img.parentNode.appendChild(next);
        img.classList.add('is-on');
        img.parentNode.classList.add('is-cycling');
        return [img, next];
      });
      if (!pairs.length) return;
      io = new IntersectionObserver(function (entries) {
        clearInterval(timer);
        if (entries[entries.length - 1].isIntersecting) timer = setInterval(function () {
          // wait while paused or until every screen has loaded (no fade to a blank frame)
          if (card.matches(':hover, :focus-within') || pairs.some(function (p) { return !p[1 - step].naturalWidth; })) return;
          step = 1 - step;
          pairs.forEach(function (p, j) { // phones change 150ms apart
            setTimeout(function () { p[step].classList.add('is-on'); p[1 - step].classList.remove('is-on'); }, j * 150);
          });
          if (++done === 2) { clearInterval(timer); io.disconnect(); }
        }, 2000);
      }, { threshold: 0.3 });
      io.observe(media);
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
        var suffix = el.textContent.replace(/[\d.,\s]/g, ''); // keeps a "+" or "%"
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

  // Copy buttons: data-copy="text" or data-copy-from="#id"
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  // Fallback for pages opened from a file
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
        // The file downloads only now, when the pop-up opens
        player = document.createElement('video');
        Object.assign(player, { src: src, muted: true, loop: true, playsInline: true, controls: true, preload: 'none', autoplay: autoplay });
        if (btn.getAttribute('data-poster')) player.poster = btn.getAttribute('data-poster');
        player.setAttribute('aria-label', title);
      }
      if (modalTitle) modalTitle.textContent = title;
      // Phone apps: 420px pop-up, web apps: 900px
      var tag = btn.closest('.project-card');
      tag = tag && tag.querySelector('.platform-tag');
      modal.classList.toggle('video-modal--phone', !!tag && /android|ios/i.test(tag.textContent));
      frame.replaceChildren(player);
      lastTrigger = btn;
      modal.showModal(); // browser keeps focus inside; Esc closes it
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

  // Terminal: >_ button or ` key. Every answer is read from the page, so it never goes stale
  var openTerm;
  function initTerminal() {
    var dlg = document.getElementById('term'), btn = document.querySelector('.term-btn');
    if (!dlg || !dlg.showModal || !btn) return;
    var log = dlg.querySelector('.term__log'), form = dlg.querySelector('form'), input = form.querySelector('input');
    var hist = [], hi = 0;
    function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
    function say(line, cls) {
      var p = document.createElement('p');
      if (cls) p.className = cls;
      p.append(line);
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;
    }
    function link(href, label) {
      var a = document.createElement('a');
      a.href = href; a.textContent = label || href; a.target = '_blank'; a.rel = 'noopener noreferrer';
      return a;
    }
    // Close, then scroll to a section or card and move focus there (keyboard users land on it too).
    // offsetTop ignores the 24px reveal slide, so a card not shown yet still lands under the header
    function go(el) {
      dlg.close();
      requestAnimationFrame(function () { // after the close: scrolling in the same frame was sometimes cancelled
        if (!el.hasAttribute('tabindex')) el.tabIndex = -1;
        el.focus({ preventScroll: true });
        for (var y = 0, n = el; n; n = n.offsetParent) y += n.offsetTop;
        scrollTo(0, y - parseFloat(getComputedStyle(el).scrollMarginTop)); // smooth via CSS (off for reduced motion)
      });
    }
    var cards = [].slice.call(document.querySelectorAll('.project-card'));
    var name = txt(document.getElementById('hero-title')) || document.title;
    var cmds = {
      help: function () {
        [['whoami', 'who I am'], ['projects', 'my apps'], ['open <app>', 'jump to an app'], ['work · about · contact', 'jump to a section'],
          ['email', 'copy my email'], ['github', 'my GitHub'], ['theme', 'dark / light'], ['clear', 'empty the screen'], ['exit', 'close (or Esc)']
        ].forEach(function (r) {
          var c = document.createElement('span'), d = document.createElement('span');
          c.className = 'term__cmd'; c.textContent = r[0]; d.className = 'term__dim'; d.textContent = r[1];
          say(c, 'term__row'); log.lastChild.append(d);
        });
      },
      whoami: function () { say(name); say(txt(document.querySelector('.hero__intro'))); say(txt(document.querySelector('.hero__meta'))); },
      projects: function () {
        cards.forEach(function (c) { say(txt(c.querySelector('.project-card__title')) + ': ' + txt(c.querySelector('.project-card__lead'))); });
        say('Type "open <app>", e.g. open ' + txt(cards[0] && cards[0].querySelector('.project-card__title')).split(' ')[0].toLowerCase(), 'term__dim');
      },
      open: function (arg) {
        var hit = arg && cards.filter(function (c) { return txt(c.querySelector('.project-card__title')).toLowerCase().indexOf(arg) === 0; })[0];
        if (hit) go(hit); else say(arg ? 'No app called "' + arg + '". Type "projects".' : 'Usage: open <app>', 'term__dim');
      },
      email: function () {
        var mail = document.getElementById('email-link');
        if (!mail) return;
        var addr = mail.getAttribute('href').replace(/^mailto:/, '');
        say(link(mail.href, addr));
        copyText(addr).then(function (ok) { say(ok ? 'Copied to clipboard.' : 'Could not copy: select it above.', 'term__dim'); });
      },
      github: function () { var g = document.querySelector('.social-link[href*="github.com"]'); if (g) say(link(g.href)); },
      theme: function () { var next = currentTheme() === 'light' ? 'dark' : 'light'; toggleTheme(); say('Theme: ' + next, 'term__dim'); },
      clear: function () { log.textContent = ''; },
      exit: function () { dlg.close(); }
    };
    ['work', 'about', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) cmds[id] = function () { go(el); };
    });
    cmds.ls = cmds.projects;

    function run(line) {
      var parts = line.trim().toLowerCase().split(/\s+/), cmd = parts[0];
      if (!cmd) return;
      say('> ' + line.trim(), 'term__cmd term__echo');
      if (cmds.hasOwnProperty(cmd)) cmds[cmd](parts.slice(1).join(' '));
      else say('command not found: ' + cmd + '. Type "help".', 'term__dim');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value.trim()) { hist.push(input.value); hi = hist.length; }
      run(input.value);
      input.value = '';
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { // command history
        if (!hist.length) return;
        e.preventDefault();
        hi = Math.max(0, Math.min(hist.length, hi + (e.key === 'ArrowUp' ? -1 : 1)));
        input.value = hist[hi] || '';
      } else if (e.key === 'Tab' && !e.shiftKey && input.value) { // complete only a sure match; else Tab moves focus
        var v = input.value.toLowerCase(), m = Object.keys(cmds).filter(function (k) { return k.indexOf(v) === 0; });
        if (m.length === 1 && m[0] !== v) { e.preventDefault(); input.value = m[0] + (m[0] === 'open' ? ' ' : ''); }
      }
    });
    dlg.querySelector('.term__chips').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cmd]');
      if (b) { run(b.dataset.cmd); if (dlg.open) input.focus(); }
    });
    dlg.querySelector('.term__close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); }); // click outside
    openTerm = function () {
      if (dlg.open) return;
      if (!log.childNodes.length) { say('Hi, I\'m ' + name + '.', 'term__hello'); say('Type a command, or tap one below.', 'term__dim'); }
      dlg.showModal();
      input.focus();
    };
    btn.addEventListener('click', openTerm);
  }

  // T switches the theme, ` opens the terminal (not while typing in a field)
  function initShortcuts() {
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      // e.repeat: holding T would flash the whole screen dark/light many times a second
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('dialog[open]')) return;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 't' || e.key === 'T') toggleTheme();
      else if (e.key === '`' && openTerm) { e.preventDefault(); openTerm(); } // no ` typed into the box
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
  initSpotlight();
  initPhoneScreens();
  initCountUp();
  initCopy();
  initVideo();
  initTerminal();
  initShortcuts();
})();
