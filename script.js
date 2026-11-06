/* ===== АВТОЭКСПЕРТ - script ===== */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Year in footer */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Animated counters */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { co.observe(el); });
  } else {
    nums.forEach(animateCount);
  }

  /* Hero parallax */
  var heroBg = document.querySelector('[data-parallax]');
  if (heroBg && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var offset = Math.min(window.scrollY, window.innerHeight);
        heroBg.style.transform = 'translate3d(0,' + (offset * 0.18) + 'px,0) scale(1.05)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Клики по телефону и WhatsApp -> конверсии Google Ads.
     Без preventDefault: tel: не выгружает страницу, wa.me открывается в новой вкладке. */
  window.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"], a[href*="wa.me"]');
    if (!a || typeof gtag !== 'function') return;
    if (a.getAttribute('href').indexOf('tel:') === 0) {
      gtag('event', 'conversion', { 'send_to': 'AW-18559481387/oaiOCPqis7MdEKvs7JFF', 'value': 1.0, 'currency': 'USD' });
    } else if (typeof gtag_report_contact === 'function') {
      gtag_report_contact();
    }
  }, true);

})();
