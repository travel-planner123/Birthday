const birthday = { month: 3, day: 3 };

function nextBirthdayDate() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, birthday.month - 1, birthday.day, 0, 0, 0);
  if (target < now) target = new Date(year + 1, birthday.month - 1, birthday.day, 0, 0, 0);
  return target;
}

function setCountdown() {
  const el = document.getElementById("countdownText");
  if (!el) return;

  const now = new Date();
  const sameDay = now.getMonth() === birthday.month - 1 && now.getDate() === birthday.day;
  if (sameDay) {
    el.textContent = "Today is your day. Happy Birthday, Riya!";
    return;
  }

  const target = nextBirthdayDate();
  const diffMs = target - now;
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  el.textContent = `${days} day${days === 1 ? "" : "s"} left until your birthday (${target.toLocaleDateString()}).`;
}

function setupBirthdayClock() {
  const daysEl = document.getElementById("clockDays");
  const hoursEl = document.getElementById("clockHours");
  const minsEl = document.getElementById("clockMins");
  const secsEl = document.getElementById("clockSecs");
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function tick() {
    const now = new Date();
    const target = nextBirthdayDate();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.14 }
  );
  nodes.forEach((node) => io.observe(node));
}

function setupTypedLine() {
  const target = document.getElementById("typedLine");
  if (!target) return;
  const text = "This digital page is a birthday gift, made just for you.";
  let i = 0;

  const timer = setInterval(() => {
    target.textContent = text.slice(0, i + 1);
    i += 1;
    if (i >= text.length) clearInterval(timer);
  }, 34);
}

function setupSurpriseModal() {
  const modal = document.getElementById("surpriseModal");
  const open = document.getElementById("surpriseBtn");
  const close = document.getElementById("closeModal");
  if (!modal || !open || !close) return;

  open.addEventListener("click", () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    burstHearts();
  });

  close.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function setupGallerySlider() {
  const track = document.getElementById("galleryTrack");
  const prev = document.getElementById("prevSlide");
  const next = document.getElementById("nextSlide");
  if (!track || !prev || !next) return;

  const items = Array.from(track.querySelectorAll(".gallery-item"));
  let index = 0;
  let timer;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function startAuto() {
    timer = setInterval(() => {
      index = (index + 1) % items.length;
      render();
    }, 4500);
  }

  prev.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    render();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % items.length;
    render();
  });

  track.addEventListener("mouseenter", () => clearInterval(timer));
  track.addEventListener("mouseleave", startAuto);

  render();
  startAuto();
}

function setupLightbox() {
  const modal = document.getElementById("lightbox");
  const close = document.getElementById("closeLightbox");
  const modalImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (!modal || !close || !modalImg || !caption || !galleryImages.length) return;

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      caption.textContent = img.dataset.caption || "";
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  close.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function setupWishWall() {
  const form = document.getElementById("wishForm");
  const input = document.getElementById("wishInput");
  const list = document.getElementById("wishList");
  if (!form || !input || !list) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const item = document.createElement("li");
    item.textContent = text;
    list.prepend(item);
    input.value = "";
  });
}

function setupTilt() {
  const tile = document.querySelector("[data-tilt]");
  if (!tile) return;

  tile.addEventListener("mousemove", (event) => {
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 8;
    const rotateX = (0.5 - y / rect.height) * 8;
    tile.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tile.addEventListener("mouseleave", () => {
    tile.style.transform = "rotate(2deg)";
  });
}

function setupLoveMeter() {
  const btn = document.getElementById("loveBtn");
  const fill = document.getElementById("loveFill");
  const label = document.getElementById("loveValue");
  if (!btn || !fill || !label) return;

  let value = 0;
  btn.addEventListener("click", () => {
    value = Math.min(100, value + 11);
    fill.style.width = `${value}%`;
    label.textContent = `${value}%`;
    if (value === 100) burstHearts();
  });
}

function setupMemoryRoulette() {
  const btn = document.getElementById("quoteBtn");
  const text = document.getElementById("quoteText");
  if (!btn || !text) return;

  const lines = [
    "You are my safest place.",
    "Your smile fixes my whole day.",
    "Every memory with you feels golden.",
    "Loving you is the easiest thing.",
    "You make ordinary moments magical.",
  ];

  btn.addEventListener("click", () => {
    const pick = lines[Math.floor(Math.random() * lines.length)];
    text.textContent = pick;
  });
}

function setupLetterReveal() {
  const btn = document.getElementById("letterBtn");
  const card = document.getElementById("letterCard");
  if (!btn || !card) return;

  btn.addEventListener("click", () => {
    card.classList.toggle("open");
    btn.textContent = card.classList.contains("open") ? "Hide Letter" : "Reveal Letter";
  });
}

function burstHearts() {
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${40 + Math.random() * 20}vw`;
    heart.style.top = `${42 + Math.random() * 16}vh`;
    heart.style.opacity = "0.9";

    const dx = (Math.random() - 0.5) * 240;
    const dy = -90 - Math.random() * 220;
    const duration = 700 + Math.random() * 650;

    document.body.appendChild(heart);

    heart.animate(
      [
        { transform: "translate(0, 0) rotate(45deg)", opacity: 0.95 },
        { transform: `translate(${dx}px, ${dy}px) rotate(45deg) scale(0.3)`, opacity: 0 },
      ],
      { duration, easing: "cubic-bezier(.16,.68,.35,1)", fill: "forwards" }
    );

    setTimeout(() => heart.remove(), duration + 40);
  }
}

setCountdown();
setupBirthdayClock();
setupReveal();
setupTypedLine();
setupSurpriseModal();
setupGallerySlider();
setupLightbox();
setupWishWall();
setupTilt();
setupLoveMeter();
setupMemoryRoulette();
setupLetterReveal();
