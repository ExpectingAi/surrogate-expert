// Canonical navigation
// Keeps the desktop and mobile menus identical across every static page.
(() => {
  const scriptUrl = document.currentScript?.src || '';
  const siteRoot = scriptUrl ? new URL('../', scriptUrl) : new URL('./', window.location.href);

  const toHref = (path) => new URL(path.replace(/^\/+/, ''), siteRoot).pathname;
  const navPath = (path) => '/' + path.replace(/^\/+/, '').replace(/index\.html$/, '').replace(/\/+$/, '') + (path && !path.endsWith('/') ? '/' : '');

  const navItems = [
    {
      label: 'Learn',
      dropdownLabel: 'Understanding Surrogacy',
      items: [
        ['What Is Surrogacy?', 'what-is-surrogacy/'],
        ['Medical Guide', 'medical-guide-for-surrogates/'],
        ['Legal Considerations', 'legal-considerations/'],
        ['Laws by State', 'surrogacy-laws-by-state/'],
        ['Surrogacy Risks', 'surrogacy-risks/'],
        ['FAQ & Glossary', 'faq-glossary/']
      ]
    },
    {
      label: 'Your Journey',
      dropdownLabel: 'The Surrogacy Process',
      items: [
        ['Becoming a Surrogate', 'becoming-a-surrogate/'],
        ['Requirements', 'surrogate-requirements/'],
        ['Process & Timeline', 'the-surrogacy-process-timeline/'],
        ['Compensation', 'surrogate-compensation/'],
        ['How Agencies Pay', 'how-agencies-pay-surrogates/'],
        ['Matching', 'matching-what-to-expect/'],
        ['Life During & After', 'life-during-after-surrogacy/']
      ]
    },
    {
      label: 'Medical',
      dropdownLabel: 'Medical Know-How',
      items: [
        ['Surrogacy & IVF', 'surrogacy-ivf/'],
        ['Surrogate Pregnancy', 'surrogate-pregnancy/'],
        ['Health Insurance', 'health-insurance-for-surrogates/']
      ]
    },
    {
      label: 'Your Family',
      dropdownLabel: 'Family & Support',
      items: [
        ['Your Support Person', 'your-surrogate-support-person/'],
        ['Talking to Your Kids', 'sharing-surrogacy-with-your-children/'],
        ['Single Surrogates', 'being-a-single-surrogate/'],
        ['Choosing an Agency', 'choosing-a-surrogacy-agency/']
      ]
    }
  ];

  const normalizePath = (path) => {
    const rootPath = siteRoot.pathname.replace(/\/+$/, '/');
    let normalized = path.replace(/index\.html$/, '').replace(/\/+$/, '/');
    if (normalized.startsWith(rootPath)) normalized = normalized.slice(rootPath.length - 1);
    return normalized === '' ? '/' : normalized;
  };

  const currentPath = normalizePath(window.location.pathname);
  const isActive = (path) => {
    const hrefPath = navPath(path);
    if (currentPath === hrefPath) return true;
    return hrefPath === '/surrogacy-laws-by-state/' && currentPath.startsWith('/surrogacy-laws/');
  };

  const chevron = '<svg class="nav-chevron" viewBox="0 0 12 12" aria-hidden="true"><polyline points="2,4 6,8 10,4"/></svg>';
  const linkAttrs = (path, extra = '') => `href="${toHref(path)}"${isActive(path) ? ' class="active"' : extra ? ` class="${extra}"` : ''}`;

  const buildDesktopLinks = () => {
    const dropdowns = navItems.map((group) => `
      <li>
        <button aria-haspopup="true" aria-expanded="false">
          ${group.label}
          ${chevron}
        </button>
        <div class="nav-dropdown" role="menu">
          <div class="nav-dropdown-label">${group.dropdownLabel}</div>
          ${group.items.map(([label, path]) => `<a ${linkAttrs(path)} role="menuitem">${label}</a>`).join('')}
        </div>
      </li>
    `).join('');

    return `
      <li><a href="${toHref('')}"${currentPath === '/' ? ' class="active"' : ''}>Home</a></li>
      ${dropdowns}
      <li><a ${linkAttrs('about-us/')}>About</a></li>
    `;
  };

  const buildMobileLinks = () => {
    const sections = navItems.map((group) => `
      <div class="nav-mobile-section">
        <div class="nav-mobile-label">${group.label}</div>
        ${group.items.map(([label, path]) => `<a ${linkAttrs(path)}>${label}</a>`).join('')}
      </div>
    `).join('');

    return `
      <a href="${toHref('')}"${currentPath === '/' ? ' class="active"' : ''}>Home</a>
      ${sections}
      <a ${linkAttrs('about-us/')}>About</a>
      <a href="${toHref('get-started/')}" class="nav-mobile-cta">Get Started</a>
    `;
  };

  const nav = document.querySelector('.site-nav');
  const navInner = nav?.querySelector('.nav-inner');
  const mobileNav = document.getElementById('nav-mobile');

  if (navInner) {
    navInner.innerHTML = `
      <a href="${toHref('')}" class="nav-logo">Surrogacy<span>Expert</span></a>
      <ul class="nav-links" role="list">${buildDesktopLinks()}</ul>
      <a href="${toHref('get-started/')}" class="nav-cta">Get Started</a>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/>
        </svg>
      </button>
    `;
  }

  if (mobileNav) {
    mobileNav.innerHTML = buildMobileLinks();
    mobileNav.setAttribute('aria-hidden', 'true');
  }
})();

// Mobile nav
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Scroll fade-up
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));