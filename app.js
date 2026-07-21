/* CIRQUE DU SOLEIL — système the_techlabb : MÉTAMORPHOSE du sujet central au
   scroll (ombre -> lumière), permutation des titres, halo soleil, panneau ECHO. */
(() => {
  'use strict';

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.16 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx = !reduced && window.gsap && window.ScrollFX;
  if (!fx) return;

  document.body.classList.add('fx');
  ScrollFX.init();

  /* MÉTAMORPHOSE : hero épinglé, l'artiste passe de la silhouette d'ombre à la
     pleine lumière pendant que le halo soleil s'allume et que les titres permutent. */
  const morph = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=220%', scrub: 1, pin: true, anticipatePin: 1 }
  });
  morph
    .fromTo('.character',
      { filter: 'grayscale(1) brightness(0.06) contrast(1.1)', scale: 0.94, y: 10 },
      { filter: 'grayscale(0) brightness(1) contrast(1)', scale: 1.04, y: 0, ease: 'none', duration: 2.2 }, 0)
    .fromTo('.halo', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, ease: 'none', duration: 2.2 }, 0)
    .to('.t1', { opacity: 0, y: -26, ease: 'power1.in', duration: 0.7 }, 0.7)
    .fromTo('.t2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power1.out', duration: 0.7 }, 1.35)
    .to('.scroll-hint', { opacity: 0, duration: 0.3 }, 0.2);

  /* Bande ECHO : zoom doux de la vidéo pendant la traversée + légende révélée */
  ScrollFX.fullscreenPanels(document);

  /* Ancres via Lenis */
  if (ScrollFX.lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        ScrollFX.lenis.scrollTo(t, { offset: -70 });
      });
    });
  }
})();
