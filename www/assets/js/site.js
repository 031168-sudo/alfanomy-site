/* Alfanomy: фоновая карусель в шапке, кнопка «наверх» и просмотр скриншотов */
(function () {
  'use strict';

  /* Фоновая карусель в шапке */
  function initCarousel() {
    var host = document.getElementById('c-inner') || document.body;
    var data = window.SITE_BG_IMAGES || [];
    if (!host || !data.length || host.querySelector('.local-carousel-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'local-carousel-layer';
    data.forEach(function (url, i) {
      var d = document.createElement('div');
      d.className = 'lc-slide' + (i === 0 ? ' active' : '');
      var top = url.indexOf('i9ff1a665a4c0c771') !== -1 || url.indexOf('ia0932a784fced8c4') !== -1;
      d.style.backgroundPosition = top ? 'center top' : 'center -200px';
      d.style.backgroundImage = 'url("' + url + '")';
      layer.appendChild(d);
    });
    host.insertBefore(layer, host.firstChild);
    var slides = layer.children, n = 0;
    if (slides.length > 1) {
      setInterval(function () {
        slides[n].classList.remove('active');
        n = (n + 1) % slides.length;
        slides[n].classList.add('active');
      }, 10000);
    }
  }

  /* Кнопка «наверх» */
  function initScrollTop() {
    var bar = document.querySelector('.c-FloatingButtonBarContainer');
    if (!bar) return;
    var item = bar.querySelector('.c-FloatingButtonBarContainer-button-scroll');
    var link = bar.querySelector('a');
    bar.classList.remove('hidden');
    function update() {
      if (item) item.classList.toggle('c-FloatingButtonBarContainer-button-scroll-show', window.pageYOffset > 300);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* Просмотр картинок галереи */
  function initLightbox() {
    var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lightbox]'));
    if (!links.length) return;
    var box = document.createElement('div');
    box.className = 'lb';
    box.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Закрыть">&times;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Назад">&#8249;</button>' +
      '<img class="lb-img" alt="">' +
      '<button class="lb-btn lb-next" aria-label="Вперёд">&#8250;</button>';
    document.body.appendChild(box);
    var img = box.querySelector('.lb-img');
    var cur = 0;

    function show(i) {
      cur = (i + links.length) % links.length;
      img.src = links[cur].getAttribute('href');
      box.classList.add('lb-open');
    }
    function close() {
      box.classList.remove('lb-open');
      img.removeAttribute('src');
    }

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
      });
    });
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('lb-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* Подменю в мобильном меню («+») */
  function initMobileMenu() {
    document.querySelectorAll('.menu-nav__toggle-button').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        btn.parentNode.classList.toggle('menu-nav__item--last-opened');
      });
    });
  }

  function init() {
    initCarousel();
    initMobileMenu();
    initScrollTop();
    initLightbox();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
