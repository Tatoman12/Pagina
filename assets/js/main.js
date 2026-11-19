/* ==========================================================================
   Interacciones del portafolio
   - Tema claro / oscuro persistente
   - Sombra del header al hacer scroll
   - Revelado progresivo de secciones
   - Resaltado del enlace de navegación activo
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tema ---------- */
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function syncToggle() {
    if (!toggle) return;
    var next = currentTheme() === 'dark' ? 'claro' : 'oscuro';
    toggle.setAttribute('aria-label', 'Cambiar al tema ' + next);
    toggle.title = 'Cambiar al tema ' + next;
  }

  if (toggle) {
    syncToggle();

    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* ignorar */ }

      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#080b11' : '#f6f7fb');

      syncToggle();
    });
  }

  /* ---------- Header ---------- */
  var header = document.getElementById('site-header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Revelado al hacer scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .about-text, .facts, .card, .stack-group, .contact-card, .all-repos'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(function (el, index) {
      el.classList.add('reveal');
      // Pequeño escalonado dentro de cada rejilla.
      el.style.setProperty('--delay', (index % 4) * 70 + 'ms');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Navegación activa ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
