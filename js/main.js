// Small scripts: theme toggle, mobile menu, scroll animations, copy email, footer year.
(function () {
  var root = document.documentElement;

  // ----- Dark / light theme toggle (choice saved in localStorage) -----
  var themeBtn = document.querySelector('.theme-toggle');
  function setThemeLabel() {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }
  if (themeBtn) {
    setThemeLabel();
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      setThemeLabel();
    });
  }

  // ----- Mobile menu -----
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    // Close with the Escape key and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // Close if the window grows to desktop size
    window.matchMedia('(min-width: 768px)').addEventListener('change', function () { setMenu(false); });
  }

  // ----- Sections fade in when scrolled into view -----
  var sections = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('is-visible'); });
  }

  // ----- Copy email button (reads the address from the email link) -----
  var copyBtn = document.querySelector('.copy-email');
  var emailLink = document.getElementById('email-link');
  var status = document.querySelector('.copy-status');
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', function () {
      var email = emailLink.getAttribute('href').replace(/^mailto:/, '');
      function done(msg) {
        status.textContent = msg;
        setTimeout(function () { status.textContent = ''; }, 2500);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () { done('Copied!'); },
          function () { done(email); }
        );
      } else {
        // Clipboard is blocked (e.g. opened from a file): show the address so it can be copied by hand.
        done(email);
      }
    });
  }

  // ----- Footer year -----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
