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
    let wordIndex = 0;
    let characterIndex = words[0]?.length || 0;
    let isDeleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (!word) return;

      if (!isDeleting && characterIndex < word.length) {
        characterIndex += 1;
        typewriter.textContent = word.slice(0, characterIndex);
        window.setTimeout(type, 54);
        return;
      }

      if (!isDeleting) {
        isDeleting = true;
        window.setTimeout(type, 1700);
        return;
      }

      if (characterIndex > 0) {
        characterIndex -= 1;
        typewriter.textContent = word.slice(0, characterIndex);
        window.setTimeout(type, 30);
        return;
      }

      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      window.setTimeout(type, 220);
    };

    window.setTimeout(type, 1200);
  }

  const revealTargets = document.querySelectorAll([
    '.section-heading', '.signal', '.project', '.research-layout', '.evidence',
    '.credential-tile', '.career-grid', '.contact-grid', '.profile-lead',
    '.detail-grid > article', '.case-study', '.reference-grid a',
    '.research-overview', '.method-list', '.limits'
  ].join(', '));

  const reveal = (target) => target.classList.add('is-revealed');

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach(reveal);
  }
}
