(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  // ── Menu ──
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav__menu a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", false);
    })
  );

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
  if (!reduceMotion) {
    let index = 0;
    rotator.replaceChildren(makeItem(phrases[0]));
    setInterval(() => {
      const old = rotator.querySelector(".rotator__item:not(.is-leaving)");
      old.classList.add("is-leaving");
      setTimeout(() => old.remove(), 900);
      index = (index + 1) % phrases.length;
      rotator.appendChild(makeItem(phrases[index]));
    }, 2800);
  } else {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % phrases.length;
      rotator.firstElementChild.textContent = phrases[index];
    }, 3500);
  }

  // ── Curved 3D gallery ──
  // Cards sit on the inside of a cylinder with the camera inside it, so the
  // centre cards look small and far away and the edge cards sweep past large.
  const ring = document.querySelector(".ring");
  const track = ring.querySelector(".ring__track");
  const originals = [...track.children];
  originals.forEach((c) => track.appendChild(c.cloneNode(true)));
  const cards = [...track.children];
  const step = 360 / cards.length;
  let radius = 0;

  const layout = () => {
    const h = ring.clientHeight;
    const w = Math.round(Math.min(h * 0.68, window.innerWidth * (window.innerWidth < 800 ? 0.4 : 0.22)));
    radius = (w * cards.length) / (2 * Math.PI) * 1.03;
    ring.style.setProperty("--w", `${w}px`);
    ring.style.setProperty("--h", `${Math.round(w * 1.3)}px`);
    ring.style.setProperty("--p", `${radius * 0.62}px`);
  };
  layout();
  window.addEventListener("resize", layout);

  let angle = 0, speed = 0.012, boost = 0, lastY = window.scrollY, last = performance.now();
  const render = (now) => {
    const dt = Math.min(now - last, 50);
    last = now;
    angle = (angle + dt * (speed + boost)) % 360;
    boost *= 0.94;
    cards.forEach((card, i) => {
      const a = ((i * step + angle + 180) % 360) - 180; // −180…180
      const visible = Math.abs(a) < 100;
      card.style.visibility = visible ? "visible" : "hidden";
      if (visible) card.style.transform = `rotateY(${a}deg) translateZ(${-radius}px)`;
    });
    if (!reduceMotion) requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  if (reduceMotion) return;

  // scrolling nudges the ring along
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    boost = Math.min(boost + Math.abs(y - lastY) * 0.0015, 0.25);
    lastY = y;
  }, { passive: true });
  ring.addEventListener("mouseenter", () => (speed = 0.005));
  ring.addEventListener("mouseleave", () => (speed = 0.012));

  // ── "View" cursor over projects ──
  const cursor = document.querySelector(".cursor");
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
  document.querySelectorAll("[data-cursor] .project__media").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-on"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-on"));
  });
})();
