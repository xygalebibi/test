// Shared behaviour for the homepage options: rotating line, scroll reveals,
// page-load fade, "View" cursor, hero parallax.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  // ── Scroll reveals ──
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ── "You can find my work …" rotator ──
  const phrases = [
    "in Apple stores worldwide",
    "40,000 feet in the sky",
    "in medicine cabinets",
    "in bookstores",
    "in live event experiences",
    "right here, actually",
  ];
  const rotator = document.querySelector(".rotator");
  if (rotator) {
    const makeItem = (text) => {
      const item = document.createElement("span");
      item.className = "rotator__item";
      [...text].forEach((ch, i) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = ch;
        s.style.setProperty("--i", i);
        item.appendChild(s);
      });
      return item;
    };
    let index = 0;
    if (reduceMotion) {
      setInterval(() => {
        index = (index + 1) % phrases.length;
        rotator.firstElementChild.textContent = phrases[index];
      }, 3500);
    } else {
      rotator.replaceChildren(makeItem(phrases[0]));
      setInterval(() => {
        const old = rotator.querySelector(".rotator__item:not(.is-leaving)");
        old.classList.add("is-leaving");
        setTimeout(() => old.remove(), 900);
        index = (index + 1) % phrases.length;
        rotator.appendChild(makeItem(phrases[index]));
      }, 2800);
    }
  }

  if (reduceMotion) return;

  // ── Mouse parallax for anything with data-depth inside the hero ──
  const hero = document.querySelector(".hero");
  const layers = document.querySelectorAll("[data-depth]");
  if (hero && layers.length) {
    hero.addEventListener("mousemove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth);
        l.style.setProperty("--mx", `${nx * d}px`);
        l.style.setProperty("--my", `${ny * d}px`);
      });
    });
  }

  // ── "View" cursor over project images ──
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;
  let cx = -200, cy = -200, tx = cx, ty = cy;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  const follow = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.setProperty("--cx", `${cx}px`);
    cursor.style.setProperty("--cy", `${cy}px`);
    requestAnimationFrame(follow);
  };
  follow();
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-on"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-on"));
  });
})();
