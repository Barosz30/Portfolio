/**
 * CSS Showcase CV — interactive layer
 * Effects: spotlight, cursor, globe drag, tilt, magnetic, runaway, scroll reveals, theme
 */

// #14 Spotlight + #19 Custom cursor
const spotlight = document.querySelector('.spotlight');
const cursorRing = document.querySelector('.cursor-ring');
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 50;
let mouseY = 50;
let ringPx = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let targetPx = { x: ringPx.x, y: ringPx.y };

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 100;
  mouseY = (e.clientY / window.innerHeight) * 100;
  targetPx.x = e.clientX;
  targetPx.y = e.clientY;
  document.documentElement.style.setProperty('--mouse-x', `${mouseX}%`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY}%`);

  if (cursorDot) {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  }
});

function animateCursor() {
  ringPx.x += (targetPx.x - ringPx.x) * 0.18;
  ringPx.y += (targetPx.y - ringPx.y) * 0.18;

  if (cursorRing) {
    cursorRing.style.left = `${ringPx.x}px`;
    cursorRing.style.top = `${ringPx.y}px`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .flip-card, .snap-card').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// #20 Theme toggle with view transition
const themeToggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');

if (stored) {
  document.documentElement.setAttribute('data-theme', stored);
}

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

  const apply = () => {
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  if (document.startViewTransition) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
});

// #3 Tilt cards
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`;
    card.classList.add('is-tilting');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.classList.remove('is-tilting');
  });
});

// #4 Magnetic buttons
document.querySelectorAll('.magnetic-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// #1 Runaway button
const runawayBtn = document.getElementById('runawayBtn');
const contactActions = document.querySelector('.contact__actions');

if (runawayBtn && contactActions) {
  runawayBtn.addEventListener('click', () => {
    window.open(new URL('cv.html', window.location.href).href, '_blank');
  });

  runawayBtn.addEventListener('mouseenter', () => {
    const container = contactActions.getBoundingClientRect();
    const btn = runawayBtn.getBoundingClientRect();
    const maxX = container.width - btn.width - 20;
    const maxY = container.height - btn.height - 20;
    const newX = Math.random() * Math.max(maxX, 0);
    const newY = Math.random() * Math.max(maxY, 0);

    runawayBtn.style.position = 'absolute';
    runawayBtn.style.left = `${newX}px`;
    runawayBtn.style.top = `${newY}px`;
  });
}

// Scroll reveals + counters + skill bars
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');

      if (entry.target.classList.contains('skill-bar')) {
        const fill = entry.target.querySelector('.skill-bar__fill');
        if (fill) {
          const level = fill.dataset.level;
          fill.style.setProperty('--level', level);
        }
      }

      if (entry.target.querySelector('[data-count]')) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.scroll-reveal, .stagger-list, .skill-bar').forEach((el) => {
  observer.observe(el);
});

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Fallback scroll progress for browsers without animation-timeline
const progressBar = document.querySelector('.scroll-progress__bar');
if (progressBar && !CSS.supports('animation-timeline', 'scroll()')) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }, { passive: true });
}

// #18 Snap gallery — drag to scroll
document.querySelectorAll('.snap-gallery').forEach((gallery) => {
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  gallery.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    moved = false;
    startX = e.clientX;
    scrollStart = gallery.scrollLeft;
    gallery.classList.add('is-dragging');
    gallery.setPointerCapture(e.pointerId);
  });

  gallery.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    gallery.scrollLeft = scrollStart - dx;
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    gallery.classList.remove('is-dragging');
    if (moved) gallery.dataset.wasDragged = '1';
    try { gallery.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  gallery.addEventListener('pointerup', endDrag);
  gallery.addEventListener('pointercancel', endDrag);

  gallery.addEventListener('click', (e) => {
    if (gallery.dataset.wasDragged) {
      e.preventDefault();
      e.stopPropagation();
      delete gallery.dataset.wasDragged;
    }
  }, true);
});

// Flip cards on touch (tap to flip)
document.querySelectorAll('.flip-card').forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => {
    if (window.matchMedia('(hover: none)').matches) {
      card.classList.toggle('is-flipped');
    }
  });
});

// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.style.background = window.scrollY > 50
    ? 'var(--surface)'
    : '';
}, { passive: true });
