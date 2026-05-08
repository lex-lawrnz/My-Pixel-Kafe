/* ============================================================
   PORTFOLIO INTERACTIONS
   1. Footer year
   2. Navbar scroll state
   3. Mobile menu toggle
   4. Active link on scroll
   5. Reveal-on-scroll animations
   ============================================================ */

/* 1. Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* 2. Navbar scroll state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* 3. Mobile menu toggle */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* 4. Active link on scroll */
const sections = document.querySelectorAll('section[id]');
const linkMap = {};
navLinks.querySelectorAll('a').forEach(a => {
  linkMap[a.getAttribute('href').slice(1)] = a;
});
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(linkMap).forEach(a => a.classList.remove('active'));
      linkMap[e.target.id]?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => activeObs.observe(s));

/* 5. Reveal-on-scroll */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObs.observe(el));

/* Trigger hero reveal immediately */
requestAnimationFrame(() => {
  document.querySelectorAll('.hero .reveal, .hero .reveal-stagger').forEach(el => el.classList.add('in'));
});
