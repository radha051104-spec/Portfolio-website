(function () {
  'use strict';

  // Tell CSS that JavaScript is available (used for reveal animations)
  document.documentElement.classList.add('js');

  // ---------- Mobile hamburger menu ----------
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Placeholder if a photo is not added yet ----------
  document.querySelectorAll('.avatar-box img').forEach(function (img) {
    function markMissing() { img.parentElement.classList.add('img-missing'); }
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0) { markMissing(); }
  });

  // ---------- Scroll-triggered animations ----------
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  }

  // ---------- "Show more" toggle on timeline ----------
  document.querySelectorAll('.more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var more = btn.previousElementSibling;
      var open = more.classList.toggle('open');
      btn.textContent = open ? 'Show less' : 'Show more';
    });
  });
})();