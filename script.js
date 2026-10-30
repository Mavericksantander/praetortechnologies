// ---- footer year ----
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---- mobile menu ----
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function setMenu(isOpen){
  nav.classList.toggle('nav-open', isOpen);
  header.classList.toggle('menu-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

if(toggle && nav){
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('nav-open')));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}

// ---- header: solid once the page leaves the hero ----
if(header && header.classList.contains('header-overlay')){
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- scroll reveal ----
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.reveal');

if(prefersReducedMotion || !('IntersectionObserver' in window)){
  revealTargets.forEach(el => el.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        // slight stagger for elements revealed together
        setTimeout(() => entry.target.classList.add('in-view'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}

// ---- hero video: skip on small screens and reduced motion (poster stays) ----
const heroVideo = document.querySelector('.hero-video');
if(heroVideo){
  if(prefersReducedMotion || window.matchMedia('(max-width: 720px)').matches){
    heroVideo.removeAttribute('autoplay');
    heroVideo.remove();
  } else {
    heroVideo.preload = 'auto';
    heroVideo.play().catch(() => {});
  }
}
