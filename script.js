// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== KPI count-up + bar fill (runs once, on load) =====
function animateKpis() {
  const cards = document.querySelectorAll('.kpi-card');
  cards.forEach((card, i) => {
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
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        const value = target * eased;
        numEl.textContent = value.toLocaleString('en-IN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, i * 150);
  });
}

// Respect reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.querySelectorAll('.kpi-card').forEach(card => {
    const target = parseFloat(card.dataset.target);
    const decimals = parseInt(card.dataset.decimals, 10) || 0;
    const suffix = card.dataset.suffix || '';
    card.querySelector('.kpi-num').textContent =
      target.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    card.querySelector('.kpi-card__bar').classList.add('fill');
  });
} else {
  window.addEventListener('load', () => setTimeout(animateKpis, 250));
}

// ===== Scroll reveals =====
const revealTargets = document.querySelectorAll('.project, .skill-group, .contact__card, .about__grid');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    nav.style.boxShadow = '0 4px 20px rgba(16,24,40,0.05)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
