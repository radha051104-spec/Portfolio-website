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

  // ---------- Family flip cards (tap support for mobile) ----------
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });

  // ---------- Hobby lightbox ----------
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxText = document.getElementById('lightboxText');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(item) {
    var img = item.querySelector('img');
    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.getAttribute('alt');
    lightboxImg.hidden = item.classList.contains('img-missing');
    lightboxTitle.textContent = item.getAttribute('data-title');
    lightboxText.textContent = item.getAttribute('data-text');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () { openLightbox(item); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { closeLightbox(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); }
  });
})();