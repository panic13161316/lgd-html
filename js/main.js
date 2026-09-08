const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.querySelector('.sr-only').textContent = open ? '메뉴 열기' : '메뉴 닫기';
  nav.classList.toggle('is-open', !open);
  document.body.style.overflow = open ? '' : 'hidden';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
