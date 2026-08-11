/* Daria · SMM — інтерактив лендінгу */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Рік у підвалі ──────────────────────────────────────────────────── */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Шапка: скляний стан після скролу ───────────────────────────────── */
  var head = document.querySelector(".head");
  function onScroll() {
    if (head) head.classList.toggle("is-stuck", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Мобільне меню ──────────────────────────────────────────────────── */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Безшовний рухомий рядок ────────────────────────────────────────── */
  var ticker = document.getElementById("ticker");
  if (ticker && ticker.children.length === 1) {
    ticker.appendChild(ticker.children[0].cloneNode(true));
  }

  /* ── Поява блоків при скролі ────────────────────────────────────────── */
  var items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ── Паралакс бульбашок у hero ──────────────────────────────────────── */
  var orbit = document.getElementById("orbit");
  if (orbit && !reduced && window.matchMedia("(pointer: fine)").matches) {
    var bubbles = orbit.querySelectorAll(".bubble");
    var frame = null;
    var target = { x: 0, y: 0 };

    orbit.parentElement.addEventListener("mousemove", function (e) {
      var box = orbit.getBoundingClientRect();
      target.x = (e.clientX - (box.left + box.width / 2)) / box.width;
      target.y = (e.clientY - (box.top + box.height / 2)) / box.height;
      if (frame === null) frame = requestAnimationFrame(apply);
    });
    orbit.parentElement.addEventListener("mouseleave", function () {
      target.x = 0; target.y = 0;
      if (frame === null) frame = requestAnimationFrame(apply);
    });

    function apply() {
      frame = null;
      bubbles.forEach(function (b) {
        var depth = parseFloat(b.getAttribute("data-depth")) || 20;
        b.style.transform =
          "translate3d(" + (target.x * depth).toFixed(2) + "px," +
          (target.y * depth).toFixed(2) + "px,0)";
      });
    }
  }

  /* ── Тост ───────────────────────────────────────────────────────────── */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-on");
    }, 4200);
  }

  /* ── Форма: збирає заявку, копіює та відкриває Direct ───────────────── */
  var form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var biz = form.elements.biz.value.trim();
      var task = form.elements.task.value.trim();

      if (!name) {
        form.elements.name.focus();
        toast("Напишіть, будь ласка, своє ім'я");
        return;
      }

      var lines = ["Вітаю, Даріє! Мене звати " + name + "."];
      if (biz) lines.push("Мій бізнес: " + biz + ".");
      if (task) lines.push("Потрібно: " + task);
      lines.push("Хочу обговорити співпрацю.");
      var message = lines.join("\n");

      function openDirect() {
        window.open("https://ig.me/m/darisha_smm_target", "_blank", "noopener");
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(function () {
          toast("Повідомлення скопійовано — вставте його в Direct");
          openDirect();
        }).catch(function () {
          toast("Відкриваю Direct — напишіть мені там");
          openDirect();
        });
      } else {
        toast("Відкриваю Direct — напишіть мені там");
        openDirect();
      }
    });
  }
})();
