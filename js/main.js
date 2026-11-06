(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");

  function wireHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function wireNav() {
    var toggle = document.querySelector(".nav-toggle");
    if (!toggle) return;
    var body = document.body;
    function close() { body.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); }
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function wireReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function wireLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var box = document.getElementById("lightbox");
    if (!items.length || !box) return;
    var img = box.querySelector("img");
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + items.length) % items.length;
      var src = items[index].getAttribute("data-full");
      var alt = items[index].querySelector("img").getAttribute("alt");
      img.setAttribute("src", src);
      img.setAttribute("alt", alt);
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      box.querySelector(".lightbox-close").focus();
    }
    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (item, i) { item.addEventListener("click", function () { open(i); }); });
    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.querySelector(".lightbox-prev").addEventListener("click", function () { show(index - 1); });
    box.querySelector(".lightbox-next").addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });
  }

  function wireHours() {
    var rows = document.querySelectorAll(".hours tr[data-day]");
    if (!rows.length) return;
    var today = String(new Date().getDay());
    rows.forEach(function (r) { if (r.getAttribute("data-day") === today) r.classList.add("is-today"); });
  }

  /* Greviews_design — carrusel de reseñas */
  function wireReviewsCarousel() {
    var track = document.getElementById("reviewsTrack");
    var prev = document.getElementById("reviewsPrev");
    var next = document.getElementById("reviewsNext");
    if (!track || !prev || !next) return;

    function cardStep() {
      var card = track.querySelector(".review-card");
      return card ? card.getBoundingClientRect().width + 20 : 320;
    }
    function scrollByCard(direction) {
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (direction > 0 && atEnd) {
        track.scrollTo({ left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        return;
      }
      track.scrollBy({ left: cardStep() * direction, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
    prev.addEventListener("click", function () { scrollByCard(-1); stopAutoplay(); });
    next.addEventListener("click", function () { scrollByCard(1); stopAutoplay(); });

    var autoplayId = null;
    function startAutoplay() {
      if (prefersReducedMotion || autoplayId) return;
      autoplayId = window.setInterval(function () { scrollByCard(1); }, 4500);
    }
    function stopAutoplay() {
      if (autoplayId) { window.clearInterval(autoplayId); autoplayId = null; }
    }
    ["mouseenter", "focusin", "touchstart"].forEach(function (evt) { track.addEventListener(evt, stopAutoplay, { passive: true }); });
    ["mouseleave", "focusout"].forEach(function (evt) { track.addEventListener(evt, startAutoplay, { passive: true }); });
    startAutoplay();
  }

  function wireYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireHeader();
    wireNav();
    wireReveal();
    wireLightbox();
    wireHours();
    wireReviewsCarousel();
    wireYear();
  });
})();
