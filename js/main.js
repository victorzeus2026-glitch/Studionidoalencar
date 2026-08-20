/* Interações da página — não precisa editar */
(function(){
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Botões → WhatsApp (mensagens contextuais) ---------- */
  document.querySelectorAll("[data-wa]").forEach(function(el){
    el.addEventListener("click", function(){
      openWhatsApp(el.getAttribute("data-wa-msg"));
    });
  });

  /* ---------- Instagram (placeholder controlado) ---------- */
  var ig = document.getElementById("linkInstagram");
  if (ig){
    if (INSTAGRAM_URL){
      ig.setAttribute("href", INSTAGRAM_URL);
      ig.setAttribute("target", "_blank");
    } else {
      ig.addEventListener("click", function(e){
        e.preventDefault();
        alert("⚠ Site em configuração:\n\nDefina o link do Instagram na variável INSTAGRAM_URL, no início do <script> desta página.");
      });
    }
  }

  /* ---------- Header com efeito glass ao rolar ---------- */
  var header = document.querySelector(".header");
  function onScroll(){
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  var panel  = document.getElementById("painelMenu");

  function setMenu(open){
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    panel.classList.toggle("open", open);
    document.body.classList.toggle("lock", open);
  }
  burger.addEventListener("click", function(){
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  panel.querySelectorAll("a, button").forEach(function(el){
    el.addEventListener("click", function(){ setMenu(false); });
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && panel.classList.contains("open")) setMenu(false);
  });

  /* ---------- Stagger: cascata automática dentro de grupos ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function(group){
    var items = group.querySelectorAll(".reveal, .reveal-scale, .blur-reveal");
    items.forEach(function(el, i){
      el.style.setProperty("--d", (i * 0.09).toFixed(2) + "s");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal, .reveal-scale, .blur-reveal, .steps");
  if (reduced || !("IntersectionObserver" in window)){
    revealables.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Contadores animados ---------- */
  function animateCount(el){
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1700;
    var start = null;
    function fmt(v){ return v.toLocaleString("pt-BR"); }
    function frame(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll(".count");
  if (reduced || !("IntersectionObserver" in window)){
    counters.forEach(function(el){
      var t = parseInt(el.getAttribute("data-count"), 10) || 0;
      el.textContent = t.toLocaleString("pt-BR");
    });
  } else {
    var ioCount = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function(el){ ioCount.observe(el); });
  }

  /* ---------- FAQ accordion (abre um por vez) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function(item){
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function(other){
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen){
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Depoimentos: trilho contínuo ---------- */
  var track = document.getElementById("tTrack");
  if (track && !reduced){
    var cards = Array.prototype.slice.call(track.children);
    cards.forEach(function(card){
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* ---------- Parallax sutil no herói (desktop) ---------- */
  var hero = document.querySelector(".hero");
  if (hero && finePointer && !reduced){
    var pTargets = hero.querySelectorAll(".hero-glow, .hero-spine");
    var tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;
    hero.addEventListener("pointermove", function(e){
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!ticking){ ticking = true; requestAnimationFrame(loop); }
    });
    function loop(){
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      pTargets.forEach(function(el){
        var d = parseFloat(el.getAttribute("data-depth")) || 16;
        el.style.transform = "translate3d(" + (cx * d * 0.5).toFixed(1) + "px," + (cy * d * 0.5).toFixed(1) + "px,0)";
      });
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) requestAnimationFrame(loop);
      else ticking = false;
    }
  }

  /* ---------- Botões magnéticos (desktop) ---------- */
  if (finePointer && !reduced){
    document.querySelectorAll("[data-magnetic]").forEach(function(btn){
      btn.addEventListener("pointermove", function(e){
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        dx = Math.max(-8, Math.min(8, dx));
        dy = Math.max(-6, Math.min(6, dy));
        btn.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function(){
        btn.style.transform = "";
      });
    });
  }

  /* ---------- Cursor personalizado (desktop) ---------- */
  if (finePointer && !reduced){
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    var mx = -100, my = -100, rx = -100, ry = -100, started = false;

    document.addEventListener("pointermove", function(e){
      mx = e.clientX; my = e.clientY;
      if (!started){
        started = true;
        document.body.classList.add("cursor-on");
        rx = mx; ry = my;
        requestAnimationFrame(cursorLoop);
      }
    });
    document.addEventListener("pointerleave", function(){
      document.body.classList.remove("cursor-on");
      started = false;
    });
    document.addEventListener("pointerover", function(e){
      var hit = e.target.closest("a, button, .faq-q, [data-wa]");
      document.body.classList.toggle("cursor-hover", !!hit);
    });

    function cursorLoop(){
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform  = "translate(" + mx + "px," + my + "px)";
      ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)";
      if (started) requestAnimationFrame(cursorLoop);
    }
  }
})();
