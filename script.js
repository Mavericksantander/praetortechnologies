// ---- footer year ----
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---- mobile menu ----
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if(toggle && nav){
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
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
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
}
// ---- hero video: respect reduced motion ----
const heroVideo = document.querySelector('.hero-video');
if(heroVideo && prefersReducedMotion){
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}
