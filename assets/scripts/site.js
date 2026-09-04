const navToggle = document.querySelector('[data-nav-toggle]');
const siteNav = document.querySelector('[data-site-nav]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.feather) {
  window.feather.replace({ width: 16, height: 16, 'stroke-width': 1.8 });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (!prefersReducedMotion) {
  const typewriter = document.querySelector('[data-typewriter]');

  if (typewriter) {
    const words = (typewriter.dataset.words || '')
      .split('|')
      .map((word) => word.trim())
      .filter(Boolean);
    const word = words[0];
    let characterIndex = 0;

    const type = () => {
      if (!word) return;

      if (characterIndex < word.length) {
        characterIndex += 1;
        typewriter.textContent = word.slice(0, characterIndex);
        window.setTimeout(type, 48);
        return;
      }

      typewriter.closest('.typing-wrap')?.setAttribute('data-typing-complete', 'true');
    };

    typewriter.textContent = '';
    window.setTimeout(type, 360);
  }

  const motionStages = document.querySelectorAll([
    '.section-heading', '.signal-list', '.project-list', '.research-layout',
    '.evidence-grid', '.credential-grid', '.career-grid', '.contact-grid',
    '.profile-lead', '.detail-grid', '.case-study', '.reference-grid',
    '.research-overview', '.method-list', '.limits'
  ].join(', '));

  motionStages.forEach((stage) => stage.classList.add('motion-stage'));

  const hasScrollTimeline = CSS.supports('animation-timeline: view()');

  if (hasScrollTimeline) {
    document.documentElement.classList.add('motion-timeline');
  } else if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-fallback');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.willChange = 'transform, opacity';
          window.requestAnimationFrame(() => entry.target.classList.add('is-revealed'));
          entry.target.addEventListener('transitionend', () => {
            entry.target.style.removeProperty('will-change');
          }, { once: true });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -12% 0px' });

    motionStages.forEach((stage) => observer.observe(stage));
  } else {
    motionStages.forEach((stage) => stage.classList.add('is-revealed'));
  }
}
