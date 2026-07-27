/* =====================================================================
   Drahan Alina beauty space — інтерактивність (Vanilla JS, без бібліотек)
   1. Мобільне бургер-меню
   2. Плавний скрол до секцій з урахуванням висоти хедера
   3. Тінь хедера + підсвітка активного пункту меню (scrollspy)
   4. Кнопка «Вгору»
   5. Анімація появи блоків при скролі (IntersectionObserver)
   6. Модальне вікно онлайн-запису
   7. Рік у футері
   ===================================================================== */

(function () {
  'use strict';

  /* --------------------- Спільні елементи та константи --------------------- */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('overlay');
  const toTop = document.getElementById('to-top');
  const modal = document.getElementById('modal');

  const SUCCESS_MESSAGE = 'Дякуємо! Ми зателефонуємо вам за 5 хвилин.';
  const DESKTOP_QUERY = window.matchMedia('(min-width: 1200px)');

  /** Висота фіксованого хедера (враховує зміну на різних брейкпоінтах). */
  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  /** Блокує/розблоковує скрол body, поки відкрито меню або модалку. */
  function setBodyLock(locked) {
    document.body.classList.toggle('is-locked', locked);
  }

  /* ============================ 1. БУРГЕР-МЕНЮ ============================ */
  function openMenu() {
    nav.classList.add('is-open');
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрити меню');
    overlay.hidden = false;
    // Наступний кадр — щоб спрацював CSS-перехід прозорості
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    setBodyLock(true);
  }

  function closeMenu() {
    if (!nav.classList.contains('is-open')) return;

    nav.classList.remove('is-open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Відкрити меню');
    overlay.classList.remove('is-visible');
    setBodyLock(false);

    // Ховаємо оверлей після завершення анімації
    window.setTimeout(() => {
      if (!nav.classList.contains('is-open')) overlay.hidden = true;
    }, 300);
  }

  if (burger && nav && overlay) {
    burger.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // На десктопі меню завжди розгорнуте — прибираємо мобільні стани
    DESKTOP_QUERY.addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  /* ============================ 2. ПЛАВНИЙ СКРОЛ ============================ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      closeMenu();

      // Відступ на висоту фіксованого хедера + невеликий «повітряний» запас
      const top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() - 8;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'smooth'
      });
    });
  });

  /* ================= 3. ХЕДЕР ПРИ СКРОЛІ + АКТИВНИЙ ПУНКТ МЕНЮ ================= */
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    const scrolled = window.pageYOffset;

    // Тінь хедера
    if (header) header.classList.toggle('is-scrolled', scrolled > 24);

    // Кнопка «Вгору» — показуємо після ~половини екрана
    if (toTop) toTop.classList.toggle('is-visible', scrolled > window.innerHeight * 0.6);

    // Scrollspy: підсвічуємо секцію, що зараз у в'юпорті
    const offset = getHeaderHeight() + 24;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top - offset <= 0) activeIndex = index;
    });

    navLinks.forEach((link, index) => {
      link.classList.toggle('is-active', index === activeIndex);
    });
  }

  // rAF-троттлінг, щоб не навантажувати скрол
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  onScroll();

  /* ============================ 4. КНОПКА «ВГОРУ» ============================ */
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==================== 5. АНІМАЦІЯ ПОЯВИ ПРИ СКРОЛІ ==================== */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // анімуємо лише один раз
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    // Fallback для старих браузерів — просто показуємо контент
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* ==================== 6. МОДАЛЬНЕ ВІКНО ОНЛАЙН-ЗАПИСУ ==================== */
  let lastFocused = null;

  const dialog = modal ? modal.querySelector('.modal__dialog') : null;
  // Зберігаємо початкову розмітку, щоб повернути форму після екрана «дякуємо»
  const dialogTemplate = dialog ? dialog.innerHTML : '';
  let isSubmitted = false;

  function openModal() {
    if (!modal) return;

    lastFocused = document.activeElement;
    closeMenu();

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    setBodyLock(true);

    const firstInput = modal.querySelector('input, select, button');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;

    modal.classList.remove('is-open');
    setBodyLock(false);

    window.setTimeout(() => {
      modal.hidden = true;
      if (lastFocused) lastFocused.focus();
      // Після екрана «дякуємо» повертаємо чисту форму на наступне відкриття
      if (isSubmitted) {
        dialog.innerHTML = dialogTemplate;
        isSubmitted = false;
      }
    }, 300);
  }

  // Усі кнопки «Записатись» відкривають модалку
  document.querySelectorAll('.js-booking').forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  // Закриття: хрестик або бекдроп (делегування — розмітка діалогу може змінюватись)
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-modal]')) closeModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeModal();
    closeMenu();
  });

  /* --- Валідація та відправка форми --- */
  if (dialog) {
    dialog.addEventListener('submit', (event) => {
      if (event.target.id !== 'booking-form') return;
      event.preventDefault();

      const name = dialog.querySelector('#booking-name').value.trim();
      const phone = dialog.querySelector('#booking-phone').value.trim();
      const service = dialog.querySelector('#booking-service').value;

      // Проста перевірка: ім'я + номер щонайменше з 9 цифр
      const digits = phone.replace(/\D/g, '');

      if (name.length < 2) {
        showError("Будь ласка, вкажіть ваше ім'я.");
        return;
      }

      if (digits.length < 9) {
        showError('Перевірте, будь ласка, номер телефону.');
        return;
      }

      showSuccess(name, service);
    });
  }

  function showError(message) {
    const box = dialog.querySelector('#booking-error');
    if (!box) return;
    box.textContent = message;
    box.hidden = false;
  }

  /**
   * Замість alert() показуємо охайний екран підтвердження
   * з тим самим текстом, що й у ТЗ.
   */
  function showSuccess(name, service) {
    isSubmitted = true;

    dialog.innerHTML = `
      <button class="modal__close" type="button" aria-label="Закрити вікно" data-close-modal>&times;</button>
      <div class="modal__success">
        <span class="modal__success-icon" aria-hidden="true">💗</span>
        <h2 class="modal__title">${escapeHtml(name)}, заявку прийнято!</h2>
        <p class="modal__text">${SUCCESS_MESSAGE}</p>
        <p class="modal__call">Послуга: <strong>${escapeHtml(service)}</strong></p>
        <a class="btn btn--primary btn--block btn--lg" href="tel:+380986422627">Зателефонувати зараз</a>
      </div>
    `;
  }

  /** Екранування користувацького вводу перед вставкою в розмітку. */
  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }

  /* ============================ 7. РІК У ФУТЕРІ ============================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
