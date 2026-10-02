(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  // Split display words into letters for the staggered rise-in.
  document.querySelectorAll("[data-split]").forEach((word, w) => {
    const text = word.textContent;
    word.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      span.style.setProperty("--i", i);
      span.style.setProperty("--base", `${w % 2 ? 160 : 0}ms`);
      word.appendChild(span);
    });
  });

  // Hero plays on load; everything else on scroll.
  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
    document.querySelectorAll(".hero__name .line").forEach((l) => l.classList.add("is-in"));
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal, .about__title .line").forEach((el) => io.observe(el));

  // Nav: switch to dark text once past the hero, hide on scroll down.
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");
  const contact = document.querySelector(".contact");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const overDark =
      y < hero.offsetHeight - 40 || y + 40 > contact.offsetTop;
    nav.classList.toggle("is-light", !overDark);
    nav.classList.toggle("is-hidden", y > lastY && y > 200);
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduceMotion) return;

  // Mouse parallax on hero stickers.
  const stickers = document.querySelectorAll(".sticker");
  hero.addEventListener("mousemove", (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    stickers.forEach((s) => {
      const d = parseFloat(s.dataset.depth);
      s.style.setProperty("--x", `${nx * d}px`);
      s.style.setProperty("--y", `${ny * d}px`);
    });
  });

  // Gentle float on the about board, driven by scroll.
  const pins = document.querySelectorAll("[data-float]");
  const floatPins = () => {
    const vh = window.innerHeight;
    pins.forEach((p, i) => {
      const r = p.getBoundingClientRect();
      const t = (r.top + r.height / 2 - vh / 2) / vh;
      p.style.translate = `0 ${t * (i % 2 ? -40 : 30)}px`;
    });
  };
  window.addEventListener("scroll", floatPins, { passive: true });
  floatPins();

  // "View" cursor bubble over projects.
  const cursor = document.querySelector(".cursor");
  let cx = -200, cy = -200, tx = cx, ty = cy;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.setProperty("--cx", `${cx}px`);
    cursor.style.setProperty("--cy", `${cy}px`);
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll("[data-cursor] .project__media").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-on"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-on"));
  });
})();
