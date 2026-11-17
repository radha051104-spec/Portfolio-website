(function () {
  'use strict';

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
})();