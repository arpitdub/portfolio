// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// ===== Stagger hero word reveal =====
document.querySelectorAll('.hero__title .reveal-word').forEach((word, i) => {
  word.style.animationDelay = `${0.5 + i * 0.06}s`;
});

// ===== Scroll progress bar =====
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ===== Active nav link on scroll =====
const navLinks = document.querySelectorAll('.nav__links a[data-nav]');
const sections = ['about', 'work', 'skills', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav__links a[data-nav="${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => navObserver.observe(section));

// ===== Hero parallax grid (mouse-follow) =====
const heroGrid = document.getElementById('heroGrid');
const heroSection = document.querySelector('.hero');
if (heroGrid && heroSection && !prefersReducedMotionQuery.matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroGrid.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroGrid.style.transform = 'translate(0, 0)';
  });
}

// ===== Magnetic buttons =====
if (!prefersReducedMotionQuery.matches) {
  document.querySelectorAll('.btn--magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== 3D tilt on project cards =====
if (!prefersReducedMotionQuery.matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// ===== Glow-follow contact cards =====
document.querySelectorAll('.glow-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

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
