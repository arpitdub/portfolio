// ============================================================
// SETUP
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = prefersReducedMotionQuery.matches;

// ============================================================
// THEME TOGGLE (persisted)
// ============================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader?.classList.add('is-hidden'), 400);
});

// ============================================================
// SCROLL PROGRESS
// ============================================================
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ============================================================
// NAV: blur/shadow on scroll + hide on scroll down, show on scroll up
// ============================================================
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 8);
  if (y > lastScrollY && y > 160) {
    nav.classList.add('nav--hidden');
  } else {
    nav.classList.remove('nav--hidden');
  }
  lastScrollY = y;
}, { passive: true });

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
const navLinks = document.querySelectorAll('.nav__links a[data-nav], .mobile-menu a[data-nav]');
const sections = ['about', 'work', 'skills', 'certifications', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const links = document.querySelectorAll(`a[data-nav="${entry.target.id}"]`);
    if (!links.length) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('is-active'));
      links.forEach(l => l.classList.add('is-active'));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => navObserver.observe(section));

// ============================================================
// MOBILE MENU
// ============================================================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  burger.classList.toggle('is-open');
});
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

// ============================================================
// CURSOR GLOW (desktop pointer only)
// ============================================================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    cursorGlow.classList.add('is-active');
  });
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'));
}

// ============================================================
// RIPPLE EFFECT ON BUTTONS
// ============================================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ============================================================
// TYPED.JS — hero role rotation
// ============================================================
if (window.Typed && document.getElementById('typedRoles')) {
  new Typed('#typedRoles', {
    strings: [
      'MBA Business Analytics Student',
      'Business Analyst',
      'Data Analyst',
      'Power BI Developer',
      'Excel Enthusiast',
      'SQL Learner',
      'Python Learner'
    ],
    typeSpeed: 42,
    backSpeed: 22,
    backDelay: 1400,
    startDelay: 300,
    loop: true,
    smartBackspace: true
  });
}

// ============================================================
// PARTICLES.JS — hero background only
// ============================================================
if (window.particlesJS && document.getElementById('particles-hero') && !prefersReducedMotion) {
  particlesJS('particles-hero', {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 1000 } },
      color: { value: ['#2563EB', '#7C3AED', '#0891B2'] },
      shape: { type: 'circle' },
      opacity: { value: 0.22, random: true },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 130, color: '#2563EB', opacity: 0.1, width: 1 },
      move: { enable: true, speed: 0.7, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } } }
    },
    retina_detect: true
  });
}

// ============================================================
// VANILLA-TILT — project cards + cert cards
// ============================================================
if (window.VanillaTilt && !prefersReducedMotion) {
  VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
    max: 5,
    speed: 400,
    glare: true,
    'max-glare': 0.12,
    scale: 1.01
  });
}

// ============================================================
// GLOW-FOLLOW CONTACT CARDS
// ============================================================
document.querySelectorAll('.glow-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// ============================================================
// KPI COUNT-UP + PROFICIENCY BARS (run once, on view)
// ============================================================
function animateKpis() {
  document.querySelectorAll('.kpi-card').forEach((card, i) => {
    const target = parseFloat(card.dataset.target);
    const decimals = parseInt(card.dataset.decimals, 10) || 0;
    const suffix = card.dataset.suffix || '';
    const numEl = card.querySelector('.kpi-num');
    const bar = card.querySelector('.kpi-card__bar');

    setTimeout(() => {
      bar.classList.add('fill');
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        numEl.textContent = value.toLocaleString('en-IN', {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals
        }) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, i * 150);
  });
}

function fillProficiency() {
  document.querySelectorAll('.proficiency__fill').forEach((el, i) => {
    setTimeout(() => el.classList.add('fill'), i * 100);
  });
}

if (prefersReducedMotion) {
  document.querySelectorAll('.kpi-card').forEach(card => {
    const target = parseFloat(card.dataset.target);
    const decimals = parseInt(card.dataset.decimals, 10) || 0;
    const suffix = card.dataset.suffix || '';
    card.querySelector('.kpi-num').textContent =
      target.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    card.querySelector('.kpi-card__bar').classList.add('fill');
  });
  document.querySelectorAll('.proficiency__fill').forEach(el => el.classList.add('fill'));
} else {
  window.addEventListener('load', () => setTimeout(animateKpis, 250));
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { fillProficiency(); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    skillObserver.observe(skillsSection);
  }
}

// ============================================================
// SCROLL REVEALS (fallback, non-AOS elements)
// ============================================================
const revealTargets = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// ============================================================
// SWIPER — certifications slider
// ============================================================
if (window.Swiper && document.querySelector('.certs-swiper')) {
  new Swiper('.certs-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      680: { slidesPerView: 2 },
      1000: { slidesPerView: 3 }
    }
  });
}

// ============================================================
// GSAP — hero orchestration
// ============================================================
if (window.gsap && !prefersReducedMotion) {
  gsap.from('.hero__eyebrow', { opacity: 0, y: -10, duration: 0.6, delay: 0.15 });
  gsap.from('.hero__sub', { opacity: 0, y: 16, duration: 0.7, delay: 0.9 });
  gsap.from('.hero__cta .btn', { opacity: 0, y: 16, duration: 0.6, delay: 1.05, stagger: 0.1 });
  gsap.from('.hero__socials a', { opacity: 0, y: 10, duration: 0.5, delay: 1.3, stagger: 0.08 });
}

// ============================================================
// AOS — section-level scroll animations
// ============================================================
if (window.AOS) {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: prefersReducedMotion
  });
}

// ============================================================
// CONTACT FORM — client-side mailto (no backend available)
// ============================================================
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const status = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in every field.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:arpitd.0804@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app…';
});
