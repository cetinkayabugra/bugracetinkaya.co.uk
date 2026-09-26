(function () {
  const body = document.body;

  // Loader
  window.addEventListener('load', () => setTimeout(() => body.classList.remove('is-loading'), 700));
  setTimeout(() => body.classList.remove('is-loading'), 3000); // safety net

  // Year
  document.querySelectorAll('.year').forEach(el => (el.textContent = new Date().getFullYear()));

  // Menu
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  const label = toggle.querySelector('.menu-toggle__label');
  const setMenu = open => {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    label.textContent = open ? 'Close' : 'Menu';
  };
  toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

  // Header state on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hero background word parallax
  const bgWord = document.querySelector('.hero__bg-word');
  window.addEventListener('scroll', () => {
    if (bgWord && window.scrollY < window.innerHeight) {
      bgWord.style.transform = `translateX(${-window.scrollY * 0.25}px)`;
    }
  }, { passive: true });

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-in'));
  }
})();
